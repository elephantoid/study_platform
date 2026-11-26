import { notFound } from "next/navigation";
import { QuestionSolveView } from "@/components/questions/question-solve-view";
import { getCard, listCards, topicName } from "@/lib/content/load";

// 없는 id 는 404 (API.md `404 CARD_NOT_FOUND`). 다른 문항으로 대신 보여 주지 않는다.
export const dynamicParams = false;

export function generateStaticParams() {
  return listCards().map((c) => ({ id: c.id }));
}

export default async function QuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = getCard(id);
  if (!card) notFound();
  return <QuestionSolveView key={card.id} card={card} topicName={topicName(card.topicId)} />;
}
