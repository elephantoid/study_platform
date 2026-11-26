import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import { AppHeader } from "@/components/layout/app-header";
import { DemoSessionProvider } from "@/components/layout/demo-session";

export const metadata: Metadata = {
  title: "AI Tech Study Platform — 면접 간격 반복 & Stanford/IBM 강의 학습",
  description:
    "ML Engineer · Research Scientist · Agent Engineer · Data Scientist 맞춤형 기술 면접 개념·퀴즈 카드(꼬리질문 포함)와 Stanford 강의 학습 플랫폼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased overflow-x-hidden">
        <DemoSessionProvider>
          <div className="flex min-h-screen flex-col overflow-x-hidden">
            <AppHeader />
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </DemoSessionProvider>
      </body>
    </html>
  );
}
