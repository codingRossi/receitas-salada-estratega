import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Card className={cn("flex flex-col items-center px-6 py-10 text-center", className)}>
      {icon ? (
        <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-brand-soft text-brand-dark">
          {icon}
        </div>
      ) : null}
      <h2 className="text-xl font-extrabold text-foreground">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </Card>
  );
}
