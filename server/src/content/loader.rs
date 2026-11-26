//! Startup loader. Reads `content/` and the lecture manifest, validates everything, and
//! returns a [`Store`] or every problem it found (fail closed: the server does not start on
//! invalid content).
//!
//! Checks follow `pipeline/study_pipeline/check.py` (schema, file name = id, unique ids,
//! references, `link_only` body length, `## 문제`/`## 해설` sections) plus contract rules the
//! schema cannot express (`followUps[].id = <questionId>-f<order>`, orders 1..3 once each,
//! `answerIndex` within `choices`). The transcript copy check needs raw transcripts that are
//! never in the repo, so it stays in `ingest check`.

use std::collections::{HashMap, HashSet};
use std::fs;
use std::io;
use std::path::{Path, PathBuf};

use serde::Deserialize;
use serde::de::DeserializeOwned;
use serde_json::Value;

use super::Store;
use super::model::{
    Attribution, Card, CardType, NoteFront, QuestionFront, Reuse, ReviewTarget, SegmentRef, Source,
    Topic, TopicFront, TypeCounts,
};
use super::schema::{Schemas, violations};

/// Same limit as `check.py`: a `link_only` source may carry a short summary and links only.
const LINK_ONLY_BODY_LIMIT: usize = 600;
/// No content file comes close; this bounds memory if a stray large file lands in `content/`.
const MAX_FILE_BYTES: u64 = 1024 * 1024;

#[derive(Debug, thiserror::Error)]
pub enum LoadError {
    #[error("cannot read {path}: {source}")]
    Io {
        path: PathBuf,
        #[source]
        source: io::Error,
    },
    #[error("content/schema.json does not compile: {0}")]
    Schema(String),
    #[error("{} content error(s):\n  {}", .0.len(), .0.join("\n  "))]
    Invalid(Vec<String>),
}

fn read(path: &Path) -> Result<String, LoadError> {
    let io_err = |source| LoadError::Io {
        path: path.to_owned(),
        source,
    };
    // symlink_metadata does not follow links: a link is refused here, and the size checked
    // below is the file's own, not the link's.
    let meta = fs::symlink_metadata(path).map_err(io_err)?;
    if !meta.file_type().is_file() {
        return Err(io_err(io::Error::other(
            "not a regular file (symlinks are not allowed)",
        )));
    }
    if meta.len() > MAX_FILE_BYTES {
        return Err(io_err(io::Error::other(format!(
            "larger than {MAX_FILE_BYTES} bytes"
        ))));
    }
    fs::read_to_string(path).map_err(io_err)
}

/// Load and validate everything. `content_dir` holds `schema.json`, `sources.yaml`,
/// `topics.yaml`, `notes/`, `questions/`; `manifest` is `pipeline/manifests/videos.json`.
pub fn load(content_dir: &Path, manifest: &Path) -> Result<Store, LoadError> {
    let schema: Value = serde_json::from_str(&read(&content_dir.join("schema.json"))?)
        .map_err(|e| LoadError::Schema(e.to_string()))?;
    let schemas = Schemas::compile(&schema).map_err(LoadError::Schema)?;
    let mut errs = Vec::new();

    let sources = load_sources(&content_dir.join("sources.yaml"), &schemas, &mut errs)?;
    let topics = load_topics(&content_dir.join("topics.yaml"), &schemas, &mut errs)?;
    let topic_paths = topic_paths(&topics, &mut errs);
    let segments = load_manifest(manifest, &mut errs)?;

    let known = Known {
        sources: &sources,
        topics: &topics,
    };
    let mut notes: HashMap<String, NoteFront> = HashMap::new();
    for doc in docs(content_dir, "notes", &mut errs)? {
        let Some(front) = doc.typed::<NoteFront>(&schemas.note, &mut errs) else {
            continue;
        };
        if notes.contains_key(&front.id) {
            errs.push(format!("{}: duplicate id {}", doc.rel, front.id));
            continue;
        }
        check_common(
            &doc,
            &front.id,
            &front.source_id,
            &front.topic_id,
            None,
            &known,
            &mut errs,
        );
        notes.insert(front.id.clone(), front);
    }

    let mut cards: Vec<Card> = Vec::new();
    let mut seen = HashSet::new();
    for doc in docs(content_dir, "questions", &mut errs)? {
        let Some(q) = doc.typed::<QuestionFront>(&schemas.question, &mut errs) else {
            continue;
        };
        if !seen.insert(q.id.clone()) {
            errs.push(format!("{}: duplicate id {}", doc.rel, q.id));
            continue;
        }
        let before = errs.len();
        check_common(
            &doc,
            &q.id,
            &q.source_id,
            &q.topic_id,
            q.review_target.segment_id.as_deref(),
            &known,
            &mut errs,
        );
        let card = build_card(
            &doc,
            q,
            &sources,
            &notes,
            &segments,
            &topic_paths,
            &mut errs,
        );
        if errs.len() == before {
            cards.extend(card);
        }
    }

    if !errs.is_empty() {
        return Err(LoadError::Invalid(errs));
    }
    let topic_views = topic_views(&topics, &cards);
    Ok(Store::new(
        cards,
        topic_views,
        sources.into_keys().collect(),
    ))
}

