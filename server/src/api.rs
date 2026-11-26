//! HTTP routes. Contract: `docs/API.md`.

use std::sync::Arc;

use axum::extract::rejection::QueryRejection;
use axum::extract::{Path, Query, State};
use axum::http::{HeaderValue, header};
use axum::response::{IntoResponse, Response};
use axum::routing::get;
use axum::{Json, Router};
use serde::{Deserialize, Serialize};
use tower_http::set_header::SetResponseHeaderLayer;
use tower_http::trace::TraceLayer;

use crate::content::Store;
use crate::content::model::{
    Attribution, Card, CardType, Difficulty, FollowUp, ReviewTarget, RoleId, Status,
};
use crate::error::ApiError;

pub const DEFAULT_LIMIT: usize = 50;
pub const MAX_LIMIT: usize = 200;

/// The only message for a query string that does not parse. Lists what is accepted instead
/// of echoing what was sent.
const QUERY_HELP: &str = "invalid query. Allowed: type=concept|quiz|open|mcq, topic=<id>, \
source=<id>, difficulty=basic|intermediate|advanced, role=mle|rs|agent|ds, \
status=draft|reviewed|published, limit=1-200, offset>=0";

pub fn router(store: Arc<Store>) -> Router {
    Router::new()
        .route("/api/health", get(health))
        .route("/api/topics", get(topics))
        .route("/api/cards", get(list_cards))
        .route("/api/cards/{id}", get(get_card))
        .fallback(|| async { ApiError::RouteNotFound })
        .method_not_allowed_fallback(|| async { ApiError::MethodNotAllowed })
        .layer(SetResponseHeaderLayer::overriding(
            header::X_CONTENT_TYPE_OPTIONS,
            HeaderValue::from_static("nosniff"),
        ))
        .layer(TraceLayer::new_for_http())
        .with_state(store)
}

#[derive(Serialize)]
struct Health {
    status: &'static str,
    version: &'static str,
    cards: usize,
}

async fn health(State(store): State<Arc<Store>>) -> Json<Health> {
    Json(Health {
        status: "ok",
        version: env!("CARGO_PKG_VERSION"),
        cards: store.cards().len(),
    })
}

#[derive(Serialize)]
struct Items<T> {
    items: T,
}

async fn topics(State(store): State<Arc<Store>>) -> Response {
    // Serialized here, while the borrow of the store is alive.
    Json(Items {
        items: store.topics(),
    })
    .into_response()
}

/// `type` filter. `quiz` = `open` + `mcq` (cards the learner answers and gets graded on).
#[derive(Debug, Clone, Copy, Deserialize)]
#[serde(rename_all = "lowercase")]
enum TypeFilter {
    Concept,
    Quiz,
    Open,
    Mcq,
}

impl TypeFilter {
    fn matches(self, t: CardType) -> bool {
        match self {
            Self::Concept => t == CardType::Concept,
            Self::Quiz => t.is_quiz(),
            Self::Open => t == CardType::Open,
            Self::Mcq => t == CardType::Mcq,
        }
    }
}

#[derive(Debug, Deserialize)]
#[serde(deny_unknown_fields)]
struct CardQuery {
    #[serde(rename = "type")]
    card_type: Option<TypeFilter>,
    topic: Option<String>,
    source: Option<String>,
    difficulty: Option<Difficulty>,
    role: Option<RoleId>,
    status: Option<Status>,
    limit: Option<usize>,
    offset: Option<usize>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct CardSummary<'a> {
    id: &'a str,
    #[serde(rename = "type")]
    card_type: CardType,
    topic_id: &'a str,
    source_id: &'a str,
    difficulty: Difficulty,
    roles: &'a [RoleId],
    status: Status,
    prompt_md: &'a str,
    has_follow_ups: bool,
}

impl<'a> From<&'a Card> for CardSummary<'a> {
    fn from(c: &'a Card) -> Self {
        Self {
            id: &c.id,
            card_type: c.card_type,
            topic_id: &c.topic_id,
            source_id: &c.source_id,
            difficulty: c.difficulty,
            roles: &c.roles,
            status: c.status,
            prompt_md: &c.prompt_md,
            has_follow_ups: c.follow_ups.is_some(),
        }
    }
}

#[derive(Serialize)]
struct CardPage<'a> {
    items: Vec<CardSummary<'a>>,
    total: usize,
    limit: usize,
    offset: usize,
}

/// Same pattern as `$defs/id` in `content/schema.json`.
fn is_valid_id(s: &str) -> bool {
    !s.is_empty()
        && s.len() <= 80
        && s.split('-').all(|part| {
            !part.is_empty()
                && part
                    .bytes()
                    .all(|b| b.is_ascii_lowercase() || b.is_ascii_digit())
        })
}

fn checked_id<'a>(
    name: &str,
    value: Option<&'a str>,
    exists: impl Fn(&str) -> bool,
) -> Result<Option<&'a str>, ApiError> {
    match value {
        None => Ok(None),
        Some(v) if !is_valid_id(v) => Err(ApiError::InvalidQuery(format!(
            "{name} must be an id like 'operating-system'"
        ))),
        Some(v) if !exists(v) => Err(ApiError::InvalidQuery(format!("unknown {name} '{v}'"))),
        Some(v) => Ok(Some(v)),
    }
}

