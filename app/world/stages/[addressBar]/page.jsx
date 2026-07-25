import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import JsonLd from "@/src/components/JsonLd";
import { getEnemy } from "@/src/lib/content/wiki";
import { getReferenceStage, stagesReferenceData } from "@/src/lib/content/world";
import { createMetadata } from "@/src/seo/siteConfig";
import { articleSchema, breadcrumbSchema } from "@/src/seo/schema";

const boardCellCount = 30;
const rangedSlots = [1, 3, 5, 7, 9, 11];
const meleeSlots = [19, 21, 23, 25, 27, 29];

function formatNumber(value) {
  const number = Number(value);
  return Number.isFinite(number)
    ? number.toLocaleString("en-US", { maximumFractionDigits: 0 })
    : "—";
}

function rewardValue(stage, label, fallback = "0") {
  if (!stage.rewards) return fallback;
  return stage.rewards[label] ?? stage.rewards[label.toLowerCase()] ?? fallback;
}

function prepareFormation(formation = []) {
  let rangedIndex = 0;
  let meleeIndex = 0;

  return formation.map((unit) => {
    const isRanged = /ranged/i.test(unit.meta || "");
    const slotIndex = isRanged
      ? rangedSlots[rangedIndex++ % rangedSlots.length]
      : meleeSlots[meleeIndex++ % meleeSlots.length];

    return {
      ...unit,
      enemy: getEnemy(unit.enemySlug),
      isRanged,
      slotIndex,
    };
  });
}

function groupFormation(formation) {
  const groups = new Map();
  formation.forEach((unit) => {
    const current = groups.get(unit.enemySlug) || {
      ...unit,
      count: 0,
    };
    current.count += 1;
    groups.set(unit.enemySlug, current);
  });
  return [...groups.values()];
}

export function generateStaticParams() {
  return stagesReferenceData.map(({ addressBar }) => ({ addressBar }));
}

export async function generateMetadata({ params }) {
  const { addressBar } = await params;
  const stage = getReferenceStage(addressBar);
  if (!stage) return {};
  return createMetadata({
    ...stage.seo,
    path: `/world/stages/${addressBar}/`,
  });
}

