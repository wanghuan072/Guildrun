import LegalDocument from "@/src/components/LegalDocument";
import { legalData } from "@/app/legal/content";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.privacyPolicy,
  path: "/legal/privacy-policy/",
});

export default function PrivacyPolicyPage() {
  return <LegalDocument document={legalData.privacyPolicy} path="/legal/privacy-policy/" tdk={pageTdk.privacyPolicy} />;
}
