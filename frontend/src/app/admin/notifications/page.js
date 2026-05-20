"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { useAdminStore } from "@/store/adminStore";

export default function AdminNotificationsPage() {
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
    <AdminShell title="Admin Notifications" subtitle="Review system notifications and admin alerts.">
      <div className="glass-panel rounded-3xl p-6 text-slate-300">
        <p>Admin notifications are available once an admin user is logged in.</p>
      </div>
    </AdminShell>
  );
}
