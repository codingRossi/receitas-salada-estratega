import { Headphones, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
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

const VISIBLE_REASONS_LIMIT = 4;

const reasonIcons = [Headphones, UsersRound, Sparkles, ShieldCheck];

export function WhyChooseUsSection({
  block,
  items,
}: {
  block?: LandingPageBlock;
  items: LandingPageItem[];
}) {
  return (
    <Section tone="soft" id="por-que-escolher">
      <Container>
        <SectionHeader>
          <SectionEyebrow>Por que escolher</SectionEyebrow>
          <SectionTitle>
            {block?.title ?? "Por que empresas escolhem a AlugaGames?"}
          </SectionTitle>
          {block?.description ? (
            <SectionDescription>{block.description}</SectionDescription>
          ) : null}
        </SectionHeader>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.slice(0, VISIBLE_REASONS_LIMIT).map((reasonItem, index) => {
            const Icon = reasonIcons[index % reasonIcons.length];

            return (
              <Card key={reasonItem.title} className="p-6">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand-soft text-brand-dark">
                  <Icon aria-hidden="true" size={22} />
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-foreground">
                  {reasonItem.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {reasonItem.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
