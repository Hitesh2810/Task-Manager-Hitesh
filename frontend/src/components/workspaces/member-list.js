"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { workspaceService } from "@/services/workspaceService";

export function MemberList({ workspace, onRefresh }) {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("member");

  async function invite() {
    if (!user) return toast.error("Paste a user UUID");
    await workspaceService.invite({ workspace: workspace.id, user, role });
    setUser("");
    toast.success("Member invited");
    onRefresh?.();
  }

  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold">Team Members</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Invite by backend user UUID</p>
        </div>
        <UserPlus className="text-sky-400" size={20} />
      </div>
      <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_150px_auto]">
        <Input placeholder="User UUID" value={user} onChange={(event) => setUser(event.target.value)} />
        <Select value={role} onChange={(event) => setRole(event.target.value)}>
          <option value="member">Member</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </Select>
        <Button onClick={invite}>Invite</Button>
      </div>
      <div className="space-y-3">
        {workspace.members?.map((member) => (
          <div key={member.id} className="flex items-center justify-between rounded-2xl bg-white/50 p-3 dark:bg-white/5">
            <div>
              <p className="text-sm font-semibold">{member.user_detail?.full_name || member.user_detail?.email || member.user}</p>
              <p className="text-xs text-slate-500">{member.user_detail?.email}</p>
            </div>
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold dark:bg-white/10">{member.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
