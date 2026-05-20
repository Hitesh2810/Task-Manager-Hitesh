import { cn } from "@/lib/utils";

export function Skeleton({ className }) {
  return <div className={cn("animate-pulse rounded-xl bg-slate-200/70 dark:bg-white/10", className)} />;
}

export function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="glass-panel rounded-3xl p-8 text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
        <p className="text-sm text-slate-500 dark:text-slate-300">Synchronizing your workspace</p>
      </div>
    </div>
  );
}
