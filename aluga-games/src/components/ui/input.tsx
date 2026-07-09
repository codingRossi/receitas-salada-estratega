import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export function Input({ className, invalid = false, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(
        "min-h-11 w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-foreground shadow-sm shadow-black/[0.02] transition placeholder:text-muted-foreground/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70",
        invalid
          ? "border-danger focus-visible:outline-danger"
          : "border-border focus-visible:border-brand focus-visible:outline-brand",
        className,
      )}
      {...props}
    />
  );
}
