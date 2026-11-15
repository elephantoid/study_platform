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

- 기준 브랜치: `feat/initial-plan-cc`. main 병합 후에는 main.
- CC: `feat/pipeline-cc` (worktree `../study_platform-cc`)
- AG: `feat/ui-ag` (worktree `../study_platform-ag`). 작업 시작 전에 `feat/initial-plan-cc` 기준으로 브랜치를 다시 딴다.
- 병합은 사람이 한다. main 에 들어가는 PR 은 테스트가 GREEN 이어야 한다.

## 3. 콘텐츠 흐름과 교차 검수

```
생성(소유자) → status: draft → 상대 쪽 검수 → review.verdict 기록 → status: reviewed → 사람 PR 승인 → status: published
```

- 검수는 **생성한 쪽의 반대편**이 한다. CC 문항은 AG(Gemini)가, AG 강의 요약은 CC(Claude)가 본다.
- 검수자는 frontmatter 의 `review` 만 쓴다. 본문은 고치지 않고 `reasons` 에 적는다. 수정은 소유자가 한다.
- `fail` 이면 소유자가 고친 뒤 `review` 를 지우고 다시 요청한다.
- `published` 전환은 사람만 한다.
- 스키마(`reviewGate`)가 기계적으로 막는 것: 검수 없는 `reviewed/published`, `fail` 판정의 승격, 생성자 본인의 검수(`generation.by == review.by`). 스키마로 막을 수 없는 "published 는 사람이 바꿨는가"는 M2 CI 가 검사한다: `status: published` 로 바뀐 diff 를 포함한 PR 은 사람 승인 리뷰 없이는 병합할 수 없다.
- 라이선스는 닫힌 목록이다. `verbatim` 은 허용 목록(`verbatimLicense`)의 라이선스만 쓸 수 있다 (fail closed).
- 검수 체크리스트: 사실 오류 / `reviewTarget`·`segmentId` 가 실재하는가 / 타임스탬프가 영상 길이 안에 있는가 / 자막 원문이 섞였는가 / `link_only` 소스 원문이 섞였는가 / 기존 문항과 중복되는가.

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

// GET /api/questions/:id
type QuestionView = {
  id: string; topicId: string; type: "concept" | "open" | "mcq"; difficulty: "basic" | "intermediate" | "advanced";
  promptMd: string; choices?: string[];
  reviewTarget: { noteId?: string; segment?: { lectureId: string; videoId: string; startSec: number } };
  attribution: Attribution;
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

// GET /api/lectures/:id
type LectureView = {
  id: string; course: string; term: string; title: string; videoId: string; durationSec: number;
  summaryMd: string;
  segments: { id: string; startSec: number; endSec: number; title: string; summaryKo: string; questionIds: string[] }[];
  attribution: Attribution;
};

// POST /api/mock-interviews  body: { roleId: RoleId; size: number }
type MockInterview = { id: string; roleId: RoleId; questionIds: string[] };
// GET /api/mock-interviews/:id/report
type MockReport = { id: string; total: number; max: number; weakTopics: { topicId: string; ratio: number }[] };
```

에러 형식은 모든 엔드포인트 공통으로 `{ error: { code: string; message: string } }` + 4xx/5xx 다.

## 5. UI 불변식 (AG 가 지킨다)

- 외부 콘텐츠를 렌더링하는 모든 곳에 `Attribution` 배지(출처·라이선스·원본 링크)를 둔다. M4 DOM 검사 대상이다.
- 강의 영상은 YouTube 임베드만 쓴다. 세그먼트를 클릭하면 `startSec` 로 이동한다.
- 375px·1440px 에서 가로 스크롤이 없어야 한다.
- 비로그인 사용자는 열람만 한다. 답안 제출·복습은 로그인 유도로 보낸다.
