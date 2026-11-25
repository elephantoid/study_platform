import io
import subprocess
import tarfile

import pytest

from study_pipeline import repos, youtube
from study_pipeline.failguard import Aborted, FailGuard
from study_pipeline.sources import Source


def make_tar(files: dict[str, bytes]) -> bytes:
    buf = io.BytesIO()
    with tarfile.open(fileobj=buf, mode="w:gz") as tar:
        for name, data in files.items():
            info = tarfile.TarInfo(name)
            info.size = len(data)
            tar.addfile(info, io.BytesIO(data))
    return buf.getvalue()


def test_extract_keeps_only_markdown_and_license(tmp_path):
    tar = make_tar({
        "o-r-sha/README.md": b"# hi",
        "o-r-sha/answers/ml.md": b"q",
        "o-r-sha/LICENSE": b"MIT",
        "o-r-sha/img/a.png": b"\x89PNG",
        "o-r-sha/run.sh": b"rm -rf /",
    })
    assert repos.extract_markdown(tar, tmp_path) == 3
    assert sorted(p.relative_to(tmp_path).as_posix() for p in tmp_path.rglob("*") if p.is_file()) == [
        "LICENSE", "README.md", "answers/ml.md",
    ]


def test_extract_rejects_path_traversal(tmp_path):
    tar = make_tar({"o-r-sha/../../evil.md": b"x"})
    with pytest.raises(tarfile.FilterError):
        repos.extract_markdown(tar, tmp_path / "dest")
    assert not (tmp_path / "evil.md").exists()


def src(**kw) -> Source:
    base = dict(id="s", url="https://github.com/a/b", kind="repo", license="MIT", reuse="verbatim",
                attribution="a", checkedAt="2026-11-15")
    return Source(**{**base, **kw})


def test_link_only_downloads_nothing(monkeypatch, tmp_path):
    monkeypatch.setattr(repos, "RAW_DIR", tmp_path)
    called = []
    report = repos.fetch([src(license="NONE", reuse="link_only")], FailGuard(), {}, download=called.append)
    assert called == []
    assert report["s"]["status"] == "skipped"
    assert not (tmp_path / "repo" / "s").exists()


@pytest.mark.parametrize("audit_status", [None, "drift", "failed"])
def test_unverified_license_downloads_nothing(monkeypatch, tmp_path, audit_status):
    monkeypatch.setattr(repos, "RAW_DIR", tmp_path)
    called = []
    audited = {"s": {"status": audit_status}} if audit_status else {}
    report = repos.fetch([src()], FailGuard(), audited, download=called.append)
    assert called == [] and report["s"]["status"] == "failed"


@pytest.mark.parametrize("url", [
    "https://github.com/a/b/../../orgs/x",
    "https://github.com/a",
    "https://evil.com/a/b",
    "https://github.com/a/..",
    "https://github.com/a/b?x=1/../../y",
])
def test_repo_url_rejects_non_plain_github(url):
    with pytest.raises(ValueError):
        src(url=url).repo


def test_unavailable_reason_does_not_mask_blocks():
    vid = "aaaaaaaaaaa"
    assert youtube.unavailable_reason(f"ERROR: [youtube] {vid}: Private video. Sign in") == "Private video"
    assert youtube.unavailable_reason(f"ERROR: [youtube] {vid}: Sign in to confirm you're not a bot. Private video") is None
    assert youtube.unavailable_reason("HTTP Error 429: Too Many Requests") is None
    assert youtube.unavailable_reason("some text mentioning Private video") is None


def test_lecture_ids_are_stable_and_title_numbered():
    titles = {"a": "Lecture 6", "b": "Lecture 1", "c": "Intro", "d": "Lecture 1 (re-upload)"}
    ids = youtube.lecture_ids("cs", ["a", "b", "c", "d"], titles, {})
    assert ids == {"a": "cs-l06", "b": "cs-l01", "c": "cs-l07", "d": "cs-l08"}
    # A new video inserted at the front must not renumber existing ones.
    again = youtube.lecture_ids("cs", ["new", "a", "b", "c", "d"], {**titles, "new": "Bonus"}, ids)
    assert {k: again[k] for k in ids} == ids and again["new"] == "cs-l09"


def test_defuddle_markdown_parsing():
    from study_pipeline import transcripts

    md = "### Welcome\n\n**0:05** · Hello.\n\n**0:09** · Today.\n\n### Agents\n\n**1:02:03** · Tools."
    cues, chapters = transcripts.parse_defuddle(md)
    assert [c["s"] for c in cues] == [5, 9, 3723]
    assert chapters == [{"title": "Welcome", "startSec": 5}, {"title": "Agents", "startSec": 3723}]
    assert cues[0]["e"] == 9


