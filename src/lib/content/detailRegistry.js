import { guideCollection } from "@/src/lib/content/guides";
import { heroCollection } from "@/src/lib/content/heroes";
import { updateCollection } from "@/src/lib/content/updates";
import {
  enemyCollection,
  statusEffectCollection,
} from "@/src/lib/content/wiki";
import {
  eventCollection,
  stageCollection,
} from "@/src/lib/content/world";

export const detailCollections = Object.freeze([
  guideCollection,
  heroCollection,
  updateCollection,
  enemyCollection,
  statusEffectCollection,
  eventCollection,
  stageCollection,
]);

export const detailCounts = Object.freeze(
  Object.fromEntries(
    detailCollections.map((collection) => [
      collection.key,
      collection.records.length,
    ]),
  ),
);
