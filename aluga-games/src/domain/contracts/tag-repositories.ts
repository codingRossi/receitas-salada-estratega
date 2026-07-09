export type TagRepositoryType =
  "feature" | "general" | "occasion" | "public" | "search";

export type TagSummaryRow = {
  id: string;
  isActive: boolean;
  name: string;
  slug: string;
  type: TagRepositoryType;
};

export type TagRepositories = {
  listActiveTags: () => Promise<TagSummaryRow[]>;
};
