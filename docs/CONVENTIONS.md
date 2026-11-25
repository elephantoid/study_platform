# CONVENTIONS

코드·커밋·이름 규칙. 소유권, 검수 흐름, 강의·구간 ID, API 타입은 `CONTRACT.md` 가 정본이고 frontmatter 형식은 `content/schema.json` 이 정본이다. 이 문서와 어긋나면 그쪽을 따른다. 에이전트·모델 선택은 `AGENTS.md` 를 본다.

각 규칙 끝의 **[기계]** 는 테스트·스키마·CI 가 막는 것, **[사람]** 은 리뷰에서 보는 것이다.

## 1. 시작하기

```sh
make setup   # uv sync + git config core.hooksPath .githooks
make all     # CI(.github/workflows/content.yml)와 같은 검증
make help    # 전체 목록
```

필요한 것: `uv`, Python 3.12 이상, `make`, `gh`(`make audit` 만).

## 2. 코드 스타일

### Python (`pipeline/`)

- Python 3.12 이상, 의존성은 `uv` 로만 관리하고 `uv.lock` 을 함께 커밋한다. [사람]
- 수집 단계는 결정적 스크립트다. LLM 을 부르지 않는다 (`AGENTS.md`). [사람]
- 함수 시그니처에 타입을 적는다. 파일 첫 줄에는 모듈이 하는 일을 한두 문장 docstring 으로 적는다. [사람]
- 주석은 "무엇"이 아니라 "왜"를 적는다. 코드 주석은 영어, 콘텐츠·문서·사용자에게 보이는 문구는 한국어다 (현재 관행). [사람]
- 판단할 수 없으면 통과시키지 않고 오류를 낸다 (fail closed). 라이선스, 복사 검사, published 전환이 그 예다. [기계: 테스트]
- frontmatter 나 manifest 에서 온 ID 는 `config.py` 의 정규식으로 검증한 뒤에만 경로에 쓴다. [사람]
- 외부 명령은 인자 목록으로 넘긴다. 셸 문자열로 조립하지 않는다. [사람]
- 린트는 `make lint` (ruff `E9`,`F`). CI 에는 아직 없다. 포매터와 줄 길이는 정하지 않았다.

### TypeScript / Next (`app/`, `components/`, `lib/`)

앱 코드는 아직 `feat/ui-ag` 브랜치에만 있다. 아래는 그 코드의 현재 관행이다. 병합 뒤에 적용한다.

- `strict: true` 를 끄지 않는다. import 는 `@/*` 별칭을 쓴다. [기계: `tsc`, strict 만]
- 파일은 kebab-case(`attribution-badge.tsx`), 컴포넌트와 타입은 PascalCase, 변수와 함수는 camelCase. 라우트 파일은 Next 규칙(`page.tsx`, `layout.tsx`, `[id]/`)을 따른다. [사람]
- API 타입은 `CONTRACT.md` §4 의 이름을 그대로 쓴다. 새 이름을 만들지 않는다. [사람]
- UI 불변식은 `CONTRACT.md` §5 를 따른다. [사람]

## 3. 브랜치

| 접두사 | 용도 |
|---|---|
| `feat/` | 기능, 새 콘텐츠 |
| `fix/` | 버그, 콘텐츠 교정 |
| `chore/` | 설정, 계약, 도구 |
| `docs/` | 문서만 |

- 이름은 영어 kebab-case: `fix/notes-review`. 작업 주체별 장기 브랜치에는 `-cc`(Claude Code), `-ag`(Antigravity)를 붙인다: `feat/ui-ag`.
- `main` 에 직접 commit·push 하지 않는다. 변경은 PR 로만 들어가고 병합은 사람이 한다 (`CONTRACT.md` §2).
- 기준 브랜치는 `CONTRACT.md` §2 를 따른다.

## 4. 커밋 메시지

