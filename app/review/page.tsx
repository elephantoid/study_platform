"use client";

import * as React from "react";
import Link from "next/link";
import {
  formatSecondsToTimestamp,
  getGradeResultMock,
  getQuestionMock,
  getTopicName,
  MOCK_FSRS_RESULTS,
  MOCK_REVIEW_QUEUE,
} from "@/app/_mock";
import { AttributionBadge } from "@/components/common/attribution-badge";
import { AuthGateBanner } from "@/components/common/auth-gate-banner";
import { useDemoSession } from "@/components/layout/app-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FSRS_BUTTONS: {
  rating: 1 | 2 | 3 | 4;
  label: string;
  intervalHint: string;
  variant: "danger" | "outline" | "secondary" | "primary";
}[] = [
  { rating: 1, label: "1 · Again (다시)", intervalHint: "내일 재복습", variant: "danger" },
  { rating: 2, label: "2 · Hard (어려움)", intervalHint: "+2일", variant: "outline" },
  { rating: 3, label: "3 · Good (알맞음)", intervalHint: "+5일", variant: "secondary" },
  { rating: 4, label: "4 · Easy (쉬움)", intervalHint: "+12일", variant: "primary" },
];

export default function ReviewQueuePage() {
  const { isLoggedIn, setIsLoggedIn } = useDemoSession();
  const queueItems = MOCK_REVIEW_QUEUE.items;

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answerShown, setAnswerShown] = React.useState(true);
  const [ratedResults, setRatedResults] = React.useState<Record<string, string>>({});

  const currentItem = queueItems[currentIndex] ?? queueItems[0];
  const question = getQuestionMock(currentItem.questionId);
  const gradeMock = getGradeResultMock(currentItem.questionId);
  const topicName = getTopicName(currentItem.topicId);

  const handleRate = (rating: 1 | 2 | 3 | 4) => {
    const res = MOCK_FSRS_RESULTS[rating](currentItem.questionId);
    setRatedResults((prev) => ({
      ...prev,
      [currentItem.questionId]: res.nextDue,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <Badge variant="info" className="mb-1.5">
            FSRS (Free Spaced Repetition Scheduler)
          </Badge>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            오늘의 간격 반복 복습 큐
          </h1>
          <p className="text-xs text-slate-600 sm:text-sm">
            기억 안정성(Stability)과 난이도(Difficulty)에 따라 계산된 오늘의 복습 대상 문항 {queueItems.length}개입니다.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {queueItems.map((item, idx) => {
            const active = idx === currentIndex;
            const done = Boolean(ratedResults[item.questionId]);
            return (
              <button
                key={item.questionId}
                type="button"
                onClick={() => {
                  setCurrentIndex(idx);
                  setAnswerShown(true);
                }}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  active
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : done
                    ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                카드 #{idx + 1} {done ? "✓" : ""}
              </button>
            );
          })}
        </div>
      </div>

      {!isLoggedIn && (
        <AuthGateBanner
          actionLabel="FSRS 복습 평가(Again/Hard/Good/Easy) 및 다음 복습일(nextDue) 갱신"
          onEnableDemoAuth={() => setIsLoggedIn(true)}
        />
      )}

      {/* 현재 복습 카드 */}
      <Card>
        <CardHeader className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">
                복습 카드 {currentIndex + 1} / {queueItems.length}
              </Badge>
              <Badge variant="outline">예정일(due): {currentItem.due}</Badge>
              <Badge variant="info">{topicName}</Badge>
            </div>
            <Link href={`/questions/${question.id}`}>
              <Button variant="outline" size="sm">
                본 문항 + 꼬리질문 3개 전체 화면 열기 →
              </Button>
            </Link>
          </div>

          <CardTitle className="text-base leading-relaxed text-slate-900 sm:text-lg">
            {question.promptMd}
          </CardTitle>
          <CardDescription className="text-xs">
            유형: {question.type.toUpperCase()} · 난이도: {question.difficulty.toUpperCase()}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* 정답 / 모범답안 확인 영역 */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-700">
                모범 답안 & 핵심 복습 포인트
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAnswerShown(!answerShown)}
              >
                {answerShown ? "정답 가리기" : "정답 확인하기"}
              </Button>
            </div>

            {answerShown ? (
              <div className="space-y-3 text-xs leading-relaxed text-slate-800 sm:text-sm">
                <p>{gradeMock.modelAnswerKo}</p>

                {question.reviewTarget.segment && (
                  <div className="flex flex-col justify-between gap-2 rounded-lg border border-indigo-200 bg-white p-3 text-xs sm:flex-row sm:items-center">
                    <span>
                      📺 <strong>연결된 강의 구간:</strong>{" "}
                      {question.reviewTarget.segment.lectureId.toUpperCase()} (
                      {formatSecondsToTimestamp(
                        question.reviewTarget.segment.startSec
                      )}
                      )
                    </span>
                    <Link
                      href={`/lectures/${question.reviewTarget.segment.lectureId}?t=${question.reviewTarget.segment.startSec}`}
                    >
                      <Button variant="outline" size="sm">
                        해당 세그먼트 + Slides 바로가기 →
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                스스로 핵심 개념을 떠올린 뒤 &apos;정답 확인하기&apos;를 눌러 FSRS 등급을 선택하세요.
              </p>
            )}
          </div>

          {/* FSRS 4단계 평가 버튼 (로그인 시 활성화) */}
          {isLoggedIn && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-700">
                기억 인출 난이도를 선택하면 FSRS 알고리즘이 다음 복습일(nextDue)을 계산합니다:
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {FSRS_BUTTONS.map((btn) => (
                  <Button
                    key={btn.rating}
                    type="button"
                    variant={btn.variant}
                    onClick={() => handleRate(btn.rating)}
                    data-testid={`fsrs-rate-${btn.rating}`}
                    className="flex h-auto flex-col py-2.5"
                  >
                    <span className="text-xs font-bold">{btn.label}</span>
                    <span className="text-[11px] opacity-85">{btn.intervalHint}</span>
                  </Button>
                ))}
              </div>

              {ratedResults[currentItem.questionId] && (
                <div
                  data-testid="fsrs-review-result"
                  className="flex flex-col justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 p-3.5 text-xs text-emerald-950 sm:flex-row sm:items-center"
                >
                  <span>
                    ✓ <strong>FSRS 스케줄 갱신 완료:</strong> 다음 복습 예정일(nextDue)은{" "}
                    <strong>{ratedResults[currentItem.questionId]}</strong> 입니다.
                  </span>
                  {currentIndex < queueItems.length - 1 && (
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => setCurrentIndex((i) => i + 1)}
                    >
                      다음 복습 카드로 이동 →
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 출처 배지 (필수 UI 불변식) */}
          <AttributionBadge attribution={question.attribution} />
        </CardContent>
      </Card>
    </div>
  );
}
