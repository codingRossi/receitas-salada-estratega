import "server-only";

import { eq } from "drizzle-orm";
import type {
  SiteSettingRepositories,
  SiteSettingRow,
} from "@/domain/contracts";
import { siteSettings } from "@/server/db/schema";

const SITE_SETTING_ROW_LIMIT = 1;

export class DrizzleSiteSettingRepository implements SiteSettingRepositories {
  public async retrieveSiteSetting(input: {
    key: string;
  }): Promise<SiteSettingRow | null> {
    const { db } = await import("@/server/db");

    const rows = await db
      .select({
        key: siteSettings.key,
        value: siteSettings.value,
      })
      .from(siteSettings)
      .where(eq(siteSettings.key, input.key))
      .limit(SITE_SETTING_ROW_LIMIT);

    return rows[0] ?? null;
  }
}
