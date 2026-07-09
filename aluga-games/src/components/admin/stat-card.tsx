import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type StatCardProps = {
  label: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  className?: string;
};

export function StatCard({
  label,
  value,
  description,
  icon,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-extrabold text-foreground">{value}</p>
        </div>
        {icon ? (
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-dark">
            {icon}
          </div>
        ) : null}
      </div>
      {description ? (
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{description}</p>
      ) : null}
    </Card>
  );
}
