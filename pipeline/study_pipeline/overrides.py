"""Reviewed corrections to extracted cards, kept outside content/ so re-extraction keeps them.

One YAML file per extractor (`notes.yaml`, `interview.yaml`), card id -> one of:
    {drop: <id of the card it duplicates>}
    {replace: [{old, new}, ...]}                      `old` must occur exactly once
    {append: <markdown>, followUps: [...], author: {model, at}}
`replace` corrects the source text. `append` and `followUps` are ours, not the source's: `append`
is set apart under its own heading, and both need `author`, which is recorded in `generation.model`
so the reviewer can be chosen from a different model family (CONTRACT §3).
"""

from pathlib import Path

import yaml

CORRECTED = "\n\n---\n\n_검수에서 원문의 오류를 바로잡았다. 원문은 위 출처에 있다._"
APPENDED = "\n\n---\n\n### 보강\n\n_아래는 검수에서 덧붙인 내용이며 원문에 없다._\n\n"
KEYS = {"drop", "replace", "append", "followUps", "author"}


def load(path: Path) -> dict[str, dict]:
    ovs = (yaml.safe_load(path.read_text()) or {}) if path.exists() else {}
    for qid, ov in ovs.items():
        if not ov or (bad := set(ov) - KEYS):
            raise ValueError(f"{qid}: empty override or unknown keys {sorted(bad) if ov else ''}")
        if "drop" in ov and len(ov) > 1:
            raise ValueError(f"{qid}: drop excludes other keys")
        if ("append" in ov or "followUps" in ov) != ("author" in ov):
            raise ValueError(f"{qid}: append/followUps need author, and author needs one of them")
        if "author" in ov and set(ov["author"]) != {"model", "at"}:
            raise ValueError(f"{qid}: author needs exactly model and at")
    return ovs


def require_all_used(ovs: dict[str, dict], seen: set[str]) -> None:
    if stale := sorted(set(ovs) - seen):
        raise ValueError(f"overrides for cards that were not extracted: {stale}")


def apply_replacements(qid: str, text: str, replace: list[dict]) -> str:
    # Fail loudly: a correction that no longer matches means the source moved under it.
    for r in replace:
        if text.count(r["old"]) != 1:
            raise ValueError(f"{qid}: override text must occur exactly once: {r['old'][:60]!r}")
        text = text.replace(r["old"], r["new"])
    return text + CORRECTED if replace else text


def apply_body(qid: str, text: str, ov: dict) -> str:
    text = apply_replacements(qid, text, ov.get("replace", []))
    return text + APPENDED + ov["append"].strip() if "append" in ov else text


def apply_front(qid: str, front: dict, ov: dict) -> dict:
    if "author" not in ov:
        return front
    gen = front["generation"]
    front = {**front, "generation": {**gen, "model": f"{gen['model']} + {ov['author']['model']}", "at": str(ov["author"]["at"])}}
    if "followUps" in ov:
        # id and order follow from the position, so they cannot disagree with it.
        front["followUps"] = [{"id": f"{qid}-f{i}", "order": i, **f} for i, f in enumerate(ov["followUps"], 1)]
    return front
