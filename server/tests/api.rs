//! Integration tests: the real `content/` through the HTTP router, plus fixture content for
//! follow-ups and for the ways content can be invalid.

use std::fs;
use std::path::{Path, PathBuf};
use std::sync::Arc;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use serde_json::Value;
use study_server::content::{self, LoadError, Store};
use tower::ServiceExt;

fn repo() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .unwrap()
        .to_owned()
}

fn real_store() -> Store {
    let r = repo();
    content::load(
        &r.join("content"),
        &r.join("pipeline/manifests/videos.json"),
    )
    .unwrap()
}

async fn get(store: Store, uri: &str) -> (StatusCode, Value) {
    let res = study_server::api::router(Arc::new(store))
        .oneshot(Request::get(uri).body(Body::empty()).unwrap())
        .await
        .unwrap();
    let status = res.status();
    let bytes = res.into_body().collect().await.unwrap().to_bytes();
    (status, serde_json::from_slice(&bytes).unwrap())
}

/// `type:` of every question file, read independently of the loader.
fn types_on_disk() -> Vec<String> {
    fn walk(dir: &Path, out: &mut Vec<String>) {
        for e in fs::read_dir(dir).unwrap() {
            let p = e.unwrap().path();
            if p.is_dir() {
                walk(&p, out);
            } else if p.extension().is_some_and(|x| x == "md") {
                let text = fs::read_to_string(&p).unwrap();
                let t = text.lines().find_map(|l| l.strip_prefix("type: ")).unwrap();
                out.push(t.trim().to_owned());
            }
        }
    }
    let mut out = Vec::new();
    walk(&repo().join("content/questions"), &mut out);
    out
}

// ---------- real content ----------

#[test]
fn real_content_loads_every_card_and_splits_concept_from_quiz() {
    let store = real_store();
    let disk = types_on_disk();
    assert!(!disk.is_empty());
    assert_eq!(store.cards().len(), disk.len());
    let concept_on_disk = disk.iter().filter(|t| *t == "concept").count();
    let concept = store
        .cards()
        .iter()
        .filter(|c| !c.card_type.is_quiz())
        .count();
    assert_eq!(concept, concept_on_disk);
    assert_eq!(store.cards().len() - concept, disk.len() - concept_on_disk);
}

#[test]
fn real_concept_cards_have_explanations_and_quiz_cards_do_not() {
    for c in real_store().cards() {
        if c.card_type.is_quiz() {
            assert!(c.explanation_md.is_none(), "{}", c.id);
        } else {
            assert!(
                c.explanation_md.as_deref().is_some_and(|e| !e.is_empty()),
                "{}",
                c.id
            );
        }
        assert!(!c.prompt_md.is_empty(), "{}", c.id);
    }
}

#[test]
fn real_follow_ups_are_linked_to_their_card() {
    // Follow-ups are optional (CONTRACT §3); whatever exists must be exactly 3, ordered,
    // and carry `<cardId>-f<order>` ids.
    for c in real_store().cards() {
        if let Some(f) = &c.follow_ups {
            let ids: Vec<_> = f.iter().map(|f| f.id.clone()).collect();
            assert_eq!(
                ids,
                (1..=3)
                    .map(|o| format!("{}-f{o}", c.id))
                    .collect::<Vec<_>>()
            );
        }
    }
}

#[test]
fn real_open_rubrics_are_on_the_ten_point_scale() {
    for c in real_store().cards().iter().filter(|c| c.rubric.is_some()) {
        let total: u32 = c
            .rubric
            .as_ref()
            .unwrap()
            .criteria
            .iter()
            .map(|x| x.points)
            .sum();
        assert_eq!(total, 10, "{}", c.id);
    }
}

#[tokio::test]
async fn health_reports_card_count() {
    let store = real_store();
    let n = store.cards().len();
    let (s, v) = get(store, "/api/health").await;
    assert_eq!(s, StatusCode::OK);
    assert_eq!(v["status"], "ok");
    assert_eq!(v["cards"], n);
}

#[tokio::test]
async fn type_filter_partitions_the_cards() {
    let disk = types_on_disk();
    let (_, all) = get(real_store(), "/api/cards").await;
    let (_, concept) = get(real_store(), "/api/cards?type=concept").await;
    let (_, quiz) = get(real_store(), "/api/cards?type=quiz").await;
    let (_, open) = get(real_store(), "/api/cards?type=open").await;
    assert_eq!(all["total"], disk.len());
    assert_eq!(
        concept["total"],
        disk.iter().filter(|t| *t == "concept").count()
    );
    assert_eq!(
        concept["total"].as_u64().unwrap() + quiz["total"].as_u64().unwrap(),
        all["total"].as_u64().unwrap()
    );
    assert!(
        quiz["items"]
            .as_array()
            .unwrap()
            .iter()
            .all(|i| i["type"] != "concept")
    );
    assert_eq!(open["total"], disk.iter().filter(|t| *t == "open").count());
}

