//! Typed views of `content/`. Field names and enums follow `content/schema.json` and
//! `docs/CONTRACT.md` §4; JSON is camelCase like the contract's TypeScript types.

use std::collections::BTreeMap;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum RoleId {
    Mle,
    Rs,
    Agent,
    Ds,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Status {
    Draft,
    Reviewed,
    Published,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Difficulty {
    Basic,
    Intermediate,
    Advanced,
}

/// `question.type` in the schema. `concept` is a concept card (prompt + explanation);
/// `open` and `mcq` are quiz cards (the learner answers, then it is graded).
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum CardType {
    Concept,
    Open,
    Mcq,
}

impl CardType {
    #[must_use]
    pub fn is_quiz(self) -> bool {
        matches!(self, Self::Open | Self::Mcq)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum Reuse {
    Verbatim,
    SummaryLink,
    LinkOnly,
}

/// One entry of `content/sources.yaml`.
#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Source {
    pub id: String,
    pub url: String,
    pub license: String,
    pub reuse: Reuse,
    pub attribution: String,
}

/// One entry of `content/topics.yaml`.
#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TopicFront {
    pub id: String,
    pub name: String,
    pub parent_id: Option<String>,
    pub roles: BTreeMap<RoleId, u8>,
}

/// Frontmatter of `content/notes/<topicId>/<id>.md`.
#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NoteFront {
    pub id: String,
    pub topic_id: String,
    pub source_id: String,
    pub canonical_url: String,
}

/// Frontmatter of `content/questions/<topicId>/<id>.md`.
#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct QuestionFront {
    pub id: String,
    pub topic_id: String,
    pub source_id: String,
    #[serde(rename = "type")]
    pub card_type: CardType,
    pub difficulty: Difficulty,
    pub roles: Vec<RoleId>,
    pub choices: Option<Vec<String>>,
    pub answer_index: Option<usize>,
    pub rubric: Option<Rubric>,
    pub review_target: ReviewTargetFront,
    pub status: Status,
    pub follow_ups: Option<Vec<FollowUp>>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ReviewTargetFront {
    pub note_id: Option<String>,
    pub segment_id: Option<String>,
}

/// `$defs/rubric`. Kept server side for the grader; not sent to clients (CONTRACT §4
/// `QuestionView` has no rubric).
#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Rubric {
    pub must_have: Vec<String>,
    pub criteria: Vec<Criterion>,
    #[serde(default)]
    pub deductions: Vec<Deduction>,
    pub model_answer_ko: String,
}

#[derive(Debug, Clone, Deserialize)]
pub struct Criterion {
    pub id: String,
    pub desc: String,
    pub points: u32,
}

#[derive(Debug, Clone, Deserialize)]
pub struct Deduction {
    pub desc: String,
    /// Always negative (schema `maximum: -1`).
    pub points: i32,
}

/// `$defs/followUp` = CONTRACT `FollowUpItem`.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct FollowUp {
    pub id: String,
    pub order: u8,
    pub prompt_md: String,
    pub hint_ko: String,
    pub rubric_keywords: Vec<String>,
    pub model_answer_ko: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub sample_feedback_ko: Option<String>,
    pub max_score: u32,
}

/// CONTRACT `Attribution`: source, license and a link to the original.
#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Attribution {
    pub source_id: String,
    pub license: String,
    pub reuse: Reuse,
    pub attribution: String,
    pub url: String,
}

/// A lecture segment resolved from `pipeline/manifests/videos.json`.
#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SegmentRef {
    pub id: String,
    pub lecture_id: String,
    pub video_id: String,
    pub start_sec: u64,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ReviewTarget {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub note_id: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub segment: Option<SegmentRef>,
}

/// A card ready to serve. Built once at startup; never mutated.
#[derive(Debug, Clone)]
pub struct Card {
    pub id: String,
    pub topic_id: String,
    pub source_id: String,
    pub card_type: CardType,
    pub difficulty: Difficulty,
    pub roles: Vec<RoleId>,
    pub status: Status,
    /// The `## 문제` section.
    pub prompt_md: String,
    /// The `## 해설` section (concept cards only).
    pub explanation_md: Option<String>,
    pub choices: Option<Vec<String>>,
    pub rubric: Option<Rubric>,
    pub review_target: ReviewTarget,
    pub attribution: Attribution,
    pub follow_ups: Option<Vec<FollowUp>>,
    /// `topic_id` followed by its ancestors, for category filtering.
    pub topic_path: Vec<String>,
}

#[derive(Debug, Clone, Default, Serialize)]
pub struct TypeCounts {
    pub concept: usize,
    pub quiz: usize,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Topic {
    pub id: String,
    pub name: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub parent_id: Option<String>,
    pub roles: BTreeMap<RoleId, u8>,
    /// Cards in this topic and all of its descendants.
    pub card_counts: TypeCounts,
}
