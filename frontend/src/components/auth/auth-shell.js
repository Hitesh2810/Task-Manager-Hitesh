"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { AnimatedBackground } from "@/components/visuals/animated-background";

export function AuthShell({ title, subtitle, switchText, switchHref, switchLabel, children }) {
  return (
    <main className="relative grid min-h-screen overflow-hidden px-4 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
      <AnimatedBackground />
      <section className="hidden flex-col justify-between rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 text-white shadow-2xl backdrop-blur-2xl lg:flex">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/20 text-sky-200">
            <Sparkles size={24} />
          </div>
          <div>
            <p className="text-xl font-black">TaskSphere</p>
            <p className="text-xs text-slate-400">Premium productivity OS</p>
          </div>
        </Link>
        <div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl text-6xl font-black leading-tight tracking-tight text-gradient"
          >
            Your workday, rendered in motion.
          </motion.p>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
            Plan workspaces, orchestrate tasks, track momentum, and keep teams aligned in one polished command center.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          {["Live focus", "JWT secure", "Supabase ready"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              {item}
            </div>
          ))}
        </div>
      </section>
      <section className="flex items-center justify-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="glass-panel w-full max-w-md rounded-[2rem] p-6 md:p-8"
        >
          <div className="mb-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-sky-500">TaskSphere</p>
            <h1 className="text-3xl font-black tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          </div>
          {children}
          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            {switchText}{" "}
            <Link href={switchHref} className="font-bold text-sky-500">
              {switchLabel}
            </Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}
