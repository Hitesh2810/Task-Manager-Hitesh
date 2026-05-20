"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LayoutGrid, Plus, Table2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { TaskFilters } from "@/components/tasks/task-filters";
import { KanbanBoard } from "@/components/tasks/kanban-board";
import { TaskTable } from "@/components/tasks/task-table";
import { EmptyState } from "@/components/ui/empty-state";
import { useTaskStore } from "@/store/taskStore";

export default function TasksPage() {
  const [view, setView] = useState("kanban");
  const { tasks, filters, setFilters, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks().catch(() => {});
  }, [fetchTasks, filters]);

  const hasTasks = useMemo(() => tasks.length > 0, [tasks]);

  return (
    <AppShell
      title="Tasks"
      subtitle="Plan, filter, search, archive, and steer every task from a premium command board."
      actions={
        <>
          <Button variant="outline" onClick={() => setView(view === "kanban" ? "table" : "kanban")}>{view === "kanban" ? <Table2 size={17} /> : <LayoutGrid size={17} />}Switch view</Button>
          <Button asChild><Link href="/tasks/create"><Plus size={17} />Create task</Link></Button>
        </>
      }
    >
      <div className="space-y-5">
        <TaskFilters filters={filters} onChange={setFilters} />
        {!hasTasks ? <EmptyState title="No tasks found" description="Create a task or adjust your filters." /> : view === "kanban" ? <KanbanBoard tasks={tasks} /> : <TaskTable tasks={tasks} />}
      </div>
    </AppShell>
  );
}
