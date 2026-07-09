import "server-only";

import { auth } from "@clerk/nextjs/server";
import { isAdminUserId } from "@/server/auth/admin-env";
import {
  ForbiddenAdminError,
  UnauthorizedAdminError,
} from "@/server/auth/auth-errors";

export type CurrentAdmin = {
  clerkUserId: string;
};

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const { userId } = await auth();

  if (!userId || !isAdminUserId(userId)) {
    return null;
  }

  return {
    clerkUserId: userId,
  };
}

export async function requireAdmin(): Promise<CurrentAdmin> {
  const { userId } = await auth();

  if (!userId) {
    throw new UnauthorizedAdminError();
  }

  if (!isAdminUserId(userId)) {
    throw new ForbiddenAdminError();
  }

  return {
    clerkUserId: userId,
  };
}
