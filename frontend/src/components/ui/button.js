"use client";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-slate-950 text-white shadow-xl shadow-sky-500/10 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200",
  ghost: "bg-white/5 text-slate-700 hover:bg-white/15 dark:text-slate-200",
  outline: "border border-white/15 bg-white/5 text-slate-800 hover:bg-white/10 dark:text-white",
  danger: "bg-rose-500 text-white hover:bg-rose-400",
};

export function Button({ className, variant = "primary", asChild = false, ...props }) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition duration-200 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
