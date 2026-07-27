import Image from "next/image";
import Link from "next/link";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import referenceData from "@/src/data/gameplay/reference.json";
import dataset from "@/src/data/dataset.json";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";
import "@/src/styles/systems.css";

export const metadata = createMetadata({
  ...pageTdk.masteryUnlocks,
  path: "/gameplay/mastery-unlocks/",
});

export default function MasteryUnlocksPage() {
  return (
    <main className="archive-main">
      <ReferenceLayout
        section="gameplay"
        activeHref="/gameplay/mastery-unlocks/"
        pageLinks={[
          ["Mastery trophies", "#mastery"],
          ["Unlock ladder", "#unlock-ladder"],
          ["Boss Tokens", "#boss-tokens"],
          ["Run planning", "#planning"],
        ]}
      >
        <header className="reference-page-head reference-page-head--illustrated">
          <div>
            <span className="archive-eyebrow">Permanent progression · {dataset.gameVersion}</span>
            <h1>{pageTdk.masteryUnlocks.h1}</h1>
            <p>
              Mastery turns specialization wins into permanent starting options.
              Track the nine reward levels, then use Boss Tokens to improve the
              three bundles shown before a run begins.
            </p>
          </div>
          <div className="system-hero-art">
            <Image
              src="/images/gameplay/systems/boss-token.webp"
              alt="Guildrun Boss Token"
              fill
              priority
              sizes="(max-width: 768px) 44vw, 240px"
            />
            <span>Boss Token</span>
          </div>
        </header>

        <article className="record-sections">
          <section className="record-section mastery-primer" id="mastery">
            <span className="archive-kicker">How permanent progress is earned</span>
            <h2>Win with every B-Rank specialization</h2>
            <div className="mastery-primer__layout">
              <p>
                A Mastery Trophy is awarded for winning with a B-Rank
                specialization. Specializations are the fixed paths chosen at
                Rank B, so the mastery route rewards breadth: complete runs with
                paths you would otherwise leave unexplored.
              </p>
              <ol>
                <li><b>Choose a path</b><span>Rank a Hero to B and select one specialization.</span></li>
                <li><b>Finish the run</b><span>A win records the trophy for that specialization.</span></li>
                <li><b>Claim the level</b><span>Trophy milestones unlock new bundles and token slots.</span></li>
              </ol>
            </div>
          </section>

          <section className="record-section" id="unlock-ladder">
            <span className="archive-kicker">Levels 1–9</span>
            <h2>The complete Mastery unlock ladder</h2>
            <div className="mastery-ladder">
              {referenceData.masteryLevels.map((entry) => (
                <article key={entry.level}>
                  <span className="mastery-ladder__level">{String(entry.level).padStart(2, "0")}</span>
                  <div>
                    <small>{entry.type}</small>
                    <h3>{entry.title}</h3>
                  </div>
                  <p>{entry.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="record-section boss-token-section" id="boss-tokens">
            <span className="archive-kicker">Starting bundle control</span>
            <h2>Boss Tokens turn boss progress into opening choice</h2>
            <div className="boss-token-flow">
              {[
                ["Earn", "Reach the boss at the end of an act to earn a Boss Token."],
                ["Store", "Unlocked Mastery levels determine how many tokens can be held."],
                ["Bundle", "One token is automatically consumed so each starting Hero arrives with a random bonus."],
                ["Reroll", "Spend another token to reroll all three Heroes and bonuses together."],
              ].map(([title, copy], index) => (
                <article key={title}>
                  <span>{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
            <div className="manual-callout">
              <strong>A Boss Token improves the choice set, not one isolated offer.</strong>
              <p>
                The reroll replaces all three bundles at once. Keep a playable
                opening when it already contains a clear frontline, damage plan,
                or repeatable trigger; reroll when the complete set lacks a
                coherent first fight.
              </p>
            </div>
          </section>

          <section className="record-section" id="planning">
            <span className="archive-kicker">Connected decisions</span>
            <h2>Use unlocks as options, not a forced build order</h2>
            <p>
              A new bundle expands the opening pool but does not make its theme
              mandatory. Judge the offered Hero and bonus against the next
              formation, then use the normal economy to pivot when the run
              produces a stronger trigger.
            </p>
            <div className="manual-link-row">
              <Link href="/heroes/">Compare unlocked Heroes</Link>
              <Link href="/gameplay/growth-route/">Plan Rank B choices</Link>
              <Link href="/world/fight-modes/">Review difficulty rules</Link>
            </div>
          </section>
        </article>
      </ReferenceLayout>
    </main>
  );
}
