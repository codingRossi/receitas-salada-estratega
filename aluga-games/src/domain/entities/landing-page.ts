export type LandingPageDataSource =
  "database" | "fallback-no-database-url" | "fallback-database-error";

export type LandingPageBlockType =
  | "hero"
  | "client_logos"
  | "why_choose_us"
  | "featured_products"
  | "solutions"
  | "how_it_works"
  | "testimonials"
  | "faq"
  | "final_cta";

export type LandingPageBlock = {
  key: string;
  type: LandingPageBlockType;
  title: string;
  subtitle?: string;
  description?: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

export type LandingPageItem = {
  title: string;
  subtitle?: string;
  description: string;
  ctaLabel?: string;
  ctaUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type LandingPageProduct = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type LandingPageLogo = {
  name: string;
  imageUrl: string;
  imageAlt: string;
};

export type LandingPageTestimonial = {
  authorName: string;
  authorRole?: string;
  companyName?: string;
  content: string;
};

export type LandingPageFaq = {
  question: string;
  answer: string;
};

export type LandingPageGalleryItem = {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type LandingPageContent = {
  blocks: Partial<Record<LandingPageBlockType, LandingPageBlock>>;
  blockItems: Partial<Record<LandingPageBlockType, LandingPageItem[]>>;
  featuredProducts: LandingPageProduct[];
  clientLogos: LandingPageLogo[];
  testimonials: LandingPageTestimonial[];
  faqs: LandingPageFaq[];
  galleryItems: LandingPageGalleryItem[];
  whatsapp: {
    phone?: string | null;
    message: string;
  };
};

export type LandingPageData = LandingPageContent & {
  source: LandingPageDataSource;
};
