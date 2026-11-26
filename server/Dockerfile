# syntax=docker/dockerfile:1.7
# Build from the repository root (the image bakes in content/ and the lecture manifest):
#   docker build -f server/Dockerfile -t ghcr.io/elephantoid/study_platform-server:local .
# server/Dockerfile.dockerignore limits the build context (BuildKit reads it instead of a root
# .dockerignore).

FROM rust:1.97.1-slim-trixie AS build
WORKDIR /src/server
# RUSTUP_TOOLCHAIN names the same pinned 1.97.1 the image ships. It only stops rustup from
# fetching rustfmt/clippy (listed in rust-toolchain.toml for development) for a release build.
# Dependencies first, so source edits do not rebuild them.
COPY server/Cargo.toml server/Cargo.lock server/rust-toolchain.toml ./
RUN mkdir src && echo 'fn main() {}' > src/main.rs && touch src/lib.rs \
    && RUSTUP_TOOLCHAIN=1.97.1 cargo build --release --locked
# The real sources overwrite the stubs.
COPY server/src ./src
RUN touch src/main.rs src/lib.rs \
    && RUSTUP_TOOLCHAIN=1.97.1 cargo build --release --locked

FROM gcr.io/distroless/cc-debian13:nonroot
ARG REVISION=unknown
LABEL org.opencontainers.image.source="https://github.com/elephantoid/study_platform" \
      org.opencontainers.image.revision="$REVISION"
WORKDIR /app
COPY --from=build /src/server/target/release/study-server /app/study-server
COPY content /app/content
COPY pipeline/manifests/videos.json /app/pipeline/manifests/videos.json
ENV HOST=0.0.0.0 \
    PORT=8080 \
    STUDY_CONTENT_DIR=/app/content \
    STUDY_MANIFEST_PATH=/app/pipeline/manifests/videos.json \
    RUST_LOG=info
USER nonroot:nonroot
EXPOSE 8080
# No shell in distroless: the binary probes its own GET /api/health (src/healthcheck.rs).
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["/app/study-server", "--healthcheck"]
ENTRYPOINT ["/app/study-server"]
