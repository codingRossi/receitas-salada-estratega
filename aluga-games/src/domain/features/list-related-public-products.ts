import type {
  ProductRepositories,
  PublicProductListItem,
} from "../contracts/product-repositories";
import { toStable, type StableDomainResult } from "../shared/to-stable";
import { withLog } from "../shared/with-log";
import {
  DEFAULT_RELATED_PUBLIC_PRODUCTS_LIMIT,
  RELATED_PRODUCTS_CANDIDATE_LIMIT,
  scoreRelatedPublicProduct,
} from "./public-catalog-helpers";
import type { ListPublicProductsFeatureOutput } from "./list-public-products";

export type ListRelatedPublicProductsFeatureInput = {
  categoryIds: string[];
  limit?: number;
  productId: string;
  tagIds: string[];
};

export type ListRelatedPublicProductsFeatureOutput = PublicProductListItem[];

export type ListRelatedPublicProductsFeature = {
  raw: (
    input: ListRelatedPublicProductsFeatureInput,
  ) => Promise<ListRelatedPublicProductsFeatureOutput>;
  stable: (
    input: ListRelatedPublicProductsFeatureInput,
  ) => Promise<StableDomainResult<ListRelatedPublicProductsFeatureOutput>>;
};

export type SetupListRelatedPublicProductsFeatureInput = {
  listPublicProducts: (input: {
    page: number;
    perPage: number;
  }) => Promise<ListPublicProductsFeatureOutput>;
  repositories: Pick<
    ProductRepositories,
    "findPublicProductIdsByCategoryIds" | "findPublicProductIdsByTagIds"
  >;
};

/**
 * Lista produtos relacionados para a página individual.
 *
 * A feature coordena as queries pequenas de relação, reaproveita a listagem
 * pública e aplica score por categorias/tags em comum.
 */
export function setupListRelatedPublicProductsFeature({
  listPublicProducts,
  repositories,
}: SetupListRelatedPublicProductsFeatureInput): ListRelatedPublicProductsFeature {
  async function listRelatedPublicProductsRaw(
    input: ListRelatedPublicProductsFeatureInput,
  ): Promise<ListRelatedPublicProductsFeatureOutput> {
    const [categoryProductIds, tagProductIds] = await Promise.all([
      input.categoryIds.length > 0
        ? repositories.findPublicProductIdsByCategoryIds({
            categoryIds: input.categoryIds,
          })
        : Promise.resolve<string[]>([]),
      input.tagIds.length > 0
        ? repositories.findPublicProductIdsByTagIds({
            tagIds: input.tagIds,
          })
        : Promise.resolve<string[]>([]),
    ]);
    const relationProductIds = new Set([
      ...categoryProductIds,
      ...tagProductIds,
    ]);
    const hasRelationFilters =
      input.categoryIds.length > 0 || input.tagIds.length > 0;
    const candidateProducts = await listPublicProducts({
      page: 1,
      perPage: RELATED_PRODUCTS_CANDIDATE_LIMIT,
    });

    return candidateProducts.items
      .filter((publicProduct) => publicProduct.id !== input.productId)
      .filter(
        (publicProduct) =>
          !hasRelationFilters || relationProductIds.has(publicProduct.id),
      )
      .map((publicProduct) => ({
        product: publicProduct,
        score: scoreRelatedPublicProduct(publicProduct, {
          categoryIds: input.categoryIds,
          tagIds: input.tagIds,
        }),
      }))
      .filter(({ score }) => !hasRelationFilters || score > 0)
      .sort(
        (left, right) =>
          right.score - left.score ||
          left.product.name.localeCompare(right.product.name),
      )
      .slice(0, input.limit ?? DEFAULT_RELATED_PUBLIC_PRODUCTS_LIMIT)
      .map(({ product }) => product);
  }

  const loggedListRelatedPublicProductsRaw = withLog(
    listRelatedPublicProductsRaw,
    "list-related-public-products-raw",
  );

  return {
    raw: loggedListRelatedPublicProductsRaw,
    stable: withLog(
      toStable(loggedListRelatedPublicProductsRaw),
      "list-related-public-products-stable",
    ),
  };
}
