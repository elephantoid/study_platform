"use client";

import * as React from "react";
import Link from "next/link";
import {
  canShowLectureGeneratedContent,
  formatSecondsToTimestamp,
  getDashboardMock,
  MOCK_ATTRIBUTIONS,
  MOCK_LECTURES,
  QUESTION_LIST,
} from "@/app/_mock";
import type { RoleId } from "@/app/_mock/types";
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
import { Progress } from "@/components/ui/progress";

const ROLES: { id: RoleId; label: string; subtitle: string }[] = [
  {
    id: "agent",
    label: "Agent Engineer",
    subtitle: "ReAct · 도구 호출 · 메모리 · 평가 가드레일",
  },
  {
    id: "mle",
    label: "ML Engineer",
    subtitle: "모델 학습 · 추론 서빙 · 편향-분산 · 시스템 최적화",
  },
  {
    id: "rs",
    label: "Research Scientist",
    subtitle: "Attention 수식 · 최적화 이론 · 아키텍처 설계",
  },
  {
    id: "ds",
    label: "Data Scientist",
    subtitle: "가설 검정 · A/B 테스트 · 인과 추론 · 통계 모델링",
  },
];

export function RoleDashboardView({ initialRoleId }: { initialRoleId: RoleId }) {
  const { isLoggedIn, setIsLoggedIn } = useDemoSession();
  const dashboard = getDashboardMock(initialRoleId);
  const effectiveDueCount = isLoggedIn ? dashboard.dueCount : 0;

  return (
    <div className="space-y-6">
      {/* 상단 직무 선택 탭 */}
      <section className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="info" className="mb-1.5">
              직무 맞춤형 학습 로드맵
            </Badge>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {dashboard.role.name} 학습 대시보드
            </h1>
            <p className="text-xs text-slate-600 sm:text-sm">
              직무별 가중치가 반영된 기술 면접 문항(+3단계 꼬리질문)과 Stanford CS329Z 강의 슬라이드를 함께 학습합니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/questions/q-agent-react-open">
              <Button variant="primary" size="sm">
                심층 면접 풀이 시작 (+꼬리질문 3)
              </Button>
            </Link>
            <Link href="/lectures/cs329z-lec01">
              <Button variant="outline" size="sm">
                CS329Z 강의 + Slides 열기
              </Button>
            </Link>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="직무 선택"
          className="grid grid-cols-2 gap-2 sm:grid-cols-4"
        >
          {ROLES.map((r) => {
            const active = r.id === dashboard.role.id;
            return (
              <Link
                key={r.id}
                href={`/roles/${r.id}`}
                role="tab"
                aria-selected={active}
                className={`flex flex-col justify-between rounded-xl border p-3 text-left transition-all ${
                  active
                    ? "border-indigo-600 bg-indigo-50/70 shadow-xs"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`text-xs font-bold sm:text-sm ${
                      active ? "text-indigo-950" : "text-slate-800"
                    }`}
                  >
                    {r.label}
                  </span>
                  {active && <Badge variant="info">선택됨</Badge>}
                </div>
                <span className="mt-1 text-[11px] text-slate-500 line-clamp-1">
                  {r.subtitle}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 비로그인 안내 배너 */}
      {!isLoggedIn && (
        <AuthGateBanner
          actionLabel="FSRS 복습 스케줄 기록 및 답안 채점 저장"
          onEnableDemoAuth={() => setIsLoggedIn(true)}
        />
      )}

      {/* 오늘의 FSRS 복습 큐 요약 카드 */}
      <Card className="border-indigo-100 bg-gradient-to-r from-indigo-50/80 via-white to-slate-50">
        <CardContent className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant={effectiveDueCount > 0 ? "success" : "secondary"}>
                FSRS 간격 반복
              </Badge>
              <span className="text-xs font-medium text-slate-500">
                {isLoggedIn
                  ? "기억 감쇠 곡선 기반 오늘의 복습 큐"
                  : "비로그인 상태 (dueCount: 0)"}
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              오늘 복습할 문항:{" "}
              <span className="text-indigo-600" data-testid="dashboard-due-count">
                {effectiveDueCount}개
              </span>
            </h2>
            <p className="text-xs text-slate-600">
              {isLoggedIn
                ? "Again / Hard / Good / Easy 4단계 자기 평가로 다음 복습 일자(due)가 자동 갱신됩니다."
                : "로그인하면 개인별 FSRS 복습 예정 카드가 집계됩니다."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/review">
              <Button variant="primary" size="sm">
                {isLoggedIn
                  ? `오늘의 복습 큐 시작 (${effectiveDueCount})`
                  : "복습 큐 열람하기"}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 토픽별 가중치 & 숙련도 그리드 */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            직무 토픽 트리 & 출제 가중치
          </h2>
          <span className="text-xs text-slate-500">
            가중치 합계: {dashboard.topics.reduce((acc, t) => acc + t.weight, 0)}%
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {dashboard.topics.map((topic) => {
            const masteryPercent = isLoggedIn
              ? Math.round(topic.masteredRatio * 100)
              : 0;
            const matchingQuestion =
              QUESTION_LIST.find((q) => q.topicId === topic.id) ??
              QUESTION_LIST[0];

            return (
              <Card key={topic.id} className="flex flex-col justify-between">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-sm sm:text-base">
                      {topic.name}
                    </CardTitle>
                    <Badge variant="info" className="shrink-0">
                      비중 {topic.weight}%
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    수록 문항 {topic.questionCount}개 · 본 문항 + 꼬리질문 3단계 제공
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        {isLoggedIn ? "FSRS 숙련도 (Mastered Ratio)" : "숙련도 (로그인 필요)"}
                      </span>
                      <span className="font-semibold text-slate-800">
                        {masteryPercent}%
                      </span>
                    </div>
                    <Progress value={masteryPercent} />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500">
                      대표 유형: {matchingQuestion.type.toUpperCase()}
                    </span>
                    <Link href={`/questions/${matchingQuestion.id}`}>
                      <Button variant="outline" size="sm">
                        문항 & 꼬리질문 풀기 →
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <AttributionBadge attribution={MOCK_ATTRIBUTIONS["src-boost-ai"]} />
      </section>

      {/* 추천 강의 (Syllabus Slides 동시 학습) */}
      <section className="space-y-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            연결된 신기술 강의 (YouTube + Syllabus Slides 학습)
          </h2>
          <p className="text-xs text-slate-500">
            강의 전체 요약 대신 공식 Syllabus의 강의 슬라이드(Slides)와 세그먼트별 타임스탬프를 나란히 보며 학습합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {dashboard.lectures.map((lec) => {
            const fullLecture = MOCK_LECTURES[lec.id];
            const showGenerated = canShowLectureGeneratedContent(fullLecture);
            const visibleSyllabus = showGenerated ? fullLecture?.syllabus : undefined;
            return (
              <Card key={lec.id}>
                <CardContent className="p-5 space-y-4">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="default">{lec.course}</Badge>
                        {fullLecture && (
                          <Badge variant="outline">{fullLecture.term}</Badge>
                        )}
                        <Badge variant="info">
                          재생시간 {formatSecondsToTimestamp(lec.durationSec)} (
                          {lec.durationSec}초)
                        </Badge>
                        {visibleSyllabus?.deckPageCount ? (
                          <Badge variant="success">
                            Syllabus Slides ({visibleSyllabus.deckPageCount}p) 연동
                          </Badge>
                        ) : !showGenerated ? (
                          <Badge variant="warning">
                            검수 대기 중 (draft) — 영상 및 챕터 이동 제공
                          </Badge>
                        ) : null}
                      </div>
                      <h3 className="text-base font-bold text-slate-900">
                        {lec.title}
                      </h3>
                      {visibleSyllabus && (
                        <p className="text-xs text-slate-600">
                          강사: {visibleSyllabus.instructor}
                          {visibleSyllabus.slidesTitle ? (
                            <>
                              {" · "}슬라이드 자료:{" "}
                              <span className="font-medium text-slate-800">
                                {visibleSyllabus.slidesTitle}
                              </span>
                            </>
                          ) : null}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 shrink-0">
                      <Link href={`/lectures/${lec.id}`}>
                        <Button variant="primary" size="sm">
                          {showGenerated ? "강의 + 학습 카드 열기" : "영상 + 챕터 열기"}
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {fullLecture && (
                    <AttributionBadge attribution={fullLecture.attribution} />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
