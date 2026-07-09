import { expect, it, mock } from "bun:test";
import { inArray } from "drizzle-orm";

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
} from "../../../src/server/db/schema";
import {
  buildRepositoryTestKey,
  describeRepositoryIntegration,
  getRepositoryTestDb,
} from "./repository-integration-helpers";

mock.module("server-only", () => ({}));

describeRepositoryIntegration("DrizzleProductRepository integration", () => {
  it("returns only public product data and active child records", async () => {
    const { DrizzleProductRepository } =
      await import("../../../src/infra/repositories/drizzle-product-repository");
    const db = await getRepositoryTestDb();
    const repository = new DrizzleProductRepository();
    const insertedProducts = await db
      .insert(products)
      .values([
        {
          isFeatured: true,
          name: "Produto ativo teste",
          slug: buildRepositoryTestKey("product-active"),
          status: "active",
        },
        {
          name: "Produto indisponivel teste",
          slug: buildRepositoryTestKey("product-unavailable"),
          status: "unavailable",
        },
        {
          name: "Produto inativo teste",
          slug: buildRepositoryTestKey("product-inactive"),
          status: "inactive",
        },
        {
          deletedAt: new Date(),
          name: "Produto removido teste",
          slug: buildRepositoryTestKey("product-deleted"),
          status: "active",
        },
      ])
      .returning({ id: products.id, slug: products.slug });
    const [activeProduct, unavailableProduct, inactiveProduct, deletedProduct] =
      insertedProducts;
    const insertedCategories = await db
      .insert(categories)
      .values([
        {
          name: "Categoria produto teste",
          slug: buildRepositoryTestKey("product-category-active"),
        },
        {
          isActive: false,
          name: "Categoria produto inativa teste",
          slug: buildRepositoryTestKey("product-category-inactive"),
        },
      ])
      .returning({ id: categories.id });
    const insertedTags = await db
      .insert(tags)
      .values([
        {
          name: "Tag produto teste",
          slug: buildRepositoryTestKey("product-tag-active"),
          type: "public",
        },
        {
          isActive: false,
          name: "Tag produto inativa teste",
          slug: buildRepositoryTestKey("product-tag-inactive"),
          type: "public",
        },
      ])
      .returning({ id: tags.id });
    const insertedMediaAssets = await db
      .insert(mediaAssets)
      .values([
        {
          altText: "Capa",
          mimeType: "image/jpeg",
          ownerType: "product",
          storageKey: buildRepositoryTestKey("product-media-active"),
          url: "/produto-capa.jpg",
        },
        {
          deletedAt: new Date(),
          mimeType: "image/jpeg",
          ownerType: "product",
          storageKey: buildRepositoryTestKey("product-media-deleted"),
          url: "/produto-removida.jpg",
        },
      ])
      .returning({ id: mediaAssets.id });

    try {
      await db.insert(productCategories).values([
        {
          categoryId: insertedCategories[0].id,
          productId: activeProduct.id,
        },
        {
          categoryId: insertedCategories[1].id,
          productId: activeProduct.id,
        },
      ]);
      await db.insert(productTags).values([
        {
          productId: activeProduct.id,
          tagId: insertedTags[0].id,
        },
        {
          productId: activeProduct.id,
          tagId: insertedTags[1].id,
        },
      ]);
      await db.insert(productMedia).values([
        {
          isCover: true,
          mediaAssetId: insertedMediaAssets[0].id,
          position: 1,
          productId: activeProduct.id,
        },
        {
          mediaAssetId: insertedMediaAssets[1].id,
          position: 2,
          productId: activeProduct.id,
        },
        {
          isActive: false,
          mediaAssetId: insertedMediaAssets[0].id,
          position: 3,
          productId: activeProduct.id,
        },
      ]);
      await db.insert(productVideos).values([
        {
          position: 1,
          productId: activeProduct.id,
          title: "Video ativo",
          url: "https://example.com/video",
        },
        {
          isActive: false,
          position: 2,
          productId: activeProduct.id,
          title: "Video inativo",
          url: "https://example.com/video-inativo",
        },
      ]);
      await db.insert(productSpecs).values([
        {
          label: "Energia",
          position: 1,
          productId: activeProduct.id,
          value: "110v",
        },
        {
          isActive: false,
          label: "Inativa",
          position: 2,
          productId: activeProduct.id,
          value: "nao publicar",
        },
      ]);

      const createdProductIds = insertedProducts.map((product) => product.id);
      const publicProducts = await repository.listPublicProductBaseRows({
        limit: 20,
        offset: 0,
        productIdFilters: [createdProductIds],
      });
      const publicProductIds = publicProducts.map((product) => product.id);
      const totalPublicProducts = await repository.countPublicProducts({
        productIdFilters: [createdProductIds],
      });
      const activeProductBySlug =
        await repository.retrievePublicProductBaseRowBySlug({
          slug: activeProduct.slug,
        });
      const inactiveProductBySlug =
        await repository.retrievePublicProductBaseRowBySlug({
          slug: inactiveProduct.slug,
        });
      const categoryRows =
        await repository.findPublicProductCategoriesByProductIds({
          productIds: [activeProduct.id],
        });
      const tagRows = await repository.findPublicProductTagsByProductIds({
        productIds: [activeProduct.id],
      });
      const coverImages =
        await repository.findPublicProductCoverImagesByProductIds({
          productIds: [activeProduct.id],
        });
      const mediaRows = await repository.findPublicProductMediaByProductId({
        productId: activeProduct.id,
      });
      const videoRows = await repository.findPublicProductVideosByProductId({
        productId: activeProduct.id,
      });
      const specRows = await repository.findPublicProductSpecsByProductId({
        productId: activeProduct.id,
      });

      expect(publicProductIds).toContain(activeProduct.id);
      expect(publicProductIds).toContain(unavailableProduct.id);
      expect(publicProductIds).not.toContain(inactiveProduct.id);
      expect(publicProductIds).not.toContain(deletedProduct.id);
      expect(totalPublicProducts).toBe(2);
      expect(activeProductBySlug?.id).toBe(activeProduct.id);
      expect(inactiveProductBySlug).toBeNull();
      expect(categoryRows.map((category) => category.id)).toEqual([
        insertedCategories[0].id,
      ]);
      expect(tagRows.map((tag) => tag.id)).toEqual([insertedTags[0].id]);
      expect(coverImages).toHaveLength(1);
      expect(Object.keys(coverImages[0] ?? {})).not.toContain("storageKey");
      expect(mediaRows.map((media) => media.url)).toEqual([
        "/produto-capa.jpg",
      ]);
      expect(videoRows.map((video) => video.title)).toEqual(["Video ativo"]);
      expect(specRows.map((spec) => spec.label)).toEqual(["Energia"]);
    } finally {
      const productIds = insertedProducts.map((product) => product.id);
      await db
        .delete(productSpecs)
        .where(inArray(productSpecs.productId, productIds));
      await db
        .delete(productVideos)
        .where(inArray(productVideos.productId, productIds));
      await db
        .delete(productMedia)
        .where(inArray(productMedia.productId, productIds));
      await db
        .delete(productTags)
        .where(inArray(productTags.productId, productIds));
      await db
        .delete(productCategories)
        .where(inArray(productCategories.productId, productIds));
      await db.delete(products).where(inArray(products.id, productIds));
      await db.delete(mediaAssets).where(
        inArray(
          mediaAssets.id,
          insertedMediaAssets.map((mediaAsset) => mediaAsset.id),
        ),
      );
      await db.delete(categories).where(
        inArray(
          categories.id,
          insertedCategories.map((category) => category.id),
        ),
      );
      await db.delete(tags).where(
        inArray(
          tags.id,
          insertedTags.map((tag) => tag.id),
        ),
      );
    }
  });
});
