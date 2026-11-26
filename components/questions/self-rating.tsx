"use client";

import * as React from "react";
import type { FsrsRating } from "@/lib/content/types";
import { Button } from "@/components/ui/button";

const RATINGS: { rating: FsrsRating; label: string; variant: "danger" | "outline" | "secondary" | "primary" }[] = [
  { rating: 1, label: "1 · Again (다시)", variant: "danger" },
  { rating: 2, label: "2 · Hard (어려움)", variant: "outline" },
  { rating: 3, label: "3 · Good (알맞음)", variant: "secondary" },
  { rating: 4, label: "4 · Easy (쉬움)", variant: "primary" },
];

/**
 * FSRS 자가 평점 1–4 (POST /api/review/:questionId 의 body).
 * 다음 복습일은 FSRS 상태(stability·difficulty)로 서버가 계산한다. 그 API 가 없어 간격을 지어내지 않는다.
 */
export function SelfRating({
  disabled = false,
  value,
  onRate,
}: {
  disabled?: boolean;
  value: FsrsRating | null;
  onRate: (r: FsrsRating) => void;
}) {
  return (
    <div className="space-y-2" data-testid="fsrs-self-rating">
      <p className="text-xs font-semibold text-slate-700">얼마나 잘 떠올렸나요? (FSRS 자가 평가)</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {RATINGS.map((r) => (
          <Button
            key={r.rating}
            type="button"
            variant={r.variant}
            size="sm"
            disabled={disabled}
            aria-pressed={value === r.rating}
            onClick={() => onRate(r.rating)}
            data-testid={`fsrs-rate-${r.rating}`}
          >
            {r.label}
          </Button>
        ))}
      </div>
      {value !== null && (
        <p data-testid="fsrs-rating-recorded" className="text-xs text-emerald-800">
          ✓ {RATINGS[value - 1].label} 로 기록했습니다. 복습 API(FSRS)가 연결되면 다음 복습일이 저장됩니다. 지금은 저장되지
          않습니다.
        </p>
      )}
    </div>
  );
}