def test_split_qa_boost_format():
    from study_pipeline.extract_interview import split_qa

    text = (
        "# T\n## Table of Contents\n- x\n\n---\n\n## #1\n\n#### Q one?\n\nAnswer ![i](./img/a.png)\n\n"
        "#### References\n\n- [r](https://e.com)\n\n---\n\n## #2\n\n#### Q two?\n\nA2\n"
    )
    text += (
        "\n---\n\n## #3\n\n### Stats style heading?\n\n" + "x" * 50 + "\n\n### sub heading\n\nmore\n"
        "\n---\n\n## #4\n\n#### Graph\n\nshort\n\n---\n\n## #4-1\n\n#### BFS\n\n" + "y" * 50 + "\n"
    )
    qa = split_qa(text.replace("A2\n", "A2 " + "z" * 50 + "\n").replace("Answer ", "Answer " + "w" * 40))
    assert [q for q, _ in qa] == ["Q one?", "Q two?", "Stats style heading?", "BFS"]
    assert "### sub heading" in qa[2][1]
    assert "**References**" in qa[0][1] and "[r](https://e.com)" in qa[0][1]


def test_failguard_aborts_on_second_identical_error():
    g = FailGuard()
    g.record("video-info", RuntimeError("Sign in to confirm you're not a bot: aaaaaaaaaaa"))
    with pytest.raises(Aborted):
        # Different video id, same error class and message -> same key.
        g.record("video-info", RuntimeError("Sign in to confirm you're not a bot: bbbbbbbbbbb"))


def test_failguard_tolerates_distinct_errors():
    g = FailGuard()
    g.record("repo-download", subprocess.TimeoutExpired("gh", 1))
    g.record("repo-download", OSError("network down"))


def test_caption_status_prefers_original_track():
    info = {"subtitles": {}, "automatic_captions": {"en-orig": [{}], "en": [{}], "zh-Hans": [{}]}}
    assert youtube.caption_status(info) == {"manual": [], "autoOrig": True, "hasCaptions": True}


def test_private_videos_are_recorded_not_counted(monkeypatch):
    from yt_dlp.utils import DownloadError

    def private(vid):
        raise DownloadError(f"ERROR: [youtube] {vid}: Private video. Sign in if you've been granted access")

    monkeypatch.setattr(youtube, "video_info", private)
    g = FailGuard()
    s = src(kind="youtube-playlist", url="https://www.youtube.com/playlist?list=PLx", uploader="Stanford Online")
    recs = [youtube._video_record(s, v, g) for v in ("aaaaaaaaaaa", "bbbbbbbbbbb", "ccccccccccc")]
    assert all(r["unavailable"] == "Private video" for r in recs)


@pytest.mark.parametrize(
    "info, expected",
    [
        ({"subtitles": {"en-j3PyPqV-e1s": []}, "automatic_captions": {"en-orig": []}}, ("manual", "en-j3PyPqV-e1s")),
        ({"subtitles": {"en": [], "en-GB": []}}, ("manual", "en")),
        ({"subtitles": {"ko": []}, "automatic_captions": {"en-orig": [], "en": []}}, ("auto", "en-orig")),
        ({"automatic_captions": {"en": []}, "language": "en-US"}, ("auto", "en")),
        # Korean audio: auto "en" is a machine translation -> refused.
        ({"automatic_captions": {"en": [], "ko-orig": []}, "language": "ko"}, None),
        ({"automatic_captions": {"en": []}}, None),
        ({}, None),
    ],
)
def test_pick_caption_track(info, expected):
    assert youtube.pick_caption_track(info) == expected


def test_caption_status_none():
    assert youtube.caption_status({})["hasCaptions"] is False


def test_retired_lecture_ids_are_never_recycled():
    existing = {"a": "cs-l01", "gone": "cs-l02"}  # "gone" left the playlist
    ids = youtube.lecture_ids("cs", ["a", "new"], {"a": "Intro", "new": "Bonus"}, existing)
    assert ids["new"] == "cs-l03"


