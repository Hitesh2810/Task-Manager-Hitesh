"use client";

import { useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { TaskForm } from "@/components/tasks/task-form";
import { useTaskStore } from "@/store/taskStore";

export default function EditTaskPage({ params }) {
  const { activeTask, fetchTask } = useTaskStore();
  useEffect(() => { fetchTask(params.id).catch(() => {}); }, [fetchTask, params.id]);
  return (
    <AppShell title="Edit Task" subtitle="Update task status, assignment, timing, recurrence, and notes.">
      {activeTask && <TaskForm task={activeTask} />}
    </AppShell>
  );
}
