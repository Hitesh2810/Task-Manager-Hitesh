"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Archive, UsersRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function WorkspaceCard({ workspace }) {
  return (
    <motion.div whileHover={{ y: -6, rotateX: 3, rotateY: -3 }}>
      <Link href={`/workspaces/${workspace.id}`}>
        <Card className="relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-2xl" style={{ background: workspace.color || "#2563eb" }} />
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ background: workspace.color || "#2563eb" }}>
              <UsersRound size={22} />
            </div>
            {workspace.is_archived && <Badge className="border-amber-400/20 bg-amber-400/15 text-amber-200"><Archive size={12} />Archived</Badge>}
          </div>
          <h3 className="text-xl font-black">{workspace.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{workspace.description || "No description yet."}</p>
          <p className="mt-5 text-sm font-semibold text-sky-500">{workspace.members?.length || 0} members</p>
        </Card>
      </Link>
    </motion.div>
  );
}
