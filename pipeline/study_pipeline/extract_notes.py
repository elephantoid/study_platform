"""Rule-based concept cards from three MIT note repos (jbee, gyoogle, jobhope), verbatim allowed.

Unlike boost-devs these are explanation articles, not Q/A. The card question is the article
(or jbee `##` section) title turned into "<title>에 대해 설명하세요."; the answer is the text as is.
Only topics this platform teaches are taken (no Java/C++/frontend/iOS/design patterns).
"""

import re
from datetime import date
from pathlib import PurePosixPath
from urllib.parse import quote

from .config import CONTENT, RAW_DIR
from .extract_interview import _REL_IMG, _REL_MD, _roles, _write, require_verbatim_license

GENERATOR = "rule-based/extract_notes@1"
MIN_BODY_CHARS = 200  # stubs and link lists are not cards

# sourceId -> (github repo, short prefix, mode, [(path under repo, topicId, id infix)])
#   mode "files":    every .md in the directory (or the one file) is one card
#   mode "sections": every `## ` section of the file is one card (jbee READMEs)
SOURCES = {
    "jbee-interview-beginner": ("jbee37142/Interview_Question_for_Beginner", "jbee", "sections", [
        ("OS/README.md", "operating-system", "os"),
        ("Network/README.md", "network", "net"),
        ("DataStructure/README.md", "data-structure", "ds"),
        ("Algorithm/README.md", "algorithm", "algo"),
        ("Database/README.md", "data-engineering-sql", "db"),
        ("Python/README.md", "python", "py"),
        ("MachineLearning/README.md", "machine-learning", "ml"),
    ]),
    "gyoogle-tech-interview": ("gyoogle/tech-interview-for-developer", "gyoogle", "files", [
        ("Computer Science/Operating System", "operating-system", "os"),
        ("Computer Science/Network", "network", "net"),
        ("Computer Science/Data Structure", "data-structure", "ds"),
        ("Computer Science/Database", "data-engineering-sql", "db"),
        ("Algorithm", "algorithm", "algo"),
        ("Language/[Python] 매크로 라이브러리.md", "python", "py"),
    ]),
    "jobhope-technicalnote": ("jobhope/TechnicalNote", "jobhope", "files", [
        ("operating_system", "operating-system", "os"),
        ("network", "network", "net"),
        ("data_structure", "data-structure", "ds"),
        ("algorithm", "algorithm", "algo"),
        ("database", "data-engineering-sql", "db"),
        ("linear_algebra", "linear-algebra", "la"),
    ]),
}
# Titles that are study advice or vendor-specific prep, not concepts.
SKIP_TITLES = {"코딩 테스트를 위한 Tip", "문제 해결을 위한 전략적 접근", "SAMSUNG Software PRO등급 준비"}

_HEAD = re.compile(r"^#{1,3} +(.+?)\s*$", re.M)
_H2 = re.compile(r"^## +(.+?)\s*$", re.M)
_AUTHORS = re.compile(r"^## 작성자\s*\n.*?(?=^#{1,2} |\Z)", re.M | re.S)  # jobhope avatar block
_NOISE = re.compile(r"^\s*(\[뒤로\]\(.*\)|</?br\s*/?>|<br>)\s*$", re.M | re.I)


def clean_title(raw: str) -> str:
    t = raw.replace("**", "").replace("`", "").replace("_", " ").strip()
    t = re.sub(r"^\d{4}\.\d{2}\.\d{2}\.?(\([^)]*\))?\s*", "", t)  # "2019.08.26.(월) ..."
    t = re.sub(r"^(\[[^\]]*\]\s*)+", "", t)  # "[DB] Index", "[BYM] UDP란?"
    return t.strip(" :")


def question(title: str) -> str:
    if title.endswith("란?"):
        return f"{title[:-2]}에 대해 설명하세요."
    if title.endswith("?"):
        return title  # already a question written by the source
    return f"{title}에 대해 설명하세요."


