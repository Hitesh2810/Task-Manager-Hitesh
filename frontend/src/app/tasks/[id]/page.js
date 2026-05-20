"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Archive, Edit3, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChecklistPanel, CommentsPanel, NotesPanel } from "@/components/tasks/task-detail-panels";
import { useTaskStore } from "@/store/taskStore";
import { formatDate, priorityTone, statusLabel } from "@/lib/utils";
import { taskService } from "@/services/taskService";

export default function TaskDetailPage({ params }) {
  const { activeTask, fetchTask } = useTaskStore();

  useEffect(() => {
    fetchTask(params.id).catch(() => {});
  }, [fetchTask, params.id]);

  async function archive() {
    await taskService.archive(params.id);
    toast.success("Task archived");
    fetchTask(params.id);
  }

  async function restore() {
    await taskService.restore(params.id);
    toast.success("Task restored");
    fetchTask(params.id);
  }

  if (!activeTask) {
    return <AppShell title="Task detail" subtitle="Loading task..." />;
  }

  return (
    <AppShell
      title={activeTask.title}
      subtitle={activeTask.description || "Task detail, collaboration, checklist, notes, and attachments."}
      actions={
        <>
          <Button variant="outline" asChild><Link href={`/tasks/edit/${activeTask.id}`}><Edit3 size={16} />Edit</Link></Button>
          <Button variant="outline" onClick={archive}><Archive size={16} />Archive</Button>
          <Button variant="ghost" onClick={restore}><RotateCcw size={16} />Restore</Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[.8fr_1.2fr]">
        <Card className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge className={priorityTone(activeTask.priority)}>{activeTask.priority}</Badge>
            <Badge className="border-sky-400/20 bg-sky-400/15 text-sky-300">{statusLabel(activeTask.status)}</Badge>
          </div>
          <dl className="grid gap-4 text-sm">
            <div><dt className="text-slate-500">Start</dt><dd className="font-semibold">{formatDate(activeTask.start_date)}</dd></div>
            <div><dt className="text-slate-500">Due</dt><dd className="font-semibold">{formatDate(activeTask.due_date)}</dd></div>
            <div><dt className="text-slate-500">Reminder</dt><dd className="font-semibold">{formatDate(activeTask.reminder_time)}</dd></div>
            <div><dt className="text-slate-500">Notes</dt><dd className="leading-6">{activeTask.notes || "No notes yet."}</dd></div>
          </dl>
        </Card>
        <div className="space-y-5">
          <ChecklistPanel task={activeTask} onRefresh={() => fetchTask(params.id)} />
          <CommentsPanel task={activeTask} onRefresh={() => fetchTask(params.id)} />
          <NotesPanel task={activeTask} onRefresh={() => fetchTask(params.id)} />
        </div>
      </div>
    </AppShell>
  );
}
