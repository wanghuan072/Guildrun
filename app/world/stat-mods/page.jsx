import Link from "next/link";
import GptAdSlot from "@/src/components/GptAdSlot";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import { createGptElementId } from "@/src/config/gpt";
import { statModsReferenceData } from "@/src/lib/content/world";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.statMods,
  path: "/world/stat-mods/",
});

export default function StatModsPage() {
  const total = statModsReferenceData.reduce((sum, group) => sum + group.rows.length, 0);
  const pageLinks = statModsReferenceData.map((group) => [
    group.name,
    `#${group.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  ]);

  return (
    <main className="archive-main">
      <ReferenceLayout section="world" activeHref="/world/stat-mods/" pageLinks={pageLinks}>
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">Event-driven stat growth</span>
            <h1>{pageTdk.statMods.h1}</h1>
            <p>
              Permanent and route-specific stat changes grouped by affected
              attribute. Every connected event links to its choices and outcome
              record.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>{total}</strong>
            <span>modifiers</span>
          </div>
        </header>

        <article className="record-sections">
          <section className="record-section">
            <span className="archive-kicker">How to read this database</span>
            <h2>Stat mods are outcomes, not equipment</h2>
            <p>
              These values are usually attached to an event choice or Endless
              progression record. Positive and negative versions can affect the
              same stat, so open the linked event before planning around the
              value alone.
            </p>
            <div className="manual-link-row">
              <Link href="/wiki/rank-modifiers/">Open class-based Rank Modifiers</Link>
              <Link href="/gameplay/stats/">Review stat formulas</Link>
            </div>
          </section>

          {statModsReferenceData.map((group) => {
            const anchor = group.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            return (
              <section className="record-section" id={anchor} key={group.name}>
                <span className="archive-kicker">{group.rows.length} records</span>
                <h2>{group.name} modifiers</h2>
                <div className="table-scroll">
                  <table className="reference-table">
                    <thead><tr><th>Modifier</th><th>Value</th><th>Connected events</th></tr></thead>
                    <tbody>
                      {group.rows.map((row) => (
                        <tr key={row.id}>
                          <td><strong>{row.name}</strong><small> {row.id}</small></td>
                          <td>{row.value}</td>
                          <td>
                            <span className="tag-links">
                              {row.events.map((event) => (
                                <Link href={`/world/events/${event.id}/`} key={`${row.id}-${event.id}`}>{event.name}</Link>
                              ))}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}

          {/* GPT: banner_3 · after the modifier tables */}
          <GptAdSlot
            id={createGptElementId("world-stat-mods", "modifier-tables")}
            unit="banner3"
          />

          <section className="record-section">
            <span className="archive-kicker">Growth decision</span>
            <h2>Choose a stat for the current bottleneck</h2>
            <p>
              Max HP and Defense solve different incoming damage patterns;
              Attack and Magic only matter when the holder reaches a useful
              target; Mana Regen changes a cast cycle; Attack Speed changes
              attack and trigger frequency. Compare the value with the exact
              hero stat sheet before choosing the event outcome.
            </p>
            <div className="manual-link-row">
              <Link href="/heroes/">Compare hero base stats</Link>
              <Link href="/world/events/">Open event outcomes</Link>
              <Link href="/gameplay/growth-route/">Growth Route guide</Link>
              <Link href="/gameplay/stats/">Stats and formulas</Link>
            </div>
          </section>
        </article>
      </ReferenceLayout>
    </main>
  );
}
