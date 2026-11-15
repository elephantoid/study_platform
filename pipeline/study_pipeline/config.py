from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCHEMA = ROOT / "content" / "schema.json"
SOURCES = ROOT / "content" / "sources.yaml"

# Raw downloads are untrusted and never committed (see .gitignore).
RAW_DIR = ROOT / "tmp" / "raw"
MANIFEST_DIR = ROOT / "pipeline" / "manifests"

# Per-source cap on playlist size. IBM playlists are long; the MVP takes the first 20.
PLAYLIST_LIMITS = {"ibm-ai-agents": 20}

# Agent-Reach defaults to zh-Hans first; English lectures must ask for the original track.
CAPTION_LANGS = ("en-orig", "en")

YT_WORKERS = 4
