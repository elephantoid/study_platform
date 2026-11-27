# SELF_HOSTING (Docker)

내 컴퓨터에서 study_platform 을 컨테이너로 띄우는 절차. 쿠버네티스는 `SELF_HOSTING_KUBERNETES.md`.

**전제**: `main` 체크아웃 (앱 `app/`, `pipeline/`, Rust 서버 `server/` 가 모두 있다. PR #1~#7).

## 구성

| 서비스 | 이미지 | 역할 | 상시 실행 |
|---|---|---|---|
| `web` | `ghcr.io/elephantoid/study_platform-web` | Next.js 앱 (standalone, UID 1000, 읽기 전용 루트) | ○ |
| `server` | `ghcr.io/elephantoid/study_platform-server` | Rust 읽기 전용 콘텐츠 API (`docs/API.md`, distroless, UID 65532, 읽기 전용 루트) | ○ |
| `pipeline` | `ghcr.io/elephantoid/study_platform-pipeline` | 수집 CLI `ingest` | ✕ (필요할 때 한 번씩) |

DB 도 인증도 없어서 컨테이너에 저장되는 앱 데이터가 없다.

**web 은 카드·토픽·카드 상세(꼬리질문 포함)를 server API 에서 읽는다.** compose 는 web 에 `STUDY_API_URL=http://server:8080` 을 넣고, server 가 `healthy`(기동 때 콘텐츠 검증 통과)가 된 뒤에 web 을 띄운다(`depends_on: condition: service_healthy`). 데이터 소스는 `lib/content/source.ts` 한 곳에서 고른다.

| `STUDY_API_URL` (web 런타임 env) | 카드·토픽·카드 상세 | 강의·대시보드·출처 목록 |
|---|---|---|
| 있음 (compose·k8s 기본) | **요청 때** Rust API (`/api/cards`, `/api/cards/{id}`, `/api/topics`) | 빌드 때 `content/` (API 에 엔드포인트가 없다, API.md §5) |
| 없음·빈 값 | 요청 때 이미지에 구운 `content/` (`lib/content/load.ts`) | 같음 |

- 카드 페이지(`/questions`, `/questions/{id}`, `/review`)는 요청 때 렌더링한다. 그래서 **빌드에 server 가 필요 없고**, 같은 이미지를 두 방식으로 쓴다. 대시보드·강의 페이지는 지금처럼 빌드 때 정적으로 만든다.
- **server 가 죽으면** 카드 페이지는 500 을 낸다(로그에 `ContentApiError: content API unreachable`). 파일로 몰래 되돌아가지 않는다: API 를 쓰기로 했는데 다른 데이터가 보이면 설정 오류가 가려진다. 강의·대시보드는 정적이라 계속 뜬다. web healthcheck(`/`)도 그래서 API 와 무관하다.
- 파일 모드로 띄우려면 `.env` 에 `WEB_STUDY_API_URL=` (빈 값). compose 변수 이름을 따로 둔 이유: 호스트 셸의 `STUDY_API_URL`(로컬 parity 용 `127.0.0.1`)이 컨테이너로 새지 않게.
- 두 소스가 같은 값을 내는지는 CI `web / parity` 잡이 본다 (HTTP 응답 ↔ 파일 로더, `source.ts` API 모드 ↔ 파일 모드, API 모드 Playwright).

| | web | server |
|---|---|---|
| 콘텐츠를 읽는 때 | 카드: **요청** 때 server 에서. 강의·대시보드: **빌드** 때 (이미지에 구워짐) | **기동** 때. compose 는 레포의 `content/`·`videos.json` 을 읽기 전용(`:ro`)으로 마운트 |
| 콘텐츠를 고친 뒤 | 카드만이면 `docker compose restart server` 로 web 에도 보인다. 강의·토픽 구조를 바꿨으면 `docker compose up -d --build web` 도 | `docker compose restart server` (기동 때 검증하고, 틀리면 뜨지 않는다) |

**기본 이미지는 열람 전용이다.** 비로그인은 열람만 한다는 계약(CONTRACT §5) 때문에 답안 제출·꼬리질문 답변·복습은 로그인이 필요한데, 인증이 아직 없다. 개인 학습용으로 쓰려면 `NEXT_PUBLIC_DEMO_AUTH=1` 로 빌드해 데모 로그인 토글을 켠다(빌드 때 새겨진다. 기록은 서버에 저장되지 않는다).

## 기동 (5분)

Docker Desktop 또는 Rancher Desktop(moby) 이 켜져 있으면 된다.

```sh
cp .env.example .env            # 선택. 기본값으로도 뜬다
docker compose up -d --build --wait
open http://localhost:8090      # 포트는 .env 의 WEB_PORT (server 는 SERVER_PORT, 기본 8091)
```

같은 일을 하는 make 타깃: `make docker-up` (web·server 를 함께 띄운다). server 만: `docker compose up -d --build --wait server`.

- `--wait` 는 healthcheck 가 통과할 때까지 기다리고, 실패하면 0 이 아닌 코드로 끝난다.
- 기본은 `127.0.0.1` 에만 열린다. 로그인이 없으니 `WEB_BIND`·`SERVER_BIND=0.0.0.0` 은 믿는 네트워크에서만 쓴다.
- 기본 포트가 8090 인 이유: 8080 은 다른 셀프호스팅 앱(openGym 등)과 자주 겹친다.

compose 없이 이미지만 띄우려면:

```sh
docker build -t ghcr.io/elephantoid/study_platform-web:local .
docker run -d --name study-web -p 127.0.0.1:8090:3000 --read-only \
  --tmpfs /tmp --tmpfs /app/.next/cache:uid=1000,gid=1000 \
  ghcr.io/elephantoid/study_platform-web:local

make server-image     # = docker build -f server/Dockerfile -t ghcr.io/elephantoid/study_platform-server:local .
docker run -d --name study-server -p 127.0.0.1:8091:8080 --read-only --cap-drop ALL \
  ghcr.io/elephantoid/study_platform-server:local     # 이미지에 구운 content/ 를 쓴다
```

## 확인

```sh
docker compose ps                            # web, server 둘 다 (healthy)  — make docker-health
curl -fsS -o /dev/null -w '%{http_code}\n' http://localhost:8090/   # 200
curl -fsS http://localhost:8091/api/health   # {"status":"ok","version":"0.1.0","cards":386}
docker compose logs -f web server
```

| 이미지 | HEALTHCHECK |
|---|---|
| web | `wget` 으로 `/` (alpine 이라 셸이 있다). web 에는 `/api/health` 가 없다 |
| server | `CMD ["/app/study-server", "--healthcheck"]` (exec 형식). distroless 라 셸·curl 이 없어서 바이너리가 자기 `GET /api/health` 를 불러 2xx 면 0, 아니면 1 로 끝난다 (`server/src/healthcheck.rs`). 손으로: `docker compose exec server /app/study-server --healthcheck; echo $?` |

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
| `port is already allocated` | `.env` 의 `WEB_PORT`·`SERVER_PORT` 를 바꾼다 |
| `unhealthy` | `docker compose logs web`. 앱이 루트(`/`)에서 2xx 를 주는지 본다 |
| server 가 `Restarting` / 바로 종료 | `docker compose logs server`. 콘텐츠 검증 실패면 원인 목록이 찍힌다 (`make check`·`make server-test` 로 재현) |
| server `Permission denied` (마운트) | 컨테이너 사용자 65532 가 `content/` 를 읽을 수 있어야 한다. 파일이 `600` 이면 `644` 로 |
| draft 미리보기가 안 켜진다 | `STUDY_SHOW_DRAFT` 는 **빌드 때** 정해진다(강의 페이지를 정적으로 만든다). 바꾼 뒤 `--build` |
| 카드 페이지(`/questions`)만 500 | web 이 server 에 닿지 않는다. `docker compose ps server`, `docker compose logs web` 의 `ContentApiError` 주소 확인. `docker compose exec web wget -qO- http://server:8080/api/health` |
| 빌드가 `mv next.config.ts` 에서 실패 | 앱 설정 파일 이름이나 형식(함수형 설정 등)이 바뀌었다. `Dockerfile` 의 standalone 래퍼를 맞춘다 |
| pipeline `Permission denied` | `HOST_UID`·`HOST_GID` (위 Linux 안내) |

## 앞으로 생길 것의 자리

코드가 생기는 PR 에서 아래에 맞춰 붙인다.

| 생길 것 (ARCHITECTURE) | compose | k8s |
|---|---|---|
| Postgres | 서비스 `db` + `./data/postgres` 볼륨. 백업 대상은 `./data` 하나로 모은다 (`.dockerignore` 에 이미 제외, `.gitignore` 에 `data/` 추가 필요) | StatefulSet + PVC |
| DB 접속·LLM 채점 키 | `.env` → `web.environment` | Secret `study-platform-web` (`k8s/secret.yaml.example`). Deployment 가 이미 선택적으로 읽는다 |
| 강의·대시보드 API (API.md §5) | `lib/content/source.ts` 에 함수를 옮기면 compose 는 그대로 | 그대로 |
