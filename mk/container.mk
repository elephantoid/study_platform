# 컨테이너·k8s 타깃. Makefile 에 `-include mk/container.mk` 로 붙이거나
# `make -f mk/container.mk <target>` 으로 단독 실행한다 (레포 루트에서).

IMAGE_TAG   ?= local
WEB_IMAGE   := ghcr.io/elephantoid/study_platform-web
PIPE_IMAGE  := ghcr.io/elephantoid/study_platform-pipeline
K8S_OVERLAY ?= local
K8S_NS      := study-platform
KUBE_CONTEXT ?= $(shell kubectl config current-context 2>/dev/null)
# 실수로 원격 클러스터를 건드리지 않도록 로컬 컨텍스트만 허용한다.
K8S_LOCAL_CONTEXTS := kind-% minikube docker-desktop rancher-desktop

export IMAGE_TAG
export REVISION ?= $(shell git rev-parse --short HEAD 2>/dev/null)

.PHONY: docker-build docker-build-web docker-build-pipeline docker-up docker-down docker-logs \
        docker-health k8s-render k8s-validate k8s-apply-local k8s-delete-local k8s-guard-local

docker-build: docker-build-web docker-build-pipeline ## web, pipeline 이미지 빌드 (push 안 함)

docker-build-web:
	@test -f package.json || { echo "package.json 이 없다: 앱 브랜치(feat/ui-ag)가 아직 합쳐지지 않았다"; exit 1; }
	docker compose build web

docker-build-pipeline:
	@test -f pipeline/pyproject.toml || { echo "pipeline/pyproject.toml 이 없다: pipeline 브랜치가 아직 합쳐지지 않았다"; exit 1; }
	docker compose build pipeline

docker-up: ## 빌드하고 healthy 가 될 때까지 기다린다
	docker compose up -d --build --wait web

docker-down: ## 컨테이너와 네트워크만 정리 (이미지·호스트 데이터는 남는다)
	docker compose down

docker-logs:
	docker compose logs -f --tail=100 web

docker-health:
	@docker compose ps web --format '{{.Name}} {{.State}} {{.Health}}'

k8s-render:
	kubectl kustomize k8s/overlays/$(K8S_OVERLAY)

k8s-validate: ## 클러스터를 바꾸지 않고 매니페스트만 검증
	kubectl kustomize k8s/overlays/$(K8S_OVERLAY) | kubectl --context '$(KUBE_CONTEXT)' apply --dry-run=client -f -

k8s-guard-local:
	$(if $(filter $(K8S_LOCAL_CONTEXTS),$(KUBE_CONTEXT)),,$(error 로컬 컨텍스트가 아니다: '$(KUBE_CONTEXT)' (허용: $(K8S_LOCAL_CONTEXTS))))
	@echo "context: $(KUBE_CONTEXT)  overlay: $(K8S_OVERLAY)"

k8s-apply-local: k8s-guard-local ## 로컬 클러스터에 배포
	kubectl --context '$(KUBE_CONTEXT)' apply -k k8s/overlays/$(K8S_OVERLAY)
	kubectl --context '$(KUBE_CONTEXT)' -n $(K8S_NS) rollout status deploy/study-platform-web --timeout=120s

# 네임스페이스, PVC, Secret 은 일부러 남긴다.
k8s-delete-local: k8s-guard-local ## 앱 리소스만 삭제
	kubectl --context '$(KUBE_CONTEXT)' -n $(K8S_NS) delete deployment,service,configmap,ingress \
	  -l app.kubernetes.io/part-of=study-platform --ignore-not-found
