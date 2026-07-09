import { ArrowRight, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LandingPageBlock, LandingPageItem } from "@/domain/entities";

const HERO_BENEFITS_LIMIT = 3;

const fallbackHeroBenefits = [
  "Atendimento consultivo para cada formato de evento",
  "Atrações para empresas, escolas, condomínios e festas",
  "Estrutura preparada para montagem e operação",
];

const heroVisualCards = [
  {
    title: "Eventos corporativos",
    description: "Atrações pensadas para engajamento e presença de marca.",
  },
  {
    title: "Realidade virtual",
    description: "Experiências imersivas para surpreender convidados.",
  },
  {
    title: "Games interativos",
    description: "Competição saudável e conexão entre participantes.",
  },
];

export function HeroSection({
  block,
  items,
  whatsappHref,
}: {
  block?: LandingPageBlock;
  items?: LandingPageItem[];
  whatsappHref: string;
}) {
  const benefits = items?.length
    ? items
        .slice(0, HERO_BENEFITS_LIMIT)
        .map((heroBenefitItem) => heroBenefitItem.title)
    : fallbackHeroBenefits;

  return (
    <section className="overflow-hidden bg-background-soft py-12 sm:py-20 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <Badge variant="brand" className="rounded-full px-4 py-2 uppercase">
            {block?.subtitle ?? "Entretenimento para eventos"}
          </Badge>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-foreground sm:mt-6 sm:text-6xl lg:text-7xl">
            {block?.title ?? "Experiências que conectam pessoas e fortalecem eventos."}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
            {block?.description ??
              "Locação de brinquedos, games e atrações para eventos corporativos, ativações de marca, escolas, condomínios e celebrações especiais."}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "max-sm:w-[calc(100%-5rem)] max-sm:self-start")}
            >
              <MessageCircle aria-hidden="true" size={19} />
              {block?.ctaLabel ?? "Solicitar proposta"}
            </a>
            <Link
              href="/produtos"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "max-sm:w-[calc(100%-5rem)] max-sm:self-start",
              )}
            >
              Ver atrações
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>

          <ul className="mt-8 grid gap-3 text-sm font-semibold text-foreground sm:grid-cols-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex gap-2">
                <CheckCircle2
                  aria-hidden="true"
                  size={18}
                  className="mt-0.5 shrink-0 text-brand"
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="relative overflow-hidden rounded-lg border border-border bg-white p-5 shadow-xl shadow-black/5"
          aria-label="Composição visual de atrações para eventos"
        >
          <div className="grid min-h-[430px] content-between gap-4 rounded-lg border border-brand/15 bg-background-soft p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-brand-dark">
                Soluções completas
              </span>
              <Sparkles aria-hidden="true" className="text-brand" size={24} />
            </div>
            <div className="grid gap-3">
              {heroVisualCards.map((visualCard, index) => (
                <article
                  key={visualCard.title}
                  className={cn(
                    "rounded-lg border border-border bg-white p-4 shadow-sm",
                    index === 1 ? "sm:ml-8" : "",
                    index === 2 ? "sm:mr-10" : "",
                  )}
                >
                  <p className="text-lg font-extrabold text-foreground">
                    {visualCard.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {visualCard.description}
                  </p>
                </article>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {["Empresas", "Escolas", "Festas"].map((audienceLabel) => (
                <span
                  key={audienceLabel}
                  className="rounded-lg border border-brand/15 bg-white px-3 py-3 text-xs font-bold uppercase text-brand-dark"
                >
                  {audienceLabel}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
