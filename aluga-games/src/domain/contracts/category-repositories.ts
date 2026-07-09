export type CategorySummaryRow = {
  description: string | null;
  id: string;
  isActive: boolean;
  name: string;
  slug: string;
};

export type CategoryRepositories = {
  listActiveCategories: () => Promise<CategorySummaryRow[]>;
};
