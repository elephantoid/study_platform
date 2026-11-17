export * from "./types";
export * from "./sources";
export * from "./dashboards";
export * from "./questions";
export * from "./review";
export * from "./lectures";

import { MOCK_DASHBOARDS, TOPIC_NAMES } from "./dashboards";
import { MOCK_LECTURES } from "./lectures";
import { MOCK_GRADE_RESULTS, MOCK_QUESTIONS } from "./questions";
import { MOCK_REVIEW_QUEUE } from "./review";
import type { Dashboard, GradeResult, LectureView, QuestionView, RoleId } from "./types";

export function getDashboardMock(roleId: string): Dashboard {
  const normalized = (roleId in MOCK_DASHBOARDS ? roleId : "agent") as RoleId;
  return MOCK_DASHBOARDS[normalized];
}

export function getQuestionMock(questionId: string): QuestionView {
  return MOCK_QUESTIONS[questionId] ?? MOCK_QUESTIONS["q-agent-react-open"];
}

export function getGradeResultMock(questionId: string): GradeResult {
  return MOCK_GRADE_RESULTS[questionId] ?? MOCK_GRADE_RESULTS["q-agent-react-open"];
}

export function getLectureMock(lectureId: string): LectureView {
  return MOCK_LECTURES[lectureId] ?? MOCK_LECTURES["cs329z-lec01"];
}

export function getTopicName(topicId: string): string {
  return TOPIC_NAMES[topicId] ?? topicId;
}

export function formatSecondsToTimestamp(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/**
 * CONTRACT §5:
 * status: draft 강의 파일의 생성 콘텐츠(summaryKo, syllabus, slideUnits)는 학습자 화면에 보이지 않는다.
 * 영상과 YouTube 챕터 이동만 남긴다. 검수를 통과한 reviewed 이상만 노출한다.
 * 개발 미리보기는 명시적 플래그(NEXT_PUBLIC_SHOW_DRAFT=1)로만 켠다.
 */
export function canShowLectureGeneratedContent(
  lecture?: Pick<LectureView, "status"> | null
): boolean {
  if (!lecture) return false;
  const status = lecture.status ?? "draft";
  if (status === "reviewed" || status === "published") return true;
  return process.env.NEXT_PUBLIC_SHOW_DRAFT === "1";
}

export { MOCK_REVIEW_QUEUE };
