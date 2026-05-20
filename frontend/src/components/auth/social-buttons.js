"use client";

import { GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button type="button" variant="outline" className="bg-white/70 dark:bg-white/5">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-sm font-black text-slate-950">G</span>
        Google
      </Button>
      <Button type="button" variant="outline" className="bg-white/70 dark:bg-white/5">
        <GitBranch size={17} />
        GitHub
      </Button>
    </div>
  );
}
