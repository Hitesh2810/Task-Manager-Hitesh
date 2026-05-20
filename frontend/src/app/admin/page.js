"use client";

import { Activity, Bell, ShieldCheck, UsersRound } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminMetric } from "@/components/admin/admin-metric";
import { AdminTable } from "@/components/admin/admin-table";
import { ProductivityChart } from "@/components/dashboard/analytics-chart";
import { useTaskStore } from "@/store/taskStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAdminStore } from "@/store/adminStore";

export default function AdminPage() {
  const { tasks, fetchTasks } = useTaskStore();
  const { workspaces, fetchWorkspaces } = useWorkspaceStore();
  const { notifications, fetchNotifications } = useNotificationStore();
  const { user, hydrated } = useAdminStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !user) {
      router.push("/admin/login");
    }
    if (hydrated && user && user.role !== "admin") {
      router.push("/dashboard");
    }
  }, [hydrated, user, router]);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchTasks().catch(() => {});
      fetchWorkspaces().catch(() => {});
      fetchNotifications().catch(() => {});
    }
  }, [user, fetchTasks, fetchWorkspaces, fetchNotifications]);

  return (
    <AdminShell title="Admin Control" subtitle="Enterprise-grade operational overview for users, tasks, workspaces, notifications, and activity.">
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AdminMetric label="Task inventory" value={tasks.length} detail="All accessible task records" icon={Activity} />
          <AdminMetric label="Workspace graph" value={workspaces.length} detail="Active and archived spaces" icon={UsersRound} />
          <AdminMetric label="Notifications" value={notifications.length} detail="System activity events" icon={Bell} />
          <AdminMetric label="Security" value="JWT" detail="SimpleJWT protected API" icon={ShieldCheck} />
        </div>
        <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
          <ProductivityChart />
          <AdminTable tasks={tasks} workspaces={workspaces} notifications={notifications} />
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <h3 className="font-bold">Admin actions</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            User deletion, blocking, and activity-log mutations are prepared as UI surfaces. Add dedicated backend admin endpoints to enable those write operations safely.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
