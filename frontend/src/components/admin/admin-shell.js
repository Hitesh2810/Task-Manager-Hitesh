"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAdminStore } from "@/store/adminStore";
import { AnimatedBackground } from "@/components/visuals/animated-background";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/tasks", label: "Tasks" },
  { href: "/admin/workspaces", label: "Workspaces" },
  { href: "/admin/notifications", label: "Notifications" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({ title, subtitle, children }) {
  const router = useRouter();
  const { user, hydrated, logout } = useAdminStore();

  useEffect(() => {
    if (hydrated && user && user.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [hydrated, user, router]);

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <AnimatedBackground />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-2xl"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-400/80">Admin Control</p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">{title}</h1>
              {subtitle && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{subtitle}</p>}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800">
                  {item.label}
                </Link>
              ))}
              <Button type="button" variant="ghost" onClick={async () => { await logout(); router.push("/admin/login"); }}>
                Logout
              </Button>
            </div>
          </div>
        </motion.header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
