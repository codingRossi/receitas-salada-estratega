import type { MediaRepositories } from "../contracts/media-repositories";
import { toStable } from "../shared/to-stable";
import { withLog } from "../shared/with-log";

export type RetrieveMediaAssetFeatureInput = {
  id: string;
};

export type MediaAssetFeatureOutput = {
  altText: string | null;
  id: string;
  mimeType: string;
  originalFilename: string | null;
  url: string;
};

export type RetrieveMediaAssetFeatureOutput = MediaAssetFeatureOutput | null;

export type SetupRetrieveMediaAssetFeatureInput = {
  repositories: Pick<MediaRepositories, "retrieveMediaAsset">;
};

export function setupRetrieveMediaAssetFeature({
  repositories,
}: SetupRetrieveMediaAssetFeatureInput) {
  async function retrieveMediaAssetRaw(
    input: RetrieveMediaAssetFeatureInput,
  ): Promise<RetrieveMediaAssetFeatureOutput> {
    return repositories.retrieveMediaAsset(input);
  }

  const loggedRetrieveMediaAssetRaw = withLog(
    retrieveMediaAssetRaw,
    "retrieve-media-asset-raw",
  );

  return {
    retrieveMediaAsset: {
      raw: loggedRetrieveMediaAssetRaw,
      stable: withLog(
        toStable(loggedRetrieveMediaAssetRaw),
        "retrieve-media-asset-stable",
      ),
    },
  };
}
