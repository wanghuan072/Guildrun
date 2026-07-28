import Image from "next/image";
import Link from "next/link";
import GptAdSlot from "@/src/components/GptAdSlot";
import JsonLd from "@/src/components/JsonLd";
import "@/src/styles/home.css";
import { createGptElementId } from "@/src/config/gpt";
import { guidesData } from "@/src/lib/content/guides";
import { heroesData } from "@/src/lib/content/heroes";
import { updatesData } from "@/src/lib/content/updates";
import dataset from "@/src/data/dataset.json";
import { contentCounts } from "@/src/lib/content/detailRegistry";
import { wikiCategories } from "@/src/lib/content/wiki";
import { worldCategories } from "@/src/lib/content/world";
import { faqPageSchema } from "@/src/seo/schema";
import { pageTdk } from "@/src/seo/tdk";
import { createMetadata, siteConfig } from "@/src/seo/siteConfig";

export const metadata = createMetadata({
  ...pageTdk.home,
  path: "/",
});

const quickLinks = [
  {
    symbol: "▤",
    title: "Beginner Guide",
    text: "Run loop, role coverage, and Shard spending for the first clear.",
    href: "/guides/guildrun-beginner-guide/",
    tone: "teal",
  },
  {
    symbol: "♙",
    title: "Player Handbook",
    text: "Inspect, place, fight, diagnose, then spend for the next failure.",
    href: "/gameplay/",
    tone: "indigo",
  },
  {
    symbol: "Ⅲ",
    title: "Growth Route",
    text: "Formation size, Rank C to S, and upgrade order by symptom.",
    href: "/gameplay/growth-route/",
    tone: "violet",
  },
  {
    symbol: "♜",
    title: "Heroes Roster",
    text: "Compare classes, range, ranks, specializations, and modifiers.",
    href: "/heroes/",
    tone: "bronze",
  },
];

const gameplayLinks = [
  [
    "How a run works",
    "Choose, place, fight, diagnose, improve—one failure at a time.",
    "/gameplay/#how-it-works",
    "/images/progression/choose-hero.webp",
  ],
  [
    "Build a team",
    "Job coverage first; perfect synergy only after the board works.",
    "/gameplay/#team-building",
    "/images/gameplay/formation-battle.webp",
  ],
  [
    "Read enemies",
    "Range, abilities, and first contact decide the opening formation.",
    "/gameplay/#enemies",
    "/images/gameplay/combat-system.webp",
  ],
  [
    "Position heroes",
    "Control who takes the first hit and who gets a clean cast window.",
    "/gameplay/#positioning",
    "/images/gameplay/positioning.webp",
  ],
];

const growthStages = [
  ["01", "3", "Opening", "Mostly C · One clear job per slot."],
  ["02", "B", "First spike", "Specialize the hero that wins the next fight."],
  ["03", "4", "Expansion", "Add a new job—not a fourth copy."],
  ["04", "A", "Engine", "Draft a modifier that fires every fight."],
  ["05", "5", "Final shape", "Finish the carry; last slot for the matchup."],
];

const rankOverview = [
  ["C", "Base kit", "Confirm the hero already has a useful job."],
  ["B", "Specialization", "Pick one of three fixed paths—some add a class."],
  ["A", "First modifier", "Drawn from active classes; dual-class splits the offer."],
  ["S", "Demo max", "Second modifier plus one extra item slot."],
];

const featuredHeroNames = [
  "Pimenta",
  "Dragomir",
  "Fiona",
  "Hoyoung",
  "Skorn",
  "Grace",
];

const homeFaqs = [
  [
    "What is Guildrun?",
    "Guildrun is a single-player PvE roguelike autobattler from Leyline. You recruit heroes, choose items and relics, set formation and specializations, then let combat resolve automatically while you plan the next shop and route decision.",
  ],
  [
    "Can I save a Guildrun run and continue later?",
    "Yes. The current Demo supports mid-run saves, so you can leave an unfinished run and continue it in another session.",
  ],
  [
    "Which game version do these guides cover?",
    `Gameplay advice, databases, and featured guides on this homepage are maintained against Guildrun ${dataset.gameVersion}. Balance-sensitive numbers should be rechecked after later patches.`,
  ],
  [
    "How should a new player start?",
    "Begin with the beginner guide for the run loop and Shard spending, then read the player handbook for team building, enemies, and positioning. Use the growth route page when you need a clear order for ranks and board size.",
  ],
  [
    "Where can I find hero, item, and relic data?",
    "Open the Heroes roster for class, range, ranks, and specializations. Browse the Wiki for items, relics, enemies, status effects, and Rank B hero paths. World pages cover stages, events, crossroads, fight modes, and stat mods.",
  ],
  [
    "When is the full Guildrun release date?",
    "The free Demo is available now. Steam currently lists the full game as To be announced. See the release date page for the latest public timeline and FAQ.",
  ],
];

