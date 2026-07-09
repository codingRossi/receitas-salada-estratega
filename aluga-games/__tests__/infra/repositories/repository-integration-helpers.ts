import { describe } from "bun:test";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const shouldRunRepositoryIntegrationTests =
  process.env.RUN_REPOSITORY_INTEGRATION_TESTS === "1" &&
  Boolean(process.env.DATABASE_URL);

export const describeRepositoryIntegration = shouldRunRepositoryIntegrationTests
  ? describe
  : describe.skip;

export const repositoryTestRunId = `test-${Date.now()}-${Math.random()
  .toString(36)
  .slice(2, 8)}`;

export function buildRepositoryTestKey(name: string): string {
  return `${repositoryTestRunId}-${name}`;
}

export async function getRepositoryTestDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is required for repository integration tests.",
    );
  }

  const { db } = await import("../../../src/server/db");
  return db;
}
