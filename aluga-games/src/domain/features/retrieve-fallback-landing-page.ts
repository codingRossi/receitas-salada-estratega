import type {
  LandingPageData,
  LandingPageDataSource,
} from "../entities/landing-page";
import { fallbackLandingPageContent } from "../contents/landing-page-fallback-content";
import { toStable, type StableDomainResult } from "../shared/to-stable";
import { withLog } from "../shared/with-log";
import { buildLandingPageFallbackData } from "./helpers";

export type RetrieveFallbackLandingPageInput = {
  source: LandingPageDataSource;
};

export type RetrieveFallbackLandingPageOutput = LandingPageData;

export type RetrieveFallbackLandingPageFeature = {
  raw: (
    input: RetrieveFallbackLandingPageInput,
  ) => Promise<RetrieveFallbackLandingPageOutput>;
  stable: (
    input: RetrieveFallbackLandingPageInput,
  ) => Promise<StableDomainResult<RetrieveFallbackLandingPageOutput>>;
};

/**
 * Retorna o conteúdo mínimo publicável quando banco ou query falham.
 *
 * A landing page não deve derrubar a home por falta de configuração local ou
 * instabilidade de banco; o `source` preserva rastreabilidade para debug.
 */
async function retrieveFallbackLandingPageRaw({
  source,
}: RetrieveFallbackLandingPageInput): Promise<RetrieveFallbackLandingPageOutput> {
  return buildLandingPageFallbackData({
    fallbackContent: fallbackLandingPageContent,
    source,
  });
}

export function setupRetrieveFallbackLandingPageFeature(): RetrieveFallbackLandingPageFeature {
  const loggedRetrieveFallbackLandingPageRaw = withLog(
    retrieveFallbackLandingPageRaw,
    "retrieve-fallback-landing-page-raw",
  );

  return {
    raw: loggedRetrieveFallbackLandingPageRaw,
    stable: withLog(
      toStable(loggedRetrieveFallbackLandingPageRaw),
      "retrieve-fallback-landing-page-stable",
    ),
  };
}
