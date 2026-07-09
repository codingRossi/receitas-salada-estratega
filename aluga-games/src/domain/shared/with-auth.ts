import "server-only";

import { requireAdmin } from "@/server/auth/require-admin";

type WithAdminUserId = {
  userId: string;
};

type WithoutUserId<TInput extends WithAdminUserId> = Omit<TInput, "userId">;

export function withAuth<
  TInput extends WithAdminUserId,
  TArgs extends unknown[],
  TResult,
>(fn: (input: TInput, ...args: TArgs) => Promise<TResult>) {
  return async (
    input: WithoutUserId<TInput>,
    ...args: TArgs
  ): Promise<TResult> => {
    const admin = await requireAdmin();

    return fn(
      {
        ...(input as object),
        userId: admin.clerkUserId,
      } as TInput,
      ...args,
    );
  };
}
