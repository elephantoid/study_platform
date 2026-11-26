import { RoleDashboardView } from "@/components/dashboard/role-dashboard-view";
import { getDashboard } from "@/lib/content/load";
import { DEMO_REVIEW_QUEUE } from "@/lib/demo/review-queue";

// 컨테이너 HEALTHCHECK 가 `/` 의 2xx 를 보므로 redirect 대신 기본 직무 대시보드를 그린다.
export default function HomePage() {
  return <RoleDashboardView dashboard={getDashboard("agent")} demoDueCount={DEMO_REVIEW_QUEUE.items.length} />;
}
