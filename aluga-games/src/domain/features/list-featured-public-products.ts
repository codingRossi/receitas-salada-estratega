import type { PublicProductListItem } from "../contracts/product-repositories";
import { toStable, type StableDomainResult } from "../shared/to-stable";
import { withLog } from "../shared/with-log";
import type { ListPublicProductsFeatureOutput } from "./list-public-products";
import { DEFAULT_FEATURED_PUBLIC_PRODUCTS_LIMIT } from "./public-catalog-helpers";

export type ListFeaturedPublicProductsFeatureInput = {
  limit?: number;
};

export type ListFeaturedPublicProductsFeatureOutput = PublicProductListItem[];

export type ListFeaturedPublicProductsFeature = {
  raw: (
    input?: ListFeaturedPublicProductsFeatureInput,
  ) => Promise<ListFeaturedPublicProductsFeatureOutput>;
  stable: (
    input?: ListFeaturedPublicProductsFeatureInput,
  ) => Promise<StableDomainResult<ListFeaturedPublicProductsFeatureOutput>>;
};

export type SetupListFeaturedPublicProductsFeatureInput = {
  listPublicProducts: (input: {
    featured: true;
    page: number;
    perPage: number;
  }) => Promise<ListPublicProductsFeatureOutput>;
};

/**
 * Lista produtos públicos destacados sem criar query composta no repository.
 *
 * A regra de destaque é apenas um recorte da listagem pública, então a feature
 * reaproveita `listPublicProducts` com `featured: true`.
 */
export function setupListFeaturedPublicProductsFeature({
  listPublicProducts,
}: SetupListFeaturedPublicProductsFeatureInput): ListFeaturedPublicProductsFeature {
  async function listFeaturedPublicProductsRaw(
    input: ListFeaturedPublicProductsFeatureInput = {},
  ): Promise<ListFeaturedPublicProductsFeatureOutput> {
    const featuredProducts = await listPublicProducts({
      featured: true,
      page: 1,
      perPage: input.limit ?? DEFAULT_FEATURED_PUBLIC_PRODUCTS_LIMIT,
    });

    return featuredProducts.items;
  }

  const loggedListFeaturedPublicProductsRaw = withLog(
    listFeaturedPublicProductsRaw,
    "list-featured-public-products-raw",
  );

  return {
    raw: loggedListFeaturedPublicProductsRaw,
    stable: withLog(
      toStable(loggedListFeaturedPublicProductsRaw),
      "list-featured-public-products-stable",
    ),
  };
}
