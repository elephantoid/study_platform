import { RoleDashboardView } from "@/components/dashboard/role-dashboard-view";
import type { RoleId } from "@/app/_mock/types";

export default async function RolePage({
  params,
}: {
  params: Promise<{ roleId: string }>;
}) {
  const { roleId } = await params;
  const validRoles: RoleId[] = ["mle", "rs", "agent", "ds"];
  const normalized: RoleId = validRoles.includes(roleId as RoleId)
    ? (roleId as RoleId)
    : "agent";

  return <RoleDashboardView initialRoleId={normalized} />;
}
