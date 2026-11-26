import { ReviewQueueView, type ReviewItem } from "@/components/review/review-queue-view";
import { getCard, topicName } from "@/lib/content/load";
import { DEMO_REVIEW_QUEUE } from "@/lib/demo/review-queue";

export const metadata = { title: "복습 큐 — AI Tech Study Platform" };

export default function ReviewPage() {
  // 복습 큐는 로그인 사용자 상태다. 비로그인은 빈 큐로 시작한다 (클라이언트가 세션으로 고른다).
  const demoItems: ReviewItem[] = DEMO_REVIEW_QUEUE.items.flatMap((i) => {
    const card = getCard(i.questionId);
    return card ? [{ due: i.due, topicName: topicName(card.topicId), card }] : [];
  });
  return <ReviewQueueView demoItems={demoItems} />;
}
