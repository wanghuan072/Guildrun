import generatedRelics from "@/src/data/wiki/relics.json";
import { createDetailTdk } from "@/src/seo/tdk";

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
  quest: (() => {
    const match = relic.effect.match(/Quest:\s*(.*?)\s*Reward:\s*(.*)$/i);
    return match
      ? { requirement: match[1].trim(), reward: match[2].trim() }
      : null;
  })(),
  specialEffect: relic.effect.replace(/Quest:.*$/i, "").trim(),
  imageAlt: `${relic.name} ${relic.rarity} relic icon in Guildrun`,
  seo: createDetailTdk({
    h1: `Guildrun ${relic.name} - Relic ${relic.id} Effect and Uses`,
    title: `Guildrun ${relic.name} Relic ${relic.id} - Effect and Uses`,
    description: `See Guildrun relic ${relic.id}, ${relic.name}, with its ${relic.rarity.toLowerCase()} rarity, ${relic.price} Shard price, complete effect, quest details, trigger rules, build uses, and related combat mechanics.`,
    keywords: [
      `Guildrun ${relic.name}`,
      `${relic.name} relic`,
      "Guildrun relics",
    ],
  }),
}));

export function getRelic(addressBar) {
  return relicsData.find((relic) => relic.addressBar === addressBar);
}
