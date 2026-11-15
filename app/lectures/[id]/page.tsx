import * as React from "react";
import { LectureStudyView } from "@/components/lectures/lecture-study-view";

export default async function LecturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <React.Suspense
      fallback={<div className="p-6 text-sm text-slate-500">강의 및 슬라이드 정보를 불러오는 중...</div>}
    >
      <LectureStudyView lectureId={id} />
    </React.Suspense>
  );
}
