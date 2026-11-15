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

export { MOCK_REVIEW_QUEUE };
