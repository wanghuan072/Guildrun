import heroesJson from "@/src/data/heroes/heroes.json";
import {
  defineDetailCollection,
  slugify,
} from "@/src/lib/content/collection";
import { defineTdk } from "@/src/seo/tdk";

export const heroClasses = [
  ...new Set(heroesJson.flatMap((hero) => hero.classes)),
].sort((left, right) => left.localeCompare(right));

export const heroesData = heroesJson.map((hero, index) => {
  const classLabel = hero.classes.join(" / ");
  return {
    id: index + 1,
    ...hero,
    startingClass: classLabel,
    startingAbility: hero.baseAbility.name,
    specializations: hero.specializations.map((specialization, specializationIndex) => ({
      ...specialization,
      addressBar: `${hero.addressBar}-${slugify(specialization.name)}-${specializationIndex + 1}`,
    })),
    specializationPaths: hero.specializations.map(({ name }) => name),
    imageUrl: `/images/heroes/${hero.addressBar}.webp`,
    imageAlt: `${hero.name}, ${hero.title}, in Guildrun`,
    overview: `${hero.name} is ${/^[aeiou]/i.test(classLabel) ? "an" : "a"} ${classLabel} built around ${hero.role.toLowerCase()}. ${hero.fieldNote}`,
    difficulty: hero.classes.length > 1 ? "Advanced" : "Intermediate",
    seo: defineTdk({
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

export const specializationsData = heroesData.flatMap((hero) =>
  hero.specializations.map((specialization) => ({
    ...specialization,
    heroName: hero.name,
    heroAddressBar: hero.addressBar,
    heroClass: hero.startingClass,
    heroImageUrl: hero.imageUrl,
    href: `/heroes/${hero.addressBar}/#${specialization.addressBar}`,
  })),
);

export const heroCollection = defineDetailCollection({
  key: "heroes",
  label: "Heroes",
  basePath: "/heroes",
  records: heroesData,
  priority: 0.75,
  changeFrequency: "monthly",
  metadataType: "article",
  image: (hero) => hero.splashUrl,
  search: (hero, href) => ({
    id: `hero-${hero.addressBar}`,
    category: "Heroes",
    title: hero.name,
    href,
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
});
