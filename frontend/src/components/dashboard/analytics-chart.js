"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const weekly = [
  { day: "Mon", done: 8, created: 12 },
  { day: "Tue", done: 12, created: 16 },
  { day: "Wed", done: 14, created: 18 },
  { day: "Thu", done: 10, created: 13 },
  { day: "Fri", done: 18, created: 22 },
  { day: "Sat", done: 9, created: 10 },
  { day: "Sun", done: 15, created: 17 },
];

export function ProductivityChart() {
  return (
    <Card className="min-h-80">
      <CardHeader>
        <div>
          <CardTitle>Productivity Pulse</CardTitle>
          <CardDescription>Weekly completion and creation trends</CardDescription>
        </div>
      </CardHeader>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weekly}>
            <defs>
              <linearGradient id="done" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.18)" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,.1)", borderRadius: 14 }} />
            <Area type="monotone" dataKey="done" stroke="#38bdf8" fill="url(#done)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function WorkspacePerformanceChart({ workspaces = [] }) {
  const data = (workspaces.length ? workspaces : [{ name: "Core", members: [] }, { name: "Design", members: [] }, { name: "Launch", members: [] }]).map((workspace, index) => ({
    name: workspace.name?.slice(0, 10) || `Space ${index + 1}`,
    score: (workspace.members?.length || index + 2) * 12,
  }));

  return (
    <Card className="min-h-80">
      <CardHeader>
        <div>
          <CardTitle>Workspace Performance</CardTitle>
          <CardDescription>Team density and workspace signal</CardDescription>
        </div>
      </CardHeader>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.18)" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,.1)", borderRadius: 14 }} />
            <Bar dataKey="score" fill="#5eead4" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
