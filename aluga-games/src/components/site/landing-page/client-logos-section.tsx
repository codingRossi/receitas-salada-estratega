import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import type { LandingPageBlock, LandingPageLogo } from "@/domain/entities";

export function ClientLogosSection({
  block,
  logos,
}: {
  block?: LandingPageBlock;
  logos: LandingPageLogo[];
}) {
  return (
    <Section className="py-12 sm:py-14">
      <Container>
        <div className="rounded-lg border border-border bg-white p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase text-brand-dark">
                Prova social
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-foreground">
                {block?.title ?? "Clientes e eventos atendidos"}
              </h2>
            </div>
            {block?.description ? (
              <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                {block.description}
              </p>
            ) : null}
          </div>

          {logos.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {logos.map((logo) => (
                <div
                  key={logo.name}
                  className="flex min-h-20 items-center justify-center rounded-lg border border-border bg-background-soft p-4"
                >
                  <img
                    src={logo.imageUrl}
                    alt={logo.imageAlt}
                    className="max-h-10 w-auto max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ) : (
            <Card className="mt-8 bg-background-soft p-5 text-sm leading-6 text-muted-foreground">
              Logos reais e validados serão exibidos aqui quando forem
              cadastrados pelo admin.
            </Card>
          )}
        </div>
      </Container>
    </Section>
  );
}
