import { describe, expect, it } from "bun:test";

import { setupListFeaturedPublicProductsFeature } from "../../../src/domain/features/list-featured-public-products";
import { buildPublicProductListItem } from "./public-catalog-test-helpers";

describe("listFeaturedPublicProducts feature", () => {
  it("reuses the public product list with the featured filter", async () => {
    const receivedInputs: unknown[] = [];
    const listFeaturedPublicProductsFeature =
      setupListFeaturedPublicProductsFeature({
        listPublicProducts: async (input) => {
          receivedInputs.push(input);

          return {
            items: [buildPublicProductListItem({ id: "featured" })],
            page: input.page,
            perPage: input.perPage,
            total: 1,
          };
        },
      });

    const featuredProducts = await listFeaturedPublicProductsFeature.raw();

    expect(receivedInputs).toEqual([
      {
        featured: true,
        page: 1,
        perPage: 6,
      },
    ]);
    expect(featuredProducts.map((product) => product.id)).toEqual(["featured"]);
  });

  it("passes custom limit as public list perPage", async () => {
    const receivedPerPages: number[] = [];
    const listFeaturedPublicProductsFeature =
      setupListFeaturedPublicProductsFeature({
        listPublicProducts: async (input) => {
          receivedPerPages.push(input.perPage);

          return {
            items: [],
            page: input.page,
            perPage: input.perPage,
            total: 0,
          };
        },
      });

    await listFeaturedPublicProductsFeature.raw({ limit: 3 });

    expect(receivedPerPages).toEqual([3]);
  });
});
