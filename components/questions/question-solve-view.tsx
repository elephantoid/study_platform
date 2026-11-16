"use client";

import * as React from "react";
import Link from "next/link";
import {
  formatSecondsToTimestamp,
  getGradeResultMock,
  getQuestionMock,
  getTopicName,
  QUESTION_LIST,
} from "@/app/_mock";
import type { FollowUpItem } from "@/app/_mock/types";
import { AttributionBadge } from "@/components/common/attribution-badge";
import { AuthGateBanner } from "@/components/common/auth-gate-banner";
import { CopyForLlmButton } from "@/components/common/copy-for-llm-button";
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
import { Textarea } from "@/components/ui/textarea";

const TYPE_LABELS: Record<"concept" | "open" | "mcq", string> = {
  open: "서술형 (Open-ended AI 루브릭 채점)",
  concept: "개념 카드 (Concept Card)",
  mcq: "객관식 (Multiple Choice)",
};

const DIFFICULTY_VARIANTS: Record<
  "basic" | "intermediate" | "advanced",
  "success" | "info" | "warning"
> = {
  basic: "success",
  intermediate: "info",
  advanced: "warning",
};

interface FollowUpSubmissionState {
  answer: string;
  submitted: boolean;
  score: number;
  matchedKeywords: string[];
}

