/**
 * UI 가 쓰는 콘텐츠 타입.
 * 정본: docs/CONTRACT.md §4 와 PR #7 docs/API.md (`GET /api/cards/{id}` 는 QuestionView 의 상위 집합).
 * 파일 로더(lib/content/load.ts)와 Rust API 클라이언트(lib/content/api.ts)가 같은 모양을 만들고, lib/content/source.ts 가 STUDY_API_URL 로 둘 중 하나를 고른다.
 */

export type RoleId = "mle" | "rs" | "agent" | "ds";
export const ROLE_IDS: RoleId[] = ["agent", "mle", "rs", "ds"];

export type ContentStatus = "draft" | "reviewed" | "published";
export type Reuse = "verbatim" | "summary_link" | "link_only";

export type Attribution = {
  sourceId: string;
  license: string;
  reuse: Reuse;
  attribution: string;
  url: string;
};

/** 개념 카드(concept)와 퀴즈 카드(open·mcq)의 구분. API.md `type=quiz` 와 같다. */
export type CardType = "concept" | "open" | "mcq";
export type QuizType = Exclude<CardType, "concept">;
export const isQuizType = (t: CardType): t is QuizType => t !== "concept";

export type Difficulty = "basic" | "intermediate" | "advanced";

export type FollowUpItem = {
  id: string; // <cardId>-f<order>
  order: 1 | 2 | 3;
  promptMd: string;
  hintKo: string;
  rubricKeywords: string[]; // 의미 일치로 채점. 문자열 포함 검사 아님 → UI 는 채점하지 않는다
  modelAnswerKo: string;
  sampleFeedbackKo?: string;
  maxScore: number;
};

export type SegmentRef = { id: string; lectureId: string; videoId: string; startSec: number };

/** GET /api/cards/{id} (API.md §2) */
export type CardView = {
  id: string;
  topicId: string;
  sourceId: string;
  type: CardType;
  difficulty: Difficulty;
  roles: RoleId[];
  status: ContentStatus;
  promptMd: string;
  explanationMd?: string; // concept
  choices?: string[]; // mcq. answerIndex 는 서버에만 있다
  modelAnswerKo?: string; // open. UI 는 풀이 전에는 숨긴다
  reviewTarget: { noteId?: string; segment?: SegmentRef };
  attribution: Attribution;
  followUps?: [FollowUpItem, FollowUpItem, FollowUpItem];
};

/** GET /api/cards 목록 항목 */
export type CardSummary = Pick<
  CardView,
  "id" | "type" | "topicId" | "sourceId" | "difficulty" | "roles" | "status" | "promptMd"
> & { hasFollowUps: boolean };

/** GET /api/topics 항목 */
export type Topic = {
  id: string;
  name: string;
  parentId?: string;
  roles: Partial<Record<RoleId, number>>; // 1–3 정수 (3 = 핵심)
  cardCounts: { concept: number; quiz: number };
};

/**
 * GET /api/roles/:roleId/dashboard.
 * CONTRACT §4 Dashboard 와 같다 (출처 배지는 lectures[].attribution, topics[].sources 로 그린다).
 */
export type Dashboard = {
  role: { id: RoleId; name: string };
  dueCount: number; // 사용자 상태가 없으면 0
  topics: {
    id: string;
    name: string;
    weight: number; // topics.yaml roles 값 1–3
    cardCounts: { concept: number; quiz: number };
    sources: Attribution[];
  }[];
  lectures: {
    id: string;
    course: string;
    term: string;
    title: string;
    durationSec: number;
    status: ContentStatus;
    attribution: Attribution;
  }[];
};

export type SlideStudyUnit = {
  slideId: string;
  slideNumberLabel: string;
  slideTitle: string;
  timestampSec: number;
  slideVisualBullets: string[];
  explanationArticleMd: string;
  keyTakeawayKo: string;
  notebookLmPrompt: string;
  generatedBy: "antigravity" | "notebooklm" | "human";
};

export type LectureSyllabus = {
  lectureNo: number;
  date: string;
  instructor: string;
  syllabusUrl: string;
  slidesTitle?: string;
  slidesUrl?: string;
  deckPageCount?: number;
  notebookLmUrl?: string;
  readingLinks: { title: string; url: string }[];
};

export type LectureSegmentView = {
  id: string;
  startSec: number;
  endSec: number;
  title: string; // YouTube 챕터 제목
  summaryKo?: string; // 생성 콘텐츠: draft 면 서버가 뺀다
  slideRange?: string; // 생성 콘텐츠
  slideUnits?: SlideStudyUnit[]; // 생성 콘텐츠
  questions: { id: string; type: CardType }[]; // content/questions 의 reviewTarget.segmentId 에서 역으로 만든다
};

/** GET /api/lectures/:id. draft 면 생성 콘텐츠(summaryKo, syllabus, slideUnits)가 빠진 채로 온다. */
export type LectureView = {
  id: string;
  sourceId: string;
  course: string;
  term: string;
  title: string;
  videoId: string;
  durationSec: number;
  status: ContentStatus;
  generatedContentShown: boolean;
  syllabus?: LectureSyllabus;
  segments: LectureSegmentView[];
  attribution: Attribution;
};

export type LectureSummary = Pick<
  LectureView,
  "id" | "course" | "term" | "title" | "durationSec" | "status" | "attribution"
>;

/** GET /api/review/queue */
export type ReviewQueue = { items: { questionId: string; due: string; topicId: string }[] }; // due: ISO date

export type FsrsRating = 1 | 2 | 3 | 4;
