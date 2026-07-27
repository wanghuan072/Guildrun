import Link from "next/link";
import dataset from "@/src/data/dataset.json";
import { guideCollection } from "@/src/lib/content/guides";

const sectionLinks = {
  gameplay: [
    ["How to Play", "/gameplay/"],
    ["Growth Route", "/gameplay/growth-route/"],
    ["Mastery & Unlocks", "/gameplay/mastery-unlocks/"],
    ["Stats & Formulas", "/gameplay/stats/"],
  ],
  wiki: [
    ["Items", "/wiki/items/"],
    ["Relics", "/wiki/relics/"],
    ["Enemies", "/wiki/enemies/"],
    ["Status Effects", "/wiki/status-effects/"],
    ["Rank Modifiers", "/wiki/rank-modifiers/"],
  ],
  heroes: [
    ["All Heroes", "/heroes/"],
    ["Classes", "/heroes/classes/"],
    ["Guilds", "/heroes/guilds/"],
    ["Gameplay Guide", "/gameplay/#heroes"],
    ["Growth Route", "/gameplay/growth-route/"],
  ],
  guides: [
    ["All Guides", "/guides/"],
    ...guideCollection.records.map((guide) => [
      guide.shortTitle,
      guideCollection.href(guide),
    ]),
  ],
  world: [
    ["World Overview", "/world/"],
    ["Stages", "/world/stages/"],
    ["Events", "/world/events/"],
    ["Crossroads", "/world/crossroads/"],
    ["Fight Modes", "/world/fight-modes/"],
    ["Stat Mods", "/world/stat-mods/"],
  ],
  updates: [
    ["All Updates", "/updates/"],
  ],
};

const sectionTitles = {
  gameplay: "Gameplay",
  wiki: "Wiki Database",
  heroes: "Heroes",
  guides: "Guides",
  world: "World",
  updates: "Updates",
};

export default function ReferenceLayout({
  section,
  activeHref,
  pageLinks = [],
  children,
}) {
  return (
    <div className="container reference-layout">
      <aside className="reference-sidebar">
        <div className="reference-sidebar__group">
          <span>{sectionTitles[section]}</span>
          <nav aria-label={`${sectionTitles[section]} navigation`}>
            {sectionLinks[section].map(([label, href]) => (
              <Link
                aria-current={activeHref === href ? "page" : undefined}
                className={activeHref === href ? "is-active" : undefined}
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {pageLinks.length > 0 && (
          <div className="reference-sidebar__group reference-sidebar__contents">
            <span>On this page</span>
            <nav aria-label="On this page">
              {pageLinks.map(([label, href]) => (
                <a href={href} key={href}>{label}</a>
              ))}
            </nav>
          </div>
        )}

        <div className="reference-sidebar__version">
          <span>Dataset</span>
          <strong>{dataset.gameVersion}</strong>
          <small>Updated {dataset.updatedDate}</small>
        </div>
      </aside>
      <div className="reference-content">{children}</div>
    </div>
  );
}
