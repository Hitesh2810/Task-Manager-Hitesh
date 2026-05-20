import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, Sparkles } from "lucide-react";
import { AnimatedBackground } from "@/components/visuals/animated-background";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6">
      <AnimatedBackground />
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-3xl border border-white/10 bg-white/60 px-4 py-3 backdrop-blur-2xl dark:bg-slate-950/70">
        <Link href="/" className="flex items-center gap-3 font-black">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-400/20 text-sky-400"><Sparkles size={20} /></span>
          TaskSphere
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild><Link href="/login">Login</Link></Button>
          <Button asChild><Link href="/signup">Start free</Link></Button>
        </div>
      </nav>
      <section className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-10 py-12 lg:grid-cols-[1fr_.9fr]">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-sm font-bold text-sky-400">Premium SaaS task command center</p>
          <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Orchestrate work with a dashboard that feels alive.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            A high-end Next.js frontend connected to your Django REST backend, built for JWT auth, workspaces, task flow, notifications, and analytics.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="h-12 px-6"><Link href="/dashboard">Open dashboard <ArrowRight size={18} /></Link></Button>
            <Button variant="outline" asChild className="h-12 px-6"><Link href="/tasks">View tasks</Link></Button>
          </div>
        </div>
        <div className="glass-panel rounded-[2rem] p-5">
          <div className="grid gap-4">
            {[
              { icon: CheckCircle2, title: "Kanban execution", text: "Move across todo, blocked, review, and completed states." },
              { icon: BarChart3, title: "Analytics layer", text: "Charts for productivity, completion, and workspace signal." },
              { icon: Sparkles, title: "Premium motion", text: "Framer Motion, GSAP, glass surfaces, and responsive navigation." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/60 p-5 dark:bg-white/5">
                <Icon className="mb-4 text-sky-400" size={26} />
                <h3 className="font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
