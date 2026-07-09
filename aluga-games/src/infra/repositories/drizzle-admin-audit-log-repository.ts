import "server-only";

import type { AdminAuditLogRepositories } from "@/domain/contracts";
import { adminAuditLogs } from "@/server/db/schema";

export class DrizzleAdminAuditLogRepository implements AdminAuditLogRepositories {
  public async recordAdminAuditLog(input: {
    action: string;
    actorClerkUserId?: string | null;
    actorEmail?: string | null;
    entityId?: string | null;
    entityType: string;
    metadata?: Record<string, unknown>;
  }) {
    const { db } = await import("@/server/db");

    await db.insert(adminAuditLogs).values({
      action: input.action,
      actorClerkUserId: input.actorClerkUserId ?? null,
      actorEmail: input.actorEmail ?? null,
      entityId: input.entityId ?? null,
      entityType: input.entityType,
      metadata: input.metadata,
    });
  }
}
