import { Suspense } from "react";
import { connection } from "next/server";
import { CardList } from "@/components/questions/card-list";
import { sourceAttributions } from "@/lib/content/load";
import { listCards, listTopics } from "@/lib/content/source";

export const metadata = { title: "문항 목록 — AI Tech Study Platform" };

export default async function QuestionsPage() {
  // 카드는 요청 때 읽는다: STUDY_API_URL 이 있으면 Rust API, 없으면 content/ (lib/content/source.ts).
  await connection();
  const [cards, allTopics] = await Promise.all([listCards(), listTopics()]);
  const topics = allTopics.map((t) => ({ id: t.id, name: t.name, parentId: t.parentId }));
  return (
    <Suspense fallback={<p className="text-sm text-slate-500">문항 목록을 불러오는 중…</p>}>
      <CardList cards={cards} topics={topics} sources={sourceAttributions()} />
    </Suspense>
  );
}
