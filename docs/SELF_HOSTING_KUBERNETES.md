# SELF_HOSTING_KUBERNETES

로컬 쿠버네티스(kind, minikube, Rancher Desktop)에 `web` 을 띄우는 절차. Docker 만 쓰려면 `SELF_HOSTING.md`. 아래 `make` 는 Makefile 이 없으면 `make -f mk/container.mk` 로 바꿔 쓴다.

## 구조

```
k8s/
  base/                    Deployment, Service, ConfigMap(생성)
  overlays/local/          Namespace study-platform, 태그 local, imagePullPolicy: Never
  overlays/local-ingress/  local + Ingress (study.localhost)
  secret.yaml.example      Secret 자리. 실제 값은 k8s/secret.yaml (git 제외)
```

- `pipeline` 은 배포하지 않는다. 결과가 git 작업 트리(`content/`)로 가야 하는 일회성 CLI 라서 compose 로 돌린다.
- PVC 는 없다. 앱이 저장하는 데이터가 아직 없다.
- 네임스페이스는 Pod Security `restricted` 를 강제한다. 파드는 UID 1000, 읽기 전용 루트, capability 없음, 서비스 어카운트 토큰 없음으로 뜬다.

## 1. 이미지 빌드하고 클러스터에 넣기

```sh
make docker-build-web
```

| 클러스터 | 이미지 넣기 |
|---|---|
| kind | `kind create cluster --name study` (처음 한 번) → `kind load docker-image ghcr.io/elephantoid/study_platform-web:local --name study` |
| minikube | `minikube start` → `minikube image load ghcr.io/elephantoid/study_platform-web:local` |
| Rancher Desktop (moby) | 할 일 없음. docker 와 k3s 가 이미지를 공유한다 |

## 2. 적용

```sh
kubectl config current-context       # 대상 확인
make k8s-validate                    # 클러스터를 바꾸지 않는다 (--dry-run=client)
make k8s-apply-local                 # 적용 + rollout 대기
```

`k8s-apply-local` 과 `k8s-delete-local` 은 컨텍스트가 `kind-*`, `minikube`, `docker-desktop`, `rancher-desktop` 일 때만 실행된다. 특정 컨텍스트를 고르려면 `KUBE_CONTEXT=kind-study` 를 붙인다.

## 3. 확인

```sh
kubectl -n study-platform get pods            # READY 1/1
kubectl -n study-platform port-forward svc/study-platform-web 8090:80
curl -fsS -o /dev/null -w '%{http_code}\n' http://localhost:8090/
```

port-forward 없이 계속 쓰려면 ingress controller 가 있는 클러스터에서 `make k8s-apply-local K8S_OVERLAY=local-ingress` 후 `http://study.localhost` 로 접속한다. controller 가 둘 이상이면 `ingress.yaml` 에 `ingressClassName` 을 적는다. 로그인이 없으니 외부에 열린 클러스터에는 Ingress 를 쓰지 않는다.

## 4. 업데이트

`local` 태그는 그대로라 새로 빌드해도 파드가 바뀌지 않는다. 빌드(와 kind·minikube 는 다시 load) 후 `kubectl -n study-platform rollout restart deploy/study-platform-web`.

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
| `violates PodSecurity "restricted"` | 파드 설정을 바꿨다면 base 의 securityContext 를 유지한다 |

## Helm 을 쓰지 않는 이유

배포 대상이 로컬 하나이고 바꿀 값이 이미지 태그와 Ingress 정도라 kustomize overlay 로 끝난다. 차트를 남에게 배포할 일이 생기면 그때 만든다.
