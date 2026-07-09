import "server-only";

import { and, eq, isNull } from "drizzle-orm";
import type {
  MediaAssetSummaryRow,
  MediaRepositories,
} from "@/domain/contracts";
import { mediaAssets } from "@/server/db/schema";

const MEDIA_ASSET_ROW_LIMIT = 1;

export class DrizzleMediaRepository implements MediaRepositories {
  public async retrieveMediaAsset(input: {
    id: string;
  }): Promise<MediaAssetSummaryRow | null> {
    const { db } = await import("@/server/db");

    const rows = await db
      .select({
        altText: mediaAssets.altText,
        id: mediaAssets.id,
        mimeType: mediaAssets.mimeType,
        originalFilename: mediaAssets.originalFilename,
        url: mediaAssets.url,
      })
      .from(mediaAssets)
      .where(and(eq(mediaAssets.id, input.id), isNull(mediaAssets.deletedAt)))
      .limit(MEDIA_ASSET_ROW_LIMIT);

    return rows[0] ?? null;
  }
}
