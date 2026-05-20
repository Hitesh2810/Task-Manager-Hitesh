"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { TASK_PRIORITIES, TASK_STATUSES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Field } from "@/components/auth/auth-form";
import { useTaskStore } from "@/store/taskStore";
import { useWorkspaceStore } from "@/store/workspaceStore";

export function TaskForm({ task }) {
  const router = useRouter();
  const { createTask, updateTask } = useTaskStore();
  const { workspaces, fetchWorkspaces } = useWorkspaceStore();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: task || {
      status: "todo",
      priority: "medium",
      is_recurring: false,
      recurring_rule: "",
    },
  });

  useEffect(() => {
    fetchWorkspaces().catch(() => {});
  }, [fetchWorkspaces]);

  async function onSubmit(values) {
    const payload = {
      ...values,
      workspace: values.workspace || null,
      due_date: values.due_date || null,
      start_date: values.start_date || null,
      reminder_time: values.reminder_time || null,
    };
    const saved = task?.id ? await updateTask(task.id, payload) : await createTask(payload);
    toast.success(task?.id ? "Task updated" : "Task created");
    router.push(`/tasks/${saved.id}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-panel grid gap-5 rounded-3xl p-5 md:grid-cols-2">
      <Field label="Title" error={errors.title}>
        <Input placeholder="Design onboarding sprint" {...register("title", { required: "Title is required" })} />
      </Field>
      <Field label="Workspace">
        <Select {...register("workspace")}>
          <option value="">Personal task</option>
          {workspaces.map((workspace) => <option key={workspace.id} value={workspace.id}>{workspace.name}</option>)}
        </Select>
      </Field>
      <Field label="Status">
        <Select {...register("status")}>{TASK_STATUSES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</Select>
      </Field>
      <Field label="Priority">
        <Select {...register("priority")}>{TASK_PRIORITIES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</Select>
      </Field>
      <Field label="Start date"><Input type="datetime-local" {...register("start_date")} /></Field>
      <Field label="Due date"><Input type="datetime-local" {...register("due_date")} /></Field>
      <Field label="Reminder"><Input type="datetime-local" {...register("reminder_time")} /></Field>
      <Field label="Recurring rule"><Input placeholder="weekly, monthly, custom..." {...register("recurring_rule")} /></Field>
      <div className="md:col-span-2"><Field label="Description"><Textarea {...register("description")} /></Field></div>
      <div className="md:col-span-2"><Field label="Notes"><Textarea {...register("notes")} /></Field></div>
      <div className="md:col-span-2 flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
        <Button disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save task"}</Button>
      </div>
    </form>
  );
}
