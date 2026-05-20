"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden aurora-grid">
      <motion.div
        className="absolute left-[8%] top-[12%] h-44 w-44 rounded-[2rem] border border-sky-300/20 bg-sky-400/15 blur-sm"
        animate={{ y: [0, 24, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] top-[18%] h-56 w-56 rounded-full border border-teal-300/20 bg-teal-400/10 blur-md"
        animate={{ y: [0, -28, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[8%] left-[40%] h-64 w-64 rounded-[4rem] border border-rose-300/20 bg-rose-400/10 blur-md"
        animate={{ x: [0, 22, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
