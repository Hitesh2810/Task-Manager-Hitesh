"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Home, ListChecks, PanelsTopLeft, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/tasks", icon: ListChecks, label: "Tasks" },
  { href: "/tasks/create", icon: Plus, label: "Create" },
  { href: "/workspaces", icon: PanelsTopLeft, label: "Spaces" },
  { href: "/notifications", icon: Bell, label: "Alerts" },
];

export function MobileNavbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-3 left-3 right-3 z-40 grid grid-cols-5 rounded-3xl border border-white/10 bg-slate-950/85 p-2 text-white shadow-2xl backdrop-blur-2xl lg:hidden">
      {links.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px]",
            pathname === href ? "bg-white text-slate-950" : "text-slate-400"
          )}
        >
          <Icon size={18} />
          {label}
        </Link>
      ))}
    </nav>
  );
}
