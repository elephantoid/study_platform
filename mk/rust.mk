# Rust backend (server/). Run from the repository root:
#   make -f mk/rust.mk check
# Meant to be included from the root Makefile later (`include mk/rust.mk`).

CARGO      ?= cargo
SERVER_DIR := server
SERVER_IMG ?= study-server

.PHONY: server-check server-fmt server-lint server-test server-build server-run server-image

server-check: server-fmt server-lint server-test ## fmt --check + clippy -D warnings + tests

server-fmt:
	cd $(SERVER_DIR) && $(CARGO) fmt --check

server-lint:
	cd $(SERVER_DIR) && $(CARGO) clippy --all-targets --locked -- -D warnings

server-test:
	cd $(SERVER_DIR) && $(CARGO) test --locked

server-build:
	cd $(SERVER_DIR) && $(CARGO) build --release --locked

# Serves content/ from this checkout on 127.0.0.1:8080 (override with HOST/PORT).
server-run:
	$(CARGO) run --manifest-path $(SERVER_DIR)/Cargo.toml --release --locked

server-image:
	docker build -f $(SERVER_DIR)/Dockerfile -t $(SERVER_IMG) .
