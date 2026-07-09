import type { AdminAuditLogRepositories } from "../contracts/admin-audit-log-repositories";
import { toStable } from "../shared/to-stable";
import { withLog } from "../shared/with-log";

export type RecordAdminAuditLogFeatureInput = {
  action: string;
  actorClerkUserId?: string | null;
  actorEmail?: string | null;
  entityId?: string | null;
  entityType: string;
  metadata?: Record<string, unknown>;
};

export type RecordAdminAuditLogFeatureOutput = void;

export type SetupRecordAdminAuditLogFeatureInput = {
  repositories: Pick<AdminAuditLogRepositories, "recordAdminAuditLog">;
};

export function setupRecordAdminAuditLogFeature({
  repositories,
}: SetupRecordAdminAuditLogFeatureInput) {
  async function recordAdminAuditLogRaw(
    input: RecordAdminAuditLogFeatureInput,
  ): Promise<RecordAdminAuditLogFeatureOutput> {
    return repositories.recordAdminAuditLog(input);
  }

  const loggedRecordAdminAuditLogRaw = withLog(
    recordAdminAuditLogRaw,
    "record-admin-audit-log-raw",
  );

  return {
    recordAdminAuditLog: {
      raw: loggedRecordAdminAuditLogRaw,
      stable: withLog(
        toStable(loggedRecordAdminAuditLogRaw),
        "record-admin-audit-log-stable",
      ),
    },
  };
}
