"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  formatSecondsToTimestamp,
  getLectureMock,
  getQuestionMock,
} from "@/app/_mock";
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

  React.useEffect(() => {
    const tParam = Number(searchParams.get("t") ?? "0") || 0;
    setCurrentStartSec(tParam);
  }, [searchParams]);

  // 현재 활성 세그먼트 계산
  const activeSegment =
    lecture.segments.find(
      (seg) => currentStartSec >= seg.startSec && currentStartSec < seg.endSec
    ) ?? lecture.segments[0];

  const embedUrl = `https://www.youtube.com/embed/${lecture.videoId}?start=${currentStartSec}&rel=0`;

  return (
    <div className="space-y-6">
      {/* 상단 강의 & Syllabus 헤더 */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">{lecture.course}</Badge>
            <Badge variant="outline">{lecture.term}</Badge>
            <Badge variant="info">
              Lecture {lecture.syllabus.lectureNo} ({lecture.syllabus.date})
            </Badge>
            <Badge variant="secondary">
              총 길이 {formatSecondsToTimestamp(lecture.durationSec)} (
              {lecture.durationSec}초)
            </Badge>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {lecture.title}
          </h1>
          <p className="text-xs text-slate-600 sm:text-sm">
            강사: {lecture.syllabus.instructor} ·{" "}
            <strong className="text-indigo-700">
              전체 요약 없이 공식 Syllabus의 강의 Slides와 구간별 영상을 나란히 대조하며 공부합니다.
            </strong>
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <a
            href={lecture.syllabus.slidesUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="sm">
              📑 Syllabus 공식 Slides 열기 ↗
            </Button>
          </a>
          <a
            href={lecture.syllabus.syllabusUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm">
              Stanford Syllabus 원본 ↗
            </Button>
          </a>
        </div>
      </div>

      {/* 메인 스플릿 워크스페이스: YouTube 임베드 + 현재 구간의 Syllabus Slides 동시 학습 패널 */}
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
                  세그먼트를 클릭하면 해당 초(startSec)로 즉시 이동합니다.
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
                강의 통짜 요약 대신 Syllabus가 지정한 공식 슬라이드 덱({lecture.syllabus.deckPageCount}p)과 원문 아티클을 직접 참조합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5 pt-0 text-xs">
              <div className="flex flex-col justify-between gap-2 rounded-lg border border-indigo-200 bg-indigo-50/50 p-3 sm:flex-row sm:items-center">
                <div>
                  <p className="font-bold text-indigo-950">
                    {lecture.syllabus.slidesTitle}
                  </p>
                  <p className="text-slate-600">
                    현재 선택된 세그먼트 매핑 슬라이드:{" "}
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

        {/* 우측 5컬럼: 선택된 세그먼트의 Syllabus Slides 동시 학습 가이드 & 전체 세그먼트 리스트 */}
        <div className="space-y-4 lg:col-span-5">
          {/* 현재 세그먼트의 Syllabus Slide Companion */}
          <Card
            data-testid="active-slide-companion"
            className="border-indigo-200 bg-indigo-50/30"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="default">{activeSegment.slideRange}</Badge>
                <Badge variant="info">
                  {formatSecondsToTimestamp(activeSegment.startSec)} –{" "}
                  {formatSecondsToTimestamp(activeSegment.endSec)}
                </Badge>
              </div>
              <CardTitle className="mt-1 text-sm sm:text-base">
                슬라이드 동시 학습 가이드: {activeSegment.title}
              </CardTitle>
              <CardDescription className="text-xs text-slate-600">
                {activeSegment.summaryKo}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 pt-0 text-xs">
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-2">
                <p className="font-bold text-slate-800">
                  📑 이 구간에서 함께 볼 Syllabus Slides 체크포인트 (자리표시자)
                </p>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-700">
                  {activeSegment.slideKeyPointsPlaceholder.map((pt, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {activeSegment.questionIds.length > 0 && (
                <div className="space-y-1.5">
                  <p className="font-semibold text-slate-700">
                    이 슬라이드 구간과 연결된 면접 문항 (+꼬리질문 3개)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeSegment.questionIds.map((qid) => {
                      const q = getQuestionMock(qid);
                      return (
                        <Link key={qid} href={`/questions/${qid}`}>
                          <Button variant="primary" size="sm">
                            [{q.type.toUpperCase()}] 문항 & 꼬리질문 풀기 →
                          </Button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 세그먼트 타임라인 리스트 (클릭 시 startSec 점프) */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm sm:text-base">
                구간별 타임스탬프 & Slides 매핑 ({lecture.segments.length}개 세그먼트)
              </CardTitle>
              <CardDescription className="text-xs">
                세그먼트를 클릭하면 YouTube 임베드 영상이 해당 시간(startSec)으로 이동하고 슬라이드 가이드가 전환됩니다.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2.5 pt-0">
              {lecture.segments.map((seg) => {
                const isSelected = seg.id === activeSegment.id;
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
                          ▶ {formatSecondsToTimestamp(seg.startSec)} (
                          {seg.startSec}s)
                        </Button>
                        <Badge variant="secondary">{seg.slideRange}</Badge>
                      </div>

                      {seg.questionIds[0] && (
                        <Link
                          href={`/questions/${seg.questionIds[0]}`}
                          className="text-xs font-semibold text-indigo-600 hover:underline"
                        >
                          연결 문항 풀기 →
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
