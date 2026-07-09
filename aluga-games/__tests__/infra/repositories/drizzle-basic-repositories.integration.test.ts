import { expect, it, mock } from "bun:test";
import { and, eq, inArray } from "drizzle-orm";

import {
  adminAuditLogs,
  categories,
  mediaAssets,
  siteSettings,
  tags,
} from "../../../src/server/db/schema";
import {
  buildRepositoryTestKey,
  describeRepositoryIntegration,
  getRepositoryTestDb,
} from "./repository-integration-helpers";

mock.module("server-only", () => ({}));

describeRepositoryIntegration("basic Drizzle repositories integration", () => {
  it("lists only active categories", async () => {
    const { DrizzleCategoryRepository } =
      await import("../../../src/infra/repositories/drizzle-category-repository");
    const db = await getRepositoryTestDb();
    const repository = new DrizzleCategoryRepository();
    const insertedCategories = await db
      .insert(categories)
      .values([
        {
          name: "Categoria ativa teste",
          slug: buildRepositoryTestKey("category-active"),
        },
        {
          isActive: false,
          name: "Categoria inativa teste",
          slug: buildRepositoryTestKey("category-inactive"),
        },
        {
          deletedAt: new Date(),
          name: "Categoria removida teste",
          slug: buildRepositoryTestKey("category-deleted"),
        },
      ])
      .returning({ id: categories.id });
    const categoryIds = insertedCategories.map((category) => category.id);

    try {
      const activeCategories = await repository.listActiveCategories();
      const activeCategoryIds = activeCategories.map((category) => category.id);

      expect(activeCategoryIds).toContain(categoryIds[0]);
      expect(activeCategoryIds).not.toContain(categoryIds[1]);
      expect(activeCategoryIds).not.toContain(categoryIds[2]);
    } finally {
      await db.delete(categories).where(inArray(categories.id, categoryIds));
    }
  });

  it("lists only active tags", async () => {
    const { DrizzleTagRepository } =
      await import("../../../src/infra/repositories/drizzle-tag-repository");
    const db = await getRepositoryTestDb();
    const repository = new DrizzleTagRepository();
    const insertedTags = await db
      .insert(tags)
      .values([
        {
          name: "Tag ativa teste",
          slug: buildRepositoryTestKey("tag-active"),
          type: "public",
        },
        {
          isActive: false,
          name: "Tag inativa teste",
          slug: buildRepositoryTestKey("tag-inactive"),
          type: "public",
        },
        {
          deletedAt: new Date(),
          name: "Tag removida teste",
          slug: buildRepositoryTestKey("tag-deleted"),
          type: "public",
        },
      ])
      .returning({ id: tags.id });
    const tagIds = insertedTags.map((tag) => tag.id);

    try {
      const activeTags = await repository.listActiveTags();
      const activeTagIds = activeTags.map((tag) => tag.id);

      expect(activeTagIds).toContain(tagIds[0]);
      expect(activeTagIds).not.toContain(tagIds[1]);
      expect(activeTagIds).not.toContain(tagIds[2]);
    } finally {
      await db.delete(tags).where(inArray(tags.id, tagIds));
    }
  });

  it("retrieves media assets without exposing storage keys", async () => {
    const { DrizzleMediaRepository } =
      await import("../../../src/infra/repositories/drizzle-media-repository");
    const db = await getRepositoryTestDb();
    const repository = new DrizzleMediaRepository();
    const insertedMediaAssets = await db
      .insert(mediaAssets)
      .values([
        {
          altText: "Midia ativa",
          mimeType: "image/jpeg",
          originalFilename: "ativa.jpg",
          ownerType: "general",
          storageKey: buildRepositoryTestKey("media-active-storage"),
          url: "/ativa.jpg",
        },
        {
          deletedAt: new Date(),
          mimeType: "image/jpeg",
          ownerType: "general",
          storageKey: buildRepositoryTestKey("media-deleted-storage"),
          url: "/removida.jpg",
        },
      ])
      .returning({ id: mediaAssets.id });

    try {
      const activeMedia = await repository.retrieveMediaAsset({
        id: insertedMediaAssets[0].id,
      });
      const deletedMedia = await repository.retrieveMediaAsset({
        id: insertedMediaAssets[1].id,
      });

      expect(activeMedia?.id).toBe(insertedMediaAssets[0].id);
      expect(Object.keys(activeMedia ?? {})).not.toContain("storageKey");
      expect(deletedMedia).toBeNull();
    } finally {
      await db.delete(mediaAssets).where(
        inArray(
          mediaAssets.id,
          insertedMediaAssets.map((mediaAsset) => mediaAsset.id),
        ),
      );
    }
  });

  it("retrieves site settings by key", async () => {
    const { DrizzleSiteSettingRepository } =
      await import("../../../src/infra/repositories/drizzle-site-setting-repository");
    const db = await getRepositoryTestDb();
    const repository = new DrizzleSiteSettingRepository();
    const key = buildRepositoryTestKey("site-setting");
    await db.insert(siteSettings).values({
      key,
      value: { phone: "5511999990000" },
    });

    try {
      const siteSetting = await repository.retrieveSiteSetting({ key });

      expect(siteSetting).toEqual({
        key,
        value: { phone: "5511999990000" },
      });
    } finally {
      await db.delete(siteSettings).where(eq(siteSettings.key, key));
    }
  });

  it("records admin audit logs", async () => {
    const { DrizzleAdminAuditLogRepository } =
      await import("../../../src/infra/repositories/drizzle-admin-audit-log-repository");
    const db = await getRepositoryTestDb();
    const repository = new DrizzleAdminAuditLogRepository();
    const action = buildRepositoryTestKey("audit-action");

    try {
      await repository.recordAdminAuditLog({
        action,
        actorEmail: "admin@example.com",
        entityId: "entity-test",
        entityType: "product",
        metadata: { source: "integration-test" },
      });

      const auditRows = await db
        .select({
          action: adminAuditLogs.action,
          entityType: adminAuditLogs.entityType,
        })
        .from(adminAuditLogs)
        .where(
          and(
            eq(adminAuditLogs.action, action),
            eq(adminAuditLogs.entityType, "product"),
          ),
        );

      expect(auditRows).toHaveLength(1);
    } finally {
      await db.delete(adminAuditLogs).where(eq(adminAuditLogs.action, action));
    }
  });
});
