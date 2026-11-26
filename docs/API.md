# API — Rust 백엔드 (`server/`)

읽기 전용 콘텐츠 API. 서버는 시작할 때 `content/` 를 한 번 읽어 `content/schema.json` 과 계약 규칙으로 검증하고 메모리에 올린다. 요청 처리 중에는 파일 시스템을 읽지 않는다.

- 근거: `docs/CONTRACT.md` §3·§3.1·§4, `content/schema.json`, `docs/GRADER.md`
- 타입 이름과 필드는 CONTRACT §4 의 TypeScript 타입을 따른다. JSON 은 camelCase.
- 범위: 콘텐츠 조회만 한다. 로그인, FSRS 복습, 답안 채점 호출은 아직 없다 (§5).

## 1. 공통

| 항목 | 값 |
|---|---|
| 기본 주소 | `http://127.0.0.1:8080` (컨테이너는 `0.0.0.0:8080`) |
| 형식 | `application/json; charset=utf-8`. 모든 응답에 `X-Content-Type-Options: nosniff` |
| 인증 | 없음. 공개 콘텐츠만 다룬다 |
| 정렬 | 카드는 `id` 오름차순. 응답이 실행마다 같다 |

### 1.1 오류 형식 (CONTRACT §4)

```json
{ "error": { "code": "CARD_NOT_FOUND", "message": "card 'x' not found" } }
```

| HTTP | code | 언제 |
|---|---|---|
| 400 | `INVALID_ID` | 경로의 카드 id 가 `^[a-z0-9]+(-[a-z0-9]+)*$`(최대 80자)가 아님. `../` 같은 경로 문자는 여기서 걸린다 |
| 400 | `INVALID_QUERY` | 모르는 쿼리 파라미터, 허용되지 않는 값, 없는 topic·source, `limit` 범위 밖 |
| 404 | `CARD_NOT_FOUND` | 형식은 맞지만 없는 카드 |
| 404 | `NOT_FOUND` | 없는 경로 |
| 405 | `METHOD_NOT_ALLOWED` | GET 외 메서드 |

`message` 는 요청의 무엇이 틀렸는지만 말한다. 파일 경로, 내부 상태, 스택은 넣지 않는다.

### 1.2 시작 시 검증 (fail closed)

콘텐츠가 하나라도 잘못되면 서버는 뜨지 않고 모든 오류를 로그에 남긴 뒤 종료 코드 1로 끝난다. 검사 항목은 `pipeline/study_pipeline/check.py` 와 같다.

- `content/schema.json` (Draft 2020-12) 로 `sources.yaml`·`topics.yaml`·노트·문항 frontmatter 검증. `format` 은 Python 쪽과 같게 검사하지 않는다 (두 검사기가 같은 결과를 내야 한다)
- 파일 이름 = `id`, id 중복 금지, `topicId`·`sourceId`·`reviewTarget.noteId`·`reviewTarget.segmentId` 참조 무결성 (구간은 `pipeline/manifests/videos.json`)
- 본문은 `## 문제` 로 시작하고 `concept` 은 `## 해설` 필수, `link_only` 본문 600자 이하, `summary_link` 는 `segmentId` 필수
- 스키마가 표현하지 못하는 계약: `followUps[].id = <cardId>-f<order>`, order 1·2·3 한 번씩 (CONTRACT §3, §4), `answerIndex < choices.length`
- `content/` 안의 심볼릭 링크는 오류. 파일당 1 MiB 상한
- 자막 12단어 복사 검사는 하지 않는다. 원본 자막이 레포에 없어서다. `ingest check` 가 맡는다

## 2. 엔드포인트

### `GET /api/health`

```json
{ "status": "ok", "version": "0.1.0", "cards": 385 }
```

### `GET /api/topics`

`content/topics.yaml` 전체. `cardCounts` 는 그 토픽과 모든 하위 토픽의 카드 수다.

```json
{ "items": [
  { "id": "cs-core", "name": "CS 기초", "roles": { "mle": 2, "rs": 1, "agent": 2, "ds": 1 },
    "cardCounts": { "concept": 250, "quiz": 0 } },
  { "id": "algorithm", "name": "알고리즘", "parentId": "cs-core", "roles": { "mle": 2, "rs": 1, "agent": 2, "ds": 1 },
    "cardCounts": { "concept": 37, "quiz": 0 } }
] }
```

