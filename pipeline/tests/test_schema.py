import json

import jsonschema
import pytest

from study_pipeline import sources
from study_pipeline.config import SCHEMA

S = json.loads(SCHEMA.read_text())


def errors(defn: str, obj: dict) -> list[str]:
    v = jsonschema.Draft202012Validator({**S, "$ref": f"#/$defs/{defn}"})
    return [e.message for e in v.iter_errors(obj)]


def test_schema_is_valid_2020_12():
    jsonschema.Draft202012Validator.check_schema(S)


def test_sources_yaml_conforms():
    srcs = sources.load()
    assert {s.id for s in srcs} >= {"boost-ai-tech-interview", "cs329z-2026au", "wearesoft-tech-interview"}


SRC = {"id": "x", "url": "https://github.com/a/b", "kind": "repo", "attribution": "a", "checkedAt": "2026-11-15"}


@pytest.mark.parametrize("license", ["NONE", "MITT", "mit", "Proprietary"])
def test_verbatim_fails_closed_for_unknown_or_missing_license(license):
    assert errors("source", {**SRC, "license": license, "reuse": "verbatim"})


def test_verbatim_allowed_for_mit():
    assert errors("source", {**SRC, "license": "MIT", "reuse": "verbatim"}) == []


Q = {
    "id": "q1", "topicId": "t", "sourceId": "s", "type": "concept", "difficulty": "basic", "roles": ["mle"],
    "reviewTarget": {"noteId": "n1"}, "generation": {"by": "claude-code", "model": "m", "at": "2026-11-15"},
}
PASS_BY_AG = {"by": "antigravity", "model": "gemini-4-hydrogen", "verdict": "pass", "at": "2026-11-15"}


@pytest.mark.parametrize("status", ["reviewed", "published"])
def test_promotion_requires_review(status):
    assert errors("question", {**Q, "status": status})


def test_promotion_requires_pass_verdict():
    assert errors("question", {**Q, "status": "reviewed", "review": {**PASS_BY_AG, "verdict": "fail"}})


def test_self_review_rejected():
    assert errors("question", {**Q, "status": "reviewed", "review": {**PASS_BY_AG, "by": "claude-code"}})


def test_cross_review_accepted():
    assert errors("question", {**Q, "status": "reviewed", "review": PASS_BY_AG}) == []


def test_draft_needs_no_review():
    assert errors("question", {**Q, "status": "draft"}) == []
