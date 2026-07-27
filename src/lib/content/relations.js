import { heroesData } from "@/src/lib/content/heroes";
import { itemsData } from "@/src/lib/content/items";
import { relicsData } from "@/src/lib/content/relics";
import { enemiesData, statusEffectsData } from "@/src/lib/content/wiki";
import statusSlugs from "@/src/data/wiki/status-slugs.json";

const statusAliases = Object.fromEntries(
  Object.entries(statusSlugs).flatMap(([label, slug]) => [
    [label.toLowerCase(), slug],
    [slug, slug],
  ]),
);

export function statusSlugForTerm(term) {
  return statusAliases[String(term).toLowerCase()] || null;
}

function mentions(record, effect) {
  const source = [
    record.effect,
    record.baseAbility?.effect,
    ...(record.specializations || []).map((entry) => entry.effect),
    ...(record.modifiers || []).map((entry) => entry.effect),
    ...(record.abilities || []).map((entry) => entry.description),
  ]
    .filter(Boolean)
    .join(" ");
  const matcher =
    effect.addressBar === "shields"
      ? /\bShields?\b/i
      : new RegExp(`\\b${effect.name}\\b`, "i");
  return matcher.test(source);
}

export function getStatusRelations(addressBar) {
  const effect = statusEffectsData.find((entry) => entry.addressBar === addressBar);
  if (!effect) return { items: [], relics: [], heroes: [], enemies: [] };
  return {
    items: itemsData.filter((item) => mentions(item, effect)),
    relics: relicsData.filter((relic) => mentions(relic, effect)),
    heroes: heroesData.filter((hero) => mentions(hero, effect)),
    enemies: enemiesData.filter((enemy) => mentions(enemy, effect)),
  };
}