### `GET /api/cards`

카드 목록. 모든 파라미터는 선택이고 AND 로 묶인다.

| 파라미터 | 값 | 의미 |
|---|---|---|
| `type` | `concept` \| `quiz` \| `open` \| `mcq` | **개념 카드와 퀴즈 카드의 구분.** `concept` = 개념 카드(문제 + 해설). `quiz` = `open` + `mcq` (답을 내고 채점받는 카드) |
| `topic` | topic id | 카테고리. 상위 토픽을 주면 하위 토픽 카드까지 포함 (`cs-core` → `algorithm`, `network`, …) |
| `source` | source id | `content/sources.yaml` 의 출처 (`boost-ai-tech-interview`, `cs329z-2026au`, …) |
| `difficulty` | `basic` \| `intermediate` \| `advanced` | 난이도 |
| `role` | `mle` \| `rs` \| `agent` \| `ds` | 직무 태그 |
| `status` | `draft` \| `reviewed` \| `published` | 검수 상태. 지금 콘텐츠는 전부 `draft` |
| `limit` | 1–200, 기본 50 | 페이지 크기. 범위 밖이면 400 |
| `offset` | 0 이상, 기본 0 | 건너뛸 개수 |

```json
{ "items": [
  { "id": "cme295-2025au-l01-q01", "type": "open", "topicId": "machine-learning",
    "sourceId": "cme295-2025au", "difficulty": "basic", "roles": ["mle", "ds", "rs"],
    "status": "draft", "promptMd": "감성 분류 같은 …", "hasFollowUps": false }
], "total": 22, "limit": 50, "offset": 0 }
```

`total` 은 필터를 적용한 전체 개수다 (페이지 크기와 무관).

### `GET /api/cards/{id}`

카드 하나. CONTRACT §4 `QuestionView` 의 상위 집합이다. 추가 필드는 `sourceId`, `roles`, `status`, `explanationMd`, `modelAnswerKo`.

| 필드 | 있을 때 | 내용 |
|---|---|---|
| `id`, `topicId`, `sourceId`, `type`, `difficulty`, `roles`, `status` | 항상 | frontmatter 값 |
| `promptMd` | 항상 | 본문의 `## 문제` 구간 |
| `explanationMd` | `concept` | 본문의 `## 해설` 이후 전부 (원문의 `##` 소제목 포함) |
| `choices` | `mcq` | 보기. `answerIndex` 는 내보내지 않는다 (CONTRACT §4 와 같다. 채점 API 가 판정) |
| `modelAnswerKo` | `open` | `rubric.modelAnswerKo`. GRADER R2: draft 문항은 AI 채점 대신 모범답안을 보여준다. UI 는 풀이 전에는 숨긴다 |
| `reviewTarget` | 항상 | `{ noteId?, segment?: { id, lectureId, videoId, startSec } }`. 오답 시 이동할 곳. 구간은 manifest 에서 풀어 준다 |
| `attribution` | 항상 | `{ sourceId, license, reuse, attribution, url }`. **출처·라이선스·원본 링크.** `url` 은 개념 노트 원문(`canonicalUrl`) → 강의 구간(`https://www.youtube.com/watch?v=<videoId>&t=<startSec>s`) → 출처 URL 순으로 정한다 |
| `followUps` | 꼬리질문이 있는 카드 | **꼬리질문** `FollowUpItem` 정확히 3개, `order` 1→3 순. 각 `id` = `<cardId>-f<order>` |

`rubric`(채점 기준·감점 항목)은 서버에만 둔다. 채점 결과(`GradeResult.criteria`)로만 나간다.

