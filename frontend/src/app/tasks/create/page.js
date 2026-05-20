import { AppShell } from "@/components/layout/app-shell";
import { TaskForm } from "@/components/tasks/task-form";

export default function CreateTaskPage() {
  return (
    <AppShell title="Create Task" subtitle="Capture a new task with workspace, reminder, recurrence, notes, and priority.">
      <TaskForm />
    </AppShell>
  );
}
