"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

interface CopyForLlmButtonProps {
  title: string;
  promptMd: string;
  followUps?: { order: number; promptMd: string }[];
  sourceUrl: string;
}

export function CopyForLlmButton({
  title,
  promptMd,
  followUps = [],
  sourceUrl,
}: CopyForLlmButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    const followUpBlock =
      followUps.length > 0
        ? `\n\n[연속 꼬리질문 3단계]\n` +
          followUps.map((f) => `${f.order}. ${f.promptMd}`).join("\n")
        : "";
    const payload = `[기술 면접 문항 학습 요청]\n토픽: ${title}\n본 질문: ${promptMd}${followUpBlock}\n출처: ${sourceUrl}\n\n위 질문과 꼬리질문 3개에 대해 내 답변을 채점하고 부족한 개념을 짚어주세요.`;

    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleCopy}
      data-testid="copy-for-llm-btn"
    >
      {copied ? "✓ LLM 프롬프트 복사됨" : "📋 LLM 용 복사"}
    </Button>
  );
}
