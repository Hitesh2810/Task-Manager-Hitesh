"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { TaskTable } from "@/components/tasks/task-table";
import { taskService } from "@/services/taskService";
import { unwrapList } from "@/lib/utils";

export default function OverdueTasksPage() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => { taskService.overdue().then(({ data }) => setTasks(unwrapList(data))).catch(() => {}); }, []);
  return <AppShell title="Overdue Tasks" subtitle="A focused recovery queue for slipped deadlines."><TaskTable tasks={tasks} /></AppShell>;
}
