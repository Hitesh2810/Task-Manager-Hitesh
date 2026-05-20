"use client";

import Link from "next/link";
import { CalendarPlus, MessageSquarePlus, Plus, UsersRound } from "lucide-react";

export function FloatingDock() {
  const actions = [
    { href: "/tasks/create", icon: Plus, label: "Task" },
    { href: "/workspaces/create", icon: UsersRound, label: "Workspace" },
    { href: "/tasks/upcoming", icon: CalendarPlus, label: "Upcoming" },
    { href: "/notifications", icon: MessageSquarePlus, label: "Inbox" },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 z-30 hidden -translate-x-1/2 rounded-full border border-white/10 bg-slate-950/75 p-2 text-white shadow-2xl backdrop-blur-2xl lg:flex">
      {actions.map(({ href, icon: Icon, label }) => (
        <Link key={href} href={href} className="group relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-white hover:text-slate-950">
          <Icon size={18} />
          <span className="absolute -top-9 scale-90 rounded-full bg-slate-950 px-2 py-1 text-xs text-white opacity-0 transition group-hover:scale-100 group-hover:opacity-100">
            {label}
          </span>
        </Link>
      ))}
    </div>
  );
}
