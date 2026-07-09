import { describe, expect, it } from "bun:test";

import { setupListPublicProductsFeature } from "../../../src/domain/features/list-public-products";
import { setupListRelatedPublicProductsFeature } from "../../../src/domain/features/list-related-public-products";
import {
  buildListPublicProductsRepositories,
  buildProductBaseRow,
  buildPublicProductListItem,
} from "./public-catalog-test-helpers";

describe("listRelatedPublicProducts feature", () => {
  it("excludes the current product and inactive products from related products", async () => {
    const listPublicProductsFeature = setupListPublicProductsFeature({
      repositories: buildListPublicProductsRepositories({
        countPublicProducts: async () => 3,
        findPublicProductCategoriesByProductIds: async () => [
          {
            id: "category",
            name: "Categoria",
            productId: "current",
            slug: "cat",
          },
          {
            id: "category",
            name: "Categoria",
            productId: "related",
            slug: "cat",
          },
          {
            id: "category",
            name: "Categoria",
            productId: "inactive",
            slug: "cat",
          },
        ],
        listPublicProductBaseRows: async () => [
          buildProductBaseRow({ id: "current" }),
          buildProductBaseRow({ id: "related" }),
          buildProductBaseRow({ id: "inactive", status: "inactive" }),
        ],
      }),
    });
    const listRelatedPublicProductsFeature =
      setupListRelatedPublicProductsFeature({
        listPublicProducts: listPublicProductsFeature.raw,
        repositories: {
          findPublicProductIdsByCategoryIds: async () => [
            "current",
            "related",
            "inactive",
          ],
          findPublicProductIdsByTagIds: async () => [],
        },
      });

    const relatedProducts = await listRelatedPublicProductsFeature.raw({
      categoryIds: ["category"],
      productId: "current",
      tagIds: [],
    });

    expect(relatedProducts.map((product) => product.id)).toEqual(["related"]);
  });

  it("sorts related products by shared category and tag score", async () => {
    const listRelatedPublicProductsFeature =
      setupListRelatedPublicProductsFeature({
        listPublicProducts: async () => ({
          items: [
            buildPublicProductListItem({
              categories: [{ id: "category", name: "Categoria", slug: "cat" }],
              id: "category-match",
              name: "B",
            }),
            buildPublicProductListItem({
              id: "tag-match",
              name: "A",
              tags: [
                {
                  id: "tag",
                  name: "Tag",
                  slug: "tag",
                  type: "public",
                },
              ],
            }),
          ],
          page: 1,
          perPage: 48,
          total: 2,
        }),
        repositories: {
          findPublicProductIdsByCategoryIds: async () => ["category-match"],
          findPublicProductIdsByTagIds: async () => ["tag-match"],
        },
      });

    const relatedProducts = await listRelatedPublicProductsFeature.raw({
      categoryIds: ["category"],
      productId: "current",
      tagIds: ["tag"],
    });

    expect(relatedProducts.map((product) => product.id)).toEqual([
      "category-match",
      "tag-match",
    ]);
  });
});
