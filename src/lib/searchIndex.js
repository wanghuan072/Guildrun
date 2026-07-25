import { guidesData } from "@/src/lib/content/guides";
import { heroesData } from "@/src/lib/content/heroes";
import { itemsData } from "@/src/lib/content/items";
import { relicsData } from "@/src/lib/content/relics";
import { updatesData } from "@/src/lib/content/updates";
import { enemiesData, statusEffectsData } from "@/src/lib/content/wiki";
import {
  eventsReferenceData,
  stagesReferenceData,
} from "@/src/lib/content/world";

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

export const searchIndex = [
  ...heroesData.map((hero) =>
    entry({
      id: `hero-${hero.addressBar}`,
      category: "Heroes",
      title: hero.name,
      href: `/heroes/${hero.addressBar}/`,
      excerpt: `${hero.startingClass} · ${hero.attackType}. ${hero.role}`,
      keywords: [
        hero.title,
        hero.guild,
        hero.startingClass,
        hero.attackType,
        ...(hero.keywords || []),
        ...(hero.classes || []),
      ],
      imageUrl: hero.imageUrl,
    }),
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
  ...enemiesData.map((enemy) =>
    entry({
      id: `enemy-${enemy.addressBar}`,
      category: "Enemies",
      title: enemy.name,
      href: `/wiki/enemies/${enemy.addressBar}/`,
      excerpt: `${enemy.attackType} · HP ${enemy.healthRange} · ${enemy.variantCount} variants`,
      keywords: [enemy.attackType, enemy.appearsIn].filter(Boolean),
      imageUrl: enemy.imageUrl,
    }),
  ),
  ...statusEffectsData.map((effect) =>
    entry({
      id: `status-${effect.addressBar}`,
      category: "Status Effects",
      title: effect.name,
      href: `/wiki/status-effects/${effect.addressBar}/`,
      excerpt: effect.summary || "",
      keywords: [effect.type],
      imageUrl: "",
    }),
  ),
  ...stagesReferenceData.map((stage) =>
    entry({
      id: `stage-${stage.addressBar}`,
      category: "Stages",
      title: stage.title || stage.name,
      href: `/world/stages/${stage.addressBar}/`,
      excerpt: `${stage.actLabel} · ${stage.floorLabel}`,
      keywords: [stage.id, stage.actLabel, stage.floorLabel],
      imageUrl: "",
    }),
  ),
  ...eventsReferenceData.map((event) =>
    entry({
      id: `event-${event.addressBar}`,
      category: "Events",
      title: event.title || event.name,
      href: `/world/events/${event.addressBar}/`,
      excerpt: event.kind || "World event",
      keywords: [event.id, event.kind],
      imageUrl: "",
    }),
  ),
  ...guidesData.map((guide) =>
    entry({
      id: `guide-${guide.addressBar}`,
      category: "Guides",
      title: guide.shortTitle,
      href: `/guides/${guide.addressBar}/`,
      excerpt: guide.excerpt,
      keywords: [guide.category, guide.gameVersion, ...(guide.tags || [])],
      imageUrl: guide.imageUrl,
    }),
  ),
  ...updatesData.map((update) =>
    entry({
      id: `update-${update.addressBar}`,
      category: "Updates",
      title: update.title,
      href: `/updates/${update.addressBar}/`,
      excerpt: update.excerpt,
      keywords: [update.version, update.updateType],
      imageUrl: update.imageUrl,
    }),
  ),
  entry({
    id: "page-gameplay",
    category: "Pages",
    title: "Player Handbook",
    href: "/gameplay/",
    excerpt: "Run loop, team building, enemies, and positioning.",
    keywords: ["gameplay", "how to play", "handbook"],
  }),
  entry({
    id: "page-growth",
    category: "Pages",
    title: "Growth Route",
    href: "/gameplay/growth-route/",
    excerpt: "Board size, Rank C to S, and upgrade order.",
    keywords: ["ranks", "progression", "economy", "specializations"],
  }),
  entry({
    id: "page-wiki",
    category: "Pages",
    title: "Wiki Databases",
    href: "/wiki/",
    excerpt: "Items, relics, enemies, and status effects.",
    keywords: ["wiki", "database"],
  }),
  entry({
    id: "page-heroes",
    category: "Pages",
    title: "Heroes Roster",
    href: "/heroes/",
    excerpt: "Compare every hero by class, range, ranks, and paths.",
    keywords: ["heroes", "roster", "classes"],
  }),
  entry({
    id: "page-world",
    category: "Pages",
    title: "World Databases",
    href: "/world/",
    excerpt: "Stages, events, crossroads, fight modes, and stat mods.",
    keywords: ["world", "stages", "events"],
  }),
  entry({
    id: "page-release",
    category: "Pages",
    title: "Release Date",
    href: "/release-date/",
    excerpt: "Demo availability and full-game launch status.",
    keywords: ["release", "launch", "demo"],
  }),
  entry({
    id: "page-fight-modes",
    category: "Pages",
    title: "Fight Modes",
    href: "/world/fight-modes/",
    excerpt: "Endless, Red Rift, and challenge mode thresholds.",
    keywords: ["endless", "red rift", "challenge", "fight modes"],
  }),
  entry({
    id: "page-crossroads",
    category: "Pages",
    title: "Crossroads",
    href: "/world/crossroads/",
    excerpt: "Route choices and branching world decisions.",
    keywords: ["crossroads", "route", "choices"],
  }),
  entry({
    id: "page-stat-mods",
    category: "Pages",
    title: "Stat Mods",
    href: "/world/stat-mods/",
    excerpt: "Permanent and event-driven stat modifiers.",
    keywords: ["stat mods", "permanent stats", "modifiers"],
  }),
  entry({
    id: "page-guides",
    category: "Pages",
    title: "Guides",
    href: "/guides/",
    excerpt: "Core beginner and strategy guides for Demo runs.",
    keywords: ["guides", "beginner", "strategy", "builds"],
  }),
];

export const searchCategories = [
  "All",
  "Heroes",
  "Items",
  "Relics",
  "Enemies",
  "Status Effects",
  "Stages",
  "Events",
  "Guides",
  "Updates",
  "Pages",
];

export function searchSite(query, category = "All", limit = 60) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  const tokens = needle.split(/\s+/).filter(Boolean);

  return searchIndex
    .filter((item) => category === "All" || item.category === category)
    .map((item) => {
      let score = 0;
      if (item.title.toLowerCase() === needle) score += 100;
      else if (item.title.toLowerCase().startsWith(needle)) score += 60;
      else if (item.title.toLowerCase().includes(needle)) score += 40;
      if (tokens.every((token) => item.haystack.includes(token))) score += 20;
      if (item.keywords.some((keyword) => String(keyword).toLowerCase().includes(needle))) {
        score += 15;
      }
      if (item.excerpt.toLowerCase().includes(needle)) score += 8;
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}
