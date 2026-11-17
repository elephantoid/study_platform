"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  canShowLectureGeneratedContent,
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
  const showGenerated = canShowLectureGeneratedContent(lecture);

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

  // CONTRACT §5: status: draft 강의는 학습자 화면에서 summaryKo, syllabus, slideUnits 를 숨긴다.
  const syllabus = showGenerated ? lecture.syllabus : undefined;
  const slideUnits = showGenerated ? activeSegment.slideUnits ?? [] : [];
  const activeSlideUnit: SlideStudyUnit | undefined =
    slideUnits[selectedSlideIndex] ?? slideUnits[0];

  const embedUrl = `https://www.youtube.com/embed/${lecture.videoId}?start=${currentStartSec}&rel=0`;

  const handleCopyNotebookBundle = async () => {
    const readingLines =
      syllabus?.readingLinks?.map((r, idx) => `${idx + 2}. ${r.title}: ${r.url}`) ?? [];
    const payload = [
      `[NotebookLM 소스 번들 — ${lecture.course} ${lecture.title}]`,
      `1. YouTube 강의 원본: https://www.youtube.com/watch?v=${lecture.videoId}`,
      ...(syllabus?.slidesUrl && syllabus?.slidesTitle
        ? [`- 공식 Slides PDF: ${syllabus.slidesUrl} (${syllabus.slidesTitle})`]
        : []),
      ...readingLines,
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
      {/* 상단 강의 헤더 */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">{lecture.course}</Badge>
            <Badge variant="outline">{lecture.term}</Badge>
            {syllabus && (
              <Badge variant="info">
                Lecture {syllabus.lectureNo} ({syllabus.date})
              </Badge>
            )}
            {showGenerated ? (
              <Badge variant="success" data-testid="lecture-preview-mode-badge">
                📖 구간 학습 가이드 표시 중
              </Badge>
            ) : (
              <Badge variant="warning" data-testid="lecture-draft-hidden-badge">
                검수 대기 중 (draft) — 영상 및 챕터 이동만 제공
              </Badge>
            )}
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {lecture.title}
          </h1>
          {showGenerated ? (
            <p className="text-xs text-slate-600 sm:text-sm">
              {syllabus ? `강사: ${syllabus.instructor} · ` : null}
              <strong className="text-indigo-700">
                구간별 학습 카드와 해설 글을 넘기며 영상 타임스탬프와 함께 학습할 수 있습니다.
              </strong>
            </p>
          ) : (
            <p className="text-xs text-slate-600 sm:text-sm" data-testid="draft-learner-notice">
              이 강의의 생성 요약·해설 콘텐츠는 교차 검수 전(status: draft)이므로 학습자 화면에 노출되지 않습니다. 공식 YouTube 영상 시청과 챕터 이동만 이용할 수 있습니다.
            </p>
          )}
        </div>

        {showGenerated && syllabus && (
          <div className="flex flex-wrap gap-2 shrink-0">
            {syllabus.notebookLmUrl && (
              <a
                href={syllabus.notebookLmUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="sm">
                  📓 공유 NotebookLM 열기 ↗
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
                ? "✓ NotebookLM 소스 복사됨"
                : "📋 NotebookLM 소스 번들 복사"}
            </Button>
            {syllabus.slidesUrl && (
              <a
                href={syllabus.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  📑 공식 Slides PDF ↗
                </Button>
              </a>
            )}
          </div>
        )}
      </div>

      {/* =====================================================================
          핵심: 구간 학습 카드 + 해설 글 리더 (showGenerated 일 때만 노출)
          ===================================================================== */}
      {showGenerated && activeSlideUnit && (
        <section
          data-testid="slide-by-slide-reader"
          className="space-y-4 rounded-2xl border-2 border-indigo-200 bg-white p-5 shadow-xs"
        >
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                {activeSegment.slideRange && (
                  <Badge variant="default">
                    현재 세그먼트: {activeSegment.slideRange}
                  </Badge>
                )}
                <Badge variant="info">
                  학습 카드 {selectedSlideIndex + 1} / {slideUnits.length}
                </Badge>
                <Badge variant="outline">
                  영상 대응 시각: {formatSecondsToTimestamp(activeSlideUnit.timestampSec)}
                </Badge>
                {activeSlideUnit.generatedBy === "notebooklm" && (
                  <Badge
                    variant="warning"
                    data-testid="notebooklm-generated-badge"
                  >
                    NotebookLM 생성
                  </Badge>
                )}
              </div>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                📖 구간 학습 카드 & 해설 글 — {activeSegment.title}
              </h2>
            </div>

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

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
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
                    {lecture.course} 핵심 요점 (한국어 재구성)
                  </span>
                </div>

                <h3 className="text-base font-bold leading-snug text-white sm:text-lg">
                  {activeSlideUnit.slideTitle}
                </h3>

                <div className="space-y-2 border-t border-slate-800 pt-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    핵심 요점 (한국어 재구성)
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
                  ▶ 영상 {formatSecondsToTimestamp(activeSlideUnit.timestampSec)} 지점으로 이동
                </button>
                {syllabus?.slidesUrl && (
                  <a
                    href={syllabus.slidesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white hover:underline"
                  >
                    원본 슬라이드 PDF ↗
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-indigo-100 bg-indigo-50/30 p-5 lg:col-span-7 space-y-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="default">✍️ 구간 해설 글</Badge>
                    {activeSlideUnit.generatedBy === "notebooklm" ? (
                      <Badge variant="info" data-testid="article-generated-by-badge">
                        NotebookLM 생성
                      </Badge>
                    ) : (
                      <Badge variant="outline" data-testid="article-generated-by-badge">
                        생성: {activeSlideUnit.generatedBy}
                      </Badge>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopySlidePrompt(activeSlideUnit)}
                    data-testid="copy-slide-notebooklm-prompt"
                  >
                    {copiedSlidePromptId === activeSlideUnit.slideId
                      ? "✓ 질문 프롬프트 복사됨"
                      : "📓 NotebookLM 질문 복사"}
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
                    📓 NotebookLM 심화 질문 프롬프트:
                  </p>
                  <p className="mt-1 italic text-slate-700">
                    &ldquo;{activeSlideUnit.notebookLmPrompt}&rdquo;
                  </p>
                </div>
              </div>

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
                    ← 이전 카드
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
                    다음 카드 →
                  </Button>
                </div>

                {activeSegment.questionIds[0] && (
                  <Link href={`/questions/${activeSegment.questionIds[0]}`}>
                    <Button variant="primary" size="sm">
                      연결 문항 (+꼬리질문 3) 풀기 →
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 하단 워크스페이스: YouTube 임베드 플레이어 + 챕터(세그먼트) 타임라인 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* 좌측 7컬럼: YouTube 공식 임베드 플레이어 */}
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
                  우측 챕터 버튼을 클릭하면 해당 시작 시각(startSec)으로 즉시 이동합니다.
                </span>
              </div>

              <AttributionBadge attribution={lecture.attribution} />
            </CardContent>
          </Card>

          {/* Syllabus 카드 (showGenerated 일 때만 노출) */}
          {showGenerated && syllabus && (
            <Card data-testid="syllabus-metadata-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base">
                  📚 Syllabus & 필독 리딩 자료
                </CardTitle>
                <CardDescription className="text-xs">
                  공식 강의계획서({syllabus.syllabusUrl}) 및 참고 논문 링크입니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2.5 pt-0 text-xs">
                {syllabus.slidesUrl && syllabus.slidesTitle && (
                  <div className="flex flex-col justify-between gap-2 rounded-lg border border-indigo-200 bg-indigo-50/50 p-3 sm:flex-row sm:items-center">
                    <div>
                      <p className="font-bold text-indigo-950">
                        {syllabus.slidesTitle}
                      </p>
                      {activeSegment.slideRange && (
                        <p className="text-slate-600">
                          현재 세그먼트 슬라이드 범위:{" "}
                          <strong>{activeSegment.slideRange}</strong>
                        </p>
                      )}
                    </div>
                    <a
                      href={syllabus.slidesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-indigo-600 hover:underline shrink-0"
                    >
                      슬라이드 PDF 열기 ↗
                    </a>
                  </div>
                )}

                {syllabus.readingLinks && syllabus.readingLinks.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="font-semibold text-slate-700">
                      Syllabus 지정 참고 자료 (Readings)
                    </p>
                    {syllabus.readingLinks.map((reading, i) => (
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
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* 우측 5컬럼: YouTube 챕터 이동 리스트 (draft 일 때는 챕터 제목과 타임스탬프 이동만 표시) */}
        <div className="space-y-4 lg:col-span-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm sm:text-base">
                YouTube 챕터 이동 ({lecture.segments.length}개 구간)
              </CardTitle>
              <CardDescription className="text-xs">
                {showGenerated
                  ? "챕터를 선택하면 상단 학습 카드와 영상 재생 위치(startSec)가 함께 전환됩니다."
                  : "챕터를 클릭하면 해당 구간 시작 시각(startSec)으로 영상이 이동합니다."}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2.5 pt-0">
              {lecture.segments.map((seg, idx) => {
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
                          ▶ 챕터 {idx + 1} ({formatSecondsToTimestamp(seg.startSec)}–
                          {formatSecondsToTimestamp(seg.endSec)})
                        </Button>
                        {showGenerated &&
                          seg.slideUnits &&
                          seg.slideUnits.length > 0 && (
                            <Badge variant="secondary">
                              학습 카드 {seg.slideUnits.length}장
                            </Badge>
                          )}
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
                    {showGenerated && seg.summaryKo && (
                      <p
                        className="mt-1 text-xs leading-relaxed text-slate-600"
                        data-testid={`segment-summary-${seg.id}`}
                      >
                        {seg.summaryKo}
                      </p>
                    )}
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
