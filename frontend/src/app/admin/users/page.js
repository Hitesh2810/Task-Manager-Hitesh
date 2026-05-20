"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { useAdminStore } from "@/store/adminStore";
import { useRouter } from "next/navigation";
import { userService } from "@/services/userService";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
  const { user: admin, hydrated } = useAdminStore();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hydrated && !admin) router.push("/admin/login");
  }, [hydrated, admin, router]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      const { data } = await userService.list();
      setUsers(data.results || data || []);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  async function handleBlock(id) {
    try {
      await userService.block(id);
      toast.success("User blocked");
      fetchUsers();
    } catch {
      toast.error("Failed to block user");
    }
  }

  async function handleUnblock(id) {
    try {
      await userService.unblock(id);
      toast.success("User unblocked");
      fetchUsers();
    } catch {
      toast.error("Failed to unblock user");
    }
  }

  return (
    <AdminShell title="Users" subtitle="Manage registered users.">
      <div className="space-y-4">
        <div className="glass-panel rounded-2xl p-4">
          <h3 className="font-semibold">Users</h3>
          {loading && <p className="text-sm text-slate-400">Loading…</p>}
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400">
                  <th className="py-2">Email</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Active</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t border-white/6">
                    <td className="py-3">{u.email}</td>
                    <td className="py-3">{u.full_name || u.username}</td>
                    <td className="py-3">{u.role}</td>
                    <td className="py-3">{String(u.is_active)}</td>
                    <td className="py-3">
                      {u.is_active ? (
                        <button onClick={() => handleBlock(u.id)} className="text-rose-400">Block</button>
                      ) : (
                        <button onClick={() => handleUnblock(u.id)} className="text-emerald-400">Unblock</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
