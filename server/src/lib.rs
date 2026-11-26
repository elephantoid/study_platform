//! `study_platform` backend: a read-only content API.
//!
//! At startup [`content::load`] reads `content/` (markdown + frontmatter), validates it
//! against `content/schema.json` and the contract rules, and keeps it in memory. The HTTP
//! layer in [`api`] serves from that snapshot only. API contract: `docs/API.md`.

#![forbid(unsafe_code)]

pub mod api;
pub mod config;
pub mod content;
pub mod error;
pub mod grader;
pub mod healthcheck;
