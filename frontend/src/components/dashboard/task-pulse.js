"use client";

import { motion } from "framer-motion";
import { formatDate, priorityTone } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function TaskPulse({ tasks = [] }) {
  const visible = tasks.slice(0, 5);
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Upcoming Orbit</CardTitle>
          <CardDescription>Tasks moving toward their due date</CardDescription>
        </div>
      </CardHeader>
      <div className="space-y-3">
        {visible.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/50 p-3 dark:bg-white/5"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{task.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{formatDate(task.due_date)}</p>
            </div>
            <Badge className={priorityTone(task.priority)}>{task.priority}</Badge>
          </motion.div>
        ))}
        {!visible.length && <p className="rounded-2xl bg-white/5 p-4 text-sm text-slate-500">No upcoming tasks yet.</p>}
      </div>
    </Card>
  );
}
