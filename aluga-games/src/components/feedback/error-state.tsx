import type { ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ErrorStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function ErrorState({
  title,
  description,
  action,
  className,
}: ErrorStateProps) {
  return (
    <Card className={cn("border-danger/20 bg-danger-soft px-6 py-8", className)}>
      <div className="flex gap-4">
        <AlertCircle aria-hidden="true" className="mt-1 shrink-0 text-danger" size={22} />
        <div>
          <h2 className="text-lg font-extrabold text-danger">{title}</h2>
          {description ? (
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          ) : null}
          {action ? <div className="mt-5">{action}</div> : null}
        </div>
      </div>
    </Card>
  );
}
