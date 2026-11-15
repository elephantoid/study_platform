import json
import re
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from urllib.parse import parse_qs, urlparse

import jsonschema
import yaml

from .config import SCHEMA, SOURCES

_SEGMENT = re.compile(r"(?!\.{1,2}$)[A-Za-z0-9._-]+")


@dataclass(frozen=True)
class Source:
    id: str
    url: str
    kind: str
    license: str
    reuse: str
    attribution: str
    checkedAt: str
    uploader: str | None = None

    @property
    def repo(self) -> str:
        # The value is interpolated into a `gh api` path; accept only plain github.com/owner/repo.
        assert self.kind == "repo", self.id
        u = urlparse(self.url)
        parts = u.path.strip("/").split("/")
        plain = u.scheme == "https" and u.netloc == "github.com" and not (u.query or u.fragment or u.params)
        if not plain or len(parts) != 2 or not all(_SEGMENT.fullmatch(p) for p in parts):
            raise ValueError(f"{self.id}: repo url must be https://github.com/<owner>/<repo>, got {self.url}")
        return "/".join(parts)

    @property
    def playlist_id(self) -> str:
        assert self.kind == "youtube-playlist", self.id
        return parse_qs(urlparse(self.url).query)["list"][0]


def validator() -> jsonschema.Draft202012Validator:
    schema = json.loads(SCHEMA.read_text())
    return jsonschema.Draft202012Validator({**schema, "$ref": "#/$defs/source"})


def load(path: Path = SOURCES) -> list[Source]:
    raw = yaml.safe_load(path.read_text())
    # YAML parses bare 2026-11-15 as a date; the schema (and JSON) want ISO strings.
    raw = [{k: val.isoformat() if isinstance(val, date) else val for k, val in item.items()} for item in raw]
    v = validator()
    errors = [f"{item.get('id', '?')}: {e.message}" for item in raw for e in v.iter_errors(item)]
    if errors:
        raise ValueError("sources.yaml violates content/schema.json:\n" + "\n".join(errors))
    ids = [item["id"] for item in raw]
    if len(ids) != len(set(ids)):
        raise ValueError("duplicate source ids in sources.yaml")
    return [Source(**item) for item in raw]
