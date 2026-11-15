# CONTRACT

Claude Code(CC)와 Antigravity(AG)가 병렬로 작업하기 위한 계약이다. 콘텐츠 형식의 정본은 `content/schema.json` 이고, 이 문서는 소유권·흐름·API 타입을 정한다. 계약을 바꾸려면 PR 하나로 이 두 파일을 함께 고치고, 상대 쪽 승인을 받는다.

## 1. 디렉터리 소유권

소유자만 쓴다. 다른 쪽은 읽기만 한다. 공용 파일은 계약 변경 PR 로만 고친다.

| 경로 | 소유 | 내용 |
|---|---|---|
| `pipeline/` | CC | Python + uv 수집 스크립트 (`ingest`) |
| `db/` | CC | Drizzle 스키마, 마이그레이션, `content/` → DB 동기화 |
| `lib/srs/`, `lib/grader/`, `lib/content/` | CC | FSRS, 채점, 콘텐츠 로더 |
| `app/api/` | CC | §4 의 route handler |
| `content/questions/`, `content/notes/` | CC | 면접 문항·개념 노트 생성 |
| `content/lectures/` | AG | 강의 세그먼트·요약 생성 |
| `app/` (단 `app/api/` 제외), `components/`, `app/_mock/` | AG | 화면, UI 컴포넌트, 목업 데이터 |
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
- **NotebookLM 산출물**(강의 `slideUnits` 해설 등)은 AG가 돌려서 `content/lectures/`에 넣되 `generation.by: notebooklm`으로 기록한다. NotebookLM은 Gemini 계열이므로 검수는 CC 또는 사람만 한다(스키마가 강제). 자막 12단어 연속 복사 검사는 frontmatter 전체에 적용된다. 슬라이드 문장 원문 복사는 기계로 못 잡으므로 검수 체크리스트로 본다.
- 검수자는 frontmatter 의 `review` 만 쓴다. 본문은 고치지 않고 `reasons` 에 적는다. 수정은 소유자가 한다.
- `fail` 이면 소유자가 고친 뒤 `review` 를 지우고 다시 요청한다.
- `published` 전환은 사람만 한다.
- 스키마(`reviewGate`)가 기계적으로 막는 것: 검수 없는 `reviewed/published`, `fail` 판정의 승격, 생성자 본인의 검수(`generation.by == review.by`). 스키마로 막을 수 없는 "published 는 사람이 바꿨는가"는 M2 CI 가 검사한다: `status: published` 로 바뀐 diff 를 포함한 PR 은 사람 승인 리뷰 없이는 병합할 수 없다.
- 라이선스는 닫힌 목록이다. `verbatim` 은 허용 목록(`verbatimLicense`)의 라이선스만 쓸 수 있다 (fail closed).
- 검수 체크리스트: 사실 오류 / `reviewTarget`·`segmentId` 가 실재하는가 / 타임스탬프가 영상 길이 안에 있는가 / 자막 원문이 섞였는가 / 슬라이드 문장이 그대로 옮겨졌는가 / `link_only` 소스 원문이 섞였는가 / 기존 문항과 중복되는가.
- `followUps`(꼬리질문)는 선택 항목이며, 넣을 때는 정확히 3개다. 기존 concept 카드에는 없다. 생성은 CC 문항 생성기가 한다.
- `syllabus`·`slideRange`·`slideUnits`는 선택 항목이다. 강의계획서·슬라이드가 없는 재생목록(IBM)은 생략한다.

## 3.1 ID·본문 규칙

- **강의 ID** `<sourceId>-l<NN>`, **구간 ID** `<lectureId>-s<NN>`. 둘 다 `pipeline/manifests/videos.json` 이 정본이다. AG 는 강의 파일을 만들 때 manifest 의 `lectureId` 와 `segments[].id/startSec/endSec` 를 그대로 쓴다.
  - 강의 번호는 제목의 `Lecture N` / `Part N` 을 따르고, 없으면 다음 빈 번호를 쓴다. **한 번 부여한 번호는 바꾸지 않는다** (`lectureIds` 맵에 고정). 재생목록 순서는 강의 순서가 아니다 (CS329Z 는 6강이 맨 앞이다).
  - YouTube 챕터가 있는 강의(54/62편)는 챕터 = 구간이다. 챕터가 없는 강의(CS329A 등)는 AG 가 구간을 나누고 `s01` 부터 번호를 매긴 뒤 manifest 반영 PR 을 CC 에 요청한다.
  - CC 는 아직 강의 파일이 없는 구간 ID 를 문항의 `reviewTarget.segmentId` 로 참조할 수 있다. `ingest check` 는 manifest 에 있으면 통과시키고 경고만 남긴다.
