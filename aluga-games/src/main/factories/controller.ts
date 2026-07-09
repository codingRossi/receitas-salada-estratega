import "server-only";

import { retrievePublicLandingPageDataController as retrievePublicLandingPageDataControllerWithDependencies } from "@/controllers/landing-page-controller";
import {
  retrieveFallbackLandingPageFeature,
  retrievePublicLandingPageContentFeature,
} from "./features";

export async function retrievePublicLandingPageDataController() {
  return retrievePublicLandingPageDataControllerWithDependencies({
    retrieveFallbackLandingPage: retrieveFallbackLandingPageFeature.raw,
    retrievePublicLandingPageContentStable:
      retrievePublicLandingPageContentFeature.stable,
  });
}
