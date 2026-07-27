import generatedEnemies from "@/src/data/wiki/enemies.json";
import itemsJson from "@/src/data/wiki/items.json";
import relicsJson from "@/src/data/wiki/relics.json";
import statusEffectsJson from "@/src/data/wiki/status-effects.json";
import categoriesJson from "@/src/data/wiki/categories.json";
import { defineDetailCollection } from "@/src/lib/content/collection";
import { defineTdk } from "@/src/seo/tdk";

export const enemiesData = generatedEnemies.map((enemy) => ({
  ...enemy,
  imageAlt: `${enemy.name} enemy group in Guildrun`,
  seo: defineTdk({
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

export const enemyCollection = defineDetailCollection({
  key: "enemies",
  label: "Enemies",
  basePath: "/wiki/enemies",
  records: enemiesData,
  priority: 0.7,
  changeFrequency: "monthly",
  image: (enemy) => enemy.imageUrl,
  search: (enemy, href) => ({
    id: `enemy-${enemy.addressBar}`,
    category: "Enemies",
    title: enemy.name,
    href,
    excerpt: `${enemy.attackType} · HP ${enemy.healthRange} · ${enemy.variantCount} variants`,
    keywords: [enemy.attackType, enemy.appearsIn].filter(Boolean),
    imageUrl: enemy.imageUrl,
  }),
});

export const getEnemy = enemyCollection.get;

export const statusEffectsData = statusEffectsJson.map((effect) => ({
  ...effect,
  seo: defineTdk({
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

export const statusEffectCollection = defineDetailCollection({
  key: "status-effects",
  label: "Status Effects",
  basePath: "/wiki/status-effects",
  records: statusEffectsData,
  priority: 0.7,
  changeFrequency: "monthly",
  search: (effect, href) => ({
    id: `status-${effect.addressBar}`,
    category: "Status Effects",
    title: effect.name,
    href,
    excerpt: effect.summary || "",
    keywords: [effect.type],
    imageUrl: "",
  }),
});

const countMap = {
  items: itemsJson.length,
  relics: relicsJson.length,
  enemies: enemiesData.length,
  statusEffects: statusEffectsData.length,
};

export const wikiCategories = categoriesJson.map((category) => ({
  ...category,
  count: countMap[category.countKey] ?? 0,
}));
