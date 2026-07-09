import { ArrowRight, Building2, Gamepad2, PartyPopper, Shapes, Sparkles } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import {
  Section,
  SectionDescription,
  SectionEyebrow,
  SectionHeader,
  SectionTitle,
} from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import type { LandingPageBlock, LandingPageItem } from "@/domain/entities";

const VISIBLE_SOLUTIONS_LIMIT = 6;

const solutionIcons = [Building2, PartyPopper, Sparkles, Shapes, Gamepad2];

export function SolutionsSection({
  block,
  items,
}: {
  block?: LandingPageBlock;
  items: LandingPageItem[];
}) {
  return (
    <Section tone="soft">
      <Container>
        <SectionHeader>
          <SectionEyebrow>Soluções por contexto</SectionEyebrow>
          <SectionTitle>
            {block?.title ?? "Soluções para diferentes formatos de evento"}
          </SectionTitle>
          <SectionDescription>
            {block?.description ??
              "Organize a descoberta por tipo de evento, público e objetivo."}
          </SectionDescription>
        </SectionHeader>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items
            .slice(0, VISIBLE_SOLUTIONS_LIMIT)
            .map((solutionItem, index) => {
              const Icon = solutionIcons[index % solutionIcons.length];

              return (
                <Card key={solutionItem.title} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-dark">
                      <Icon aria-hidden="true" size={21} />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-foreground">
                        {solutionItem.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {solutionItem.description}
                      </p>
                      <Link
                        href={solutionItem.ctaUrl ?? "/produtos"}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-dark transition hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      >
                        {solutionItem.ctaLabel ?? "Ver atrações"}
                        <ArrowRight aria-hidden="true" size={16} />
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>
      </Container>
    </Section>
  );
}
