"use client";

import * as React from "react";
import Link from "next/link";
import type { Dashboard } from "@/lib/content/types";
import { ROLE_IDS } from "@/lib/content/types";
import { formatTimestamp } from "@/lib/format";
import { AttributionBadge } from "@/components/common/attribution-badge";
import { AuthGateBanner } from "@/components/common/auth-gate-banner";
import { useDemoSession } from "@/components/layout/demo-session";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ROLE_LABELS = { agent: "Agent Engineer", mle: "ML Engineer", rs: "Research Scientist", ds: "Data Scientist" } as const;
const WEIGHT_LABEL: Record<number, string> = { 3: "핵심", 2: "중요", 1: "참고" };

export function RoleDashboardView({ dashboard, demoDueCount }: { dashboard: Dashboard; demoDueCount: number }) {
  const { isLoggedIn } = useDemoSession();
  const dueCount = isLoggedIn ? demoDueCount : dashboard.dueCount;

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{dashboard.role.name} 학습 대시보드</h1>
            <p className="text-xs text-slate-600 sm:text-sm">직무 가중치가 높은 토픽부터 개념 카드와 퀴즈 카드를 공부합니다.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/questions?type=quiz" className={buttonVariants({ variant: "primary", size: "sm" })}>
              퀴즈 카드 풀기
            </Link>
            <Link href="/lectures" className={buttonVariants({ variant: "outline", size: "sm" })}>
              강의 보기
            </Link>
          </div>
        </div>

        <nav aria-label="직무 선택" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ROLE_IDS.map((id) => {
            const active = id === dashboard.role.id;
            return (
              <Link
                key={id}
                href={`/roles/${id}`}
                aria-current={active ? "page" : undefined}
                className={`rounded-xl border p-3 text-xs font-bold sm:text-sm ${
                  active ? "border-indigo-600 bg-indigo-50/70 text-indigo-950" : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                }`}
              >
                {ROLE_LABELS[id]}
              </Link>
            );
          })}
        </nav>
      </section>

      {!isLoggedIn && <AuthGateBanner actionLabel="FSRS 복습 기록과 숙련도 집계" />}

      <Card className="border-indigo-100 bg-gradient-to-r from-indigo-50/80 via-white to-slate-50">
        <CardContent className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            오늘 복습할 카드:{" "}
            <span className="text-indigo-600" data-testid="dashboard-due-count">
              {dueCount}개
            </span>
          </h2>
          <Link href="/review" className={buttonVariants({ variant: "primary", size: "sm" })}>
            복습 큐 열기
          </Link>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 sm:text-lg">직무 토픽 (가중치 1–3)</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {dashboard.topics.map((t) => (
            <Card key={t.id} data-testid={`topic-card-${t.id}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm sm:text-base">{t.name}</CardTitle>
                  <Badge variant="info" className="shrink-0">
                    가중치 {t.weight} · {WEIGHT_LABEL[t.weight] ?? ""}
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  개념 카드 {t.cardCounts.concept}개 · 퀴즈 카드 {t.cardCounts.quiz}개
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="flex flex-wrap gap-2">
                  {t.cardCounts.concept > 0 && (
                    <Link href={`/questions?topic=${t.id}&type=concept`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                      개념 카드 →
                    </Link>
                  )}
                  {t.cardCounts.quiz > 0 && (
                    <Link href={`/questions?topic=${t.id}&type=quiz`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                      퀴즈 카드 →
                    </Link>
                  )}
                </div>
                {/* 토픽 카드는 본문을 그리지 않는다. 이 토픽 카드들의 실제 출처를 모두 적는다. */}
                <div className="flex flex-wrap gap-1">
                  {t.sources.map((s) => (
                    <AttributionBadge key={s.sourceId} attribution={s} compact />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 sm:text-lg">연결된 강의</h2>
        {dashboard.lectures.map((lec) => (
          <Card key={lec.id}>
            <CardContent className="space-y-3 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">{lec.course}</Badge>
                <Badge variant="outline">{lec.term}</Badge>
                <Badge variant="info">재생시간 {formatTimestamp(lec.durationSec)}</Badge>
                {lec.status === "draft" && <Badge variant="warning">검수 대기 (draft) — 영상 및 챕터 이동 제공</Badge>}
              </div>
              <Link href={`/lectures/${lec.id}`} className="block break-words text-base font-bold text-slate-900 hover:text-indigo-700 hover:underline">
                {lec.title}
              </Link>
              <AttributionBadge attribution={lec.attribution} />
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