def test_extract_refuses_without_audited_verbatim_license(monkeypatch, tmp_path):
    from study_pipeline import extract_interview as ex

    monkeypatch.setattr(ex, "MANIFEST_DIR", tmp_path)  # no audit.json
    with pytest.raises(PermissionError):
        ex.extract({})
    (tmp_path / "audit.json").write_text('{"boost-ai-tech-interview": {"status": "drift", "license": "NONE"}}')
    with pytest.raises(PermissionError):
        ex.extract({})


def test_copied_span_detects_transcript_copy(monkeypatch, tmp_path):
    import json as _json

    from study_pipeline import check

    (tmp_path / "yt").mkdir()
    words = "the attention mechanism lets every token look at every other token in the sequence at once"
    (tmp_path / "yt" / "x-l01.json").write_text(_json.dumps({"cues": [{"t": words}]}))
    monkeypatch.setattr(check, "RAW_DIR", tmp_path)
    check._transcript_shingles.cache_clear()
    assert check.copied_span("요약: " + words, "x-l01")
    assert check.copied_span("attention lets each token attend to all others", "x-l01") is None


@pytest.mark.parametrize("lid", ["../../etc/x-l01", "x-l01/../../y", "/abs-l01", "X-L01", ""])
def test_copied_span_rejects_non_id_paths(monkeypatch, tmp_path, lid):
    from study_pipeline import check

    monkeypatch.setattr(check, "RAW_DIR", tmp_path / "raw")
    check._transcript_shingles.cache_clear()
    assert check._transcript_shingles(lid) is None


def test_require_transcripts_fails_closed(monkeypatch, tmp_path):
    from study_pipeline import check
    monkeypatch.setattr(check, "RAW_DIR", tmp_path)
    check._transcript_shingles.cache_clear()
    try:
        errs, _ = check.check(require_transcripts=True)
        assert any("no transcript for" in e for e in errs)
        errs, _ = check.check()
        assert not any("no transcript for" in e for e in errs)
    finally:
        check._transcript_shingles.cache_clear()


def _repo(tmp_path, monkeypatch):
    import os
    import subprocess
    # Inside a git hook GIT_DIR/GIT_INDEX_FILE point at the real repo; without this the temp
    # repo's init/config/commit land there (happened once: bogus commits, core.bare=true).
    for k in [k for k in os.environ if k.startswith("GIT_")]:
        monkeypatch.delenv(k)
    run = lambda *a: subprocess.run(["git", *a], cwd=tmp_path, check=True, capture_output=True)
    run("init", "-q", "-b", "work"); run("config", "user.email", "t@t"); run("config", "user.name", "t")
    (tmp_path / "content").mkdir()
    return run


def test_gate_detects_staged_and_branch_transitions(monkeypatch, tmp_path):
    from study_pipeline import gate
    monkeypatch.setattr(gate, "ROOT", tmp_path)
    run = _repo(tmp_path, monkeypatch)
    f = tmp_path / "content" / "a.md"
    f.write_text("---\nstatus: draft\n---\nx\n"); run("add", "."); run("commit", "-qm", "draft")
    run("branch", "base")
    assert gate.transitions() == []
    f.write_text("---\nstatus: published\n---\nx\n"); run("add", ".")
    assert gate.transitions() == ["content/a.md"]
    run("commit", "-qm", "publish")
    assert gate.transitions("base") == ["content/a.md"]
    assert gate.transitions("HEAD") == []  # already published: not a transition


def test_gate_catches_rename_with_status_flip(monkeypatch, tmp_path):
    from study_pipeline import gate
    monkeypatch.setattr(gate, "ROOT", tmp_path)
    run = _repo(tmp_path, monkeypatch)
    (tmp_path / "content" / "a.md").write_text("---\nstatus: draft\n---\nsame body\n"); run("add", "."); run("commit", "-qm", "d")
    run("mv", "content/a.md", "content/b.md")
    (tmp_path / "content" / "b.md").write_text("---\nstatus: published\n---\nsame body\n"); run("add", ".")
    assert gate.transitions() == ["content/b.md"]


def test_gate_sees_non_ascii_paths(monkeypatch, tmp_path):
    from study_pipeline import gate
    monkeypatch.setattr(gate, "ROOT", tmp_path)
    run = _repo(tmp_path, monkeypatch)
    (tmp_path / "content" / "강의.md").write_text("---\nstatus: published\n---\nx\n"); run("add", ".")
    assert gate.transitions() == ["content/강의.md"]


def test_gate_tty_unavailable_means_rejected(monkeypatch):
    from study_pipeline import gate
    import builtins
    def no_tty(*a, **k):
        raise OSError("no tty")
    monkeypatch.setattr(builtins, "open", no_tty)
    assert gate.confirm_on_tty(["content/a.md"]) is False