export function QuestionSolveView({ questionId }: { questionId: string }) {
  const { isLoggedIn, setIsLoggedIn } = useDemoSession();
  const question = getQuestionMock(questionId);
  const gradeResult = getGradeResultMock(question.id);
  const topicName = getTopicName(question.topicId);

  // 본 문항 상태
  const [openAnswer, setOpenAnswer] = React.useState(
    question.type === "open"
      ? "ReAct는 Thought(추론)와 Action(도구 호출), Observation(결과 관측)을 교대로 반복하여 단일 CoT의 환각 문제를 외부 지식으로 접지(Grounding)합니다. 대표적인 실패 모드로는 동일 인자로 도구를 반복 호출하는 무한 루프와 긴 Observation 누적으로 인한 컨텍스트 창 오염이 있습니다."
      : ""
  );
  const [selectedChoice, setSelectedChoice] = React.useState<number | null>(1);
  const [conceptRevealed, setConceptRevealed] = React.useState(false);
  const [mainSubmitted, setMainSubmitted] = React.useState(true);

  // 3개의 꼬리질문 답변 및 채점 상태 (followUps 는 선택 항목)
  const followUps = question.followUps ?? [];

  const [followUpStates, setFollowUpStates] = React.useState<
    Record<string, FollowUpSubmissionState>
  >(() => {
    const initial: Record<string, FollowUpSubmissionState> = {};
    followUps.forEach((fu, idx) => {
      initial[fu.id] = {
        answer:
          idx === 0
            ? `${fu.rubricKeywords.join(", ")} 메커니즘을 결합해 런타임에서 제어합니다.`
            : "",
        submitted: idx === 0,
        score: idx === 0 ? 9 : 0,
        matchedKeywords: idx === 0 ? fu.rubricKeywords.slice(0, 2) : [],
      };
    });
    return initial;
  });

  // questionId 변경 시 초기화
  React.useEffect(() => {
    setOpenAnswer(
      question.type === "open"
        ? "ReAct는 Thought(추론)와 Action(도구 호출), Observation(결과 관측)을 교대로 반복하여 단일 CoT의 환각 문제를 외부 지식으로 접지(Grounding)합니다. 대표적인 실패 모드로는 동일 인자로 도구를 반복 호출하는 무한 루프와 긴 Observation 누적으로 인한 컨텍스트 창 오염이 있습니다."
        : ""
    );
    setSelectedChoice(1);
    setConceptRevealed(false);
    setMainSubmitted(true);

    const nextFu: Record<string, FollowUpSubmissionState> = {};
    (question.followUps ?? []).forEach((fu, idx) => {
      nextFu[fu.id] = {
        answer:
          idx === 0
            ? `${fu.rubricKeywords.join(", ")} 메커니즘을 결합해 런타임에서 제어합니다.`
            : "",
        submitted: idx === 0,
        score: idx === 0 ? 9 : 0,
        matchedKeywords: idx === 0 ? fu.rubricKeywords.slice(0, 2) : [],
      };
    });
    setFollowUpStates(nextFu);
  }, [question]);

  const handleFollowUpSubmit = (fu: FollowUpItem) => {
    const current = followUpStates[fu.id] ?? {
      answer: "",
      submitted: false,
      score: 0,
      matchedKeywords: [],
    };
    const text = current.answer.trim();
    if (!text) return;

    const matched = fu.rubricKeywords.filter((kw) =>
      text.toLowerCase().includes(kw.split(" ")[0].toLowerCase())
    );
    const effectiveMatched =
      matched.length > 0 ? matched : fu.rubricKeywords.slice(0, 2);
    const computedScore = Math.min(
      fu.maxScore,
      Math.max(7, Math.round((effectiveMatched.length / fu.rubricKeywords.length) * fu.maxScore))
    );

    setFollowUpStates((prev) => ({
      ...prev,
      [fu.id]: {
        ...current,
        submitted: true,
        score: computedScore,
        matchedKeywords: effectiveMatched,
      },
    }));
  };

  const handleFillSampleFollowUp = (fu: FollowUpItem) => {
    setFollowUpStates((prev) => ({
      ...prev,
      [fu.id]: {
        ...(prev[fu.id] ?? { submitted: false, score: 0, matchedKeywords: [] }),
        answer: fu.modelAnswerKo,
      },
    }));
  };

  const completedFollowUpCount = followUps.filter(
    (fu) => followUpStates[fu.id]?.submitted
  ).length;

  return (
    <div className="space-y-6">
      {/* 상단 문항 유형 전환 바 (open / concept / mcq 모두 즉시 확인 가능) */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-0.5">
          <p className="text-xs font-semibold text-slate-500">
            문항 유형별 샘플 전환 (concept / mcq / open)
          </p>
          <p className="text-xs text-slate-400">
            모든 문항은 본 문항 채점 후 연결된 3개의 심층 꼬리질문(Follow-up 1→2→3)으로 이어집니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {QUESTION_LIST.map((item) => {
            const active = item.id === question.id;
            return (
              <Link
                key={item.id}
                href={`/questions/${item.id}`}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                [{item.type.toUpperCase()}] {getTopicName(item.topicId).split(" ")[0]}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 본 문항 카드 */}
      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">{TYPE_LABELS[question.type]}</Badge>
              <Badge variant={DIFFICULTY_VARIANTS[question.difficulty]}>
                난이도: {question.difficulty.toUpperCase()}
              </Badge>
              <Badge variant="outline">{topicName}</Badge>
            </div>

            <CopyForLlmButton
              title={topicName}
              promptMd={question.promptMd}
              followUps={question.followUps}
              sourceUrl={question.attribution.url}
            />
          </div>

          <CardTitle className="text-base leading-relaxed text-slate-900 sm:text-lg">
            {question.promptMd}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* 비로그인 시 열람만 허용 */}
          {!isLoggedIn ? (
            <AuthGateBanner
              actionLabel="본 문항 답안 제출, AI 루브릭 채점 및 3단계 꼬리질문 답변"
              onEnableDemoAuth={() => setIsLoggedIn(true)}
            />
          ) : (
            <>
              {/* 1) 서술형(open) 입력 */}
              {question.type === "open" && (
                <div className="space-y-3">
                  <label
                    htmlFor="main-open-answer"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    나의 서술형 답변 작성
                  </label>
                  <Textarea
                    id="main-open-answer"
                    value={openAnswer}
                    onChange={(e) => setOpenAnswer(e.target.value)}
                    placeholder="핵심 원리, 장단점, 프로덕션 실패 모드를 구조화하여 작성하세요..."
                    rows={4}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-slate-500">
                      제출 시 루브릭 항목(criteria)별 점수·근거와 함께 꼬리질문 3개가 생성됩니다.
                    </span>
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => setMainSubmitted(true)}
                      data-testid="submit-main-answer-btn"
                    >
                      답안 제출 및 루브릭 채점
                    </Button>
                  </div>
                </div>
              )}

              {/* 2) 객관식(mcq) 선택지 */}
              {question.type === "mcq" && question.choices && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-700">
                    가장 적절한 보기를 선택하세요
                  </p>
                  <div className="space-y-2">
                    {question.choices.map((choice, idx) => {
                      const selected = selectedChoice === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedChoice(idx)}
                          className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-xs transition-all sm:text-sm ${
                            selected
                              ? "border-indigo-600 bg-indigo-50/70 font-medium text-indigo-950"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span
                            className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                              selected
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <span className="break-words">{choice}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => setMainSubmitted(true)}
                    >
                      정답 확인 및 꼬리질문 열기
                    </Button>
                  </div>
                </div>
              )}

              {/* 3) 개념 카드(concept) 뒤집기 */}
              {question.type === "concept" && (
                <div className="space-y-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-600">
                      💡 머릿속으로 먼저 핵심 키워드 3가지를 인출(Recall)한 뒤 정답 카드를 펼쳐보세요.
                    </p>
                    {conceptRevealed && gradeResult.modelAnswerKo && (
                      <p className="mt-2 text-xs leading-relaxed text-slate-800 sm:text-sm">
                        {gradeResult.modelAnswerKo}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setConceptRevealed(!conceptRevealed)}
                    >
                      {conceptRevealed ? "개념 해설 접기" : "개념 해설 펼치기"}
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setConceptRevealed(true);
                        setMainSubmitted(true);
                      }}
                    >
                      인출 완료 & 꼬리질문 3개 진행
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* 본 문항 채점 결과 리포트 (GradeResult) */}
          {isLoggedIn && mainSubmitted && (
            <div
              data-testid="grade-result-panel"
              className="space-y-4 rounded-xl border border-indigo-200 bg-indigo-50/40 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant={
                      gradeResult.verdict === "pass"
                        ? "success"
                        : gradeResult.verdict === "partial"
                        ? "warning"
                        : "danger"
                    }
                  >
                    판정: {gradeResult.verdict.toUpperCase()}
                  </Badge>
                  <span className="text-sm font-bold text-slate-900">
                    점수: {gradeResult.score} / {gradeResult.maxScore}점
                  </span>
                </div>
                {gradeResult.nextDue && (
                  <Badge variant="outline">
                    다음 FSRS 복습 예정일: {gradeResult.nextDue}
                  </Badge>
                )}
              </div>

              <p className="text-xs leading-relaxed text-slate-700 sm:text-sm">
                {gradeResult.feedbackKo}
              </p>

              {/* open 유형일 때 루브릭 항목별 점수·근거 테이블 */}
              {gradeResult.criteria.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-800">
                    루브릭 기준별 채점 상세 (Criteria Breakdown)
                  </p>
                  <div className="space-y-2">
                    {gradeResult.criteria.map((c) => (
                      <div
                        key={c.id}
                        className="rounded-lg border border-slate-200 bg-white p-3 text-xs"
                      >
                        <div className="flex items-center justify-between gap-2 font-semibold text-slate-900">
                          <span>
                            [{c.id.toUpperCase()}] {c.desc}
                          </span>
                          <Badge
                            variant={c.awarded === c.points ? "success" : "warning"}
                          >
                            +{c.awarded} / {c.points}점
                          </Badge>
                        </div>
                        <p className="mt-1 text-slate-600">근거: {c.evidence}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {gradeResult.deductions.length > 0 && (
                <div className="rounded-lg border border-rose-200 bg-rose-50/70 p-3 text-xs text-rose-900">
                  <p className="font-semibold">감점 요인 (Deductions)</p>
                  <ul className="mt-1 list-disc pl-4">
                    {gradeResult.deductions.map((d, i) => (
                      <li key={i}>
                        {d.desc} ({d.points}점)
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {gradeResult.modelAnswerKo && (
                <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
                  <p className="font-bold text-slate-800">모범 답안 (Model Answer)</p>
                  <p className="mt-1 leading-relaxed text-slate-700">
                    {gradeResult.modelAnswerKo}
                  </p>
                </div>
              )}

              {/* 복습 타겟 (reviewTarget) 딥링크 */}
              {question.reviewTarget.segment && (
                <div className="flex flex-col justify-between gap-2 rounded-lg border border-indigo-200 bg-white p-3 text-xs sm:flex-row sm:items-center">
                  <div>
                    <span className="font-semibold text-indigo-950">
                      🎯 연결된 강의 세그먼트 & 슬라이드 복습:
                    </span>{" "}
                    <span className="text-slate-600">
                      {question.reviewTarget.segment.lectureId.toUpperCase()} ·{" "}
                      {formatSecondsToTimestamp(question.reviewTarget.segment.startSec)}{" "}
                      ({question.reviewTarget.segment.startSec}초 구간)
                    </span>
                  </div>
                  <Link
                    href={`/lectures/${question.reviewTarget.segment.lectureId}?t=${question.reviewTarget.segment.startSec}`}
                  >
                    <Button variant="outline" size="sm">
                      강의 타임스탬프 + Slides 이동 →
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* 출처 배지 (필수 UI 불변식) */}
          <AttributionBadge attribution={question.attribution} />
        </CardContent>
      </Card>

      {/* =====================================================================
          연쇄 꼬리질문 3개 섹션 (Follow-up Questions 1 -> 2 -> 3, 선택 항목)
          ===================================================================== */}
      {followUps.length > 0 && (
        <section
          data-testid="followup-questions-section"
          className="space-y-4 rounded-2xl border-2 border-indigo-200 bg-white p-5 shadow-xs"
        >
          <div className="flex flex-col justify-between gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-indigo-600 text-white">
                  심층 압박 면접 모드
                </Badge>
                <Badge variant="info">
                  꼬리질문 완료 {completedFollowUpCount} / {followUps.length}
                </Badge>
              </div>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                연결된 3개의 꼬리질문 (Follow-up Questions 1 → 2 → 3)
              </h2>
              <p className="text-xs text-slate-600">
                실제 기술 면접처럼 본 문항 답변에서 파생되는 3개의 심화 꼬리질문에 연이어 답변하고 루브릭 피드백을 확인하세요.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {followUps.map((fu) => {
              const st = followUpStates[fu.id] ?? {
                answer: "",
                submitted: false,
                score: 0,
                matchedKeywords: [],
              };

              return (
                <Card
                  key={fu.id}
                  data-testid={`followup-card-${fu.order}`}
                  className="border-slate-200 bg-slate-50/50"
                >
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="default">꼬리질문 {fu.order} / 3</Badge>
                        {st.submitted ? (
                          <Badge variant="success">
                            답변 완료 ({st.score} / {fu.maxScore}점)
                          </Badge>
                        ) : (
                          <Badge variant="outline">답변 대기 중</Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {fu.rubricKeywords.map((kw) => (
                          <Badge key={kw} variant="secondary" className="text-[11px]">
                            핵심 키워드: {kw}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <CardTitle className="mt-2 text-sm leading-relaxed text-slate-900 sm:text-base">
                      {fu.promptMd.replace(/\*\*/g, "")}
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-600">
                      💡 힌트: {fu.hintKo}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3 pt-0">
                    {!isLoggedIn ? (
                      <p className="text-xs font-medium text-amber-800">
                        🔒 학습 모드로 전환하면 꼬리질문 {fu.order}번에 대한 답변을 제출하고 AI 채점을 받을 수 있습니다.
                      </p>
                    ) : (
                      <>
                        <Textarea
                          value={st.answer}
                          onChange={(e) =>
                            setFollowUpStates((prev) => ({
                              ...prev,
                              [fu.id]: {
                                ...st,
                                answer: e.target.value,
                              },
                            }))
                          }
                          placeholder={`꼬리질문 ${fu.order}번에 대한 답변을 작성하세요...`}
                          rows={3}
                          data-testid={`followup-input-${fu.order}`}
                        />
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleFillSampleFollowUp(fu)}
                          >
                            모범 답안 예시 채우기
                          </Button>
                          <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            onClick={() => handleFollowUpSubmit(fu)}
                            data-testid={`followup-submit-${fu.order}`}
                          >
                            꼬리질문 {fu.order} 답변 제출 & 채점
                          </Button>
                        </div>
                      </>
                    )}

                    {isLoggedIn && st.submitted && (
                      <div
                        data-testid={`followup-feedback-${fu.order}`}
                        className="mt-3 space-y-2 rounded-xl border border-emerald-200 bg-white p-3.5 text-xs"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-bold text-emerald-900">
                            ✓ 꼬리질문 {fu.order} 채점 피드백: {st.score} / {fu.maxScore}점
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {st.matchedKeywords.map((kw) => (
                              <Badge key={kw} variant="success">
                                포함됨: {kw}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {fu.sampleFeedbackKo && (
                          <p className="text-slate-700">{fu.sampleFeedbackKo}</p>
                        )}
                        <div className="rounded-lg bg-slate-50 p-2.5 text-slate-700">
                          <span className="font-semibold text-slate-900">
                            모범 답안 요약:{" "}
                          </span>
                          {fu.modelAnswerKo}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
