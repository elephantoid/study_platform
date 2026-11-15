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
