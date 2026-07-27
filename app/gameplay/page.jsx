import Image from "next/image";
import Link from "next/link";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import dataset from "@/src/data/dataset.json";
import referenceData from "@/src/data/gameplay/reference.json";
import {
  auctionHouseRules,
  combatRules,
  priceReference,
  recoveryRules,
  regularShopRules,
  runStructure,
  targetingExceptions,
  targetingRules,
} from "@/app/gameplay/content";
import { heroesData } from "@/src/lib/content/heroes";
import { enemiesData } from "@/src/lib/content/wiki";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";
import "@/src/styles/systems.css";

export const metadata = createMetadata({
  ...pageTdk.gameplay,
  path: "/gameplay/",
});

const pageLinks = [
  ["How a run works", "#how-it-works"],
  ["Build a team", "#team-building"],
  ["Read enemies", "#enemies"],
  ["Position heroes", "#positioning"],
  ["Choose heroes", "#heroes"],
  ["Shop and recovery", "#economy"],
];

const featuredEnemySlugs = [
  "turtle",
  "mushroom-archer",
  "mushroom-fire-mage",
  "forest-golem",
  "hydra",
  "demon",
];

const featuredHeroNames = ["Pimenta", "Dragomir", "Fiona", "Hoyoung", "Skorn", "Grace"];

