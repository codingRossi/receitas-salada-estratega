/**
 * Repositories Drizzle de produto.
 *
 * O arquivo é agrupado pela entidade `products`, mas cada método executa uma
 * única ação de banco. Composição entre consultas públicas fica nas features.
 */

import "server-only";

import { and, asc, count, desc, eq, inArray, isNull, type SQL } from "drizzle-orm";
import type {
  CountPublicProductsRepositoryInput,
  FindPublicProductChildrenByProductIdRepositoryInput,
  FindPublicProductIdsByCategoryIdsRepositoryInput,
  FindPublicProductIdsByCategorySlugsRepositoryInput,
  FindPublicProductIdsByTagIdsRepositoryInput,
  FindPublicProductIdsByTagSlugsRepositoryInput,
  FindPublicProductRelationsByProductIdsRepositoryInput,
  ListPublicProductBaseRowsRepositoryInput,
  ProductRepositories,
  PublicProductBaseRow,
  PublicProductCategoryRelationRow,
  PublicProductCoverImageRelationRow,
  PublicProductDetailsBaseRow,
  PublicProductMediaItem,
  PublicProductSpecItem,
  PublicProductTagRelationRow,
  PublicProductVideoItem,
  RetrievePublicProductBaseRowBySlugRepositoryInput,
} from "@/domain/contracts";
import {
  categories,
  mediaAssets,
  productCategories,
  productMedia,
  products,
  productSpecs,
  productTags,
  productVideos,
  tags,
} from "@/server/db/schema";
import {
  buildPublicProductConditions,
  publicProductBaseSelect,
  PUBLIC_PRODUCT_STATUSES,
} from "./public-product-query-helpers";

export class DrizzleProductRepository implements ProductRepositories {
  public async countPublicProducts(
    input: CountPublicProductsRepositoryInput,
  ): Promise<number> {
    const { db } = await import("@/server/db");
    const rows = await db
      .select({ value: count() })
      .from(products)
      .where(and(...buildPublicProductConditions(input, input.productIdFilters)));

    return Number(rows[0]?.value ?? 0);
  }

  public async listPublicProductBaseRows(
    input: ListPublicProductBaseRowsRepositoryInput,
  ): Promise<PublicProductBaseRow[]> {
    const { db } = await import("@/server/db");

    return db
      .select(publicProductBaseSelect)
      .from(products)
      .where(and(...buildPublicProductConditions(input, input.productIdFilters)))
      .orderBy(asc(products.name))
      .limit(input.limit)
      .offset(input.offset);
  }

  public async retrievePublicProductBaseRowBySlug({
    slug,
  }: RetrievePublicProductBaseRowBySlugRepositoryInput): Promise<PublicProductDetailsBaseRow | null> {
    const { db } = await import("@/server/db");
    const rows = await db
      .select({
        fullDescription: products.fullDescription,
        id: products.id,
        isFeatured: products.isFeatured,
        name: products.name,
        seoDescription: products.seoDescription,
        seoTitle: products.seoTitle,
        shortDescription: products.shortDescription,
        slug: products.slug,
        status: products.status,
      })
      .from(products)
      .where(
        and(
          eq(products.slug, slug),
          inArray(products.status, PUBLIC_PRODUCT_STATUSES),
          isNull(products.deletedAt),
        ),
      )
      .limit(1);

    return rows[0] ?? null;
  }

  public async findPublicProductIdsByCategorySlugs({
    categorySlugs,
  }: FindPublicProductIdsByCategorySlugsRepositoryInput): Promise<string[]> {
    if (categorySlugs.length === 0) {
      return [];
    }

    const { db } = await import("@/server/db");
    const rows = await db
      .selectDistinct({ productId: productCategories.productId })
      .from(productCategories)
      .innerJoin(categories, eq(productCategories.categoryId, categories.id))
      .where(
        and(
          inArray(categories.slug, categorySlugs),
          eq(categories.isActive, true),
          isNull(categories.deletedAt),
        ),
      );

    return rows.map((row) => row.productId);
  }

  public async findPublicProductIdsByTagSlugs({
    tagSlugs,
    tagTypes,
  }: FindPublicProductIdsByTagSlugsRepositoryInput): Promise<string[]> {
    if (tagSlugs.length === 0) {
      return [];
    }

    const { db } = await import("@/server/db");
    const conditions: SQL[] = [
      inArray(tags.slug, tagSlugs),
      eq(tags.isActive, true),
      isNull(tags.deletedAt),
    ];

    if (tagTypes && tagTypes.length > 0) {
      conditions.push(inArray(tags.type, tagTypes));
    }

    const rows = await db
      .selectDistinct({ productId: productTags.productId })
      .from(productTags)
      .innerJoin(tags, eq(productTags.tagId, tags.id))
      .where(and(...conditions));

    return rows.map((row) => row.productId);
  }

  public async findPublicProductIdsByCategoryIds({
    categoryIds,
  }: FindPublicProductIdsByCategoryIdsRepositoryInput): Promise<string[]> {
    if (categoryIds.length === 0) {
      return [];
    }

    const { db } = await import("@/server/db");
    const rows = await db
      .selectDistinct({ productId: productCategories.productId })
      .from(productCategories)
      .innerJoin(categories, eq(productCategories.categoryId, categories.id))
      .where(
        and(
          inArray(productCategories.categoryId, categoryIds),
          eq(categories.isActive, true),
          isNull(categories.deletedAt),
        ),
      );

    return rows.map((row) => row.productId);
  }

