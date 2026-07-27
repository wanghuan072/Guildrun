import Link from "next/link";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import referenceData from "@/src/data/gameplay/reference.json";
import dataset from "@/src/data/dataset.json";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";
import "@/src/styles/systems.css";

export const metadata = createMetadata({
  ...pageTdk.stats,
  path: "/gameplay/stats/",
});

const statGroups = ["Offense", "Ability", "Survival", "Positioning"];

export default function StatsPage() {
  return (
    <main className="archive-main">
      <ReferenceLayout
        section="gameplay"
        activeHref="/gameplay/stats/"
        pageLinks={[
          ["Core formulas", "#formulas"],
          ...statGroups.map((group) => [group, `#${group.toLowerCase()}`]),
          ["Use the numbers", "#decisions"],
        ]}
      >
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">Combat notation · {dataset.gameVersion}</span>
            <h1>{pageTdk.stats.h1}</h1>
            <p>
              Read every core stat in the same terms the game uses, including
              Defense scaling, two-second Mana pulses, Crit overflow, hex range,
              and the conversion from Omnivamp to healing.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>{referenceData.stats.length}</strong>
            <span>defined stats</span>
          </div>
        </header>

        <article className="record-sections">
          <section className="record-section" id="formulas">
            <span className="archive-kicker">Four rules worth memorizing</span>
            <h2>Core formulas that change build evaluation</h2>
            <div className="formula-strip">
              <article><span>Defense</span><strong>100 / (100 + Defense)</strong><p>Approximate incoming damage multiplier.</p></article>
              <article><span>Crit overflow</span><strong>100 + excess Crit</strong><p>Each point above 100 adds 1% Crit Damage.</p></article>
              <article><span>Mana pulse</span><strong>Every 2 seconds</strong><p>Mana Regen is applied in discrete pulses.</p></article>
              <article><span>Omnivamp</span><strong>1 = 1%</strong><p>Healing equals the listed percent of damage dealt.</p></article>
            </div>
          </section>

          {statGroups.map((group) => {
            const stats = referenceData.stats.filter((stat) => stat.group === group);
            return (
              <section className="record-section" id={group.toLowerCase()} key={group}>
                <span className="archive-kicker">{group} reference</span>
                <h2>{group} stats</h2>
                <div className="stat-reference-list">
                  {stats.map((stat) => (
                    <article key={stat.name}>
                      <h3>{stat.name}</h3>
                      <p>{stat.description}</p>
                      <small>{stat.practical}</small>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}

          <section className="record-section" id="decisions">
            <span className="archive-kicker">From tooltip to board decision</span>
            <h2>Use stats to explain a result</h2>
            <ol className="instruction-list">
              <li><strong>Start with timing.</strong><span>Check movement, first contact, attacks per second, and time to first cast.</span></li>
              <li><strong>Separate survival layers.</strong><span>Max HP, Defense, Shields, healing, and HP/S answer different kinds of damage.</span></li>
              <li><strong>Count repeatable triggers.</strong><span>Attack Speed and Mana Regen matter through the extra effects they activate.</span></li>
              <li><strong>Change one input.</strong><span>Move, equip, or rank one Hero and compare the same encounter again.</span></li>
            </ol>
            <div className="manual-link-row">
              <Link href="/heroes/">Compare base Hero stats</Link>
              <Link href="/wiki/items/">Filter items by stat</Link>
              <Link href="/wiki/status-effects/">Open status rules</Link>
            </div>
          </section>
        </article>
      </ReferenceLayout>
    </main>
  );
}
