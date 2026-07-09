/**
 * Contratos de catálogo e produto.
 *
 * Os tipos `Public*` representam apenas dados seguros para páginas públicas.
 * Campos administrativos, storage keys e timestamps não devem entrar nestes
 * DTOs; repositories expõem rows mínimas e features montam o retorno final.
 */

export type ProductRepositoryStatus = "active" | "inactive" | "unavailable";

export type PublicProductStatus = "active" | "unavailable";

export type PublicProductAvailabilityFilter =
  "available" | "all" | "unavailable";

export type PublicProductFilters = {
  audience?: string[];
  availability?: PublicProductAvailabilityFilter;
  categorySlugs?: string[];
  eventTypes?: string[];
  featured?: boolean;
  page?: number;
  perPage?: number;
  search?: string;
  tagSlugs?: string[];
};

export type PublicProductTaxonomyItem = {
  id: string;
  name: string;
  slug: string;
};

export type PublicProductTag = PublicProductTaxonomyItem & {
  type: "feature" | "general" | "occasion" | "public" | "search";
};

export type PublicProductCoverImage = {
  altText: string | null;
  url: string;
};

export type PublicProductListItem = {
  categories: PublicProductTaxonomyItem[];
  coverImage: PublicProductCoverImage | null;
  id: string;
  isFeatured: boolean;
  name: string;
  shortDescription: string | null;
  slug: string;
  status: PublicProductStatus;
  tags: PublicProductTag[];
};

export type PublicProductListRepositoryRow = Omit<
  PublicProductListItem,
  "status"
> & {
  status: ProductRepositoryStatus;
};

export type PublicProductBaseRow = {
  id: string;
  isFeatured: boolean;
  name: string;
  shortDescription: string | null;
  slug: string;
  status: ProductRepositoryStatus;
};

export type PublicProductCategoryRelationRow = PublicProductTaxonomyItem & {
  productId: string;
};

export type PublicProductTagRelationRow = PublicProductTag & {
  productId: string;
};

export type PublicProductCoverImageRelationRow = PublicProductCoverImage & {
  isCover: boolean;
  position: number;
  productId: string;
};

export type PublicProductMediaItem = {
  altText: string | null;
  id: string;
  isCover: boolean;
  position: number;
  url: string;
};

export type PublicProductVideoItem = {
  id: string;
  position: number;
  provider: string | null;
  title: string | null;
  url: string;
};

export type PublicProductSpecItem = {
  id: string;
  label: string;
  position: number;
  value: string;
};

export type PublicProductDetails = {
  categories: PublicProductTaxonomyItem[];
  fullDescription: string | null;
  id: string;
  isFeatured: boolean;
  media: PublicProductMediaItem[];
  name: string;
  seoDescription: string | null;
  seoTitle: string | null;
  shortDescription: string | null;
  slug: string;
  specs: PublicProductSpecItem[];
  status: PublicProductStatus;
  tags: PublicProductTag[];
  videos: PublicProductVideoItem[];
};

export type PublicProductDetailsBaseRow = {
  fullDescription: string | null;
  id: string;
  isFeatured: boolean;
  name: string;
  seoDescription: string | null;
  seoTitle: string | null;
  shortDescription: string | null;
  slug: string;
  status: ProductRepositoryStatus;
};

export type ListPublicProductBaseRowsRepositoryInput = PublicProductFilters & {
  limit: number;
  offset: number;
  productIdFilters: string[][];
};

export type CountPublicProductsRepositoryInput = PublicProductFilters & {
  productIdFilters: string[][];
};

export type FindPublicProductIdsByCategorySlugsRepositoryInput = {
  categorySlugs: string[];
};

export type FindPublicProductIdsByTagSlugsRepositoryInput = {
  tagSlugs: string[];
  tagTypes?: PublicProductTag["type"][];
};

export type FindPublicProductIdsByCategoryIdsRepositoryInput = {
  categoryIds: string[];
};

export type FindPublicProductIdsByTagIdsRepositoryInput = {
  tagIds: string[];
};

export type FindPublicProductRelationsByProductIdsRepositoryInput = {
  productIds: string[];
};

export type RetrievePublicProductBaseRowBySlugRepositoryInput = {
  slug: string;
};

export type FindPublicProductChildrenByProductIdRepositoryInput = {
  productId: string;
};

export type PublicCatalogCategoryFilter = PublicProductTaxonomyItem & {
  description: string | null;
};

export type PublicCatalogTagFilter = PublicProductTag;

export type PublicCatalogFilters = {
  categories: PublicCatalogCategoryFilter[];
  tags: PublicCatalogTagFilter[];
};

export type ProductRepositories = {
  countPublicProducts: (
    input: CountPublicProductsRepositoryInput,
  ) => Promise<number>;
  findPublicProductCategoriesByProductIds: (
    input: FindPublicProductRelationsByProductIdsRepositoryInput,
  ) => Promise<PublicProductCategoryRelationRow[]>;
  findPublicProductCoverImagesByProductIds: (
    input: FindPublicProductRelationsByProductIdsRepositoryInput,
  ) => Promise<PublicProductCoverImageRelationRow[]>;
  findPublicProductIdsByCategoryIds: (
    input: FindPublicProductIdsByCategoryIdsRepositoryInput,
  ) => Promise<string[]>;
  findPublicProductIdsByCategorySlugs: (
    input: FindPublicProductIdsByCategorySlugsRepositoryInput,
  ) => Promise<string[]>;
  findPublicProductIdsByTagIds: (
    input: FindPublicProductIdsByTagIdsRepositoryInput,
  ) => Promise<string[]>;
  findPublicProductIdsByTagSlugs: (
    input: FindPublicProductIdsByTagSlugsRepositoryInput,
  ) => Promise<string[]>;
  findPublicProductMediaByProductId: (
    input: FindPublicProductChildrenByProductIdRepositoryInput,
  ) => Promise<PublicProductMediaItem[]>;
  findPublicProductSpecsByProductId: (
    input: FindPublicProductChildrenByProductIdRepositoryInput,
  ) => Promise<PublicProductSpecItem[]>;
  findPublicProductTagsByProductIds: (
    input: FindPublicProductRelationsByProductIdsRepositoryInput,
  ) => Promise<PublicProductTagRelationRow[]>;
  findPublicProductVideosByProductId: (
    input: FindPublicProductChildrenByProductIdRepositoryInput,
  ) => Promise<PublicProductVideoItem[]>;
  listPublicProductBaseRows: (
    input: ListPublicProductBaseRowsRepositoryInput,
  ) => Promise<PublicProductBaseRow[]>;
  retrievePublicProductBaseRowBySlug: (
    input: RetrievePublicProductBaseRowBySlugRepositoryInput,
  ) => Promise<PublicProductDetailsBaseRow | null>;
};
