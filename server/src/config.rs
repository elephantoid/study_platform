//! Configuration from environment variables. Defaults assume the repository root as the
//! working directory (`make -f mk/rust.mk run`). Nothing here is secret.

use std::net::IpAddr;
use std::path::PathBuf;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Config {
    /// `STUDY_CONTENT_DIR`, default `content`.
    pub content_dir: PathBuf,
    /// `STUDY_MANIFEST_PATH`, default `pipeline/manifests/videos.json`.
    pub manifest_path: PathBuf,
    /// `HOST`, default `127.0.0.1`. The container image sets `0.0.0.0`.
    pub host: IpAddr,
    /// `PORT`, default `8080`.
    pub port: u16,
}

#[derive(Debug, thiserror::Error)]
#[error("{var}={value:?} is not valid: {reason}")]
pub struct ConfigError {
    var: &'static str,
    value: String,
    reason: String,
}

impl Config {
    pub fn from_env() -> Result<Self, ConfigError> {
        Self::from_lookup(|k| std::env::var(k).ok())
    }

    /// Testable core of [`Config::from_env`].
    pub fn from_lookup(get: impl Fn(&str) -> Option<String>) -> Result<Self, ConfigError> {
        fn parse<T: std::str::FromStr>(
            var: &'static str,
            raw: Option<String>,
            default: T,
        ) -> Result<T, ConfigError>
        where
            T::Err: std::fmt::Display,
        {
            match raw {
                None => Ok(default),
                Some(value) => value.parse().map_err(|e: T::Err| ConfigError {
                    var,
                    reason: e.to_string(),
                    value,
                }),
            }
        }
        let path = |var: &str, default: &str| {
            get(var)
                .filter(|v| !v.is_empty())
                .map_or_else(|| default.into(), PathBuf::from)
        };
        Ok(Self {
            content_dir: path("STUDY_CONTENT_DIR", "content"),
            manifest_path: path("STUDY_MANIFEST_PATH", "pipeline/manifests/videos.json"),
            host: parse("HOST", get("HOST"), IpAddr::from([127, 0, 0, 1]))?,
            port: parse("PORT", get("PORT"), 8080)?,
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn defaults() {
        let c = Config::from_lookup(|_| None).unwrap();
        assert_eq!(c.content_dir, PathBuf::from("content"));
        assert_eq!(
            c.manifest_path,
            PathBuf::from("pipeline/manifests/videos.json")
        );
        assert_eq!(c.host, IpAddr::from([127, 0, 0, 1]));
        assert_eq!(c.port, 8080);
    }

    #[test]
    fn overrides() {
        let c = Config::from_lookup(|k| match k {
            "STUDY_CONTENT_DIR" => Some("/app/content".into()),
            "HOST" => Some("0.0.0.0".into()),
            "PORT" => Some("3001".into()),
            _ => None,
        })
        .unwrap();
        assert_eq!(c.content_dir, PathBuf::from("/app/content"));
        assert_eq!(c.host, IpAddr::from([0, 0, 0, 0]));
        assert_eq!(c.port, 3001);
    }

    #[test]
    fn rejects_bad_port() {
        let e = Config::from_lookup(|k| (k == "PORT").then(|| "99999".into())).unwrap_err();
        assert!(e.to_string().starts_with("PORT="));
    }
}
