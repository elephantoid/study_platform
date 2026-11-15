"""Fetch markdown from licensed repos: one tarball per repo, markdown and LICENSE only."""

import io
import shutil
import subprocess
import tarfile
from pathlib import Path

from .config import RAW_DIR
from .failguard import FailGuard
from .sources import Source

KEEP_SUFFIXES = {".md"}
KEEP_NAMES = {"LICENSE", "LICENSE.md", "LICENSE.txt"}


def _download_tarball(repo: str) -> bytes:
    return subprocess.run(
        ["gh", "api", f"repos/{repo}/tarball"], check=True, capture_output=True, timeout=120
    ).stdout


def extract_markdown(tar_bytes: bytes, dest: Path) -> int:
    """Extract only markdown/LICENSE regular files, dropping the top-level `owner-repo-sha/` dir."""
    count = 0
    with tarfile.open(fileobj=io.BytesIO(tar_bytes), mode="r:gz") as tar:
        for m in tar.getmembers():
            parts = Path(m.name).parts[1:]
            if not m.isfile() or not parts:
                continue
            rel = Path(*parts)
            if rel.suffix not in KEEP_SUFFIXES and rel.name not in KEEP_NAMES:
                continue
            m.name = str(rel)
            # filter="data" rejects absolute paths, `..` and links outside dest.
            tar.extract(m, dest, filter="data")
            count += 1
    return count


def fetch(sources: list[Source], guard: FailGuard, download=_download_tarball) -> dict[str, dict]:
    report: dict[str, dict] = {}
    for s in sources:
        if s.kind != "repo":
            continue
        dest = RAW_DIR / "repo" / s.id
        if s.reuse == "link_only":
            # Body must stay at 0 bytes for unlicensed sources.
            shutil.rmtree(dest, ignore_errors=True)
            report[s.id] = {"status": "skipped", "reason": "link_only"}
            continue
        try:
            data = download(s.repo)
        except (subprocess.SubprocessError, OSError) as e:
            guard.record("repo-download", e)
            report[s.id] = {"status": "failed", "error": str(e)[:200]}
            continue
        shutil.rmtree(dest, ignore_errors=True)
        dest.mkdir(parents=True)
        report[s.id] = {"status": "ok", "files": extract_markdown(data, dest)}
    return report
