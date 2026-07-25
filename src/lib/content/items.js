import generatedItems from "@/src/data/wiki/items.json";
import { createDetailTdk } from "@/src/seo/tdk";

const statPattern =
  /([+-]?\d+(?:\.\d+)?%?)\s+(Max HP|HP\/s|Attack Speed|Attack Range|Attack|Magic|Crit|Defense|Mana Regen|Starting Mana|Max Mana|Omnivamp)/gi;

function cleanText(value) {
  return value.replace(/\s+([,.])/g, "$1").replace(/\s{2,}/g, " ").trim();
}

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

export const itemsData = generatedItems.map((item) => {
  const questMatch = item.effect.match(/Quest:\s*(.*?)\s*Reward:\s*(.*)$/i);
  const beforeQuest = cleanText(item.effect.split(/\s*Quest:/i)[0]);
  const statMatches = [...beforeQuest.matchAll(statPattern)];
  const stats = statMatches.map((match) => ({
    value: match[1],
    name: match[2],
    label: `${match[1]} ${match[2]}`,
  }));
  const specialEffect = cleanText(
    beforeQuest.replace(statPattern, "").replace(/^[,\s]+|[,\s]+$/g, ""),
  );
  return {
    ...item,
    itemType: inferItemType(item.effect),
    stats,
    specialEffect,
    quest: questMatch
      ? {
          requirement: cleanText(questMatch[1]),
          reward: cleanText(questMatch[2]),
        }
      : null,
    tags: buildTags(item.effect),
    imageAlt: `${item.name} ${item.rarity} item icon in Guildrun`,
    seo: createDetailTdk({
      h1: `Guildrun ${item.name} - Item Stats and Effect`,
      title: `${item.name} Guildrun Item - Stats, Effect and Price`,
      description: `See the Guildrun ${item.name} item with its ${item.rarity.toLowerCase()} rarity, ${item.price} Shard price, stat bonuses, complete effect, quest details, build uses, and related combat mechanics.`,
      keywords: [
        `Guildrun ${item.name}`,
        `${item.name} item`,
        "Guildrun items",
      ],
    }),
    howToObtain:
      item.price === "Not sold"
        ? "This record is not sold by the regular shop. Check its quest, event, class, or unique acquisition path in the current Demo."
        : `${item.rarity} shop offer with a listed price of ${item.price} Shards in the current Demo dataset.`,
  };
});

export function getItem(addressBar) {
  return itemsData.find((item) => item.addressBar === addressBar);
}
