import type { HTMLAttributes } from "react";
import { Container } from "@/components/layout/container";

export function SiteContainer({
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <Container size="lg" {...props} />;
}
