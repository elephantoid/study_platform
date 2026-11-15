"""Re-check repo licenses against sources.yaml. Deterministic: GitHub API, no LLM."""

import json
import subprocess

from .failguard import FailGuard
from .sources import Source


def _repo_meta(repo: str) -> dict:
    out = subprocess.run(
        ["gh", "api", f"repos/{repo}", "--jq", "{license: (.license.spdx_id // \"NONE\"), pushedAt: .pushed_at}"],
        check=True, capture_output=True, text=True, timeout=30,
    ).stdout
    meta = json.loads(out)
    # GitHub reports unrecognized license files as NOASSERTION; treat as no license.
    if meta["license"] == "NOASSERTION":
        meta["license"] = "NONE"
    return meta


def audit(sources: list[Source], guard: FailGuard, repo_meta=_repo_meta) -> dict[str, dict]:
    report: dict[str, dict] = {}
    for s in sources:
        if s.kind != "repo":
            continue
        try:
            meta = repo_meta(s.repo)
        except (subprocess.SubprocessError, OSError, json.JSONDecodeError) as e:
            guard.record("repo-audit", e)
            report[s.id] = {"status": "failed", "error": str(e)[:200]}
            continue
        drift = meta["license"] != s.license
        report[s.id] = {**meta, "declared": s.license, "status": "drift" if drift else "ok"}
    return report
