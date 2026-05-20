"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate, priorityTone, statusLabel } from "@/lib/utils";

export function TaskCard({ task }) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} layout>
      <Link href={`/tasks/${task.id}`} className="block rounded-2xl border border-white/10 bg-white/70 p-4 shadow-sm transition hover:shadow-xl dark:bg-white/5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-bold">{task.title}</h3>
          <Badge className={priorityTone(task.priority)}>{task.priority}</Badge>
        </div>
        <p className="line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{task.description || task.notes || "No description added yet."}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1"><CalendarDays size={14} />{formatDate(task.due_date)}</span>
          <span className="flex items-center gap-1"><MessageCircle size={14} />{task.comments?.length || 0}</span>
        </div>
        <div className="mt-3 text-xs font-semibold text-sky-500">{statusLabel(task.status)}</div>
      </Link>
    </motion.div>
  );
}
