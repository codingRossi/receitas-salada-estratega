import type { CategoryRepositories } from "../contracts/category-repositories";
import type { PublicCatalogCategoryFilter } from "../contracts/product-repositories";
import { toStable, type StableDomainResult } from "../shared/to-stable";
import { withLog } from "../shared/with-log";
import { buildPublicCatalogFilters } from "./public-catalog-helpers";

export type CategorySummaryFeatureOutput = PublicCatalogCategoryFilter;

export type ListActiveCategoriesFeatureOutput = CategorySummaryFeatureOutput[];

export type ListActiveCategoriesFeature = {
  raw: () => Promise<ListActiveCategoriesFeatureOutput>;
  stable: () => Promise<StableDomainResult<ListActiveCategoriesFeatureOutput>>;
};

export type SetupListActiveCategoriesFeatureInput = {
  repositories: Pick<CategoryRepositories, "listActiveCategories">;
};

/**
 * Lista categorias públicas usadas em filtros do catálogo.
 *
 * Categorias inativas podem continuar ligadas a produtos no banco, mas nunca
 * devem aparecer como filtro público.
 */
export function setupListActiveCategoriesFeature({
  repositories,
}: SetupListActiveCategoriesFeatureInput): ListActiveCategoriesFeature {
  async function listActiveCategoriesRaw(): Promise<ListActiveCategoriesFeatureOutput> {
    const categoryRows = await repositories.listActiveCategories();

    return buildPublicCatalogFilters({
      categoryRows,
      tagRows: [],
    }).categories;
  }

  const loggedListActiveCategoriesRaw = withLog(
    listActiveCategoriesRaw,
    "list-active-categories-raw",
  );

  return {
    raw: loggedListActiveCategoriesRaw,
    stable: withLog(
      toStable(loggedListActiveCategoriesRaw),
      "list-active-categories-stable",
    ),
  };
}
