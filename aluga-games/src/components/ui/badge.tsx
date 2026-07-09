import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold",
  {
    variants: {
      variant: {
        brand: "border-brand/20 bg-brand-soft text-brand-dark",
        neutral: "border-border bg-white text-muted-foreground",
        success: "border-success/20 bg-success-soft text-success-dark",
        warning: "border-warning/25 bg-warning-soft text-warning-dark",
        danger: "border-danger/20 bg-danger-soft text-danger",
      },
    },
    defaultVariants: {
      variant: "brand",
    },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