  public async findPublicProductIdsByTagIds({
    tagIds,
  }: FindPublicProductIdsByTagIdsRepositoryInput): Promise<string[]> {
    if (tagIds.length === 0) {
      return [];
    }

    const { db } = await import("@/server/db");
    const rows = await db
      .selectDistinct({ productId: productTags.productId })
      .from(productTags)
      .innerJoin(tags, eq(productTags.tagId, tags.id))
      .where(
        and(
          inArray(productTags.tagId, tagIds),
          eq(tags.isActive, true),
          isNull(tags.deletedAt),
        ),
      );

    return rows.map((row) => row.productId);
  }

  public async findPublicProductCategoriesByProductIds({
    productIds,
  }: FindPublicProductRelationsByProductIdsRepositoryInput): Promise<
    PublicProductCategoryRelationRow[]
  > {
    if (productIds.length === 0) {
      return [];
    }

    const { db } = await import("@/server/db");

    return db
      .select({
        id: categories.id,
        name: categories.name,
        productId: productCategories.productId,
        slug: categories.slug,
      })
      .from(productCategories)
      .innerJoin(categories, eq(productCategories.categoryId, categories.id))
      .where(
        and(
          inArray(productCategories.productId, productIds),
          eq(categories.isActive, true),
          isNull(categories.deletedAt),
        ),
      )
      .orderBy(asc(categories.name));
  }

  public async findPublicProductTagsByProductIds({
    productIds,
  }: FindPublicProductRelationsByProductIdsRepositoryInput): Promise<
    PublicProductTagRelationRow[]
  > {
    if (productIds.length === 0) {
      return [];
    }

    const { db } = await import("@/server/db");

    return db
      .select({
        id: tags.id,
        name: tags.name,
        productId: productTags.productId,
        slug: tags.slug,
        type: tags.type,
      })
      .from(productTags)
      .innerJoin(tags, eq(productTags.tagId, tags.id))
      .where(
        and(
          inArray(productTags.productId, productIds),
          eq(tags.isActive, true),
          isNull(tags.deletedAt),
        ),
      )
      .orderBy(asc(tags.name));
  }

  public async findPublicProductCoverImagesByProductIds({
    productIds,
  }: FindPublicProductRelationsByProductIdsRepositoryInput): Promise<
    PublicProductCoverImageRelationRow[]
  > {
    if (productIds.length === 0) {
      return [];
    }

    const { db } = await import("@/server/db");

    return db
      .select({
        altText: mediaAssets.altText,
        isCover: productMedia.isCover,
        position: productMedia.position,
        productId: productMedia.productId,
        url: mediaAssets.url,
      })
      .from(productMedia)
      .innerJoin(mediaAssets, eq(productMedia.mediaAssetId, mediaAssets.id))
      .where(
        and(
          inArray(productMedia.productId, productIds),
          eq(productMedia.isActive, true),
          isNull(mediaAssets.deletedAt),
        ),
      )
      .orderBy(
        asc(productMedia.productId),
        desc(productMedia.isCover),
        asc(productMedia.position),
      );
  }

  public async findPublicProductMediaByProductId({
    productId,
  }: FindPublicProductChildrenByProductIdRepositoryInput): Promise<
    PublicProductMediaItem[]
  > {
    const { db } = await import("@/server/db");

    return db
      .select({
        altText: mediaAssets.altText,
        id: productMedia.id,
        isCover: productMedia.isCover,
        position: productMedia.position,
        url: mediaAssets.url,
      })
      .from(productMedia)
      .innerJoin(mediaAssets, eq(productMedia.mediaAssetId, mediaAssets.id))
      .where(
        and(
          eq(productMedia.productId, productId),
          eq(productMedia.isActive, true),
          isNull(mediaAssets.deletedAt),
        ),
      )
      .orderBy(desc(productMedia.isCover), asc(productMedia.position));
  }

  public async findPublicProductVideosByProductId({
    productId,
  }: FindPublicProductChildrenByProductIdRepositoryInput): Promise<
    PublicProductVideoItem[]
  > {
    const { db } = await import("@/server/db");

    return db
      .select({
        id: productVideos.id,
        position: productVideos.position,
        provider: productVideos.provider,
        title: productVideos.title,
        url: productVideos.url,
      })
      .from(productVideos)
      .where(
        and(
          eq(productVideos.productId, productId),
          eq(productVideos.isActive, true),
        ),
      )
      .orderBy(asc(productVideos.position));
  }

  public async findPublicProductSpecsByProductId({
    productId,
  }: FindPublicProductChildrenByProductIdRepositoryInput): Promise<
    PublicProductSpecItem[]
  > {
    const { db } = await import("@/server/db");

    return db
      .select({
        id: productSpecs.id,
        label: productSpecs.label,
        position: productSpecs.position,
        value: productSpecs.value,
      })
      .from(productSpecs)
      .where(
        and(
          eq(productSpecs.productId, productId),
          eq(productSpecs.isActive, true),
        ),
      )
      .orderBy(asc(productSpecs.position));
  }
}
