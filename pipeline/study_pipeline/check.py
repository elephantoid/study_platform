"""Validate everything under content/: schema, references, license rules. Exit non-zero on error.

Runs offline from committed files only (sources, topics, manifests, content) so CI can use it.
"""

import json
import re
from functools import lru_cache
from pathlib import Path

import jsonschema
import yaml

from .config import CONTENT, LECTURE_ID, MANIFEST_DIR, RAW_DIR, SCHEMA
from .sources import load as load_sources

KINDS = {"questions": "question", "notes": "studyNote", "lectures": "lecture"}
LINK_ONLY_BODY_LIMIT = 600  # chars; link_only sources may carry a short summary plus links only
QUOTE_WORDS = 12  # contract allows at most one quoted sentence; 12 identical words in a row is copying
_WORD = re.compile(r"[a-z0-9']+")


@lru_cache(maxsize=None)
def _transcript_shingles(lecture_id: str) -> frozenset[tuple[str, ...]] | None:
    # Ids come from unvalidated frontmatter (schema errors don't stop the loop); never let one
    # become a path outside RAW_DIR/yt.
    if not LECTURE_ID.fullmatch(lecture_id):
        return None
    p = RAW_DIR / "yt" / f"{lecture_id}.json"
    if not p.exists():
        return None  # CI has no raw transcripts; this check runs where they exist (local / pipeline)
    words = _WORD.findall(" ".join(c["t"] for c in json.loads(p.read_text())["cues"]).lower())
    return frozenset(tuple(words[i:i + QUOTE_WORDS]) for i in range(len(words) - QUOTE_WORDS + 1))


def copied_span(text: str, lecture_id: str) -> str | None:
    shingles = _transcript_shingles(lecture_id)
    if not shingles:
        return None
    words = _WORD.findall(text.lower())
    for i in range(len(words) - QUOTE_WORDS + 1):
        if tuple(words[i:i + QUOTE_WORDS]) in shingles:
            return " ".join(words[i:i + QUOTE_WORDS])
    return None


def split_front(text: str) -> tuple[dict, str]:
    if not text.startswith("---\n"):
        raise ValueError("missing frontmatter")
    _, fm, body = text.split("---\n", 2)
    front = yaml.safe_load(fm) or {}
    # Bare YAML dates parse as date objects; the schema wants ISO strings.
    return json.loads(json.dumps(front, default=str)), body.strip()


def load_topics() -> dict[str, dict]:
    return {t["id"]: t for t in yaml.safe_load((CONTENT / "topics.yaml").read_text())}


def manifest_segments() -> set[str]:
    p = MANIFEST_DIR / "videos.json"
    if not p.exists():
        return set()
    return {s["id"] for e in json.loads(p.read_text()).values() for v in e["videos"].values() for s in v.get("segments") or []}