- **문항 본문**: `## 문제` 로 시작한다. `concept` 은 `## 해설` 이 필수다. `open` 의 모범답안은 `rubric.modelAnswerKo` 에 둔다.
- **원본 자막 위치**: `~/.cache/study-platform/raw/yt/<lectureId>.json` (전체 cue) 과 `<lectureId>.md` (챕터별 30초 단위 압축본, LLM 입력용). `ingest transcripts` 가 만든다. 두 worktree 가 같은 경로를 공유하며, 어떤 경우에도 repo 에 commit 하지 않는다. `STUDY_RAW_DIR` 로 경로를 바꿀 수 있다.
- **검증**: `cd pipeline && uv run ingest check`. 스키마, 참조 무결성(topic, source, note, segment), link_only 본문 길이, 구간 시각 범위를 검사한다. 0 errors 가 PR 조건이다.

## 4. 앱 API 타입 (AG 는 이 타입으로 목업을 만든다)

CC 가 `app/api/` 에 구현한다. 구현 전까지 AG 는 `app/_mock/` 에 같은 모양의 고정 데이터를 둔다.

```ts
type RoleId = "mle" | "rs" | "agent" | "ds";

type Attribution = { sourceId: string; license: string; reuse: "verbatim" | "summary_link" | "link_only"; attribution: string; url: string };

// GET /api/roles/:roleId/dashboard
type Dashboard = {
  role: { id: RoleId; name: string };
  dueCount: number;                         // 오늘 복습할 카드 수 (비로그인 0)
  topics: { id: string; name: string; weight: number; questionCount: number; masteredRatio: number }[];
  lectures: { id: string; course: string; title: string; durationSec: number }[];
};

type FollowUpItem = {
  id: string;                               // <questionId>-f<order>
  order: 1 | 2 | 3;
  promptMd: string;
  hintKo: string;
  rubricKeywords: string[];                 // 의미 일치로 채점. 문자열 포함 검사 아님
  modelAnswerKo: string;
  sampleFeedbackKo?: string;
  maxScore: number;
};

// GET /api/questions/:id
type QuestionView = {
  id: string; topicId: string; type: "concept" | "open" | "mcq"; difficulty: "basic" | "intermediate" | "advanced";
  promptMd: string; choices?: string[];
  reviewTarget: { noteId?: string; segment?: { lectureId: string; videoId: string; startSec: number } };
  attribution: Attribution;
  followUps?: [FollowUpItem, FollowUpItem, FollowUpItem]; // 본 문항 풀이 후 이어서 답할 꼬리질문. 없는 문항이 많다
};

// POST /api/attempts  body: { questionId: string; answer: string | number }
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

// GET /api/review/queue?limit=20
type ReviewQueue = { items: { questionId: string; due: string; topicId: string }[] };

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
  generatedBy: "antigravity" | "notebooklm" | "human"; // 강의 파일의 generation.by. UI 출처 표기용
};

type LectureSyllabus = {
  lectureNo: number;
  date: string;
  instructor: string;
  syllabusUrl: string;
  slidesTitle: string;
  slidesUrl: string;
  deckPageCount: number;
  notebookLmUrl?: string;                   // 공유된 강의 전용 NotebookLM URL
  readingLinks: { title: string; url: string }[];
};

type LectureSegmentView = {
  id: string; startSec: number; endSec: number; title: string;
  summaryKo: string;                        // 구간 학습 가이드
  slideRange?: string;                      // 예: "Slides 1–11"
  slideKeyPointsPlaceholder?: string[];
  slideUnits?: SlideStudyUnit[];            // 하나씩 넘기며 읽는 [슬라이드 + 해설 글] 카드
  questionIds: string[];
};

// GET /api/lectures/:id   (강의 전체 요약 summaryMd 없음. syllabus 슬라이드와 구간을 함께 공부)
type LectureView = {
  id: string; course: string; term: string; title: string; videoId: string; durationSec: number;
  syllabus?: LectureSyllabus;               // IBM 등 강의계획서가 없는 재생목록은 없음
  segments: LectureSegmentView[];
  attribution: Attribution;
};
```

모의 면접(`MockInterview`, `MockReport`)은 범위에서 뺐다 (사용자 승인 2026-11-16).

에러 형식은 모든 엔드포인트 공통으로 `{ error: { code: string; message: string } }` + 4xx/5xx 다.

## 5. UI 불변식 (AG 가 지킨다)

- 외부 콘텐츠를 렌더링하는 모든 곳에 `Attribution` 배지(출처·라이선스·원본 링크)를 둔다. M4 DOM 검사 대상이다.
- NotebookLM이 만든 해설에는 "NotebookLM 생성" 표기를 붙인다 (`generatedBy`).
- 강의 영상은 YouTube 임베드만 쓴다. 세그먼트를 클릭하면 `startSec` 로 이동한다.
- 375px·1440px 에서 가로 스크롤이 없어야 한다.
- 비로그인 사용자는 열람만 한다. 답안 제출·복습은 로그인 유도로 보낸다.
