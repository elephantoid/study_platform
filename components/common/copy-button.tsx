"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

type State = "idle" | "copied" | "failed";

/** 클립보드 복사. 실패하면 실패로 표시한다 (권한 거부·비보안 컨텍스트). */
export function CopyButton({
  getText,
  label,
  copiedLabel = "✓ 복사됨",
  testId,
}: {
  getText: () => string;
  label: string;
  copiedLabel?: string;
  testId?: string;
}) {
  const [state, setState] = React.useState<State>("idle");
  React.useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2000);
    return () => clearTimeout(t);
  }, [state]);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(getText());
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  return (
    <Button type="button" variant="outline" size="sm" onClick={onClick} data-testid={testId} data-copy-state={state}>
      {state === "copied" ? copiedLabel : state === "failed" ? "⚠ 복사 실패 (클립보드 권한 확인)" : label}
    </Button>
  );
}
