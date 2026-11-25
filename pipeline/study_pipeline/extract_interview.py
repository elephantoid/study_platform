"""Rule-based Q/A extraction from boost-devs/ai-tech-interview (MIT, verbatim allowed).

The repo is uniformly structured (`## #N` → `#### <question>` → answer → `#### References`),
so no LLM is needed. Only difficulty is a placeholder; content-critic or a human sets it.
"""

import json
import re
from datetime import date
from pathlib import Path

import yaml

from . import overrides
from .config import CONTENT, MANIFEST_DIR, OVERRIDES_DIR, RAW_DIR
from .sources import load as load_sources

SOURCE_ID = "boost-ai-tech-interview"
REPO = "boost-devs/ai-tech-interview"
GENERATOR = "rule-based/extract_interview@1"
OVERRIDES = OVERRIDES_DIR / "interview.yaml"

# answers/<file> -> (topicId, id prefix)
FILES = {
    "1-statistics-math.md": ("statistics-math", "boost-stat"),
    "statistics-math-distribution.md": ("statistics-math", "boost-dist"),
    "2-machine-learning.md": ("machine-learning", "boost-ml"),
    "3-deep-learning.md": ("deep-learning", "boost-dl"),
    "4-python.md": ("python", "boost-py"),
    "5-network.md": ("network", "boost-net"),
    "6-operating-system.md": ("operating-system", "boost-os"),
    "7-data-structure.md": ("data-structure", "boost-ds"),
    "8-algorithm.md": ("algorithm", "boost-algo"),
}

_BLOCK = re.compile(r"^## #\d+(?:-\d+)*\s*$", re.M)  # "#3", also sub-blocks "#2-1"
MIN_ANSWER_CHARS = 40  # parent blocks like "#6 Graph" only introduce "#6-1.."; not a card
_QHEAD = re.compile(r"^#{3,4} (?!References\s*$)(.+?)\s*$", re.M)
# Relative image/link targets would 404 outside the repo; point them at the raw file.
_REL_MD = re.compile(r"(!?\[[^\]]*\]\()(?!<|https?://|#|mailto:)\.?/?([^)\s]+)")
_REL_IMG = re.compile(r'(<img[^>]+src=")(?!https?://)\.?/?([^"]+)')


def absolutize(md: str, file_dir: str) -> str:
    base = f"https://raw.githubusercontent.com/{REPO}/HEAD/{file_dir}/"
    return _REL_IMG.sub(lambda m: m.group(1) + base + m.group(2), _REL_MD.sub(lambda m: m.group(1) + base + m.group(2), md))


def split_qa(text: str) -> list[tuple[str, str]]:
    """Return [(question, answer_with_references)] in file order.

    One `## #N` block = one question. The question is the block's first `###`/`####` heading
    (files differ); later headings are answer subsections and stay in the body.
    """
    out = []
    for block in _BLOCK.split(text)[1:]:
        m = _QHEAD.search(block)
        if not m:
            continue
        body = block[m.end():].strip()
        body = re.sub(r"^#{3,4} References\s*$", "**References**", body, flags=re.M)
        body = re.sub(r"\n-{3,}\s*$", "", body).strip()
        if len(body.split("**References**")[0].strip()) < MIN_ANSWER_CHARS:
            continue
        out.append((m.group(1).strip(), body))
    return out


def _roles(topics: dict[str, dict], topic_id: str) -> list[str]:
    weights = topics[topic_id]["roles"]
    return [r for r in ("mle", "rs", "agent", "ds") if weights.get(r, 0) >= 2] or [max(weights, key=weights.get)]


def _write(path: Path, front: dict, body: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fm = yaml.safe_dump(front, allow_unicode=True, sort_keys=False, width=1000).strip()
    path.write_text(f"---\n{fm}\n---\n\n{body.strip()}\n")


def require_verbatim_license(source_id: str) -> None:
    """Fail closed unless sources.yaml allows verbatim and the last audit confirmed the license."""
    src = {s.id: s for s in load_sources()}.get(source_id)
    audit_path = MANIFEST_DIR / "audit.json"
    audited = json.loads(audit_path.read_text()).get(source_id, {}) if audit_path.exists() else {}
    if src is None or src.reuse != "verbatim":
        raise PermissionError(f"{source_id}: sources.yaml does not allow verbatim reuse")
    if audited.get("status") != "ok" or audited.get("license") != src.license:
        raise PermissionError(f"{source_id}: license not confirmed by `ingest audit` ({audited or 'no audit'})")


def extract(topics: dict[str, dict], today: str | None = None) -> dict[str, int]:
    require_verbatim_license(SOURCE_ID)
    today = today or date.today().isoformat()
    src_dir = RAW_DIR / "repo" / SOURCE_ID / "answers"
    gen = {"by": "claude-code", "model": GENERATOR, "at": today}
    ovs = overrides.load(OVERRIDES)
    seen: set[str] = set()
    counts: dict[str, int] = {}
    for fname, (topic_id, prefix) in FILES.items():
        qa = split_qa((src_dir / fname).read_text())
        note_id = f"{prefix}-index"
        canonical = f"https://github.com/{REPO}/blob/main/answers/{fname}"
        roles = _roles(topics, topic_id)
        index_lines = []
        for n, (q, a) in enumerate(qa, 1):
            qid = f"{prefix}-{n:03d}"  # numbering counts dropped cards so ids never shift
            path = CONTENT / "questions" / topic_id / f"{qid}.md"
            seen.add(qid)
            ov = ovs.get(qid, {})
            if ov.get("drop"):
                path.unlink(missing_ok=True)
                continue
            front = {
                "id": qid, "topicId": topic_id, "sourceId": SOURCE_ID, "type": "concept",
                "difficulty": "intermediate", "roles": roles, "reviewTarget": {"noteId": note_id},
                "status": "draft", "generation": gen,
            }
            text = overrides.apply_body(qid, f"## 문제\n\n{q}\n\n## 해설\n\n{absolutize(a, 'answers')}", ov)
            _write(path, overrides.apply_front(qid, front, ov), text)
            index_lines.append(f"- [{q}]({canonical}) — `{qid}`")
        note = {
            "id": note_id, "topicId": topic_id, "sourceId": SOURCE_ID, "title": f"{topics[topic_id]['name']} 면접 문항 모음 (boost-devs)",
            "canonicalUrl": canonical, "roles": roles, "status": "draft", "generation": gen,
        }
        _write(CONTENT / "notes" / topic_id / f"{note_id}.md", note, "## 문항 목록\n\n" + "\n".join(index_lines))
        counts[fname] = len(index_lines)
    overrides.require_all_used(ovs, seen)
    return counts
