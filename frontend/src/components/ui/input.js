"use client";

import { cn } from "@/lib/utils";

export function Input({ className, error, ...props }) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-white/10 bg-white/70 px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-400/15 dark:bg-white/5 dark:text-white",
        error && "border-rose-400 focus:border-rose-400 focus:ring-rose-400/15",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({ className, error, ...props }) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-xl border border-white/10 bg-white/70 px-3 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-400/15 dark:bg-white/5 dark:text-white",
        error && "border-rose-400 focus:border-rose-400 focus:ring-rose-400/15",
        className
      )}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-xl border border-white/10 bg-white/70 px-3 text-sm text-slate-950 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-400/15 dark:bg-slate-950 dark:text-white",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
