import { LandingPage } from "@/components/site/landing-page";
import { retrievePublicLandingPageDataController } from "@/main/factories/controller";

export const revalidate = 300;

export default async function HomePage() {
  const landingPageData = await retrievePublicLandingPageDataController();

  return <LandingPage landingPageData={landingPageData} />;
}
