"use client";

import * as React from "react";
import type { FollowUpItem } from "@/lib/content/types";
import { Markdown } from "@/components/common/markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

/**
 * 꼬리질문 3개. 채점하지 않는다: rubricKeywords 는 "의미 일치" 기준이라(CONTRACT §4) 문자열 검사로 흉내 낼 수 없고,
 * 꼬리질문 채점 규칙도 아직 없다(API.md §4 TODO). 답을 적고 공개를 누르면 모범답안과 키워드를 보여 준다.
 * 키워드·모범답안은 공개 전에는 렌더링하지 않는다.
 */
export function FollowUpSelfCheck({ followUps, canAnswer }: { followUps: FollowUpItem[]; canAnswer: boolean }) {
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [revealed, setRevealed] = React.useState<Record<string, boolean>>({});
  const done = followUps.filter((f) => revealed[f.id]).length;

  return (
    <section
      data-testid="followup-questions-section"
      aria-labelledby="followup-heading"
      className="space-y-4 rounded-2xl border-2 border-indigo-200 bg-white p-5"
    >
      <div className="space-y-1 border-b border-slate-200 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="info">꼬리질문 {done} / {followUps.length}</Badge>
          <Badge variant="outline">자가 점검 · 채점 없음</Badge>
        </div>
        <h2 id="followup-heading" className="text-base font-bold text-slate-900">
          이어지는 꼬리질문
        </h2>
        <p className="text-xs text-slate-600">답을 적은 뒤 모범답안과 비교해 보세요. 점수는 매기지 않습니다.</p>
      </div>

      {followUps.map((fu) => {
        const answer = answers[fu.id] ?? "";
        const isRevealed = Boolean(revealed[fu.id]);
        return (
          <div key={fu.id} data-testid={`followup-card-${fu.order}`} className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <Badge variant="default">꼬리질문 {fu.order} / 3</Badge>
            <Markdown>{fu.promptMd}</Markdown>
            <p className="text-xs text-slate-600">💡 힌트: {fu.hintKo}</p>
            {canAnswer ? (
              <>
                <label htmlFor={`followup-input-${fu.order}`} className="sr-only">
                  꼬리질문 {fu.order} 답변
                </label>
                <Textarea
                  id={`followup-input-${fu.order}`}
                  value={answer}
                  maxLength={3000}
                  disabled={isRevealed}
                  onChange={(e) => setAnswers((p) => ({ ...p, [fu.id]: e.target.value }))}
                  placeholder={`꼬리질문 ${fu.order}번에 대한 답변을 작성하세요`}
                  rows={3}
                  data-testid={`followup-input-${fu.order}`}
                />
                {!isRevealed && (
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      disabled={!answer.trim()}
                      onClick={() => setRevealed((p) => ({ ...p, [fu.id]: true }))}
                      data-testid={`followup-submit-${fu.order}`}
                    >
                      답 확정하고 모범답안 보기
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-xs font-medium text-amber-800">🔒 로그인하면 꼬리질문에 답하고 모범답안과 비교할 수 있습니다.</p>
            )}

            {isRevealed && (
              <div data-testid={`followup-reveal-${fu.order}`} className="space-y-2 rounded-xl border border-emerald-200 bg-white p-3.5 text-xs">
                <p className="font-semibold text-slate-900">모범답안</p>
                <Markdown>{fu.modelAnswerKo}</Markdown>
                <div className="flex flex-wrap gap-1">
                  <span className="text-slate-600">답에 들어가야 할 내용:</span>
                  {fu.rubricKeywords.map((kw) => (
                    <Badge key={kw} variant="secondary" className="text-[11px]">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
