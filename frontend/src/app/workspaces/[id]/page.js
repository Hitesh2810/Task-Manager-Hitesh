"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Archive, Edit3, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MemberList } from "@/components/workspaces/member-list";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { workspaceService } from "@/services/workspaceService";

export default function WorkspaceDetailPage({ params }) {
  const { activeWorkspace, fetchWorkspace } = useWorkspaceStore();
  useEffect(() => { fetchWorkspace(params.id).catch(() => {}); }, [fetchWorkspace, params.id]);

  async function archive() {
    await workspaceService.archive(params.id);
    toast.success("Workspace archived");
    fetchWorkspace(params.id);
  }

  async function restore() {
    await workspaceService.restore(params.id);
    toast.success("Workspace restored");
    fetchWorkspace(params.id);
  }

  if (!activeWorkspace) return <AppShell title="Workspace" subtitle="Loading..." />;

  return (
    <AppShell
      title={activeWorkspace.name}
      subtitle={activeWorkspace.description || "Workspace overview, members, and analytics."}
      actions={
        <>
          <Button variant="outline" asChild><Link href={`/workspaces/edit/${activeWorkspace.id}`}><Edit3 size={16} />Edit</Link></Button>
          <Button variant="outline" onClick={archive}><Archive size={16} />Archive</Button>
          <Button variant="ghost" onClick={restore}><RotateCcw size={16} />Restore</Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[.8fr_1.2fr]">
        <Card>
          <div className="mb-5 h-32 rounded-3xl" style={{ background: `linear-gradient(135deg, ${activeWorkspace.color || "#2563eb"}, rgba(94,234,212,.55))` }} />
          <p className="text-sm text-slate-500 dark:text-slate-400">Slug</p>
          <p className="font-semibold">{activeWorkspace.slug}</p>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Status</p>
          <p className="font-semibold">{activeWorkspace.is_archived ? "Archived" : "Active"}</p>
        </Card>
        <MemberList workspace={activeWorkspace} onRefresh={() => fetchWorkspace(params.id)} />
      </div>
    </AppShell>
  );
}
