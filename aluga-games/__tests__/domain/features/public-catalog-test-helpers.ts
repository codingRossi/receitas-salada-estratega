import type {
  PublicProductBaseRow,
  PublicProductDetailsBaseRow,
  PublicProductListItem,
} from "../../../src/domain/contracts/product-repositories";
import type { SetupListPublicProductsFeatureInput } from "../../../src/domain/features/list-public-products";
import type { SetupRetrievePublicProductBySlugFeatureInput } from "../../../src/domain/features/retrieve-public-product-by-slug";

export function buildProductBaseRow(
  overrides: Partial<PublicProductBaseRow> = {},
): PublicProductBaseRow {
  return {
    id: "product-active",
    isFeatured: false,
    name: "Produto ativo",
    shortDescription: null,
    slug: "produto-ativo",
    status: "active",
    ...overrides,
  };
}

export function buildProductDetailsBaseRow(
  overrides: Partial<PublicProductDetailsBaseRow> = {},
): PublicProductDetailsBaseRow {
  return {
    fullDescription: null,
    id: "product-active",
    isFeatured: false,
    name: "Produto ativo",
    seoDescription: null,
    seoTitle: null,
    shortDescription: null,
    slug: "produto-ativo",
    status: "active",
    ...overrides,
  };
}

export function buildPublicProductListItem(
  overrides: Partial<PublicProductListItem> = {},
): PublicProductListItem {
  return {
    categories: [],
    coverImage: null,
    id: "product-active",
    isFeatured: false,
    name: "Produto ativo",
    shortDescription: null,
    slug: "produto-ativo",
    status: "active",
    tags: [],
    ...overrides,
  };
}

export function buildListPublicProductsRepositories(
  overrides: Partial<SetupListPublicProductsFeatureInput["repositories"]> = {},
): SetupListPublicProductsFeatureInput["repositories"] {
  return {
    countPublicProducts: async () => 0,
    findPublicProductCategoriesByProductIds: async () => [],
    findPublicProductCoverImagesByProductIds: async () => [],
    findPublicProductIdsByCategorySlugs: async () => [],
    findPublicProductIdsByTagSlugs: async () => [],
    findPublicProductTagsByProductIds: async () => [],
    listPublicProductBaseRows: async () => [],
    ...overrides,
  };
}

export function buildRetrievePublicProductBySlugRepositories(
  overrides: Partial<
    SetupRetrievePublicProductBySlugFeatureInput["repositories"]
  > = {},
): SetupRetrievePublicProductBySlugFeatureInput["repositories"] {
  return {
    findPublicProductCategoriesByProductIds: async () => [],
    findPublicProductMediaByProductId: async () => [],
    findPublicProductSpecsByProductId: async () => [],
    findPublicProductTagsByProductIds: async () => [],
    findPublicProductVideosByProductId: async () => [],
    retrievePublicProductBaseRowBySlug: async () => null,
    ...overrides,
  };
}