export default async function StageDetailPage({ params }) {
  const { addressBar } = await params;
  const stage = getReferenceStage(addressBar);
  if (!stage) notFound();

  const title = stage.title || stage.name;
  const formation = prepareFormation(stage.formation);
  const formationGroups = groupFormation(formation);
  const unitsByCell = new Map(formation.map((unit) => [unit.slotIndex, unit]));
  const pageLinks = [
    ["Telemetry", "#telemetry"],
    ["Formation", "#formation"],
    ["Environment", "#environment"],
    ["Preparation", "#preparation"],
  ];
  const path = `/world/stages/${stage.addressBar}/`;
  const jsonLd = [
    articleSchema({
      headline: stage.seo.h1,
      description: stage.seo.description,
      path,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "World", path: "/world/" },
      { name: "Stages", path: "/world/stages/" },
      { name: title, path },
    ]),
  ];

  return (
    <main className="archive-main">
      <JsonLd data={jsonLd} />
      <ReferenceLayout section="world" activeHref="/world/stages/" pageLinks={pageLinks}>
        <nav className="breadcrumb compact-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/world/">World</Link></li>
            <li><Link href="/world/stages/">Stages</Link></li>
            <li>{title}</li>
          </ol>
        </nav>

        <header className="reference-page-head stage-record-head">
          <div>
            <span className="archive-eyebrow">
              {stage.actLabel} · {stage.stageType} · Record #{stage.id}
            </span>
            <h1>{stage.seo.h1}</h1>
            <p>
              Read this encounter as a board, not only a list. The telemetry
              shows the stage target and economy, while the formation places
              ranged threats behind the melee line in the order presented to
              the player.
            </p>
          </div>
          <dl className="stage-record-stamp">
            <div><dt>Floor</dt><dd>{stage.floorLabel}</dd></div>
            <div><dt>Difficulty</dt><dd>{stage.difficulty}</dd></div>
            <div><dt>Hostiles</dt><dd>{formation.length || stage.enemyCount}</dd></div>
          </dl>
        </header>

        <article className="record-sections stage-dossier">
          <section className="record-section" id="telemetry">
            <div className="stage-section-heading">
              <div>
                <span className="archive-kicker">Encounter telemetry</span>
                <h2>Stage targets and rewards</h2>
              </div>
              <p>
                Effective values are encounter targets used to compare stage
                pressure. Individual enemy health and attack remain visible on
                the formation roster below.
              </p>
            </div>

            <div className="stage-telemetry-panels">
              <section className="stage-panel stage-panel--targets">
                <header>
                  <span aria-hidden="true">◈</span>
                  <h3>Pressure targets</h3>
                </header>
                <div className="stage-telemetry-grid">
                  <article className="stage-telemetry stage-telemetry--health">
                    <span>Effective health</span>
                    <strong>{formatNumber(stage.effectiveHealth)}</strong>
                    <div className="stage-meter" aria-hidden="true">
                      <i style={{ width: "100%" }} />
                    </div>
                    <small>Combined durability target for the clear</small>
                  </article>
                  <article className="stage-telemetry stage-telemetry--offense">
                    <span>Effective offense</span>
                    <strong>{formatNumber(stage.effectiveOffense)}</strong>
                    <div className="stage-meter" aria-hidden="true">
                      <i style={{ width: Number(stage.effectiveOffense) > 0 ? "68%" : "4%" }} />
                    </div>
                    <small>Stage-level damage pressure</small>
                  </article>
                </div>
              </section>
              <section className="stage-panel stage-panel--payout">
                <header>
                  <span aria-hidden="true">◇</span>
                  <h3>Shard payout</h3>
                </header>
                <div className="stage-telemetry-grid">
                  <article className="stage-telemetry stage-telemetry--reward">
                    <span>Victory gold</span>
                    <strong>{rewardValue(stage, "Victory gold", stage.gold)}</strong>
                    <small>Paid after a successful clear</small>
                  </article>
                  <article className="stage-telemetry stage-telemetry--risk">
                    <span>Defeat gold</span>
                    <strong>{rewardValue(stage, "Defeat gold")}</strong>
                    <small>Economy retained on a loss</small>
                  </article>
                </div>
              </section>
            </div>
          </section>

          <section className="record-section" id="formation">
            <div className="stage-section-heading">
              <div>
                <span className="archive-kicker">Tactical projection</span>
                <h2>{title} enemy formation</h2>
              </div>
              <p>
                The upper lanes represent ranged pressure; the lower lanes are
                the frontline closest to your guild. Select an enemy portrait
                to inspect its abilities and level variants.
              </p>
            </div>

            {formation.length ? (
              <div className="formation-console">
                <div className="formation-board-wrap">
                  <div className="formation-board-axis">
                    <span>Enemy backline</span>
                    <span>Frontline faces your team ↓</span>
                  </div>
                  <div className="formation-board" aria-label={`${title} enemy formation`}>
                    {Array.from({ length: boardCellCount }, (_, index) => {
                      const unit = unitsByCell.get(index);
                      return (
                        <div className="formation-cell" key={index}>
                          {unit && (
                            unit.enemy ? (
                              <Link
                                className={`formation-unit formation-unit--${unit.isRanged ? "ranged" : "melee"}`}
                                href={`/wiki/enemies/${unit.enemy.addressBar}/`}
                                aria-label={`Position ${unit.position}: ${unit.name}`}
                              >
                                <Image
                                  src={unit.enemy.imageUrl}
                                  alt=""
                                  fill
                                  sizes="64px"
                                />
                                <b>{unit.position}</b>
                              </Link>
                            ) : (
                              <span className={`formation-unit formation-unit--${unit.isRanged ? "ranged" : "melee"}`}>
                                <b>{unit.position}</b>
                                <em>{unit.name.slice(0, 2)}</em>
                              </span>
                            )
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="formation-board-direction" aria-hidden="true">
                    <i />
                    <span>Advance direction</span>
                  </div>
                </div>

                <div className="formation-roster">
                  <span className="archive-kicker">Threat roster</span>
                  <h3>{formationGroups.length} enemy types</h3>
                  <div className="formation-roster-list">
                    {formationGroups.map((unit) => (
                      <article key={unit.enemySlug}>
                        <span className="formation-roster-icon">
                          {unit.enemy && (
                            <Image src={unit.enemy.imageUrl} alt="" fill sizes="52px" />
                          )}
                        </span>
                        <div>
                          <div className="formation-roster-title">
                            {unit.enemy
                              ? <Link href={`/wiki/enemies/${unit.enemy.addressBar}/`}>{unit.name}</Link>
                              : <strong>{unit.name}</strong>}
                            <b>×{unit.count}</b>
                          </div>
                          <small>{unit.isRanged ? "Ranged pressure" : "Melee frontline"}</small>
                          <p>{unit.stats}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="formation-empty">
                <strong>No unit-level formation is attached to this record.</strong>
                <p>
                  Use the encounter target above and the matching enemy family
                  pages while this stage remains without a position snapshot.
                </p>
              </div>
            )}
          </section>

          <section className="record-section stage-context-grid" id="environment">
            <div>
              <span className="archive-kicker">Scene profile</span>
              <h2>Environment and music</h2>
              {stage.scene ? (
                <dl className="stage-context-list">
                  {Object.entries(stage.scene).map(([label, value]) => (
                    <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                  ))}
                </dl>
              ) : <p>No separate scene record is attached to this formation.</p>}
            </div>
            <div>
              <span className="archive-kicker">Reading the board</span>
              <h2>What to inspect first</h2>
              <p>
                Start with the nearest melee unit, then identify the longest
                ranged threat. A low stage-level offense value does not erase
                dangerous ability text, crowd control, Crit, or delayed damage.
              </p>
            </div>
          </section>

          <section className="record-section" id="preparation">
            <span className="archive-kicker">Formation plan</span>
            <h2>How to prepare for {title}</h2>
            <ol className="instruction-list">
              <li><strong>Mark the longest range.</strong><span>Identify which enemy contributes immediately and which ally it can reach.</span></li>
              <li><strong>Choose the first allied target.</strong><span>Place the intended anchor closer than fragile heroes whenever possible.</span></li>
              <li><strong>Choose a priority enemy.</strong><span>Open the enemy record and decide which ability or level variant breaks the plan.</span></li>
              <li><strong>Budget from the reward.</strong><span>Estimate the next shop total before spending current Shards on a marginal reroll.</span></li>
            </ol>
            <div className="manual-link-row">
              <Link href="/gameplay/#positioning">Positioning guide</Link>
              <Link href="/wiki/enemies/">Enemy database</Link>
              <Link href="/world/stages/">Back to all stages</Link>
            </div>
          </section>
        </article>
      </ReferenceLayout>
    </main>
  );
}
