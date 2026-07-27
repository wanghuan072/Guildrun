import Image from "next/image";
import Link from "next/link";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import dataset from "@/src/data/dataset.json";
import { wikiCategories } from "@/src/lib/content/wiki";
import { pageTdk } from "@/src/seo/tdk";
import { createMetadata } from "@/src/seo/siteConfig";

export const metadata = createMetadata({ ...pageTdk.wiki, path: "/wiki/" });

export default function WikiPage() {
  return (
    <main className="archive-main">
      <ReferenceLayout section="wiki" activeHref="/wiki/">
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">
              Database directory · {dataset.gameVersion}
            </span>
            <h1>{pageTdk.wiki.h1}</h1>
            <p>
              Choose one collection and filter the complete Demo list. Items and
              relics stay in searchable tables; enemies and status effects open
              dedicated records for variants, locations, and connected mechanics.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>
              {wikiCategories
                .filter(({ countKey }) => ["items", "relics"].includes(countKey))
                .reduce((total, category) => total + category.count, 0)}
            </strong>
            <span>items + relics</span>
          </div>
        </header>

        <section className="manual-section">
          <span className="archive-kicker">Five focused databases</span>
          <h2>Find the entity first, then follow its connections</h2>
          <div className="wiki-category-list">
            {wikiCategories.map((category, index) => (
              <Link className="wiki-category-row" href={category.href} key={category.name}>
                <span className="wiki-category-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="wiki-category-media">
                  <Image src={category.imageUrl} alt={category.name} fill sizes="150px" />
                </span>
                <span className="wiki-category-copy">
                  <small>{category.label}</small>
                  <strong>{category.name}</strong>
                  <p>{category.description}</p>
                </span>
                <span className="wiki-category-count"><b>{category.count}</b><small>records</small></span>
                <span className="wiki-category-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="manual-section">
          <span className="archive-kicker">How the databases connect</span>
          <h2>Mechanics are linked in both directions</h2>
          <p>
            Item and relic records link to the statuses they create or amplify.
            Status pages return the related equipment, Heroes, and enemies.
            Rank Modifiers connect class-based Rank A and S offers back to every
            eligible Hero, while enemy records connect variants to stage data.
          </p>
        </section>
      </ReferenceLayout>
    </main>
  );
}
