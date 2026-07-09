import { Quote } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import type {
  LandingPageBlock,
  LandingPageTestimonial,
} from "@/domain/entities";

export function TestimonialsSection({
  block,
  testimonials,
}: {
  block?: LandingPageBlock;
  testimonials: LandingPageTestimonial[];
}) {
  const featured = testimonials[0];

  return (
    <Section tone="soft">
      <Container>
        {featured ? (
          <Card className="grid gap-8 overflow-hidden p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
            <div className="rounded-lg bg-brand-soft p-6">
              <Quote aria-hidden="true" className="text-brand-dark" size={34} />
              <h2 className="mt-6 text-3xl font-extrabold leading-tight text-foreground">
                {block?.title ?? "Depoimentos de eventos atendidos"}
              </h2>
            </div>
            <figure>
              <blockquote className="text-xl font-semibold leading-9 text-foreground">
                “{featured.content}”
              </blockquote>
              <figcaption className="mt-6 text-sm leading-6 text-muted-foreground">
                <span className="block font-bold text-foreground">
                  {featured.authorName}
                </span>
                {[featured.authorRole, featured.companyName]
                  .filter(Boolean)
                  .join(" - ")}
              </figcaption>
            </figure>
          </Card>
        ) : (
          <Card className="grid gap-8 bg-white p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
            <div className="rounded-lg bg-brand-soft p-6">
              <Quote aria-hidden="true" className="text-brand-dark" size={34} />
              <h2 className="mt-6 text-3xl font-extrabold leading-tight text-foreground">
                {block?.title ?? "Prova social validada"}
              </h2>
            </div>
            <div>
              <p className="text-xl font-semibold leading-9 text-foreground">
                Depoimentos reais aparecerão aqui depois de cadastrados e
                validados pelo admin.
              </p>
              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                A seção já está preparada para exibir identificação autorizada,
                sem inventar empresas, cargos ou pessoas.
              </p>
            </div>
          </Card>
        )}
      </Container>
    </Section>
  );
}
