import Link from "next/link";
import GptAdSlot from "@/src/components/GptAdSlot";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import { createGptElementId } from "@/src/config/gpt";
import "@/src/styles/growth-route.css";
import { growthFacts, priceReference } from "@/app/gameplay/content";
import dataset from "@/src/data/dataset.json";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.growthRoute,
  path: "/gameplay/growth-route/",
});

const pageLinks = [
  ["Route overview", "#route-overview"],
  ["3-hero layout", "#three-hero-layout"],
  ["Grow to 4 and 5", "#team-growth"],
  ["Rank C to S", "#rank-route"],
  ["Upgrade order", "#upgrade-order"],
  ["Example route", "#example-route"],
];

const growthStages = [
  {
    stage: "Opening",
    board: "3 active",
    rank: "Mostly C",
    goal: "Give every slot one job: absorb pressure, deal damage, or enable the plan.",
  },
  {
    stage: "First spike",
    board: "3 active",
    rank: "First B",
    goal: "Rank the hero whose specialization immediately changes the next fight.",
  },
  {
    stage: "Expansion",
    board: "4 active",
    rank: "B core",
    goal: "Add a second lane, control, or sustain—not a fourth copy of an existing job.",
  },
  {
    stage: "Engine",
    board: "4–5 active",
    rank: "First A",
    goal: "Choose a class modifier that strengthens the formation’s repeatable trigger.",
  },
  {
    stage: "Final shape",
    board: "5 active",
    rank: "A core / first S",
    goal: "Finish the carry or anchor, then use the last slot for the matchup.",
  },
];

const rankSteps = [
  {
    rank: "C",
    label: "Place the base hero",
    decision:
      "Read attack range, starting ability, class, and field role. A Rank C hero must already have a useful job before receiving upgrades.",
    test: "Can this hero perform its job with the current formation?",
  },
  {
    rank: "B",
    label: "Choose a specialization",
    decision:
      "Acquire a duplicate or use an eligible rank-up event. Pick one of the hero’s three fixed specializations; some paths add a second class.",
    test: "Does the specialization solve today’s fight or unlock a team interaction you already own?",
  },
  {
    rank: "A",
    label: "Choose the first rank modifier",
    decision:
      "The offer is rolled from the hero’s active class set. A dual-class hero receives a split offer across both classes.",
    test: "Will this modifier trigger often enough in the current layout to matter?",
  },
  {
    rank: "S",
    label: "Complete the build",
    decision:
      "Choose another modifier from the same class draw set. Reaching the Demo maximum also grants one additional item slot.",
    test: "Is finishing this hero stronger than taking the next board-size or support breakpoint?",
  },
];

const priorityRows = [
  {
    symptom: "Carry dies before its first important cast",
    firstMove: "Move the anchor one hex closer to the threat",
    nextUpgrade: "Frontline durability or protection",
  },
  {
    symptom: "Frontline survives but enemies do not fall",
    firstMove: "Open a clean target lane for the carry",
    nextUpgrade: "Carry duplicate, damage scaling, or range",
  },
  {
    symptom: "Abilities arrive too late",
    firstMove: "Protect the caster and reduce wasted movement",
    nextUpgrade: "Starting Mana, Mana Regen, or Attack Speed",
  },
  {
    symptom: "Fourth hero adds no visible value",
    firstMove: "Return the specialist to reserve",
    nextUpgrade: "Rank the three-hero core instead",
  },
  {
    symptom: "One enemy formation keeps breaking the board",
    firstMove: "Change the exposed lane or adjacency pattern",
    nextUpgrade: "Counter hero, control, or a matchup item",
  },
];

function BoardCell({ children, tone = "empty" }) {
  return <div className={`growth-board__cell is-${tone}`}>{children}</div>;
}

