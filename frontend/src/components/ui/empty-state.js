import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ title = "Nothing here yet", description = "Create your first item to bring this space alive.", action, actionLabel }) {
  return (
    <div className="glass-panel rounded-2xl p-10 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-300">
        <Sparkles size={22} />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">{description}</p>
      {action && (
        <Button className="mt-5" onClick={action}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
