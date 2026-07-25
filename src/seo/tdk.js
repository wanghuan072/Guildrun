const descriptionSuffix =
  "Use the linked records and practical notes to plan a clearer Guildrun run.";

function trimAtWord(value, maximum) {
  if (value.length <= maximum) return value;
  const shortened = value.slice(0, maximum - 1);
  const boundary = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, boundary > maximum - 18 ? boundary : maximum - 1).trim()}.`;
}

function normalizeDescription(value) {
  const clean = value.replace(/\s+/g, " ").trim();
  const expanded =
    clean.length >= 140 ? clean : `${clean} ${descriptionSuffix}`;
  return trimAtWord(expanded, 160);
}

function normalizeTitle(value) {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length >= 40) return trimAtWord(clean, 60);
  return trimAtWord(`${clean} | Guildrun Strategy Guide`, 60);
}

export function defineTdk({ h1, title, description, keywords = [] }) {
  return Object.freeze({
    h1,
    title: normalizeTitle(title),
    description: normalizeDescription(description),
    keywords,
  });
}

export function createDetailTdk({
  h1,
  title,
  description,
  keywords = [],
}) {
  return defineTdk({ h1, title, description, keywords });
}

export const pageTdk = {
  home: defineTdk({
    h1: "Guildrun - Heroes, Builds, Wiki and Strategy Guide",
    title: "Guildrun - Heroes, Builds, Wiki and Strategy Guide",
    description:
      "Master Guildrun with complete hero stats, rank paths, items, relics, enemy records, world encounters, team-building advice, and practical run strategies.",
    keywords: ["Guildrun", "Guildrun Wiki", "Guildrun heroes", "Guildrun builds"],
  }),
  gameplay: defineTdk({
    h1: "Guildrun Gameplay Guide - How to Play and Build a Team",
    title: "Guildrun Gameplay Guide - How to Play and Build",
    description:
      "Learn how to play Guildrun from the opening draft through combat, team roles, enemy reading, positioning, hero choices, economy decisions, and run recovery.",
    keywords: ["Guildrun gameplay", "how to play Guildrun", "Guildrun team building"],
  }),
  growthRoute: defineTdk({
    h1: "Guildrun Growth Route - Formation, Ranks and Upgrades",
    title: "Guildrun Growth Route - Ranks and Upgrades Guide",
    description:
      "Plan a Guildrun growth route through roster slots, duplicate ranks, specialization choices, items, relics, Auction House upgrades, and late-run build pivots.",
    keywords: ["Guildrun growth route", "Guildrun ranks", "Guildrun upgrades"],
  }),
  wiki: defineTdk({
    h1: "Guildrun Wiki - Items, Relics, Enemies and Effects",
    title: "Guildrun Wiki - Items, Relics, Enemies and Effects",
    description:
      "Browse the Guildrun Wiki by database, then open detailed item, relic, enemy, and status-effect records with stats, mechanics, related entries, and gameplay links.",
    keywords: ["Guildrun Wiki", "Guildrun items", "Guildrun relics", "Guildrun enemies"],
  }),
  heroes: defineTdk({
    h1: "Guildrun Heroes - Stats, Classes, Ranks and Builds",
    title: "Guildrun Heroes - Stats, Classes, Ranks and Builds",
    description:
      "Compare every Guildrun hero by class, attack type, keywords, base stats, rank gains, abilities, specialization paths, modifiers, and practical team role.",
    keywords: ["Guildrun heroes", "Guildrun hero list", "Guildrun hero stats"],
  }),
  world: defineTdk({
    h1: "Guildrun World - Stages, Events and Fight Modes",
    title: "Guildrun World - Stages, Events and Fight Modes",
    description:
      "Navigate the Guildrun world through campaign stages, event choices, crossroads, fight modes, permanent stat changes, enemy links, rewards, and route planning.",
    keywords: ["Guildrun world", "Guildrun stages", "Guildrun events"],
  }),
  guides: defineTdk({
    h1: "Guildrun Guides - Beginner Handbook and Strategy Route",
    title: "Guildrun Guides - Beginner Handbook and Strategy Route",
    description:
      "Start with two deep Guildrun Demo guide pillars: a beginner handbook for first runs, shops, and positioning, plus a strategy guide for builds, ranks, relics, Red Rift, and Endless.",
    keywords: ["Guildrun Guide", "Guildrun beginner guide", "Guildrun strategy guide"],
  }),
  search: defineTdk({
    h1: "Search Guildrun - Heroes, Wiki, Guides and Updates",
    title: "Search Guildrun - Heroes, Wiki, Guides and Updates",
    description:
      "Search the Guildrun guide for heroes, items, relics, enemies, status effects, stages, events, strategy guides, and patch notes from one indexed page.",
    keywords: ["Guildrun search", "Guildrun wiki search", "Guildrun heroes search"],
  }),
  updates: defineTdk({
    h1: "Guildrun Updates - Patches, Changes and Release News",
    title: "Guildrun Updates - Patches, Changes and Release News",
    description:
      "Follow Guildrun updates with readable patch changes, affected heroes and systems, release timing, Demo milestones, development plans, and strategy impact.",
    keywords: ["Guildrun updates", "Guildrun patch notes", "Guildrun release news"],
  }),
  releaseDate: defineTdk({
    h1: "Guildrun Release Date - Demo Live and Launch Status",
    title: "Guildrun Release Date - Demo Live and Launch Status",
    description:
      "Check the Guildrun release date plan for 2027, current Demo availability, full-game pricing status, co-op development, platforms, and progress carryover.",
    keywords: ["Guildrun release date", "Guildrun launch", "Guildrun Demo"],
  }),
  items: defineTdk({
    h1: "Guildrun Items - Stats, Effects, Prices and Builds",
    title: "Guildrun Items - Stats, Effects, Prices and Builds",
    description:
      "Search Guildrun items by rarity, price, type, stat bonus, quest effect, and combat keyword, then open each record for mechanics and related build links.",
    keywords: ["Guildrun items", "Guildrun item list", "Guildrun item stats"],
  }),
  relics: defineTdk({
    h1: "Guildrun Relics - Effects, Quests and Build Uses",
    title: "Guildrun Relics - Effects, Quests and Build Uses",
    description:
      "Compare Guildrun relics by rarity, category, price, quest, trigger, and combat keyword, then inspect complete effects and useful item or status connections.",
    keywords: ["Guildrun relics", "Guildrun relic list", "Guildrun relic effects"],
  }),
  enemies: defineTdk({
    h1: "Guildrun Enemies - Abilities, Stats and Variants",
    title: "Guildrun Enemies - Abilities, Stats and Variants",
    description:
      "Study Guildrun enemies by family, range, health, ability, level variant, stage appearance, and fight behavior before planning target priority and formation.",
    keywords: ["Guildrun enemies", "Guildrun enemy list", "Guildrun enemy stats"],
  }),
  statusEffects: defineTdk({
    h1: "Guildrun Status Effects - Rules, Items and Counters",
    title: "Guildrun Status Effects - Rules, Items and Counters",
    description:
      "Learn how Guildrun status effects work, including Burn, Poison, Frost, Stun, Shields, Rush, Stall, Stealth, and links to items and relics that apply them.",
    keywords: ["Guildrun status effects", "Guildrun Burn", "Guildrun Poison"],
  }),
  stages: defineTdk({
    h1: "Guildrun Stages - Floors, Formations and Rewards",
    title: "Guildrun Stages - Floors, Formations and Rewards",
    description:
      "Explore Guildrun stages by act and floor with enemy formations, unit stats, reward ranges, environments, preparation notes, and connected enemy records.",
    keywords: ["Guildrun stages", "Guildrun floors", "Guildrun formations"],
  }),
  events: defineTdk({
    h1: "Guildrun Events - Choices, Outcomes and Rewards",
    title: "Guildrun Events - Choices, Outcomes and Rewards",
    description:
      "Browse Guildrun events with prompts, route connections, choice outcomes, rewards, fight flags, and decision guidance for protecting each run's active plan.",
    keywords: ["Guildrun events", "Guildrun event choices", "Guildrun rewards"],
  }),
  crossroads: defineTdk({
    h1: "Guildrun Crossroads - Routes, Choices and Rewards",
    title: "Guildrun Crossroads - Routes, Choices and Rewards",
    description:
      "Compare Guildrun Crossroads routes, connected events, risk levels, possible rewards, and decision rules before committing a run to its next branch.",
    keywords: ["Guildrun Crossroads", "Guildrun routes", "Guildrun choices"],
  }),
  fightModes: defineTdk({
    h1: "Guildrun Fight Modes - Rules, Difficulty and Endless",
    title: "Guildrun Fight Modes - Difficulty and Endless Guide",
    description:
      "Understand Guildrun fight modes, difficulty rules, Red Rift pressure, boss encounters, Endless scaling, mission limits, and the builds each mode rewards.",
    keywords: ["Guildrun fight modes", "Guildrun difficulty", "Guildrun Endless"],
  }),
  statMods: defineTdk({
    h1: "Guildrun Stat Mods - Permanent Event Upgrades",
    title: "Guildrun Stat Mods - Permanent Event Upgrades",
    description:
      "Find Guildrun stat mods gained through events, compare permanent bonuses and tradeoffs, and connect each upgrade to hero stats, roles, and growth choices.",
    keywords: ["Guildrun stat mods", "Guildrun upgrades", "Guildrun event stats"],
  }),
  privacyPolicy: defineTdk({
    h1: "Guildrun Privacy Policy - Data and Site Use",
    title: "Guildrun Privacy Policy - Data and Site Use",
    description:
      "Read the Guildrun Privacy Policy for details about routine technical data, cookies, external links, retention practices, user choices, and contact information.",
    keywords: ["Guildrun Privacy Policy", "Guildrun privacy"],
  }),
  termsOfService: defineTdk({
    h1: "Guildrun Terms of Service - Website Use Rules",
    title: "Guildrun Terms of Service - Website Use Rules",
    description:
      "Read the Guildrun Terms of Service covering permitted website use, content limitations, external services, intellectual property, disclaimers, and changes.",
    keywords: ["Guildrun Terms of Service", "Guildrun website terms"],
  }),
  copyright: defineTdk({
    h1: "Guildrun Copyright - Content and Rights Notice",
    title: "Guildrun Copyright - Content and Rights Notice",
    description:
      "Review the Guildrun Copyright notice for site text, design, trademarks, game materials, permitted personal use, rights-holder requests, and contact details.",
    keywords: ["Guildrun Copyright", "Guildrun rights notice"],
  }),
  aboutUs: defineTdk({
    h1: "About Guildrun Guide - Purpose and Editorial Care",
    title: "About Guildrun Guide - Purpose and Editorial Care",
    description:
      "Learn how Guildrun Guide organizes gameplay knowledge, separates fixed game data from strategy advice, maintains page clarity, and improves connected records.",
    keywords: ["About Guildrun Guide", "Guildrun website"],
  }),
  contactUs: defineTdk({
    h1: "Contact Guildrun Guide - Questions and Corrections",
    title: "Contact Guildrun Guide - Questions and Corrections",
    description:
      "Contact Guildrun Guide about factual corrections, accessibility, copyright concerns, technical issues, or general questions using the published email address.",
    keywords: ["Contact Guildrun Guide", "Guildrun contact"],
  }),
};
