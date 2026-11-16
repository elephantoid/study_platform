/**
 * 정본: docs/CONTRACT.md §4 앱 API 타입 (v2)
 */

export type RoleId = "mle" | "rs" | "agent" | "ds";

export type Attribution = {
  sourceId: string;
  license: string;
  reuse: "verbatim" | "summary_link" | "link_only";
  attribution: string;
  url: string;
};

// GET /api/roles/:roleId/dashboard
export type Dashboard = {
  role: { id: RoleId; name: string };
  dueCount: number; // 오늘 복습할 카드 수 (비로그인 0)
  topics: {
    id: string;
    name: string;
    weight: number;
    questionCount: number;
    masteredRatio: number;
  }[];
  lectures: {
    id: string;
    course: string;
    title: string;
    durationSec: number;
  }[];
};

export type FollowUpItem = {
  id: string; // <questionId>-f<order>
  order: 1 | 2 | 3;
  promptMd: string;
  hintKo: string;
  rubricKeywords: string[]; // 의미 일치로 채점. 문자열 포함 검사 아님
  modelAnswerKo: string;
  sampleFeedbackKo?: string;
  maxScore: number;
};

// GET /api/questions/:id
export type QuestionView = {
  id: string;
  topicId: string;
  type: "concept" | "open" | "mcq";
  difficulty: "basic" | "intermediate" | "advanced";
  promptMd: string;
  choices?: string[];
  reviewTarget: {
    noteId?: string;
    segment?: { lectureId: string; videoId: string; startSec: number };
  };
  attribution: Attribution;
  followUps?: [FollowUpItem, FollowUpItem, FollowUpItem]; // 본 문항 풀이 후 이어서 답할 꼬리질문. 없는 문항이 많다
};

// POST /api/attempts  body: { questionId: string; answer: string | number }
export type GradeResult = {
  questionId: string;
  score: number;
  maxScore: number;
  verdict: "pass" | "partial" | "fail";
  criteria: {
    id: string;
    desc: string;
    awarded: number;
    points: number;
    evidence: string;
  }[]; // open 만
  deductions: { desc: string; points: number }[];
  feedbackKo: string;
  modelAnswerKo?: string;
  nextDue?: string; // ISO date, 로그인 시 FSRS 결과
};

// GET /api/review/queue?limit=20
export type ReviewQueue = {
  items: { questionId: string; due: string; topicId: string }[];
};

// POST /api/review/:questionId  body: { rating: 1 | 2 | 3 | 4 }   (FSRS Again/Hard/Good/Easy)
export type ReviewResult = { questionId: string; nextDue: string };

export type SlideStudyUnit = {
  slideId: string;
  slideNumberLabel: string; // 예: "Slides 01–04"
  slideTitle: string;
  timestampSec: number;
  slideVisualBullets: string[]; // 슬라이드 요점을 한국어로 재구성. 원문 복사 금지
  explanationArticleMd: string; // 해설 글 (NotebookLM 생성 가능)
  keyTakeawayKo: string;
  notebookLmPrompt: string; // NotebookLM 심화 질문 프롬프트
  generatedBy: "antigravity" | "notebooklm" | "human"; // 카드별 생성자 (frontmatter slideUnits[].generatedBy). UI 출처 표기와 교차 검수에 쓴다
};

export type LectureSyllabus = {
  lectureNo: number;
  date: string;
  instructor: string;
  syllabusUrl: string;
  slidesTitle: string;
  slidesUrl: string;
  deckPageCount: number;
  notebookLmUrl?: string; // 공유된 강의 전용 NotebookLM URL
  readingLinks: { title: string; url: string }[];
};

export type LectureSegmentView = {
  id: string;
  startSec: number;
  endSec: number;
  title: string;
  summaryKo: string; // 구간 학습 가이드
  slideRange?: string; // 예: "Slides 1–11"
  slideKeyPointsPlaceholder?: string[];
  slideUnits?: SlideStudyUnit[]; // 하나씩 넘기며 읽는 [슬라이드 + 해설 글] 카드
  questionIds: string[];
};

// GET /api/lectures/:id   (강의 전체 요약 summaryMd 없음. syllabus 슬라이드와 구간을 함께 공부)
export type LectureView = {
  id: string;
  course: string;
  term: string;
  title: string;
  videoId: string;
  durationSec: number;
  syllabus?: LectureSyllabus; // IBM 등 강의계획서가 없는 재생목록은 없음
  segments: LectureSegmentView[];
  attribution: Attribution;
};
