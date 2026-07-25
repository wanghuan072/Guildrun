import Image from "next/image";
import Link from "next/link";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import { enemiesData } from "@/src/lib/content/wiki";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.enemies,
  path: "/wiki/enemies/",
});

export default function EnemiesPage() {
  return (
    <main className="archive-main">
      <ReferenceLayout section="wiki" activeHref="/wiki/enemies/">
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">Threat database</span>
            <h1>{pageTdk.enemies.h1}</h1>
            <p>
              Open an enemy family for abilities, base properties, Tier 1–3
              bodies, event versions, Endless values, scaling rules, and route
              appearances.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>{enemiesData.length}</strong>
            <span>enemy families</span>
          </div>
        </header>

        <div className="table-scroll">
          <table className="reference-table directory-table">
            <thead><tr><th>Enemy</th><th>Attack</th><th>HP range</th><th>Variants</th><th>Abilities</th><th>Appears in</th></tr></thead>
            <tbody>
              {enemiesData.map((enemy) => (
                <tr key={enemy.id}>
                  <td>
                    <Link className="database-name" href={`/wiki/enemies/${enemy.addressBar}/`}>
                      <span><Image src={enemy.imageUrl} alt="" fill sizes="48px" /></span>
                      <strong>{enemy.name}</strong>
                    </Link>
                  </td>
                  <td>{enemy.attackType}</td>
                  <td>{enemy.healthRange}</td>
                  <td>{enemy.enemyDataVariantCount || enemy.variantCount}</td>
                  <td>
                    {enemy.abilities?.length
                      ? [...new Set(enemy.abilities.map((ability) => ability.name))].join(", ")
                      : "Standard attacks"}
                  </td>
                  <td><Link href={`/wiki/enemies/${enemy.addressBar}/`}>{enemy.appearsIn}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ReferenceLayout>
    </main>
  );
}
