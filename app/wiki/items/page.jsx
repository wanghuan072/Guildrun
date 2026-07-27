import { Suspense } from "react";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import CollectibleExplorer from "@/src/components/CollectibleExplorer";
import { itemsData } from "@/src/lib/content/items";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.items,
  path: "/wiki/items/",
});

export default function ItemsPage() {
  return (
    <main className="archive-main">
      <ReferenceLayout section="wiki" activeHref="/wiki/items/">
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">Equipment database</span>
            <h1>{pageTdk.items.h1}</h1>
            <p>
              Filter the complete Demo item pool by rarity, role, stat, or
              mechanic. Compare the table, then open any item for its complete
              stats, effect, quest, mechanics, and related local records.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>{itemsData.length}</strong>
            <span>items</span>
          </div>
        </header>
        <Suspense fallback={<p className="directory-status">Loading item filters…</p>}>
          <CollectibleExplorer records={itemsData} variant="items" />
        </Suspense>
      </ReferenceLayout>
    </main>
  );
}
