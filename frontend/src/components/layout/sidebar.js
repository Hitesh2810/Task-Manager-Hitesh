"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlarmClock,
  Bell,
  CalendarClock,
  LayoutDashboard,
  ListChecks,
  PanelsTopLeft,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SIDEBAR_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const icons = { LayoutDashboard, ListChecks, CalendarClock, AlarmClock, PanelsTopLeft, Bell, ShieldCheck };

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-4 top-4 z-30 hidden h-[calc(100vh-2rem)] w-72 rounded-3xl border border-white/10 bg-slate-950/75 p-4 text-white shadow-2xl shadow-slate-950/25 backdrop-blur-2xl lg:block">
      <Link href="/dashboard" className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-400/20 text-sky-200">
          <Sparkles size={22} />
        </div>
        <div>
          <p className="text-lg font-black tracking-tight">TaskSphere</p>
          <p className="text-xs text-slate-400">Command center</p>
        </div>
      </Link>
      <nav className="space-y-2">
        {SIDEBAR_LINKS.map((link) => {
          const Icon = icons[link.icon];
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-300 transition",
                active ? "bg-white text-slate-950 shadow-xl shadow-sky-400/10" : "hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-semibold">Premium flow</p>
        <p className="mt-1 text-xs leading-5 text-slate-400">Focus mode, analytics, and workspace intelligence are ready.</p>
      </div>
    </aside>
  );
}
