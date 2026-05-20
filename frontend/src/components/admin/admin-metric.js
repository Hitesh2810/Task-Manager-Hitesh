import { Card } from "@/components/ui/card";

export function AdminMetric({ label, value, detail }) {
  return (
    <Card>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{detail}</p>
    </Card>
  );
}
