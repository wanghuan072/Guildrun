import generatedEnemies from "@/src/data/wiki/enemies.json";
import enemyDetails from "@/src/data/wiki/enemy-details.json";
import snapshotMeta from "@/src/data/wiki/snapshot-meta.json";
import statusEffectsJson from "@/src/data/wiki/status-effects.json";
import categoriesJson from "@/src/data/wiki/categories.json";
import { createDetailTdk } from "@/src/seo/tdk";

export { snapshotMeta };

export const enemiesData = generatedEnemies.map((enemy) => ({
  ...enemy,
  ...(enemyDetails.find((detail) => detail.addressBar === enemy.addressBar) || {}),
  imageAlt: `${enemy.name} enemy group in Guildrun`,
  seo: createDetailTdk({
    h1: `Guildrun ${enemy.name} - Enemy Stats and Variants`,
    title: `${enemy.name} Guildrun Enemy - Stats and Variants`,
    description: `Study the Guildrun ${enemy.name} enemy family with abilities, attack behavior, health range, level variants, stage appearances, scaling details, positioning risks, and counterplay.`,
    keywords: [
      `Guildrun ${enemy.name}`,
      `${enemy.name} enemy`,
      "Guildrun enemies",
    ],
  }),
}));

export function getEnemy(addressBar) {
  return enemiesData.find((enemy) => enemy.addressBar === addressBar);
}

export const statusEffectsData = statusEffectsJson.map((effect) => ({
  ...effect,
  seo: createDetailTdk({
    h1: `Guildrun ${effect.name} - Rules, Items and Counters`,
    title: `Guildrun ${effect.name} - Rules, Items and Counters`,
    description: `Learn how ${effect.name} works in Guildrun, including its timing, stacking or trigger rules, combat interactions, tactical uses, counters, and linked items, relics, heroes, and enemies.`,
    keywords: [
      `Guildrun ${effect.name}`,
      `${effect.name} effect`,
      "Guildrun status effects",
    ],
  }),
}));

export function getStatusEffect(addressBar) {
  return statusEffectsData.find((effect) => effect.addressBar === addressBar);
}

const countMap = {
  items: snapshotMeta.counts.items,
  relics: snapshotMeta.counts.relics,
  enemies: snapshotMeta.counts.enemies,
  statusEffects: statusEffectsData.length,
};

export const wikiCategories = categoriesJson.map((category) => ({
  ...category,
  count: countMap[category.countKey] ?? 0,
}));
