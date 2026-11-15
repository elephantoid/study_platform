"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QUESTION_LIST } from "@/app/_mock/questions";
import { MOCK_LECTURES } from "@/app/_mock/lectures";

interface DemoSessionContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}

const DemoSessionContext = React.createContext<DemoSessionContextValue>({
  isLoggedIn: true,
  setIsLoggedIn: () => {},
});

export function useDemoSession() {
  return React.useContext(DemoSessionContext);
}

export function DemoSessionProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  return (
    <DemoSessionContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </DemoSessionContext.Provider>
  );
}

const NAV_ITEMS = [
  { href: "/roles/agent", matchPrefix: "/roles", label: "직무 대시보드" },
  {
    href: "/questions/q-agent-react-open",
    matchPrefix: "/questions",
    label: "문항 풀이 (+꼬리질문 3)",
  },
  { href: "/review", matchPrefix: "/review", label: "FSRS 복습 큐" },
  {
    href: "/lectures/cs329z-lec01",
    matchPrefix: "/lectures",
    label: "강의 + Syllabus Slides",
  },
];

export function AppHeader() {
  const pathname = usePathname();
  const { isLoggedIn, setIsLoggedIn } = useDemoSession();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filteredQuestions = QUESTION_LIST.filter(
    (q) =>
      q.promptMd.toLowerCase().includes(query.toLowerCase()) ||
      q.id.toLowerCase().includes(query.toLowerCase())
  );

  const filteredLectures = Object.values(MOCK_LECTURES).filter(
    (l) =>
      l.title.toLowerCase().includes(query.toLowerCase()) ||
      l.course.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/roles/agent"
              className="flex items-center gap-2 font-bold tracking-tight text-slate-900"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-extrabold text-white">
                AI
              </span>
              <span className="text-sm sm:text-base">AI Tech Study Platform</span>
            </Link>

            <div className="flex items-center gap-1.5 sm:hidden">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSearchOpen(true)}
                aria-label="검색 열기"
              >
                🔍 ⌘K
              </Button>
              <Button
                type="button"
                variant={isLoggedIn ? "secondary" : "outline"}
                size="sm"
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                data-testid="mode-toggle-mobile"
              >
                {isLoggedIn ? "학습 모드" : "비로그인 열람"}
              </Button>
            </div>
          </div>

          <nav
            aria-label="주요 화면 탐색"
            className="flex flex-wrap items-center gap-1.5"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.matchPrefix !== "/" && pathname?.startsWith(item.matchPrefix)) ||
                (pathname === "/" && item.matchPrefix === "/roles");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSearchOpen(true)}
              data-testid="cmd-k-trigger"
            >
              <span>🔍 빠른 검색</span>
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-500">
                ⌘K
              </kbd>
            </Button>

            <Button
              type="button"
              variant={isLoggedIn ? "secondary" : "outline"}
              size="sm"
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              data-testid="session-mode-toggle"
            >
              <Badge variant={isLoggedIn ? "success" : "warning"} className="mr-1">
                {isLoggedIn ? "로그인됨" : "비로그인"}
              </Badge>
              <span>{isLoggedIn ? "열람 모드로 전환" : "학습 모드로 전환"}</span>
            </Button>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/50 p-4 pt-16"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="문항(ReAct, 편향-분산, Attention) 또는 강의(CS329Z) 검색..."
                className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                autoFocus
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(false)}
              >
                닫기
              </Button>
            </div>

            <div className="mt-3 max-h-80 space-y-3 overflow-y-auto text-sm">
              <div>
                <p className="mb-1.5 text-xs font-semibold text-slate-400">
                  면접 문항 ({filteredQuestions.length})
                </p>
                <div className="space-y-1">
                  {filteredQuestions.map((q) => (
                    <Link
                      key={q.id}
                      href={`/questions/${q.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="block rounded-lg p-2 hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="info">{q.type.toUpperCase()}</Badge>
                        <span className="font-medium text-slate-800 line-clamp-1">
                          {q.promptMd.replace(/\*\*/g, "")}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-1.5 text-xs font-semibold text-slate-400">
                  강의 + Syllabus Slides ({filteredLectures.length})
                </p>
                <div className="space-y-1">
                  {filteredLectures.map((l) => (
                    <Link
                      key={l.id}
                      href={`/lectures/${l.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="block rounded-lg p-2 hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{l.course}</Badge>
                        <span className="font-medium text-slate-800">{l.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
