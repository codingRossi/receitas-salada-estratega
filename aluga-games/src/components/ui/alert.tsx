import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const alertVariants = cva("rounded-lg border p-4 text-sm", {
  variants: {
    variant: {
      info: "border-brand/20 bg-brand-soft text-brand-dark",
      success: "border-success/20 bg-success-soft text-success-dark",
      warning: "border-warning/25 bg-warning-soft text-warning-dark",
      danger: "border-danger/20 bg-danger-soft text-danger",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const alertIcons = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle,
};

export type AlertProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    title?: string;
    children: ReactNode;
  };

export function Alert({ className, variant = "info", title, children, ...props }: AlertProps) {
  const Icon = alertIcons[variant ?? "info"];
  const role = variant === "danger" ? "alert" : "status";

  return (
    <div
      role={role}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <div className="flex gap-3">
        <Icon aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
        <div>
          {title ? <p className="font-bold">{title}</p> : null}
          <div className={cn("leading-6", title ? "mt-1" : "")}>{children}</div>
        </div>
      </div>
    </div>
  );
}
