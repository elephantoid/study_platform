import type { Dashboard, RoleId } from "./types";

export const TOPIC_NAMES: Record<string, string> = {
  "agent-architecture": "에이전트 루프 & 도구 호출 (ReAct / Tool Use)",
  "agent-eval-safety": "에이전트 평가 · 가드레일 · 메모리",
  "transformer-llm": "Transformer 아키텍처 & 추론 최적화",
  "ml-fundamentals": "머신러닝 기초 · 정규화 · 편향-분산",
  "dl-optimization": "딥러닝 학습 안정성 · 옵티마이저 · 정규화",
  "stats-experiment": "가설 검정 · A/B 테스트 · 인과 추론",
  "linear-algebra": "선형대수 · 고유값 분해 · SVD",
  "cs-systems": "운영체제 · 네트워크 · 분산 시스템 기초",
};

export const MOCK_DASHBOARDS: Record<RoleId, Dashboard> = {
  agent: {
    role: { id: "agent", name: "Agent Engineer" },
    dueCount: 3,
    topics: [
      {
        id: "agent-architecture",
        name: TOPIC_NAMES["agent-architecture"],
        weight: 40,
        questionCount: 18,
        masteredRatio: 0.72,
      },
      {
        id: "agent-eval-safety",
        name: TOPIC_NAMES["agent-eval-safety"],
        weight: 30,
        questionCount: 14,
        masteredRatio: 0.5,
      },
      {
        id: "transformer-llm",
        name: TOPIC_NAMES["transformer-llm"],
        weight: 20,
        questionCount: 22,
        masteredRatio: 0.64,
      },
      {
        id: "cs-systems",
        name: TOPIC_NAMES["cs-systems"],
        weight: 10,
        questionCount: 15,
        masteredRatio: 0.8,
      },
    ],
    lectures: [
      {
        id: "cs329z-lec01",
        course: "CS329Z",
        title: "Lecture 1: Introduction to Engineering AI Agents (Diyi Yang)",
        durationSec: 4176,
      },
    ],
  },
  mle: {
    role: { id: "mle", name: "ML Engineer" },
    dueCount: 3,
    topics: [
      {
        id: "transformer-llm",
        name: TOPIC_NAMES["transformer-llm"],
        weight: 35,
        questionCount: 22,
        masteredRatio: 0.68,
      },
      {
        id: "dl-optimization",
        name: TOPIC_NAMES["dl-optimization"],
        weight: 30,
        questionCount: 25,
        masteredRatio: 0.76,
      },
      {
        id: "ml-fundamentals",
        name: TOPIC_NAMES["ml-fundamentals"],
        weight: 20,
        questionCount: 30,
        masteredRatio: 0.83,
      },
      {
        id: "cs-systems",
        name: TOPIC_NAMES["cs-systems"],
        weight: 15,
        questionCount: 15,
        masteredRatio: 0.6,
      },
    ],
    lectures: [
      {
        id: "cs329z-lec01",
        course: "CS329Z",
        title: "Lecture 1: Introduction to Engineering AI Agents (Diyi Yang)",
        durationSec: 4176,
      },
    ],
  },
  rs: {
    role: { id: "rs", name: "Research Scientist" },
    dueCount: 3,
    topics: [
      {
        id: "transformer-llm",
        name: TOPIC_NAMES["transformer-llm"],
        weight: 40,
        questionCount: 22,
        masteredRatio: 0.77,
      },
      {
        id: "dl-optimization",
        name: TOPIC_NAMES["dl-optimization"],
        weight: 30,
        questionCount: 25,
        masteredRatio: 0.65,
      },
      {
        id: "linear-algebra",
        name: TOPIC_NAMES["linear-algebra"],
        weight: 20,
        questionCount: 16,
        masteredRatio: 0.88,
      },
      {
        id: "agent-architecture",
        name: TOPIC_NAMES["agent-architecture"],
        weight: 10,
        questionCount: 18,
        masteredRatio: 0.55,
      },
    ],
    lectures: [
      {
        id: "cs329z-lec01",
        course: "CS329Z",
        title: "Lecture 1: Introduction to Engineering AI Agents (Diyi Yang)",
        durationSec: 4176,
      },
    ],
  },
  ds: {
    role: { id: "ds", name: "Data Scientist" },
    dueCount: 3,
    topics: [
      {
        id: "stats-experiment",
        name: TOPIC_NAMES["stats-experiment"],
        weight: 40,
        questionCount: 24,
        masteredRatio: 0.79,
      },
      {
        id: "ml-fundamentals",
        name: TOPIC_NAMES["ml-fundamentals"],
        weight: 35,
        questionCount: 30,
        masteredRatio: 0.7,
      },
      {
        id: "linear-algebra",
        name: TOPIC_NAMES["linear-algebra"],
        weight: 15,
        questionCount: 16,
        masteredRatio: 0.62,
      },
      {
        id: "transformer-llm",
        name: TOPIC_NAMES["transformer-llm"],
        weight: 10,
        questionCount: 22,
        masteredRatio: 0.45,
      },
    ],
    lectures: [
      {
        id: "cs329z-lec01",
        course: "CS329Z",
        title: "Lecture 1: Introduction to Engineering AI Agents (Diyi Yang)",
        durationSec: 4176,
      },
    ],
  },
};