def check(content: Path = CONTENT, require_transcripts: bool = False) -> tuple[list[str], list[str]]:
    schema = json.loads(SCHEMA.read_text())
    v = {k: jsonschema.Draft202012Validator({**schema, "$ref": f"#/$defs/{d}"}) for k, d in KINDS.items()}
    v_topic = jsonschema.Draft202012Validator({**schema, "$ref": "#/$defs/topic"})
    errors, warnings = [], []

    topics = load_topics()
    for t in topics.values():
        errors += [f"topics.yaml {t['id']}: {e.message}" for e in v_topic.iter_errors(t)]
        if t.get("parentId") and t["parentId"] not in topics:
            errors.append(f"topics.yaml {t['id']}: unknown parentId {t['parentId']}")
    sources = {s.id: s for s in load_sources()}

    docs: dict[str, dict[str, tuple[Path, dict, str]]] = {k: {} for k in KINDS}
    for kind in KINDS:
        for path in sorted((content / kind).rglob("*.md")):
            rel = path.relative_to(content)
            try:
                front, body = split_front(path.read_text())
            except ValueError as e:
                errors.append(f"{rel}: {e}")
                continue
            errors += [f"{rel}: {e.message}" for e in v[kind].iter_errors(front)]
            fid = front.get("id")
            if path.stem != fid:
                errors.append(f"{rel}: file name must equal id ({fid})")
            if fid in docs[kind]:
                errors.append(f"{rel}: duplicate id {fid}")
            docs[kind][fid] = (rel, front, body)

    segments = manifest_segments() | {s["id"] for _, f, _ in docs["lectures"].values() for s in f.get("segments") or []}
    lecture_segments = {s["id"] for _, f, _ in docs["lectures"].values() for s in f.get("segments") or []}

    for kind, items in docs.items():
        for fid, (rel, f, body) in items.items():
            src = sources.get(f.get("sourceId"))
            if src is None:
                errors.append(f"{rel}: unknown sourceId {f.get('sourceId')}")
            elif src.reuse == "link_only":
                if len(body) > LINK_ONLY_BODY_LIMIT:
                    errors.append(f"{rel}: source {src.id} is link_only; body {len(body)} chars > {LINK_ONLY_BODY_LIMIT}")
            elif src.reuse == "summary_link":
                seg = (f.get("reviewTarget") or {}).get("segmentId") or ""
                lid = fid if kind == "lectures" else seg.rsplit("-s", 1)[0]
                # Whole frontmatter: rubric, followUps and NotebookLM-written slideUnits live there, not in the body.
                text = body + "\n" + yaml.safe_dump(f, allow_unicode=True)
                if not lid:
                    # No lecture to compare against means no copy check; don't let that pass silently.
                    errors.append(f"{rel}: source {src.id} is summary_link; needs reviewTarget.segmentId for the copy check")
                elif hit := copied_span(text, lid):
                    errors.append(f"{rel}: copies {QUOTE_WORDS}+ consecutive transcript words: \"{hit}\"")
                elif require_transcripts and _transcript_shingles(lid) is None:
                    # Fail closed where transcripts are expected (local hook); CI has none and skips.
                    errors.append(f"{rel}: no transcript for {lid}; copy check could not run")
            elif src.reuse != "verbatim":
                errors.append(f"{rel}: unknown reuse policy {src.reuse!r}")  # fail closed
            for tid in [f.get("topicId")] if kind != "lectures" else [t for s in f.get("segments") or [] for t in s.get("topicIds", [])]:
                if tid and tid not in topics:
                    errors.append(f"{rel}: unknown topicId {tid}")
            if kind == "questions":
                if not body.startswith("## 문제"):
                    errors.append(f"{rel}: body must start with '## 문제'")
                if f.get("type") == "concept" and "\n## 해설" not in body:
                    errors.append(f"{rel}: concept question needs a '## 해설' section")
                rt = f.get("reviewTarget") or {}
                if rt.get("noteId") and rt["noteId"] not in docs["notes"]:
                    errors.append(f"{rel}: reviewTarget.noteId {rt['noteId']} not found")
                if sid := rt.get("segmentId"):
                    if sid not in segments:
                        errors.append(f"{rel}: reviewTarget.segmentId {sid} not in manifest or lectures")
                    elif sid not in lecture_segments:
                        warnings.append(f"{rel}: segment {sid} has no lecture file yet (AG)")
            if kind == "lectures":
                dur = f.get("durationSec") or 0
                for s in f.get("segments") or []:
                    if not 0 <= s["startSec"] < s["endSec"] <= dur:
                        errors.append(f"{rel}: segment {s['id']} outside 0..{dur}s")
                e, w = slide_provenance(f)
                errors += [f"{rel}: {m}" for m in e]
                warnings += [f"{rel}: {m}" for m in w]
    return errors, warnings


_NUM = re.compile(r"\d+")


def slide_provenance(f: dict) -> tuple[list[str], list[str]]:
    """Slide numbers must come from a real deck; NotebookLM cards must record the lecture as a source.

    The 2026-11-16 review found NotebookLM files with slide numbers split evenly over an imagined
    deck and content that never cited the lecture. The schema cannot cross-check these fields.
    """
    errors, warnings = [], []
    segs = f.get("segments") or []
    pages = (f.get("syllabus") or {}).get("deckPageCount")
    for s in segs:
        labels = [s.get("slideRange") or ""] + [u.get("slideNumberLabel", "") for u in s.get("slideUnits") or []]
        nums = [int(n) for lab in labels for n in _NUM.findall(lab)]
        if nums and not pages:
            errors.append(f"segment {s['id']} has slide numbers but syllabus has no slidesUrl/deckPageCount")
        elif nums and max(nums) > pages:
            errors.append(f"segment {s['id']} cites slide {max(nums)} > deckPageCount {pages}")
    units = [(s, u) for s in segs for u in s.get("slideUnits") or []]
    if any(u.get("generatedBy") == "notebooklm" for _, u in units):
        kinds = {x.get("kind") for x in (f.get("generation") or {}).get("sources") or []}
        if not kinds & {"youtube", "transcript"}:
            errors.append("NotebookLM cards but generation.sources lists no youtube/transcript input")
    if len(units) >= 3 and all(u["timestampSec"] == s["startSec"] for s, u in units):
        warnings.append("every slideUnit timestampSec equals its segment start; cards look unaligned to the lecture")
    return errors, warnings
