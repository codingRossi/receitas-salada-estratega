import { describe, expect, it } from "bun:test";

import { setupListPublicProductsFeature } from "../../../src/domain/features/list-public-products";
import {
  buildListPublicProductsRepositories,
  buildProductBaseRow,
} from "./public-catalog-test-helpers";

describe("listPublicProducts feature", () => {
  it("does not return inactive products in public lists", async () => {
    const listPublicProductsFeature = setupListPublicProductsFeature({
      repositories: buildListPublicProductsRepositories({
        countPublicProducts: async () => 2,
        listPublicProductBaseRows: async () => [
          buildProductBaseRow({ id: "active", status: "active" }),
          buildProductBaseRow({ id: "inactive", status: "inactive" }),
        ],
      }),
    });

    const publicProducts = await listPublicProductsFeature.raw();

    expect(publicProducts.items.map((product) => product.id)).toEqual([
      "active",
    ]);
  });

  it("keeps unavailable products with explicit status", async () => {
    const listPublicProductsFeature = setupListPublicProductsFeature({
      repositories: buildListPublicProductsRepositories({
        countPublicProducts: async () => 1,
        listPublicProductBaseRows: async () => [
          buildProductBaseRow({
            id: "unavailable",
            status: "unavailable",
          }),
        ],
      }),
    });

    const publicProducts = await listPublicProductsFeature.raw();

    expect(publicProducts.items).toHaveLength(1);
    expect(publicProducts.items[0]?.status).toBe("unavailable");
  });

  it("returns an empty page when a public relation filter has no product ids", async () => {
    let productRowsWereLoaded = false;
    const listPublicProductsFeature = setupListPublicProductsFeature({
      repositories: buildListPublicProductsRepositories({
        findPublicProductIdsByCategorySlugs: async () => [],
        listPublicProductBaseRows: async () => {
          productRowsWereLoaded = true;
          return [];
        },
      }),
    });

    const publicProducts = await listPublicProductsFeature.raw({
      categorySlugs: ["sem-produtos"],
    });

    expect(productRowsWereLoaded).toBe(false);
    expect(publicProducts).toEqual({
      items: [],
      page: 1,
      perPage: 24,
      total: 0,
    });
  });

  it("hydrates public categories, tags and cover image from relation rows", async () => {
    const listPublicProductsFeature = setupListPublicProductsFeature({
      repositories: buildListPublicProductsRepositories({
        countPublicProducts: async () => 1,
        findPublicProductCategoriesByProductIds: async () => [
          {
            id: "category",
            name: "Categoria",
            productId: "product",
            slug: "categoria",
          },
        ],
        findPublicProductCoverImagesByProductIds: async () => [
          {
            altText: "Imagem do produto",
            isCover: true,
            position: 1,
            productId: "product",
            url: "/produto.jpg",
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
        listPublicProductBaseRows: async () => [
          buildProductBaseRow({ id: "product" }),
        ],
      }),
    });

    const publicProducts = await listPublicProductsFeature.raw();

    expect(publicProducts.items[0]?.categories).toEqual([
      { id: "category", name: "Categoria", slug: "categoria" },
    ]);
    expect(publicProducts.items[0]?.tags).toEqual([
      { id: "tag", name: "Tag", slug: "tag", type: "public" },
    ]);
    expect(publicProducts.items[0]?.coverImage).toEqual({
      altText: "Imagem do produto",
      url: "/produto.jpg",
    });
  });
});
