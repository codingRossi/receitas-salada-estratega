import { describe, expect, it } from "bun:test";

import { setupBuildWhatsAppUrlFeature } from "../../../src/domain/features/build-whatsapp-url";
import { defaultWhatsAppMessages } from "../../../src/domain/features/helpers";
import { setupRecordAdminAuditLogFeature } from "../../../src/domain/features/record-admin-audit-log";
import { setupRetrieveFallbackLandingPageFeature } from "../../../src/domain/features/retrieve-fallback-landing-page";
import { setupRetrieveMediaAssetFeature } from "../../../src/domain/features/retrieve-media-asset";
import { setupRetrieveSiteSettingFeature } from "../../../src/domain/features/retrieve-site-setting";
import { setupRetrieveStaticWhatsAppMessageFeature } from "../../../src/domain/features/retrieve-static-whatsapp-message";

describe("simple domain features", () => {
  it("builds sanitized WhatsApp URLs", async () => {
    const buildWhatsAppUrlFeature = setupBuildWhatsAppUrlFeature();

    const whatsappUrl = await buildWhatsAppUrlFeature.buildUrl.raw({
      message: "Olá teste",
      phone: "+55 (11) 99999-0000",
    });

    expect(whatsappUrl).toBe(
      "https://wa.me/5511999990000?text=Ol%C3%A1%20teste",
    );
  });

  it("returns static WhatsApp messages by type", async () => {
    const retrieveStaticWhatsAppMessageFeature =
      setupRetrieveStaticWhatsAppMessageFeature();

    const message =
      await retrieveStaticWhatsAppMessageFeature.retrieveStaticMessage.raw({
        type: "representative",
      });

    expect(message).toBe(defaultWhatsAppMessages.representative);
  });

  it("returns fallback landing page data with the requested source", async () => {
    const retrieveFallbackLandingPageFeature =
      setupRetrieveFallbackLandingPageFeature();

    const fallbackLandingPage = await retrieveFallbackLandingPageFeature.raw({
      source: "fallback-database-error",
    });

    expect(fallbackLandingPage.source).toBe("fallback-database-error");
    expect(fallbackLandingPage.whatsapp.message).toBe(
      defaultWhatsAppMessages.general,
    );
  });

  it("retrieves media assets through the injected repository", async () => {
    const retrieveMediaAssetFeature = setupRetrieveMediaAssetFeature({
      repositories: {
        retrieveMediaAsset: async (input) => ({
          altText: "Imagem",
          id: input.id,
          mimeType: "image/jpeg",
          originalFilename: "imagem.jpg",
          url: "/imagem.jpg",
        }),
      },
    });

    const mediaAsset = await retrieveMediaAssetFeature.retrieveMediaAsset.raw({
      id: "media",
    });

    expect(mediaAsset).toEqual({
      altText: "Imagem",
      id: "media",
      mimeType: "image/jpeg",
      originalFilename: "imagem.jpg",
      url: "/imagem.jpg",
    });
  });

  it("retrieves site settings through the injected repository", async () => {
    const retrieveSiteSettingFeature = setupRetrieveSiteSettingFeature({
      repositories: {
        retrieveSiteSetting: async (input) => ({
          key: input.key,
          value: { phone: "5511999990000" },
        }),
      },
    });

    const siteSetting =
      await retrieveSiteSettingFeature.retrieveSiteSetting.raw({
        key: "whatsapp",
      });

    expect(siteSetting).toEqual({
      key: "whatsapp",
      value: { phone: "5511999990000" },
    });
  });

  it("records admin audit logs through the injected repository", async () => {
    const recordedActions: string[] = [];
    const recordAdminAuditLogFeature = setupRecordAdminAuditLogFeature({
      repositories: {
        recordAdminAuditLog: async (input) => {
          recordedActions.push(input.action);
        },
      },
    });

    await recordAdminAuditLogFeature.recordAdminAuditLog.raw({
      action: "product.update",
      entityType: "product",
    });

    expect(recordedActions).toEqual(["product.update"]);
  });

  it("returns stable errors without throwing from simple feature wrappers", async () => {
    const retrieveSiteSettingFeature = setupRetrieveSiteSettingFeature({
      repositories: {
        retrieveSiteSetting: async () => {
          throw new Error("database failed");
        },
      },
    });

    const stableResult =
      await retrieveSiteSettingFeature.retrieveSiteSetting.stable({
        key: "whatsapp",
      });

    if (stableResult.success) {
      throw new Error("Expected stable feature result to fail.");
    }

    expect(stableResult.errorName).toBe("Error");
  });
});
