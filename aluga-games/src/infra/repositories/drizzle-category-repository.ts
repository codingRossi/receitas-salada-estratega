import "server-only";

import { and, asc, eq, isNull } from "drizzle-orm";
import type { CategoryRepositories } from "@/domain/contracts";
import { categories } from "@/server/db/schema";

export class DrizzleCategoryRepository implements CategoryRepositories {
  public async listActiveCategories() {
    const { db } = await import("@/server/db");

    return db
      .select({
        description: categories.description,
        id: categories.id,
        isActive: categories.isActive,
        name: categories.name,
        slug: categories.slug,
      })
      .from(categories)
      .where(and(eq(categories.isActive, true), isNull(categories.deletedAt)))
      .orderBy(asc(categories.name));
  }
}
