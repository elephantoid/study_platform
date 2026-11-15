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
    report = repos.fetch([src(license="NONE", reuse="link_only")], FailGuard(), download=called.append)
    assert called == []
    assert report["s"]["status"] == "skipped"
    assert not (tmp_path / "repo" / "s").exists()


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
