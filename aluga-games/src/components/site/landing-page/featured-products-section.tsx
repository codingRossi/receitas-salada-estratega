import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import {
  Section,
  SectionDescription,
  SectionEyebrow,
  SectionHeader,
  SectionTitle,
} from "@/components/layout/section";
import { EmptyState } from "@/components/feedback/empty-state";
import { ProductCard } from "@/components/site/product-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type {
  LandingPageBlock,
  LandingPageProduct,
} from "@/domain/entities";

export function FeaturedProductsSection({
  block,
  products,
}: {
  block?: LandingPageBlock;
  products: LandingPageProduct[];
}) {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionEyebrow>Atrações em destaque</SectionEyebrow>
          <SectionTitle>
            {block?.title ?? "Atrações que elevam o seu evento"}
          </SectionTitle>
          <SectionDescription>
            {block?.description ??
              "Conheça opções selecionadas para criar experiências marcantes em diferentes formatos de evento."}
          </SectionDescription>
        </SectionHeader>

        {products.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.name}
                description={product.shortDescription}
                href="/produtos"
                badges={["Destaque"]}
                image={
                  product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.imageAlt ?? product.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : undefined
                }
              />
            ))}
          </div>
        ) : (
          <EmptyState
            className="mt-10"
            title="Destaques preparados para cadastro"
            description="Quando houver produtos ativos marcados como destaque, eles aparecerão aqui. Por enquanto, o visitante pode acessar a página de atrações."
            action={
              <Link
                href="/produtos"
                className={cn(buttonVariants({ variant: "secondary" }))}
              >
                Ver atrações
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            }
          />
        )}

        {products.length > 0 ? (
          <div className="mt-10 text-center">
            <Link
              href="/produtos"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
            >
              Ver todas as atrações
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
