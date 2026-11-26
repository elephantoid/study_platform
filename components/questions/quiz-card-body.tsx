"use client";

import * as React from "react";
import Link from "next/link";
import type { CardView, FsrsRating } from "@/lib/content/types";
import { formatTimestamp } from "@/lib/format";
import { Markdown } from "@/components/common/markdown";
import { AuthGateBanner } from "@/components/common/auth-gate-banner";
import { useDemoSession } from "@/components/layout/demo-session";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FollowUpSelfCheck } from "./follow-up-self-check";
import { SelfRating } from "./self-rating";

const MAX_ANSWER = 3000; // API.md §4 POST /api/attempts: 답안 1~3000자

/**
 * 퀴즈 카드(type: open | mcq). 답을 낸 뒤에만 결과 영역과 꼬리질문을 연다.
 * 채점은 POST /api/attempts 가 맡는데 아직 없다(API.md §4). 클라이언트에서 점수를 지어내지 않는다.
 * - draft 문항: GRADER R2 대로 AI 채점 대신 모범답안만 보여 준다.
 * - mcq: answerIndex 는 서버에만 있어(API.md) 정답 판정을 보여 줄 수 없다.
 */
export function QuizCardBody({ card }: { card: CardView }) {
  const { isLoggedIn } = useDemoSession();
  const [answer, setAnswer] = React.useState("");
  const [choice, setChoice] = React.useState<number | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [rating, setRating] = React.useState<FsrsRating | null>(null);
  const canSubmit = card.type === "open" ? answer.trim().length > 0 : choice !== null;

  if (!isLoggedIn) return <AuthGateBanner actionLabel="답안 제출과 꼬리질문 답변" />;

  return (
    <>
      <div className="space-y-3" data-testid="quiz-card-body">
        {card.type === "open" ? (
          <>
            <label htmlFor="main-open-answer" className="block text-xs font-semibold text-slate-700">
              나의 답변
            </label>
            <Textarea
              id="main-open-answer"
              value={answer}
              maxLength={MAX_ANSWER}
              disabled={submitted}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="핵심 원리, 장단점, 실패 모드를 구조화해 작성하세요"
              rows={5}
            />
            <p className="text-right text-[11px] text-slate-500">
              {answer.length} / {MAX_ANSWER}
            </p>
          </>
        ) : (
          <fieldset className="space-y-2" disabled={submitted}>
            <legend className="text-xs font-semibold text-slate-700">가장 적절한 보기를 고르세요</legend>
            {(card.choices ?? []).map((c, i) => (
              <label
                key={i}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm ${
                  choice === i ? "border-indigo-600 bg-indigo-50/70" : "border-slate-200 bg-white"
                }`}
              >
                <input type="radio" name="mcq" checked={choice === i} onChange={() => setChoice(i)} className="mt-1" />
                <span className="break-words">{c}</span>
              </label>
            ))}
          </fieldset>
        )}

        {!submitted && (
          <div className="flex justify-end">
            <Button
              type="button"
              variant="primary"
              size="sm"
              disabled={!canSubmit}
              onClick={() => setSubmitted(true)}
              data-testid="submit-main-answer-btn"
            >
              답안 제출
            </Button>
          </div>
        )}

        {submitted && (
          <div data-testid="answer-result-panel" className="space-y-4 rounded-xl border border-indigo-200 bg-indigo-50/40 p-4">
            <p data-testid="grading-pending" className="text-xs font-semibold text-indigo-950">
              {card.status === "draft"
                ? "검수 전(draft) 문항이라 AI 채점 대신 모범답안을 보여 줍니다 (GRADER R2). 점수는 매기지 않습니다."
                : "채점 준비 중입니다. 채점 API 가 연결되면 항목별 점수와 근거가 여기에 표시됩니다."}
            </p>
            {card.type === "mcq" && (
              <p className="text-xs text-slate-700">객관식 정답은 서버만 알고 있어 채점 API 연결 전에는 판정할 수 없습니다.</p>
            )}
            {card.modelAnswerKo && (
              <div data-testid="model-answer" className="rounded-lg border border-slate-200 bg-white p-3">
                <p className="mb-1 text-xs font-bold text-slate-800">모범답안</p>
                <Markdown>{card.modelAnswerKo}</Markdown>
              </div>
            )}
            <SelfRating value={rating} onRate={setRating} />
            {card.reviewTarget.segment && (
              <div className="flex flex-col justify-between gap-2 rounded-lg border border-indigo-200 bg-white p-3 text-xs sm:flex-row sm:items-center">
                <span>
                  🎯 복습할 강의 구간: {card.reviewTarget.segment.lectureId} · {formatTimestamp(card.reviewTarget.segment.startSec)}
                </span>
                <Link
                  href={`/lectures/${card.reviewTarget.segment.lectureId}?t=${card.reviewTarget.segment.startSec}`}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  강의 구간으로 이동 →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {submitted && card.followUps && <FollowUpSelfCheck followUps={card.followUps} canAnswer />}
    </>
  );
}
