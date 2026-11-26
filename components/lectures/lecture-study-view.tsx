"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { LectureSegmentView, LectureView } from "@/lib/content/types";
import { isQuizType } from "@/lib/content/types";
import { formatTimestamp, parseStartSec } from "@/lib/format";
import { AttributionBadge } from "@/components/common/attribution-badge";
import { CopyButton } from "@/components/common/copy-button";
import { Markdown } from "@/components/common/markdown";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const YT_ORIGIN = "https://www.youtube.com";

function segmentAt(segments: LectureSegmentView[], sec: number): LectureSegmentView | undefined {
  return segments.find((s) => sec >= s.startSec && sec < s.endSec) ?? segments[0];
}

/**
 * 강의 화면. lecture 는 서버(lib/content/load.ts getLecture)가 draft 생성 콘텐츠를 이미 뺀 상태로 넘긴다.
 * 그래서 여기서는 generatedContentShown 으로 문구만 고른다. 숨길 데이터는 이 컴포넌트에 오지 않는다.
 */
export function LectureStudyView({ lecture }: { lecture: LectureView }) {
  const searchParams = useSearchParams();
  const tParam = searchParams.get("t");
  const segments = lecture.segments;

  const [initialStart] = React.useState(() => parseStartSec(tParam, lecture.durationSec));
  const [currentSec, setCurrentSec] = React.useState(initialStart);
  const [activeSegmentId, setActiveSegmentId] = React.useState(() => segmentAt(segments, initialStart)?.id);
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [prevT, setPrevT] = React.useState(tParam);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  // ?t= 가 바뀌면(같은 강의로 다시 이동) 그 시각과 구간으로 맞춘다. effect 대신 렌더 중 조정.
  if (tParam !== prevT) {
    const sec = parseStartSec(tParam, lecture.durationSec);
    setPrevT(tParam);
    setCurrentSec(sec);
    setActiveSegmentId(segmentAt(segments, sec)?.id);
    setSlideIndex(0);
  }

  // 플레이어를 다시 만들지 않고 YouTube IFrame API 로 이동한다 (enablejsapi=1).
  const firstSeek = React.useRef(true);
  React.useEffect(() => {
    if (firstSeek.current) {
      firstSeek.current = false;
      return;
    }
    const w = iframeRef.current?.contentWindow;
    if (!w) return;
    w.postMessage(JSON.stringify({ event: "command", func: "seekTo", args: [currentSec, true] }), YT_ORIGIN);
    w.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: [] }), YT_ORIGIN);
  }, [currentSec]);

  const activeSegment = segments.find((s) => s.id === activeSegmentId) ?? segments[0];
  const shown = lecture.generatedContentShown;
  const syllabus = lecture.syllabus;
  const slideUnits = activeSegment?.slideUnits ?? [];
  const unit = slideUnits[Math.min(slideIndex, slideUnits.length - 1)];

  const jumpToSegment = (seg: LectureSegmentView) => {
    setActiveSegmentId(seg.id);
    setSlideIndex(0);
    setCurrentSec(seg.startSec);
  };

  const embedUrl = `https://www.youtube.com/embed/${lecture.videoId}?start=${initialStart}&rel=0&enablejsapi=1`;

  const notebookBundle = () =>
    [
      `[NotebookLM 소스 번들 — ${lecture.course} ${lecture.title}]`,
      `1. YouTube 강의 원본: https://www.youtube.com/watch?v=${lecture.videoId}`,
      ...(syllabus?.slidesUrl ? [`- 공식 Slides PDF: ${syllabus.slidesUrl}${syllabus.slidesTitle ? ` (${syllabus.slidesTitle})` : ""}`] : []),
      ...(syllabus?.readingLinks ?? []).map((r, i) => `${i + 2}. ${r.title}: ${r.url}`),
    ].join("\n");

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">{lecture.course}</Badge>
            <Badge variant="outline">{lecture.term}</Badge>
            {syllabus && (
              <Badge variant="info">
                Lecture {syllabus.lectureNo} ({syllabus.date})
              </Badge>
            )}
            {shown ? (
              <Badge variant="success" data-testid="lecture-preview-mode-badge">
                📖 구간 학습 가이드 표시 중
              </Badge>
            ) : (
              <Badge variant="warning" data-testid="lecture-draft-hidden-badge">
                검수 대기 중 (draft) — 영상 및 챕터 이동만 제공
              </Badge>
            )}
          </div>
          <h1 className="break-words text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{lecture.title}</h1>
          {shown ? (
            syllabus && <p className="text-xs text-slate-600 sm:text-sm">강사: {syllabus.instructor}</p>
          ) : (
            <p className="text-xs text-slate-600 sm:text-sm" data-testid="draft-learner-notice">
              이 강의의 생성 요약·해설은 교차 검수 전(status: draft)이라 보여 주지 않습니다. 공식 YouTube 영상과 챕터 이동만
              이용할 수 있습니다.
            </p>
          )}
        </div>

        {shown && syllabus && (
          <div className="flex shrink-0 flex-wrap gap-2">
            {syllabus.notebookLmUrl && (
              <a href={syllabus.notebookLmUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "primary", size: "sm" })}>
                📓 공유 NotebookLM 열기 ↗
              </a>
            )}
            <CopyButton
              getText={notebookBundle}
              label="📋 NotebookLM 소스 번들 복사"
              copiedLabel="✓ NotebookLM 소스 복사됨"
              testId="copy-notebooklm-bundle-btn"
            />
            {syllabus.slidesUrl && (
              <a href={syllabus.slidesUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
                📑 공식 Slides PDF ↗
              </a>
            )}
          </div>
        )}
      </div>

      {shown && activeSegment && unit && (
        <section data-testid="slide-by-slide-reader" className="space-y-4 rounded-2xl border-2 border-indigo-200 bg-white p-5">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                {activeSegment.slideRange && <Badge variant="default">현재 구간: {activeSegment.slideRange}</Badge>}
                <Badge variant="info">
                  학습 카드 {Math.min(slideIndex, slideUnits.length - 1) + 1} / {slideUnits.length}
                </Badge>
                <Badge variant="outline">영상 대응 시각: {formatTimestamp(unit.timestampSec)}</Badge>
                {unit.generatedBy === "notebooklm" && (
                  <Badge variant="warning" data-testid="notebooklm-generated-badge">
                    NotebookLM 생성
                  </Badge>
                )}
              </div>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">📖 구간 학습 카드 — {activeSegment.title}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {slideUnits.map((u, idx) => (
                <button
                  key={u.slideId}
                  type="button"
                  aria-pressed={idx === slideIndex}
                  onClick={() => {
                    // 카드 시각으로만 이동한다. 구간은 그대로 둬서 카드 선택이 0번으로 되돌아가지 않는다.
                    setSlideIndex(idx);
                    setCurrentSec(u.timestampSec);
                  }}
                  data-testid={`slide-unit-tab-${idx + 1}`}
                  className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                    idx === slideIndex ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {u.slideNumberLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-900 p-5 text-white lg:col-span-5">
              <h3 className="text-base font-bold leading-snug sm:text-lg">{unit.slideTitle}</h3>
              <ul className="space-y-2 border-t border-slate-800 pt-3 text-xs leading-relaxed text-slate-200 sm:text-sm">
                {unit.slideVisualBullets.map((b, i) => (
                  <li key={i} className="break-words">
                    • {b}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setCurrentSec(unit.timestampSec)}
                className="cursor-pointer text-xs font-semibold text-indigo-300 hover:underline"
              >
                ▶ 영상 {formatTimestamp(unit.timestampSec)} 지점으로 이동
              </button>
            </div>

            <div className="space-y-4 rounded-xl border border-indigo-100 bg-indigo-50/30 p-5 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant={unit.generatedBy === "notebooklm" ? "info" : "outline"} data-testid="article-generated-by-badge">
                  {unit.generatedBy === "notebooklm" ? "NotebookLM 생성" : `생성: ${unit.generatedBy}`}
                </Badge>
                <CopyButton
                  getText={() => `[${lecture.course} ${unit.slideNumberLabel} — ${unit.slideTitle}]\n${unit.notebookLmPrompt}`}
                  label="📓 NotebookLM 질문 복사"
                  copiedLabel="✓ 질문 프롬프트 복사됨"
                  testId="copy-slide-notebooklm-prompt"
                />
              </div>
              <Markdown>{unit.explanationArticleMd}</Markdown>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-3 text-xs text-emerald-950">
                <span className="font-bold">💡 한 줄 핵심: </span>
                {unit.keyTakeawayKo}
              </div>
              <div className="flex items-center gap-2 border-t border-indigo-100 pt-3">
                <Button type="button" variant="outline" size="sm" disabled={slideIndex === 0} onClick={() => setSlideIndex((i) => Math.max(0, i - 1))}>
                  ← 이전 카드
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={slideIndex >= slideUnits.length - 1}
                  onClick={() => setSlideIndex((i) => Math.min(slideUnits.length - 1, i + 1))}
                >
                  다음 카드 →
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          <Card className="overflow-hidden">
            <div className="relative aspect-video w-full bg-slate-950">
              <iframe
                ref={iframeRef}
                data-testid="youtube-embed-iframe"
                data-current-sec={currentSec}
                src={embedUrl}
                title={lecture.title}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <CardContent className="space-y-3 p-4">
              <Badge variant="info" data-testid="current-timestamp-badge">
                현재 이동 위치: {formatTimestamp(currentSec)} ({currentSec}초)
              </Badge>
              <AttributionBadge attribution={lecture.attribution} />
            </CardContent>
          </Card>

          {shown && syllabus && (
            <Card data-testid="syllabus-metadata-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base">📚 Syllabus & 참고 자료</CardTitle>
                <CardDescription className="text-xs">
                  공식 강의계획서:{" "}
                  <a href={syllabus.syllabusUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
                    {syllabus.syllabusUrl}
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1.5 pt-0 text-xs">
                {syllabus.readingLinks.map((r, i) => (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 hover:text-indigo-700"
                  >
                    <span className="truncate">{r.title}</span>
                    <span className="ml-2 shrink-0 text-indigo-600">원문 ↗</span>
                  </a>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4 lg:col-span-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm sm:text-base">YouTube 챕터 ({segments.length}개 구간)</CardTitle>
              <CardDescription className="text-xs">챕터를 누르면 그 구간 시작 시각으로 영상이 이동합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5 pt-0">
              {segments.length === 0 && <p className="text-xs text-slate-500">등록된 구간이 없습니다.</p>}
              {segments.map((seg, idx) => {
                const selected = seg.id === activeSegment?.id;
                return (
                  <div
                    key={seg.id}
                    data-testid={`segment-item-${seg.id}`}
                    className={`rounded-xl border p-3.5 ${selected ? "border-indigo-600 bg-indigo-50/70" : "border-slate-200 bg-white"}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Button
                        type="button"
                        variant={selected ? "primary" : "outline"}
                        size="sm"
                        aria-current={selected ? "true" : undefined}
                        onClick={() => jumpToSegment(seg)}
                        data-testid={`segment-jump-${seg.startSec}`}
                      >
                        ▶ 챕터 {idx + 1} ({formatTimestamp(seg.startSec)}–{formatTimestamp(seg.endSec)})
                      </Button>
                      {shown && seg.slideUnits && seg.slideUnits.length > 0 && <Badge variant="secondary">학습 카드 {seg.slideUnits.length}장</Badge>}
                    </div>
                    <h3 className="mt-2 text-xs font-bold text-slate-900 sm:text-sm">{seg.title}</h3>
                    {seg.summaryKo && (
                      <p className="mt-1 text-xs leading-relaxed text-slate-600" data-testid={`segment-summary-${seg.id}`}>
                        {seg.summaryKo}
                      </p>
                    )}
                    {seg.questions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {seg.questions.map((q) => (
                          <Link key={q.id} href={`/questions/${q.id}`} className="text-xs font-semibold text-indigo-600 hover:underline">
                            [{isQuizType(q.type) ? "퀴즈" : "개념"}] {q.id} →
                          </Link>
                        ))}
                      </div>
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
