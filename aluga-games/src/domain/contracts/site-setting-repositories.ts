export type SiteSettingRow = {
  key: string;
  value: Record<string, unknown>;
};

export type RetrieveSiteSettingRepositoryInput = {
  key: string;
};

export type SiteSettingRepositories = {
  retrieveSiteSetting: (
    input: RetrieveSiteSettingRepositoryInput,
  ) => Promise<SiteSettingRow | null>;
};
