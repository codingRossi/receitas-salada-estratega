import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type SectionProps = HTMLAttributes<HTMLElement> & {
  tone?: "white" | "soft";
};

export function Section({
  className,
  tone = "white",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        tone === "soft" ? "bg-background-soft" : "bg-white",
        className,
      )}
      {...props}
    />
  );
}

export function SectionHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto max-w-3xl text-center", className)} {...props} />;
}

export function SectionEyebrow({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm font-extrabold uppercase tracking-normal text-brand-dark",
        className,
      )}
      {...props}
    />
  );
}

export function SectionTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "mt-3 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl",
        className,
      )}
      {...props}
    />
  );
}

export function SectionDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("mt-4 text-base leading-7 text-muted-foreground sm:text-lg", className)}
      {...props}
    />
  );
}
