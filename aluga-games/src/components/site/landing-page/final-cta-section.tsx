import { MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LandingPageBlock } from "@/domain/entities";

export function FinalCtaSection({
  block,
  whatsappHref,
}: {
  block?: LandingPageBlock;
  whatsappHref: string;
}) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="overflow-hidden rounded-lg border border-brand/20 bg-brand-soft p-8 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-extrabold uppercase text-brand-dark">
              Próximo passo
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-foreground sm:text-5xl">
              {block?.title ??
                "Pronto para transformar seu evento em uma experiência marcante?"}
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
              {block?.description ??
                "Fale com a equipe da AlugaGames e receba uma orientação adequada ao seu público, espaço e objetivo."}
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "mt-8")}
            >
              <MessageCircle aria-hidden="true" size={19} />
              {block?.ctaLabel ?? "Solicitar proposta"}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
