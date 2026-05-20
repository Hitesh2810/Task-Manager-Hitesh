import { cn } from "@/lib/utils";

export function Card({ className, children }) {
  return <div className={cn("glass-panel rounded-2xl p-5", className)}>{children}</div>;
}

export function CardHeader({ className, children }) {
  return <div className={cn("mb-4 flex items-start justify-between gap-4", className)}>{children}</div>;
}

export function CardTitle({ className, children }) {
  return <h3 className={cn("text-base font-semibold text-slate-950 dark:text-white", className)}>{children}</h3>;
}

export function CardDescription({ className, children }) {
  return <p className={cn("text-sm text-slate-500 dark:text-slate-400", className)}>{children}</p>;
}
