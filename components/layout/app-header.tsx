"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEMO_AUTH_ENABLED, useDemoSession } from "./demo-session";

const NAV_ITEMS = [
  { href: "/roles/agent", matchPrefix: "/roles", label: "직무 대시보드" },
  { href: "/questions", matchPrefix: "/questions", label: "문항" },
  { href: "/review", matchPrefix: "/review", label: "복습 큐" },
  { href: "/lectures", matchPrefix: "/lectures", label: "강의" },
];

function SearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const dialogRef = React.useRef<HTMLDivElement>(null);

  // 포커스 트랩: Tab 이 대화상자 밖으로 나가지 않게 한다. 닫으면 연 버튼으로 돌아간다.
  React.useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const els = dialogRef.current.querySelectorAll<HTMLElement>("input, button");
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/50 p-4 pt-16" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-dialog-title"
        className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="search-dialog-title" className="sr-only">
          문항 검색
        </h2>
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
            router.push(`/questions?q=${encodeURIComponent(query.trim())}`);
          }}
        >
          <input
            type="search"
            aria-label="문항 검색어"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="문항 내용이나 id 로 검색"
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            autoFocus
          />
          <Button type="submit" variant="primary" size="sm">
            검색
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            닫기
          </Button>
        </form>
      </div>
    </div>
  );
}

export function AppHeader() {
  const pathname = usePathname();
  const { isLoggedIn, setIsLoggedIn } = useDemoSession();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const close = React.useCallback(() => setSearchOpen(false), []);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/roles/agent" className="flex items-center gap-2 font-bold tracking-tight text-slate-900">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-extrabold text-white">AI</span>
            <span className="text-sm sm:text-base">AI Tech Study Platform</span>
          </Link>

          <nav aria-label="주요 화면" className="flex flex-wrap items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const active = pathname?.startsWith(item.matchPrefix);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-medium sm:text-sm ${
                    active ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setSearchOpen(true)} data-testid="cmd-k-trigger" aria-haspopup="dialog">
              🔍 검색 <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-500">⌘K</kbd>
            </Button>
            {DEMO_AUTH_ENABLED && (
              <Button
                type="button"
                variant={isLoggedIn ? "secondary" : "outline"}
                size="sm"
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                data-testid="session-mode-toggle"
                aria-pressed={isLoggedIn}
              >
                <Badge variant={isLoggedIn ? "success" : "warning"}>{isLoggedIn ? "데모 로그인" : "비로그인"}</Badge>
              </Button>
            )}
          </div>
        </div>
      </header>
      {searchOpen && <SearchDialog onClose={close} />}
    </>
  );
}