#[tokio::test]
async fn category_filter_includes_child_topics() {
    let (_, parent) = get(real_store(), "/api/cards?topic=cs-core&limit=200").await;
    let (_, child) = get(real_store(), "/api/cards?topic=algorithm").await;
    assert!(parent["total"].as_u64().unwrap() > child["total"].as_u64().unwrap());
    assert!(
        child["items"]
            .as_array()
            .unwrap()
            .iter()
            .all(|i| i["topicId"] == "algorithm")
    );
}

#[tokio::test]
async fn source_and_difficulty_filters_and_paging() {
    let (_, v) = get(
        real_store(),
        "/api/cards?source=jbee-interview-beginner&limit=5&offset=5",
    )
    .await;
    let items = v["items"].as_array().unwrap();
    assert!(
        items.len() <= 5
            && items
                .iter()
                .all(|i| i["sourceId"] == "jbee-interview-beginner")
    );
    assert_eq!(
        (v["limit"].as_u64(), v["offset"].as_u64()),
        (Some(5), Some(5))
    );
    let (_, v) = get(real_store(), "/api/cards?difficulty=basic&limit=200").await;
    assert!(
        v["items"]
            .as_array()
            .unwrap()
            .iter()
            .all(|i| i["difficulty"] == "basic")
    );
}

#[tokio::test]
async fn open_card_detail_resolves_the_lecture_segment() {
    let (s, v) = get(real_store(), "/api/cards/cs329z-2026au-l01-q01").await;
    assert_eq!(s, StatusCode::OK);
    assert_eq!(v["type"], "open");
    assert_eq!(
        v["reviewTarget"]["segment"]["lectureId"],
        "cs329z-2026au-l01"
    );
    assert!(v["modelAnswerKo"].is_string());
    assert!(v.get("rubric").is_none(), "rubric stays server side");
    let a = &v["attribution"];
    assert_eq!(a["license"], "YouTube-Standard");
    assert!(
        a["url"]
            .as_str()
            .unwrap()
            .starts_with("https://www.youtube.com/watch?v=")
    );
}

#[tokio::test]
async fn concept_card_detail_has_explanation_and_note_link() {
    let (s, v) = get(real_store(), "/api/cards/jbee-algo-001").await;
    assert_eq!(s, StatusCode::OK);
    assert_eq!(v["type"], "concept");
    assert!(v["explanationMd"].as_str().unwrap().contains("Bubble Sort"));
    assert_eq!(v["reviewTarget"]["noteId"], "jbee-algo-index");
    assert_eq!(v["attribution"]["license"], "MIT");
    assert!(
        v["attribution"]["url"]
            .as_str()
            .unwrap()
            .starts_with("https://github.com/jbee37142/")
    );
}

#[tokio::test]
async fn errors_use_the_contract_shape() {
    for (uri, status, code) in [
        (
            "/api/cards/no-such-card",
            StatusCode::NOT_FOUND,
            "CARD_NOT_FOUND",
        ),
        (
            "/api/cards/..%2F..%2Fetc%2Fpasswd",
            StatusCode::BAD_REQUEST,
            "INVALID_ID",
        ),
        ("/api/cards/Upper", StatusCode::BAD_REQUEST, "INVALID_ID"),
        (
            "/api/cards?type=essay",
            StatusCode::BAD_REQUEST,
            "INVALID_QUERY",
        ),
        (
            "/api/cards?unknown=1",
            StatusCode::BAD_REQUEST,
            "INVALID_QUERY",
        ),
        (
            "/api/cards?limit=201",
            StatusCode::BAD_REQUEST,
            "INVALID_QUERY",
        ),
        (
            "/api/cards?topic=no-such-topic",
            StatusCode::BAD_REQUEST,
            "INVALID_QUERY",
        ),
        ("/api/nothing", StatusCode::NOT_FOUND, "NOT_FOUND"),
    ] {
        let (s, v) = get(real_store(), uri).await;
        assert_eq!(s, status, "{uri}");
        assert_eq!(v["error"]["code"], code, "{uri}");
        assert!(v["error"]["message"].is_string(), "{uri}");
    }
}