export default function GrowthRoutePage() {
  return (
    <main className="archive-main">
      <ReferenceLayout
        section="gameplay"
        activeHref="/gameplay/growth-route/"
        pageLinks={pageLinks}
      >
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">
              Formation layout · rank-up decisions · {dataset.gameVersion}
            </span>
            <h1>{pageTdk.growthRoute.h1}</h1>
            <p>
              Build the board in the right order: stabilize a three-hero
              formation, promote the hero that creates the next power spike,
              then expand toward five without weakening the active core.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>3→5</strong>
            <span>active board growth</span>
          </div>
        </header>

        <article className="growth-route-manual">
          <section className="growth-route-lede" id="route-overview">
            <div>
              <span className="archive-kicker">The rule for every upgrade</span>
              <h2>Position first. Upgrade the bottleneck second.</h2>
            </div>
            <p>
              Growth is not “buy every strong offer.” Before spending Shards,
              replay the last fight in your head: who received the opening
              attacks, who failed to reach a target, and which ability arrived
              too late? Repositioning is free. Spend only after the board shows
              what it still lacks.
            </p>
          </section>

          <section className="manual-section">
            <span className="archive-kicker">The complete route</span>
            <h2>Five formation breakpoints</h2>
            <p>
              These are decision stages, not fixed floor numbers. Random shops,
              events, and Team Size relics change the timing, but the jobs on
              the board should develop in this order.
            </p>
            <ol className="growth-route-track">
              {growthStages.map((item, index) => (
                <li key={item.stage}>
                  <span className="growth-route-track__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="growth-route-track__meta">
                    <b>{item.board}</b>
                    <small>{item.rank}</small>
                  </div>
                  <div>
                    <h3>{item.stage}</h3>
                    <p>{item.goal}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="manual-section" id="three-hero-layout">
            <span className="archive-kicker">01 · Three-hero opening</span>
            <h2>Start with an anchor, a carry, and an enabler</h2>
            <p>
              Guildrun starts with three active heroes. The safest learning
              layout gives each one a distinct responsibility. The anchor takes
              first contact, the carry receives time and a clear target lane,
              and the enabler supplies shielding, healing, control, mana, or a
              status the other two can exploit.
            </p>

            <div className="growth-formation">
              <div className="growth-board-wrap">
                <div className="growth-board-label">
                  <span>Your side</span>
                  <b>Example three-hero shell</b>
                  <span>Enemy side ↑</span>
                </div>
                <div
                  className="growth-board"
                  aria-label="Example Guildrun formation with an anchor in front and carry and support behind"
                >
                  <div className="growth-board__row">
                    <BoardCell />
                    <BoardCell tone="anchor">
                      <span>01</span>
                      <b>Anchor</b>
                      <small>takes first contact</small>
                    </BoardCell>
                    <BoardCell />
                    <BoardCell />
                  </div>
                  <div className="growth-board__row">
                    <BoardCell />
                    <BoardCell />
                    <BoardCell tone="support">
                      <span>03</span>
                      <b>Enabler</b>
                      <small>offset, not exposed</small>
                    </BoardCell>
                    <BoardCell />
                  </div>
                  <div className="growth-board__row">
                    <BoardCell tone="carry">
                      <span>02</span>
                      <b>Carry</b>
                      <small>protected target lane</small>
                    </BoardCell>
                    <BoardCell />
                    <BoardCell />
                    <BoardCell />
                  </div>
                  <div className="growth-board__row">
                    <BoardCell />
                    <BoardCell />
                    <BoardCell />
                    <BoardCell />
                  </div>
                </div>
              </div>

              <div className="growth-role-notes">
                <article>
                  <span>01 · Front contact</span>
                  <h3>Anchor</h3>
                  <p>
                    Put the intended durable hero closer to the enemies than
                    fragile allies. One hex can decide who receives the opening
                    attacks.
                  </p>
                  <Link href="/heroes/pimenta/">Example: Pimenta</Link>
                </article>
                <article>
                  <span>02 · Win condition</span>
                  <h3>Carry</h3>
                  <p>
                    Keep the damage or scaling hero away from immediate
                    pressure, but still inside useful attack or ability range.
                  </p>
                  <Link href="/heroes/aria/">Example: Aria</Link>
                </article>
                <article>
                  <span>03 · Timing support</span>
                  <h3>Enabler</h3>
                  <p>
                    Place support where it survives long enough to cast and can
                    reach the allies or enemies its ability needs.
                  </p>
                  <Link href="/heroes/grace/">Example: Grace</Link>
                </article>
              </div>
            </div>

            <div className="manual-callout growth-rule-callout">
              <strong>Do not copy the diagram hex for hex.</strong>
              <p>
                It shows role spacing, not a universal winning formation.
                Inspect enemy range, targeting, area effects, front/back-row
                rules, and adjacency effects before every battle.
              </p>
            </div>
            <div className="manual-link-row">
              <Link href="/gameplay/#positioning">
                Read the complete positioning rules
              </Link>
              <Link href="/wiki/enemies/">
                Check enemy abilities before placing
              </Link>
            </div>
          </section>

          {/* GPT: banner_2 · after the opening formation chapter */}
          <GptAdSlot
            id={createGptElementId("growth-route", "opening-formation")}
            unit="banner2"
          />

          <section className="manual-section" id="team-growth">
            <span className="archive-kicker">02 · Four- and five-hero boards</span>
            <h2>Add coverage before adding more damage</h2>
            <div className="growth-board-stages">
              <article>
                <strong>3</strong>
                <div>
                  <span>Foundation</span>
                  <h3>One complete combat plan</h3>
                  <p>
                    Anchor + carry + enabler. Rank this core if the next recruit
                    only repeats a job already covered.
                  </p>
                </div>
              </article>
              <article>
                <strong>4</strong>
                <div>
                  <span>Coverage</span>
                  <h3>Repair the weak lane</h3>
                  <p>
                    Add a second frontline, control hero, finisher, or
                    specialist that changes a known matchup.
                  </p>
                </div>
              </article>
              <article>
                <strong>5</strong>
                <div>
                  <span>Final shape</span>
                  <h3>Complete the interaction</h3>
                  <p>
                    Use the last active slot for a team-wide trigger, counter,
                    or second threat—not simply the next highest stat line.
                  </p>
                </div>
              </article>
              <article className="is-reserve">
                <strong>R</strong>
                <div>
                  <span>Reserve</span>
                  <h3>The sixth hero still has a job</h3>
                  <p>
                    Keep a matchup swap or a hero with a Backup effect. The
                    roster holds six while the active board stops at five.
                  </p>
                </div>
              </article>
            </div>
            <p>
              Board expansion comes from Team Size effects.{" "}
              <Link href="/wiki/relics/?search=harmony-crystal">
                Harmony Crystal
              </Link>{" "}
              increases team size directly, while Mandate quest relics award
              the same increase after their condition is completed. Compare
              the quest with what the current build already does; a Team Size
              relic is slow if its requirement pulls the formation away from
              its real plan.
            </p>
            <div className="manual-link-row">
              <Link href="/wiki/relics/?search=Mandate">
                Compare Team Size quests
              </Link>
              <Link href="/wiki/status-effects/backup/">
                How Backup works from reserve
              </Link>
            </div>
          </section>

          <section className="manual-section" id="rank-route">
            <div id="ranks" className="scroll-anchor" tabIndex={-1} />
            <span className="archive-kicker">03 · Hero upgrade route</span>
            <h2>Rank C → B → A → S</h2>
            <p>
              Drafting a duplicate auto-merges the hero into the next rank.
              Eligible Campfire choices can also rank up a hero. Every rank
              recalculates the stat line; the important part is that B, A, and
              S also introduce different build decisions.
            </p>
            <div className="table-scroll">
              <table className="reference-table">
                <thead><tr><th>Growth layer</th><th>Current limit or rule</th></tr></thead>
                <tbody>
                  {growthFacts.map(([layer, rule]) => (
                    <tr key={layer}><td><strong>{layer}</strong></td><td>{rule}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ol className="growth-rank-route">
              {rankSteps.map((item, index) => (
                <li key={item.rank}>
                  <div
                    className={
                      item.rank === "C"
                        ? "growth-rank-badge"
                        : `growth-rank-badge rank-${item.rank.toLowerCase()}`
                    }
                  >
                    <small>Rank</small>
                    <b>{item.rank}</b>
                  </div>
                  <div className="growth-rank-copy">
                    <span>Step {index + 1}</span>
                    <h3>{item.label}</h3>
                    <p>{item.decision}</p>
                    <div>
                      <strong>Pick test</strong>
                      <span>{item.test}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="manual-callout">
              <strong>Do not spread ranks evenly by default.</strong>
              <p>
                A first Rank B specialization on the main carry or anchor often
                changes more than giving a weak fourth hero a small stat bump.
                Concentrate upgrades until another unit can name the exact job
                its next rank unlocks.
              </p>
            </div>
            <div className="manual-link-row">
              <Link href="/heroes/">
                Compare every hero’s C–S rank dossier
              </Link>
              <Link href="/world/events/601/">
                See the Campfire rank-up choice
              </Link>
            </div>
          </section>

          {/* GPT: banner_3 · after the rank route chapter */}
          <GptAdSlot
            id={createGptElementId("growth-route", "rank-route")}
            unit="banner3"
          />

          <section className="manual-section" id="upgrade-order">
            <div id="economy" className="scroll-anchor" tabIndex={-1} />
            <div id="build-layers" className="scroll-anchor" tabIndex={-1} />
            <span className="archive-kicker">04 · What to upgrade next</span>
            <h2>Use the last fight as the purchase screen</h2>
            <div className="table-scroll">
              <table className="reference-table growth-priority-table">
                <thead>
                  <tr>
                    <th>What you observed</th>
                    <th>Free correction first</th>
                    <th>Then spend on</th>
                  </tr>
                </thead>
                <tbody>
                  {priorityRows.map((row) => (
                    <tr key={row.symptom}>
                      <td>{row.symptom}</td>
                      <td>{row.firstMove}</td>
                      <td>{row.nextUpgrade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ol className="growth-purchase-order">
              <li>
                <span>Free</span>
                <div>
                  <strong>Reposition the formation</strong>
                  <p>
                    Change first contact, target access, adjacency, or ability
                    coverage before deciding that the stats are insufficient.
                  </p>
                </div>
              </li>
              <li>
                <span>1st</span>
                <div>
                  <strong>Take a guaranteed power spike</strong>
                  <p>
                    A duplicate for the active core or a known defensive/offensive
                    breakpoint is more reliable than speculative synergy.
                  </p>
                </div>
              </li>
              <li>
                <span>2nd</span>
                <div>
                  <strong>Complete the next board job</strong>
                  <p>
                    Buy Team Size or a new hero only when the new active slot
                    already has a role and usable placement.
                  </p>
                </div>
              </li>
              <li>
                <span>Last</span>
                <div>
                  <strong>Reroll with at least two acceptable outcomes</strong>
                  <p>
                    If only one exact hero, item, or relic saves the plan, the
                    route is already too narrow.
                  </p>
                </div>
              </li>
            </ol>
            <h3>Compare the real Shard breakpoints</h3>
            <p>
              A rank is not free just because the matching hero appears. Compare
              its price with the item, relic, or Team Size purchase that could
              solve the same fight. Regular-shop rerolls also become more
              expensive during the visit, so stop once the expected result no
              longer justifies losing the next guaranteed breakpoint.
            </p>
            <div className="table-scroll">
              <table className="reference-table">
                <thead><tr><th>Purchase</th><th>Shard cost</th><th>Growth question</th></tr></thead>
                <tbody>
                  {priceReference.map(([type, price]) => (
                    <tr key={type}>
                      <td><strong>{type}</strong></td>
                      <td>{price}</td>
                      <td>
                        {type === "Team Size"
                          ? "Is the next active slot already filled by a hero with a distinct job?"
                          : `Does this ${type.toLowerCase()} create a visible breakpoint before the next boss?`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="manual-callout">
              <strong>Respec only when the replacement route is already better.</strong>
              <p>
                A respec can repair a specialization that no longer fits the
                shop, relics, or enemy route. Do not erase a functioning Rank B
                path merely because one isolated modifier looks exciting.
                Compare the complete trigger chain and the cost of rebuilding
                the hero&apos;s equipment and formation role.
              </p>
            </div>
            <div className="manual-link-row">
              <Link href="/gameplay/#economy">Review shop, Auction House, and recovery rules</Link>
              <Link href="/wiki/items/">Compare item breakpoints</Link>
              <Link href="/wiki/relics/">Compare relic engines</Link>
            </div>
          </section>

          {/* GPT: banner_2 · before the worked example */}
          <GptAdSlot
            id={createGptElementId("growth-route", "upgrade-order")}
            unit="banner2"
          />

          <section className="manual-section" id="example-route">
            <span className="archive-kicker">05 · Example decision sequence</span>
            <h2>How one board grows without losing its identity</h2>
            <p>
              This is an illustration of the decisions, not a prescribed best
              composition. Replace the named heroes with any units that perform
              the same jobs.
            </p>
            <div className="growth-example-route">
              <article>
                <span>Start · 3 heroes</span>
                <h3>Protect one clear win condition</h3>
                <p>
                  Field <Link href="/heroes/pimenta/">Pimenta</Link> as the
                  first-contact anchor, <Link href="/heroes/aria/">Aria</Link>{" "}
                  as the protected carry, and{" "}
                  <Link href="/heroes/grace/">Grace</Link> as the enabler.
                </p>
              </article>
              <article>
                <span>First B rank</span>
                <h3>Upgrade the part that fails first</h3>
                <p>
                  If the front collapses, rank the anchor. If the formation
                  stabilizes but cannot finish, rank the carry and choose the
                  specialization that supports the current status or cast plan.
                </p>
              </article>
              <article>
                <span>Fourth slot</span>
                <h3>Add a missing lane or damage type</h3>
                <p>
                  Use the new slot for control, a second frontline, or a finisher.
                  Do not move the carry into danger merely to fit the new hero.
                </p>
              </article>
              <article>
                <span>First A rank</span>
                <h3>Commit to the repeated trigger</h3>
                <p>
                  Choose a class modifier that activates in most fights. A
                  powerful modifier that needs the wrong layout is not a power
                  spike for this board.
                </p>
              </article>
              <article>
                <span>Five heroes / first S</span>
                <h3>Finish one engine, keep one flexible slot</h3>
                <p>
                  Complete the hero that converts time into wins, then use the
                  fifth active slot and reserve to answer bosses and unusual
                  enemy formations.
                </p>
              </article>
            </div>
          </section>

          <section className="manual-section growth-route-summary">
            <span className="archive-kicker">Before the next fight</span>
            <h2>Growth route checklist</h2>
            <ul>
              <li>Who is supposed to receive the first enemy attacks?</li>
              <li>Which hero is the formation protecting long enough to win?</li>
              <li>Does every active hero have a different, useful job?</li>
              <li>Will the next rank unlock a specialization, modifier, or item slot the board can use?</li>
              <li>Would a free one-hex change solve the problem before spending Shards?</li>
            </ul>
            <div className="manual-link-row">
              <Link href="/gameplay/">Return to How to Play</Link>
              <Link href="/heroes/">Choose the hero to upgrade</Link>
              <Link href="/world/stages/">Inspect the next formation</Link>
            </div>
          </section>
        </article>
      </ReferenceLayout>
    </main>
  );
}
