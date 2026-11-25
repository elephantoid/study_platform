//! Content loaded from `content/` at startup and held in memory.
//!
//! Requests never touch the filesystem: ids from the URL are only map keys, so a request
//! cannot reach a path outside the loaded set.

mod loader;
pub mod model;
mod schema;

use std::collections::HashMap;

pub use loader::{LoadError, load};
use model::{Card, Topic};

#[derive(Debug)]
pub struct Store {
    /// Sorted by id so list responses are stable.
    cards: Vec<Card>,
    by_id: HashMap<String, usize>,
    topics: Vec<Topic>,
    source_ids: Vec<String>,
}

impl Store {
    pub(crate) fn new(
        mut cards: Vec<Card>,
        topics: Vec<Topic>,
        mut source_ids: Vec<String>,
    ) -> Self {
        cards.sort_by(|a, b| a.id.cmp(&b.id));
        source_ids.sort();
        let by_id = cards
            .iter()
            .enumerate()
            .map(|(i, c)| (c.id.clone(), i))
            .collect();
        Self {
            cards,
            by_id,
            topics,
            source_ids,
        }
    }

    #[must_use]
    pub fn cards(&self) -> &[Card] {
        &self.cards
    }

    #[must_use]
    pub fn card(&self, id: &str) -> Option<&Card> {
        self.by_id.get(id).map(|&i| &self.cards[i])
    }

    #[must_use]
    pub fn topics(&self) -> &[Topic] {
        &self.topics
    }

    #[must_use]
    pub fn has_topic(&self, id: &str) -> bool {
        self.topics.iter().any(|t| t.id == id)
    }

    #[must_use]
    pub fn has_source(&self, id: &str) -> bool {
        self.source_ids
            .binary_search_by(|s| s.as_str().cmp(id))
            .is_ok()
    }
}
