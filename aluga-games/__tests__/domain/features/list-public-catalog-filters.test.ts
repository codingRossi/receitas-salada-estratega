import { describe, expect, it } from "bun:test";

import { setupListActiveCategoriesFeature } from "../../../src/domain/features/list-active-categories";
import { setupListActiveTagsFeature } from "../../../src/domain/features/list-active-tags";
import { setupListPublicCatalogFiltersFeature } from "../../../src/domain/features/list-public-catalog-filters";

describe("public catalog filter features", () => {
  it("does not expose inactive categories as public filters", async () => {
    const listActiveCategoriesFeature = setupListActiveCategoriesFeature({
      repositories: {
        listActiveCategories: async () => [
          {
            description: null,
            id: "active-category",
            isActive: true,
            name: "Categoria ativa",
            slug: "categoria-ativa",
          },
          {
            description: null,
            id: "inactive-category",
            isActive: false,
            name: "Categoria inativa",
            slug: "categoria-inativa",
          },
        ],
      },
    });

    const categories = await listActiveCategoriesFeature.raw();

    expect(categories.map((category) => category.id)).toEqual([
      "active-category",
    ]);
  });

  it("does not expose inactive tags as public filters", async () => {
    const listActiveTagsFeature = setupListActiveTagsFeature({
      repositories: {
        listActiveTags: async () => [
          {
            id: "active-tag",
            isActive: true,
            name: "Tag ativa",
            slug: "tag-ativa",
            type: "public",
          },
          {
            id: "inactive-tag",
            isActive: false,
            name: "Tag inativa",
            slug: "tag-inativa",
            type: "public",
          },
        ],
      },
    });

    const tags = await listActiveTagsFeature.raw();

    expect(tags.map((tag) => tag.id)).toEqual(["active-tag"]);
  });

  it("combines active categories and tags into catalog filters", async () => {
    const listPublicCatalogFiltersFeature =
      setupListPublicCatalogFiltersFeature({
        listActiveCategories: async () => [
          {
            description: null,
            id: "category",
            name: "Categoria",
            slug: "categoria",
          },
        ],
        listActiveTags: async () => [
          {
            id: "tag",
            name: "Tag",
            slug: "tag",
            type: "public",
          },
        ],
      });

    const filters = await listPublicCatalogFiltersFeature.raw();

    expect(filters.categories.map((category) => category.id)).toEqual([
      "category",
    ]);
    expect(filters.tags.map((tag) => tag.id)).toEqual(["tag"]);
  });
});
