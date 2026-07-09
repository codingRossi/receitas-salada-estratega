import type {
  PublicCatalogFilters,
  PublicProductFilters,
} from "../contracts/product-repositories";
import { toStable, type StableDomainResult } from "../shared/to-stable";
import { withLog } from "../shared/with-log";
import type { ListPublicProductsFeatureOutput } from "./list-public-products";

export type RetrievePublicCatalogPageDataFeatureInput = PublicProductFilters;

export type RetrievePublicCatalogPageDataFeatureOutput = {
  filters: PublicCatalogFilters;
  products: ListPublicProductsFeatureOutput;
};

export type RetrievePublicCatalogPageDataFeature = {
  raw: (
    input?: RetrievePublicCatalogPageDataFeatureInput,
  ) => Promise<RetrievePublicCatalogPageDataFeatureOutput>;
  stable: (
    input?: RetrievePublicCatalogPageDataFeatureInput,
  ) => Promise<StableDomainResult<RetrievePublicCatalogPageDataFeatureOutput>>;
};

export type SetupRetrievePublicCatalogPageDataFeatureInput = {
  listPublicCatalogFilters: () => Promise<PublicCatalogFilters>;
  listPublicProducts: (
    input?: PublicProductFilters,
  ) => Promise<ListPublicProductsFeatureOutput>;
};

/**
 * Carrega os dados reutilizáveis da página pública de catálogo.
 *
 * A task 007 não implementa UI, mas deixa a query composta pronta para a página
 * `/produtos` consumir sem espalhar filtros em `page.tsx`.
 */
export function setupRetrievePublicCatalogPageDataFeature({
  listPublicCatalogFilters,
  listPublicProducts,
}: SetupRetrievePublicCatalogPageDataFeatureInput): RetrievePublicCatalogPageDataFeature {
  async function retrievePublicCatalogPageDataRaw(
    input: RetrievePublicCatalogPageDataFeatureInput = {},
  ): Promise<RetrievePublicCatalogPageDataFeatureOutput> {
    const [products, filters] = await Promise.all([
      listPublicProducts(input),
      listPublicCatalogFilters(),
    ]);

    return {
      products,
      filters,
    };
  }

  const loggedRetrievePublicCatalogPageDataRaw = withLog(
    retrievePublicCatalogPageDataRaw,
    "retrieve-public-catalog-page-data-raw",
  );

  return {
    raw: loggedRetrievePublicCatalogPageDataRaw,
    stable: withLog(
      toStable(loggedRetrievePublicCatalogPageDataRaw),
      "retrieve-public-catalog-page-data-stable",
    ),
  };
}