export default function HomePage() {
  const featuredHeroes = featuredHeroNames
    .map((name) => heroesData.find((hero) => hero.name === name))
    .filter(Boolean);
  const featuredGuides = guidesData.filter((guide) => guide.isFeatured);
  const latestUpdates = updatesData.slice(0, 3);
  const {
    heroes,
    items,
    relics,
    stages,
    enemies,
    events,
  } = contentCounts;

  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Guildrun",
    gamePlatform: ["Windows", "macOS"],
    applicationCategory: "Game",
    genre: ["Strategy", "Auto Battler", "Roguelike", "PvE"],
    author: { "@type": "Organization", name: "Leyline" },
    url: siteConfig.officialUrl,
  };

  return (
    <main id="main-content" className="home-main">
      <JsonLd data={gameJsonLd} />
      <JsonLd data={faqPageSchema(homeFaqs)} />

      <div className="home-frame">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-hero-backdrop" aria-hidden="true">
            <Image
              src="/images/home/official-rift-backdrop.webp"
              alt=""
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className="home-hero-copy">
            <span className="home-eyebrow">
              <span aria-hidden="true">✥</span>
              {dataset.gameVersion} · Guide &amp; Wiki
            </span>
            <h1 id="home-title">{pageTdk.home.h1}</h1>
            <p>
              Plan Guildrun runs with the local {dataset.gameVersion} archive:
              compare heroes, inspect item and relic effects, read stage
              formations, and turn each loss into a clearer next decision.
            </p>
            <div className="home-hero-actions">
              <Link className="home-primary-button" href="/guides/guildrun-beginner-guide/">
                Start Here <span aria-hidden="true">›</span>
              </Link>
              <Link className="home-secondary-button" href="/gameplay/">
                Open Handbook <span aria-hidden="true">♙</span>
              </Link>
            </div>
            <div className="home-hero-status" aria-label="Current local database coverage">
              <span><strong>{heroes}</strong> heroes</span>
              <span><strong>{items}</strong> items</span>
              <span><strong>{relics}</strong> relics</span>
              <span><strong>{stages}</strong> formations</span>
            </div>
          </div>
        </section>

        <section className="home-quick-grid" aria-label="Start exploring">
          {quickLinks.map((item) => (
            <Link className={`home-quick-card ${item.tone}`} href={item.href} key={item.title}>
              <span className="home-quick-icon" aria-hidden="true">{item.symbol}</span>
              <span className="home-quick-copy">
                <strong>{item.title}</strong>
                <small>{item.text}</small>
              </span>
              <span className="home-card-arrow" aria-hidden="true">›</span>
            </Link>
          ))}
        </section>

        {/* GPT: banner_1 */}
        <GptAdSlot id={createGptElementId("home", 1)} unit="banner1" />

        <section className="home-archive-panel" aria-labelledby="gameplay-heading">
          <div className="home-panel-label">
            <span aria-hidden="true">♙</span>
            <h2 id="gameplay-heading">Learn to Play</h2>
          </div>
          <div className="home-four-grid">
            {gameplayLinks.map(([title, text, href, image]) => (
              <Link className="home-media-card" href={href} key={title}>
                <span className="home-media-image">
                  <Image src={image} alt="" fill sizes="(max-width: 768px) 50vw, 25vw" />
                </span>
                <span className="home-media-copy">
                  <strong>{title}</strong>
                  <small>{text}</small>
                  <span aria-hidden="true">›</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* GPT: banner_2 */}
        <GptAdSlot id={createGptElementId("home", 2)} unit="banner2" />

        <section className="home-archive-panel" aria-labelledby="progression-heading">
          <div className="home-panel-label">
            <span aria-hidden="true">✥</span>
            <h2 id="progression-heading">Growth Route</h2>
          </div>
          <div className="progression-layout">
            <div className="progression-main">
              <h3>From opening board to final shape</h3>
              <ol className="progression-track growth-stages-track">
                {growthStages.map(([number, symbol, title, text]) => (
                  <li key={number}>
                    <div className="progression-node">
                      <span className="progression-step-number">{number}</span>
                      <span className="progression-step-symbol" aria-hidden="true">{symbol}</span>
                    </div>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </li>
                ))}
              </ol>
              <Link className="home-panel-cta" href="/gameplay/growth-route/">
                Open full growth route <span aria-hidden="true">›</span>
              </Link>
            </div>
            <aside className="progression-overview">
              <h3>Rank C → S</h3>
              <ul>
                {rankOverview.map(([symbol, title, text]) => (
                  <li key={title}>
                    <span aria-hidden="true">{symbol}</span>
                    <div>
                      <strong>{title}</strong>
                      <small>{text}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="home-archive-panel" aria-labelledby="reference-heading">
          <div className="home-panel-label home-panel-label--split">
            <div>
              <span aria-hidden="true">✥</span>
              <h2 id="reference-heading">Reference Databases</h2>
            </div>
            <p className="home-panel-meta">
              {heroes} heroes · {items} items · {relics} relics · {stages} formations
              <span> · {dataset.gameVersion}</span>
            </p>
          </div>
          <div className="home-reference-hub">
            <div className="home-reference-column">
              <div className="home-reference-column-head">
                <h3>Wiki</h3>
                <Link href="/wiki/">Browse wiki ›</Link>
              </div>
              <div className="home-reference-list">
                {wikiCategories.map((category) => (
                  <Link className="home-reference-row" href={category.href} key={category.name}>
                    <span className="home-reference-media">
                      <Image src={category.imageUrl} alt="" fill sizes="72px" />
                    </span>
                    <span className="home-reference-copy">
                      <small>{category.label}</small>
                      <strong>{category.name}</strong>
                      <span>{category.description}</span>
                    </span>
                    <span className="home-reference-count">
                      <b>{category.count}</b>
                      <small>records</small>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="home-reference-column">
              <div className="home-reference-column-head">
                <h3>World</h3>
                <Link href="/world/">Browse world ›</Link>
              </div>
              <div className="home-reference-list">
                {worldCategories.map((category) => (
                  <Link className="home-reference-row" href={category.href} key={category.name}>
                    <span className="home-reference-media">
                      <Image src={category.imageUrl} alt="" fill sizes="72px" />
                    </span>
                    <span className="home-reference-copy">
                      <small>{category.label}</small>
                      <strong>{category.name}</strong>
                      <span>{category.description}</span>
                    </span>
                    <span className="home-reference-count">
                      <b>{category.count}</b>
                      <small>records</small>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GPT: banner_3 */}
        <GptAdSlot id={createGptElementId("home", 3)} unit="banner3" />

        <section className="home-archive-panel" aria-labelledby="heroes-heading">
          <div className="home-panel-label home-panel-label--split">
            <div>
              <span aria-hidden="true">❈</span>
              <h2 id="heroes-heading">Featured Heroes</h2>
            </div>
            <Link className="home-panel-cta home-panel-cta--inline" href="/heroes/">
              View all {heroes} heroes <span aria-hidden="true">›</span>
            </Link>
          </div>
          <div className="home-hero-roster">
            {featuredHeroes.map((hero) => (
              <Link className="home-roster-card" href={`/heroes/${hero.addressBar}/`} key={hero.id}>
                <Image src={hero.imageUrl} alt={hero.imageAlt} fill sizes="(max-width: 768px) 50vw, 16vw" />
                <span aria-hidden="true" />
                <strong>{hero.name}</strong>
                <small>
                  {hero.startingClass} · {hero.attackType}
                </small>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-archive-panel" aria-labelledby="guides-heading">
          <div className="home-panel-label">
            <span aria-hidden="true">✥</span>
            <h2 id="guides-heading">Core Guides</h2>
          </div>
          <div className="home-guide-grid">
            {featuredGuides.map((guide) => (
              <article className="home-guide-card" key={guide.id}>
                <Link href={`/guides/${guide.addressBar}/`}>
                  <span className="home-guide-image">
                    <Image src={guide.imageUrl} alt={guide.imageAlt} fill sizes="(max-width: 768px) 50vw, 20vw" />
                  </span>
                  <span className="home-guide-copy">
                    <small className="home-guide-meta">
                      {guide.category} · {guide.gameVersion}
                    </small>
                    <h3>{guide.shortTitle}</h3>
                    <p>{guide.excerpt}</p>
                    <span aria-hidden="true">›</span>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* GPT: banner_1 · placed below the recommended guide section */}
        <GptAdSlot id={createGptElementId("home", 4)} unit="banner1" />

        <section className="home-archive-panel" aria-labelledby="updates-heading">
          <div className="home-panel-label">
            <span aria-hidden="true">♘</span>
            <h2 id="updates-heading">Latest Updates</h2>
          </div>
          <div className="home-update-grid">
            {latestUpdates.map((update) => (
              <article className="home-update-card" key={update.id}>
                <Link href={`/updates/${update.addressBar}/`}>
                  <span className="home-update-image">
                    <Image src={update.imageUrl} alt={update.imageAlt} fill sizes="(max-width: 768px) 100vw, 15vw" />
                  </span>
                  <span className="home-update-copy">
                    <small>
                      <time dateTime={update.publishDate}>{update.publishDate}</time>
                      <b>{update.updateType}</b>
                    </small>
                    <h3>{update.title}</h3>
                    <p>{update.excerpt}</p>
                    <span>Read More ›</span>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* GPT: banner_2 */}
        <GptAdSlot id={createGptElementId("home", 5)} unit="banner2" />

        <section className="home-archive-panel home-prose-panel" aria-labelledby="about-heading" id="about">
          <div className="home-panel-label">
            <span aria-hidden="true">✥</span>
            <h2 id="about-heading">About This Guildrun Guide</h2>
          </div>
          <div className="home-about">
            <div className="home-about-copy">
              <p>
                This Guildrun guide and wiki covers the Demo{" "}
                <strong>0.5.1</strong> dataset. It helps players move from the opening
                draft to a stable formation by combining practical handbooks with
                searchable records for heroes, items, relics, enemies, stages, and
                events.
              </p>
              <p>
                Strategy pages emphasize decision frameworks—role coverage, targeting,
                economy, and rank order—rather than fixed tier lists. Database pages
                keep exact values, effects, and route connections so you can compare a
                shop offer or failed fight with the current Demo record.
              </p>
              <p>
                Start with the{" "}
                <Link href="/guides/guildrun-beginner-guide/">beginner guide</Link>, then
                the{" "}
                <Link href="/guides/guildrun-strategy-guide/">strategy guide</Link>, or
                open the <Link href="/gameplay/">player handbook</Link>. Compare the{" "}
                <Link href="/heroes/">full hero roster</Link>, then use the{" "}
                <Link href="/wiki/">Wiki</Link> and <Link href="/world/">World</Link>{" "}
                directories when you need a specific record. Use{" "}
                <Link href="/search/">site search</Link> to jump straight to a name,
                or visit the <Link href="/release-date/">release status page</Link>{" "}
                for current availability and development plans.
              </p>
            </div>
            <aside className="home-about-aside" aria-label="Guide coverage">
              <h3>Current coverage</h3>
              <ul>
                <li>
                  <strong>{heroes}</strong>
                  <span>heroes with ranks and paths</span>
                </li>
                <li>
                  <strong>{items + relics}</strong>
                  <span>items and relics</span>
                </li>
                <li>
                  <strong>{enemies}</strong>
                  <span>enemy families</span>
                </li>
                <li>
                  <strong>{stages}</strong>
                  <span>stage formations</span>
                </li>
                <li>
                  <strong>{events}</strong>
                  <span>world events</span>
                </li>
                <li>
                  <strong>{guidesData.length}</strong>
                  <span>core guide pillars</span>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="home-archive-panel home-prose-panel" aria-labelledby="faq-heading" id="faq">
          <div className="home-panel-label">
            <span aria-hidden="true">?</span>
            <h2 id="faq-heading">Frequently Asked Questions</h2>
          </div>
          <div className="home-faq">
            {homeFaqs.map(([question, answer]) => (
              <article className="home-faq-item" key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            ))}
            <p className="home-faq-more">
              More release timing detail lives on the{" "}
              <Link href="/release-date/">Guildrun release date</Link> page. Patch notes
              and editorial impact notes are under{" "}
              <Link href="/updates/">Updates</Link>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
