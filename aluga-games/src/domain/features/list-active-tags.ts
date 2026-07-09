import type { TagRepositories } from "../contracts/tag-repositories";
import type { PublicCatalogTagFilter } from "../contracts/product-repositories";
import { toStable, type StableDomainResult } from "../shared/to-stable";
import { withLog } from "../shared/with-log";
import { buildPublicCatalogFilters } from "./public-catalog-helpers";

export type TagSummaryFeatureOutput = PublicCatalogTagFilter;

export type ListActiveTagsFeatureOutput = TagSummaryFeatureOutput[];

export type ListActiveTagsFeature = {
  raw: () => Promise<ListActiveTagsFeatureOutput>;
  stable: () => Promise<StableDomainResult<ListActiveTagsFeatureOutput>>;
};

export type SetupListActiveTagsFeatureInput = {
  repositories: Pick<TagRepositories, "listActiveTags">;
};

/**
 * Lista tags públicas usadas em filtros e segmentações do catálogo.
 *
 * Tags inativas podem permanecer vinculadas a produtos para histórico/admin,
 * mas não são expostas em filtros públicos.
 */
export function setupListActiveTagsFeature({
  repositories,
}: SetupListActiveTagsFeatureInput): ListActiveTagsFeature {
  async function listActiveTagsRaw(): Promise<ListActiveTagsFeatureOutput> {
    const tagRows = await repositories.listActiveTags();

    return buildPublicCatalogFilters({
      categoryRows: [],
      tagRows,
    }).tags;
  }

  const loggedListActiveTagsRaw = withLog(
    listActiveTagsRaw,
    "list-active-tags-raw",
  );

  return {
    raw: loggedListActiveTagsRaw,
    stable: withLog(
      toStable(loggedListActiveTagsRaw),
      "list-active-tags-stable",
    ),
  };
}
