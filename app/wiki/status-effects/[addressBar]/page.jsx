import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import JsonLd from "@/src/components/JsonLd";
import { getStatusRelations } from "@/src/lib/content/relations";
import { getStatusEffect, statusEffectsData } from "@/src/lib/content/wiki";
import { createMetadata } from "@/src/seo/siteConfig";
import { breadcrumbSchema, definedTermSchema } from "@/src/seo/schema";

export function generateStaticParams() {
  return statusEffectsData.map(({ addressBar }) => ({ addressBar }));
}

export async function generateMetadata({ params }) {
  const { addressBar } = await params;
  const effect = getStatusEffect(addressBar);
  if (!effect) return {};
  return createMetadata({
    ...effect.seo,
    path: `/wiki/status-effects/${addressBar}/`,
  });
}

function RelatedTable({ records, type }) {
  if (!records.length) return <p>No direct {type.toLowerCase()} connections are listed in the current dataset.</p>;
  const singular = {
    Items: "Item",
    Relics: "Relic",
    Heroes: "Hero",
    Enemies: "Enemy",
  }[type];
  const basePath = type === "Heroes"
    ? "/heroes"
    : type === "Enemies"
      ? "/wiki/enemies"
      : `/wiki/${type.toLowerCase()}`;
  const isSinglePageDatabase = type === "Items" || type === "Relics";
  return (
    <div className="table-scroll">
      <table className="reference-table">
        <thead><tr><th>{singular}</th><th>Classification</th><th>Relevant effect or role</th></tr></thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id || record.addressBar}>
              <td>
                <Link
                  className="database-name"
                  href={isSinglePageDatabase
                    ? `${basePath}/?search=${encodeURIComponent(record.addressBar)}`
                    : `${basePath}/${record.addressBar}/`}
                >
                  {record.imageUrl && <span><Image src={record.imageUrl} alt="" fill sizes="40px" /></span>}
                  <strong>{record.name}</strong>
                </Link>
              </td>
              <td>
                {record.rarity || record.startingClass || record.attackType || record.category || "Current Demo"}
              </td>
              <td>
                {record.specialEffect ||
                  record.baseAbility?.effect ||
                  record.abilities?.[0]?.description ||
                  record.effect ||
                  record.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function StatusEffectDetailPage({ params }) {
  const { addressBar } = await params;
  const effect = getStatusEffect(addressBar);
  if (!effect) notFound();
  const relations = getStatusRelations(addressBar);
  const pageLinks = [
    ["Rules", "#rules"],
    ["Items", "#items"],
    ["Relics", "#relics"],
    ["Heroes", "#heroes"],
    ["Enemies", "#enemies"],
    ["Strategy", "#strategy"],
  ];
  const path = `/wiki/status-effects/${effect.addressBar}/`;
  const jsonLd = [
    definedTermSchema({
      name: effect.name,
      description: effect.seo.description,
      path,
      category: "Guildrun Status Effects",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Wiki", path: "/wiki/" },
      { name: "Status Effects", path: "/wiki/status-effects/" },
      { name: effect.name, path },
    ]),
  ];

  return (
    <main className="archive-main">
      <JsonLd data={jsonLd} />
      <ReferenceLayout section="wiki" activeHref="/wiki/status-effects/" pageLinks={pageLinks}>
        <nav className="breadcrumb compact-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/wiki/">Wiki</Link></li>
            <li><Link href="/wiki/status-effects/">Status Effects</Link></li>
            <li>{effect.name}</li>
          </ol>
        </nav>

        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">{effect.type}</span>
            <h1>{effect.seo.h1}</h1>
            <p>{effect.summary}</p>
          </div>
          <div className="reference-page-head__count">
            <strong>{relations.items.length + relations.relics.length + relations.heroes.length + relations.enemies.length}</strong>
            <span>linked records</span>
          </div>
        </header>

        <article className="record-sections">
          <section className="record-section" id="rules">
            <span className="archive-kicker">Current Demo behavior</span>
            <h2>How {effect.name} works</h2>
            <div className="stat-ledger">
              {effect.values.map(([label, value]) => (
                <div key={label}><span>{label}</span><strong>{value}</strong></div>
              ))}
            </div>
            <p>{effect.summary}</p>
          </section>

          <section className="record-section" id="items">
            <span className="archive-kicker">{relations.items.length} linked records</span>
            <h2>Items that use {effect.name}</h2>
            <RelatedTable records={relations.items} type="Items" />
          </section>

          <section className="record-section" id="relics">
            <span className="archive-kicker">{relations.relics.length} linked records</span>
            <h2>Relics that use {effect.name}</h2>
            <RelatedTable records={relations.relics} type="Relics" />
          </section>

          <section className="record-section" id="heroes">
            <span className="archive-kicker">{relations.heroes.length} linked records</span>
            <h2>Heroes that create or scale {effect.name}</h2>
            <RelatedTable records={relations.heroes} type="Heroes" />
          </section>

          <section className="record-section" id="enemies">
            <span className="archive-kicker">{relations.enemies.length} linked records</span>
            <h2>Enemies related to {effect.name}</h2>
            <RelatedTable records={relations.enemies} type="Enemies" />
          </section>

          <section className="record-section" id="strategy">
            <span className="archive-kicker">Decision guide</span>
            <h2>How to use {effect.name} in a run</h2>
            <p>{effect.playNote}</p>
            <ol className="instruction-list">
              <li><strong>Check the trigger condition.</strong><span>Range, Crit, cast, target, Rush, Stall, and quest requirements decide whether the effect appears at all.</span></li>
              <li><strong>Check the first application.</strong><span>Timing can matter more than the final stack count, especially against an opening threat.</span></li>
              <li><strong>Separate trigger from amplifier.</strong><span>Confirm the team can create the effect before buying equipment that only improves it.</span></li>
            </ol>
            <div className="manual-link-row">
              <Link href="/wiki/status-effects/">Back to all mechanics</Link>
              <Link href="/gameplay/growth-route/#upgrade-order">Status build guide</Link>
            </div>
          </section>
        </article>
      </ReferenceLayout>
    </main>
  );
}
