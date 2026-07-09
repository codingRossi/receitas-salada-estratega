import "server-only";

import { and, asc, eq, isNull } from "drizzle-orm";
import type { TagRepositories } from "@/domain/contracts";
import { tags } from "@/server/db/schema";

export class DrizzleTagRepository implements TagRepositories {
  public async listActiveTags() {
    const { db } = await import("@/server/db");

    return db
      .select({
        id: tags.id,
        isActive: tags.isActive,
        name: tags.name,
        slug: tags.slug,
        type: tags.type,
      })
      .from(tags)
      .where(and(eq(tags.isActive, true), isNull(tags.deletedAt)))
      .orderBy(asc(tags.name));
  }
}
