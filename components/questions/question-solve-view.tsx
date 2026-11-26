"use client";

import * as React from "react";
import type { CardView } from "@/lib/content/types";
import { isQuizType } from "@/lib/content/types";
import { AttributionBadge } from "@/components/common/attribution-badge";
import { CopyButton } from "@/components/common/copy-button";
import { Markdown } from "@/components/common/markdown";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ConceptCardBody } from "./concept-card-body";
import { QuizCardBody } from "./quiz-card-body";

const KIND_LABEL: Record<CardView["type"], string> = {
  concept: "개념 카드",
  open: "퀴즈 카드 · 서술형",
  mcq: "퀴즈 카드 · 객관식",
};

const DIFFICULTY_VARIANTS = { basic: "success", intermediate: "info", advanced: "warning" } as const;

function llmPayload(card: CardView, topicName: string): string {
  const fus = card.followUps ?? [];
  const lines = [`[기술 면접 문항 학습 요청]`, `토픽: ${topicName}`, `질문: ${card.promptMd}`];
  if (fus.length) lines.push("", "[꼬리질문]", ...fus.map((f) => `${f.order}. ${f.promptMd}`));
  lines.push(`출처: ${card.attribution.url}`, "");
  lines.push(fus.length ? "위 질문과 꼬리질문에 대한 내 답변을 평가하고 부족한 개념을 짚어 주세요." : "위 질문에 대한 내 답변을 평가하고 부족한 개념을 짚어 주세요.");
  return lines.join("\n");
}

/**
 * 문항 화면. 카드 타입 분기는 여기 한 곳에서만 한다:
 * concept → ConceptCardBody (채점 없음), open·mcq → QuizCardBody.
 */
export function QuestionSolveView({ card, topicName }: { card: CardView; topicName: string }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={isQuizType(card.type) ? "default" : "info"} data-testid="card-kind-badge" data-card-type={card.type}>
                {KIND_LABEL[card.type]}
              </Badge>
              <Badge variant={DIFFICULTY_VARIANTS[card.difficulty]}>난이도: {card.difficulty}</Badge>
              <Badge variant="outline">{topicName}</Badge>
              {card.status === "draft" && <Badge variant="warning">검수 전 (draft)</Badge>}
            </div>
            <CopyButton getText={() => llmPayload(card, topicName)} label="📋 LLM 용 복사" testId="copy-for-llm-btn" />
          </div>
          <h1 className="sr-only">{card.id}</h1>
          <Markdown className="text-base text-slate-900">{card.promptMd}</Markdown>
        </CardHeader>

        <CardContent className="space-y-5">
          <AttributionBadge attribution={card.attribution} />
          {isQuizType(card.type) ? <QuizCardBody card={card} /> : <ConceptCardBody card={card} />}
        </CardContent>
      </Card>
    </div>
  );
}
