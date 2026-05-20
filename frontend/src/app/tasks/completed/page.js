"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { TaskTable } from "@/components/tasks/task-table";
import { taskService } from "@/services/taskService";
import { unwrapList } from "@/lib/utils";

export default function CompletedTasksPage() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => { taskService.completed().then(({ data }) => setTasks(unwrapList(data))).catch(() => {}); }, []);
  return <AppShell title="Completed Tasks" subtitle="A clean record of finished execution."><TaskTable tasks={tasks} /></AppShell>;
}
