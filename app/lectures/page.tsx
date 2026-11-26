import Link from "next/link";
import { listLectures } from "@/lib/content/load";
import { formatTimestamp } from "@/lib/format";
import { AttributionBadge } from "@/components/common/attribution-badge";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "강의 목록 — AI Tech Study Platform" };

export default function LecturesPage() {
  const lectures = listLectures();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">강의</h1>
      {lectures.map((l) => (
        <div key={l.id} className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">{l.course}</Badge>
            <Badge variant="outline">{l.term}</Badge>
            <Badge variant="info">재생시간 {formatTimestamp(l.durationSec)}</Badge>
            {l.status === "draft" && <Badge variant="warning">검수 대기 (draft)</Badge>}
          </div>
          <Link href={`/lectures/${l.id}`} className="block break-words text-base font-bold text-slate-900 hover:text-indigo-700 hover:underline">
            {l.title}
          </Link>
          <AttributionBadge attribution={l.attribution} />
        </div>
      ))}
    </div>
  );
}