def test_summary_link_without_lecture_fails_closed(tmp_path):
    from study_pipeline import check
    (tmp_path / "questions").mkdir()
    (tmp_path / "questions" / "q9.md").write_text(
        "---\nid: q9\nsourceId: cs329z-2026au\nreviewTarget: {noteId: n1}\n---\n## 문제\nx\n")
    errs, _ = check.check(content=tmp_path)
    assert any("needs reviewTarget.segmentId" in e for e in errs)


@pytest.mark.parametrize("lid,vid,extra,expect", [
    ("../../x-l01", "abcdefghijk", {}, "invalid"),
    ("x-l01", "abc/../../xx", {}, "invalid"),
    ("x-l01", "abcdefghijk", {"uploaderOk": False, "uploader": "Mirror"}, "uploader"),
    ("x-l01", "abcdefghijk", {}, "uploader"),  # never verified: fail closed too
])
def test_transcript_fetch_refuses_untrusted_entries(monkeypatch, tmp_path, lid, vid, extra, expect):
    from study_pipeline import transcripts

    def boom(*a, **k):
        raise AssertionError("must not download")
    monkeypatch.setattr(transcripts, "yt_dir", lambda: tmp_path)
    monkeypatch.setattr(transcripts, "_via_ytdlp", boom)
    manifest = {"s": {"videos": {vid: {"lectureId": lid, "track": ["manual", "en"], **extra}}}}
    report = transcripts.fetch(manifest, FailGuard())
    assert report[lid].startswith("failed") and expect in report[lid]
    assert list(tmp_path.iterdir()) == []


def test_absolutize_leaves_angle_bracket_urls_alone():
    from study_pipeline.extract_notes import absolutize
    md = "[a](<https://x.io/p>) [b](./img/c.png) ![d](e.png)"
    out = absolutize(md, "o/r", "Computer Science/Network")
    assert "(<https://x.io/p>)" in out
    assert "(https://raw.githubusercontent.com/o/r/HEAD/Computer%20Science/Network/img/c.png)" in out
    assert "(https://raw.githubusercontent.com/o/r/HEAD/Computer%20Science/Network/e.png)" in out


@pytest.mark.parametrize("raw,q", [
    ("**[DB] Index**", "Index에 대해 설명하세요."),
    ("2019.08.26.(월) [BYM] UDP란?", "UDP에 대해 설명하세요."),
    ("운영 체제란 무엇인가?", "운영 체제란 무엇인가?"),
    ("Sort_Radix", "Sort Radix에 대해 설명하세요."),
])
def test_note_titles_become_questions(raw, q):
    from study_pipeline.extract_notes import clean_title, question
    assert question(clean_title(raw)) == q


def test_sections_split_on_h2_only():
    from study_pipeline.extract_notes import cards_from_sections
    text = "# Part\n* toc\n\n## A\n### a1\nbody a\n\n[뒤로](x)\n\n---\n## B\nbody b\n"
    assert cards_from_sections(text) == [("A", "### a1\nbody a"), ("B", "body b")]


def test_extract_notes_refuses_without_audited_license(monkeypatch, tmp_path):
    from study_pipeline import extract_interview, extract_notes
    monkeypatch.setattr(extract_interview, "MANIFEST_DIR", tmp_path)  # no audit.json
    with pytest.raises(PermissionError):
        extract_notes.extract({})


def test_jobhope_author_block_dropped():
    from study_pipeline.extract_notes import cards_from_file
    text = "# **Dot**\n## 작성자\n[![a](https://x/a.png)](https://github.com/a)\n\n## 내적\n" + "본문 " * 5
    assert cards_from_file(text, "f") == [("Dot", "## 내적\n" + ("본문 " * 5).strip())]


def test_note_override_replaces_once_and_marks_card():
    from study_pipeline.overrides import CORRECTED, apply_replacements
    out = apply_replacements("x", "u·v = 12", [{"old": "= 12", "new": "= 14"}])
    assert out == "u·v = 14" + CORRECTED
    assert apply_replacements("x", "same", []) == "same"


@pytest.mark.parametrize("text", ["no match here", "= 12 and = 12"])
def test_note_override_fails_when_text_moved(text):
    from study_pipeline.overrides import apply_replacements
    with pytest.raises(ValueError):
        apply_replacements("x", text, [{"old": "= 12", "new": "= 14"}])


AUTHOR = {"model": "m", "at": "2026-11-25"}


