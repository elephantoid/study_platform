"""Fetch the chosen caption track per lecture into RAW_DIR/yt. Raw transcripts never enter content/.

Primary: yt-dlp downloads exactly the track `youtube.pick_caption_track` chose.
Fallback: Defuddle (the Obsidian Web Clipper extractor) when yt-dlp is blocked. Defuddle does
not report which track it used, so its output is always marked ("auto", "unknown").
"""

import json
import re
import subprocess
from pathlib import Path

from yt_dlp import YoutubeDL
from yt_dlp.utils import DownloadError

from .config import RAW_DIR
from .failguard import FailGuard
from .youtube import _BASE_OPTS, with_segment_ids

DEFUDDLE = "defuddle@0.19.6"  # pinned: runs third-party code via npx
CHUNK_SEC = 30


def yt_dir() -> Path:
    return RAW_DIR / "yt"


def parse_json3(data: dict) -> list[dict]:
    cues = []
    for ev in data.get("events", []):
        text = "".join(s.get("utf8", "") for s in ev.get("segs") or []).replace("\n", " ").strip()
        if not text:
            continue
        start = ev.get("tStartMs", 0) / 1000
        cues.append({"s": round(start, 2), "e": round(start + ev.get("dDurationMs", 0) / 1000, 2), "t": text})
    return cues


def _via_ytdlp(video_id: str, track: tuple[str, str], tmp: Path) -> tuple[list[dict], list[dict], dict]:
    kind, lang = track
    opts = {
        **_BASE_OPTS,
        "writesubtitles": kind == "manual",
        "writeautomaticsub": kind == "auto",
        "subtitleslangs": [lang],
        "subtitlesformat": "json3",
        "outtmpl": str(tmp / "%(id)s.%(ext)s"),
    }
    with YoutubeDL(opts) as ydl:
        info = ydl.extract_info(f"https://www.youtube.com/watch?v={video_id}", download=True)
    path = tmp / f"{video_id}.{lang}.json3"
    if not path.exists():
        raise DownloadError(f"yt-dlp wrote no {lang} subtitle for {video_id}")
    cues = parse_json3(json.loads(path.read_text()))
    path.unlink()
    chapters = [{"title": c["title"], "startSec": int(c["start_time"])} for c in info.get("chapters") or []]
    return cues, chapters, info


_TS = re.compile(r"^\*\*(\d+(?::\d\d){1,2})\*\*\s*·\s*(.*)$")


def _sec(ts: str) -> int:
    n = 0
    for part in ts.split(":"):
        n = n * 60 + int(part)
    return n


def parse_defuddle(markdown: str) -> tuple[list[dict], list[dict]]:
    cues, chapters, pending = [], [], None
    for line in markdown.splitlines():
        line = line.strip()
        if line.startswith("### "):
            pending = line[4:].strip()
        elif m := _TS.match(line):
            s = _sec(m.group(1))
            if pending is not None:
                chapters.append({"title": pending, "startSec": s})
                pending = None
            cues.append({"s": s, "e": s, "t": m.group(2).strip()})
    for a, b in zip(cues, cues[1:]):
        a["e"] = b["s"]
    return cues, chapters


def _via_defuddle(video_id: str) -> tuple[list[dict], list[dict]]:
    out = subprocess.run(
        ["npx", "-y", DEFUDDLE, "parse", f"https://www.youtube.com/watch?v={video_id}", "--json"],
        check=True, capture_output=True, text=True, timeout=180,
    ).stdout
    md = (json.loads(out).get("variables") or {}).get("transcript") or ""
    cues, chapters = parse_defuddle(md)
    if not cues:
        raise RuntimeError(f"defuddle returned no transcript for {video_id}")
    return cues, chapters


def _mmss(sec: float) -> str:
    sec = int(sec)
    return f"{sec // 3600}:{sec % 3600 // 60:02d}:{sec % 60:02d}" if sec >= 3600 else f"{sec // 60}:{sec % 60:02d}"


def compact_markdown(rec: dict) -> str:
    """LLM input: cues merged into ~30s paragraphs under chapter headings with segment ids."""
    segs = rec["segments"] or [{"id": None, "title": "(no chapters)", "startSec": 0, "endSec": 10**9}]
    lines = [f"# {rec['title']}", f"lectureId: {rec['lectureId']} | track: {'/'.join(rec['track'])} | via: {rec['via']}", ""]
    for seg in segs:
        lines += [f"## [{seg['id']}] {seg['title']} ({_mmss(seg['startSec'])}–{_mmss(seg['endSec'])})", ""]
        buf, buf_start = [], None
        for c in rec["cues"]:
            if not seg["startSec"] <= c["s"] < seg["endSec"]:
                continue
            buf_start = c["s"] if buf_start is None else buf_start
            buf.append(c["t"])
            if c["s"] - buf_start >= CHUNK_SEC:
                lines.append(f"[{_mmss(buf_start)}] {' '.join(buf)}")
                buf, buf_start = [], None
        if buf:
            lines.append(f"[{_mmss(buf_start)}] {' '.join(buf)}")
        lines.append("")
    return "\n".join(lines)


def fetch(manifest: dict, guard: FailGuard, refresh: bool = False, only: set[str] | None = None) -> dict[str, str]:
    out_dir = yt_dir()
    out_dir.mkdir(parents=True, exist_ok=True)
    report: dict[str, str] = {}
    for sid, entry in manifest.items():
        for vid, v in entry["videos"].items():
            lid = v.get("lectureId")
            if not lid or (only and lid not in only and sid not in only):
                continue
            if "unavailable" in v or not v.get("track"):
                report[lid] = "skipped: no usable track"
                continue
            dest = out_dir / f"{lid}.json"
            if dest.exists() and not refresh:
                report[lid] = "cached"
                continue
            track, via = tuple(v["track"]), "yt-dlp"
            try:
                cues, chapters, _ = _via_ytdlp(vid, track, out_dir)
            except DownloadError as e1:
                try:
                    cues, chapters = _via_defuddle(vid)
                    track, via = ("auto", "unknown"), "defuddle"
                except (subprocess.SubprocessError, OSError, RuntimeError, json.JSONDecodeError) as e2:
                    guard.record("transcript", e1)
                    report[lid] = f"failed: {str(e1)[:80]} / defuddle: {str(e2)[:80]}"
                    continue
            rec = {
                "lectureId": lid, "sourceId": sid, "videoId": vid, "title": v.get("title"),
                "durationSec": v.get("durationSec"), "track": list(track), "via": via,
                "segments": with_segment_ids(lid, chapters, v.get("durationSec")), "cues": cues,
            }
            dest.write_text(json.dumps(rec, ensure_ascii=False))
            (out_dir / f"{lid}.md").write_text(compact_markdown(rec))
            report[lid] = f"ok ({via}, {len(cues)} cues, {len(rec['segments'])} segments)"
    return report
