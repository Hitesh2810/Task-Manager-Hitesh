"use client";

import { useRouter } from "next/navigation";
import { Bell, LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useAuthStore } from "@/store/authStore";

export function TopNavbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-20 mb-6 flex items-center justify-between gap-3 rounded-b-3xl border-b border-white/10 bg-background/70 px-4 py-4 backdrop-blur-2xl lg:px-0">
      <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/60 px-3 py-2 dark:bg-white/5 md:flex">
        <Search size={18} className="text-slate-400" />
        <input className="w-full bg-transparent text-sm outline-none" placeholder="Search tasks, workspaces, notes..." />
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">
        <Button variant="ghost" className="h-10 w-10 rounded-full px-0" onClick={() => router.push("/notifications")}>
          <Bell size={18} />
        </Button>
        <ThemeSwitcher />
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold">{user?.full_name || user?.username || "Operator"}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role || "user"}</p>
        </div>
        <Button variant="outline" className="h-10 rounded-full px-3" onClick={handleLogout}>
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