/// Validate against `$defs/<name>`, then deserialize into the typed view.
fn typed<T: DeserializeOwned>(
    value: Value,
    validator: &jsonschema::Validator,
    at: &str,
    errs: &mut Vec<String>,
) -> Option<T> {
    let v = violations(validator, &value);
    if !v.is_empty() {
        errs.extend(v.into_iter().map(|m| format!("{at}: {m}")));
        return None;
    }
    serde_json::from_value(value)
        .map_err(|e| errs.push(format!("{at}: {e}")))
        .ok()
}

fn yaml_list(path: &Path, errs: &mut Vec<String>) -> Result<Vec<Value>, LoadError> {
    let name = path
        .file_name()
        .map_or_else(String::new, |n| n.to_string_lossy().into_owned());
    match serde_yaml_ng::from_str::<Vec<Value>>(&read(path)?) {
        Ok(items) => Ok(items),
        Err(e) => {
            errs.push(format!("{name}: {e}"));
            Ok(Vec::new())
        }
    }
}

fn load_sources(
    path: &Path,
    schemas: &Schemas,
    errs: &mut Vec<String>,
) -> Result<HashMap<String, Source>, LoadError> {
    let mut out = HashMap::new();
    for (i, item) in yaml_list(path, errs)?.into_iter().enumerate() {
        let at = format!("sources.yaml [{i}]");
        if let Some(s) = typed::<Source>(item, &schemas.source, &at, errs) {
            if out.contains_key(&s.id) {
                errs.push(format!("{at}: duplicate id {}", s.id));
            } else {
                out.insert(s.id.clone(), s);
            }
        }
    }
    Ok(out)
}

fn load_topics(
    path: &Path,
    schemas: &Schemas,
    errs: &mut Vec<String>,
) -> Result<Vec<TopicFront>, LoadError> {
    let mut out: Vec<TopicFront> = Vec::new();
    for (i, item) in yaml_list(path, errs)?.into_iter().enumerate() {
        let at = format!("topics.yaml [{i}]");
        if let Some(t) = typed::<TopicFront>(item, &schemas.topic, &at, errs) {
            if out.iter().any(|o| o.id == t.id) {
                errs.push(format!("{at}: duplicate id {}", t.id));
            } else {
                out.push(t);
            }
        }
    }
    for t in &out {
        if let Some(p) = &t.parent_id
            && !out.iter().any(|o| &o.id == p)
        {
            errs.push(format!("topics.yaml {}: unknown parentId {p}", t.id));
        }
    }
    Ok(out)
}

/// For each topic: itself, then its ancestors. A parent cycle is an error.
fn topic_paths(topics: &[TopicFront], errs: &mut Vec<String>) -> HashMap<String, Vec<String>> {
    let parent: HashMap<&str, Option<&str>> = topics
        .iter()
        .map(|t| (t.id.as_str(), t.parent_id.as_deref()))
        .collect();
    let mut out = HashMap::new();
    for t in topics {
        let mut path = vec![t.id.clone()];
        let mut cur = t.parent_id.as_deref();
        while let Some(p) = cur {
            if path.iter().any(|x| x == p) {
                errs.push(format!("topics.yaml {}: parentId cycle through {p}", t.id));
                break;
            }
            path.push(p.to_owned());
            cur = parent.get(p).copied().flatten();
        }
        out.insert(t.id.clone(), path);
    }
    out
}

