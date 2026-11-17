import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CONTENT = ROOT / "content"
SCHEMA = CONTENT / "schema.json"
SOURCES = CONTENT / "sources.yaml"
TOPICS = CONTENT / "topics.yaml"

# Raw downloads (untrusted, may hold full transcripts) live outside every worktree so that
# CC and AG worktrees share one copy and nothing here can be committed by accident.
RAW_DIR = Path(os.environ.get("STUDY_RAW_DIR", Path.home() / ".cache" / "study-platform" / "raw"))
MANIFEST_DIR = ROOT / "pipeline" / "manifests"

# Per-source cap on playlist size. IBM playlists are long; the MVP takes the first 20.
PLAYLIST_LIMITS = {"ibm-ai-agents": 20}

# Agent-Reach defaults to zh-Hans first; English lectures must ask for the original track.
CAPTION_LANGS = ("en-orig", "en")

YT_WORKERS = 4

# Ids from manifests or frontmatter become file names; nothing else may reach a path.
LECTURE_ID = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*-l[0-9]{2}")
VIDEO_ID = re.compile(r"[A-Za-z0-9_-]{11}")
