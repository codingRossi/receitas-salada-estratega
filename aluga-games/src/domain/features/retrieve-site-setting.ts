import type { SiteSettingRepositories } from "../contracts/site-setting-repositories";
import { toStable } from "../shared/to-stable";
import { withLog } from "../shared/with-log";

export type RetrieveSiteSettingFeatureInput = {
  key: string;
};

export type SiteSettingFeatureOutput = {
  key: string;
  value: Record<string, unknown>;
};

export type RetrieveSiteSettingFeatureOutput = SiteSettingFeatureOutput | null;

export type SetupRetrieveSiteSettingFeatureInput = {
  repositories: Pick<SiteSettingRepositories, "retrieveSiteSetting">;
};

export function setupRetrieveSiteSettingFeature({
  repositories,
}: SetupRetrieveSiteSettingFeatureInput) {
  async function retrieveSiteSettingRaw(
    input: RetrieveSiteSettingFeatureInput,
  ): Promise<RetrieveSiteSettingFeatureOutput> {
    return repositories.retrieveSiteSetting(input);
  }

  const loggedRetrieveSiteSettingRaw = withLog(
    retrieveSiteSettingRaw,
    "retrieve-site-setting-raw",
  );

  return {
    retrieveSiteSetting: {
      raw: loggedRetrieveSiteSettingRaw,
      stable: withLog(
        toStable(loggedRetrieveSiteSettingRaw),
        "retrieve-site-setting-stable",
      ),
    },
  };
}
