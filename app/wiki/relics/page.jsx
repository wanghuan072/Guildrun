import { Suspense } from "react";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import CollectibleExplorer from "@/src/components/CollectibleExplorer";
import { relicsData } from "@/src/lib/content/relics";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.relics,
  path: "/wiki/relics/",
});

export default function RelicsPage() {
  return (
    <main className="archive-main">
      <ReferenceLayout section="wiki" activeHref="/wiki/relics/">
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">Run-wide effect database</span>
            <h1>{pageTdk.relics.h1}</h1>
            <p>
              Compare the full relic pool by rarity, category, trigger, and
              reward. Open any relic for its complete effect, quest condition,
              indexed mechanics, and related local records.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>{relicsData.length}</strong>
            <span>relics</span>
          </div>
        </header>
        <Suspense fallback={<p className="directory-status">Loading relic filters…</p>}>
          <CollectibleExplorer records={relicsData} variant="relics" />
        </Suspense>
      </ReferenceLayout>
    </main>
  );
}
