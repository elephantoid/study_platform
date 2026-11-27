import { connection } from "next/server";
import { ReviewQueueView, type ReviewItem } from "@/components/review/review-queue-view";
import { getCard, topicName } from "@/lib/content/source";
import { DEMO_REVIEW_QUEUE } from "@/lib/demo/review-queue";

export const metadata = { title: "복습 큐 — AI Tech Study Platform" };

export default async function ReviewPage() {
  await connection();
  // 복습 큐는 로그인 사용자 상태다. 비로그인은 빈 큐로 시작한다 (클라이언트가 세션으로 고른다).
  const demoItems: ReviewItem[] = (
    await Promise.all(
      DEMO_REVIEW_QUEUE.items.map(async (i) => {
        const card = await getCard(i.questionId);
        return card ? [{ due: i.due, topicName: await topicName(card.topicId), card }] : [];
      })
    )
  ).flat();
  return <ReviewQueueView demoItems={demoItems} />;
}
