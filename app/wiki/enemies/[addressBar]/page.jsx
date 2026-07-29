import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DetailPageLayout from "@/src/components/DetailPageLayout";
import GptAdSlot from "@/src/components/GptAdSlot";
import { createGptElementId } from "@/src/config/gpt";
import {
  enemyCollection,
  statusEffectsData,
} from "@/src/lib/content/wiki";
import { stagesReferenceData } from "@/src/lib/content/world";
import { breadcrumbSchema, definedTermSchema } from "@/src/seo/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return enemyCollection.staticParams();
}

export async function generateMetadata({ params }) {
  const enemy = enemyCollection.get((await params).addressBar);
  if (!enemy) return {};
  return enemyCollection.metadata(enemy);
}

function groupAnchor(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default async function EnemyDetailPage({ params }) {
  const { addressBar } = await params;
  const enemy = enemyCollection.get(addressBar);
  if (!enemy) notFound();

  const abilityText = (enemy.abilities || []).map((ability) => ability.description).join(" ");
  const relatedStatuses = statusEffectsData.filter((effect) => (
    new RegExp(`\\b${effect.name === "Shields" ? "Shield" : effect.name}\\w*\\b`, "i").test(abilityText)
  ));
  const relatedStages = stagesReferenceData
    .filter((stage) => stage.formation?.some((unit) => unit.enemySlug === enemy.addressBar))
    .slice(0, 18);
  const pageLinks = [
    ["Overview", "#overview"],
    ...(enemy.abilities?.length ? [["Abilities", "#abilities"]] : []),
    ...(enemy.variantGroups || []).map((group) => [group.name, `#${groupAnchor(group.name)}`]),
    ...(enemy.endlessScaling?.length ? [["Endless scaling", "#endless-scaling"]] : []),
    ["Locations", "#locations"],
    ["Strategy", "#strategy"],
  ];
  const path = `/wiki/enemies/${enemy.addressBar}/`;
  const jsonLd = [
    definedTermSchema({
      name: enemy.name,
      description: enemy.seo.description,
      path,
      image: enemy.imageUrl,
      category: "Guildrun Enemies",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Wiki", path: "/wiki/" },
      { name: "Enemies", path: "/wiki/enemies/" },
      { name: enemy.name, path },
    ]),
  ];

  return (
    <DetailPageLayout
      section="wiki"
      activeHref="/wiki/enemies/"
      pageLinks={pageLinks}
      breadcrumbs={[
        { label: "Wiki", href: "/wiki/" },
        { label: "Enemies", href: "/wiki/enemies/" },
        { label: enemy.name },
      ]}
      jsonLd={jsonLd}
    >

        <header className="record-head">
          <div className="record-head__image">
            <Image src={enemy.imageUrl} alt={enemy.imageAlt} fill priority sizes="144px" />
          </div>
          <div className="record-head__copy">
            <span className="archive-eyebrow">{enemy.attackType} enemy family</span>
            <h1>{enemy.seo.h1}</h1>
            <div className="record-head__meta">
              <span><strong>Bodies</strong> {enemy.bodyCount || enemy.variantCount || "—"}</span>
              <span><strong>Data variants</strong> {enemy.enemyDataVariantCount || enemy.variantCount}</span>
              <span><strong>HP range</strong> {enemy.healthRange}</span>
            </div>
          </div>
        </header>

        <article className="record-sections">
          <section className="record-section" id="overview">
            <span className="archive-kicker">Enemy properties</span>
            <h2>{enemy.name} at a glance</h2>
            <div className="stat-ledger">
              <div><span>Attack type</span><strong>{enemy.attackType}</strong></div>
              <div><span>Health span</span><strong>{enemy.healthRange}</strong></div>
              <div><span>Recorded bodies</span><strong>{enemy.bodyCount || "—"}</strong></div>
              <div><span>Data variants</span><strong>{enemy.enemyDataVariantCount || enemy.variantCount}</strong></div>
              <div><span>Abilities</span><strong>{enemy.abilities?.length || 0}</strong></div>
              <div><span>Route presence</span><strong>{enemy.appearsIn}</strong></div>
            </div>
            <p>
              Values differ by act, floor, difficulty, event, and Endless
              version. Use the exact row below instead of treating the family as
              one fixed stat line.
            </p>
          </section>

          {enemy.abilities?.length > 0 && (
            <section className="record-section" id="abilities">
              <span className="archive-kicker">Ability data</span>
              <h2>{enemy.name} abilities</h2>
              <div className="table-scroll">
                <table className="reference-table">
                  <thead><tr><th>Type</th><th>Ability</th><th>Effect</th><th>Availability</th></tr></thead>
                  <tbody>
                    {enemy.abilities.map((ability, index) => (
                      <tr key={`${ability.name}-${index}`}>
                        <td>{ability.type}</td>
                        <td><strong>{ability.name}</strong></td>
                        <td>{ability.description}</td>
                        <td>{ability.variants}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {relatedStatuses.length > 0 && (
                <div className="tag-links">
                  {relatedStatuses.map((effect) => (
                    <Link href={`/wiki/status-effects/${effect.addressBar}/`} key={effect.addressBar}>
                      {effect.name} rules
                    </Link>
                  ))}
                </div>
              )}
            </section>
          )}

          {(enemy.variantGroups || []).map((group) => (
            <section className="record-section" id={groupAnchor(group.name)} key={group.name}>
              <span className="archive-kicker">{group.count} recorded rows</span>
              <h2>{group.name} variants</h2>
              <div className="table-scroll">
                <table className="reference-table">
                  <thead>
                    <tr>{group.columns.map((column) => <th key={column}>{column}</th>)}</tr>
                  </thead>
                  <tbody>
                    {group.rows.map((row, index) => (
                      <tr key={`${group.name}-${index}`}>
                        {group.columns.map((column) => <td key={column}>{row[column] || "—"}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}

          {enemy.endlessScaling?.length > 0 && (
            <section className="record-section" id="endless-scaling">
              <span className="archive-kicker">Mode-specific growth</span>
              <h2>Endless scaling modifiers</h2>
              <div className="table-scroll">
                <table className="reference-table">
                  <thead><tr><th>Stat</th><th>Type</th><th>Value</th></tr></thead>
                  <tbody>
                    {enemy.endlessScaling.map((row) => (
                      <tr key={row.Stat}><td>{row.Stat}</td><td>{row.Type}</td><td>{row.Value}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="manual-link-row">
                <Link href="/world/fight-modes/">Read the Endless and challenge mode guide</Link>
              </div>
            </section>
          )}

          {/* GPT: banner_3 · between variant data and locations */}
          <GptAdSlot
            id={createGptElementId(`enemy-${enemy.addressBar}`, "variants")}
            unit="banner3"
          />

          <section className="record-section" id="locations">
            <span className="archive-kicker">Stage appearances</span>
            <h2>Where {enemy.name} appears</h2>
            {relatedStages.length ? (
              <div className="table-scroll">
                <table className="reference-table">
                  <thead><tr><th>Stage</th><th>Act / floor</th><th>Type</th><th>Difficulty</th></tr></thead>
                  <tbody>
                    {relatedStages.map((stage) => (
                      <tr key={stage.id}>
                        <td><Link href={`/world/stages/${stage.addressBar}/`}>{stage.name || stage.title}</Link></td>
                        <td>{stage.actLabel} · {stage.floorLabel}</td>
                        <td>{stage.type}</td>
                        <td>{stage.difficulty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>{enemy.appearsIn}. No formation record was matched in the current stage snapshot.</p>
            )}
            <div className="manual-link-row">
              <Link href="/world/stages/">Search all stage formations</Link>
            </div>
          </section>

          <section className="record-section" id="strategy">
            <span className="archive-kicker">Practical counterplay</span>
            <h2>How to prepare for {enemy.name}</h2>
            <ol className="instruction-list">
              <li><strong>Open the exact variant.</strong><span>Use act, floor, and difficulty to choose the relevant stat row instead of the family average.</span></li>
              <li><strong>Identify the first valid target.</strong><span>Distance is evaluated before class priority for normal targeting.</span></li>
              <li><strong>Protect the required cast window.</strong><span>Compare enemy range and abilities with the time your support or carry needs to act.</span></li>
              <li><strong>Choose access before damage.</strong><span>A hero that can reach the threat often outperforms a higher-stat unit blocked by pathing.</span></li>
            </ol>
            <div className="manual-link-row">
              <Link href="/gameplay/#enemies">Enemy-reading guide</Link>
              <Link href="/gameplay/#positioning">Positioning and targeting</Link>
              <Link href="/wiki/enemies/">Back to all enemies</Link>
            </div>
          </section>
        </article>
    </DetailPageLayout>
  );
}
