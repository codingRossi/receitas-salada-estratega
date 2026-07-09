import "server-only";

import { AdminConfigError } from "@/server/auth/auth-errors";

function parseAdminUserIds(rawValue: string | undefined) {
  return new Set(
    (rawValue ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );
}

export function getAdminUserIds() {
  const adminUserIds = parseAdminUserIds(process.env.CLERK_ADMIN_USER_IDS);

  if (process.env.NODE_ENV === "production" && adminUserIds.size === 0) {
    throw new AdminConfigError(
      "CLERK_ADMIN_USER_IDS must contain at least one Clerk userId in production.",
    );
  }

  return adminUserIds;
}

export function isAdminUserId(userId: string) {
  return getAdminUserIds().has(userId);
}
