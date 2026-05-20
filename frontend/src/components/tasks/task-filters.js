"use client";

import { Search } from "lucide-react";
import { TASK_PRIORITIES, TASK_STATUSES } from "@/lib/constants";
import { Input, Select } from "@/components/ui/input";

export function TaskFilters({ filters, onChange }) {
  return (
    <div className="glass-panel grid gap-3 rounded-2xl p-3 md:grid-cols-[1fr_180px_180px_180px]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
        <Input className="pl-9" placeholder="Search tasks..." value={filters.search || ""} onChange={(event) => onChange({ search: event.target.value })} />
      </div>
      <Select value={filters.status || ""} onChange={(event) => onChange({ status: event.target.value })}>
        <option value="">All statuses</option>
        {TASK_STATUSES.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
      </Select>
      <Select value={filters.priority || ""} onChange={(event) => onChange({ priority: event.target.value })}>
        <option value="">All priorities</option>
        {TASK_PRIORITIES.map((priority) => <option key={priority.value} value={priority.value}>{priority.label}</option>)}
      </Select>
      <Select value={filters.ordering || "-created_at"} onChange={(event) => onChange({ ordering: event.target.value })}>
        <option value="-created_at">Newest</option>
        <option value="due_date">Due date</option>
        <option value="-priority">Priority</option>
        <option value="status">Status</option>
      </Select>
    </div>
  );
}
