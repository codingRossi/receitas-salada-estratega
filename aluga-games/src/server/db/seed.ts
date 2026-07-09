import { pathToFileURL } from "node:url";
import { loadEnvConfig } from "@next/env";
import { inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  categories,
  faqs,
  landingPageBlocks,
  siteSettings,
  tags,
} from "@/server/db/schema";
import {
  createInitialSiteSettings,
  initialCategories,
  initialFaqs,
  initialLandingPageBlocks,
  initialTags,
} from "@/server/db/seed-data";

loadEnvConfig(process.cwd());

type SeedEnvironment = "development" | "test" | "production";

type SeedResult = {
  environment: SeedEnvironment;
  inserted: {
    siteSettings: number;
    categories: number;
    tags: number;
    landingPageBlocks: number;
    faqs: number;
  };
  skipped: {
    faqs: string | null;
    products: string;
    testimonials: string;
    clientLogos: string;
  };
};

function getSeedEnvironment(): SeedEnvironment {
  if (process.env.NODE_ENV === "production") {
    return "production";
  }

  if (process.env.NODE_ENV === "test") {
    return "test";
  }

  return "development";
}

function getDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be configured to run db:seed.");
  }

  return process.env.DATABASE_URL;
}

function getWhatsappPhoneNumber() {
  const value = process.env.WHATSAPP_PHONE_NUMBER?.trim();

  if (!value) {
    return null;
  }

  const normalizedValue = value.replace(/[\s().-]/g, "");

  if (!/^\+?\d{8,15}$/.test(normalizedValue)) {
    throw new Error(
      "WHATSAPP_PHONE_NUMBER must be empty or use a safe international phone format.",
    );
  }

  return normalizedValue;
}

export async function seedInitialData(): Promise<SeedResult> {
  const environment = getSeedEnvironment();
  const client = postgres(getDatabaseUrl(), {
    max: 1,
    prepare: false,
  });
  const db = drizzle(client);

  try {
    return await db.transaction(async (tx) => {
      const insertedSiteSettings = await tx
        .insert(siteSettings)
        .values(
          createInitialSiteSettings({
            whatsappPhoneNumber: getWhatsappPhoneNumber(),
          }),
        )
        .onConflictDoNothing({ target: siteSettings.key })
        .returning({ id: siteSettings.id });

      const insertedCategories = await tx
        .insert(categories)
        .values(initialCategories)
        .onConflictDoNothing({ target: categories.slug })
        .returning({ id: categories.id });

      const insertedTags = await tx
        .insert(tags)
        .values(initialTags)
        .onConflictDoNothing({ target: tags.slug })
        .returning({ id: tags.id });

      const insertedLandingPageBlocks = await tx
        .insert(landingPageBlocks)
        .values(initialLandingPageBlocks)
        .onConflictDoNothing({ target: landingPageBlocks.key })
        .returning({ id: landingPageBlocks.id });

      let insertedFaqCount = 0;

      if (environment !== "production") {
        const faqQuestions = initialFaqs.map((faq) => faq.question);
        const existingFaqs = await tx
          .select({ question: faqs.question })
          .from(faqs)
          .where(inArray(faqs.question, faqQuestions));
        const existingQuestions = new Set(
          existingFaqs.map((faq) => faq.question),
        );
        const missingFaqs = initialFaqs.filter(
          (faq) => !existingQuestions.has(faq.question),
        );

        if (missingFaqs.length > 0) {
          const insertedFaqs = await tx
            .insert(faqs)
            .values(missingFaqs)
            .returning({ id: faqs.id });

          insertedFaqCount = insertedFaqs.length;
        }
      }

      return {
        environment,
        inserted: {
          siteSettings: insertedSiteSettings.length,
          categories: insertedCategories.length,
          tags: insertedTags.length,
          landingPageBlocks: insertedLandingPageBlocks.length,
          faqs: insertedFaqCount,
        },
        skipped: {
          faqs:
            environment === "production"
              ? "Default FAQs are not inserted in production."
              : null,
          products:
            "Example products are intentionally not seeded in this task.",
          testimonials:
            "Placeholder testimonials are intentionally not seeded without validated real content.",
          clientLogos:
            "Placeholder client logos are intentionally not seeded without validated real content.",
        },
      };
    });
  } finally {
    await client.end();
  }
}

function isMainModule() {
  const entrypoint = process.argv[1];

  return Boolean(entrypoint && import.meta.url === pathToFileURL(entrypoint).href);
}

if (isMainModule()) {
  seedInitialData()
    .then((result) => {
      console.info("Seed completed.", result);
    })
    .catch((error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Unexpected seed failure.";

      console.error(`Seed failed: ${message}`);
      process.exitCode = 1;
    });
}