[Conventional Commits](https://www.conventionalcommits.org/ko/v1.0.0/): `<type>(<scope>): <요약>`

- type: `feat` `fix` `docs` `test` `chore` `refactor` `ci`. 과거의 `content:` 한 건은 예외로 두고, 앞으로는 `feat(content)`, `fix(content)` 로 쓴다.
- scope(선택): 바뀐 영역. 지금까지 쓴 것: `pipeline` `extract` `check` `ci` `content` `questions` `notes` `lecture` `contract` `grader` `ui`.
- 요약은 한국어와 영어 모두 된다. 끝에 마침표를 찍지 않는다. 이유가 자명하지 않으면 본문에 적는다.
- 한 커밋에는 한 가지 변경만 담는다. 생성 콘텐츠와 그것을 만든 코드는 나눈다.
- 에이전트가 만든 커밋은 끝에 `Co-Authored-By: <모델 이름> <noreply@anthropic.com>` 처럼 모델을 적는다.

예: `fix(check): validate lecture id before building transcript path`

## 5. PR

- 하나의 PR 은 하나의 목적. 다른 쪽 소유 경로(`CONTRACT.md` §1)를 건드리면 나눈다.
- 계약 파일(`schema.json`, `CONTRACT.md`, `sources.yaml`, `topics.yaml`)은 계약 변경 PR 로만 고친다.
- 설명에 적을 것: 무엇을 왜 바꿨는지, 돌린 검증 명령과 결과, 남은 일. 건너뛴 검증도 적는다.
- `published` 전환이 있으면 사람이 `publish-approved` 라벨을 붙인다. 에이전트는 붙이지 않는다. [기계: 라벨 유무, 사람: 누가 붙였는지]
- PR 을 연 쪽이 CI 와 리뷰를 끝까지 확인하고 고친다.
- 삭제, 이력 재작성, 추적 해제는 먼저 제안하고 승인을 받는다.

## 6. 테스트·린트 기준

| 명령 | 통과 기준 | 어디서 도는가 |
|---|---|---|
| `make test` | 전부 통과 | 로컬 hook, CI |
| `make check` | 0 errors (경고는 허용) | CI |
| `make check-strict` | 0 errors. 자막 원본(`~/.cache/study-platform/raw/yt/`) 필요 | 로컬 hook |
| `make gate` | 승인 없는 published 전환 0건 | CI (로컬 hook 은 `gate-staged`) |
| `make lint` | 0 errors | 수동 |
| `make audit` | 선언한 라이선스와 실제가 일치 | 수동. 소스를 추가하거나 추출하기 전 |

- 버그를 고치면 그 버그를 재현하는 테스트를 함께 넣는다. 스키마 규칙을 바꾸면 `pipeline/tests/test_schema.py` 에 허용·거부 사례를 모두 넣는다.
- 테스트는 네트워크, 실제 자막, 사용자 홈에 의존하지 않는다.
- `make gate` 는 커밋된 HEAD 만 본다. 커밋하지 않은 변경은 `make gate-staged` 로 본다. `BASE` 가 옛것이면 먼저 `git fetch` 한다. 쌓은 PR 은 `make all BASE=origin/<base 브랜치>` 로 돌린다.

## 7. 네이밍 규칙

### 7.1 파일·코드

| 대상 | 규칙 | 예 |
|---|---|---|
| 디렉터리 | kebab-case. Python 패키지만 snake_case | `content/questions/data-structure/`, `study_pipeline/` |
| Python 모듈, 함수, 변수 | snake_case | `extract_notes.py`, `split_front` |
| Python 클래스 / 상수 | PascalCase / UPPER_SNAKE | `FailGuard` / `QUOTE_WORDS` |
| 모듈 내부용 이름 | 앞에 `_` | `_git`, `_status` |
| 테스트 | `test_<대상>.py`, `test_<상황>_<기대>` | `test_gate_tty_unavailable_means_rejected` |
| frontmatter·JSON 키 | camelCase. 한국어 문구 필드는 `Ko`, markdown 필드는 `Md` 로 끝낸다 | `topicId`, `modelAnswerKo`, `promptMd` |
| YAML 값·enum | kebab-case 나 snake_case. `schema.json` 의 값을 그대로 쓴다 | `claude-code`, `summary_link` |
| 환경 변수 | UPPER_SNAKE | `STUDY_RAW_DIR` |
| 최상위 문서 | `docs/UPPERCASE.md` | `docs/CONTRACT.md` |

### 7.2 콘텐츠 ID

공통: 소문자·숫자·하이픈만, 80자 이하(`schema.json` 의 `$defs/id`). 파일 이름은 `<id>.md` 이고 종류 안에서 유일하다. [기계] 디렉터리는 `content/questions/<topicId>/`, `content/notes/<topicId>/` 다. `ingest check` 는 디렉터리와 `topicId` 가 같은지는 보지 않는다. [사람]

| 대상 | 패턴 | 예 | 정본 |
|---|---|---|---|
| 레포에서 추출한 문항 | `<소스>-<카테고리>-<NNN>` | `gyoogle-os-002`, `boost-algo-014` | `extract_interview.py`, `extract_notes.py` |
| 위 문항의 목록 노트 | `<소스>-<카테고리>-index` | `boost-algo-index` | 같음 |
| 강의 / 구간 | `<sourceId>-l<NN>` / `<lectureId>-s<NN>` | `cs329z-2026au-l01-s07` | `CONTRACT.md` §3.1, `manifests/videos.json` |
| 강의에서 만든 문항 | `<lectureId>-q<NN>` | `cs329z-2026au-l01-q05` | `.claude/agents/question-generator.md` |
| 꼬리질문 | `<questionId>-f<order>` | `cs329z-2026au-l01-q05-f1` | `schema.json` 의 `$defs/followUp` |
| 채점 항목 | `c<N>` (문항 안에서만 유일) | `c1` | `schema.json` 의 `$defs/rubric` |

소스와 카테고리는 정해진 값만 쓴다. 새 값은 추출기의 `FILES`·`SOURCES` 표에 먼저 넣는다.

- 소스 약칭: `boost`(`boost-ai-tech-interview`), `jbee`(`jbee-interview-beginner`), `gyoogle`(`gyoogle-tech-interview`), `jobhope`(`jobhope-technicalnote`). 약칭은 ID 에만 쓰고 `sourceId` 에는 `sources.yaml` 의 전체 ID 를 쓴다.

| 카테고리 | topicId | 카테고리 | topicId |
|---|---|---|---|
| `algo` | `algorithm` | `ml` | `machine-learning` |
| `db` | `data-engineering-sql` | `net` | `network` |
| `dist` | `statistics-math` (분포) | `os` | `operating-system` |
| `dl` | `deep-learning` | `py` | `python` |
| `ds` | `data-structure` | `stat` | `statistics-math` |
| `la` | `linear-algebra` | | |

번호:

- 추출 문항은 세 자리 `001` 부터, 강의·구간·강의 문항은 두 자리 `01` 부터 매긴다.
- 한 번 준 번호는 바꾸지 않고, 지운 번호는 다시 쓰지 않는다. 빈 번호는 정상이다. [사람]
- 중복 카드는 파일만 지우지 않고 `pipeline/overrides/notes.yaml` 에 `drop: <남길 카드 ID>` 로 남긴다. 그래야 다시 추출해도 번호가 밀리지 않는다 (jbee·gyoogle·jobhope 만. boost 추출기는 overrides 를 읽지 않는다).

### 7.3 개념 카드와 퀴즈 카드

구분 기준은 ID 가 아니라 frontmatter 의 `type` 이다. `schema.json` 에 "퀴즈"라는 값은 없고, 이 문서에서는 채점하는 `open`·`mcq` 를 퀴즈 카드라고 부른다.

| | 개념 카드 | 퀴즈 카드(서술형) | 퀴즈 카드(객관식) |
|---|---|---|---|
| `type` | `concept` | `open` | `mcq` |
| 출처 | MIT 레포 원문 추출 | 강의 자막에서 생성 | 아직 없음 |
| ID | `<소스>-<카테고리>-<NNN>` | `<lectureId>-q<NN>` | 미정. 처음 만들 때 계약 변경 PR 로 정한다 |
| 본문 | `## 문제` + `## 해설` 필수 | `## 문제` | `## 문제` |
| 정답 위치 | 본문의 `## 해설` | `rubric.modelAnswerKo` | `choices`, `answerIndex` |
| `reviewTarget` | `noteId` (`…-index`) | `segmentId` | 둘 중 하나 이상 |

`## 문제` 시작, 개념 카드의 `## 해설`, 서술형의 `rubric`, 객관식의 `choices`·`answerIndex`, `reviewTarget` 이 가리키는 대상의 존재는 [기계]. 출처와 ID 모양이 `type` 에 맞는지는 [사람].

한 파일에는 카드 한 장만 둔다. 개념 카드를 퀴즈로 바꿀 때는 기존 파일의 `type` 을 바꾸지 않고 새 ID 로 만든다.

### 7.4 꼬리질문 연결

- 별도 파일을 만들지 않는다. 본 문항 frontmatter 의 `followUps` 배열에 넣는다. 선택 항목이고, 넣으면 정확히 3개다. [기계]
- `order` 는 1·2·3 을 한 번씩 쓰고 `id` 는 `<본 문항 id>-f<order>` 다. 스키마는 개별 값만 검사한다. 순서 중복과 ID 접두사 일치는 [사람].
- 꼬리질문의 꼬리질문은 없다. 다른 카드로 잇고 싶으면 `reviewTarget` 을 쓴다.
- `rubricKeywords` 는 의미 일치로 채점한다. 생성 주체와 현황은 `CONTRACT.md` §3 을 본다. 현재 저장된 꼬리질문은 없다.
