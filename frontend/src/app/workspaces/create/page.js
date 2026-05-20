import { AppShell } from "@/components/layout/app-shell";
import { WorkspaceForm } from "@/components/workspaces/workspace-form";

export default function CreateWorkspacePage() {
  return <AppShell title="Create Workspace" subtitle="Set up a polished team space."><WorkspaceForm /></AppShell>;
}
