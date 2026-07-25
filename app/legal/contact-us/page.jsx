import LegalDocument from "@/src/components/LegalDocument";
import { legalData } from "@/app/legal/content";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.contactUs,
  path: "/legal/contact-us/",
});

export default function ContactUsPage() {
  return <LegalDocument document={legalData.contactUs} path="/legal/contact-us/" tdk={pageTdk.contactUs} />;
}
