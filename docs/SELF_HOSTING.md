# SELF_HOSTING (Docker)

내 컴퓨터에서 study_platform 을 컨테이너로 띄우는 절차. 쿠버네티스는 `SELF_HOSTING_KUBERNETES.md`.

**전제**: 앱(`package.json`, `app/`)과 `pipeline/` 이 있는 체크아웃이어야 한다. 이 문서를 쓴 시점(2026-11-25)의 `main` 에는 둘 다 없고 `feat/ui-ag`, `fix/notes-review` 에 있다.

## 구성

| 서비스 | 이미지 | 역할 | 상시 실행 |
|---|---|---|---|
| `web` | `ghcr.io/elephantoid/study_platform-web` | Next.js 앱 (standalone, UID 1000, 읽기 전용 루트) | ○ |
| `pipeline` | `ghcr.io/elephantoid/study_platform-pipeline` | 수집 CLI `ingest` | ✕ (필요할 때 한 번씩) |

지금 앱은 목업 데이터로 돌고 DB 도 API 도 없다. 그래서 컨테이너에 저장되는 앱 데이터가 없다.

## 기동 (5분)

Docker Desktop 또는 Rancher Desktop(moby) 이 켜져 있으면 된다.

```sh
cp .env.example .env            # 선택. 기본값으로도 뜬다
docker compose up -d --build --wait
open http://localhost:8090      # 포트는 .env 의 WEB_PORT
```

같은 일을 하는 make 타깃: `make docker-up`. Makefile 이 없으면 `make -f mk/container.mk docker-up`.

- `--wait` 는 healthcheck 가 통과할 때까지 기다리고, 실패하면 0 이 아닌 코드로 끝난다.
- 기본은 `127.0.0.1` 에만 열린다. 로그인이 없으니 `WEB_BIND=0.0.0.0` 은 믿는 네트워크에서만 쓴다.
- 기본 포트가 8090 인 이유: 8080 은 다른 셀프호스팅 앱(openGym 등)과 자주 겹친다.

compose 없이 이미지만 띄우려면:

```sh
docker build -t ghcr.io/elephantoid/study_platform-web:local .
docker run -d --name study-web -p 127.0.0.1:8090:3000 --read-only \
  --tmpfs /tmp --tmpfs /app/.next/cache:uid=1000,gid=1000 \
  ghcr.io/elephantoid/study_platform-web:local
```

## 확인

```sh
docker compose ps                            # STATUS 에 (healthy)
curl -fsS -o /dev/null -w '%{http_code}\n' http://localhost:8090/   # 200
docker compose logs -f web
```

healthcheck 는 `/` 를 본다. `/api/health` 가 생기면 `Dockerfile` 의 `HEALTHCHECK` 와 `k8s/base/deployment.yaml` 의 startup·readiness 경로를 함께 바꾼다.

## 수집 파이프라인

```sh
docker compose build pipeline      # pipeline/ 코드나 overrides/ 를 고쳤을 때마다
docker compose run --rm pipeline check
docker compose run --rm pipeline transcripts --only cs329z-2026au-l01
```

| 단계 | 컨테이너 | 이유 |
|---|---|---|
| `check` `extract` `videos` `transcripts` | ○ | 단, `transcripts` 의 Defuddle 대체 경로는 `npx` 가 없어 쓰지 못한다 (yt-dlp 경로만) |
| `audit` `repos` `all` | ✕ | GitHub CLI `gh` 와 로그인이 필요하다 |
| `gate` | ✕ | `git` 저장소와 터미널 확인이 필요하다 |

✕ 는 호스트에서 `cd pipeline && uv run ingest <단계>` 로 돌린다. 검증용 hook 과 CI 도 지금처럼 호스트에서 돈다.

마운트: `content/` 와 `pipeline/manifests/` 는 레포의 것을 그대로 읽고 쓴다. 자막 원본은 `~/.cache/study-platform/raw` (호스트 CLI 와 공유, `STUDY_RAW_HOST_DIR` 로 변경) 이며 **레포 안으로 옮기지 않는다**.

