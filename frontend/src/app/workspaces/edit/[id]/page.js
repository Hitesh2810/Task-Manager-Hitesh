"use client";

import { useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { WorkspaceForm } from "@/components/workspaces/workspace-form";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function EditWorkspacePage({ params }) {
  const { activeWorkspace, fetchWorkspace } = useWorkspaceStore();
  useEffect(() => { fetchWorkspace(params.id).catch(() => {}); }, [fetchWorkspace, params.id]);
  return <AppShell title="Edit Workspace" subtitle="Tune workspace identity and settings.">{activeWorkspace && <WorkspaceForm workspace={activeWorkspace} />}</AppShell>;
}
