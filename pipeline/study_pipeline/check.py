"""Validate everything under content/: schema, references, license rules. Exit non-zero on error.

Runs offline from committed files only (sources, topics, manifests, content) so CI can use it.
"""

import json
from pathlib import Path

import jsonschema
import yaml

from .config import CONTENT, MANIFEST_DIR, SCHEMA
from .sources import load as load_sources

KINDS = {"questions": "question", "notes": "studyNote", "lectures": "lecture"}
LINK_ONLY_BODY_LIMIT = 600  # chars; link_only sources may carry a short summary plus links only


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


def check(content: Path = CONTENT) -> tuple[list[str], list[str]]:
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
            elif src.reuse == "link_only" and len(body) > LINK_ONLY_BODY_LIMIT:
                errors.append(f"{rel}: source {src.id} is link_only; body {len(body)} chars > {LINK_ONLY_BODY_LIMIT}")
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
    return errors, warnings
