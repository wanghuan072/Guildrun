import Image from "next/image";
import Link from "next/link";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import {
  stagesReferenceData,
  worldCategories,
} from "@/src/lib/content/world";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.world,
  path: "/world/",
});

export default function WorldPage() {
  return (
    <main className="archive-main">
      <ReferenceLayout section="world" activeHref="/world/">
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">World database directory</span>
            <h1>{pageTdk.world.h1}</h1>
            <p>
              Choose the route system you need. The world section is divided
              into five focused databases so formations, choices, and modifiers
              remain searchable instead of becoming one long overview article.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>{stagesReferenceData.length}</strong>
            <span>stage records</span>
          </div>
        </header>

        <section className="manual-section">
          <span className="archive-kicker">Five world collections</span>
          <h2>Follow the route from encounter to consequence</h2>
          <div className="wiki-category-list">
            {worldCategories.map((category, index) => (
              <Link className="wiki-category-row" href={category.href} key={category.name}>
                <span className="wiki-category-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="wiki-category-media">
                  <Image src={category.imageUrl} alt="" fill sizes="150px" />
                </span>
                <span className="wiki-category-copy">
                  <small>{category.label}</small><strong>{category.name}</strong><p>{category.description}</p>
                </span>
                <span className="wiki-category-count"><b>{category.count}</b><small>records</small></span>
                <span className="wiki-category-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="manual-section">
          <span className="archive-kicker">Systems integration</span>
          <h2>World pages include the route systems that affect a fight</h2>
          <p>
            Difficulty and game-mode rules live with Fight Modes. Event stat
            changes live with Stat Mods. Stage formations link directly to the
            enemy database, while event choices connect back to progression and
            economy guidance. No separate Systems directory is required.
          </p>
        </section>
      </ReferenceLayout>
    </main>
  );
}
