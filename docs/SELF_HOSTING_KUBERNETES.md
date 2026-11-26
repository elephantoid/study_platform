# SELF_HOSTING_KUBERNETES

로컬 쿠버네티스(kind, minikube, Rancher Desktop)에 `web` 과 `server`(Rust 콘텐츠 API)를 띄우는 절차. Docker 만 쓰려면 `SELF_HOSTING.md`.

## 구조

```
k8s/
  base/                    web·server 각각 Deployment, Service, ConfigMap(생성)
  overlays/local/          Namespace study-platform, 두 이미지 태그 local, imagePullPolicy: Never
  overlays/local-ingress/  local + Ingress (study.localhost)
  secret.yaml.example      Secret 자리. 실제 값은 k8s/secret.yaml (git 제외)
```

- `pipeline` 은 배포하지 않는다. 결과가 git 작업 트리(`content/`)로 가야 하는 일회성 CLI 라서 compose 로 돌린다.
- PVC 는 없다. 앱이 저장하는 데이터가 아직 없다.
- web 은 server 를 부르지 않는다 (빌드 때 `content/` 를 직접 읽는다, `SELF_HOSTING.md` 참고). 그래서 둘 사이 설정이 없다.
- server 콘텐츠는 이미지에 구운 `/app/content` 를 쓴다. 읽기 전용 루트 파일시스템이라 쓸 수 없다. compose 처럼 레포를 마운트하지 않는 이유: `restricted` 가 hostPath 를 막는다. 콘텐츠를 바꾸면 이미지를 다시 빌드한다.

| | web | server |
|---|---|---|
| 포트 (컨테이너 → Service) | 3000 → 80 | 8080 → 80 |
| 환경변수 (ConfigMap) | `PORT`, `HOSTNAME` | `HOST=0.0.0.0`, `PORT=8080`, `STUDY_CONTENT_DIR`, `STUDY_MANIFEST_PATH` |
| requests / limits | 50m·128Mi / 1·512Mi | 20m·32Mi / 500m·128Mi (실측 상주 메모리 약 7MiB) |
| startup·readiness | `/` | `/api/health` |
| liveness | TCP | `/api/health` (메모리 스냅샷만 보므로 외부 장애로 재시작되지 않는다) |
| UID | 1000 | 65532 (distroless `nonroot`) |
| Secret | `study-platform-web` (선택) | 없음 (시크릿을 쓰지 않는다) |
- 네임스페이스는 Pod Security `restricted` 를 강제한다. 파드는 비루트(UID 위 표), 읽기 전용 루트, capability 없음, 서비스 어카운트 토큰 없음으로 뜬다.

## 1. 이미지 빌드하고 클러스터에 넣기

```sh
make docker-build-web docker-build-server
```

| 클러스터 | 이미지 넣기 |
|---|---|
| kind | `kind create cluster --name study` (처음 한 번) → `kind load docker-image ghcr.io/elephantoid/study_platform-web:local ghcr.io/elephantoid/study_platform-server:local --name study` |
| minikube | `minikube start` → `minikube image load` 를 두 이미지에 각각 |
| Rancher Desktop (moby) | 할 일 없음. docker 와 k3s 가 이미지를 공유한다 |

## 2. 적용

```sh
kubectl config current-context       # 대상 확인
make k8s-validate                    # 클러스터를 바꾸지 않는다 (--dry-run=client)
make k8s-apply-local                 # 적용 + 두 Deployment rollout 대기
```

`k8s-apply-local` 과 `k8s-delete-local` 은 컨텍스트가 `kind-*`, `minikube`, `docker-desktop`, `rancher-desktop` 일 때만 실행된다. 특정 컨텍스트를 고르려면 `KUBE_CONTEXT=kind-study` 를 붙인다.

## 3. 확인

```sh
kubectl -n study-platform get pods            # web, server 둘 다 READY 1/1
kubectl -n study-platform port-forward svc/study-platform-web 8090:80
curl -fsS -o /dev/null -w '%{http_code}\n' http://localhost:8090/
kubectl -n study-platform port-forward svc/study-platform-server 8091:80
curl -fsS http://localhost:8091/api/health
```

port-forward 없이 계속 쓰려면 ingress controller 가 있는 클러스터에서 `make k8s-apply-local K8S_OVERLAY=local-ingress` 후 `http://study.localhost` 로 접속한다. controller 가 둘 이상이면 `ingress.yaml` 에 `ingressClassName` 을 적는다. Ingress 는 web 만 연다 (server 는 port-forward). 로그인이 없으니 외부에 열린 클러스터에는 Ingress 를 쓰지 않는다.

## 4. 업데이트

`local` 태그는 그대로라 새로 빌드해도 파드가 바뀌지 않는다. 빌드(와 kind·minikube 는 다시 load) 후 `kubectl -n study-platform rollout restart deploy/study-platform-web deploy/study-platform-server`.

## 5. 삭제

```sh
make k8s-delete-local                # 앱 리소스만. 네임스페이스·Secret·PVC 는 남긴다
kubectl delete namespace study-platform   # 전부 삭제 (나중에 생길 PVC 데이터 포함, 되돌릴 수 없음)
kind delete cluster --name study          # kind 로 따로 만든 경우
```

`kubectl delete -k` 는 네임스페이스까지 지우므로 쓰지 않는다.

## 문제 해결

| 증상 | 원인과 조치 |
|---|---|
| `ErrImageNeverPull` | 이미지가 노드에 없다. 1단계의 이미지 넣기를 다시 한다 |
| `Running` 인데 `0/1` | `kubectl -n study-platform logs deploy/study-platform-web`, `describe pod` 로 probe 확인 |
| server `CrashLoopBackOff` | `kubectl -n study-platform logs deploy/study-platform-server --previous`. 콘텐츠 검증 실패면 원인이 찍힌다. 고친 뒤 이미지 재빌드 |
| `violates PodSecurity "restricted"` | 파드 설정을 바꿨다면 base 의 securityContext 를 유지한다 |

## Helm 을 쓰지 않는 이유

배포 대상이 로컬 하나이고 바꿀 값이 이미지 태그와 Ingress 정도라 kustomize overlay 로 끝난다. 차트를 남에게 배포할 일이 생기면 그때 만든다.
