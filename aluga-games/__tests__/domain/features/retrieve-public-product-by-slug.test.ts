import { describe, expect, it } from "bun:test";

import { setupRetrievePublicProductBySlugFeature } from "../../../src/domain/features/retrieve-public-product-by-slug";
import {
  buildProductDetailsBaseRow,
  buildRetrievePublicProductBySlugRepositories,
} from "./public-catalog-test-helpers";

describe("retrievePublicProductBySlug feature", () => {
  it("returns null when the product slug does not exist", async () => {
    const retrievePublicProductBySlugFeature =
      setupRetrievePublicProductBySlugFeature({
        repositories: buildRetrievePublicProductBySlugRepositories(),
      });

    await expect(
      retrievePublicProductBySlugFeature.raw({ slug: "inexistente" }),
    ).resolves.toBeNull();
  });

  it("returns null when the product is inactive", async () => {
    const retrievePublicProductBySlugFeature =
      setupRetrievePublicProductBySlugFeature({
        repositories: buildRetrievePublicProductBySlugRepositories({
          retrievePublicProductBaseRowBySlug: async () =>
            buildProductDetailsBaseRow({ status: "inactive" }),
        }),
      });

    await expect(
      retrievePublicProductBySlugFeature.raw({ slug: "produto-inativo" }),
    ).resolves.toBeNull();
  });

  it("keeps unavailable products public for the UI warning", async () => {
    const retrievePublicProductBySlugFeature =
      setupRetrievePublicProductBySlugFeature({
        repositories: buildRetrievePublicProductBySlugRepositories({
          retrievePublicProductBaseRowBySlug: async () =>
            buildProductDetailsBaseRow({
              id: "product-unavailable",
              status: "unavailable",
            }),
        }),
      });

    const publicProduct = await retrievePublicProductBySlugFeature.raw({
      slug: "produto-indisponivel",
    });

    expect(publicProduct?.id).toBe("product-unavailable");
    expect(publicProduct?.status).toBe("unavailable");
  });

  it("hydrates categories, tags, media, videos and specs for public details", async () => {
    const retrievePublicProductBySlugFeature =
      setupRetrievePublicProductBySlugFeature({
        repositories: buildRetrievePublicProductBySlugRepositories({
          findPublicProductCategoriesByProductIds: async () => [
            {
              id: "category",
              name: "Categoria",
              productId: "product",
              slug: "categoria",
            },
          ],
          findPublicProductMediaByProductId: async () => [
            {
              altText: "Imagem",
              id: "media",
              isCover: true,
              position: 1,
              url: "/media.jpg",
            },
          ],
          findPublicProductSpecsByProductId: async () => [
            {
              id: "spec",
              label: "Energia",
              position: 1,
              value: "110v",
            },
          ],
          findPublicProductTagsByProductIds: async () => [
            {
              id: "tag",
              name: "Tag",
              productId: "product",
              slug: "tag",
              type: "public",
            },
          ],
          findPublicProductVideosByProductId: async () => [
            {
              id: "video",
              position: 1,
              provider: "youtube",
              title: "Video",
              url: "https://example.com/video",
            },
          ],
          retrievePublicProductBaseRowBySlug: async () =>
            buildProductDetailsBaseRow({ id: "product" }),
        }),
      });

    const publicProduct = await retrievePublicProductBySlugFeature.raw({
      slug: "produto",
    });

    expect(publicProduct?.categories).toEqual([
      { id: "category", name: "Categoria", slug: "categoria" },
    ]);
    expect(publicProduct?.tags).toEqual([
      { id: "tag", name: "Tag", slug: "tag", type: "public" },
    ]);
    expect(publicProduct?.media).toHaveLength(1);
    expect(publicProduct?.videos).toHaveLength(1);
    expect(publicProduct?.specs).toHaveLength(1);
  });
});
