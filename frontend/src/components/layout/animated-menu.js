"use client";

import { motion } from "framer-motion";

export function AnimatedMenu({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="space-y-6"
    >
      {children}
    </motion.div>
  );
}
