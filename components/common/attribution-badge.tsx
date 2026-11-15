import * as React from "react";
import type { Attribution } from "@/app/_mock/types";
import { Badge } from "@/components/ui/badge";

interface AttributionBadgeProps {
  attribution: Attribution;
  className?: string;
}

const REUSE_LABELS: Record<Attribution["reuse"], string> = {
  verbatim: "원문 수록 허용 (Verbatim)",
  summary_link: "요약 + 원본 링크 (Summary & Link)",
  link_only: "외부 링크 전용 (Link Only)",
};

/**
 * CONTRACT.md §5 UI 불변식:
 * 외부 콘텐츠를 렌더링하는 모든 곳에 Attribution 배지(출처·라이선스·원본 링크)를 둔다.
 * M4 DOM 검사 대상이므로 data-testid="attribution-badge" 를 고정 부여한다.
 */
export function AttributionBadge({ attribution, className = "" }: AttributionBadgeProps) {
  return (
    <div
      data-testid="attribution-badge"
      data-source-id={attribution.sourceId}
      data-license={attribution.license}
      data-reuse={attribution.reuse}
      className={`flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50/90 px-3 py-2 text-xs text-slate-600 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-1.5 min-w-0">
        <span className="font-semibold text-slate-800">출처:</span>
        <span className="break-words text-slate-700">{attribution.attribution}</span>
        <Badge variant="outline" className="text-[11px]">
          라이선스: {attribution.license}
        </Badge>
        <Badge variant="info" className="text-[11px]">
          {REUSE_LABELS[attribution.reuse]}
        </Badge>
      </div>
      <a
        href={attribution.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-800 hover:underline shrink-0"
      >
        <span>원본 링크 열기</span>
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
