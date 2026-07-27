import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DetailPageLayout from "@/src/components/DetailPageLayout";
import dataset from "@/src/data/dataset.json";
import { heroCollection } from "@/src/lib/content/heroes";
import { getStatusRelations, statusSlugForTerm } from "@/src/lib/content/relations";
import { articleSchema, breadcrumbSchema } from "@/src/seo/schema";
import "@/src/styles/systems.css";

export const dynamicParams = false;

const statIcons = {
  Magic: "●",
  "Max HP": "♥",
  Crit: "✦",
  "Mana Regen": "♦",
  Attack: "◆",
  Defense: "⬢",
  "Attack Speed": "➤",
};

function statClass(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function parseLoreEntry(paragraph) {
  if (paragraph.startsWith("Currently works at ")) {
    return {
      label: "Background",
      text: paragraph.replace(/^Currently works at\s+/, ""),
    };
  }
  if (paragraph.startsWith("Motivation ")) {
    return {
      label: "Motivation",
      text: paragraph.replace(/^Motivation\s+/, ""),
    };
  }
  return {
    label: "Guild profile",
    text: paragraph,
  };
}

export function generateStaticParams() {
  return heroCollection.staticParams();
}

export async function generateMetadata({ params }) {
  const hero = heroCollection.get((await params).addressBar);
  if (!hero) return {};
  return heroCollection.metadata(hero);
}

export default async function HeroDetailPage({ params }) {
  const { addressBar } = await params;
  const hero = heroCollection.get(addressBar);
  if (!hero) notFound();

  const statusLinks = hero.keywords
    .map((keyword) => [keyword, statusSlugForTerm(keyword)])
    .filter(([, slug]) => slug);
  const relatedPools = statusLinks.map(([, slug]) => getStatusRelations(slug));
  const relatedItems = [...new Map(relatedPools.flatMap((pool) => pool.items).map((item) => [item.id, item])).values()].slice(0, 8);
  const relatedRelics = [...new Map(relatedPools.flatMap((pool) => pool.relics).map((relic) => [relic.id, relic])).values()].slice(0, 8);
  const modifierGroups = Object.entries(
    hero.modifiers.reduce((groups, modifier) => {
      const group = modifier.classes?.join(" / ") || hero.startingClass;
      groups[group] = [...(groups[group] || []), modifier];
      return groups;
    }, {}),
  );
  const pageLinks = [
    ["Overview", "#overview"],
    ["Stats", "#stats"],
    ["Ranks C–S", "#ranks"],
    ["Specializations", "#specializations"],
    ["Modifiers", "#modifiers"],
    ["Build guide", "#strategy"],
    ...(hero.lore.length ? [["Lore", "#lore"]] : []),
  ];
  const path = heroCollection.href(hero);
  const jsonLd = [
    articleSchema({
      headline: hero.seo.h1,
      description: hero.overview,
      path,
      image: hero.splashUrl,
      dateModified: dataset.updatedDate,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Heroes", path: "/heroes/" },
      { name: hero.name, path },
    ]),
  ];

  return (
    <DetailPageLayout
      section="heroes"
      activeHref="/heroes/"
      pageLinks={pageLinks}
      breadcrumbs={[
        { label: "Heroes", href: "/heroes/" },
        { label: hero.name },
      ]}
      jsonLd={jsonLd}
    >

        <header className="record-head hero-record-head" id="overview">
          <div className="record-head__image">
            <Image
              src={hero.splashUrl || hero.imageUrl}
              alt={hero.imageAlt}
              fill
              priority
              sizes="(max-width: 768px) calc(100vw - 48px), (max-width: 1024px) 280px, 320px"
            />
            <span className="hero-record-head__plate">Hero record</span>
          </div>
          <div className="record-head__copy">
            <span className="archive-eyebrow">{hero.guild} · {hero.attackType}</span>
            <h1>{hero.seo.h1}</h1>
            <p className="hero-record-head__role">{hero.title} · {hero.role}</p>
            <div className="record-head__meta">
              <span><strong>Class</strong> {hero.startingClass}</span>
              <span><strong>Ability</strong> {hero.baseAbility.name}</span>
              <span><strong>Attack</strong> {hero.attackType}</span>
            </div>
            <dl className="hero-record-head__stats" aria-label={`${hero.name} Rank C key stats`}>
              <div><dt>Max HP</dt><dd>{hero.stats["Max HP"]}</dd></div>
              <div><dt>Damage</dt><dd>{hero.stats["Base Attack Damage"]}</dd></div>
              <div><dt>Defense</dt><dd>{hero.stats.Defense}</dd></div>
              <div><dt>Range</dt><dd>{hero.stats["Attack Range"]}</dd></div>
            </dl>
          </div>
        </header>

        <article className="record-sections">
          <section className="record-section">
            <span className="archive-kicker">Field role</span>
            <h2>How {hero.name} fits a formation</h2>
            <p>{hero.overview}</p>
            <div className="mechanic-pill-row">
              {hero.classes.map((className) => (
                <Link className="mechanic-pill is-class" href="/heroes/" key={className}>{className}</Link>
              ))}
              {statusLinks.map(([keyword, slug]) => (
                <Link className={`mechanic-pill mechanic-${slug}`} href={`/wiki/status-effects/${slug}/`} key={keyword}>
                  {keyword}
                </Link>
              ))}
              {hero.keywords.filter((keyword) => !statusSlugForTerm(keyword)).map((keyword) => (
                <span className="mechanic-pill" key={keyword}>{keyword}</span>
              ))}
            </div>
          </section>

          <section className="record-section" id="stats">
            <span className="archive-kicker">Rank C data</span>
            <h2>{hero.name} base stats</h2>
            <div className="stat-ledger">
              {Object.entries(hero.stats).map(([label, value]) => (
                <div key={label}><span>{label}</span><strong>{value}</strong></div>
              ))}
            </div>
            {Object.keys(hero.derived).length > 0 && (
              <>
                <h3>Derived comparison values</h3>
                <div className="stat-ledger">
                  {Object.entries(hero.derived).map(([label, value]) => (
                    <div key={label}><span>{label}</span><strong>{value}</strong></div>
                  ))}
                </div>
                <p>
                  EHP and EOFF are comparison composites; Sec / cast estimates a
                  passive mana-fill interval. They help compare records but are
                  not separate in-game stats.
                </p>
              </>
            )}
          </section>

          <section className="record-section hero-ranks" id="ranks">
            <span className="archive-kicker">C → B → A → S</span>
            <h2>{hero.name} ranks</h2>
            <p>
              Draft a duplicate of {hero.name} or use an eligible campfire
              event to rank up. Rank B chooses a fixed specialization; Rank A
              and S draft from the active class modifier pool.
            </p>

            <div className="rank-gain-bar" id="rank-gains">
              <strong>Stats <span>| Rank B, A, S</span></strong>
              <div className="rank-gain-pills">
                {hero.rankGains.map((gain) => (
                  <a className={`rank-gain-pill stat-${statClass(gain.name)}`} href="#stats" key={gain.name}>
                    <i aria-hidden="true">{statIcons[gain.name] || "◇"}</i>
                    <span>{gain.name}</span>
                    <b>{gain.value}</b>
                  </a>
                ))}
              </div>
            </div>

            <div className="hero-rank-chapter">
              <aside className="hero-rank-card">
                <Image src={hero.rankImages.C || hero.imageUrl} alt={`${hero.name} at Rank C`} fill sizes="160px" />
                <span>C</span>
              </aside>
              <div className="hero-rank-chapter__body">
                <header>
                  <h3>Rank <b>C</b></h3>
                  <p>The base stat line starts with the active ability equipped.</p>
                </header>
                <div className="hero-ability-panel">
                  <span><Image src={hero.baseAbility.iconUrl} alt="" fill sizes="58px" /></span>
                  <div>
                    <small>{hero.baseAbility.type}</small>
                    <h4>{hero.baseAbility.name}</h4>
                    <p>{hero.baseAbility.effect}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-rank-chapter">
              <aside className="hero-rank-card rank-b">
                <Image src={hero.rankImages.B || hero.imageUrl} alt={`${hero.name} at Rank B`} fill sizes="160px" />
                <span>B</span>
              </aside>
              <div className="hero-rank-chapter__body">
                <header>
                  <h3>Rank <b>B</b></h3>
                  <p>
                    The first rank-up also chooses one of three fixed
                    specializations. A path can add a class and change later offers.
                  </p>
                </header>
                <div className="hero-specialization-grid" id="specializations">
                  {hero.specializations.map((specialization) => (
                    <article id={specialization.addressBar} key={specialization.addressBar}>
                      <header>
                        <span><Image src={specialization.iconUrl} alt="" fill sizes="42px" /></span>
                        <div>
                          <h4>{specialization.name}</h4>
                          {specialization.addedClass && <small>{specialization.addedClass}</small>}
                        </div>
                      </header>
                      <b>{specialization.type}</b>
                      <p>{specialization.effect}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-rank-chapter">
              <aside className="hero-rank-card rank-a">
                <Image src={hero.rankImages.A || hero.imageUrl} alt={`${hero.name} at Rank A`} fill sizes="160px" />
                <span>A</span>
              </aside>
              <div className="hero-rank-chapter__body">
                <header>
                  <h3>Rank <b>A</b></h3>
                  <p>
                    Gain the stat package above, then choose from modifiers
                    generated by {hero.name}&apos;s active class set.
                  </p>
                </header>
                <a className="rank-modifier-link" href="#modifiers">
                  Inspect {hero.modifiers.length} possible class modifiers <span>↓</span>
                </a>
              </div>
            </div>

            <div className="hero-rank-chapter">
              <aside className="hero-rank-card rank-s">
                <Image src={hero.rankImages.S || hero.imageUrl} alt={`${hero.name} at Rank S`} fill sizes="160px" />
                <span>S</span>
              </aside>
              <div className="hero-rank-chapter__body">
                <header>
                  <h3>Rank <b>S</b></h3>
                  <p>
                    Gain the stat package a final time and draft the last class
                    modifier to complete the current Demo build.
                  </p>
                </header>
                <a className="rank-modifier-link" href="#strategy">
                  Continue to the finished build checklist <span>↓</span>
                </a>
              </div>
            </div>
          </section>

          <section className="record-section" id="modifiers">
            <span className="archive-kicker">Rank A / S offer pool</span>
            <h2>Possible class modifiers</h2>
            <p>
              Later ranks offer modifiers from the hero&apos;s active class
              pool. Multiclass heroes receive a split offer set, so both class
              groups should contain useful outcomes before committing.
            </p>
            {modifierGroups.length ? modifierGroups.map(([group, modifiers]) => (
              <div className="modifier-group" key={group}>
                <h3>{group} modifiers · {modifiers.length}</h3>
                <ul className="modifier-list">
                  {modifiers.map((modifier, index) => (
                    <li key={`${modifier.name}-${index}`}>
                      <strong>{modifier.name}</strong><span>{modifier.effect}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )) : <p>No class modifiers were recorded for this hero in the current snapshot.</p>}
          </section>

          <section className="record-section" id="strategy">
            <span className="archive-kicker">Editorial build guide</span>
            <h2>How to build around {hero.name}</h2>
            <ol className="instruction-list">
              <li><strong>Preserve the first job.</strong><span>Make sure {hero.name} can already perform the role described above before adding a second engine.</span></li>
              <li><strong>Choose a repeatable trigger.</strong><span>Match the specialization to an effect the current team can activate every fight.</span></li>
              <li><strong>Protect the delivery condition.</strong><span>Range, mana, survival, and target access usually matter before another damage multiplier.</span></li>
              <li><strong>Read the later pool.</strong><span>Choose an added class only when its Rank A/S modifier outcomes support the same plan.</span></li>
            </ol>
            {(relatedItems.length > 0 || relatedRelics.length > 0) && (
              <>
                <h3>Related equipment</h3>
                <div className="tag-links">
                  {relatedItems.map((item) => (
                    <Link
                      href={`/wiki/items/?search=${encodeURIComponent(item.addressBar)}`}
                      key={`item-${item.id}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {relatedRelics.map((relic) => (
                    <Link
                      href={`/wiki/relics/?search=${encodeURIComponent(relic.addressBar)}`}
                      key={`relic-${relic.id}`}
                    >
                      {relic.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
            <div className="manual-link-row">
              <Link href="/gameplay/#team-building">Team-building guide</Link>
              <Link href="/gameplay/growth-route/#rank-route">Growth Route rank guide</Link>
              <Link href="/heroes/">Back to all heroes</Link>
            </div>
          </section>

          {hero.lore.length > 0 && (
            <section className="record-section" id="lore">
              <span className="archive-kicker">Character record</span>
              <h2>{hero.name} lore</h2>
              {hero.quote && <blockquote>{hero.quote}</blockquote>}
              <div className="hero-lore-ledger">
                {hero.lore.map((paragraph, index) => {
                  const entry = parseLoreEntry(paragraph);
                  return (
                    <article key={`${entry.label}-${index}`}>
                      <h3>{entry.label}</h3>
                      <p>{entry.text}</p>
                    </article>
                  );
                })}
              </div>
            </section>
          )}
        </article>
    </DetailPageLayout>
  );
}
