import type {
  ProductRepositories,
  PublicProductFilters,
  PublicProductListItem,
} from "../contracts/product-repositories";
import { toStable, type StableDomainResult } from "../shared/to-stable";
import { withLog } from "../shared/with-log";
import {
  buildPublicProductListOutput,
  normalizeCatalogFilterValues,
  resolvePublicProductPagination,
} from "./public-catalog-helpers";

export type ListPublicProductsFeatureInput = PublicProductFilters;

export type ListPublicProductsFeatureOutput = {
  items: PublicProductListItem[];
  page: number;
  perPage: number;
  total: number;
};

export type ListPublicProductsFeature = {
  raw: (
    input?: ListPublicProductsFeatureInput,
  ) => Promise<ListPublicProductsFeatureOutput>;
  stable: (
    input?: ListPublicProductsFeatureInput,
  ) => Promise<StableDomainResult<ListPublicProductsFeatureOutput>>;
};

export type SetupListPublicProductsFeatureInput = {
  repositories: Pick<
    ProductRepositories,
    | "countPublicProducts"
    | "findPublicProductCategoriesByProductIds"
    | "findPublicProductCoverImagesByProductIds"
    | "findPublicProductIdsByCategorySlugs"
    | "findPublicProductIdsByTagSlugs"
    | "findPublicProductTagsByProductIds"
    | "listPublicProductBaseRows"
  >;
};

/**
 * Lista produtos públicos do catálogo sem vazar produtos inativos.
 *
 * Esta feature compõe queries atômicas: resolve filtros por relação, busca
 * produtos base, hidrata categorias/tags/imagem e aplica a barreira final de
 * status público antes de devolver dados ao frontend.
 */
export function setupListPublicProductsFeature({
  repositories,
}: SetupListPublicProductsFeatureInput): ListPublicProductsFeature {
  async function listPublicProductsRaw(
    input: ListPublicProductsFeatureInput = {},
  ): Promise<ListPublicProductsFeatureOutput> {
    const pagination = resolvePublicProductPagination(input);
    const productIdFilters = await resolvePublicProductIdFilters(
      repositories,
      input,
    );

    if (productIdFilters.some((productIds) => productIds.length === 0)) {
      return {
        items: [],
        page: pagination.page,
        perPage: pagination.perPage,
        total: 0,
      };
    }

    const [total, productRows] = await Promise.all([
      repositories.countPublicProducts({
        ...input,
        productIdFilters,
      }),
      repositories.listPublicProductBaseRows({
        ...input,
        limit: pagination.perPage,
        offset: pagination.offset,
        productIdFilters,
      }),
    ]);
    const productIds = productRows.map((productRow) => productRow.id);
    const [categoryRows, tagRows, coverImageRows] = await Promise.all([
      repositories.findPublicProductCategoriesByProductIds({ productIds }),
      repositories.findPublicProductTagsByProductIds({ productIds }),
      repositories.findPublicProductCoverImagesByProductIds({ productIds }),
    ]);

    return buildPublicProductListOutput({
      categoryRows,
      coverImageRows,
      page: pagination.page,
      perPage: pagination.perPage,
      productRows,
      tagRows,
      total,
    });
  }

  const loggedListPublicProductsRaw = withLog(
    listPublicProductsRaw,
    "list-public-products-raw",
  );

  return {
    raw: loggedListPublicProductsRaw,
    stable: withLog(
      toStable(loggedListPublicProductsRaw),
      "list-public-products-stable",
    ),
  };
}

async function resolvePublicProductIdFilters(
  repositories: SetupListPublicProductsFeatureInput["repositories"],
  input: ListPublicProductsFeatureInput,
): Promise<string[][]> {
  const productIdFilters: string[][] = [];
  const categorySlugs = normalizeCatalogFilterValues(input.categorySlugs);
  const tagSlugs = normalizeCatalogFilterValues(input.tagSlugs);
  const audienceSlugs = normalizeCatalogFilterValues(input.audience);
  const eventTypeSlugs = normalizeCatalogFilterValues(input.eventTypes);

  if (categorySlugs.length > 0) {
    productIdFilters.push(
      await repositories.findPublicProductIdsByCategorySlugs({
        categorySlugs,
      }),
    );
  }

  if (tagSlugs.length > 0) {
    productIdFilters.push(
      await repositories.findPublicProductIdsByTagSlugs({ tagSlugs }),
    );
  }

  if (audienceSlugs.length > 0) {
    productIdFilters.push(
      await repositories.findPublicProductIdsByTagSlugs({
        tagSlugs: audienceSlugs,
        tagTypes: ["public"],
      }),
    );
  }

  if (eventTypeSlugs.length > 0) {
    productIdFilters.push(
      await repositories.findPublicProductIdsByTagSlugs({
        tagSlugs: eventTypeSlugs,
        tagTypes: ["occasion"],
      }),
    );
  }

  return productIdFilters;
}
