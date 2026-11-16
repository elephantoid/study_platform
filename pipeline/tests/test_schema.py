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
YT = [{"kind": "youtube", "url": "https://www.youtube.com/watch?v=abcdefghijk"}]
NLM = {**LEC, "generation": {"by": "notebooklm", "model": "notebooklm", "at": "2026-11-16", "sources": YT}}


def test_lecture_without_syllabus_or_slides_accepted():
    # IBM playlists have no syllabus or slide deck.
    assert errors("lecture", {**LEC, "generation": {"by": "antigravity", "model": "m", "at": "2026-11-16"}}) == []


def test_notebooklm_output_not_reviewable_by_gemini_side():
    assert errors("lecture", {**NLM, "status": "reviewed", "review": PASS_BY_AG})


def test_notebooklm_output_reviewable_by_claude():
    assert errors("lecture", {**NLM, "status": "reviewed", "review": {**PASS_BY_AG, "by": "claude-code"}}) == []


UNIT = {"slideId": "u1", "slideNumberLabel": "Slides 01–02", "slideTitle": "t", "timestampSec": 0,
        "slideVisualBullets": ["b"], "explanationArticleMd": "e", "keyTakeawayKo": "k", "notebookLmPrompt": "p"}


def _with_unit(by: str) -> dict:
    seg = {**LEC["segments"][0], "slideRange": "Slides 1–2", "slideUnits": [{**UNIT, "generatedBy": by}]}
    return {**LEC, "segments": [seg], "generation": {"by": "human", "model": "-", "at": "2026-11-16"}}


def test_slide_unit_requires_generator():
    seg = {**LEC["segments"][0], "slideUnits": [UNIT]}
    assert errors("lecture", {**LEC, "segments": [seg], "generation": {"by": "human", "model": "-", "at": "2026-11-16"}})


@pytest.mark.parametrize("by", ["notebooklm", "antigravity"])
def test_gemini_card_inside_human_file_not_reviewable_by_ag(by):
    assert errors("lecture", {**_with_unit(by), "status": "reviewed", "review": PASS_BY_AG})


def test_human_cards_reviewable_by_ag():
    assert errors("lecture", {**_with_unit("human"), "status": "reviewed", "review": PASS_BY_AG}) == []


def test_free_text_is_capped():
    seg = {**LEC["segments"][0], "slideUnits": [{**UNIT, "generatedBy": "human", "explanationArticleMd": "x" * 3001}]}
    assert errors("lecture", {**LEC, "segments": [seg], "generation": {"by": "human", "model": "-", "at": "2026-11-16"}})


@pytest.mark.parametrize("srcs", [None, [{"kind": "syllabus", "url": "https://x.edu/"}]])
def test_notebooklm_must_record_lecture_as_source(srcs):
    gen = {"by": "notebooklm", "model": "notebooklm", "at": "2026-11-16"} | ({"sources": srcs} if srcs else {})
    assert errors("lecture", {**LEC, "generation": gen})


SYL = {"lectureNo": 1, "date": "2026-09-23", "instructor": "i", "syllabusUrl": "https://x.edu/"}
DECK = {"slidesTitle": "t", "slidesUrl": "https://x.edu/slides/lecture01.pdf", "deckPageCount": 71}


def test_syllabus_without_deck_accepted():
    assert errors("lecture", {**NLM, "syllabus": SYL}) == []
    assert errors("lecture", {**NLM, "syllabus": {**SYL, **DECK}}) == []


@pytest.mark.parametrize("bad", [
    {**DECK, "slidesUrl": "https://x.edu/"},                       # homepage, not a deck
    {"slidesUrl": DECK["slidesUrl"]},                              # deck without page count
    {"deckPageCount": 58},                                         # page count without deck
    {"notebookLmUrl": "https://notebooklm.google.com/"},           # product homepage
])
def test_syllabus_deck_fields_must_be_real(bad):
    assert errors("lecture", {**NLM, "syllabus": {**SYL, **bad}})


def test_shared_notebook_url_accepted():
    url = "https://notebooklm.google.com/notebook/0a1b2c3d-4e5f"
    assert errors("lecture", {**NLM, "syllabus": {**SYL, "notebookLmUrl": url}}) == []


def _lec(units_at, label="Slides 1–2", syllabus=None, sources=YT):
    segs = [{**LEC["segments"][0], "id": f"ibm-ai-agents-l01-s0{i}", "startSec": i * 100, "endSec": i * 100 + 100,
             "slideUnits": [{**UNIT, "slideNumberLabel": label, "timestampSec": i * 100 + t, "generatedBy": "notebooklm"}]}
            for i, t in enumerate(units_at)]
    f = {**LEC, "segments": segs, "generation": {**NLM["generation"], "sources": sources}}
    return f | ({"syllabus": syllabus} if syllabus else {})


def test_slide_numbers_need_a_real_deck():
    from study_pipeline.check import slide_provenance
    assert slide_provenance(_lec([5]))[0]                                           # no deck at all
    assert slide_provenance(_lec([5], "Slides 70–72", {**SYL, **DECK}))[0]          # beyond page 71
    assert slide_provenance(_lec([5], "Slides 39–40", {**SYL, **DECK}))[0] == []
    assert slide_provenance(_lec([5], ""))[0] == []                                 # no numbers, no deck: fine


def test_notebooklm_cards_need_lecture_source_even_in_other_files():
    from study_pipeline.check import slide_provenance
    assert slide_provenance(_lec([5], "", sources=[{"kind": "slides", "url": DECK["slidesUrl"]}]))[0]


def test_cards_pinned_to_segment_start_warn():
    from study_pipeline.check import slide_provenance
    assert slide_provenance(_lec([0, 0, 0], ""))[1]
    assert slide_provenance(_lec([0, 40, 0], ""))[1] == []
