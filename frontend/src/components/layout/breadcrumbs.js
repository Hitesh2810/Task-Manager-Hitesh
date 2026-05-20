"use client";

import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const parts = usePathname().split("/").filter(Boolean);
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
      <span>TaskSphere</span>
      {parts.map((part) => (
        <span key={part} className="flex items-center gap-2">
          <span>/</span>
          <span className="capitalize">{part.replaceAll("-", " ")}</span>
        </span>
      ))}
    </div>
  );
}
