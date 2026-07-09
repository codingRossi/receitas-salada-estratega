import "server-only";

import { z } from "zod";

const emptyStringToUndefined = (value: unknown) =>
  value === "" ? undefined : value;

const optionalSecret = z.preprocess(
  emptyStringToUndefined,
  z.string().min(1).optional(),
);

const optionalUrl = z.preprocess(
  emptyStringToUndefined,
  z.string().url().optional(),
);

const optionalAdminIds = z.preprocess(
  emptyStringToUndefined,
  z.string().min(1).optional(),
);

const optionalPhoneNumber = z.preprocess(
  emptyStringToUndefined,
  z.string().regex(/^\+?[0-9\s().-]{8,32}$/).optional(),
);

const serverEnvSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: optionalUrl,
    WHATSAPP_PHONE_NUMBER: optionalPhoneNumber,
    CLERK_SECRET_KEY: optionalSecret,
    CLERK_ADMIN_USER_IDS: optionalAdminIds,
    S3_ENDPOINT: z.preprocess(
      emptyStringToUndefined,
      z.string().min(1).optional(),
    ),
    S3_REGION: z.preprocess(
      emptyStringToUndefined,
      z.string().min(1).optional(),
    ),
    S3_ACCESS_KEY_ID: optionalSecret,
    S3_SECRET_ACCESS_KEY: optionalSecret,
    S3_BUCKET_NAME: z.preprocess(
      emptyStringToUndefined,
      z.string().min(1).optional(),
    ),
    S3_PUBLIC_BASE_URL: optionalUrl,
  })
  .superRefine((env, context) => {
    if (env.NODE_ENV !== "production") {
      return;
    }

    const requiredKeys: Array<keyof typeof env> = [
      "DATABASE_URL",
      "CLERK_SECRET_KEY",
      "CLERK_ADMIN_USER_IDS",
      "S3_ENDPOINT",
      "S3_REGION",
      "S3_ACCESS_KEY_ID",
      "S3_SECRET_ACCESS_KEY",
      "S3_BUCKET_NAME",
      "S3_PUBLIC_BASE_URL",
    ];

    for (const key of requiredKeys) {
      if (!env[key]) {
        context.addIssue({
          code: "custom",
          path: [key],
          message: `${key} must be configured in production.`,
        });
      }
    }
  });

const parsedServerEnv = serverEnvSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  WHATSAPP_PHONE_NUMBER: process.env.WHATSAPP_PHONE_NUMBER,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  CLERK_ADMIN_USER_IDS: process.env.CLERK_ADMIN_USER_IDS,
  S3_ENDPOINT: process.env.S3_ENDPOINT,
  S3_REGION: process.env.S3_REGION,
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  S3_PUBLIC_BASE_URL: process.env.S3_PUBLIC_BASE_URL,
});

if (!parsedServerEnv.success) {
  throw new Error(
    `Invalid server environment: ${z.prettifyError(parsedServerEnv.error)}`,
  );
}

export const serverEnv = parsedServerEnv.data;
