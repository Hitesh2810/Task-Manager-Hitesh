"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { KanbanBoard } from "@/components/tasks/kanban-board";
import { taskService } from "@/services/taskService";
import { unwrapList } from "@/lib/utils";

export default function UpcomingTasksPage() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => { taskService.upcoming().then(({ data }) => setTasks(unwrapList(data))).catch(() => {}); }, []);
  return <AppShell title="Upcoming Tasks" subtitle="Everything approaching the horizon."><KanbanBoard tasks={tasks} /></AppShell>;
}
