import { describe, expect, it, mock } from "bun:test";

import type { LandingPageData } from "../../src/domain/entities";

mock.module("server-only", () => ({}));

function buildLandingPageData(
  source: LandingPageData["source"],
): LandingPageData {
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
      message: source,
      phone: null,
    },
  };
}

describe("retrievePublicLandingPageDataController", () => {
  it("returns stable database data when the feature succeeds", async () => {
    const { retrievePublicLandingPageDataController } =
      await import("../../src/controllers/landing-page-controller");

    const landingPageData = await retrievePublicLandingPageDataController({
      retrieveFallbackLandingPage: async ({ source }) =>
        buildLandingPageData(source),
      retrievePublicLandingPageContentStable: async () => ({
        data: buildLandingPageData("database"),
        success: true,
      }),
    });

    expect(landingPageData.source).toBe("database");
  });

  it("returns fallback data when the stable feature fails", async () => {
    const { retrievePublicLandingPageDataController } =
      await import("../../src/controllers/landing-page-controller");

    const landingPageData = await retrievePublicLandingPageDataController({
      retrieveFallbackLandingPage: async ({ source }) =>
        buildLandingPageData(source),
      retrievePublicLandingPageContentStable: async () => ({
        data: undefined,
        errorName: "Error",
        success: false,
      }),
    });

    expect(landingPageData.source).toBe("fallback-database-error");
  });
});
