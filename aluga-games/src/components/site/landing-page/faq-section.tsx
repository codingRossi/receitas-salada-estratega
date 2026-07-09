import { Container } from "@/components/layout/container";
import {
  Section,
  SectionDescription,
  SectionEyebrow,
  SectionHeader,
  SectionTitle,
} from "@/components/layout/section";
import type { LandingPageBlock, LandingPageFaq } from "@/domain/entities";

export function FaqSection({
  block,
  faqs,
}: {
  block?: LandingPageBlock;
  faqs: LandingPageFaq[];
}) {
  return (
    <Section tone="soft">
      <Container>
        <SectionHeader>
          <SectionEyebrow>FAQ</SectionEyebrow>
          <SectionTitle>{block?.title ?? "Dúvidas frequentes"}</SectionTitle>
          <SectionDescription>
            {block?.description ??
              "Perguntas objetivas para ajudar o primeiro contato pelo WhatsApp."}
          </SectionDescription>
        </SectionHeader>

        <dl className="mt-10 grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-lg border border-border bg-white p-6">
              <dt className="text-lg font-extrabold text-foreground">
                {faq.question}
              </dt>
              <dd className="mt-3 text-sm leading-6 text-muted-foreground">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
