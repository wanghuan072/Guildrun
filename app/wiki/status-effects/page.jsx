import Link from "next/link";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import { getStatusRelations } from "@/src/lib/content/relations";
import { statusEffectsData } from "@/src/lib/content/wiki";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.statusEffects,
  path: "/wiki/status-effects/",
});

export default function StatusEffectsPage() {
  const rows = statusEffectsData.map((effect) => ({
    ...effect,
    relations: getStatusRelations(effect.addressBar),
  }));

  return (
    <main className="archive-main">
      <ReferenceLayout section="wiki" activeHref="/wiki/status-effects/">
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">Combat mechanic index</span>
            <h1>{pageTdk.statusEffects.h1}</h1>
            <p>
              Exact timing and stacking rules plus the equipment, heroes, and
              enemies that create or use each effect. Hero and enemy links open
              dossiers; items and relics jump into the filtered database tables.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>{statusEffectsData.length}</strong>
            <span>mechanics</span>
          </div>
        </header>

        <div className="table-scroll">
          <table className="reference-table directory-table">
            <thead><tr><th>Effect</th><th>Category</th><th>Core rule</th><th>Items</th><th>Relics</th><th>Heroes</th><th>Enemies</th></tr></thead>
            <tbody>
              {rows.map((effect) => (
                <tr key={effect.addressBar}>
                  <td><Link href={`/wiki/status-effects/${effect.addressBar}/`}><strong>{effect.name}</strong></Link></td>
                  <td>{effect.type}</td>
                  <td><Link href={`/wiki/status-effects/${effect.addressBar}/`}>{effect.summary}</Link></td>
                  <td>{effect.relations.items.length}</td>
                  <td>{effect.relations.relics.length}</td>
                  <td>{effect.relations.heroes.length}</td>
                  <td>{effect.relations.enemies.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ReferenceLayout>
    </main>
  );
}
