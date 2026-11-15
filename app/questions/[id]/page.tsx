import { QuestionSolveView } from "@/components/questions/question-solve-view";

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <QuestionSolveView questionId={id} />;
}
