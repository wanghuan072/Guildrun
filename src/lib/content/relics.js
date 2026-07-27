import generatedRelics from "@/src/data/wiki/relics.json";

function buildTags(effect) {
  const candidates = [
    "Attack",
    "Attack Speed",
    "Magic",
    "Crit",
    "Defense",
    "Max HP",
    "Mana",
    "Omnivamp",
    "Burn",
    "Poison",
    "Frost",
    "Rush",
    "Stall",
    "Shards",
    "Shield",
    "Quest",
    "Backup",
  ];
  return candidates.filter((tag) =>
    new RegExp(`\\b${tag.replace(" ", "\\s+")}\\b`, "i").test(effect),
  );
}

function inferCategory(effect) {
  if (/Quest/i.test(effect)) return "Quest";
  if (/Shard|shop|reroll|price/i.test(effect)) return "Economy";
  if (/Shield|Defense|heal|HP/i.test(effect)) return "Defense";
  if (/Burn|Poison|Frost|debuff/i.test(effect)) return "Status";
  if (/Attack|Magic|Crit|damage/i.test(effect)) return "Offense";
  return "Utility";
}

export const relicsData = generatedRelics.map((relic) => ({
  ...relic,
  category: inferCategory(relic.effect),
  tags: buildTags(relic.effect),
}));
