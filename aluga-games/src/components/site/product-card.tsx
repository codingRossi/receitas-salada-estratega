import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ProductCardProps = {
  title: string;
  description: string;
  href: string;
  image?: ReactNode;
  badges?: string[];
  action?: ReactNode;
  className?: string;
};

export function ProductCard({
  title,
  description,
  href,
  image,
  badges = [],
  action,
  className,
}: ProductCardProps) {
  return (
    <Card className={cn("overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md", className)}>
      <div className="aspect-[4/3] bg-background-soft">
        {image ?? (
          <div className="flex h-full items-center justify-center text-sm font-bold text-brand-dark">
            Atracao
          </div>
        )}
      </div>
      <div className="p-5">
        {badges.length > 0 ? (
          <div className="mb-3 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge key={badge} variant="brand">
                {badge}
              </Badge>
            ))}
          </div>
        ) : null}
        <h3 className="text-xl font-extrabold text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href={href}
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "sm:flex-1")}
          >
            Ver detalhes
          </Link>
          {action}
        </div>
      </div>
    </Card>
  );
}
