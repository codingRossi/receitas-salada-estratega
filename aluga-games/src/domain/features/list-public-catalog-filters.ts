import type { PublicCatalogFilters } from "../contracts/product-repositories";
import { toStable, type StableDomainResult } from "../shared/to-stable";
import { withLog } from "../shared/with-log";
import type { ListActiveCategoriesFeatureOutput } from "./list-active-categories";
import type { ListActiveTagsFeatureOutput } from "./list-active-tags";

export type ListPublicCatalogFiltersFeatureOutput = PublicCatalogFilters;

export type ListPublicCatalogFiltersFeature = {
  raw: () => Promise<ListPublicCatalogFiltersFeatureOutput>;
  stable: () => Promise<StableDomainResult<ListPublicCatalogFiltersFeatureOutput>>;
};

export type SetupListPublicCatalogFiltersFeatureInput = {
  listActiveCategories: () => Promise<ListActiveCategoriesFeatureOutput>;
  listActiveTags: () => Promise<ListActiveTagsFeatureOutput>;
};

/**
 * Carrega os filtros públicos do catálogo.
 *
 * Esta feature compõe categorias e tags já sanitizadas para a página de
 * produtos não duplicar lógica de filtro público.
 */
export function setupListPublicCatalogFiltersFeature({
  listActiveCategories,
  listActiveTags,
}: SetupListPublicCatalogFiltersFeatureInput): ListPublicCatalogFiltersFeature {
  async function listPublicCatalogFiltersRaw(): Promise<ListPublicCatalogFiltersFeatureOutput> {
    const [categories, tags] = await Promise.all([
      listActiveCategories(),
      listActiveTags(),
    ]);

    return {
      categories,
      tags,
    };
  }

  const loggedListPublicCatalogFiltersRaw = withLog(
    listPublicCatalogFiltersRaw,
    "list-public-catalog-filters-raw",
  );

  return {
    raw: loggedListPublicCatalogFiltersRaw,
    stable: withLog(
      toStable(loggedListPublicCatalogFiltersRaw),
      "list-public-catalog-filters-stable",
    ),
  };
}
