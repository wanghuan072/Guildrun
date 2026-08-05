import guideSeeds from "@/src/data/guides/guides.json";
import { defineDetailCollection } from "@/src/lib/content/collection";
import { defineTdk } from "@/src/seo/tdk";

export const guidesData = guideSeeds.map((guide) => ({
  ...guide,
  seo: defineTdk({
    h1: guide.h1 || guide.title.replace(":", " -"),
    title: guide.seoTitle || guide.title,
    description:
      guide.seoDescription ||
      `${guide.excerpt} Follow the step-by-step decisions, common mistakes, connected hero records, and practical build links for the current Guildrun Demo.`,
    keywords:
      guide.seoKeywords || [
        `Guildrun ${guide.shortTitle}`,
        ...guide.tags.slice(0, 3).map((tag) => `Guildrun ${tag}`),
      ],
  }),
}));

export const guideCollection = defineDetailCollection({
  key: "guides",
  label: "Guides",
  basePath: "/guides",
  records: guidesData,
  priority: 0.9,
  changeFrequency: "monthly",
  metadataType: "article",
  image: (guide) => guide.imageUrl,
  search: (guide, href) => ({
    id: `guide-${guide.addressBar}`,
    category: "Guides",
    title: guide.shortTitle,
    href,
    excerpt: guide.excerpt,
    keywords: [guide.category, guide.gameVersion, ...(guide.tags || [])],
    imageUrl: guide.imageUrl,
  }),
});
