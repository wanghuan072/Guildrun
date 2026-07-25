import heroesJson from "@/src/data/heroes/heroes.json";
import editorialJson from "@/src/data/heroes/editorial.json";
import classRankGains from "@/src/data/heroes/class-rank-gains.json";
import heroClassesJson from "@/src/data/heroes/classes.json";
import { createDetailTdk } from "@/src/seo/tdk";

const statKeys = [
  "Max HP",
  "Base Attack Damage",
  "Base Attack Speed",
  "Attack Range",
  "Crit",
  "Attack",
  "Magic",
  "Defense",
  "Attack Speed",
  "Max Mana",
  "Mana Regen",
  "Starting Mana",
  "Mana Lock (s)",
  "Move Speed",
  "Projectile Speed",
];

export const heroClasses = heroClassesJson;

export const heroesData = editorialJson.map((hero, index) => {
  const classLabel = hero.classes.join(" / ");
  const reference = heroesJson.find((entry) => entry.addressBar === hero.addressBar);
  return {
    id: index + 1,
    ...hero,
    startingClass: reference?.classes?.join(" / ") || classLabel,
    rankGains:
      reference?.rankGains ||
      Object.entries(classRankGains[classLabel] || {}).map(([name, value]) => ({
        name,
        value,
        priority: "base",
      })),
    stats:
      reference?.stats ||
      Object.fromEntries(statKeys.map((key, statIndex) => [key, hero.stats[statIndex]])),
    derived: reference?.derived || {},
    baseAbility:
      reference?.baseAbility || {
        name: hero.ability[0],
        type: "Ability",
        effect: hero.ability[1],
      },
    startingAbility: reference?.baseAbility?.name || hero.ability[0],
    specializations:
      reference?.specializations ||
      hero.paths.map(([name, effect]) => ({
        name,
        addedClass: "",
        type: "Passive Ability",
        effect,
        iconUrl: `/images/heroes/${hero.addressBar}.webp`,
      })),
    specializationPaths:
      reference?.specializations?.map(({ name }) => name) ||
      hero.paths.map(([name]) => name),
    modifiers: reference?.modifiers || [],
    rankImages: reference?.rankImages || {},
    splashUrl: reference?.splashUrl || `/images/heroes/${hero.addressBar}.webp`,
    quote: reference?.quote || "",
    lore: reference?.lore || [],
    sourcePath: reference?.sourcePath || `/heroes/${hero.addressBar}/`,
    imageUrl: `/images/heroes/${hero.addressBar}.webp`,
    imageAlt: `${hero.name}, ${hero.title}, in Guildrun`,
    overview: `${hero.name} is ${/^[aeiou]/i.test(classLabel) ? "an" : "a"} ${classLabel} built around ${hero.role.toLowerCase()}. ${hero.fieldNote}`,
    difficulty: hero.classes.length > 1 ? "Advanced" : "Intermediate",
    seo: createDetailTdk({
      h1: `Guildrun ${hero.name} - Hero Stats, Ranks and Build`,
      title: `${hero.name} Guildrun Hero - Stats, Ranks and Build`,
      description: `Explore ${hero.name} in Guildrun with complete base stats, rank gains, ${classLabel} class details, active ability, specialization paths, modifiers, role, positioning, and build connections.`,
      keywords: [
        `Guildrun ${hero.name}`,
        `${hero.name} build`,
        `${hero.name} stats`,
        "Guildrun heroes",
      ],
    }),
  };
});

export function getHero(addressBar) {
  return heroesData.find((hero) => hero.addressBar === addressBar);
}
