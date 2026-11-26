# syntax=docker/dockerfile:1.7
# Build from the repository root (the image bakes in content/ and the lecture manifest):
#   docker build -f server/Dockerfile -t study-server .
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
ENTRYPOINT ["/app/study-server"]