async fn list_cards(
    State(store): State<Arc<Store>>,
    query: Result<Query<CardQuery>, QueryRejection>,
) -> Result<Response, ApiError> {
    // The rejection text quotes the raw input and serde internals; never send it back.
    let Query(q) = query.map_err(|_| ApiError::InvalidQuery(QUERY_HELP.into()))?;
    let topic = checked_id("topic", q.topic.as_deref(), |v| store.has_topic(v))?;
    let source = checked_id("source", q.source.as_deref(), |v| store.has_source(v))?;
    let limit = q.limit.unwrap_or(DEFAULT_LIMIT);
    if !(1..=MAX_LIMIT).contains(&limit) {
        return Err(ApiError::InvalidQuery(format!(
            "limit must be between 1 and {MAX_LIMIT}"
        )));
    }
    let offset = q.offset.unwrap_or(0);

    let matching: Vec<&Card> = store
        .cards()
        .iter()
        .filter(|c| q.card_type.is_none_or(|t| t.matches(c.card_type)))
        .filter(|c| topic.is_none_or(|t| c.topic_path.iter().any(|p| p == t)))
        .filter(|c| source.is_none_or(|s| c.source_id == s))
        .filter(|c| q.difficulty.is_none_or(|d| c.difficulty == d))
        .filter(|c| q.role.is_none_or(|r| c.roles.contains(&r)))
        .filter(|c| q.status.is_none_or(|s| c.status == s))
        .collect();
    let page = CardPage {
        total: matching.len(),
        items: matching
            .into_iter()
            .skip(offset)
            .take(limit)
            .map(CardSummary::from)
            .collect(),
        limit,
        offset,
    };
    Ok(Json(page).into_response())
}

/// CONTRACT §4 `QuestionView` plus fields the contract leaves to the server:
/// `sourceId`, `roles`, `status`, `explanationMd` (concept), `modelAnswerKo` (open).
#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct CardView<'a> {
    id: &'a str,
    topic_id: &'a str,
    source_id: &'a str,
    #[serde(rename = "type")]
    card_type: CardType,
    difficulty: Difficulty,
    roles: &'a [RoleId],
    status: Status,
    prompt_md: &'a str,
    #[serde(skip_serializing_if = "Option::is_none")]
    explanation_md: Option<&'a str>,
    #[serde(skip_serializing_if = "Option::is_none")]
    choices: Option<&'a [String]>,
    #[serde(skip_serializing_if = "Option::is_none")]
    model_answer_ko: Option<&'a str>,
    review_target: &'a ReviewTarget,
    attribution: &'a Attribution,
    #[serde(skip_serializing_if = "Option::is_none")]
    follow_ups: Option<&'a [FollowUp]>,
}

impl<'a> From<&'a Card> for CardView<'a> {
    fn from(c: &'a Card) -> Self {
        Self {
            id: &c.id,
            topic_id: &c.topic_id,
            source_id: &c.source_id,
            card_type: c.card_type,
            difficulty: c.difficulty,
            roles: &c.roles,
            status: c.status,
            prompt_md: &c.prompt_md,
            // Each type-specific field only for its type, whatever else the file carries.
            explanation_md: c
                .explanation_md
                .as_deref()
                .filter(|_| c.card_type == CardType::Concept),
            choices: c
                .choices
                .as_deref()
                .filter(|_| c.card_type == CardType::Mcq),
            model_answer_ko: c
                .rubric
                .as_ref()
                .filter(|_| c.card_type == CardType::Open)
                .map(|r| r.model_answer_ko.as_str()),
            review_target: &c.review_target,
            attribution: &c.attribution,
            follow_ups: c.follow_ups.as_deref(),
        }
    }
}

async fn get_card(
    State(store): State<Arc<Store>>,
    Path(id): Path<String>,
) -> Result<Response, ApiError> {
    if !is_valid_id(&id) {
        return Err(ApiError::InvalidId);
    }
    let card = store.card(&id).ok_or(ApiError::CardNotFound(id))?;
    Ok(Json(CardView::from(card)).into_response())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn id_pattern_matches_schema() {
        for ok in ["a", "boost-algo-001", "cs329z-2026au-l01-q01"] {
            assert!(is_valid_id(ok), "{ok}");
        }
        for bad in [
            "",
            "-a",
            "a-",
            "a--b",
            "A",
            "a_b",
            "../etc",
            "a/b",
            "a.md",
            &"a".repeat(81),
        ] {
            assert!(!is_valid_id(bad), "{bad}");
        }
    }

    #[test]
    fn quiz_filter_covers_open_and_mcq() {
        assert!(TypeFilter::Quiz.matches(CardType::Open));
        assert!(TypeFilter::Quiz.matches(CardType::Mcq));
        assert!(!TypeFilter::Quiz.matches(CardType::Concept));
        assert!(TypeFilter::Concept.matches(CardType::Concept));
    }
}
