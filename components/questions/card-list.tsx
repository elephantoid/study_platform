"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { Attribution, CardSummary } from "@/lib/content/types";
import { isQuizType } from "@/lib/content/types";
import { AttributionBadge } from "@/components/common/attribution-badge";
import { Badge } from "@/components/ui/badge";

type Kind = "all" | "concept" | "quiz";
const KINDS: { id: Kind; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "concept", label: "개념 카드" },
  { id: "quiz", label: "퀴즈 카드" },
];

const plain = (md: string) => md.replace(/[#*`$>_\[\]]/g, "").replace(/\s+/g, " ").trim();

/** 카드 목록. 개념/퀴즈 구분은 API.md `GET /api/cards?type=concept|quiz` 와 같다. 필터는 URL 쿼리에 둔다. */
export function CardList({
  cards,
  topics,
  sources,
}: {
  cards: CardSummary[];
  sources: Record<string, Attribution>;
  topics: { id: string; name: string; parentId?: string }[];
}) {
  const sp = useSearchParams();
  const router = useRouter();
  const kind = (["concept", "quiz"].includes(sp.get("type") ?? "") ? sp.get("type") : "all") as Kind;
  const topic = sp.get("topic") ?? "";
  const q = (sp.get("q") ?? "").trim().toLowerCase();
  const names = new Map(topics.map((t) => [t.id, t.name]));

  const shown = cards.filter(
    (c) =>
      (kind === "all" || (kind === "quiz") === isQuizType(c.type)) &&
      (!topic || c.topicId === topic) &&
      (!q || c.id.includes(q) || plain(c.promptMd).toLowerCase().includes(q))
  );

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(sp.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`/questions${next.size ? `?${next}` : ""}`);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">문항 목록</h1>
      <div className="flex flex-wrap items-center gap-2">
        <nav aria-label="카드 종류" className="flex gap-1.5">
          {KINDS.map((k) => (
            <button
              key={k.id}
              type="button"
              aria-pressed={kind === k.id}
              onClick={() => set("type", k.id === "all" ? "" : k.id)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                kind === k.id ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              {k.label}
            </button>
          ))}
        </nav>
        <label className="text-xs text-slate-600">
          토픽{" "}
          <select
            value={topic}
            onChange={(e) => set("topic", e.target.value)}
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs"
          >
            <option value="">전체</option>
            {topics
              .filter((t) => t.parentId)
              .map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
          </select>
        </label>
        {q && <Badge variant="outline">검색: {q}</Badge>}
        <span className="text-xs text-slate-500" data-testid="card-list-count">
          {shown.length}개
        </span>
      </div>
      <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {shown.map((c) => (
          <li key={c.id} className="flex flex-col gap-1.5 p-3 sm:flex-row sm:items-center sm:gap-3">
            <span className="flex shrink-0 flex-wrap gap-1">
              <Badge variant={isQuizType(c.type) ? "default" : "info"}>{isQuizType(c.type) ? "퀴즈" : "개념"}</Badge>
              {c.hasFollowUps && <Badge variant="secondary">꼬리질문 3</Badge>}
            </span>
            <Link href={`/questions/${c.id}`} className="min-w-0 flex-1 truncate text-sm text-slate-800 hover:text-indigo-700 hover:underline">
              {plain(c.promptMd)}
            </Link>
            <span className="shrink-0 text-[11px] text-slate-500">{names.get(c.topicId) ?? c.topicId}</span>
            {sources[c.sourceId] && <AttributionBadge attribution={sources[c.sourceId]} compact />}
          </li>
        ))}
      </ul>
    </div>
  );
}
