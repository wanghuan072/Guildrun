import LegalDocument from "@/src/components/LegalDocument";
import { legalData } from "@/app/legal/content";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.termsOfService,
  path: "/legal/terms-of-service/",
});

export default function TermsOfServicePage() {
  return <LegalDocument document={legalData.termsOfService} path="/legal/terms-of-service/" tdk={pageTdk.termsOfService} />;
}
