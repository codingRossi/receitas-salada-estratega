import "server-only";

import { setupBuildWhatsAppUrlFeature } from "@/domain/features/build-whatsapp-url";
import { setupListFeaturedPublicProductsFeature } from "@/domain/features/list-featured-public-products";
import { setupListActiveCategoriesFeature } from "@/domain/features/list-active-categories";
import { setupListActiveTagsFeature } from "@/domain/features/list-active-tags";
import { setupListPublicCatalogFiltersFeature } from "@/domain/features/list-public-catalog-filters";
import { setupListPublicProductsFeature } from "@/domain/features/list-public-products";
import { setupListRelatedPublicProductsFeature } from "@/domain/features/list-related-public-products";
import { setupRecordAdminAuditLogFeature } from "@/domain/features/record-admin-audit-log";
import { setupRetrievePublicCatalogPageDataFeature } from "@/domain/features/retrieve-public-catalog-page-data";
import { setupRetrievePublicProductBySlugFeature } from "@/domain/features/retrieve-public-product-by-slug";
import { setupRetrieveFallbackLandingPageFeature } from "@/domain/features/retrieve-fallback-landing-page";
import { setupRetrieveMediaAssetFeature } from "@/domain/features/retrieve-media-asset";
import { setupRetrievePublicLandingPageContentFeature } from "@/domain/features/retrieve-public-landing-page-content";
import { setupRetrievePublicLandingPageRowsFeature } from "@/domain/features/retrieve-public-landing-page-rows";
import { setupRetrieveSiteSettingFeature } from "@/domain/features/retrieve-site-setting";
import { setupRetrieveStaticWhatsAppMessageFeature } from "@/domain/features/retrieve-static-whatsapp-message";
import {
  adminAuditLogRepositories,
  categoryRepositories,
  landingPageRepositories,
  mediaRepositories,
  productRepositories,
  siteSettingRepositories,
  tagRepositories,
} from "./repositories";

export const retrieveFallbackLandingPageFeature =
  setupRetrieveFallbackLandingPageFeature();

export const retrievePublicLandingPageRowsFeature =
  setupRetrievePublicLandingPageRowsFeature({
    repositories: landingPageRepositories,
  });

export const retrievePublicLandingPageContentFeature =
  setupRetrievePublicLandingPageContentFeature({
    retrieveFallbackLandingPage: retrieveFallbackLandingPageFeature.raw,
    retrievePublicLandingPageRows: retrievePublicLandingPageRowsFeature.raw,
  });

export const listPublicProductsFeature = setupListPublicProductsFeature({
  repositories: productRepositories,
});

export const listActiveCategoriesFeature = setupListActiveCategoriesFeature({
  repositories: categoryRepositories,
});

export const listActiveTagsFeature = setupListActiveTagsFeature({
  repositories: tagRepositories,
});

export const retrievePublicProductBySlugFeature =
  setupRetrievePublicProductBySlugFeature({
    repositories: productRepositories,
  });

export const listFeaturedPublicProductsFeature =
  setupListFeaturedPublicProductsFeature({
    listPublicProducts: listPublicProductsFeature.raw,
  });

export const listRelatedPublicProductsFeature =
  setupListRelatedPublicProductsFeature({
    listPublicProducts: listPublicProductsFeature.raw,
    repositories: productRepositories,
  });

export const listPublicCatalogFiltersFeature =
  setupListPublicCatalogFiltersFeature({
    listActiveCategories: listActiveCategoriesFeature.raw,
    listActiveTags: listActiveTagsFeature.raw,
  });

export const retrievePublicCatalogPageDataFeature =
  setupRetrievePublicCatalogPageDataFeature({
    listPublicCatalogFilters: listPublicCatalogFiltersFeature.raw,
    listPublicProducts: listPublicProductsFeature.raw,
  });

export const retrieveSiteSettingFeature = setupRetrieveSiteSettingFeature({
  repositories: siteSettingRepositories,
});

export const retrieveMediaAssetFeature = setupRetrieveMediaAssetFeature({
  repositories: mediaRepositories,
});

export const recordAdminAuditLogFeature = setupRecordAdminAuditLogFeature({
  repositories: adminAuditLogRepositories,
});

export const buildWhatsAppUrlFeature = setupBuildWhatsAppUrlFeature();

export const retrieveStaticWhatsAppMessageFeature =
  setupRetrieveStaticWhatsAppMessageFeature();
