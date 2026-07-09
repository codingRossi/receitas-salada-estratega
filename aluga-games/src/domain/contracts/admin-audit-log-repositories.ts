export type RecordAdminAuditLogRepositoryInput = {
  action: string;
  actorClerkUserId?: string | null;
  actorEmail?: string | null;
  entityId?: string | null;
  entityType: string;
  metadata?: Record<string, unknown>;
};

export type AdminAuditLogRepositories = {
  recordAdminAuditLog: (
    input: RecordAdminAuditLogRepositoryInput,
  ) => Promise<void>;
};