def absolutize(md: str, repo: str, file_dir: str) -> str:
    # Relative targets would 404 outside the repo; gyoogle paths contain spaces and Korean.
    base = f"https://raw.githubusercontent.com/{repo}/HEAD/" + (quote(file_dir) + "/" if file_dir else "")
    md = _REL_MD.sub(lambda m: m.group(1) + base + m.group(2), md)
    return _REL_IMG.sub(lambda m: m.group(1) + base + m.group(2), md)


def _tidy(body: str) -> str:
    body = _AUTHORS.sub("", body)
    body = _NOISE.sub("", body)
    body = re.sub(r"(\n\s*-{3,}\s*)+$", "", body.strip())
    return re.sub(r"\n{3,}", "\n\n", body).strip()


def cards_from_file(text: str, fallback_title: str) -> list[tuple[str, str]]:
    m = _HEAD.search(text)
    title = clean_title(m.group(1) if m else fallback_title)
    body = _tidy(text[m.end():] if m else text)
    return [(title, body)]


def cards_from_sections(text: str) -> list[tuple[str, str]]:
    parts = _H2.split(text)  # [preamble, title1, body1, title2, body2, ...]
    return [(clean_title(t), _tidy(b)) for t, b in zip(parts[1::2], parts[2::2])]


def _md_files(root, rel: str) -> list:
    p = root / rel
    files = [p] if p.is_file() else sorted(p.glob("*.md"))
    return [f for f in files if f.name.lower() != "readme.md" or p.is_file()]


def extract(topics: dict[str, dict], today: str | None = None) -> dict[str, int]:
    today = today or date.today().isoformat()
    gen = {"by": "claude-code", "model": GENERATOR, "at": today}
    counts: dict[str, int] = {}
    for sid, (repo, short, mode, entries) in SOURCES.items():
        require_verbatim_license(sid)
        root = RAW_DIR / "repo" / sid
        for rel, topic_id, infix in entries:
            prefix = f"{short}-{infix}"
            cards = []
            for f in _md_files(root, rel):
                text = f.read_text(encoding="utf-8")
                found = cards_from_sections(text) if mode == "sections" else cards_from_file(text, f.stem)
                file_rel = str(PurePosixPath(f.relative_to(root)))
                cards += [(t, b, file_rel) for t, b in found if t not in SKIP_TITLES and len(b) >= MIN_BODY_CHARS]
            if not cards:
                continue
            roles = _roles(topics, topic_id)
            note_id = f"{prefix}-index"
            index_lines = []
            n = 0
            for n, (title, body, file_rel) in enumerate(cards, 1):
                qid = f"{prefix}-{n:03d}"
                url = f"https://github.com/{repo}/blob/HEAD/{quote(file_rel)}"
                front = {
                    "id": qid, "topicId": topic_id, "sourceId": sid, "type": "concept",
                    "difficulty": "intermediate", "roles": roles, "reviewTarget": {"noteId": note_id},
                    "status": "draft", "generation": gen,
                }
                parent = "" if (d := str(PurePosixPath(file_rel).parent)) == "." else d
                answer = absolutize(body, repo, parent)
                _write(CONTENT / "questions" / topic_id / f"{qid}.md", front, f"## 문제\n\n{question(title)}\n\n## 해설\n\n{answer}")
                index_lines.append(f"- [{title}]({url}) — `{qid}`")
            first = rel if rel.endswith(".md") else f"{rel}/"
            note = {
                "id": note_id, "topicId": topic_id, "sourceId": sid,
                "title": f"{topics[topic_id]['name']} 개념 정리 ({short})",
                "canonicalUrl": f"https://github.com/{repo}/{'blob' if first.endswith('.md') else 'tree'}/HEAD/{quote(first.rstrip('/'))}",
                "roles": roles, "status": "draft", "generation": gen,
            }
            _write(CONTENT / "notes" / topic_id / f"{note_id}.md", note, "## 문항 목록\n\n" + "\n".join(index_lines))
            counts[prefix] = n
    return counts
