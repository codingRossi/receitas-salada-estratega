import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-55",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-white shadow-sm shadow-brand/20 hover:bg-brand-dark focus-visible:outline-brand",
        secondary:
          "border border-brand/25 bg-white text-brand-dark hover:border-brand hover:bg-brand-soft focus-visible:outline-brand",
        ghost:
          "bg-transparent text-muted-foreground hover:bg-brand-soft hover:text-brand-dark focus-visible:outline-brand",
        neutral:
          "border border-border bg-white text-foreground hover:border-brand/40 hover:bg-background-soft focus-visible:outline-brand",
        destructive:
          "bg-danger text-white shadow-sm shadow-danger/20 hover:bg-danger-dark focus-visible:outline-danger",
      },
      size: {
        sm: "min-h-9 px-3 py-2 text-xs",
        md: "min-h-11 px-5 py-2.5",
        lg: "min-h-12 px-6 py-3 text-base",
        icon: "h-11 w-11 p-0",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  fullWidth,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    />
  );
}
