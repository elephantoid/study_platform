# Rust backend (server/). Run from the repository root:
#   make server-check            (the root Makefile has `-include mk/rust.mk`)
#   make -f mk/rust.mk server-check

CARGO      ?= cargo
SERVER_DIR := server
# Same name and tag rule as docker-compose.yml and k8s/ (docs/SELF_HOSTING.md).
SERVER_IMG ?= ghcr.io/elephantoid/study_platform-server:$(or $(IMAGE_TAG),local)

.PHONY: server-check server-fmt server-lint server-test server-build server-run server-image

server-check: server-fmt server-lint server-test ## server CI 와 같은 검증: fmt → clippy → test

server-fmt: ## cargo fmt --check
	cd $(SERVER_DIR) && $(CARGO) fmt --check

server-lint: ## clippy --all-targets -D warnings
	cd $(SERVER_DIR) && $(CARGO) clippy --all-targets --locked -- -D warnings

server-test: ## cargo test (실제 content/ 로 통합 테스트)
	cd $(SERVER_DIR) && $(CARGO) test --locked

server-build: ## release 빌드
	cd $(SERVER_DIR) && $(CARGO) build --release --locked

# Serves content/ from this checkout on 127.0.0.1:8080 (override with HOST/PORT).
server-run: ## content/ 를 127.0.0.1:8080 에서 서빙 (HOST·PORT 로 변경)
	$(CARGO) run --manifest-path $(SERVER_DIR)/Cargo.toml --release --locked

server-image: ## server 이미지 빌드 (push 안 함)
	docker build -f $(SERVER_DIR)/Dockerfile -t $(SERVER_IMG) .
