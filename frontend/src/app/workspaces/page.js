"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { WorkspaceCard } from "@/components/workspaces/workspace-card";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function WorkspacesPage() {
  const { workspaces, fetchWorkspaces } = useWorkspaceStore();
  useEffect(() => { fetchWorkspaces().catch(() => {}); }, [fetchWorkspaces]);
  return (
    <AppShell title="Workspaces" subtitle="Design team spaces with members, analytics, and task systems." actions={<Button asChild><Link href="/workspaces/create"><Plus size={17} />New workspace</Link></Button>}>
      {workspaces.length ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{workspaces.map((workspace) => <WorkspaceCard key={workspace.id} workspace={workspace} />)}</div> : <EmptyState title="No workspaces yet" description="Create a workspace to group people, tasks, and priorities." />}
    </AppShell>
  );
}
