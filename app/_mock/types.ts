/**
 * 정본: docs/CONTRACT.md §4 앱 API 타입
 * + 사용자 승인 피드백 반영 확장(Syllabus/Slides 학습 및 3단계 꼬리질문)
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

// 꼬리질문 3개 (Follow-up 1 -> 2 -> 3) 타입 (계약 변경 제안 반영)
export type FollowUpItem = {
  id: string;
  order: 1 | 2 | 3;
  promptMd: string;
  hintKo: string;
  rubricKeywords: string[];
  modelAnswerKo: string;
  sampleFeedbackKo: string;
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
  // 확장: 문항 풀이 후 이어서 답변할 3개의 꼬리질문
  followUps: [FollowUpItem, FollowUpItem, FollowUpItem];
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

// Syllabus 및 Slides 동시 학습 메타데이터 (계약 변경 제안 반영: 전체 요약 summaryMd 제거 -> Syllabus Slides 연동)
export type LectureSyllabus = {
  lectureNo: number;
  date: string;
  instructor: string;
  syllabusUrl: string;
  slidesTitle: string;
  slidesUrl: string;
  deckPageCount: number;
  readingLinks: { title: string; url: string }[];
};

export type LectureSegmentView = {
  id: string;
  startSec: number;
  endSec: number;
  title: string;
  summaryKo: string; // 세그먼트 자리표시자 (전체 요약 금지, 슬라이드 학습 포인트 안내)
  slideRange: string; // 예: "Slides 1–14"
  slideKeyPointsPlaceholder: string[]; // 슬라이드와 함께 볼 체크포인트 자리표시자
  questionIds: string[];
};

// GET /api/lectures/:id
export type LectureView = {
  id: string;
  course: string;
  term: string;
  title: string;
  videoId: string;
  durationSec: number;
  syllabus: LectureSyllabus;
  segments: LectureSegmentView[];
  attribution: Attribution;
};

// POST /api/mock-interviews  body: { roleId: RoleId; size: number }
export type MockInterview = {
  id: string;
  roleId: RoleId;
  questionIds: string[];
};

// GET /api/mock-interviews/:id/report
export type MockReport = {
  id: string;
  total: number;
  max: number;
  weakTopics: { topicId: string; ratio: number }[];
};
