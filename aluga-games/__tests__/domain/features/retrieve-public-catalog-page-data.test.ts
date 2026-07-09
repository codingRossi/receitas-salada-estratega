import { describe, expect, it } from "bun:test";

import { setupRetrievePublicCatalogPageDataFeature } from "../../../src/domain/features/retrieve-public-catalog-page-data";
import { buildPublicProductListItem } from "./public-catalog-test-helpers";

describe("retrievePublicCatalogPageData feature", () => {
  it("combines public products and filters for the catalog page", async () => {
    const receivedProductInputs: unknown[] = [];
    const retrievePublicCatalogPageDataFeature =
      setupRetrievePublicCatalogPageDataFeature({
        listPublicCatalogFilters: async () => ({
          categories: [
            {
              description: null,
              id: "category",
              name: "Categoria",
              slug: "categoria",
            },
          ],
          tags: [],
        }),
        listPublicProducts: async (input) => {
          receivedProductInputs.push(input);

          return {
            items: [buildPublicProductListItem({ id: "product" })],
            page: 2,
            perPage: 12,
            total: 1,
          };
        },
      });

    const pageData = await retrievePublicCatalogPageDataFeature.raw({
      page: 2,
      perPage: 12,
      search: "fliperama",
    });

    expect(receivedProductInputs).toEqual([
      {
        page: 2,
        perPage: 12,
        search: "fliperama",
      },
    ]);
    expect(pageData.products.items.map((product) => product.id)).toEqual([
      "product",
    ]);
    expect(pageData.filters.categories.map((category) => category.id)).toEqual([
      "category",
    ]);
  });
});
