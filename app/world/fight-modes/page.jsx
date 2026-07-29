import Link from "next/link";
import GptAdSlot from "@/src/components/GptAdSlot";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import { createGptElementId } from "@/src/config/gpt";
import "@/src/styles/fight-modes.css";
import referenceData from "@/src/data/gameplay/reference.json";
import { fightModesReferenceData } from "@/src/lib/content/world";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.fightModes,
  path: "/world/fight-modes/",
});

const setLabels = [
  { label: "Threshold Set 1", note: "First recorded damage, survival, and duel reward group" },
  { label: "Threshold Set 2", note: "Second recorded damage, survival, and duel reward group" },
  { label: "Threshold Set 3", note: "Third recorded damage, survival, and duel reward group" },
];

function modeKind(name) {
  if (/damage/i.test(name)) return "damage";
  if (/survival/i.test(name)) return "survival";
  return "duel";
}

function modeBadge(kind) {
  if (kind === "damage") return "Damage dealt";
  if (kind === "survival") return "Survival";
  return "One on one";
}

function opponentFromName(name) {
  return name.match(/\(([^)]+)\)/)?.[1] || "Unknown foe";
}

function titleFromName(name) {
  return name.replace(/\s*\([^)]+\)\s*$/, "").trim();
}

function enrichModes(modes) {
  return modes.map((mode, index) => {
    const kind = modeKind(mode.name);
    const table = mode.tables?.[0] || { columns: [], rows: [] };
    return {
      ...mode,
      index,
      setIndex: Math.floor(index / 3),
      kind,
      badge: modeBadge(kind),
      opponent: opponentFromName(mode.name),
      shortTitle: titleFromName(mode.name),
      table,
      enemyLabel: mode.enemies?.[0]?.name?.replace(/^Enemy_/, "#") || "Fight-only foe",
    };
  });
}

