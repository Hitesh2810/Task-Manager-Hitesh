"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function StatCard({ label, value, icon: Icon, tone = "from-sky-500 to-teal-400" }) {
  return (
    <motion.div whileHover={{ y: -6, rotateX: 4, rotateY: -4 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
      <Card className="relative overflow-hidden">
        <div className={`absolute -right-8 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${tone} opacity-20 blur-2xl`} />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-black">{value}</p>
          </div>
          {Icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 text-sky-500 dark:bg-white/10">
              <Icon size={22} />
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
