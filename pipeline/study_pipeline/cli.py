import argparse
import json
import os
import sys

from . import audit, check, extract_interview, gate, repos, sources, transcripts, youtube
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
    ap.add_argument("step", choices=["audit", "repos", "videos", "transcripts", "extract", "check", "gate", "all"])
    ap.add_argument("--refresh", action="store_true", help="re-fetch videos / transcripts already fetched")
    ap.add_argument("--only", nargs="*", help="transcripts: limit to these lectureIds or sourceIds")
    ap.add_argument("--require-transcripts", action="store_true", help="check: missing transcript is an error (local hook)")
    ap.add_argument("--base", help="gate: compare HEAD with this ref (CI); default compares the staged index (hook)")
    args = ap.parse_args(argv)

    if args.step == "check":
        errors, warnings = check.check(require_transcripts=args.require_transcripts)
        for w in warnings[:20]:
            print("warn:", w)
        for e in errors:
            print("error:", e, file=sys.stderr)
        print(f"check: {len(errors)} errors, {len(warnings)} warnings")
        return 1 if errors else 0
    if args.step == "gate":
        paths = gate.transitions(args.base)
        if not paths:
            print("gate: no published transitions")
            return 0
        if args.base is not None:
            ok = os.environ.get("PUBLISH_APPROVED") == "true"  # set by CI from the PR's publish-approved label
        else:
            ok = gate.confirm_on_tty(paths)
        print(f"gate: {len(paths)} file(s) become published: {'approved' if ok else 'NOT approved'}")
        for p in paths:
            print("  " + p)
        return 0 if ok else 1
    if args.step == "extract":
        counts = extract_interview.extract(check.load_topics())
        print("extract:", counts, "total", sum(counts.values()))
        return 0

    srcs = sources.load()
    guard = FailGuard()
    failed = False
    try:
        audited: dict = {}
        if args.step in ("audit", "repos", "all"):
            # `repos` always re-audits first; downloads are gated on this run's result.
            audited = audit.audit(srcs, guard)
            _write("audit.json", audited)
            bad = {k: v["status"] for k, v in audited.items() if v["status"] != "ok"}
            print(f"audit: {len(audited)} repos, not ok: {bad or 'none'}")
            failed |= bool(bad)
        if args.step in ("repos", "all"):
            report = repos.fetch(srcs, guard, audited)
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
        if args.step in ("transcripts", "all"):
            report = transcripts.fetch(_read("videos.json"), guard, refresh=args.refresh, only=set(args.only or []) or None)
            for lid, status in report.items():
                print(f"transcript {lid}: {status}")
            failed |= any(s.startswith("failed") for s in report.values())
    except Aborted as e:
        print(f"ABORTED: {e}", file=sys.stderr)
        return 2
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
