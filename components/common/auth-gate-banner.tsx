"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

interface AuthGateBannerProps {
  actionLabel: string;
  onEnableDemoAuth: () => void;
}

/**
 * CONTRACT.md §5 UI 불변식:
 * 비로그인 사용자는 열람만 한다. 답안 제출·복습은 로그인 유도로 보낸다.
 */
export function AuthGateBanner({ actionLabel, onEnableDemoAuth }: AuthGateBannerProps) {
  return (
    <div
      data-testid="guest-auth-gate"
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-sm text-amber-950"
    >
      <div className="space-y-1">
        <p className="font-semibold">🔒 비로그인(열람 전용) 상태입니다</p>
        <p className="text-xs text-amber-800">
          문제 지문과 강의 슬라이드·세그먼트는 자유롭게 열람할 수 있지만,{" "}
          <strong>{actionLabel}</strong> 기능은 로그인 후 이용 가능합니다.
        </p>
      </div>
      <Button
        type="button"
        variant="primary"
        size="sm"
        onClick={onEnableDemoAuth}
        className="shrink-0"
      >
        학습 모드로 전환 (데모 로그인)
      </Button>
    </div>
  );
}
