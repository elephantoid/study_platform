"""Playlist and caption metadata via yt-dlp. Never downloads media; M1 stores no transcript text."""

from concurrent.futures import ThreadPoolExecutor
from datetime import date

from yt_dlp import YoutubeDL
from yt_dlp.utils import DownloadError

from .config import CAPTION_LANGS, PLAYLIST_LIMITS, YT_WORKERS
from .failguard import Aborted, FailGuard
from .sources import Source

import re


class _SilentLogger:
    # Errors are recorded in the manifest; yt-dlp's own stderr dump is noise.
    def debug(self, msg): pass
    def warning(self, msg): pass
    def error(self, msg): pass


_BASE_OPTS = {"quiet": True, "no_warnings": True, "skip_download": True, "logger": _SilentLogger()}

# Per-video states, not blocks: record and re-check next run (scheduled lectures start private).
_UNAVAILABLE = re.compile(r"Private video|Video unavailable|has been removed|members-only|Premieres in", re.I)


def list_playlist(playlist_id: str, limit: int | None) -> list[str]:
    opts = {**_BASE_OPTS, "extract_flat": "in_playlist"}
    if limit:
        opts["playlistend"] = limit
    with YoutubeDL(opts) as ydl:
        info = ydl.extract_info(f"https://www.youtube.com/playlist?list={playlist_id}", download=False)
    return [e["id"] for e in info.get("entries") or [] if e and e.get("id")]


def video_info(video_id: str) -> dict:
    with YoutubeDL(_BASE_OPTS) as ydl:
        return ydl.extract_info(f"https://www.youtube.com/watch?v={video_id}", download=False)


def caption_status(info: dict) -> dict:
    manual = set(info.get("subtitles") or {})
    auto = set(info.get("automatic_captions") or {})
    return {
        "manual": sorted(lang for lang in manual if lang.startswith("en")),
        "autoOrig": any(lang in auto for lang in CAPTION_LANGS if lang.endswith("-orig")),
        "hasCaptions": bool(manual & set(CAPTION_LANGS)) or any(lang in auto for lang in CAPTION_LANGS),
    }


def pick_caption_track(info: dict) -> tuple[str, str] | None:
    """Choose which caption track M2 will summarize from: ("manual"|"auto", lang) or None.

    Inputs are yt-dlp's `subtitles` (uploaded by the channel) and `automatic_captions`
    (ASR; `en-orig` is the original-language recognition, plain `en` on a non-English
    video is a machine translation).
    """
    # Manual tracks can carry a name suffix (e.g. "en-j3PyPqV-e1s").
    manual = sorted(lang for lang in info.get("subtitles") or {} if lang == "en" or lang.startswith("en-"))
    if manual:
        return "manual", "en" if "en" in manual else manual[0]
    auto = info.get("automatic_captions") or {}
    if "en-orig" in auto:
        return "auto", "en-orig"
    # Without -orig, auto "en" is original ASR only when the audio is English;
    # otherwise it is a machine translation, which is never used.
    if "en" in auto and (info.get("language") or "").startswith("en"):
        return "auto", "en"
    return None


def _video_record(s: Source, vid: str, guard: FailGuard) -> dict | None:
    try:
        info = video_info(vid)
    except DownloadError as e:
        if m := _UNAVAILABLE.search(str(e)):
            return {"videoId": vid, "unavailable": m.group(0)}
        guard.record("video-info", e)
        return {"videoId": vid, "error": str(e)[:200]}
    uploader = info.get("channel") or info.get("uploader")
    return {
        "videoId": vid,
        "title": info.get("title"),
        "durationSec": info.get("duration"),
        "uploadDate": info.get("upload_date"),
        "uploader": uploader,
        "uploaderOk": uploader == s.uploader,
        "language": info.get("language"),
        # YouTube chapters become M2 segment boundaries without an LLM split.
        "chapters": len(info.get("chapters") or []),
        "track": list(track) if (track := pick_caption_track(info)) else None,
        **caption_status(info),
    }


def scan(sources: list[Source], manifest: dict, guard: FailGuard, refresh: bool = False) -> dict:
    """Update `manifest` in place: {sourceId: {checkedAt, videos: {videoId: record}}}."""
    for s in sources:
        if s.kind != "youtube-playlist":
            continue
        entry = manifest.setdefault(s.id, {"videos": {}})
        try:
            ids = list_playlist(s.playlist_id, PLAYLIST_LIMITS.get(s.id))
        except DownloadError as e:
            guard.record("playlist", e)
            entry["error"] = str(e)[:200]
            continue
        # Polling: only new, failed or unavailable videos are fetched again unless --refresh.
        def pending(v: str) -> bool:
            rec = entry["videos"].get(v)
            return refresh or rec is None or "error" in rec or "unavailable" in rec

        todo = [v for v in ids if pending(v)]
        with ThreadPoolExecutor(YT_WORKERS) as pool:
            for rec in pool.map(lambda v: _video_record(s, v, guard), todo):
                entry["videos"][rec["videoId"]] = rec
        entry["order"] = ids
        entry["checkedAt"] = date.today().isoformat()
        entry.pop("error", None)
    return manifest


__all__ = ["Aborted", "scan", "caption_status", "pick_caption_track"]