#[tokio::test]
async fn topics_carry_weights_and_counts() {
    let (s, v) = get(real_store(), "/api/topics").await;
    assert_eq!(s, StatusCode::OK);
    let items = v["items"].as_array().unwrap();
    let core = items.iter().find(|t| t["id"] == "cs-core").unwrap();
    assert!(core["cardCounts"]["concept"].as_u64().unwrap() > 0);
    assert!(core["roles"]["mle"].is_number());
}

// ---------- fixture content ----------

const NOTE: &str = "---
id: n1
topicId: algorithm
sourceId: jbee-interview-beginner
title: t
canonicalUrl: https://github.com/jbee37142/Interview_Question_for_Beginner
roles: [mle]
status: draft
generation: { by: claude-code, model: test, at: 2026-11-26 }
---
- list
";

fn follow_up(card: &str, order: u8) -> String {
    format!(
        "- {{ id: {card}-f{order}, order: {order}, promptMd: 'p{order}', hintKo: h, rubricKeywords: [k], modelAnswerKo: a, maxScore: 10 }}\n"
    )
}

fn concept(id: &str, extra: &str) -> String {
    format!(
        "---
id: {id}
topicId: algorithm
sourceId: jbee-interview-beginner
type: concept
difficulty: basic
roles: [mle]
reviewTarget: {{ noteId: n1 }}
status: draft
generation: {{ by: claude-code, model: test, at: 2026-11-26 }}
{extra}---

## 문제

Q?

## 해설

A.
"
    )
}

/// A content dir with the real schema/sources/topics and the given question files.
fn fixture(name: &str, questions: &[(&str, String)]) -> PathBuf {
    // A fresh directory per run (under target/, which `cargo clean` removes).
    let nanos = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap()
        .as_nanos();
    let dir = Path::new(env!("CARGO_TARGET_TMPDIR"))
        .join(format!("{name}-{}-{nanos}", std::process::id()));
    fs::create_dir_all(dir.join("notes/algorithm")).unwrap();
    fs::create_dir_all(dir.join("questions/algorithm")).unwrap();
    for f in ["schema.json", "sources.yaml", "topics.yaml"] {
        fs::copy(repo().join("content").join(f), dir.join(f)).unwrap();
    }
    fs::write(dir.join("notes/algorithm/n1.md"), NOTE).unwrap();
    for (id, text) in questions {
        fs::write(dir.join(format!("questions/algorithm/{id}.md")), text).unwrap();
    }
    dir
}

fn load_fixture(dir: &Path) -> Result<Store, LoadError> {
    content::load(dir, &repo().join("pipeline/manifests/videos.json"))
}

fn errors(r: Result<Store, LoadError>) -> String {
    match r {
        Err(e @ LoadError::Invalid(_)) => e.to_string(),
        Err(e) => panic!("unexpected error kind: {e}"),
        Ok(_) => panic!("fixture should not load"),
    }
}

#[tokio::test]
async fn follow_ups_are_served_in_order_with_the_card() {
    // Written out of order on purpose.
    let fus = format!(
        "followUps:\n{}{}{}",
        follow_up("c1", 3),
        follow_up("c1", 1),
        follow_up("c1", 2)
    );
    let dir = fixture(
        "followups",
        &[("c1", concept("c1", &fus)), ("c2", concept("c2", ""))],
    );
    let (_, list) = get(load_fixture(&dir).unwrap(), "/api/cards").await;
    let has: Vec<_> = list["items"]
        .as_array()
        .unwrap()
        .iter()
        .map(|i| i["hasFollowUps"].clone())
        .collect();
    assert_eq!(has, [Value::Bool(true), Value::Bool(false)]);

    let (_, v) = get(load_fixture(&dir).unwrap(), "/api/cards/c1").await;
    let f = v["followUps"].as_array().unwrap();
    assert_eq!(
        f.iter()
            .map(|x| x["id"].as_str().unwrap())
            .collect::<Vec<_>>(),
        ["c1-f1", "c1-f2", "c1-f3"]
    );
    assert_eq!(f[0]["promptMd"], "p1");
    assert!(f[0].get("sampleFeedbackKo").is_none());

    let (_, v) = get(load_fixture(&dir).unwrap(), "/api/cards/c2").await;
    assert!(v.get("followUps").is_none());
}

#[test]
fn follow_up_with_foreign_id_is_rejected() {
    let fus = format!(
        "followUps:\n{}{}{}",
        follow_up("c1", 1),
        follow_up("other", 2),
        follow_up("c1", 3)
    );
    let e = errors(load_fixture(&fixture(
        "fu-id",
        &[("c1", concept("c1", &fus))],
    )));
    assert!(e.contains("followUp id other-f2 must be c1-f2"), "{e}");
}

