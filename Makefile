# 명령의 정본은 pipeline/study_pipeline/cli.py 와 .github/workflows/content.yml 이다.
# 이 파일은 그 명령을 짧게 부르기만 한다. 규칙 설명: docs/CONVENTIONS.md

.DEFAULT_GOAL := help

UV_RUN := cd pipeline && uv run
# PR 의 base. CI 의 github.base_ref 에 해당한다.
BASE ?= origin/main
# 프로젝트 의존성에 넣지 않고 버전을 고정해 uvx 로 실행한다.
RUFF_VERSION := 0.17.6

.PHONY: help setup test check check-strict gate gate-staged audit lint all

help: ## 이 도움말
	@awk 'BEGIN {FS = ":.*## "} /^[A-Za-z0-9_.-]+:.*## / {printf "  make %-18s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

setup: ## 의존성 설치(uv sync) + git hook 연결(core.hooksPath, 모든 worktree 공유)
	cd pipeline && uv sync
	git config core.hooksPath .githooks

test: ## 파이프라인 테스트 (pytest)
	$(UV_RUN) pytest -q

check: ## 콘텐츠 검증 (ingest check, CI 와 같음)
	$(UV_RUN) ingest check

check-strict: ## check + 자막 복사 검사 필수 (로컬 hook 과 같음, 자막 원본 필요)
	$(UV_RUN) ingest check --require-transcripts

gate: ## published 전환 검사: HEAD 를 BASE 와 비교 (CI 와 같음, BASE=origin/main)
	$(UV_RUN) ingest gate --base "$(BASE)"

gate-staged: ## published 전환 검사: staged 를 HEAD 와 비교 (로컬 hook 과 같음)
	$(UV_RUN) ingest gate

audit: ## 소스 라이선스 재확인 (gh·네트워크 필요, pipeline/manifests/audit.json 을 다시 쓴다)
	$(UV_RUN) ingest audit

lint: ## ruff 로 문법 오류와 pyflakes 규칙만 검사 (CI 에는 아직 없음)
	uvx ruff@$(RUFF_VERSION) check --isolated --select E9,F pipeline

# 순차 실행. content.yml 과 순서·명령이 같다.
all: ## CI 와 같은 검증: test → check → gate
	@$(MAKE) --no-print-directory test
	@$(MAKE) --no-print-directory check
	@$(MAKE) --no-print-directory gate

# 컨테이너·k8s 타깃 (docs/SELF_HOSTING.md). 파일이 없어도 이 Makefile 은 동작한다.
-include mk/container.mk
