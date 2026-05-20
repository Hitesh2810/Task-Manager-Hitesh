"use client";

import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { TASK_STATUSES } from "@/lib/constants";
import { TaskCard } from "@/components/tasks/task-card";

export function KanbanBoard({ tasks = [] }) {
  return (
    <DndContext>
      <div className="grid gap-4 xl:grid-cols-5">
        {TASK_STATUSES.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.value);
          return (
            <div key={column.value} className="glass-panel min-h-80 rounded-2xl p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <h3 className="text-sm font-bold">{column.label}</h3>
                <span className="rounded-full bg-white/70 px-2 py-1 text-xs font-bold dark:bg-white/10">{columnTasks.length}</span>
              </div>
              <SortableContext items={columnTasks.map((task) => task.id)}>
                <div className="space-y-3">
                  {columnTasks.map((task) => <TaskCard key={task.id} task={task} />)}
                </div>
              </SortableContext>
            </div>
          );
        })}
      </div>
    </DndContext>
  );
}
