import "server-only";

import { serverEnv } from "@/server/env";

export type StorageConfig = {
  endpoint: string | undefined;
  region: string | undefined;
  accessKeyId: string | undefined;
  secretAccessKey: string | undefined;
  bucketName: string | undefined;
  publicBaseUrl: string | undefined;
};

export function getStorageConfig(): StorageConfig {
  return {
    endpoint: serverEnv.S3_ENDPOINT,
    region: serverEnv.S3_REGION,
    accessKeyId: serverEnv.S3_ACCESS_KEY_ID,
    secretAccessKey: serverEnv.S3_SECRET_ACCESS_KEY,
    bucketName: serverEnv.S3_BUCKET_NAME,
    publicBaseUrl: serverEnv.S3_PUBLIC_BASE_URL,
  };
}

export function isStorageConfigured(config = getStorageConfig()) {
  return Boolean(
    config.endpoint &&
      config.region &&
      config.accessKeyId &&
      config.secretAccessKey &&
      config.bucketName &&
      config.publicBaseUrl,
  );
}
