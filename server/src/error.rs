//! API errors. Every error response is `{ "error": { "code", "message" } }` (CONTRACT §4).
//! Messages are written for clients: they name what was wrong with the request and never
//! carry paths, internal state or upstream error text.

use axum::Json;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use serde_json::json;

#[derive(Debug, thiserror::Error)]
pub enum ApiError {
    #[error("card '{0}' not found")]
    CardNotFound(String),
    #[error("card id must match ^[a-z0-9]+(-[a-z0-9]+)*$ and be at most 80 characters")]
    InvalidId,
    #[error("{0}")]
    InvalidQuery(String),
    #[error("no route for this path")]
    RouteNotFound,
    #[error("method not allowed")]
    MethodNotAllowed,
}

impl ApiError {
    #[must_use]
    pub fn status(&self) -> StatusCode {
        match self {
            Self::CardNotFound(_) | Self::RouteNotFound => StatusCode::NOT_FOUND,
            Self::InvalidId | Self::InvalidQuery(_) => StatusCode::BAD_REQUEST,
            Self::MethodNotAllowed => StatusCode::METHOD_NOT_ALLOWED,
        }
    }

    #[must_use]
    pub fn code(&self) -> &'static str {
        match self {
            Self::CardNotFound(_) => "CARD_NOT_FOUND",
            Self::InvalidId => "INVALID_ID",
            Self::InvalidQuery(_) => "INVALID_QUERY",
            Self::RouteNotFound => "NOT_FOUND",
            Self::MethodNotAllowed => "METHOD_NOT_ALLOWED",
        }
    }
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let body = json!({ "error": { "code": self.code(), "message": self.to_string() } });
        (self.status(), Json(body)).into_response()
    }
}
