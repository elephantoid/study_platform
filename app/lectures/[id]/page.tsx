import { Suspense } from "react";
import { notFound } from "next/navigation";
import { LectureStudyView } from "@/components/lectures/lecture-study-view";
import { getLecture, listLectures } from "@/lib/content/load";

export const dynamicParams = false;

export function generateStaticParams() {
  return listLectures().map((l) => ({ id: l.id }));
}

export default async function LecturePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // draft 면 getLecture 가 summaryKo·syllabus·slideUnits 를 뺀다. 클라이언트에는 뺀 결과만 간다.
  const lecture = getLecture(id);
  if (!lecture) notFound();
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">강의 정보를 불러오는 중…</div>}>
      <LectureStudyView key={lecture.id} lecture={lecture} />
    </Suspense>
  );
}