export default function FightModesPage() {
  const pageLinks = [
    ["Campaign", "#campaign"],
    ["Challenges", "#challenges"],
    ["Difficulty", "#difficulty"],
    ["Red Rift", "#red-rift"],
    ["Endless", "#endless"],
  ];
  const modes = enrichModes(fightModesReferenceData);
  const sets = setLabels.map((set, setIndex) => ({
    ...set,
    modes: modes.filter((mode) => mode.setIndex === setIndex),
  }));

  return (
    <main className="archive-main">
      <ReferenceLayout section="world" activeHref="/world/fight-modes/" pageLinks={pageLinks}>
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">Game modes and difficulty</span>
            <h1>{pageTdk.fightModes.h1}</h1>
            <p>
              Campaign fights test route stability; challenge fights change the
              win condition; Endless tests compounding growth. Challenge records
              below are grouped by threshold set so reward ladders stay readable.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>{fightModesReferenceData.length}</strong>
            <span>challenge records</span>
          </div>
        </header>

        <article className="record-sections">
          <section className="record-section" id="campaign">
            <span className="archive-kicker">Primary route mode</span>
            <h2>Campaign fights</h2>
            <p>
              The main run advances through two acts, normal encounters, event
              fights, challenges, bosses, and Auction House stops. Normal wins
              award Shards and open the regular shop; boss wins create a larger
              purchase window.
            </p>
            <div className="fight-campaign-rail">
              {[
                ["Normal", "Defeat the complete formation", "Stability check before the next shop"],
                ["Event fight", "Clear a special formation for the event outcome", "Risk priced against a known reward"],
                ["Boss", "Clear the act pressure point", "Opens the larger Auction House"],
              ].map(([title, objective, signal]) => (
                <article key={title}>
                  <strong>{title}</strong>
                  <span>{objective}</span>
                  <small>{signal}</small>
                </article>
              ))}
            </div>
            <div className="manual-callout">
              <strong>Emergency Rewind stores Shards while it protects the run.</strong>
              <p>
                While available, it gathers 5 Shards after each combat victory.
                The first combat defeat activates Rewind, releases every stored
                Shard, and lets the run continue. A later defeat while Rewind is
                unavailable ends the run. Rewind is automatically deactivated at
                the final boss and releases its stored Shards there.
              </p>
            </div>
            <div className="manual-link-row">
              <Link href="/world/stages/">Open campaign formations</Link>
            </div>
          </section>

          <section className="record-section" id="challenges">
            <span className="archive-kicker">Alternative objectives</span>
            <h2>Damage, survival, and duel challenges</h2>
            <p>
              Challenge encounters grade a specialized objective rather than
              only a normal formation clear. Each band is one threshold set;
              cards keep the exact tier ladders and Gold values.
            </p>

            <div className="fight-set-stack">
              {sets.map((set) => (
                <section className="fight-set-band" key={set.label}>
                  <header className="fight-set-band__head">
                    <div>
                      <span>{set.label}</span>
                      <h3>{set.modes.length} challenge cards</h3>
                    </div>
                    <p>{set.note}</p>
                  </header>
                  <div className="fight-mode-grid">
                    {set.modes.map((mode) => (
                      <article
                        className={`fight-mode-card fight-mode-card--${mode.kind}`}
                        key={`${mode.name}-${mode.index}`}
                      >
                        <div className="fight-mode-card__stripe" aria-hidden="true" />
                        <header className="fight-mode-card__head">
                          <div>
                            <h3>{mode.shortTitle}</h3>
                            <small>vs {mode.opponent}</small>
                          </div>
                          <span className="fight-mode-card__badge">{mode.badge}</span>
                        </header>
                        <div className="fight-mode-card__table" role="table" aria-label={`${mode.name} thresholds`}>
                          <div className="fight-mode-card__cols" role="row">
                            {mode.table.columns.map((column) => (
                              <span key={column} role="columnheader">{column}</span>
                            ))}
                          </div>
                          {mode.table.rows.map((row, rowIndex) => (
                            <div className="fight-mode-card__row" role="row" key={rowIndex}>
                              {mode.table.columns.map((column) => (
                                <span key={column} role="cell">{row[column] || "—"}</span>
                              ))}
                            </div>
                          ))}
                        </div>
                        <footer className="fight-mode-card__foot">
                          <span>Foe {mode.enemyLabel}</span>
                          <Link href="/world/stages/">Stage boards →</Link>
                        </footer>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="manual-callout">
              <strong>Build for the objective</strong>
              <p>
                Damage challenges reward early output and uptime. Survival
                challenges reward mitigation, shields, healing, control, and
                correct first targeting. A 1v1 duel asks which single hero can
                function without the formation&apos;s usual support.
              </p>
            </div>
          </section>

          {/* GPT: banner_2 · between challenge and difficulty chapters */}
          <GptAdSlot
            id={createGptElementId("world-fight-modes", "challenges")}
            unit="banner2"
          />

          <section className="record-section" id="difficulty">
            <span className="archive-kicker">Run-level pressure</span>
            <h2>Difficulty progression</h2>
            <p>
              Each contract adds one explicit source of pressure. Beat the
              previous difficulty to unlock the next, and compare stage records
              at the same difficulty index before judging a formation or build.
            </p>
            <div className="difficulty-ladder">
              {referenceData.difficultyLevels.map((level, index) => (
                <article className={level.rank === "Red Rift" ? "is-rift" : ""} key={level.rank}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{level.rank}</strong>
                  <div>
                    <h3>{level.title}</h3>
                    <p>{level.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="record-section" id="red-rift">
            <span className="archive-kicker">High-danger contract</span>
            <h2>Red Rift ends at the final boss</h2>
            <div className="red-rift-contract">
              <div>
                <strong>6</strong>
                <span>challenges to complete</span>
              </div>
              <ul>
                <li>Complete every challenge and defeat the final boss to seal the Red Rift.</li>
                <li>Failing a challenge ends the run and resets the current win streak.</li>
                <li>Enemies receive increased stats throughout the contract.</li>
                <li>A Red Rift victory does not continue into Endless Mode.</li>
              </ul>
            </div>
            <div className="manual-callout">
              <strong>Build for immediate stability, not an Endless-only ceiling.</strong>
              <p>
                A delayed engine that eventually scales can still lose the
                contract at one failed challenge. Favor protection, target
                access, and repeatable damage that already function at the next
                checkpoint.
              </p>
            </div>
          </section>

          {/* GPT: banner_3 · between Red Rift and Endless */}
          <GptAdSlot
            id={createGptElementId("world-fight-modes", "red-rift")}
            unit="banner3"
          />

          <section className="record-section" id="endless">
            <span className="archive-kicker">Post-campaign scaling</span>
            <h2>Endless mode</h2>
            <p>
              After the final campaign boss, Endless rotates through Mushroom,
              Snake, and Slime maps. Enemy stat multipliers make permanent
              growth, true damage, target access, and repeatable engines more
              important than a one-time power spike.
            </p>
            <p>
              Storm begins at 50 seconds and becomes more punishing as combat
              continues; Riftbreaker appears at 90 seconds. A defensive engine
              therefore needs a conversion into damage or permanent growth
              rather than indefinite survival alone.
            </p>
            <div className="manual-link-row">
              <Link href="/world/stages/101/">Endless Mushroom formation</Link>
              <Link href="/world/stages/102/">Endless Snake formation</Link>
              <Link href="/world/stages/103/">Endless Slime formation</Link>
              <Link href="/wiki/enemies/">Enemy scaling records</Link>
            </div>
          </section>
        </article>
      </ReferenceLayout>
    </main>
  );
}
