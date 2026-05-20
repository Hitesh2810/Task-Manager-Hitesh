"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { useAdminStore } from "@/store/adminStore";

export default function AdminSettingsPage() {
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
    <AdminShell title="Admin Settings" subtitle="Configure admin level system settings.">
      <div className="glass-panel rounded-3xl p-6 text-slate-300">
        <p>Admin settings are protected for users with the admin role.</p>
      </div>
    </AdminShell>
  );
}
