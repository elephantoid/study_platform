import argparse
import json
import sys

from . import audit, repos, sources, youtube
from .config import MANIFEST_DIR
from .failguard import Aborted, FailGuard


def _read(name: str) -> dict:
    p = MANIFEST_DIR / name
    return json.loads(p.read_text()) if p.exists() else {}


def _write(name: str, data: dict) -> None:
    MANIFEST_DIR.mkdir(parents=True, exist_ok=True)
    (MANIFEST_DIR / name).write_text(json.dumps(data, ensure_ascii=False, indent=2, sort_keys=True) + "\n")


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(prog="ingest")
    ap.add_argument("step", choices=["audit", "repos", "videos", "all"])
    ap.add_argument("--refresh", action="store_true", help="re-fetch videos already in the manifest")
    args = ap.parse_args(argv)

    srcs = sources.load()
    guard = FailGuard()
    failed = False
    try:
        if args.step in ("audit", "all"):
            report = audit.audit(srcs, guard)
            _write("audit.json", report)
            bad = {k: v["status"] for k, v in report.items() if v["status"] != "ok"}
            print(f"audit: {len(report)} repos, not ok: {bad or 'none'}")
            failed |= bool(bad)
        if args.step in ("repos", "all"):
            report = repos.fetch(srcs, guard)
            print("repos:", {k: v.get("files", v["status"]) for k, v in report.items()})
            failed |= any(v["status"] == "failed" for v in report.values())
        if args.step in ("videos", "all"):
            manifest = _read("videos.json")
            try:
                youtube.scan(srcs, manifest, guard, refresh=args.refresh)
            finally:
                # Keep partial progress even when the guard aborts mid-scan.
                _write("videos.json", manifest)
            for sid, e in manifest.items():
                vids = e["videos"].values()
                print(
                    f"videos {sid}: {len(vids)} | captions {sum(bool(v.get('hasCaptions')) for v in vids)}"
                    f" | uploader mismatch {sum(v.get('uploaderOk') is False for v in vids)}"
                    f" | unavailable {sum('unavailable' in v for v in vids)}"
                    f" | errors {sum('error' in v for v in vids)}"
                )
                failed |= any("error" in v for v in vids)
    except Aborted as e:
        print(f"ABORTED: {e}", file=sys.stderr)
        return 2
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
