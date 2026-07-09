import { describe, expect, it } from "bun:test";

import { setupRetrievePublicLandingPageContentFeature } from "../../../src/domain/features/retrieve-public-landing-page-content";
import { setupRetrievePublicLandingPageRowsFeature } from "../../../src/domain/features/retrieve-public-landing-page-rows";
import type { RetrieveFallbackLandingPageInput } from "../../../src/domain/features/retrieve-fallback-landing-page";
import type { RetrievePublicLandingPageRowsOutput } from "../../../src/domain/features/retrieve-public-landing-page-rows";

function buildLandingPageRows(
  overrides: Partial<RetrievePublicLandingPageRowsOutput> = {},
): RetrievePublicLandingPageRowsOutput {
  return {
    activeBlockItemRows: [],
    activeClientLogoRows: [],
    activeFaqRows: [],
    activeLandingPageBlockRows: [],
    activeTestimonialRows: [],
    featuredProductRows: [],
    galleryPreviewRows: [],
    whatsappSetting: null,
    ...overrides,
  };
}

async function retrieveFallbackLandingPage({
  source,
}: RetrieveFallbackLandingPageInput) {
  return {
    blockItems: {},
    blocks: {},
    clientLogos: [],
    faqs: [],
    featuredProducts: [],
    galleryItems: [],
    source,
    testimonials: [],
    whatsapp: {
      message: "fallback",
      phone: null,
    },
  };
}

describe("landing page domain features", () => {
  it("returns fallback content when DATABASE_URL is not configured", async () => {
    const originalDatabaseUrl = process.env.DATABASE_URL;
    process.env.DATABASE_URL = "";
    const retrievePublicLandingPageContentFeature =
      setupRetrievePublicLandingPageContentFeature({
        retrieveFallbackLandingPage,
        retrievePublicLandingPageRows: async () => {
          throw new Error("rows should not be loaded without DATABASE_URL");
        },
      });

    try {
      const landingPageData =
        await retrievePublicLandingPageContentFeature.raw();

      expect(landingPageData.source).toBe("fallback-no-database-url");
      expect(landingPageData.whatsapp.message).toBe("fallback");
    } finally {
      process.env.DATABASE_URL = originalDatabaseUrl;
    }
  });

  it("builds database landing page content from public rows", async () => {
    const originalDatabaseUrl = process.env.DATABASE_URL;
    process.env.DATABASE_URL = "postgres://user:pass@localhost:5432/test";
    const retrievePublicLandingPageContentFeature =
      setupRetrievePublicLandingPageContentFeature({
        retrieveFallbackLandingPage,
        retrievePublicLandingPageRows: async () =>
          buildLandingPageRows({
            activeLandingPageBlockRows: [
              {
                ctaLabel: "Chamar",
                ctaUrl: "https://example.com",
                description: "Descrição",
                id: "hero-block",
                key: "hero",
                subtitle: "Sub",
                title: "Hero do banco",
                type: "hero",
              },
            ],
            whatsappSetting: {
              key: "whatsapp",
              value: {
                defaultMessage: "Mensagem do banco",
                phone: "5511999990000",
              },
            },
          }),
      });

    try {
      const landingPageData =
        await retrievePublicLandingPageContentFeature.raw();

      expect(landingPageData.source).toBe("database");
      expect(landingPageData.blocks.hero?.title).toBe("Hero do banco");
      expect(landingPageData.whatsapp).toEqual({
        message: "Mensagem do banco",
        phone: "5511999990000",
      });
    } finally {
      process.env.DATABASE_URL = originalDatabaseUrl;
    }
  });

  it("retrieves public landing page rows and then loads block items by active block ids", async () => {
    const requestedBlockIdLists: string[][] = [];
    const retrievePublicLandingPageRowsFeature =
      setupRetrievePublicLandingPageRowsFeature({
        repositories: {
          findActiveBlockItemsByBlockIds: async (blockIds) => {
            requestedBlockIdLists.push(blockIds);
            return [];
          },
          findActiveClientLogos: async () => [],
          findActiveFaqs: async () => [],
          findActiveLandingPageBlocks: async () => [
            {
              ctaLabel: null,
              ctaUrl: null,
              description: null,
              id: "hero-block",
              key: "hero",
              subtitle: null,
              title: "Hero",
              type: "hero",
            },
          ],
          findActiveTestimonials: async () => [],
          findFeaturedProducts: async () => [],
          findGalleryPreview: async () => [],
          findSiteSettingByKey: async () => null,
        },
      });

    const rows = await retrievePublicLandingPageRowsFeature.raw();

    expect(requestedBlockIdLists).toEqual([["hero-block"]]);
    expect(rows.activeLandingPageBlockRows).toHaveLength(1);
  });
});
