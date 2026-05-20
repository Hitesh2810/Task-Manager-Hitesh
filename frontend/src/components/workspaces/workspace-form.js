"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Field } from "@/components/auth/auth-form";
import { useWorkspaceStore } from "@/store/workspaceStore";

export function WorkspaceForm({ workspace }) {
  const router = useRouter();
  const { createWorkspace, updateWorkspace } = useWorkspaceStore();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: workspace || { color: "#2563eb" },
  });

  async function onSubmit(values) {
    const saved = workspace?.id ? await updateWorkspace(workspace.id, values) : await createWorkspace(values);
    toast.success(workspace?.id ? "Workspace updated" : "Workspace created");
    router.push(`/workspaces/${saved.id}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-panel grid gap-5 rounded-3xl p-5 md:grid-cols-2">
      <Field label="Workspace name" error={errors.name}><Input {...register("name", { required: "Name is required" })} /></Field>
      <Field label="Color"><Input type="color" className="h-11 p-1" {...register("color")} /></Field>
      <div className="md:col-span-2"><Field label="Description"><Textarea {...register("description")} /></Field></div>
      <div className="md:col-span-2 flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
        <Button disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save workspace"}</Button>
      </div>
    </form>
  );
}