```json
{
  "id": "boost-algo-004", "topicId": "algorithm", "sourceId": "boost-ai-tech-interview",
  "type": "concept", "difficulty": "intermediate", "roles": ["mle", "agent"], "status": "draft",
  "promptMd": "…", "explanationMd": "…",
  "reviewTarget": { "noteId": "boost-algo-index" },
  "attribution": { "sourceId": "boost-ai-tech-interview", "license": "MIT", "reuse": "verbatim",
    "attribution": "© boost-devs, MIT License", "url": "https://github.com/boost-devs/ai-tech-interview/…" },
  "followUps": [
    { "id": "boost-algo-004-f1", "order": 1, "promptMd": "…", "hintKo": "…",
      "rubricKeywords": ["O(Nk)", "…"], "modelAnswerKo": "…", "maxScore": 10 },
    { "id": "boost-algo-004-f2", "order": 2, "…": "…" },
    { "id": "boost-algo-004-f3", "order": 3, "…": "…" }
  ]
}
```

## 3. 설정 (환경변수)

| 변수 | 기본값 | 내용 |
|---|---|---|
| `STUDY_CONTENT_DIR` | `content` | `schema.json`·`sources.yaml`·`topics.yaml`·`notes/`·`questions/` 가 있는 디렉터리 |
| `STUDY_MANIFEST_PATH` | `pipeline/manifests/videos.json` | 강의 구간 manifest (CONTRACT §3.1 정본) |
| `HOST` | `127.0.0.1` | 바인드 주소. 컨테이너 이미지는 `0.0.0.0` |
| `PORT` | `8080` | |
| `RUST_LOG` | `info` | `tracing` 필터 (예: `info,tower_http=debug`) |

기본값은 레포 루트에서 실행한다고 가정한다 (`make -f mk/rust.mk server-run`). 시크릿은 없다.

## 4. 채점 (GRADER.md)

`server/src/grader.rs` 에 **결정적 부분만** 순수 함수로 구현했다. HTTP 로는 아직 열지 않는다.

| 구현함 (GRADER.md) | 함수 |
|---|---|
| D3 evidence 가 답안의 부분 문자열인지 (공백·문장부호만 정규화). 아니면 그 항목 0점 | `evidence_in_answer` |
| §3 항목 점수 `0..points` 로 자르기, rubric 에 있는 감점만 rubric 값으로, 총점 `max(0, Σ)` | `grade` |
| §3 verdict `pass` ≥7 / `partial` 4–6 / `fail` ≤3, `mustHave` 누락 시 최대 `partial` | `grade`, `verdict_for` |
| §2 승급 조건 (uncertain, 총점 3·4·6·7, 스키마 위반, evidence 실패 ≥2, refusal) | `needs_escalation` |
| §3 FSRS 평점 제안 fail→Again, partial→Hard, pass→Good | `suggested_rating` |

10점 만점이 아닌 rubric 은 오류로 거부한다 (verdict 기준이 10점 기준으로만 정의됨). 현재 서술형 22개는 모두 10점이다 (통합 테스트가 확인).

TODO (GRADER.md §6 순서상 아직 아님):
- 모델 호출 (Haiku → Sonnet 캐스케이드, 구조화 출력), 결과 캐시 `(questionId, rubricHash, answerHash)` (D6)
- `POST /api/attempts` `{ questionId, answer }` → `GradeResult`. 로그인·답안 1~3000자·`open` 여부 검증, 실패 시 `GRADER_UNAVAILABLE`
- 꼬리질문 채점: GRADER.md 는 "같은 엔진에 `rubricKeywords`·`maxScore`" 라고만 한다. 항목 구조가 달라 결정 규칙이 아직 정의되지 않았다
- `mcq` 채점 (`answerIndex` 비교). 지금 `mcq` 카드가 0개다

## 5. 범위 밖 (CONTRACT §4 에 있지만 아직 구현하지 않음)

| 엔드포인트 | 막는 것 |
|---|---|
| `GET /api/roles/:roleId/dashboard` | `dueCount`·`masteredRatio` 가 사용자 상태(DB·로그인)를 필요로 한다 |
| `GET /api/review/queue`, `POST /api/review/:questionId` | FSRS·DB·인증 |
| `GET /api/lectures/:id` | `content/lectures/` 가 아직 없다 (AG 담당) |
| `POST /api/attempts` | §4 |

CONTRACT §4 의 경로는 `/api/questions/:id` 이고 이 서버는 `/api/cards/:id` 다. 응답은 `QuestionView` 의 상위 집합이라 UI 는 경로만 바꾸면 된다. 경로를 하나로 맞추는 일은 공용 파일인 CONTRACT 변경 PR 로 한다.
