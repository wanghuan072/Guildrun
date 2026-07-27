import { detailCollections } from "@/src/lib/content/detailRegistry";
import { specializationsData } from "@/src/lib/content/heroes";
import { itemsData } from "@/src/lib/content/items";
import { relicsData } from "@/src/lib/content/relics";

function entry({
  id,
  category,
  title,
  href,
  excerpt,
  keywords = [],
  imageUrl = "",
}) {
  const haystack = [title, excerpt, category, ...keywords]
    .join(" ")
    .toLowerCase();
  return { id, category, title, href, excerpt, keywords, imageUrl, haystack };
}

const staticPages = [
  ["gameplay", "Player Handbook", "/gameplay/", "Run loop, team building, enemies, and positioning.", ["gameplay", "how to play", "handbook"]],
  ["growth", "Growth Route", "/gameplay/growth-route/", "Board size, Rank C to S, and upgrade order.", ["ranks", "progression", "economy", "specializations"]],
  ["wiki", "Wiki Databases", "/wiki/", "Items, relics, enemies, and status effects.", ["wiki", "database"]],
  ["heroes", "Heroes Roster", "/heroes/", "Compare every hero by class, range, ranks, and paths.", ["heroes", "roster", "classes"]],
  ["world", "World Databases", "/world/", "Stages, events, crossroads, fight modes, and stat mods.", ["world", "stages", "events"]],
  ["release", "Release Date", "/release-date/", "Demo availability and full-game launch status.", ["release", "launch", "demo"]],
  ["fight-modes", "Fight Modes", "/world/fight-modes/", "Endless, Red Rift, and challenge mode thresholds.", ["endless", "red rift", "challenge"]],
  ["crossroads", "Crossroads", "/world/crossroads/", "Route choices and branching world decisions.", ["crossroads", "route", "choices"]],
  ["stat-mods", "Stat Mods", "/world/stat-mods/", "Permanent and event-driven stat modifiers.", ["stat mods", "permanent stats", "modifiers"]],
  ["guides", "Guides", "/guides/", "Beginner and strategy guides for Demo runs.", ["guides", "beginner", "strategy", "builds"]],
  ["updates", "Updates", "/updates/", "Patch changes, development milestones, and strategy impact.", ["updates", "patch notes", "news"]],
];

export const searchIndex = [
  ...detailCollections.flatMap((collection) =>
    collection.records.map((record) => entry(collection.search(record))),
  ),
  ...itemsData.map((item) =>
    entry({
      id: `item-${item.addressBar}`,
      category: "Items",
      title: item.name,
      href: `/wiki/items/?search=${encodeURIComponent(item.addressBar)}`,
      excerpt: item.effect,
      keywords: [item.rarity, item.itemType, ...(item.tags || [])],
      imageUrl: item.imageUrl,
    }),
  ),
  ...relicsData.map((relic) =>
    entry({
      id: `relic-${relic.addressBar}`,
      category: "Relics",
      title: relic.name,
      href: `/wiki/relics/?search=${encodeURIComponent(relic.addressBar)}`,
      excerpt: relic.effect,
      keywords: [relic.rarity, relic.category, ...(relic.tags || [])],
      imageUrl: relic.imageUrl,
    }),
  ),
  ...specializationsData.map((specialization) =>
    entry({
      id: `specialization-${specialization.addressBar}`,
      category: "Specializations",
      title: specialization.name,
      href: specialization.href,
      excerpt: `${specialization.heroName} · ${specialization.type}. ${specialization.effect}`,
      keywords: [
        specialization.heroName,
        specialization.heroClass,
        specialization.addedClass,
      ].filter(Boolean),
      imageUrl: specialization.iconUrl,
    }),
  ),
  ...staticPages.map(([id, title, href, excerpt, keywords]) =>
    entry({
      id: `page-${id}`,
      category: "Pages",
      title,
      href,
      excerpt,
      keywords,
    }),
  ),
];
