"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { DEMO_AUTH_ENABLED, useDemoSession } from "@/components/layout/demo-session";

/**
 * CONTRACT.md §5 UI 불변식: 비로그인 사용자는 열람만 한다. 답안 제출·복습은 로그인 유도로 보낸다.
 */
export function AuthGateBanner({ actionLabel }: { actionLabel: string }) {
  const { setIsLoggedIn } = useDemoSession();
  return (
    <div
      data-testid="guest-auth-gate"
      className="flex flex-col justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-sm text-amber-950 sm:flex-row sm:items-center"
    >
      <div className="space-y-1">
        <p className="font-semibold">🔒 비로그인(열람 전용) 상태입니다</p>
        <p className="text-xs text-amber-800">
          <strong>{actionLabel}</strong> 기능은 로그인 후 이용할 수 있습니다.
          {DEMO_AUTH_ENABLED ? null : " 로그인은 아직 준비 중입니다."}
        </p>
      </div>
      {DEMO_AUTH_ENABLED && (
        <Button type="button" variant="primary" size="sm" onClick={() => setIsLoggedIn(true)} className="shrink-0">
          데모 로그인 (실제 인증 없음)
        </Button>
      )}
    </div>
  );
}
