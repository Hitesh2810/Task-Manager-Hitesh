"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { CheckCircle2, Circle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { taskService } from "@/services/taskService";

export function ChecklistPanel({ task, onRefresh }) {
  const [title, setTitle] = useState("");
  async function addItem() {
    if (!title) return;
    await taskService.checklist({ task: task.id, title });
    setTitle("");
    toast.success("Checklist item added");
    onRefresh?.();
  }
  async function complete(id) {
    await taskService.completeChecklist(id);
    toast.success("Checklist completed");
    onRefresh?.();
  }
  return (
    <Card>
      <CardHeader><div><CardTitle>Checklist</CardTitle><CardDescription>Break execution into crisp steps</CardDescription></div></CardHeader>
      <div className="space-y-3">
        {task.checklist_items?.map((item) => (
          <button key={item.id} onClick={() => complete(item.id)} className="flex w-full items-center gap-3 rounded-2xl bg-white/50 p-3 text-left text-sm dark:bg-white/5">
            {item.is_completed ? <CheckCircle2 className="text-emerald-400" size={18} /> : <Circle size={18} />}
            <span className={item.is_completed ? "line-through text-slate-400" : ""}>{item.title}</span>
          </button>
        ))}
        <div className="flex gap-2">
          <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Add checklist item" />
          <Button type="button" onClick={addItem}>Add</Button>
        </div>
      </div>
    </Card>
  );
}

export function CommentsPanel({ task, onRefresh }) {
  const [content, setContent] = useState("");
  async function submit() {
    if (!content) return;
    await taskService.addComment({ task: task.id, content });
    setContent("");
    toast.success("Comment posted");
    onRefresh?.();
  }
  return (
    <Card>
      <CardHeader><div><CardTitle>Comments</CardTitle><CardDescription>Team conversation around the task</CardDescription></div></CardHeader>
      <div className="space-y-3">
        {task.comments?.map((comment) => (
          <div key={comment.id} className="rounded-2xl bg-white/50 p-3 text-sm dark:bg-white/5">
            <p className="font-semibold">{comment.user_email}</p>
            <p className="mt-1 text-slate-500 dark:text-slate-300">{comment.content}</p>
          </div>
        ))}
        <div className="flex gap-2">
          <Input value={content} onChange={(event) => setContent(event.target.value)} placeholder="Write a comment" />
          <Button type="button" onClick={submit}><Send size={16} /></Button>
        </div>
      </div>
    </Card>
  );
}

export function NotesPanel({ task, onRefresh }) {
  const [content, setContent] = useState("");
  async function submit() {
    if (!content) return;
    await taskService.note({ task: task.id, content });
    setContent("");
    toast.success("Note added");
    onRefresh?.();
  }
  return (
    <Card>
      <CardHeader><div><CardTitle>Notes</CardTitle><CardDescription>Private context and execution memory</CardDescription></div></CardHeader>
      <div className="space-y-3">
        {task.task_notes?.map((note) => (
          <div key={note.id} className="rounded-2xl bg-white/50 p-3 text-sm dark:bg-white/5">{note.content}</div>
        ))}
        <Textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Add a note" />
        <Button type="button" onClick={submit}>Add note</Button>
      </div>
    </Card>
  );
}
