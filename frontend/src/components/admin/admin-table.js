import { Badge } from "@/components/ui/badge";

export function AdminTable({ tasks = [], workspaces = [], notifications = [] }) {
  const rows = [
    ...tasks.slice(0, 5).map((item) => ({ type: "Task", name: item.title, status: item.status })),
    ...workspaces.slice(0, 5).map((item) => ({ type: "Workspace", name: item.name, status: item.is_archived ? "archived" : "active" })),
    ...notifications.slice(0, 5).map((item) => ({ type: "Notification", name: item.title, status: item.is_read ? "read" : "unread" })),
  ].slice(0, 10);

  return (
    <div className="glass-panel overflow-hidden rounded-2xl">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-white/10 text-xs uppercase text-slate-500">
          <tr><th className="p-4">Type</th><th className="p-4">Name</th><th className="p-4">Status</th></tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.type}-${index}`} className="border-b border-white/5">
              <td className="p-4 font-semibold">{row.type}</td>
              <td className="p-4">{row.name}</td>
              <td className="p-4"><Badge className="border-sky-400/20 bg-sky-400/15 text-sky-300">{row.status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
