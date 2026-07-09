import { toStable } from "../shared/to-stable";
import { withLog } from "../shared/with-log";
import { buildWhatsAppUrl } from "./helpers";

export type BuildWhatsAppUrlFeatureInput = {
  message: string;
  phone?: string | null;
};

export type BuildWhatsAppUrlFeatureOutput = string;

export function setupBuildWhatsAppUrlFeature() {
  async function buildUrlRaw(
    input: BuildWhatsAppUrlFeatureInput,
  ): Promise<BuildWhatsAppUrlFeatureOutput> {
    return buildWhatsAppUrl(input);
  }

  const loggedBuildUrlRaw = withLog(buildUrlRaw, "build-whatsapp-url-raw");

  return {
    buildUrl: {
      raw: loggedBuildUrlRaw,
      stable: withLog(toStable(loggedBuildUrlRaw), "build-whatsapp-url-stable"),
    },
  };
}