def test_override_append_is_set_apart_and_after_the_correction_note():
    from study_pipeline.overrides import APPENDED, CORRECTED, apply_body
    ov = {"replace": [{"old": "a", "new": "b"}], "append": "extra\n", "author": AUTHOR}
    assert apply_body("x", "a", ov) == "b" + CORRECTED + APPENDED + "extra"
    assert apply_body("x", "a", {}) == "a"


def test_override_follow_ups_get_ids_and_record_their_author():
    from study_pipeline.overrides import apply_front
    front = {"id": "q1", "generation": {"by": "claude-code", "model": "rule@1", "at": "2026-11-15"}}
    out = apply_front("q1", front, {"followUps": [{"promptMd": "a"}, {"promptMd": "b"}], "author": AUTHOR})
    assert out["followUps"] == [{"id": "q1-f1", "order": 1, "promptMd": "a"}, {"id": "q1-f2", "order": 2, "promptMd": "b"}]
    assert out["generation"] == {"by": "claude-code", "model": "rule@1 + m", "at": "2026-11-25"}
    assert front["generation"]["model"] == "rule@1"  # shared dict of every card must not change
    assert apply_front("q1", front, {"replace": []}) is front


@pytest.mark.parametrize("ov", [
    "{}", "{oops: 1}", "{drop: y, replace: []}", "{append: t}", "{followUps: []}",
    "{author: {model: m, at: 2026-11-25}}", "{append: t, author: {model: m}}",
])
def test_override_file_rejects_malformed_entries(tmp_path, ov):
    from study_pipeline import overrides
    (tmp_path / "o.yaml").write_text(f"x: {ov}\n")
    with pytest.raises(ValueError):
        overrides.load(tmp_path / "o.yaml")


def _interview(monkeypatch, tmp_path, override_yaml):
    from study_pipeline import extract_interview as ex
    src_dir = tmp_path / "raw" / "repo" / ex.SOURCE_ID / "answers"
    src_dir.mkdir(parents=True)
    blocks = "".join(f"## #{n}\n\n#### Q{n}\n\nbody{n} {'w' * 50}\n\n---\n\n" for n in (1, 2, 3))
    (src_dir / "f.md").write_text("# T\n\n" + blocks)
    (tmp_path / "interview.yaml").write_text(override_yaml)
    monkeypatch.setattr(ex, "RAW_DIR", tmp_path / "raw")
    monkeypatch.setattr(ex, "CONTENT", tmp_path / "content")
    monkeypatch.setattr(ex, "OVERRIDES", tmp_path / "interview.yaml")
    monkeypatch.setattr(ex, "FILES", {"f.md": ("algorithm", "b-algo")})
    monkeypatch.setattr(ex, "require_verbatim_license", lambda sid: None)
    run = lambda: ex.extract({"algorithm": {"name": "A", "roles": {"mle": 2}}}, "2026-11-15")
    return run, tmp_path / "content"


def test_extract_interview_applies_overrides_on_every_run(monkeypatch, tmp_path):
    from study_pipeline.check import split_front
    run, content = _interview(monkeypatch, tmp_path, """
b-algo-001: {drop: b-algo-002}
b-algo-002:
  author: {model: m, at: 2026-11-25}
  replace: [{old: body2, new: fixed}]
  append: more
  followUps: [{promptMd: why}]
""")
    stale = content / "questions" / "algorithm" / "b-algo-001.md"
    stale.parent.mkdir(parents=True)
    stale.write_text("dropped card from an earlier run")
    assert run() == run() == {"f.md": 2}
    assert not stale.exists()
    front, body = split_front((stale.parent / "b-algo-002.md").read_text())
    assert front["followUps"] == [{"id": "b-algo-002-f1", "order": 1, "promptMd": "why"}]
    assert "fixed" in body and "body2" not in body and body.endswith("more")
    front3, body3 = split_front((stale.parent / "b-algo-003.md").read_text())  # ids never shift
    assert "body3" in body3 and "followUps" not in front3 and front3["generation"]["at"] == "2026-11-15"
    index = (content / "notes" / "algorithm" / "b-algo-index.md").read_text()
    assert "b-algo-001" not in index and "b-algo-002" in index


def test_extract_interview_rejects_override_for_unknown_card(monkeypatch, tmp_path):
    run, _ = _interview(monkeypatch, tmp_path, "b-algo-009: {drop: b-algo-001}\n")
    with pytest.raises(ValueError, match="b-algo-009"):
        run()
