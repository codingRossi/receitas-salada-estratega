export type LandingPageBlockRow = {
  id: string;
  key: string;
  type: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
};

export type LandingPageBlockItemRow = {
  blockId: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
};

export type LandingPageFeaturedProductRow = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
};

export type LandingPageClientLogoRow = {
  name: string;
  imageUrl: string;
  imageAlt: string | null;
};

export type LandingPageTestimonialRow = {
  authorName: string;
  authorRole: string | null;
  companyName: string | null;
  content: string;
};

export type LandingPageFaqRow = {
  question: string;
  answer: string;
};

export type LandingPageGalleryPreviewRow = {
  title: string;
  subtitle: string | null;
  imageUrl: string;
  imageAlt: string | null;
};

export type LandingPageSiteSettingRow = {
  key: string;
  value: Record<string, unknown>;
};

export type FindActiveLandingPageBlocks = () => Promise<LandingPageBlockRow[]>;

export type FindActiveBlockItemsByBlockIds = (
  blockIds: string[],
) => Promise<LandingPageBlockItemRow[]>;

export type FindFeaturedProducts = () => Promise<
  LandingPageFeaturedProductRow[]
>;

export type FindActiveClientLogos = () => Promise<LandingPageClientLogoRow[]>;

export type FindActiveTestimonials = () => Promise<LandingPageTestimonialRow[]>;

export type FindActiveFaqs = () => Promise<LandingPageFaqRow[]>;

export type FindGalleryPreview = () => Promise<LandingPageGalleryPreviewRow[]>;

export type FindSiteSettingByKey = (
  key: string,
) => Promise<LandingPageSiteSettingRow | null>;

export type LandingPageRepositories = {
  findActiveLandingPageBlocks: FindActiveLandingPageBlocks;
  findActiveBlockItemsByBlockIds: FindActiveBlockItemsByBlockIds;
  findFeaturedProducts: FindFeaturedProducts;
  findActiveClientLogos: FindActiveClientLogos;
  findActiveTestimonials: FindActiveTestimonials;
  findActiveFaqs: FindActiveFaqs;
  findGalleryPreview: FindGalleryPreview;
  findSiteSettingByKey: FindSiteSettingByKey;
};
