export type MediaAssetSummaryRow = {
  altText: string | null;
  id: string;
  mimeType: string;
  originalFilename: string | null;
  url: string;
};

export type RetrieveMediaAssetRepositoryInput = {
  id: string;
};

export type MediaRepositories = {
  retrieveMediaAsset: (
    input: RetrieveMediaAssetRepositoryInput,
  ) => Promise<MediaAssetSummaryRow | null>;
};
