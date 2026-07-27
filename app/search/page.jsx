import { Suspense } from "react";
import SiteSearch from "@/src/components/SiteSearch";
import "@/src/styles/search.css";
import dataset from "@/src/data/dataset.json";
import { searchIndex } from "@/src/lib/searchIndex";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.search,
  path: "/search/",
});

export default function SearchPage() {
  return (
    <main className="archive-main">
      <div className="container search-page">
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">
              Site search · {dataset.gameVersion}
            </span>
            <h1>{pageTdk.search.h1}</h1>
            <p>
              Search heroes, items, relics, enemies, status effects, stages,
              events, guides, and updates from one place. Results stay on this
              site and link into the matching record.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>{searchIndex.length}</strong>
            <span>indexed records</span>
          </div>
        </header>
        <Suspense fallback={<p className="directory-status">Loading search…</p>}>
          <SiteSearch />
        </Suspense>
      </div>
    </main>
  );
}
