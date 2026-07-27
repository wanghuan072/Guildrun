import updateSeeds from "@/src/data/updates/updates.json";
import { defineDetailCollection } from "@/src/lib/content/collection";
import { defineTdk } from "@/src/seo/tdk";

export const updatesData = updateSeeds.map((update) => ({
  ...update,
  seo: defineTdk({
    h1: `Guildrun Update - ${update.title}`,
    title: `Guildrun Update - ${update.title}`,
    description: `${update.excerpt} Read the dated changes, affected systems, practical strategy impact, and linked Guildrun pages that may need a different plan.`,
    keywords: [
      "Guildrun update",
      update.version,
      update.updateType,
    ],
  }),
}));

export const updateCollection = defineDetailCollection({
  key: "updates",
  label: "Updates",
  basePath: "/updates",
  records: updatesData,
  priority: 0.8,
  changeFrequency: "weekly",
  metadataType: "article",
  image: (update) => update.imageUrl,
  search: (update, href) => ({
    id: `update-${update.addressBar}`,
    category: "Updates",
    title: update.title,
    href,
    excerpt: update.excerpt,
    keywords: [update.version, update.updateType],
    imageUrl: update.imageUrl,
  }),
});
