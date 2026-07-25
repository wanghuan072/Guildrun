import updateSeeds from "@/src/data/updates/updates.json";
import patchSnapshot from "@/src/data/updates/patches.json";
import { createDetailTdk } from "@/src/seo/tdk";

export const updatesData = updateSeeds.map((update, index) => ({
  ...update,
  ledger: index === 0 && (!update.ledger || update.ledger.length === 0)
    ? patchSnapshot.sections
    : update.ledger,
  seo: createDetailTdk({
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

export function getUpdate(addressBar) {
  return updatesData.find((update) => update.addressBar === addressBar);
}
