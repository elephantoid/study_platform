import type { Metadata } from "next";
import "./globals.css";
import { AppHeader, DemoSessionProvider } from "@/components/layout/app-header";

export const metadata: Metadata = {
  title: "AI Tech Study Platform — 면접 간격 반복 & Stanford/IBM 강의 학습",
  description:
    "ML Engineer · Research Scientist · Agent Engineer · Data Scientist 맞춤형 기술 면접(3단계 꼬리질문) 및 Stanford CS329Z 강의 + Syllabus Slides 학습 플랫폼",
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
