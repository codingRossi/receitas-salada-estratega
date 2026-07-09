import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import {
  Section,
  SectionDescription,
  SectionEyebrow,
  SectionHeader,
  SectionTitle,
} from "@/components/layout/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type {
  LandingPageBlock,
  LandingPageGalleryItem,
} from "@/domain/entities";

const GALLERY_PREVIEW_ITEMS_LIMIT = 3;

export function EventGallerySection({
  block,
  items,
}: {
  block?: LandingPageBlock;
  items: LandingPageGalleryItem[];
}) {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionEyebrow>Registros de eventos</SectionEyebrow>
          <SectionTitle>Fotografia e experiências em ação</SectionTitle>
          <SectionDescription>
            {block?.description ??
              "A área de fotografia reunirá registros visuais de eventos, montagens e atrações em uso."}
          </SectionDescription>
        </SectionHeader>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items
            .slice(0, GALLERY_PREVIEW_ITEMS_LIMIT)
            .map((galleryPreviewItem) => (
              <article
                key={galleryPreviewItem.title}
                className="overflow-hidden rounded-lg border border-border bg-white"
              >
                <div className="aspect-[4/3] bg-background-soft">
                  {galleryPreviewItem.imageUrl ? (
                    <img
                      src={galleryPreviewItem.imageUrl}
                      alt={
                        galleryPreviewItem.imageAlt ??
                        galleryPreviewItem.title
                      }
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-brand-soft p-6 text-center text-sm font-bold uppercase text-brand-dark">
                      Prévia visual
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold text-foreground">
                    {galleryPreviewItem.title}
                  </h3>
                  {galleryPreviewItem.subtitle ? (
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {galleryPreviewItem.subtitle}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/fotografia"
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
          >
            Ver fotos dos eventos
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
