import type {
  LandingPageBlockItemRow,
  LandingPageBlockRow,
  LandingPageClientLogoRow,
  LandingPageFaqRow,
  LandingPageFeaturedProductRow,
  LandingPageGalleryPreviewRow,
  LandingPageRepositories,
  LandingPageSiteSettingRow,
  LandingPageTestimonialRow,
} from "../contracts/landing-page-repositories";
import { toStable, type StableDomainResult } from "../shared/to-stable";
import { withLog } from "../shared/with-log";
import { mapLandingPageBlockRowsToIds } from "./helpers";

export type SetupRetrievePublicLandingPageRowsFeatureInput = {
  repositories: LandingPageRepositories;
};

export type RetrievePublicLandingPageRowsOutput = {
  activeLandingPageBlockRows: LandingPageBlockRow[];
  activeBlockItemRows: LandingPageBlockItemRow[];
  activeClientLogoRows: LandingPageClientLogoRow[];
  activeFaqRows: LandingPageFaqRow[];
  activeTestimonialRows: LandingPageTestimonialRow[];
  featuredProductRows: LandingPageFeaturedProductRow[];
  galleryPreviewRows: LandingPageGalleryPreviewRow[];
  whatsappSetting: LandingPageSiteSettingRow | null;
};

export type RetrievePublicLandingPageRowsFeature = {
  raw: () => Promise<RetrievePublicLandingPageRowsOutput>;
  stable: () => Promise<StableDomainResult<RetrievePublicLandingPageRowsOutput>>;
};

/**
 * Recupera as rows públicas necessárias para montar a landing page.
 *
 * Repositories já aplicam filtros de publicação. Esta feature apenas coordena
 * as consultas e preserva nomes de rows explícitos para a etapa de montagem.
 */
export function setupRetrievePublicLandingPageRowsFeature({
  repositories,
}: SetupRetrievePublicLandingPageRowsFeatureInput): RetrievePublicLandingPageRowsFeature {
  async function retrievePublicLandingPageRowsRaw(): Promise<RetrievePublicLandingPageRowsOutput> {
    const [
      activeLandingPageBlockRows,
      featuredProductRows,
      activeClientLogoRows,
      activeTestimonialRows,
      activeFaqRows,
      galleryPreviewRows,
      whatsappSetting,
    ] = await Promise.all([
      repositories.findActiveLandingPageBlocks(),
      repositories.findFeaturedProducts(),
      repositories.findActiveClientLogos(),
      repositories.findActiveTestimonials(),
      repositories.findActiveFaqs(),
      repositories.findGalleryPreview(),
      repositories.findSiteSettingByKey("whatsapp"),
    ]);

    const activeBlockItemRows =
      await repositories.findActiveBlockItemsByBlockIds(
        mapLandingPageBlockRowsToIds(activeLandingPageBlockRows),
      );

    return {
      activeLandingPageBlockRows,
      activeBlockItemRows,
      featuredProductRows,
      activeClientLogoRows,
      activeTestimonialRows,
      activeFaqRows,
      galleryPreviewRows,
      whatsappSetting,
    };
  }

  const loggedRetrievePublicLandingPageRowsRaw = withLog(
    retrievePublicLandingPageRowsRaw,
    "retrieve-public-landing-page-rows-raw",
  );

  return {
    raw: loggedRetrievePublicLandingPageRowsRaw,
    stable: withLog(
      toStable(loggedRetrievePublicLandingPageRowsRaw),
      "retrieve-public-landing-page-rows-stable",
    ),
  };
}
