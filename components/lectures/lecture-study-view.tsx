"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  formatSecondsToTimestamp,
  getLectureMock,
  getQuestionMock,
} from "@/app/_mock";
import type { SlideStudyUnit } from "@/app/_mock/types";
import { AttributionBadge } from "@/components/common/attribution-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LectureStudyView({ lectureId }: { lectureId: string }) {
  const searchParams = useSearchParams();
  const initialStart = Number(searchParams.get("t") ?? "0") || 0;

  const lecture = getLectureMock(lectureId);
  const [currentStartSec, setCurrentStartSec] = React.useState<number>(initialStart);
  const [selectedSlideIndex, setSelectedSlideIndex] = React.useState<number>(0);
  const [copiedNotebookBundle, setCopiedNotebookBundle] = React.useState(false);
  const [copiedSlidePromptId, setCopiedSlidePromptId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const tParam = Number(searchParams.get("t") ?? "0") || 0;
    setCurrentStartSec(tParam);
  }, [searchParams]);

  // 현재 활성 세그먼트 계산
  const activeSegment =
    lecture.segments.find(
      (seg) => currentStartSec >= seg.startSec && currentStartSec < seg.endSec
    ) ?? lecture.segments[0];

  // 세그먼트가 바뀌면 슬라이드 유닛 인덱스를 0으로 초기화
  React.useEffect(() => {
    setSelectedSlideIndex(0);
  }, [activeSegment.id]);

  const slideUnits = activeSegment.slideUnits;
  const activeSlideUnit: SlideStudyUnit =
    slideUnits[selectedSlideIndex] ?? slideUnits[0];

  const embedUrl = `https://www.youtube.com/embed/${lecture.videoId}?start=${currentStartSec}&rel=0`;

  const handleCopyNotebookBundle = async () => {
    const payload = [
      `[NotebookLM 소스 번들 — ${lecture.course} ${lecture.title}]`,
      `1. YouTube 강의 원본: https://www.youtube.com/watch?v=${lecture.videoId}`,
      `2. Syllabus 공식 Slides: ${lecture.syllabus.slidesUrl} (${lecture.syllabus.slidesTitle})`,
      ...lecture.syllabus.readingLinks.map((r, idx) => `${idx + 3}. ${r.title}: ${r.url}`),
      ``,
      `[NotebookLM 초기 지시 프롬프트]`,
      `위 강의 슬라이드와 영상을 매칭하여, 전체를 하나로 뭉뚱그려 요약하지 말고 슬라이드 번호 구간별로 (1) 슬라이드 핵심 도식/수식, (2) 강사의 구두 설명 행간 맥락, (3) 기술 면접 예상 질문 3개를 한국어로 정리해줘.`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(payload);
    } catch {
      // ignore clipboard error in headless env
    }
    setCopiedNotebookBundle(true);
    setTimeout(() => setCopiedNotebookBundle(false), 2000);
  };

  const handleCopySlidePrompt = async (unit: SlideStudyUnit) => {
    const payload = `[${lecture.course} ${unit.slideNumberLabel} — ${unit.slideTitle}]\n${unit.notebookLmPrompt}`;
    try {
      await navigator.clipboard.writeText(payload);
    } catch {
      // ignore
    }
    setCopiedSlidePromptId(unit.slideId);
    setTimeout(() => setCopiedSlidePromptId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 상단 강의 & Syllabus + NotebookLM 스터디 허브 헤더 */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">{lecture.course}</Badge>
            <Badge variant="outline">{lecture.term}</Badge>
            <Badge variant="info">
              Lecture {lecture.syllabus.lectureNo} ({lecture.syllabus.date})
            </Badge>
            <Badge variant="success">
              📖 슬라이드 쪼개기 + 해설 글 학습 (NotebookLM 연동)
            </Badge>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {lecture.title}
          </h1>
          <p className="text-xs text-slate-600 sm:text-sm">
            강사: {lecture.syllabus.instructor} ·{" "}
            <strong className="text-indigo-700">
              영상을 전부 시청하지 않아도, 쪼개진 슬라이드 카드와 짝지어진 해설 글을 한 장씩 넘기며 완독할 수 있습니다.
            </strong>
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          {lecture.syllabus.notebookLmUrl && (
            <a
              href={lecture.syllabus.notebookLmUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="sm">
                📓 NotebookLM 스터디 노트 열기 ↗
              </Button>
            </a>
          )}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleCopyNotebookBundle}
            data-testid="copy-notebooklm-bundle-btn"
          >
            {copiedNotebookBundle
              ? "✓ NotebookLM 소스+프롬프트 복사됨"
              : "📋 NotebookLM 소스 번들 복사"}
          </Button>
          <a
            href={lecture.syllabus.slidesUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm">
              📑 공식 Slides PDF ↗
            </Button>
          </a>
        </div>
      </div>

      {/* =====================================================================
          핵심: 슬라이드 쪼개기 + 교재형 해설 글 리더 (Slide-by-Slide Article Reader)
          ===================================================================== */}
      <section
        data-testid="slide-by-slide-reader"
        className="space-y-4 rounded-2xl border-2 border-indigo-200 bg-white p-5 shadow-xs"
      >
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">
                현재 세그먼트: {activeSegment.slideRange}
              </Badge>
              <Badge variant="info">
                슬라이드 카드 {selectedSlideIndex + 1} / {slideUnits.length}
              </Badge>
              <Badge variant="outline">
                영상 대응 시각: {formatSecondsToTimestamp(activeSlideUnit.timestampSec)}
              </Badge>
            </div>
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              📖 슬라이드 & 해설 글 한 장씩 학습하기 — {activeSegment.title}
            </h2>
            <p className="text-xs text-slate-500">
              NotebookLM으로 공식 Slides PDF와 강사 발화를 교차 접지(Grounding)하여 슬라이드 묶음 단위로 쪼갠 학습 카드입니다.
            </p>
          </div>

          {/* 슬라이드 유닛 선택 탭 / 이전·다음 스텝퍼 */}
          <div className="flex flex-wrap items-center gap-1.5">
            {slideUnits.map((unit, idx) => (
              <button
                key={unit.slideId}
                type="button"
                onClick={() => {
                  setSelectedSlideIndex(idx);
                  setCurrentStartSec(unit.timestampSec);
                }}
                data-testid={`slide-unit-tab-${idx + 1}`}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  idx === selectedSlideIndex
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {unit.slideNumberLabel}
              </button>
            ))}
          </div>
        </div>

        {/* 슬라이드 도식(좌) + 교재형 한국어 해설 글(우) 2단 카드 */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* 좌측 5컬럼: 슬라이드 핵심 원문 도식 카드 */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-900 p-5 text-white lg:col-span-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <Badge
                  variant="info"
                  className="border-indigo-400/40 bg-indigo-500/20 text-indigo-200"
                >
                  📊 {activeSlideUnit.slideNumberLabel}
                </Badge>
                <span className="text-xs text-slate-400">
                  Stanford {lecture.course} Deck
                </span>
              </div>

              <h3 className="text-base font-bold leading-snug text-white sm:text-lg">
                {activeSlideUnit.slideTitle}
              </h3>

              <div className="space-y-2 border-t border-slate-800 pt-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Slide Key Bullets & Formulas
                </p>
                <ul className="space-y-2 text-xs leading-relaxed text-slate-200 sm:text-sm">
                  {activeSlideUnit.slideVisualBullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                      <span className="break-words">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-3 text-xs">
              <button
                type="button"
                onClick={() => setCurrentStartSec(activeSlideUnit.timestampSec)}
                className="font-semibold text-indigo-300 hover:text-indigo-200 hover:underline cursor-pointer"
              >
                ▶ 영상 {formatSecondsToTimestamp(activeSlideUnit.timestampSec)} 지점으로 플레이어 동기화
              </button>
              <a
                href={lecture.syllabus.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white hover:underline"
              >
                원본 슬라이드 ↗
              </a>
            </div>
          </div>

          {/* 우측 7컬럼: 슬라이드 짝꿍 한국어 해설 글 + NotebookLM 심화 프롬프트 */}
          <div className="flex flex-col justify-between rounded-xl border border-indigo-100 bg-indigo-50/30 p-5 lg:col-span-7 space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="default">✍️ 슬라이드 행간 해설 글 (Companion Article)</Badge>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopySlidePrompt(activeSlideUnit)}
                  data-testid="copy-slide-notebooklm-prompt"
                >
                  {copiedSlidePromptId === activeSlideUnit.slideId
                    ? "✓ NotebookLM 질문 복사됨"
                    : "📓 이 슬라이드 NotebookLM 질문 복사"}
                </Button>
              </div>

              <p className="text-xs leading-relaxed text-slate-800 sm:text-sm">
                {activeSlideUnit.explanationArticleMd.replace(/\*\*/g, "")}
              </p>

              <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-3 text-xs text-emerald-950">
                <span className="font-bold">💡 한 줄 핵심 (Key Takeaway): </span>
                <span>{activeSlideUnit.keyTakeawayKo}</span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600">
                <p className="font-semibold text-slate-800">
                  📓 NotebookLM 심화 질문 프롬프트 (복사하여 강의 노트북에 질문해보세요):
                </p>
                <p className="mt-1 italic text-slate-700">
                  &ldquo;{activeSlideUnit.notebookLmPrompt}&rdquo;
                </p>
              </div>
            </div>

            {/* 이전/다음 슬라이드 이동 및 연결 문항 풀기 바 */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-indigo-100 pt-3">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={selectedSlideIndex === 0}
                  onClick={() =>
                    setSelectedSlideIndex((i) => Math.max(0, i - 1))
                  }
                >
                  ← 이전 슬라이드
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={selectedSlideIndex >= slideUnits.length - 1}
                  onClick={() =>
                    setSelectedSlideIndex((i) =>
                      Math.min(slideUnits.length - 1, i + 1)
                    )
                  }
                >
                  다음 슬라이드 →
                </Button>
              </div>

              {activeSegment.questionIds[0] && (
                <Link href={`/questions/${activeSegment.questionIds[0]}`}>
                  <Button variant="primary" size="sm">
                    이 슬라이드 연결 문항 (+꼬리질문 3) 풀기 →
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 하단 워크스페이스: YouTube 임베드 플레이어 + 전체 세그먼트 타임라인 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* 좌측 7컬럼: YouTube 공식 임베드 플레이어 (CONTRACT.md §5 불변식 유지) */}
        <div className="space-y-4 lg:col-span-7">
          <Card className="overflow-hidden">
            <div className="relative aspect-video w-full bg-slate-950">
              <iframe
                key={`${lecture.videoId}-${currentStartSec}`}
                data-testid="youtube-embed-iframe"
                src={embedUrl}
                title={lecture.title}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <CardContent className="space-y-3 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="info" data-testid="current-timestamp-badge">
                    현재 이동 위치: {formatSecondsToTimestamp(currentStartSec)} (
                    {currentStartSec}초)
                  </Badge>
                  <Badge variant="outline">videoId: {lecture.videoId}</Badge>
                </div>
                <span className="text-xs text-slate-500">
                  글로 학습하다가 강사의 실제 발화가 궁금한 구간만 골라 재생할 수 있습니다.
                </span>
              </div>

              <AttributionBadge attribution={lecture.attribution} />
            </CardContent>
          </Card>

          {/* Syllabus 필수 Reading 자료 카드 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm sm:text-base">
                📚 Syllabus 연동 리딩 & 슬라이드 메타데이터
              </CardTitle>
              <CardDescription className="text-xs">
                NotebookLM에 함께 넣으면 좋은 공식 슬라이드 덱({lecture.syllabus.deckPageCount}p)과 필독 논문 링크입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5 pt-0 text-xs">
              <div className="flex flex-col justify-between gap-2 rounded-lg border border-indigo-200 bg-indigo-50/50 p-3 sm:flex-row sm:items-center">
                <div>
                  <p className="font-bold text-indigo-950">
                    {lecture.syllabus.slidesTitle}
                  </p>
                  <p className="text-slate-600">
                    현재 세그먼트 슬라이드 범위:{" "}
                    <strong>{activeSegment.slideRange}</strong>
                  </p>
                </div>
                <a
                  href={lecture.syllabus.slidesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-indigo-600 hover:underline shrink-0"
                >
                  슬라이드 PDF 열기 ↗
                </a>
              </div>

              <div className="space-y-1.5">
                <p className="font-semibold text-slate-700">
                  Syllabus 지정 필독 자료 (Readings)
                </p>
                {lecture.syllabus.readingLinks.map((reading, i) => (
                  <a
                    key={i}
                    href={reading.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 hover:border-indigo-300 hover:text-indigo-700"
                  >
                    <span className="truncate">{reading.title}</span>
                    <span className="ml-2 shrink-0 text-indigo-600">원문 ↗</span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 우측 5컬럼: 세그먼트 타임라인 리스트 (클릭 시 해당 슬라이드 묶음 & startSec 전환) */}
        <div className="space-y-4 lg:col-span-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm sm:text-base">
                구간별 세그먼트 & 슬라이드 묶음 선택 ({lecture.segments.length}개 구간)
              </CardTitle>
              <CardDescription className="text-xs">
                구간을 선택하면 상단의 [슬라이드 & 해설 글 리더]와 영상 타임스탬프(startSec)가 함께 전환됩니다.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2.5 pt-0">
              {lecture.segments.map((seg) => {
                const isSelected = seg.id === activeSegment.id;
                const firstQ = seg.questionIds[0]
                  ? getQuestionMock(seg.questionIds[0])
                  : null;
                return (
                  <div
                    key={seg.id}
                    data-testid={`segment-item-${seg.id}`}
                    className={`rounded-xl border p-3.5 transition-all ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/70 shadow-xs"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Button
                          type="button"
                          variant={isSelected ? "primary" : "outline"}
                          size="sm"
                          onClick={() => setCurrentStartSec(seg.startSec)}
                          data-testid={`segment-jump-${seg.startSec}`}
                        >
                          📖 {seg.slideRange} ({formatSecondsToTimestamp(seg.startSec)})
                        </Button>
                        <Badge variant="secondary">
                          슬라이드 카드 {seg.slideUnits.length}장
                        </Badge>
                      </div>

                      {firstQ && (
                        <Link
                          href={`/questions/${firstQ.id}`}
                          className="text-xs font-semibold text-indigo-600 hover:underline"
                        >
                          [{firstQ.type.toUpperCase()}] 문항 풀기 →
                        </Link>
                      )}
                    </div>

                    <h3 className="mt-2 text-xs font-bold text-slate-900 sm:text-sm">
                      {seg.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      {seg.summaryKo}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
