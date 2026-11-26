import { Suspense } from "react";
import { CardList } from "@/components/questions/card-list";
import { listCards, listTopics } from "@/lib/content/load";

export const metadata = { title: "문항 목록 — AI Tech Study Platform" };

export default function QuestionsPage() {
  const topics = listTopics().map((t) => ({ id: t.id, name: t.name, parentId: t.parentId }));
  return (
    <Suspense fallback={<p className="text-sm text-slate-500">문항 목록을 불러오는 중…</p>}>
      <CardList cards={listCards()} topics={topics} />
    </Suspense>
  );
}
