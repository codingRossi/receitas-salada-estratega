/**
 * Feature de leitura da landing page pública.
 *
 * O controller chama esta camada para receber um DTO pronto para renderização.
 * Queries ficam nos repositories; normalização, fallback e montagem do DTO
 * público ficam nesta feature e nos helpers puros.
 */

import "server-only";

import { fallbackLandingPageContent } from "../contents/landing-page-fallback-content";
import type { LandingPageData } from "../entities/landing-page";
import { toStable, type StableDomainResult } from "../shared/to-stable";
import { withLog } from "../shared/with-log";
import {
  buildPublicLandingPageContent,
  hasConfiguredDatabaseUrl,
} from "./helpers";
import type {
  RetrieveFallbackLandingPageInput,
  RetrieveFallbackLandingPageOutput,
} from "./retrieve-fallback-landing-page";
import type { RetrievePublicLandingPageRowsOutput } from "./retrieve-public-landing-page-rows";

export type SetupRetrievePublicLandingPageContentFeatureInput = {
  retrieveFallbackLandingPage: (
    input: RetrieveFallbackLandingPageInput,
  ) => Promise<RetrieveFallbackLandingPageOutput>;
  retrievePublicLandingPageRows: () => Promise<RetrievePublicLandingPageRowsOutput>;
};

export type RetrievePublicLandingPageContentFeatureOutput = LandingPageData;

export type RetrievePublicLandingPageContentFeature = {
  raw: () => Promise<LandingPageData>;
  stable: () => Promise<StableDomainResult<LandingPageData>>;
};

/**
 * Executa a leitura raw da landing page pública sem o caller montar a feature.
 *
 * Erros de query ainda propagam aqui. Use
 * `setupRetrievePublicLandingPageContentFeature(...).stable()` no controller
 * quando a rota não deve expor falha de banco ao visitante.
 */
export async function retrievePublicLandingPageContentFeature({
  retrieveFallbackLandingPage,
  retrievePublicLandingPageRows,
}: SetupRetrievePublicLandingPageContentFeatureInput): Promise<LandingPageData> {
  return setupRetrievePublicLandingPageContentFeature({
    retrieveFallbackLandingPage,
    retrievePublicLandingPageRows,
  }).raw();
}

/**
 * Cria os pontos de entrada raw/stable da landing page.
 *
 * `raw` propaga erros para testes e diagnóstico. `stable` converte falha em
 * resultado controlado para o controller aplicar fallback final.
 */
export function setupRetrievePublicLandingPageContentFeature({
  retrieveFallbackLandingPage,
  retrievePublicLandingPageRows,
}: SetupRetrievePublicLandingPageContentFeatureInput): RetrievePublicLandingPageContentFeature {
  async function raw(): Promise<LandingPageData> {
    if (!hasConfiguredDatabaseUrl()) {
      return retrieveFallbackLandingPage({
        source: "fallback-no-database-url",
      });
    }

    const publicLandingPageRows = await retrievePublicLandingPageRows();
    const publicLandingPageContent = buildPublicLandingPageContent({
      fallbackContent: fallbackLandingPageContent,
      ...publicLandingPageRows,
    });

    return {
      ...publicLandingPageContent,
      source: "database",
    };
  }

  const loggedRaw = withLog(raw, "retrieve-public-landing-page-content-raw");
  const stable = toStable(loggedRaw);

  return {
    raw: loggedRaw,
    stable: withLog(stable, "retrieve-public-landing-page-content-stable"),
  };
}
