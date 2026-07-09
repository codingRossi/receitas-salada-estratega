import type {
  ProductRepositories,
  PublicProductDetails,
} from "../contracts/product-repositories";
import { toStable, type StableDomainResult } from "../shared/to-stable";
import { withLog } from "../shared/with-log";
import {
  buildPublicProductDetails,
  isPublicProductStatus,
} from "./public-catalog-helpers";

export type RetrievePublicProductBySlugFeatureInput = {
  slug: string;
};

export type RetrievePublicProductBySlugFeatureOutput =
  PublicProductDetails | null;

export type RetrievePublicProductBySlugFeature = {
  raw: (
    input: RetrievePublicProductBySlugFeatureInput,
  ) => Promise<RetrievePublicProductBySlugFeatureOutput>;
  stable: (
    input: RetrievePublicProductBySlugFeatureInput,
  ) => Promise<StableDomainResult<RetrievePublicProductBySlugFeatureOutput>>;
};

export type SetupRetrievePublicProductBySlugFeatureInput = {
  repositories: Pick<
    ProductRepositories,
    | "findPublicProductCategoriesByProductIds"
    | "findPublicProductMediaByProductId"
    | "findPublicProductSpecsByProductId"
    | "findPublicProductTagsByProductIds"
    | "findPublicProductVideosByProductId"
    | "retrievePublicProductBaseRowBySlug"
  >;
};

/**
 * Busca um produto público por slug.
 *
 * Retorna `null` para slug inexistente, produto `inactive` ou produto removido.
 * Produto `unavailable` continua público para a UI exibir aviso.
 */
export function setupRetrievePublicProductBySlugFeature({
  repositories,
}: SetupRetrievePublicProductBySlugFeatureInput): RetrievePublicProductBySlugFeature {
  async function retrievePublicProductBySlugRaw({
    slug,
  }: RetrievePublicProductBySlugFeatureInput): Promise<RetrievePublicProductBySlugFeatureOutput> {
    const productRow = await repositories.retrievePublicProductBaseRowBySlug({
      slug,
    });

    if (!productRow || !isPublicProductStatus(productRow.status)) {
      return null;
    }

    const productIds = [productRow.id];
    const [categoryRows, tagRows, mediaRows, videoRows, specRows] =
      await Promise.all([
        repositories.findPublicProductCategoriesByProductIds({ productIds }),
        repositories.findPublicProductTagsByProductIds({ productIds }),
        repositories.findPublicProductMediaByProductId({
          productId: productRow.id,
        }),
        repositories.findPublicProductVideosByProductId({
          productId: productRow.id,
        }),
        repositories.findPublicProductSpecsByProductId({
          productId: productRow.id,
        }),
      ]);

    return buildPublicProductDetails({
      categoryRows,
      mediaRows,
      productRow,
      specRows,
      tagRows,
      videoRows,
    });
  }

  const loggedRetrievePublicProductBySlugRaw = withLog(
    retrievePublicProductBySlugRaw,
    "retrieve-public-product-by-slug-raw",
  );

  return {
    raw: loggedRetrievePublicProductBySlugRaw,
    stable: withLog(
      toStable(loggedRetrievePublicProductBySlugRaw),
      "retrieve-public-product-by-slug-stable",
    ),
  };
}
