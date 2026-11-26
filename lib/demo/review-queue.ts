import type { ReviewQueue } from "@/lib/content/types";

/**
 * 데모 세션 전용 복습 큐. FSRS·DB·인증이 없어서(API.md §5) 서버 응답 대신 쓴다.
 * id 는 실제 content/questions 의 카드다. due 는 CONTRACT §4 대로 ISO date.
 */
export const DEMO_REVIEW_QUEUE: ReviewQueue = {
  items: [
    { questionId: "cs329z-2026au-l01-q01", due: "2026-11-26", topicId: "ai-agents" },
    { questionId: "boost-algo-004", due: "2026-11-26", topicId: "algorithm" },
    { questionId: "cme295-2025au-l01-q01", due: "2026-11-26", topicId: "machine-learning" },
  ],
};
