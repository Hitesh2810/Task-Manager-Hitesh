"use client";

import { Bell, CheckCircle2, Clock, Layers3, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { AnimatedMenu } from "@/components/layout/animated-menu";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProductivityChart, WorkspacePerformanceChart } from "@/components/dashboard/analytics-chart";
import { TaskPulse } from "@/components/dashboard/task-pulse";
import { useTaskStore } from "@/store/taskStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { taskCompletion } from "@/lib/utils";

export default function DashboardPage() {
  const { tasks, fetchTasks } = useTaskStore();
  const { workspaces, fetchWorkspaces } = useWorkspaceStore();
  const { unreadCount, fetchUnreadCount, notifications, fetchNotifications } = useNotificationStore();
  const { user, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !user) router.push("/login");
  }, [hydrated, user, router]);

  useEffect(() => {
    fetchTasks().catch(() => {});
    fetchWorkspaces().catch(() => {});
    fetchUnreadCount().catch(() => {});
    fetchNotifications().catch(() => {});
  }, [fetchTasks, fetchWorkspaces, fetchUnreadCount, fetchNotifications]);

  const completed = tasks.filter((task) => task.status === "completed").length;
  const upcoming = tasks.filter((task) => task.due_date && task.status !== "completed").slice(0, 5);

  return (
    <AppShell
      title="Dashboard"
      subtitle="A cinematic command layer for your workspaces, tasks, focus loops, and team signal."
      actions={<Button asChild><Link href="/tasks/create"><Plus size={17} />New task</Link></Button>}
    >
      <AnimatedMenu>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total tasks" value={tasks.length} icon={Layers3} />
          <StatCard label="Completed" value={completed} icon={CheckCircle2} tone="from-emerald-500 to-teal-300" />
          <StatCard label="Completion" value={`${taskCompletion(tasks)}%`} icon={Sparkles} tone="from-violet-500 to-sky-400" />
          <StatCard label="Unread" value={unreadCount} icon={Bell} tone="from-rose-500 to-amber-300" />
        </div>
        <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
          <ProductivityChart />
          <TaskPulse tasks={upcoming} />
        </div>
        <div className="grid gap-5 xl:grid-cols-[.85fr_1.15fr]">
          <WorkspacePerformanceChart workspaces={workspaces} />
          <div className="glass-panel rounded-2xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Recent Notifications</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Realtime-style activity stream</p>
              </div>
              <Clock size={18} className="text-sky-400" />
            </div>
            <div className="space-y-3">
              {notifications.slice(0, 5).map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-white/50 p-3 dark:bg-white/5">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.message || item.type}</p>
                </div>
              ))}
              {!notifications.length && <p className="text-sm text-slate-500">No notifications yet.</p>}
            </div>
          </div>
        </div>
      </AnimatedMenu>
    </AppShell>
  );
}
