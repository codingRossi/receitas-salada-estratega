/**
 * Repository Drizzle para consultas públicas da landing page.
 *
 * Este arquivo deve buscar rows do banco e aplicar filtros de publicação. A
 * montagem do DTO final, normalização de URL e fallback ficam na feature.
 */

import "server-only";

import { and, asc, eq, inArray, isNull } from "drizzle-orm";
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
} from "@/domain/contracts";
import {
  clientLogos,
  faqs,
  galleryAlbums,
  galleryPhotos,
  landingPageBlockItems,
  landingPageBlocks,
  mediaAssets,
  productMedia,
  products,
  siteSettings,
  testimonials,
} from "@/server/db/schema";

const FEATURED_PRODUCTS_LIMIT = 6;
const CLIENT_LOGOS_LIMIT = 12;
const TESTIMONIALS_LIMIT = 3;
const FAQS_LIMIT = 6;
const GALLERY_PREVIEW_LIMIT = 4;
const SITE_SETTING_ROW_LIMIT = 1;

export class DrizzleLandingPageRepository implements LandingPageRepositories {
  public async findActiveLandingPageBlocks(): Promise<LandingPageBlockRow[]> {
    const { db } = await import("@/server/db");

    return db
      .select({
        id: landingPageBlocks.id,
        key: landingPageBlocks.key,
        type: landingPageBlocks.type,
        title: landingPageBlocks.title,
        subtitle: landingPageBlocks.subtitle,
        description: landingPageBlocks.description,
        ctaLabel: landingPageBlocks.ctaLabel,
        ctaUrl: landingPageBlocks.ctaUrl,
      })
      .from(landingPageBlocks)
      .where(
        and(
          eq(landingPageBlocks.isActive, true),
          isNull(landingPageBlocks.deletedAt),
        ),
      )
      .orderBy(asc(landingPageBlocks.position));
  }

  public async findActiveBlockItemsByBlockIds(
    blockIds: string[],
  ): Promise<LandingPageBlockItemRow[]> {
    if (blockIds.length === 0) {
      return [];
    }

    const { db } = await import("@/server/db");

    return db
      .select({
        blockId: landingPageBlockItems.blockId,
        title: landingPageBlockItems.title,
        subtitle: landingPageBlockItems.subtitle,
        description: landingPageBlockItems.description,
        ctaLabel: landingPageBlockItems.ctaLabel,
        ctaUrl: landingPageBlockItems.ctaUrl,
        imageUrl: mediaAssets.url,
        imageAlt: mediaAssets.altText,
      })
      .from(landingPageBlockItems)
      .leftJoin(
        mediaAssets,
        eq(landingPageBlockItems.mediaAssetId, mediaAssets.id),
      )
      .where(
        and(
          inArray(landingPageBlockItems.blockId, blockIds),
          eq(landingPageBlockItems.isActive, true),
          isNull(landingPageBlockItems.deletedAt),
        ),
      )
      .orderBy(asc(landingPageBlockItems.position));
  }

  public async findFeaturedProducts(): Promise<
    LandingPageFeaturedProductRow[]
  > {
    const { db } = await import("@/server/db");

    return db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        shortDescription: products.shortDescription,
        imageUrl: mediaAssets.url,
        imageAlt: mediaAssets.altText,
      })
      .from(products)
      .leftJoin(
        productMedia,
        and(
          eq(productMedia.productId, products.id),
          eq(productMedia.isCover, true),
          eq(productMedia.isActive, true),
        ),
      )
      .leftJoin(mediaAssets, eq(productMedia.mediaAssetId, mediaAssets.id))
      .where(
        and(
          eq(products.status, "active"),
          eq(products.isFeatured, true),
          isNull(products.deletedAt),
        ),
      )
      .orderBy(asc(products.name))
      .limit(FEATURED_PRODUCTS_LIMIT);
  }

  public async findActiveClientLogos(): Promise<LandingPageClientLogoRow[]> {
    const { db } = await import("@/server/db");

    return db
      .select({
        name: clientLogos.name,
        imageUrl: mediaAssets.url,
        imageAlt: mediaAssets.altText,
      })
      .from(clientLogos)
      .innerJoin(mediaAssets, eq(clientLogos.mediaAssetId, mediaAssets.id))
      .where(
        and(
          eq(clientLogos.isActive, true),
          isNull(clientLogos.deletedAt),
          isNull(mediaAssets.deletedAt),
        ),
      )
      .orderBy(asc(clientLogos.position))
      .limit(CLIENT_LOGOS_LIMIT);
  }

  public async findActiveTestimonials(): Promise<
    LandingPageTestimonialRow[]
  > {
    const { db } = await import("@/server/db");

    return db
      .select({
        authorName: testimonials.authorName,
        authorRole: testimonials.authorRole,
        companyName: testimonials.companyName,
        content: testimonials.content,
      })
      .from(testimonials)
      .where(
        and(eq(testimonials.isActive, true), isNull(testimonials.deletedAt)),
      )
      .orderBy(asc(testimonials.position))
      .limit(TESTIMONIALS_LIMIT);
  }

  public async findActiveFaqs(): Promise<LandingPageFaqRow[]> {
    const { db } = await import("@/server/db");

    return db
      .select({
        question: faqs.question,
        answer: faqs.answer,
      })
      .from(faqs)
      .where(and(eq(faqs.isActive, true), isNull(faqs.deletedAt)))
      .orderBy(asc(faqs.position))
      .limit(FAQS_LIMIT);
  }

  public async findGalleryPreview(): Promise<LandingPageGalleryPreviewRow[]> {
    const { db } = await import("@/server/db");

    return db
      .select({
        title: galleryAlbums.title,
        subtitle: galleryAlbums.eventType,
        imageUrl: mediaAssets.url,
        imageAlt: mediaAssets.altText,
      })
      .from(galleryPhotos)
      .innerJoin(galleryAlbums, eq(galleryPhotos.albumId, galleryAlbums.id))
      .innerJoin(mediaAssets, eq(galleryPhotos.mediaAssetId, mediaAssets.id))
      .where(
        and(
          eq(galleryAlbums.isActive, true),
          eq(galleryPhotos.isActive, true),
          isNull(galleryAlbums.deletedAt),
          isNull(galleryPhotos.deletedAt),
          isNull(mediaAssets.deletedAt),
        ),
      )
      .orderBy(asc(galleryAlbums.title), asc(galleryPhotos.position))
      .limit(GALLERY_PREVIEW_LIMIT);
  }

  public async findSiteSettingByKey(
    key: string,
  ): Promise<LandingPageSiteSettingRow | null> {
    const { db } = await import("@/server/db");

    const rows = await db
      .select({
        key: siteSettings.key,
        value: siteSettings.value,
      })
      .from(siteSettings)
      .where(eq(siteSettings.key, key))
      .limit(SITE_SETTING_ROW_LIMIT);

    return rows[0] ?? null;
  }
}