Linux 에서는 처음 실행하기 전에 `mkdir -p ~/.cache/study-platform/raw` 를 하고 `.env` 의 `HOST_UID`·`HOST_GID` 를 `id -u`·`id -g` 로 맞춘다. 안 그러면 파일 소유자가 어긋난다.

## 이미지 태그 규칙

`ghcr.io/elephantoid/study_platform-<service>:<tag>`

| 태그 | 쓰임 |
|---|---|
| `local` | 내 컴퓨터에서 빌드한 것. 기본값 |
| `<git 짧은 SHA>` | 특정 커밋을 고정해 되돌릴 때. `IMAGE_TAG=$(git rev-parse --short HEAD) make docker-build` |
| `vX.Y.Z` | 릴리스 (아직 없음) |

`latest` 는 쓰지 않는다. **레지스트리에 올린 이미지는 아직 없으므로 `docker compose pull` 은 실패한다.** 올리기로 하면 이 이름 그대로 push 하면 되고 compose 파일은 안 고쳐도 된다.

베이스 이미지는 `Dockerfile`, `pipeline/Dockerfile` 에 태그 + digest 로 고정돼 있다. 올릴 때 새 digest 는 `docker buildx imagetools inspect <image>:<tag>` 로 얻는다.

## 백업

| 데이터 | 위치 | 백업 |
|---|---|---|
| 문항·노트·강의, manifest | `content/`, `pipeline/manifests/` | git |
| 자막·레포 원본 | `~/.cache/study-platform/raw` | 다시 받을 수 있는 캐시지만, 영상이 비공개가 되면 못 받는다. 개인 보관만 하고 공개 장소에 올리지 않는다: `tar czf ~/study-raw-$(date +%F).tgz -C ~/.cache/study-platform raw` |
| 학습 기록(복습 일정, 답안) | 아직 없음 | DB 도입 때 아래 규칙을 따른다 |

## 업데이트와 정리

```sh
git pull && docker compose up -d --build --wait   # 업데이트
docker compose stop                               # 멈추기만
docker compose down                               # 컨테이너·네트워크 삭제. 호스트 데이터와 이미지는 남는다
```

되돌리기: 이전 SHA 태그 이미지가 있으면 `IMAGE_TAG=<sha> docker compose up -d --no-build`.

## 문제 해결

| 증상 | 원인과 조치 |
|---|---|
| `package.json 이 없다` / `"/package-lock.json": not found` | 앱이 없는 브랜치다. 위 **전제** 참고 |
| `port is already allocated` | `.env` 의 `WEB_PORT` 를 바꾼다 |
| `unhealthy` | `docker compose logs web`. 앱이 루트(`/`)에서 2xx 를 주는지 본다 |
| draft 미리보기가 안 켜진다 | `NEXT_PUBLIC_SHOW_DRAFT` 는 **빌드 때** 새겨진다. 바꾼 뒤 `--build` |
| 빌드가 `mv next.config.ts` 에서 실패 | 앱 설정 파일 이름이나 형식(함수형 설정 등)이 바뀌었다. `Dockerfile` 의 standalone 래퍼를 맞춘다 |
| pipeline `Permission denied` | `HOST_UID`·`HOST_GID` (위 Linux 안내) |

## 앞으로 생길 것의 자리

코드가 생기는 PR 에서 아래에 맞춰 붙인다. 지금은 아무것도 없다.

| 생길 것 (ARCHITECTURE) | compose | k8s |
|---|---|---|
| `app/api/` | `web` 에 포함. 서비스 추가 없음 | 동일 |
| Postgres | 서비스 `db` + `./data/postgres` 볼륨. 백업 대상은 `./data` 하나로 모은다 (`.dockerignore` 에 이미 제외, `.gitignore` 에 `data/` 추가 필요) | StatefulSet + PVC |
| DB 접속·LLM 채점 키 | `.env` → `web.environment` | Secret `study-platform-web` (`k8s/secret.yaml.example`). Deployment 가 이미 선택적으로 읽는다 |
| `lib/content/` 로더 | 빌드 컨텍스트에 `content/` 가 이미 들어간다. 런타임에 파일을 읽으면 standalone 추적 대상인지 확인한다 | 동일 |
