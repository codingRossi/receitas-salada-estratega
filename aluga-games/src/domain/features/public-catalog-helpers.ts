/**
 * Helpers puros das queries públicas do catálogo.
 *
 * Este arquivo transforma rows atômicas dos repositories em DTOs públicos.
 * Não deve executar queries nem acessar dependências externas.
 */

import type { CategorySummaryRow } from "../contracts/category-repositories";
import type {
  PublicCatalogCategoryFilter,
  PublicCatalogFilters,
  PublicCatalogTagFilter,
  PublicProductBaseRow,
  PublicProductCategoryRelationRow,
  PublicProductCoverImageRelationRow,
  PublicProductDetails,
  PublicProductDetailsBaseRow,
  PublicProductListItem,
  PublicProductListRepositoryRow,
  PublicProductMediaItem,
  PublicProductSpecItem,
  PublicProductStatus,
  PublicProductTagRelationRow,
  PublicProductVideoItem,
} from "../contracts/product-repositories";
import type { TagSummaryRow } from "../contracts/tag-repositories";

const DEFAULT_PUBLIC_PRODUCTS_PAGE = 1;
const DEFAULT_PUBLIC_PRODUCTS_PER_PAGE = 24;
const MAX_PUBLIC_PRODUCTS_PER_PAGE = 60;

export const DEFAULT_FEATURED_PUBLIC_PRODUCTS_LIMIT = 6;
export const DEFAULT_RELATED_PUBLIC_PRODUCTS_LIMIT = 4;
export const RELATED_PRODUCTS_CANDIDATE_LIMIT = 48;

/**
 * Centraliza a barreira de status público do catálogo.
 *
 * `unavailable` continua visível para permitir aviso na UI; `inactive` nunca
 * deve sair em DTO público mesmo que um repository seja chamado diretamente.
 */
export function isPublicProductStatus(
  status: string,
): status is PublicProductStatus {
  return status === "active" || status === "unavailable";
}

/**
 * Resolve paginação pública com limite máximo explícito.
 *
 * O limite impede que uma rota pública execute listagens grandes por acidente,
 * mas preserva valores inválidos como fallback estável para a primeira página.
 */
export function resolvePublicProductPagination(input: {
  page?: number;
  perPage?: number;
}): {
  offset: number;
  page: number;
  perPage: number;
} {
  const page = normalizePositiveInteger(
    input.page,
    DEFAULT_PUBLIC_PRODUCTS_PAGE,
    Number.MAX_SAFE_INTEGER,
  );
  const perPage = normalizePositiveInteger(
    input.perPage,
    DEFAULT_PUBLIC_PRODUCTS_PER_PAGE,
    MAX_PUBLIC_PRODUCTS_PER_PAGE,
  );

  return {
    offset: (page - 1) * perPage,
    page,
    perPage,
  };
}

/**
 * Normaliza filtros recebidos de query string antes de consultar relações.
 *
 * O retorno sem duplicatas evita queries repetidas e deixa os testes previsíveis.
 */
export function normalizeCatalogFilterValues(
  values: string[] | undefined,
): string[] {
  if (!values) {
    return [];
  }

  return Array.from(
    new Set(
      values.map((value) => value.trim()).filter((value) => value.length > 0),
    ),
  );
}

/**
 * Calcula prioridade de produtos relacionados.
 *
 * Categoria pesa mais que tag porque tende a indicar proximidade real de
 * catálogo, enquanto tags misturam público, ocasião e atributos de busca.
 */
export function scoreRelatedPublicProduct(
  publicProduct: PublicProductListItem,
  input: {
    categoryIds: string[];
    tagIds: string[];
  },
): number {
  const categoryIds = new Set(input.categoryIds);
  const tagIds = new Set(input.tagIds);
  const categoryScore = publicProduct.categories.filter((category) =>
    categoryIds.has(category.id),
  ).length;
  const tagScore = publicProduct.tags.filter((tag) =>
    tagIds.has(tag.id),
  ).length;

  return categoryScore * 2 + tagScore;
}

