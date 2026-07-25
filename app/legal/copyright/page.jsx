import LegalDocument from "@/src/components/LegalDocument";
import { legalData } from "@/app/legal/content";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.copyright,
  path: "/legal/copyright/",
});

export default function CopyrightPage() {
  return <LegalDocument document={legalData.copyright} path="/legal/copyright/" tdk={pageTdk.copyright} />;
}
