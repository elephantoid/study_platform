import type { ReviewQueue, ReviewResult } from "./types";

export const MOCK_REVIEW_QUEUE: ReviewQueue = {
  items: [
    {
      questionId: "q-agent-react-open",
      due: "2026-11-15",
      topicId: "agent-architecture",
    },
    {
      questionId: "q-mle-bias-variance-concept",
      due: "2026-11-15",
      topicId: "ml-fundamentals",
    },
    {
      questionId: "q-rs-attention-mcq",
      due: "2026-11-15",
      topicId: "transformer-llm",
    },
  ],
};

export const MOCK_FSRS_RESULTS: Record<1 | 2 | 3 | 4, (questionId: string) => ReviewResult> = {
  1: (questionId) => ({ questionId, nextDue: "2026-11-16 (내일 재복습 · Again)" }),
  2: (questionId) => ({ questionId, nextDue: "2026-11-17 (2일 후 · Hard)" }),
  3: (questionId) => ({ questionId, nextDue: "2026-11-20 (5일 후 · Good)" }),
  4: (questionId) => ({ questionId, nextDue: "2026-11-27 (12일 후 · Easy)" }),
};