function normalizePositiveInteger(
  value: number | undefined,
  fallback: number,
  max: number,
): number {
  if (!Number.isInteger(value) || !value || value < 1) {
    return fallback;
  }

  return Math.min(value, max);
}

/**
 * Monta a resposta paginada da listagem pública.
 *
 * A feature passa rows atômicas de produtos, categorias, tags e imagem; este
 * helper faz apenas hidratação em memória e aplica a barreira final de status.
 */
export function buildPublicProductListOutput(input: {
  categoryRows: PublicProductCategoryRelationRow[];
  coverImageRows: PublicProductCoverImageRelationRow[];
  page: number;
  perPage: number;
  productRows: PublicProductBaseRow[];
  tagRows: PublicProductTagRelationRow[];
  total: number;
}): {
  items: PublicProductListItem[];
  page: number;
  perPage: number;
  total: number;
} {
  return {
    items: mapPublicProductListRowsToPublicProducts(
      buildPublicProductListRowsFromRelations(input),
    ),
    page: input.page,
    perPage: input.perPage,
    total: input.total,
  };
}

/**
 * Une rows base de produto com relações públicas já filtradas no repository.
 *
 * Mantemos esse passo fora do repository para não transformar uma query em um
 * repository composto. Composição de dados pertence à feature/helper puro.
 */
export function buildPublicProductListRowsFromRelations(input: {
  categoryRows: PublicProductCategoryRelationRow[];
  coverImageRows: PublicProductCoverImageRelationRow[];
  productRows: PublicProductBaseRow[];
  tagRows: PublicProductTagRelationRow[];
}): PublicProductListRepositoryRow[] {
  const categoryRowsByProductId = groupPublicProductCategoryRowsByProductId(
    input.categoryRows,
  );
  const tagRowsByProductId = groupPublicProductTagRowsByProductId(
    input.tagRows,
  );
  const coverImageByProductId = buildPublicCoverImageByProductId(
    input.coverImageRows,
  );

  return input.productRows.map((productRow) => ({
    ...productRow,
    categories: categoryRowsByProductId.get(productRow.id) ?? [],
    tags: tagRowsByProductId.get(productRow.id) ?? [],
    coverImage: coverImageByProductId.get(productRow.id) ?? null,
  }));
}

/**
 * Remove qualquer row que não respeite o contrato público final.
 */
export function mapPublicProductListRowsToPublicProducts(
  productRows: PublicProductListRepositoryRow[],
): PublicProductListItem[] {
  return productRows.flatMap((productRow) => {
    const publicProduct = mapPublicProductListRowToPublicProduct(productRow);
    return publicProduct ? [publicProduct] : [];
  });
}

/**
 * Monta o DTO da página pública de produto.
 *
 * Slug inexistente, produto removido ou status não público devem resultar em
 * `null` na feature. Este helper mantém uma segunda barreira contra `inactive`.
 */
export function buildPublicProductDetails(input: {
  categoryRows: PublicProductCategoryRelationRow[];
  mediaRows: PublicProductMediaItem[];
  productRow: PublicProductDetailsBaseRow | null;
  specRows: PublicProductSpecItem[];
  tagRows: PublicProductTagRelationRow[];
  videoRows: PublicProductVideoItem[];
}): PublicProductDetails | null {
  if (!input.productRow || !isPublicProductStatus(input.productRow.status)) {
    return null;
  }

  return {
    ...input.productRow,
    categories: input.categoryRows.map(mapProductCategoryRelationToPublicItem),
    tags: input.tagRows.map(mapProductTagRelationToPublicItem),
    media: input.mediaRows,
    videos: input.videoRows,
    specs: input.specRows,
    status: input.productRow.status,
  };
}

