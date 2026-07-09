import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export function Textarea({
  className,
  invalid = false,
  rows = 5,
  ...props
}: TextareaProps) {
  return (
    <textarea
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(
        "w-full resize-y rounded-lg border bg-white px-3.5 py-3 text-sm leading-6 text-foreground shadow-sm shadow-black/[0.02] transition placeholder:text-muted-foreground/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70",
        invalid
          ? "border-danger focus-visible:outline-danger"
          : "border-border focus-visible:border-brand focus-visible:outline-brand",
        className,
      )}
      {...props}
    />
  );
}
