import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

export function Select({ className, invalid = false, children, ...props }: SelectProps) {
  return (
    <span className="relative block">
      <select
        aria-invalid={invalid || undefined}
        className={cn(
          "min-h-11 w-full appearance-none rounded-lg border bg-white py-2.5 pl-3.5 pr-10 text-sm text-foreground shadow-sm shadow-black/[0.02] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70",
          invalid
            ? "border-danger focus-visible:outline-danger"
            : "border-border focus-visible:border-brand focus-visible:outline-brand",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={16}
      />
    </span>
  );
}