/**
 * Converte categorias e tags ativas em filtros públicos do catálogo.
 *
 * Rows inativas podem existir para histórico/admin, mas nunca aparecem como
 * opção pública de navegação.
 */
export function buildPublicCatalogFilters(input: {
  categoryRows: CategorySummaryRow[];
  tagRows: TagSummaryRow[];
}): PublicCatalogFilters {
  return {
    categories: input.categoryRows.flatMap((categoryRow) => {
      const categoryFilter =
        mapActiveCategoryRowToPublicCatalogFilter(categoryRow);
      return categoryFilter ? [categoryFilter] : [];
    }),
    tags: input.tagRows.flatMap((tagRow) => {
      const tagFilter = mapActiveTagRowToPublicCatalogFilter(tagRow);
      return tagFilter ? [tagFilter] : [];
    }),
  };
}

function mapPublicProductListRowToPublicProduct(
  productRow: PublicProductListRepositoryRow,
): PublicProductListItem | null {
  if (!isPublicProductStatus(productRow.status)) {
    return null;
  }

  return {
    ...productRow,
    status: productRow.status,
  };
}

function groupPublicProductCategoryRowsByProductId(
  rows: PublicProductCategoryRelationRow[],
): Map<string, PublicProductListItem["categories"]> {
  const rowsByProductId = new Map<
    string,
    PublicProductListItem["categories"]
  >();

  for (const row of rows) {
    rowsByProductId.set(row.productId, [
      ...(rowsByProductId.get(row.productId) ?? []),
      mapProductCategoryRelationToPublicItem(row),
    ]);
  }

  return rowsByProductId;
}

function groupPublicProductTagRowsByProductId(
  rows: PublicProductTagRelationRow[],
): Map<string, PublicProductListItem["tags"]> {
  const rowsByProductId = new Map<string, PublicProductListItem["tags"]>();

  for (const row of rows) {
    rowsByProductId.set(row.productId, [
      ...(rowsByProductId.get(row.productId) ?? []),
      mapProductTagRelationToPublicItem(row),
    ]);
  }

  return rowsByProductId;
}

function buildPublicCoverImageByProductId(
  coverImageRows: PublicProductCoverImageRelationRow[],
): Map<string, PublicProductListItem["coverImage"]> {
  const coverImageByProductId = new Map<
    string,
    PublicProductListItem["coverImage"]
  >();

  for (const coverImageRow of coverImageRows) {
    if (coverImageByProductId.has(coverImageRow.productId)) {
      continue;
    }

    coverImageByProductId.set(coverImageRow.productId, {
      altText: coverImageRow.altText,
      url: coverImageRow.url,
    });
  }

  return coverImageByProductId;
}

function mapProductCategoryRelationToPublicItem(
  categoryRow: PublicProductCategoryRelationRow,
): PublicProductListItem["categories"][number] {
  return {
    id: categoryRow.id,
    name: categoryRow.name,
    slug: categoryRow.slug,
  };
}

function mapProductTagRelationToPublicItem(
  tagRow: PublicProductTagRelationRow,
): PublicProductListItem["tags"][number] {
  return {
    id: tagRow.id,
    name: tagRow.name,
    slug: tagRow.slug,
    type: tagRow.type,
  };
}

function mapActiveCategoryRowToPublicCatalogFilter(
  categoryRow: CategorySummaryRow,
): PublicCatalogCategoryFilter | null {
  if (!categoryRow.isActive) {
    return null;
  }

  return {
    description: categoryRow.description,
    id: categoryRow.id,
    name: categoryRow.name,
    slug: categoryRow.slug,
  };
}

function mapActiveTagRowToPublicCatalogFilter(
  tagRow: TagSummaryRow,
): PublicCatalogTagFilter | null {
  if (!tagRow.isActive) {
    return null;
  }

  return {
    id: tagRow.id,
    name: tagRow.name,
    slug: tagRow.slug,
    type: tagRow.type,
  };
}
