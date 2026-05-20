"use client";

import { motion } from "framer-motion";
import { Bell, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotificationItem({ notification, onRead }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel flex items-center justify-between gap-4 rounded-2xl p-4"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-400">
          {notification.is_read ? <CheckCircle2 size={20} /> : <Bell size={20} />}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">{notification.title}</p>
          <p className="line-clamp-1 text-xs text-slate-500 dark:text-slate-400">{notification.message || notification.type}</p>
        </div>
      </div>
      {!notification.is_read && <Button variant="outline" onClick={() => onRead(notification.id)}>Mark read</Button>}
    </motion.div>
  );
}