export default function GameplayPage() {
  const featuredEnemies = featuredEnemySlugs
    .map((slug) => enemiesData.find((enemy) => enemy.addressBar === slug))
    .filter(Boolean);
  const featuredHeroes = featuredHeroNames
    .map((name) => heroesData.find((hero) => hero.name === name))
    .filter(Boolean);

  return (
    <main className="archive-main">
      <ReferenceLayout
        section="gameplay"
        activeHref="/gameplay/"
        pageLinks={pageLinks}
      >
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">
              Player handbook · {dataset.gameVersion}
            </span>
            <h1>{pageTdk.gameplay.h1}</h1>
            <p>
              A practical route from the opening draft to a stable five-hero
              formation. Read it in order once, then return to the section that
              matches the problem in your current run.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>6</strong>
            <span>connected decisions</span>
          </div>
        </header>

        <article>
          <section className="manual-intro">
            <p>
              Guildrun is a single-player PvE roguelike autobattler. You choose
              heroes, items, relics, specializations, and board positions; combat
              then resolves automatically. The important skill is not fast
              clicking. It is reading what happened and spending the next reward
              on a specific weakness.
            </p>
          </section>

          <section className="manual-section" id="how-it-works">
            <span className="archive-kicker">01 · The complete run loop</span>
            <h2>Choose, place, fight, diagnose, improve</h2>
            <p>
              A run begins with one of three hero-and-relic bundles and 15
              spendable Shards. Your opening only needs to survive the first
              fights; it does not have to lock the final build. After combat,
              rewards and shops let you recruit, buy equipment, rank heroes, and
              refine the formation before the next node.
            </p>
            <ol className="instruction-list">
              <li>
                <strong>Inspect the encounter.</strong>
                <span>Check enemy range, abilities, formation, and any fight modifier before moving a hero.</span>
              </li>
              <li>
                <strong>Choose the active board.</strong>
                <span>Field three heroes at first, then expand toward five; reserve heroes can still matter through Backup effects.</span>
              </li>
              <li>
                <strong>Predict first contact.</strong>
                <span>Name the hero who should take the first attacks and the enemy your main damage dealer should reach.</span>
              </li>
              <li>
                <strong>Watch the first failure.</strong>
                <span>Record the first important death, interrupted cast, wasted walk, or target that survived too long.</span>
              </li>
              <li>
                <strong>Spend for that failure.</strong>
                <span>Buy durability, damage, mana, range, a duplicate, or a new role only when it changes the next fight.</span>
              </li>
            </ol>
            <div className="table-scroll">
              <table className="reference-table">
                <thead>
                  <tr><th>Run phase</th><th>Your decision</th><th>Player check</th></tr>
                </thead>
                <tbody>
                  {runStructure.map((row) => (
                    <tr key={row.phase}>
                      <td><strong>{row.phase}</strong></td>
                      <td>{row.decision}</td>
                      <td>{row.playerCheck}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="manual-callout">
              <strong>Beginner checkpoint</strong>
              <p>
                Before leaving a shop, you should be able to explain what the
                purchase fixes. “More power” is not enough; “Fiona now casts
                before Pimenta drops below half health” is a useful answer.
              </p>
            </div>
          </section>

          <section className="manual-section" id="team-building">
            <span className="archive-kicker">02 · Team building</span>
            <h2>Build a functioning team before a perfect synergy</h2>
            <p>
              Start with three jobs: an anchor that accepts opening pressure, a
              reliable damage dealer, and a support or control piece that buys
              time. These are jobs, not mandatory class labels. A shielded
              Warrior can anchor, while Frost or Stun can provide survival
              without a traditional healer.
            </p>
            <div className="table-scroll">
              <table className="reference-table">
                <thead>
                  <tr><th>Job</th><th>Question it answers</th><th>Good early evidence</th><th>Examples</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Anchor</td>
                    <td>Who receives the first attacks?</td>
                    <td>Survives until the first allied ability resolves.</td>
                    <td><Link href="/heroes/pimenta/">Pimenta</Link>, <Link href="/heroes/skorn/">Skorn</Link></td>
                  </tr>
                  <tr>
                    <td>Primary damage</td>
                    <td>How does the formation finish priority targets?</td>
                    <td>Reaches a useful target and keeps attacking or casting.</td>
                    <td><Link href="/heroes/dragomir/">Dragomir</Link>, <Link href="/heroes/hoyoung/">Hoyoung</Link></td>
                  </tr>
                  <tr>
                    <td>Support / control</td>
                    <td>What gives the team enough time to work?</td>
                    <td>Shields, healing, Frost, or mana arrives before collapse.</td>
                    <td><Link href="/heroes/fiona/">Fiona</Link>, <Link href="/heroes/grace/">Grace</Link></td>
                  </tr>
                  <tr>
                    <td>Secondary plan</td>
                    <td>What happens if the carry is blocked?</td>
                    <td>A second hero still damages the right lane or scales late.</td>
                    <td>Area damage, status damage, or a different target rule</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3>When to add another hero</h3>
            <p>
              Add a recruit when it fills a missing job, protects a proven carry,
              reaches a problem enemy, or provides a useful Backup effect. Delay
              expansion when the current core still needs a duplicate, rank, or
              key item. Five underdeveloped heroes can be weaker than three
              pieces with clear jobs.
            </p>
            <div className="manual-link-row">
              <Link href="/gameplay/growth-route/">Follow the full growth route</Link>
              <Link href="/heroes/">Compare every hero</Link>
              <Link href="/wiki/items/">Browse items by effect</Link>
            </div>
          </section>

          <section className="manual-section" id="enemies">
            <span className="archive-kicker">03 · Enemy reading</span>
            <h2>Read the threat before changing the build</h2>
            <p>
              Enemy families change by tier, encounter, and Endless scaling.
              Start with three facts: attack range, special ability, and which
              allied hero is closest. Then check the exact variant stats. A
              Mushroom Archer pressures differently from a Turtle even when both
              appear on the same floor.
            </p>
            <div className="entity-strip">
              {featuredEnemies.slice(0, 3).map((enemy) => (
                <Link href={`/wiki/enemies/${enemy.addressBar}/`} key={enemy.id}>
                  <span className="entity-strip__image">
                    <Image src={enemy.imageUrl} alt={enemy.imageAlt} fill sizes="72px" />
                  </span>
                  <span>
                    <small>{enemy.attackType} · {enemy.variantCount} variants</small>
                    <h3>{enemy.name}</h3>
                    <p>{enemy.appearsIn}</p>
                  </span>
                </Link>
              ))}
            </div>
            <div className="entity-strip">
              {featuredEnemies.slice(3).map((enemy) => (
                <Link href={`/wiki/enemies/${enemy.addressBar}/`} key={enemy.id}>
                  <span className="entity-strip__image">
                    <Image src={enemy.imageUrl} alt={enemy.imageAlt} fill sizes="72px" />
                  </span>
                  <span>
                    <small>{enemy.attackType} · {enemy.variantCount} variants</small>
                    <h3>{enemy.name}</h3>
                    <p>{enemy.appearsIn}</p>
                  </span>
                </Link>
              ))}
            </div>
            <h3>A reliable pre-fight scan</h3>
            <ol className="instruction-list">
              <li><strong>Find the longest range.</strong><span>It often decides which enemy deals uninterrupted damage first.</span></li>
              <li><strong>Find the disruptive ability.</strong><span>Stun, status application, summons, and area damage may matter more than base Attack.</span></li>
              <li><strong>Open the exact variant.</strong><span>Tier and event versions can have different health, offense, and special rules.</span></li>
              <li><strong>Choose one priority.</strong><span>Move or target around the enemy that breaks your current formation, not simply the highest-health body.</span></li>
            </ol>
            <div className="manual-link-row">
              <Link href="/wiki/enemies/">Open the complete enemy database</Link>
              <Link href="/world/stages/">Check stage formations</Link>
            </div>
          </section>

          <section className="manual-section" id="positioning">
            <span className="archive-kicker">04 · Positioning and targeting</span>
            <h2>Distance decides most opening targets</h2>
            <p>
              Most units choose the closest valid target. If two targets are the
              same distance away, the game uses class priority, then targeting
              health, then an internal tie-break. Put the intended anchor
              strictly closer whenever possible; do not rely on a class name to
              pull attacks through bad geometry.
            </p>
            <div className="table-scroll">
              <table className="reference-table">
                <thead><tr><th>Order</th><th>Targeting check</th><th>What to do with it</th></tr></thead>
                <tbody>
                  {targetingRules.map(([order, check, use]) => (
                    <tr key={order}>
                      <td>{order}</td>
                      <td>{check === "Targeting health" ? <>Lower <code>log2(current HP) + Defense / 100</code></> : check}</td>
                      <td>{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3>Place in this order</h3>
            <ol className="instruction-list">
              <li><strong>Anchor first.</strong><span>Choose the hex that collects the intended opening attacks.</span></li>
              <li><strong>Carry second.</strong><span>Confirm range and walking path to the priority target.</span></li>
              <li><strong>Support third.</strong><span>Keep the support close enough to affect allies without becoming the next target.</span></li>
              <li><strong>Predict the handoff.</strong><span>Know who becomes closest if the anchor dies, moves, Taunts, or gains Stealth.</span></li>
            </ol>
            <div className="manual-callout">
              <strong>Watch one full opening</strong>
              <p>
                If the intended carry spends several seconds walking, the
                problem is often access, not damage. A one-hex adjustment can
                outperform an expensive offensive purchase.
              </p>
            </div>
            <h3>What can change the expected target</h3>
            <ul className="reading-list">
              {targetingExceptions.map((rule) => <li key={rule}>{rule}</li>)}
            </ul>
            <h3>Read combat results in the right order</h3>
            <div className="table-scroll">
              <table className="reference-table">
                <thead><tr><th>Rule</th><th>Current behavior</th><th>How to use it</th></tr></thead>
                <tbody>
                  {combatRules.map((entry) => (
                    <tr key={entry.name}>
                      <td><strong>{entry.name}</strong></td>
                      <td>{entry.rule}</td>
                      <td>{entry.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="manual-section" id="heroes">
            <span className="archive-kicker">05 · Choosing heroes</span>
            <h2>Recruit for a job, then grow into a build</h2>
            <p>
              Each hero has 15 base statistics, a Rank C ability, rank gains,
              and three specialization routes. Read the starting ability first,
              then ask whether the hero&apos;s range and targeting can deliver it.
              Specializations should deepen a working plan or repair a known
              weakness rather than force a theme too early.
            </p>
            <div className="entity-strip">
              {featuredHeroes.slice(0, 3).map((hero) => (
                <Link href={`/heroes/${hero.addressBar}/`} key={hero.id}>
                  <span className="entity-strip__image">
                    <Image src={hero.imageUrl} alt={hero.imageAlt} fill sizes="72px" />
                  </span>
                  <span>
                    <small>{hero.startingClass} · {hero.attackType}</small>
                    <h3>{hero.name}</h3>
                    <p>{hero.role}</p>
                  </span>
                </Link>
              ))}
            </div>
            <div className="entity-strip">
              {featuredHeroes.slice(3).map((hero) => (
                <Link href={`/heroes/${hero.addressBar}/`} key={hero.id}>
                  <span className="entity-strip__image">
                    <Image src={hero.imageUrl} alt={hero.imageAlt} fill sizes="72px" />
                  </span>
                  <span>
                    <small>{hero.startingClass} · {hero.attackType}</small>
                    <h3>{hero.name}</h3>
                    <p>{hero.role}</p>
                  </span>
                </Link>
              ))}
            </div>
            <h3>Use the detail pages while a shop is open</h3>
            <p>
              Compare the exact base stats, rank growth, ability text, and all
              three specializations before buying. The next guide explains how
              team size, items, relics, ranks, difficulty, and route rewards fit
              into a complete progression plan.
            </p>
            <div className="manual-link-row">
              <Link href="/heroes/">Browse and filter the full hero roster</Link>
              <Link href="/heroes/classes/">Compare the seven classes</Link>
              <Link href="/heroes/guilds/">Meet the six guilds</Link>
              <Link href="/gameplay/growth-route/">Continue to the Guildrun Growth Route</Link>
            </div>
          </section>

          <section className="manual-section" id="economy">
            <span className="archive-kicker">06 · Shop, economy and recovery</span>
            <h2>Spend Shards only after naming the result you need</h2>
            <p>
              A regular shop is a short decision window, not an invitation to
              empty the wallet. Read all six offers, decide whether the board
              needs a recruit, rank, item, or relic, then set a stop condition
              before the first reroll. The Auction House is a separate premium
              breakpoint after a boss, so Shards saved for it must still survive
              the fights required to reach it.
            </p>
            <div className="table-scroll">
              <table className="reference-table">
                <thead><tr><th>Regular shop rule</th><th>Value</th><th>Player decision</th></tr></thead>
                <tbody>
                  {regularShopRules.map(([label, value, use]) => (
                    <tr key={label}><td><strong>{label}</strong></td><td>{value}</td><td>{use}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3>Auction House checkpoint</h3>
            <div className="table-scroll">
              <table className="reference-table">
                <thead><tr><th>Rule</th><th>Current value</th></tr></thead>
                <tbody>
                  {auctionHouseRules.map(([label, value]) => (
                    <tr key={label}><td><strong>{label}</strong></td><td>{value}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3>Shop interface systems</h3>
            <div className="shop-systems-strip">
              {referenceData.shopSystems.map((system, index) => (
                <article key={system.name}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h4>{system.name}</h4>
                  <p>{system.description}</p>
                </article>
              ))}
            </div>
            <h3>Price reference</h3>
            <div className="table-scroll">
              <table className="reference-table">
                <thead><tr><th>Offer type</th><th>Shard cost</th></tr></thead>
                <tbody>
                  {priceReference.map(([type, price]) => (
                    <tr key={type}><td>{type}</td><td>{price}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3>Recover from a loss without repeating it</h3>
            <ol className="instruction-list">
              {recoveryRules.map((entry) => (
                <li key={entry.name}>
                  <strong>{entry.name}</strong>
                  <span>{entry.rule} {entry.playerUse}</span>
                </li>
              ))}
            </ol>
            <div className="manual-link-row">
              <Link href="/guides/guildrun-beginner-guide/">Open the beginner shop and positioning guide</Link>
              <Link href="/guides/guildrun-strategy-guide/">Continue with the strategy guide</Link>
              <Link href="/gameplay/growth-route/">Plan the next roster and rank breakpoint</Link>
              <Link href="/gameplay/mastery-unlocks/">Review Mastery and Boss Tokens</Link>
            </div>
          </section>
        </article>
      </ReferenceLayout>
    </main>
  );
}
