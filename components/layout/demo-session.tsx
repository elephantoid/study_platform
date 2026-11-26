"use client";

import * as React from "react";

/**
 * 인증이 없어서(API.md §5) 쓰는 데모 세션. 기본값은 비로그인이다 (CONTRACT §5: 비로그인은 열람만).
 * 데모 로그인 토글은 NEXT_PUBLIC_DEMO_AUTH=1 로 빌드할 때만 보인다. 기본 빌드(배포 이미지)에는 없다.
 */
export const DEMO_AUTH_ENABLED = process.env.NEXT_PUBLIC_DEMO_AUTH === "1";

type DemoSession = { isLoggedIn: boolean; setIsLoggedIn: (v: boolean) => void };

const DemoSessionContext = React.createContext<DemoSession>({ isLoggedIn: false, setIsLoggedIn: () => {} });

export function useDemoSession() {
  return React.useContext(DemoSessionContext);
}

export function DemoSessionProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const value = React.useMemo(
    () => ({ isLoggedIn: DEMO_AUTH_ENABLED && isLoggedIn, setIsLoggedIn }),
    [isLoggedIn]
  );
  return <DemoSessionContext.Provider value={value}>{children}</DemoSessionContext.Provider>;
}
