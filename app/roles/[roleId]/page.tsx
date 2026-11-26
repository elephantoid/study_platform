import { notFound } from "next/navigation";
import { RoleDashboardView } from "@/components/dashboard/role-dashboard-view";
import { getDashboard } from "@/lib/content/load";
import { ROLE_IDS, type RoleId } from "@/lib/content/types";
import { DEMO_REVIEW_QUEUE } from "@/lib/demo/review-queue";

// 없는 직무는 404. 다른 직무 대시보드로 대신 보여 주지 않는다.
export const dynamicParams = false;

export function generateStaticParams() {
  return ROLE_IDS.map((roleId) => ({ roleId }));
}

export default async function RolePage({ params }: { params: Promise<{ roleId: string }> }) {
  const { roleId } = await params;
  if (!ROLE_IDS.includes(roleId as RoleId)) notFound();
  return <RoleDashboardView dashboard={getDashboard(roleId as RoleId)} demoDueCount={DEMO_REVIEW_QUEUE.items.length} />;
}
