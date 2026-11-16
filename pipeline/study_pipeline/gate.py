"""Published gate: a content file may flip to `status: published` only by a human (CONTRACT §3).

The schema cannot tell who changed the status. Locally the pre-commit hook asks for confirmation on
/dev/tty, which agent shells (Claude Code, Antigravity) do not have. In CI the PR must carry the
`publish-approved` label. Neither stops someone who runs `--no-verify` or labels their own PR; the
last gate is still the human merge. This makes the transition loud, not impossible.
"""

import subprocess

from .check import split_front
from .config import ROOT

CONFIRM_WORD = "publish"


def _status(text: str | None) -> str | None:
    if text is None:
        return None
    try:
        return split_front(text)[0].get("status")
    except ValueError:
        return None


def became_published(old: str | None, new: str | None) -> bool:
    return _status(new) == "published" and _status(old) != "published"


def _git(*args: str) -> str | None:
    r = subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True)
    return r.stdout if r.returncode == 0 else None


def transitions(base: str | None = None) -> list[str]:
    """Paths under content/ that become published: staged index vs HEAD, or HEAD vs merge-base(base)."""
    if base is None:
        rng, new_ref, old_ref = ["--cached"], "", "HEAD"
    else:
        old_ref = (_git("merge-base", base, "HEAD") or "").strip()
        if not old_ref:
            raise RuntimeError(f"no merge-base with {base}")
        rng, new_ref = [old_ref, "HEAD"], "HEAD"
    # --no-renames: a rename that also flips status must show up as an added file.
    names = _git("diff", "--name-only", "--no-renames", "--diff-filter=AM", *rng, "--", "content/") or ""
    return [
        p for p in names.splitlines()
        if p.endswith(".md") and became_published(_git("show", f"{old_ref}:{p}"), _git("show", f"{new_ref}:{p}"))
    ]


def confirm_on_tty(paths: list[str]) -> bool:
    try:
        with open("/dev/tty", "r+") as tty:
            tty.write("published 로 바뀌는 파일:\n" + "".join(f"  {p}\n" for p in paths))
            tty.write(f"사람이 승인하면 '{CONFIRM_WORD}' 를 입력하세요: ")
            tty.flush()
            return tty.readline().strip() == CONFIRM_WORD
    except OSError:
        return False  # no controlling terminal: an agent or a script is committing
