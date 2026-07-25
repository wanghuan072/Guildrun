import LegalDocument from "@/src/components/LegalDocument";
import { legalData } from "@/app/legal/content";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.aboutUs,
  path: "/legal/about-us/",
});

export default function AboutUsPage() {
  return <LegalDocument document={legalData.aboutUs} path="/legal/about-us/" tdk={pageTdk.aboutUs} />;
}
