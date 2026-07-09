import { ClipboardList, MessageCircle, Settings2, Wrench } from "lucide-react";
import { Container } from "@/components/layout/container";
import {
  Section,
  SectionDescription,
  SectionEyebrow,
  SectionHeader,
  SectionTitle,
} from "@/components/layout/section";
import type { LandingPageBlock, LandingPageItem } from "@/domain/entities";

const VISIBLE_PROCESS_STEPS_LIMIT = 4;

const processStepIcons = [ClipboardList, MessageCircle, Wrench, Settings2];

export function HowItWorksSection({
  block,
  items,
}: {
  block?: LandingPageBlock;
  items: LandingPageItem[];
}) {
  return (
    <Section id="como-funciona">
      <Container>
        <SectionHeader>
          <SectionEyebrow>Processo consultivo</SectionEyebrow>
          <SectionTitle>{block?.title ?? "Como funciona"}</SectionTitle>
          <SectionDescription>
            {block?.description ??
              "Um caminho simples para transformar interesse em uma proposta adequada ao evento."}
          </SectionDescription>
        </SectionHeader>

        <ol className="mt-10 grid gap-5 lg:grid-cols-4">
          {items
            .slice(0, VISIBLE_PROCESS_STEPS_LIMIT)
            .map((processStepItem, index) => {
              const Icon =
                processStepIcons[index % processStepIcons.length];

              return (
                <li
                  key={processStepItem.title}
                  className="relative rounded-lg border border-border bg-white p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand text-sm font-extrabold text-white">
                      {index + 1}
                    </span>
                    <Icon
                      aria-hidden="true"
                      className="text-brand"
                      size={21}
                    />
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold text-foreground">
                    {processStepItem.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {processStepItem.description}
                  </p>
                </li>
              );
            })}
        </ol>
      </Container>
    </Section>
  );
}
