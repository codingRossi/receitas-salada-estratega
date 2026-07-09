import { clientEnv } from "@/lib/env";
import { buildWhatsAppUrl } from "@/domain/features/helpers";
import type { LandingPageData } from "@/domain/entities";
import { ClientLogosSection } from "./client-logos-section";
import { EventGallerySection } from "./event-gallery-section";
import { FaqSection } from "./faq-section";
import { FeaturedProductsSection } from "./featured-products-section";
import { FinalCtaSection } from "./final-cta-section";
import { HeroSection } from "./hero-section";
import { HowItWorksSection } from "./how-it-works-section";
import { SolutionsSection } from "./solutions-section";
import { TestimonialsSection } from "./testimonials-section";
import { WhyChooseUsSection } from "./why-choose-us-section";

export function LandingPage({
  landingPageData,
}: {
  landingPageData: LandingPageData;
}) {
  const whatsappHref = buildWhatsAppUrl({
    phone:
      landingPageData.whatsapp.phone ?? clientEnv.NEXT_PUBLIC_WHATSAPP_NUMBER,
    message: landingPageData.whatsapp.message,
  });

  return (
    <>
      <HeroSection
        block={landingPageData.blocks.hero}
        items={landingPageData.blockItems.hero}
        whatsappHref={whatsappHref}
      />
      <ClientLogosSection
        block={landingPageData.blocks.client_logos}
        logos={landingPageData.clientLogos}
      />
      <WhyChooseUsSection
        block={landingPageData.blocks.why_choose_us}
        items={landingPageData.blockItems.why_choose_us ?? []}
      />
      <FeaturedProductsSection
        block={landingPageData.blocks.featured_products}
        products={landingPageData.featuredProducts}
      />
      <SolutionsSection
        block={landingPageData.blocks.solutions}
        items={landingPageData.blockItems.solutions ?? []}
      />
      <HowItWorksSection
        block={landingPageData.blocks.how_it_works}
        items={landingPageData.blockItems.how_it_works ?? []}
      />
      <TestimonialsSection
        block={landingPageData.blocks.testimonials}
        testimonials={landingPageData.testimonials}
      />
      <EventGallerySection items={landingPageData.galleryItems} />
      <FaqSection block={landingPageData.blocks.faq} faqs={landingPageData.faqs} />
      <FinalCtaSection
        block={landingPageData.blocks.final_cta}
        whatsappHref={whatsappHref}
      />
    </>
  );
}
