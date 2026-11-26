"use client";

import * as React from "react";
import Link from "next/link";
import type { CardView, FsrsRating } from "@/lib/content/types";
import { AttributionBadge } from "@/components/common/attribution-badge";
import { AuthGateBanner } from "@/components/common/auth-gate-banner";
import { Markdown } from "@/components/common/markdown";
import { useDemoSession } from "@/components/layout/demo-session";
import { SelfRating } from "@/components/questions/self-rating";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export type ReviewItem = { due: string; topicName: string; card: CardView };

/** 정답(해설·모범답안)은 기본으로 숨긴다. 떠올린 뒤 펼쳐야 평점을 고를 수 있다. */
export function ReviewQueueView({ demoItems }: { demoItems: ReviewItem[] }) {
  const { isLoggedIn } = useDemoSession();
  const items = isLoggedIn ? demoItems : [];
  const [index, setIndex] = React.useState(0);
  const [answerShown, setAnswerShown] = React.useState(false);
  const [ratings, setRatings] = React.useState<Record<string, FsrsRating>>({});

  const go = (i: number) => {
    setIndex(i);
    setAnswerShown(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">오늘의 복습 큐</h1>
        <p className="text-xs text-slate-600 sm:text-sm">떠올려 본 뒤 정답을 펼치고 FSRS 1–4 로 자가 평가합니다.</p>
      </div>

      {!isLoggedIn && <AuthGateBanner actionLabel="FSRS 복습" />}

      {items.length === 0 ? (
        <div data-testid="review-empty-state" className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
          오늘 복습할 카드가 없습니다.{" "}
          <Link href="/questions" className="font-semibold text-indigo-600 hover:underline">
            문항 목록
          </Link>
          에서 새 카드를 공부해 보세요.
        </div>
      ) : (
        <ReviewCard
          item={items[Math.min(index, items.length - 1)]}
          position={Math.min(index, items.length - 1)}
          total={items.length}
          answerShown={answerShown}
          onToggleAnswer={() => setAnswerShown((v) => !v)}
          rating={ratings[items[Math.min(index, items.length - 1)].card.id] ?? null}
          onRate={(r) => setRatings((p) => ({ ...p, [items[Math.min(index, items.length - 1)].card.id]: r }))}
          onNext={index < items.length - 1 ? () => go(index + 1) : undefined}
          onSelect={go}
          done={items.map((i) => Boolean(ratings[i.card.id]))}
        />
      )}
    </div>
  );
}

function ReviewCard(props: {
  item: ReviewItem;
  position: number;
  total: number;
  answerShown: boolean;
  onToggleAnswer: () => void;
  rating: FsrsRating | null;
  onRate: (r: FsrsRating) => void;
  onNext?: () => void;
  onSelect: (i: number) => void;
  done: boolean[];
}) {
  const { card } = props.item;
  const answer = card.type === "concept" ? card.explanationMd : card.modelAnswerKo;
  return (
    <>
      <nav aria-label="복습 카드" className="flex flex-wrap gap-1.5">
        {props.done.map((d, i) => (
          <button
            key={i}
            type="button"
            aria-current={i === props.position ? "true" : undefined}
            onClick={() => props.onSelect(i)}
            className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-semibold ${
              i === props.position ? "border-indigo-600 bg-indigo-600 text-white" : d ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            카드 #{i + 1} {d ? "✓" : ""}
          </button>
        ))}
      </nav>
      <Card data-testid="review-card">
        <CardHeader className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">
                복습 카드 {props.position + 1} / {props.total}
              </Badge>
              <Badge variant="outline">예정일: {props.item.due}</Badge>
              <Badge variant="info">{props.item.topicName}</Badge>
              <Badge variant="secondary">{card.type === "concept" ? "개념 카드" : "퀴즈 카드"}</Badge>
            </div>
            <Link href={`/questions/${card.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
              문항 화면 열기 →
            </Link>
          </div>
          <Markdown className="text-base text-slate-900">{card.promptMd}</Markdown>
        </CardHeader>
        <CardContent className="space-y-5">
          <AttributionBadge attribution={card.attribution} />
          <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <Button type="button" variant="outline" size="sm" onClick={props.onToggleAnswer} data-testid="toggle-answer-btn">
              {props.answerShown ? "정답 가리기" : "정답 확인하기"}
            </Button>
            {props.answerShown ? (
              <div data-testid="review-answer">{answer ? <Markdown>{answer}</Markdown> : <p className="text-xs text-slate-500">등록된 정답이 없습니다.</p>}</div>
            ) : (
              <p className="text-xs text-slate-500">먼저 스스로 떠올린 뒤 정답을 확인하세요. 정답을 본 뒤에 평점을 고를 수 있습니다.</p>
            )}
          </div>
          <SelfRating disabled={!props.answerShown} value={props.rating} onRate={props.onRate} />
          {props.rating !== null && props.onNext && (
            <div className="flex justify-end">
              <Button type="button" variant="primary" size="sm" onClick={props.onNext}>
                다음 복습 카드 →
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
