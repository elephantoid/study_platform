"use client";

import * as React from "react";
import type { CardView, FsrsRating } from "@/lib/content/types";
import { Markdown } from "@/components/common/markdown";
import { AuthGateBanner } from "@/components/common/auth-gate-banner";
import { useDemoSession } from "@/components/layout/demo-session";
import { Button } from "@/components/ui/button";
import { FollowUpSelfCheck } from "./follow-up-self-check";
import { SelfRating } from "./self-rating";

/**
 * 개념 카드(type: concept). 채점하지 않는다: 먼저 떠올리고 → 해설(explanationMd)을 펼치고 → FSRS 자가 평가.
 * 꼬리질문은 해설을 펼친 뒤 자가 점검으로만 연다 (C3 결정: 채점 없음, 계약 문구 정리는 CC 계약 PR).
 */
export function ConceptCardBody({ card }: { card: CardView }) {
  const { isLoggedIn } = useDemoSession();
  const [shown, setShown] = React.useState(false);
  const [rating, setRating] = React.useState<FsrsRating | null>(null);

  return (
    <>
      <div className="space-y-3" data-testid="concept-card-body">
        {!shown ? (
          <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold text-slate-600">💡 해설을 펼치기 전에 답을 먼저 떠올려 보세요.</p>
            <Button type="button" variant="primary" size="sm" onClick={() => setShown(true)} data-testid="reveal-explanation-btn">
              해설 펼치기
            </Button>
          </div>
        ) : (
          <div data-testid="concept-explanation" className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
            {card.explanationMd ? (
              <Markdown>{card.explanationMd}</Markdown>
            ) : (
              <p className="text-xs text-slate-500">해설이 없습니다.</p>
            )}
            {isLoggedIn ? (
              <SelfRating value={rating} onRate={setRating} />
            ) : (
              <AuthGateBanner actionLabel="FSRS 복습 기록" />
            )}
          </div>
        )}
      </div>
      {shown && card.followUps && <FollowUpSelfCheck followUps={card.followUps} canAnswer={isLoggedIn} />}
    </>
  );
}
