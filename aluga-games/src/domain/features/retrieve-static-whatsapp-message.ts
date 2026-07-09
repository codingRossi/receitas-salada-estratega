import { toStable } from "../shared/to-stable";
import { withLog } from "../shared/with-log";
import {
  buildStaticWhatsAppMessage,
  defaultWhatsAppMessages,
} from "./helpers";

export type RetrieveStaticWhatsAppMessageFeatureInput = {
  type: keyof typeof defaultWhatsAppMessages;
};

export type RetrieveStaticWhatsAppMessageFeatureOutput = string;

export function setupRetrieveStaticWhatsAppMessageFeature() {
  async function retrieveStaticWhatsAppMessageRaw(
    input: RetrieveStaticWhatsAppMessageFeatureInput,
  ): Promise<RetrieveStaticWhatsAppMessageFeatureOutput> {
    return buildStaticWhatsAppMessage(input.type);
  }

  const loggedRetrieveStaticWhatsAppMessageRaw = withLog(
    retrieveStaticWhatsAppMessageRaw,
    "retrieve-static-whatsapp-message-raw",
  );

  return {
    retrieveStaticMessage: {
      raw: loggedRetrieveStaticWhatsAppMessageRaw,
      stable: withLog(
        toStable(loggedRetrieveStaticWhatsAppMessageRaw),
        "retrieve-static-whatsapp-message-stable",
      ),
    },
  };
}
