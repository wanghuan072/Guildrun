import guideSeeds from "@/src/data/guides/guides.json";
import { createDetailTdk } from "@/src/seo/tdk";

export const guidesData = guideSeeds.map((guide) => ({
  ...guide,
  seo: createDetailTdk({
    h1: guide.title.replace(":", " -"),
    title: guide.title,
    description: `${guide.excerpt} Follow the step-by-step decisions, common mistakes, connected hero records, and practical build links for the current Guildrun Demo.`,
    keywords: [
      `Guildrun ${guide.shortTitle}`,
      ...guide.tags.slice(0, 3).map((tag) => `Guildrun ${tag}`),
    ],
  }),
}));

export function getGuide(addressBar) {
  return guidesData.find((guide) => guide.addressBar === addressBar);
}