#[test]
fn follow_ups_must_be_exactly_three() {
    let fus = format!("followUps:\n{}{}", follow_up("c1", 1), follow_up("c1", 2));
    let e = errors(load_fixture(&fixture(
        "fu-count",
        &[("c1", concept("c1", &fus))],
    )));
    assert!(e.contains("followUps"), "{e}");
}

#[test]
fn schema_violation_is_reported_with_the_file() {
    let bad = concept("c1", "").replace("difficulty: basic\n", "");
    let e = errors(load_fixture(&fixture("schema", &[("c1", bad)])));
    assert!(
        e.contains("questions/algorithm/c1.md") && e.contains("difficulty"),
        "{e}"
    );
}

#[test]
fn dangling_note_reference_is_rejected() {
    let bad = concept("c1", "").replace("noteId: n1", "noteId: missing-note");
    let e = errors(load_fixture(&fixture("note-ref", &[("c1", bad)])));
    assert!(
        e.contains("reviewTarget.noteId missing-note not found"),
        "{e}"
    );
}

#[test]
fn concept_without_explanation_is_rejected() {
    let bad = concept("c1", "").replace("## 해설\n\nA.\n", "");
    let e = errors(load_fixture(&fixture("no-expl", &[("c1", bad)])));
    assert!(e.contains("needs a '## 해설' section"), "{e}");
}

#[test]
fn file_name_must_equal_id() {
    let e = errors(load_fixture(&fixture(
        "name",
        &[("other-name", concept("c1", ""))],
    )));
    assert!(e.contains("file name must equal id"), "{e}");
}

#[cfg(unix)]
#[test]
fn symlinks_are_rejected() {
    let dir = fixture("symlink", &[("c1", concept("c1", ""))]);
    std::os::unix::fs::symlink(
        dir.join("questions/algorithm/c1.md"),
        dir.join("questions/algorithm/c2.md"),
    )
    .unwrap();
    let e = errors(load_fixture(&dir));
    assert!(e.contains("symlinks are not allowed"), "{e}");
}

// ---------- cross-review regressions ----------

#[tokio::test]
async fn query_errors_do_not_reflect_input() {
    for uri in ["/api/cards?type=%3Cscript%3E", "/api/cards?%3Cscript%3E=1"] {
        let (s, v) = get(real_store(), uri).await;
        assert_eq!(s, StatusCode::BAD_REQUEST);
        let msg = v["error"]["message"].as_str().unwrap();
        assert!(
            !msg.contains("script") && !msg.contains("deserialize"),
            "{msg}"
        );
        assert!(msg.contains("type=concept|quiz|open|mcq"), "{msg}");
    }
}

#[cfg(unix)]
#[test]
fn symlinked_top_level_file_is_rejected() {
    let dir = fixture("symlink-top", &[("c1", concept("c1", ""))]);
    let real = dir.join("topics.real.yaml");
    fs::rename(dir.join("topics.yaml"), &real).unwrap();
    std::os::unix::fs::symlink(&real, dir.join("topics.yaml")).unwrap();
    match load_fixture(&dir) {
        Err(e @ LoadError::Io { .. }) => {
            assert!(e.to_string().contains("symlinks are not allowed"));
        }
        other => panic!("expected Io error, got {:?}", other.err()),
    }
}

#[cfg(unix)]
#[test]
fn symlinked_content_subdir_is_rejected() {
    let dir = fixture("symlink-dir", &[("c1", concept("c1", ""))]);
    let real = dir.join("questions-real");
    fs::rename(dir.join("questions"), &real).unwrap();
    std::os::unix::fs::symlink(&real, dir.join("questions")).unwrap();
    let e = errors(load_fixture(&dir));
    assert!(e.contains("symlinks are not allowed"), "{e}");
}

#[test]
fn note_from_summary_link_source_is_rejected() {
    let dir = fixture("note-summary-link", &[("c1", concept("c1", ""))]);
    let note = NOTE.replace(
        "sourceId: jbee-interview-beginner",
        "sourceId: cs329z-2026au",
    );
    fs::write(dir.join("notes/algorithm/n1.md"), note).unwrap();
    let e = errors(load_fixture(&dir));
    assert!(
        e.contains("notes/algorithm/n1.md: source cs329z-2026au is summary_link"),
        "{e}"
    );
}

#[test]
fn prompt_heading_must_be_a_whole_line() {
    let bad = concept("c1", "").replace("## 문제\n", "## 문제점\n");
    let e = errors(load_fixture(&fixture("heading", &[("c1", bad)])));
    assert!(e.contains("'## 문제' line"), "{e}");
}
