import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as relations from "@/server/db/relations";
import * as schema from "@/server/db/schema";
import { serverEnv } from "@/server/env";

function getDatabaseUrl() {
  if (!serverEnv.DATABASE_URL) {
    throw new Error("DATABASE_URL must be configured before using the database.");
  }

  return serverEnv.DATABASE_URL;
}

const client = postgres(getDatabaseUrl(), {
  prepare: false,
});

export const db = drizzle(client, {
  schema: {
    ...schema,
    ...relations,
  },
});
