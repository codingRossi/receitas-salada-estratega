/**
 * Helpers SQL puros das queries públicas de produto.
 *
 * Não executa query. Apenas centraliza condições Drizzle compartilhadas entre
 * repositories atômicos.
 */

import { eq, ilike, inArray, isNull, type SQL } from "drizzle-orm";
import type { PublicProductFilters } from "@/domain/contracts";
import { products } from "@/server/db/schema";

export const PUBLIC_PRODUCT_STATUSES = ["active", "unavailable"] as const;

export const publicProductBaseSelect = {
  id: products.id,
  isFeatured: products.isFeatured,
  name: products.name,
  shortDescription: products.shortDescription,
  slug: products.slug,
  status: products.status,
};

export function buildPublicProductConditions(
  input: PublicProductFilters,
  productIdFilters: string[][],
): SQL[] {
  const conditions: SQL[] = [
    inArray(products.status, PUBLIC_PRODUCT_STATUSES),
    isNull(products.deletedAt),
  ];
  const searchTerm = input.search?.trim();

  if (searchTerm) {
    conditions.push(ilike(products.name, `%${searchTerm}%`));
  }

  if (input.featured !== undefined) {
    conditions.push(eq(products.isFeatured, input.featured));
  }

  if (input.availability === "available") {
    conditions.push(eq(products.status, "active"));
  }

  if (input.availability === "unavailable") {
    conditions.push(eq(products.status, "unavailable"));
  }

  for (const productIds of productIdFilters) {
    conditions.push(inArray(products.id, productIds));
  }

  return conditions;
}
