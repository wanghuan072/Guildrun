import generatedItems from "@/src/data/wiki/items.json";

function inferItemType(effect) {
  if (/Shield|Defense|Max HP|HP\/s/i.test(effect)) return "Defensive";
  if (/Mana|Magic|cast/i.test(effect)) return "Caster";
  if (/Attack|Crit|Omnivamp/i.test(effect)) return "Offensive";
  return "Utility";
}

function buildTags(effect) {
  const candidates = [
    "Attack",
    "Attack Speed",
    "Magic",
    "Crit",
    "Defense",
    "Max HP",
    "Mana",
    "Mana Regen",
    "Omnivamp",
    "Burn",
    "Poison",
    "Frost",
    "Rush",
    "Stall",
    "Shards",
    "Shield",
  ];
  return candidates.filter((tag) =>
    new RegExp(`\\b${tag.replace(" ", "\\s+")}\\b`, "i").test(effect),
  );
}

export const itemsData = generatedItems.map((item) => ({
  ...item,
  itemType: inferItemType(item.effect),
  tags: buildTags(item.effect),
}));
