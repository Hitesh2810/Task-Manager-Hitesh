import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate, priorityTone, statusLabel } from "@/lib/utils";

export function TaskTable({ tasks = [] }) {
  return (
    <div className="glass-panel overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-4">Task</th>
              <th className="p-4">Status</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Due</th>
              <th className="p-4">Workspace</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b border-white/5">
                <td className="p-4 font-semibold"><Link href={`/tasks/${task.id}`}>{task.title}</Link></td>
                <td className="p-4">{statusLabel(task.status)}</td>
                <td className="p-4"><Badge className={priorityTone(task.priority)}>{task.priority}</Badge></td>
                <td className="p-4 text-slate-500">{formatDate(task.due_date)}</td>
                <td className="p-4 text-slate-500">{task.workspace || "Personal"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
