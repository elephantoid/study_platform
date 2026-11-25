# syntax=docker/dockerfile:1.17
# study_platform-pipeline: 수집 CLI `ingest` (일회성 실행). 빌드 컨텍스트는 pipeline/.
# 경로가 중요하다: config.py 는 ROOT=/app 을 기준으로 content/ 와 pipeline/manifests/ 를 찾는다.
FROM ghcr.io/astral-sh/uv:0.13.1@sha256:4a1f3666816dafadd20ceb71eac9a7d56d7ef30279f7d64048519ab901ada336 AS uv

FROM python:3.12.16-slim-bookworm@sha256:44cf1793efa7c7a476bb0f2cff81443f4a072c90c1cb127e2924933daa3e8c64 AS build
COPY --from=uv /uv /usr/local/bin/uv
ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy UV_PYTHON_DOWNLOADS=never
WORKDIR /app/pipeline
COPY pyproject.toml uv.lock ./
RUN --mount=type=cache,target=/root/.cache/uv uv sync --locked --no-dev --no-install-project
COPY . .
RUN --mount=type=cache,target=/root/.cache/uv uv sync --locked --no-dev

FROM python:3.12.16-slim-bookworm@sha256:44cf1793efa7c7a476bb0f2cff81443f4a072c90c1cb127e2924933daa3e8c64 AS pipeline
ARG REVISION=unknown
LABEL org.opencontainers.image.source="https://github.com/elephantoid/study_platform" \
      org.opencontainers.image.revision="$REVISION"
# HOME=/tmp: 임의 UID 로 실행해도 yt-dlp 캐시를 쓸 수 있다.
ENV PATH=/app/pipeline/.venv/bin:$PATH \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    HOME=/tmp \
    STUDY_RAW_DIR=/data/raw
WORKDIR /app/pipeline
COPY --from=build /app/pipeline /app/pipeline
USER 1000:1000
ENTRYPOINT ["ingest"]
CMD ["check"]
