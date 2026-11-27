import { notFound } from "next/navigation";
import { connection } from "next/server";
import { QuestionSolveView } from "@/components/questions/question-solve-view";
import { getCard, topicName } from "@/lib/content/source";

export default async function QuestionPage({ params }: { params: Promise<{ id: string }> }) {
  // 요청 때 읽는다 (lib/content/source.ts). 빌드에는 API 서버가 필요 없다.
  await connection();
  const { id } = await params;
  const card = await getCard(id);
  // 없는 id 는 404 (API.md `404 CARD_NOT_FOUND`). 다른 문항으로 대신 보여 주지 않는다.
  if (!card) notFound();
  return <QuestionSolveView key={card.id} card={card} topicName={await topicName(card.topicId)} />;
}
