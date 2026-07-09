import "server-only";

import type { RecordAdminAuditLogRepositoryInput } from "@/domain/contracts";
import { requireAdmin } from "@/server/auth/require-admin";
import type { Logger } from "./with-log";

type RecordAuditLog = (
  input: RecordAdminAuditLogRepositoryInput,
) => Promise<void>;

type WithAuditoryOptions<TArgs extends unknown[], TResult> = {
  action: string;
  entityType: string;
  entityId?: (
    operationResult: TResult,
    ...args: TArgs
  ) => string | null | undefined;
  logger?: Logger;
  metadata?: (
    operationResult: TResult,
    ...args: TArgs
  ) => Record<string, unknown> | undefined;
  recordAuditLog: RecordAuditLog;
};

function getActorClerkUserId(args: unknown[]) {
  const firstArg = args[0];

  if (!firstArg || typeof firstArg !== "object") {
    return undefined;
  }

  if ("userId" in firstArg && typeof firstArg.userId === "string") {
    return firstArg.userId;
  }

  if (
    "actorClerkUserId" in firstArg &&
    typeof firstArg.actorClerkUserId === "string"
  ) {
    return firstArg.actorClerkUserId;
  }

  return undefined;
}

/**
 * Registra auditoria administrativa depois de uma mutação autorizada.
 *
 * A falha de auditoria é logada, mas não desfaz a operação principal para evitar
 * perda de alteração já confirmada no banco.
 */
export function withAuditory<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  options: WithAuditoryOptions<TArgs, TResult>,
) {
  return async (...args: TArgs): Promise<TResult> => {
    const operationResult = await fn(...args);
    const actorClerkUserId =
      getActorClerkUserId(args) ?? (await requireAdmin()).clerkUserId;

    try {
      await options.recordAuditLog({
        action: options.action,
        actorClerkUserId,
        entityId: options.entityId?.(operationResult, ...args) ?? null,
        entityType: options.entityType,
        metadata: options.metadata?.(operationResult, ...args),
      });
    } catch (error) {
      options.logger?.error?.("[domain]", "audit-log-error", {
        action: options.action,
        entityType: options.entityType,
        errorName: error instanceof Error ? error.name : typeof error,
      });
    }

    return operationResult;
  };
}
