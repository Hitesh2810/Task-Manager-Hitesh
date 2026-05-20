"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { AnimatedBackground } from "@/components/visuals/animated-background";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { FloatingDock } from "@/components/layout/floating-dock";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { LoadingScreen } from "@/components/ui/skeleton";

export function AppShell({ children, title, subtitle, actions }) {
  const { ready } = useProtectedRoute();
  const { loadProfile } = useAuthStore();

  useEffect(() => {
    if (ready) loadProfile().catch(() => {});
  }, [ready, loadProfile]);

  if (!ready) return <LoadingScreen />;

  return (
    <div className="min-h-screen pb-28 lg:pl-80">
      <AnimatedBackground />
      <Sidebar />
      <main className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
        <TopNavbar />
        <Breadcrumbs />
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">{title}</h1>
            {subtitle && <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400 md:text-base">{subtitle}</p>}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
        {children}
      </main>
      <FloatingDock />
      <MobileNavbar />
    </div>
  );
}
