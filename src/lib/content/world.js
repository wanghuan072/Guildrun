import generatedWorld from "@/src/data/world/world.json";
import generatedEventDetails from "@/src/data/world/event-details.json";
import generatedStageDetails from "@/src/data/world/stage-details.json";
import generatedFightModes from "@/src/data/world/fight-modes.json";
import generatedStatMods from "@/src/data/world/stat-mods.json";
import crossroadIds from "@/src/data/world/crossroad-ids.json";
import categoriesJson from "@/src/data/world/categories.json";
import campaignRouteJson from "@/src/data/world/campaign-route.json";
import { createDetailTdk } from "@/src/seo/tdk";

export const stagesReferenceData = generatedWorld.stages.map((stage) => ({
  ...stage,
  ...(generatedStageDetails.find((detail) => detail.id === stage.id) || {}),
  addressBar: stage.id,
  actLabel: stage.act === "0" ? "Endless" : `Act ${stage.act}`,
  floorLabel: stage.act === "0" ? "Endless map" : `Floor ${stage.floor}`,
  seo: createDetailTdk({
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

export const eventsReferenceData = generatedWorld.events.map((event) => ({
  ...event,
  ...(generatedEventDetails.find((detail) => detail.id === event.id) || {}),
  addressBar: event.id,
  kind: event.isFight === "Yes" ? "Fight event" : "Decision event",
  seo: createDetailTdk({
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
export const campaignRoute = campaignRouteJson;

export const crossroadsReferenceData = generatedWorld.crossroads.map((crossroad, index) => ({
  ...crossroad,
  id: crossroadIds[index],
  addressBar: crossroad.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
}));

export function getReferenceStage(addressBar) {
  return stagesReferenceData.find((stage) => stage.addressBar === addressBar);
}

export function getReferenceEvent(addressBar) {
  return eventsReferenceData.find((event) => event.addressBar === addressBar);
}

export function getReferenceCrossroad(addressBar) {
  return crossroadsReferenceData.find((crossroad) => crossroad.addressBar === addressBar);
}

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
