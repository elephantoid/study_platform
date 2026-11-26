# CONTRACT

Claude Code(CC)와 Antigravity(AG)가 병렬로 작업하기 위한 계약이다. 콘텐츠 형식의 정본은 `content/schema.json` 이고, 이 문서는 소유권·흐름·API 타입을 정한다. 계약을 바꾸려면 PR 하나로 이 두 파일을 함께 고치고, 상대 쪽 승인을 받는다.

## 1. 디렉터리 소유권

소유자만 쓴다. 다른 쪽은 읽기만 한다. 공용 파일은 계약 변경 PR 로만 고친다.

| 경로 | 소유 | 내용 |
|---|---|---|
| `pipeline/` | CC | Python + uv 수집 스크립트 (`ingest`) |
| `db/` | CC | Drizzle 스키마, 마이그레이션, `content/` → DB 동기화 |
| `lib/srs/`, `lib/grader/` | CC | FSRS, 채점 |
| `server/`, `docs/API.md` | CC | §4 의 API 구현 (Rust, PR #7). 예전 `app/api/` route handler 계획을 대체 |
| `lib/content/`, `tests/parity/` | AG | UI 서버 전용 콘텐츠 로더. 모양은 `server/` 와 같고 패리티 테스트가 지킨다 (§4) |
| `content/questions/`, `content/notes/` | CC | 면접 문항·개념 노트 생성 |
| `content/lectures/` | AG | 강의 세그먼트·요약 생성 |
| `app/`, `components/`, `lib/demo/` | AG | 화면, UI 컴포넌트, 데모 세션 데이터 |
| `content/sources.yaml`, `content/topics.yaml` | 공용 | 계약 변경 PR 로만 고친다 |
| `content/schema.json`, `docs/CONTRACT.md` | 공용 | 계약 변경 PR 로만 고친다 |
| `docs/` (그 외) | CC | 계획 문서 정본 |

## 2. 브랜치·PR

- 기준 브랜치: `chore/contract-v2` (계약 v2). main 병합 후에는 main.
- CC: `feat/pipeline-cc` (worktree `../study_platform-cc`)
- AG: `feat/ui-ag` (worktree `../study_platform-ag`). `chore/contract-v2` 위로 rebase 한다. 공유 파일 충돌은 v2 쪽을 택한다.
- 병합은 사람이 한다. main 에 들어가는 PR 은 테스트가 GREEN 이어야 한다.

## 3. 콘텐츠 흐름과 교차 검수

```
생성(소유자) → status: draft → 상대 쪽 검수 → review.verdict 기록 → status: reviewed → 사람 PR 승인 → status: published
```

- 검수는 **생성한 쪽의 반대편**이 한다. CC 문항은 AG(Gemini)가, AG 강의 요약은 CC(Claude)가 본다.
- **NotebookLM 산출물**(강의 `slideUnits` 해설 등)은 AG가 돌려서 `content/lectures/`에 넣되 `generation.by: notebooklm`으로 기록한다. 파일 안의 카드마다 `slideUnits[].generatedBy`도 적는다. NotebookLM은 Gemini 계열이므로, 파일이나 카드 중 하나라도 AG·NotebookLM이 쓴 것이면 검수는 CC 또는 사람만 한다(스키마가 강제). 자막 12단어 연속 복사 검사는 frontmatter 전체에 적용되고, 로컬 hook 에서는 참조한 강의의 자막이 없으면 오류다(CI 에는 자막이 없어 건너뛴다). 슬라이드 문장 원문 복사는 기계로 못 잡으므로 검수 체크리스트로 본다.
- **NotebookLM 입력과 슬라이드 출처** (2026-11-16 검수에서 두 강의가 fail 한 뒤 추가). 노트북에 넣은 소스를 `generation.sources[]` 에 적고, 강의 영상(`youtube`) 또는 자막(`transcript`)이 반드시 들어가야 한다(스키마). AG 파일 안의 NotebookLM 카드도 같다(`ingest check`). 슬라이드 번호(`slideRange`·`slideNumberLabel`)는 `syllabus.slidesUrl`(실제 PDF)의 쪽수로만 매기고 `deckPageCount` 를 넘으면 오류다. 덱이 없으면 슬라이드 필드를 모두 뺀다. `notebookLmUrl` 은 `…/notebook/<id>` 공유 URL 만 허용한다. 카드 시각이 전부 구간 시작과 같으면 경고한다. 이 규칙들은 지어내기를 어렵게 만들 뿐이며, 마지막 방어선은 자막 대조 검수다.
- 검수자는 frontmatter 의 `review` 만 쓴다. 본문은 고치지 않고 `reasons` 에 적는다. 수정은 소유자가 한다.
- `fail` 이면 소유자가 고친 뒤 `review` 를 지우고 다시 요청한다.
- `published` 전환은 사람만 한다.
- 스키마(`reviewGate`)가 기계적으로 막는 것: 검수 없는 `reviewed/published`, `fail` 판정의 승격, 생성자 본인의 검수(`generation.by == review.by`). 스키마로 막을 수 없는 "published 는 사람이 바꿨는가"는 `ingest gate` 가 검사한다.
  - 로컬: `.githooks/pre-commit` (`git config core.hooksPath .githooks`, 모든 worktree 공유) 이 테스트, `ingest check --require-transcripts`, `ingest gate` 를 돌린다. published 전환이 있으면 터미널(`/dev/tty`)에서 `publish` 를 입력해야 커밋된다. 에이전트 셸에는 터미널이 없어 거부된다.
  - GitHub: `.github/workflows/content.yml`. published 전환이 있는 PR 은 `publish-approved` 라벨이 없으면 실패한다.
  - 한계: `--no-verify` 나 라벨 직접 부착은 막지 못한다. 최종 관문은 사람의 병합이다. 이 장치는 전환을 눈에 띄게 만들 뿐이다.
- 라이선스는 닫힌 목록이다. `verbatim` 은 허용 목록(`verbatimLicense`)의 라이선스만 쓸 수 있다 (fail closed).
- 검수 체크리스트: 사실 오류 / 강의에서 말하지 않은 일반 지식이 "보충(강의 밖)" 표시 없이 섞였는가 / 슬라이드 번호가 실제 덱과 맞는가 / `reviewTarget`·`segmentId` 가 실재하는가 / 타임스탬프가 영상 길이 안에 있는가 / 자막 원문이 섞였는가 / 슬라이드 문장이 그대로 옮겨졌는가 / `link_only` 소스 원문이 섞였는가 / 기존 문항과 중복되는가.
- `followUps`(꼬리질문)는 선택 항목이며, 넣을 때는 정확히 3개다. 생성은 CC 문항 생성기가 한다. 개념 카드(`concept`)에도 둘 수 있다 (근거: PR #3 이 concept 11개에 붙였고 PR #7 API 가 그대로 내보낸다). 개념 카드의 꼬리질문은 해설을 펼친 뒤 채점 없는 자가 점검으로만 연다. 퀴즈 카드의 꼬리질문은 본 문항을 제출한 뒤 연다. 어느 쪽이든 `rubricKeywords`·`modelAnswerKo` 는 그 꼬리질문 답을 확정하기 전에는 화면에 보이지 않는다.
- `syllabus`·`slideRange`·`slideUnits`는 선택 항목이다. 강의계획서·슬라이드가 없는 재생목록(IBM)은 생략한다.

## 3.1 ID·본문 규칙

- **강의 ID** `<sourceId>-l<NN>`, **구간 ID** `<lectureId>-s<NN>`. 둘 다 `pipeline/manifests/videos.json` 이 정본이다. AG 는 강의 파일을 만들 때 manifest 의 `lectureId` 와 `segments[].id/startSec/endSec` 를 그대로 쓴다.
  - 강의 번호는 제목의 `Lecture N` / `Part N` 을 따르고, 없으면 다음 빈 번호를 쓴다. **한 번 부여한 번호는 바꾸지 않는다** (`lectureIds` 맵에 고정). 재생목록 순서는 강의 순서가 아니다 (CS329Z 는 6강이 맨 앞이다).
  - YouTube 챕터가 있는 강의(54/62편)는 챕터 = 구간이다. 챕터가 없는 강의(CS329A 등)는 AG 가 구간을 나누고 `s01` 부터 번호를 매긴 뒤 manifest 반영 PR 을 CC 에 요청한다.
  - CC 는 아직 강의 파일이 없는 구간 ID 를 문항의 `reviewTarget.segmentId` 로 참조할 수 있다. `ingest check` 는 manifest 에 있으면 통과시키고 경고만 남긴다.
- **문항 본문**: `## 문제` 로 시작한다. `concept` 은 `## 해설` 이 필수다. `open` 의 모범답안은 `rubric.modelAnswerKo` 에 둔다.
- **개념 카드와 퀴즈 카드**: `type` 으로만 가른다. `concept` = 개념 카드(문제 + 해설). 채점하지 않으며 해설(`explanationMd`)을 펼친 뒤 FSRS 1–4 자가 평가만 한다. `open`·`mcq` = 퀴즈 카드(답을 내고 채점받는 카드). API 의 `type=quiz` 가 둘을 묶는다 (PR #7 `docs/API.md`). 채점(`POST /api/attempts`)이 없는 동안 UI 는 점수를 만들지 않고, draft 문항은 GRADER R2 대로 제출 뒤 모범답안만 보여 준다.
- **원본 자막 위치**: `~/.cache/study-platform/raw/yt/<lectureId>.json` (전체 cue) 과 `<lectureId>.md` (챕터별 30초 단위 압축본, LLM 입력용). `ingest transcripts` 가 만든다. 두 worktree 가 같은 경로를 공유하며, 어떤 경우에도 repo 에 commit 하지 않는다. `STUDY_RAW_DIR` 로 경로를 바꿀 수 있다.
- **검증**: `cd pipeline && uv run ingest check`. 스키마, 참조 무결성(topic, source, note, segment), link_only 본문 길이, 구간 시각 범위를 검사한다. 0 errors 가 PR 조건이다.

## 4. 앱 API 타입

정본 구현은 Rust 서버 `server/` 이고 엔드포인트·필드는 `docs/API.md` 가 자세히 적는다 (PR #7). 문항 경로는 **`GET /api/cards/{id}`·`GET /api/cards`** 로 통일한다 (예전 `/api/questions/:id` 는 쓰지 않는다). 서버에 아직 없는 엔드포인트(대시보드·강의·복습·채점, API.md §5)는 아래 타입이 정본이다. UI 는 서버를 호출하기 전까지 `lib/content/load.ts`(서버 전용)가 같은 모양을 `content/` 에서 만들고, `tests/parity/` 가 실제 서버 응답과 필드 단위로 비교한다 (CI `web` 의 `parity` job).

```ts
type RoleId = "mle" | "rs" | "agent" | "ds";
type ContentStatus = "draft" | "reviewed" | "published";

type Attribution = { sourceId: string; license: string; reuse: "verbatim" | "summary_link" | "link_only"; attribution: string; url: string };

// GET /api/topics → { items: Topic[] }
type Topic = {
  id: string; name: string; parentId?: string;
  roles: Partial<Record<RoleId, number>>;   // topics.yaml 직무 가중치 1–3 (3 = 핵심)
  cardCounts: { concept: number; quiz: number }; // 그 토픽과 모든 하위 토픽
};

// GET /api/roles/:roleId/dashboard   (서버 미구현. 숙련도 masteredRatio 는 사용자 상태 API 와 함께 정한다)
type Dashboard = {
  role: { id: RoleId; name: string };
  dueCount: number;                         // 오늘 복습할 카드 수 (비로그인 0)
  topics: {                                 // 직무 가중치가 있는 하위 토픽, 가중치 내림차순
    id: string; name: string;
    weight: number;                         // 1–3. % 가 아니다
    cardCounts: { concept: number; quiz: number };
    sources: Attribution[];                 // 그 토픽 카드들의 실제 출처 (url = 출처 URL). 토픽 카드의 출처 배지
  }[];
  lectures: {
    id: string; course: string; term: string; title: string; durationSec: number; status: ContentStatus;
    attribution: Attribution;               // 강의 카드의 출처 배지 (url = YouTube 영상)
  }[];
};

type FollowUpItem = {
  id: string;                               // <cardId>-f<order>
  order: 1 | 2 | 3;
  promptMd: string;
  hintKo: string;
  rubricKeywords: string[];                 // 의미 일치로 채점. 문자열 포함 검사 아님
  modelAnswerKo: string;
  sampleFeedbackKo?: string;
  maxScore: number;
};

// GET /api/cards?type=concept|quiz|open|mcq&topic&source&difficulty&role&status&limit&offset
//   → { items: CardSummary[]; total: number; limit: number; offset: number }   (id 오름차순)
type CardSummary = {
  id: string; type: "concept" | "open" | "mcq"; topicId: string; sourceId: string;
  difficulty: "basic" | "intermediate" | "advanced"; roles: RoleId[]; status: ContentStatus;
  promptMd: string; hasFollowUps: boolean;
};

// GET /api/cards/{id}   (예전 QuestionView 의 상위 집합. rubric 은 서버에만 둔다)
type CardView = {
  id: string; topicId: string; sourceId: string; type: "concept" | "open" | "mcq";
  difficulty: "basic" | "intermediate" | "advanced"; roles: RoleId[]; status: ContentStatus;
  promptMd: string;                         // 본문 `## 문제` 구간
  explanationMd?: string;                   // concept 만. `## 해설` 이후 전부
  choices?: string[];                       // mcq 만. answerIndex 는 내보내지 않는다
  modelAnswerKo?: string;                   // open 만. UI 는 제출 전에는 화면에 보이지 않는다
  reviewTarget: { noteId?: string; segment?: { id: string; lectureId: string; videoId: string; startSec: number } };
  attribution: Attribution;                 // url: 노트 canonicalUrl → 강의 구간(watch?v=…&t=…s) → 출처 URL
  followUps?: [FollowUpItem, FollowUpItem, FollowUpItem]; // order 1→3. concept·quiz 모두 가능 (§3)
};

// POST /api/attempts  body: { questionId: string; answer: string | number }   (서버 미구현. 퀴즈 카드만)
type GradeResult = {
  questionId: string;
  score: number; maxScore: number;
  verdict: "pass" | "partial" | "fail";
  criteria: { id: string; desc: string; awarded: number; points: number; evidence: string }[];   // open 만
  deductions: { desc: string; points: number }[];
  feedbackKo: string;
  modelAnswerKo?: string;
  nextDue?: string;                         // ISO date, 로그인 시 FSRS 결과
};

// GET /api/review/queue?limit=20   (서버 미구현)
type ReviewQueue = { items: { questionId: string; due: string; topicId: string }[] };  // due: ISO date

// POST /api/review/:questionId  body: { rating: 1 | 2 | 3 | 4 }   (FSRS Again/Hard/Good/Easy)
type ReviewResult = { questionId: string; nextDue: string };

type SlideStudyUnit = {
  slideId: string;
  slideNumberLabel: string;                 // 예: "Slides 01–04"
  slideTitle: string;
  timestampSec: number;
  slideVisualBullets: string[];             // 슬라이드 요점을 한국어로 재구성. 원문 복사 금지
  explanationArticleMd: string;             // 해설 글 (NotebookLM 생성 가능)
  keyTakeawayKo: string;
  notebookLmPrompt: string;                 // NotebookLM 심화 질문 프롬프트
  generatedBy: "antigravity" | "notebooklm" | "human"; // 카드별 생성자 (frontmatter slideUnits[].generatedBy). UI 출처 표기와 교차 검수에 쓴다
};

type LectureSyllabus = {
  lectureNo: number;
  date: string;
  instructor: string;
  syllabusUrl: string;
  slidesTitle?: string;                     // 아래 셋은 실제 덱 PDF 가 있을 때만, 함께 있다
  slidesUrl?: string;                       // .pdf
  deckPageCount?: number;
  notebookLmUrl?: string;                   // 공유된 강의 전용 NotebookLM URL (…/notebook/<id>)
  readingLinks: { title: string; url: string }[];
};

// 생성 콘텐츠(summaryKo, slideRange, slideUnits, syllabus)는 draft 면 응답에서 빠진다 (§5). 화면에서 가리는 것이 아니다
type LectureSegmentView = {
  id: string; startSec: number; endSec: number; title: string; // title = YouTube 챕터 제목
  summaryKo?: string;                       // 구간 학습 가이드
  slideRange?: string;                      // 예: "Slides 1–11"
  slideUnits?: SlideStudyUnit[];            // 하나씩 넘기며 읽는 [슬라이드 + 해설 글] 카드
  questions: { id: string; type: "concept" | "open" | "mcq" }[]; // reviewTarget.segmentId 가 이 구간인 카드, id 오름차순
};

// GET /api/lectures/:id   (서버 미구현. 강의 전체 요약 summaryMd 없음)
type LectureView = {
  id: string; sourceId: string; course: string; term: string; title: string; videoId: string; durationSec: number;
  status: ContentStatus;
  generatedContentShown: boolean;           // false 면 위 생성 콘텐츠가 빠진 응답이다
  syllabus?: LectureSyllabus;               // IBM 등 강의계획서가 없는 재생목록, 또는 draft 면 없음
  segments: LectureSegmentView[];
  attribution: Attribution;                 // url = YouTube 영상
};
```

모의 면접(`MockInterview`, `MockReport`)은 범위에서 뺐다 (사용자 승인 2026-11-16).

에러 형식은 모든 엔드포인트 공통으로 `{ error: { code: string; message: string } }` + 4xx/5xx 다.

## 5. UI 불변식 (AG 가 지킨다)

- 외부 콘텐츠를 렌더링하는 모든 곳에 `Attribution` 배지(출처·라이선스·원본 링크)를 둔다. M4 DOM 검사 대상이다.
- NotebookLM이 만든 해설에는 "NotebookLM 생성" 표기를 붙인다 (`generatedBy`).
- `status: draft` 강의 파일의 생성 콘텐츠(`summaryKo`, `syllabus`, `slideUnits`)는 학습자 화면에 보이지 않는다. 영상과 YouTube 챕터 이동만 남긴다. 검수를 통과한 `reviewed` 이상만 노출한다 (사용자 결정 2026-11-16). 가리는 곳은 데이터 로더다: draft 면 필드 자체를 빼서 HTML·RSC payload·JS 번들에 싣지 않는다. 개발 미리보기는 서버 전용 플래그 `STUDY_SHOW_DRAFT=1` 로만 켠다.
- 강의 영상은 YouTube 임베드만 쓴다. 세그먼트를 클릭하면 `startSec` 로 이동한다.
- 375px·1440px 에서 가로 스크롤이 없어야 한다.
- 비로그인 사용자는 열람만 한다. 답안 제출·복습은 로그인 유도로 보낸다.
