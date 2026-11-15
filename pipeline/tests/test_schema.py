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


FU = {"promptMd": "p", "hintKo": "h", "rubricKeywords": ["k"], "modelAnswerKo": "a", "maxScore": 5}


def test_follow_ups_optional_for_existing_cards():
    assert errors("question", {**Q, "status": "draft"}) == []


@pytest.mark.parametrize("n", [1, 2, 4])
def test_follow_ups_exactly_three_when_present(n):
    fus = [{**FU, "id": f"q1-f{i}", "order": min(i, 3)} for i in range(1, n + 1)]
    assert errors("question", {**Q, "status": "draft", "followUps": fus})


def test_three_follow_ups_accepted():
    fus = [{**FU, "id": f"q1-f{i}", "order": i} for i in (1, 2, 3)]
    assert errors("question", {**Q, "status": "draft", "followUps": fus}) == []


LEC = {
    "id": "ibm-ai-agents-l01", "sourceId": "ibm-ai-agents", "course": "ibm", "term": "-", "title": "t",
    "videoId": "abcdefghijk", "durationSec": 600, "hasCaptions": True, "status": "draft",
    "segments": [{"id": "ibm-ai-agents-l01-s01", "startSec": 0, "endSec": 600, "title": "t", "summaryKo": "s", "topicIds": ["ai-agents"]}],
}
NLM = {**LEC, "generation": {"by": "notebooklm", "model": "notebooklm", "at": "2026-11-16"}}


def test_lecture_without_syllabus_or_slides_accepted():
    # IBM playlists have no syllabus or slide deck.
    assert errors("lecture", {**LEC, "generation": {"by": "antigravity", "model": "m", "at": "2026-11-16"}}) == []


def test_notebooklm_output_not_reviewable_by_gemini_side():
    assert errors("lecture", {**NLM, "status": "reviewed", "review": PASS_BY_AG})


def test_notebooklm_output_reviewable_by_claude():
    assert errors("lecture", {**NLM, "status": "reviewed", "review": {**PASS_BY_AG, "by": "claude-code"}}) == []
