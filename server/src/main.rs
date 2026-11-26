#![forbid(unsafe_code)]

use std::process::ExitCode;
use std::sync::Arc;

use study_server::config::{Config, ConfigError};
use study_server::content::{self, LoadError};
use study_server::healthcheck;
use tracing_subscriber::EnvFilter;

#[derive(Debug, thiserror::Error)]
enum StartupError {
    #[error(transparent)]
    Config(#[from] ConfigError),
    #[error("content is invalid; the server does not start on invalid content\n{0}")]
    Content(#[from] LoadError),
    #[error("cannot listen on {addr}: {source}")]
    Bind {
        addr: String,
        source: std::io::Error,
    },
    #[error("server error: {0}")]
    Serve(std::io::Error),
}

#[tokio::main]
async fn main() -> ExitCode {
    // HEALTHCHECK of the distroless image (no shell, no curl): `study-server --healthcheck`.
    if std::env::args().nth(1).as_deref() == Some("--healthcheck") {
        return healthcheck();
    }
    tracing_subscriber::fmt()
        .with_env_filter(
            EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info")),
        )
        .init();
    match run().await {
        Ok(()) => ExitCode::SUCCESS,
        Err(e) => {
            tracing::error!("{e}");
            ExitCode::FAILURE
        }
    }
}

async fn run() -> Result<(), StartupError> {
    let cfg = Config::from_env()?;
    let store = content::load(&cfg.content_dir, &cfg.manifest_path)?;
    let quiz = store
        .cards()
        .iter()
        .filter(|c| c.card_type.is_quiz())
        .count();
    let with_follow_ups = store
        .cards()
        .iter()
        .filter(|c| c.follow_ups.is_some())
        .count();
    tracing::info!(
        cards = store.cards().len(),
        concept = store.cards().len() - quiz,
        quiz,
        with_follow_ups,
        topics = store.topics().len(),
        content_dir = %cfg.content_dir.display(),
        "content loaded"
    );

    let addr = std::net::SocketAddr::new(cfg.host, cfg.port);
    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .map_err(|source| StartupError::Bind {
            addr: addr.to_string(),
            source,
        })?;
    tracing::info!(%addr, "listening");
    axum::serve(listener, study_server::api::router(Arc::new(store)))
        .with_graceful_shutdown(shutdown_signal())
        .await
        .map_err(StartupError::Serve)
}

/// Exit 0 when this container's server answers `GET /api/health` with 2xx, 1 otherwise.
/// Reads only `HOST`/`PORT` and does not load content.
fn healthcheck() -> ExitCode {
    let result = Config::from_env()
        .map_err(|e| e.to_string())
        .and_then(|cfg| {
            healthcheck::probe(
                healthcheck::target(cfg.host, cfg.port),
                std::time::Duration::from_secs(3),
            )
        });
    match result {
        Ok(()) => ExitCode::SUCCESS,
        Err(e) => {
            eprintln!("healthcheck: {e}");
            ExitCode::FAILURE
        }
    }
}

/// Ctrl-C locally, SIGTERM from a container runtime.
async fn shutdown_signal() {
    let ctrl_c = async {
        if let Err(e) = tokio::signal::ctrl_c().await {
            tracing::error!("cannot listen for ctrl-c: {e}");
            std::future::pending::<()>().await;
        }
    };
    #[cfg(unix)]
    let term = async {
        match tokio::signal::unix::signal(tokio::signal::unix::SignalKind::terminate()) {
            Ok(mut s) => {
                s.recv().await;
            }
            Err(e) => {
                tracing::error!("cannot listen for SIGTERM: {e}");
                std::future::pending::<()>().await;
            }
        }
    };
    #[cfg(not(unix))]
    let term = std::future::pending::<()>();
    tokio::select! { () = ctrl_c => {}, () = term => {} }
    tracing::info!("shutting down");
}
