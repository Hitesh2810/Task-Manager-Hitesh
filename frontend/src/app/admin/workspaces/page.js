"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { useAdminStore } from "@/store/adminStore";

export default function AdminWorkspacesPage() {
  const { user, hydrated } = useAdminStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !user) {
      router.push("/admin/login");
    }
    if (hydrated && user && user.role !== "admin") {
      router.push("/dashboard");
    }
  }, [hydrated, user, router]);

  return (
    <AdminShell title="Admin Workspaces" subtitle="Manage workspace settings for admin users.">
      <div className="glass-panel rounded-3xl p-6 text-slate-300">
        <p>Workspace administration is enabled for approved admin users.</p>
      </div>
    </AdminShell>
  );
}