#[derive(Deserialize)]
struct ManifestPlaylist {
    videos: HashMap<String, ManifestVideo>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct ManifestVideo {
    lecture_id: Option<String>,
    #[serde(default)]
    segments: Vec<ManifestSegment>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct ManifestSegment {
    id: String,
    start_sec: u64,
}

/// Segment id → lecture/video/start. The manifest is the source of truth for ids
/// (CONTRACT §3.1).
fn load_manifest(
    path: &Path,
    errs: &mut Vec<String>,
) -> Result<HashMap<String, SegmentRef>, LoadError> {
    let playlists: HashMap<String, ManifestPlaylist> = match serde_json::from_str(&read(path)?) {
        Ok(p) => p,
        Err(e) => {
            errs.push(format!("videos.json: {e}"));
            return Ok(HashMap::new());
        }
    };
    let mut out = HashMap::new();
    for pl in playlists.into_values() {
        for (video_id, v) in pl.videos {
            let Some(lecture_id) = v.lecture_id else {
                continue;
            };
            for s in v.segments {
                let seg = SegmentRef {
                    id: s.id.clone(),
                    lecture_id: lecture_id.clone(),
                    video_id: video_id.clone(),
                    start_sec: s.start_sec,
                };
                if out.insert(s.id.clone(), seg).is_some() {
                    errs.push(format!("videos.json: duplicate segment id {}", s.id));
                }
            }
        }
    }
    Ok(out)
}

struct Doc {
    rel: String,
    stem: String,
    front: Value,
    body: String,
}

impl Doc {
    fn typed<T: DeserializeOwned>(
        &self,
        validator: &jsonschema::Validator,
        errs: &mut Vec<String>,
    ) -> Option<T> {
        typed(self.front.clone(), validator, &self.rel, errs)
    }
}

/// Every `*.md` under `content/<kind>/`, sorted. Symlinks are rejected so the loader cannot
/// be pointed at files outside `content/`.
fn docs(content_dir: &Path, kind: &str, errs: &mut Vec<String>) -> Result<Vec<Doc>, LoadError> {
    let mut paths = Vec::new();
    walk(&content_dir.join(kind), &mut paths, errs)?;
    paths.sort();
    let mut out = Vec::new();
    for path in paths {
        let rel = path
            .strip_prefix(content_dir)
            .unwrap_or(&path)
            .display()
            .to_string();
        let stem = path
            .file_stem()
            .map_or_else(String::new, |s| s.to_string_lossy().into_owned());
        let text = read(&path)?;
        match split_front(&text) {
            Ok((front, body)) => out.push(Doc {
                rel,
                stem,
                front,
                body,
            }),
            Err(e) => errs.push(format!("{rel}: {e}")),
        }
    }
    Ok(out)
}

fn walk(dir: &Path, out: &mut Vec<PathBuf>, errs: &mut Vec<String>) -> Result<(), LoadError> {
    let io_err = |source| LoadError::Io {
        path: dir.to_owned(),
        source,
    };
    // Entries are checked below; this catches `notes/` or `questions/` itself being a link.
    if fs::symlink_metadata(dir)
        .map_err(io_err)?
        .file_type()
        .is_symlink()
    {
        errs.push(format!(
            "{}: symlinks are not allowed in content/",
            dir.display()
        ));
        return Ok(());
    }
    for entry in fs::read_dir(dir).map_err(io_err)? {
        let entry = entry.map_err(io_err)?;
        let path = entry.path();
        let ft = entry.file_type().map_err(io_err)?;
        if ft.is_symlink() {
            errs.push(format!(
                "{}: symlinks are not allowed in content/",
                path.display()
            ));
        } else if ft.is_dir() {
            walk(&path, out, errs)?;
        } else if ft.is_file() && path.extension().is_some_and(|e| e == "md") {
            out.push(path);
        }
    }
    Ok(())
}

/// `---\n<yaml>\n---\n<body>`. The body is trimmed like `check.py` does.
pub(crate) fn split_front(text: &str) -> Result<(Value, String), String> {
    let rest = text.strip_prefix("---\n").ok_or("missing frontmatter")?;
    let (yaml, body) = if let Some(body) = rest.strip_prefix("---\n") {
        ("", body)
    } else {
        let end = rest.find("\n---\n").ok_or("unterminated frontmatter")?;
        (&rest[..end], &rest[end + 5..])
    };
    let front: Value = if yaml.trim().is_empty() {
        Value::Object(serde_json::Map::new())
    } else {
        serde_yaml_ng::from_str(yaml).map_err(|e| format!("frontmatter: {e}"))?
    };
    Ok((front, body.trim().to_owned()))
}

/// Split a question body into the `## 문제` and `## 해설` sections. The explanation runs to
/// the end of the body; it may contain its own `##` headings (verbatim sources do).
pub(crate) fn sections(body: &str) -> Result<(String, Option<String>), String> {
    let (first, rest) = body.split_once('\n').unwrap_or((body, ""));
    if first.trim_end() != "## 문제" {
        return Err("body must start with a '## 문제' line".into());
    }
    let mut prompt_end = rest.len();
    let mut explanation = None;
    let mut offset = 0;
    for line in rest.split_inclusive('\n') {
        if line.trim_end() == "## 해설" {
            prompt_end = offset;
            explanation = Some(rest[offset + line.len()..].trim().to_owned());
            break;
        }
        offset += line.len();
    }
    Ok((rest[..prompt_end].trim().to_owned(), explanation))
}

/// What a document may refer to.
struct Known<'a> {
    sources: &'a HashMap<String, Source>,
    topics: &'a [TopicFront],
}

fn check_common(
    doc: &Doc,
    id: &str,
    source_id: &str,
    topic_id: &str,
    segment_id: Option<&str>,
    known: &Known<'_>,
    errs: &mut Vec<String>,
) {
    let Known { sources, topics } = *known;
    let rel = &doc.rel;
    if doc.stem != id {
        errs.push(format!("{rel}: file name must equal id ({id})"));
    }
    if !topics.iter().any(|t| t.id == topic_id) {
        errs.push(format!("{rel}: unknown topicId {topic_id}"));
    }
    match sources.get(source_id) {
        None => errs.push(format!("{rel}: unknown sourceId {source_id}")),
        Some(s)
            if s.reuse == Reuse::LinkOnly && doc.body.chars().count() > LINK_ONLY_BODY_LIMIT =>
        {
            errs.push(format!(
                "{rel}: source {source_id} is link_only; body {} chars > {LINK_ONLY_BODY_LIMIT}",
                doc.body.chars().count()
            ));
        }
        // Same as check.py: a summary_link file needs a lecture segment to run the
        // transcript copy check against. Notes have none, so they cannot use such a source.
        Some(s) if s.reuse == Reuse::SummaryLink && segment_id.is_none() => {
            errs.push(format!(
                "{rel}: source {source_id} is summary_link; needs reviewTarget.segmentId"
            ));
        }
        Some(_) => {}
    }
}

fn build_card(
    doc: &Doc,
    q: QuestionFront,
    sources: &HashMap<String, Source>,
    notes: &HashMap<String, NoteFront>,
    segments: &HashMap<String, SegmentRef>,
    topic_paths: &HashMap<String, Vec<String>>,
    errs: &mut Vec<String>,
) -> Option<Card> {
    let rel = &doc.rel;
    let (prompt_md, explanation_md) = sections(&doc.body)
        .map_err(|e| errs.push(format!("{rel}: {e}")))
        .ok()?;
    if q.card_type == CardType::Concept && explanation_md.is_none() {
        errs.push(format!("{rel}: concept question needs a '## 해설' section"));
    }

    let note = q.review_target.note_id.as_ref().and_then(|n| {
        let found = notes.get(n);
        if found.is_none() {
            errs.push(format!("{rel}: reviewTarget.noteId {n} not found"));
        }
        found
    });
    let segment = q.review_target.segment_id.as_ref().and_then(|s| {
        let found = segments.get(s).cloned();
        if found.is_none() {
            errs.push(format!("{rel}: reviewTarget.segmentId {s} not in manifest"));
        }
        found
    });
    let source = sources.get(&q.source_id)?;

    if let (Some(choices), Some(i)) = (&q.choices, q.answer_index)
        && i >= choices.len()
    {
        errs.push(format!(
            "{rel}: answerIndex {i} out of range for {} choices",
            choices.len()
        ));
    }
    if let Some(fus) = &q.follow_ups {
        let mut orders: Vec<u8> = fus.iter().map(|f| f.order).collect();
        orders.sort_unstable();
        if orders != [1, 2, 3] {
            errs.push(format!(
                "{rel}: followUps orders must be 1, 2, 3 once each (got {orders:?})"
            ));
        }
        for f in fus {
            let want = format!("{}-f{}", q.id, f.order);
            if f.id != want {
                errs.push(format!("{rel}: followUp id {} must be {want}", f.id));
            }
        }
    }

    // The original link: the note's page, else the lecture at the segment, else the source.
    let url = match (note, &segment) {
        (Some(n), _) => n.canonical_url.clone(),
        (None, Some(s)) => format!(
            "https://www.youtube.com/watch?v={}&t={}s",
            s.video_id, s.start_sec
        ),
        (None, None) => source.url.clone(),
    };
    let mut follow_ups = q.follow_ups;
    if let Some(f) = &mut follow_ups {
        f.sort_by_key(|f| f.order);
    }
    Some(Card {
        topic_path: topic_paths.get(&q.topic_id).cloned().unwrap_or_default(),
        attribution: Attribution {
            source_id: source.id.clone(),
            license: source.license.clone(),
            reuse: source.reuse,
            attribution: source.attribution.clone(),
            url,
        },
        review_target: ReviewTarget {
            note_id: q.review_target.note_id,
            segment,
        },
        id: q.id,
        topic_id: q.topic_id,
        source_id: q.source_id,
        card_type: q.card_type,
        difficulty: q.difficulty,
        roles: q.roles,
        status: q.status,
        prompt_md,
        explanation_md,
        choices: q.choices,
        rubric: q.rubric,
        follow_ups,
    })
}

fn topic_views(topics: &[TopicFront], cards: &[Card]) -> Vec<Topic> {
    topics
        .iter()
        .map(|t| {
            let mut counts = TypeCounts::default();
            for c in cards.iter().filter(|c| c.topic_path.contains(&t.id)) {
                if c.card_type.is_quiz() {
                    counts.quiz += 1;
                } else {
                    counts.concept += 1;
                }
            }
            Topic {
                id: t.id.clone(),
                name: t.name.clone(),
                parent_id: t.parent_id.clone(),
                roles: t.roles.clone(),
                card_counts: counts,
            }
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn splits_frontmatter_and_trims_body() {
        let (front, body) = split_front("---\nid: a\n---\n\n## 문제\n\nQ\n").unwrap();
        assert_eq!(front["id"], "a");
        assert_eq!(body, "## 문제\n\nQ");
    }

    #[test]
    fn rejects_missing_or_unterminated_frontmatter() {
        assert!(split_front("id: a\n").is_err());
        assert!(split_front("---\nid: a\n").is_err());
    }

    #[test]
    fn bare_dates_stay_strings() {
        let (front, _) = split_front("---\nat: 2026-11-15\n---\nx").unwrap();
        assert_eq!(front["at"], "2026-11-15");
    }

    #[test]
    fn explanation_keeps_its_own_h2_headings() {
        let (p, e) = sections("## 문제\n\nQ?\n\n## 해설\n\nA\n\n## TCP\n\nmore").unwrap();
        assert_eq!(p, "Q?");
        assert_eq!(e.as_deref(), Some("A\n\n## TCP\n\nmore"));
    }

    #[test]
    fn open_question_has_no_explanation() {
        let (p, e) = sections("## 문제\n\nWhy?").unwrap();
        assert_eq!((p.as_str(), e), ("Why?", None));
    }

    #[test]
    fn h3_is_not_the_explanation_heading() {
        let (_, e) = sections("## 문제\n\nQ\n### 해설\nnot it").unwrap();
        assert!(e.is_none());
    }

    #[test]
    fn body_must_start_with_prompt_heading() {
        assert!(sections("## 해설\n\nA").is_err());
        assert!(sections("## 문제점\n\nQ").is_err());
        assert!(sections("## 문제").is_ok_and(|(p, e)| p.is_empty() && e.is_none()));
    }
}
