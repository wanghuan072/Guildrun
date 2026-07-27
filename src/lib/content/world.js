import stagesJson from "@/src/data/world/stages.json";
import eventsJson from "@/src/data/world/events.json";
import crossroadsJson from "@/src/data/world/crossroads.json";
import generatedFightModes from "@/src/data/world/fight-modes.json";
import generatedStatMods from "@/src/data/world/stat-mods.json";
import categoriesJson from "@/src/data/world/categories.json";
import { defineDetailCollection, slugify } from "@/src/lib/content/collection";
import { defineTdk } from "@/src/seo/tdk";

export const stagesReferenceData = stagesJson.map((stage) => ({
  ...stage,
  addressBar: stage.id,
  actLabel: stage.act === "0" ? "Endless" : `Act ${stage.act}`,
  floorLabel: stage.act === "0" ? "Endless map" : `Floor ${stage.floor}`,
  seo: defineTdk({
    h1: `Guildrun ${stage.title || stage.name} - Stage ${stage.id} Formation`,
    title: `Guildrun ${stage.title || stage.name} Stage ${stage.id} - Formation`,
    description: `Plan for Guildrun stage ${stage.id}, ${stage.title || stage.name}, with its act and floor position, enemy formation, unit stats, reward values, environment details, target priorities, and preparation links.`,
    keywords: [
      `Guildrun ${stage.title || stage.name}`,
      `${stage.title || stage.name} stage`,
      "Guildrun stages",
    ],
  }),
}));

export const eventsReferenceData = eventsJson.map((event) => ({
  ...event,
  addressBar: event.id,
  kind: event.isFight === "Yes" ? "Fight event" : "Decision event",
  seo: defineTdk({
    h1: `Guildrun ${event.title || event.name} - Event ${event.id} Choices`,
    title: `Guildrun ${event.title || event.name} Event ${event.id} - Choices`,
    description: `Explore Guildrun event ${event.id}, ${event.title || event.name}, with its prompts, available choices, outcomes, rewards, route connections, fight state, and practical decision framework.`,
    keywords: [
      `Guildrun ${event.title || event.name}`,
      `${event.title || event.name} event`,
      "Guildrun events",
    ],
  }),
}));

export const fightModesReferenceData = generatedFightModes;
export const statModsReferenceData = generatedStatMods;

export const crossroadsReferenceData = crossroadsJson.map((crossroad) => ({
  ...crossroad,
  addressBar: slugify(crossroad.name),
}));

export const stageCollection = defineDetailCollection({
  key: "stages",
  label: "Stages",
  basePath: "/world/stages",
  records: stagesReferenceData,
  priority: 0.65,
  changeFrequency: "monthly",
  search: (stage, href) => ({
    id: `stage-${stage.addressBar}`,
    category: "Stages",
    title: stage.title || stage.name,
    href,
    excerpt: `${stage.actLabel} · ${stage.floorLabel}`,
    keywords: [stage.id, stage.actLabel, stage.floorLabel],
    imageUrl: "",
  }),
});

export const eventCollection = defineDetailCollection({
  key: "events",
  label: "Events",
  basePath: "/world/events",
  records: eventsReferenceData,
  priority: 0.65,
  changeFrequency: "monthly",
  search: (event, href) => ({
    id: `event-${event.addressBar}`,
    category: "Events",
    title: event.title || event.name,
    href,
    excerpt: event.kind || "World event",
    keywords: [event.id, event.kind],
    imageUrl: "",
  }),
});

const statModCount = statModsReferenceData.reduce(
  (total, group) => total + group.rows.length,
  0,
);

const countMap = {
  stages: stagesReferenceData.length,
  events: eventsReferenceData.length,
  crossroads: crossroadsReferenceData.length,
  fightModes: fightModesReferenceData.length,
  statMods: statModCount,
};

export const worldCategories = categoriesJson.map((category) => ({
  ...category,
  count: countMap[category.countKey] ?? 0,
}));
