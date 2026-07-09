import "server-only";

import type { LandingPageData } from "@/domain/entities";
import type {
  RetrieveFallbackLandingPageInput,
  RetrieveFallbackLandingPageOutput,
} from "@/domain/features/retrieve-fallback-landing-page";
import { unwrap } from "@/domain/shared/unwrap";
import type { StableDomainResult } from "@/domain/shared/to-stable";

export type RetrievePublicLandingPageDataControllerInput = {
  retrieveFallbackLandingPage: (
    input: RetrieveFallbackLandingPageInput,
  ) => Promise<RetrieveFallbackLandingPageOutput>;
  retrievePublicLandingPageContentStable: () => Promise<
    StableDomainResult<LandingPageData>
  >;
};

/**
 * Orquestra a leitura da landing page pública para Server Components.
 *
 * O controller sempre retorna um DTO renderizável. Falhas de banco viram
 * conteúdo fallback para preservar a home pública e evitar vazamento de erro.
 */
export async function retrievePublicLandingPageDataController({
  retrieveFallbackLandingPage,
  retrievePublicLandingPageContentStable,
}: RetrievePublicLandingPageDataControllerInput): Promise<LandingPageData> {
  const landingPageStableResult =
    await retrievePublicLandingPageContentStable();
  const fallbackLandingPageData = await retrieveFallbackLandingPage({
    source: "fallback-database-error",
  });

  return unwrap(landingPageStableResult, fallbackLandingPageData);
}
