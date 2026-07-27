import dataset from "@/src/data/dataset.json";
import { detailCollections } from "@/src/lib/content/detailRegistry";
import { siteConfig } from "@/src/seo/siteConfig";

const staticRoutes = [
  ["", 1],
  ["/gameplay", 0.9],
  ["/gameplay/growth-route", 0.9],
  ["/gameplay/mastery-unlocks", 0.85],
  ["/gameplay/stats", 0.85],
  ["/wiki", 0.85],
  ["/wiki/items", 0.8],
  ["/wiki/relics", 0.8],
  ["/wiki/enemies", 0.8],
  ["/wiki/status-effects", 0.8],
  ["/wiki/rank-modifiers", 0.8],
  ["/heroes", 0.9],
  ["/heroes/classes", 0.8],
  ["/heroes/guilds", 0.8],
  ["/world", 0.85],
  ["/world/stages", 0.8],
  ["/world/events", 0.8],
  ["/world/crossroads", 0.7],
  ["/world/fight-modes", 0.8],
  ["/world/stat-mods", 0.7],
  ["/guides", 0.9],
  ["/updates", 0.85],
  ["/search", 0.6],
  ["/release-date", 0.8],
  ["/legal/privacy-policy", 0.3],
  ["/legal/terms-of-service", 0.3],
  ["/legal/copyright", 0.3],
  ["/legal/about-us", 0.4],
  ["/legal/contact-us", 0.4],
];

function absoluteRoute(path) {
  return new URL(path ? `${path}/` : "/", siteConfig.siteUrl).toString();
}

export default function sitemap() {
  const dynamicRoutes = detailCollections.flatMap((collection) =>
    collection.records.map((record) =>
      collection.sitemap(record, dataset.updatedDate),
    ),
  );

  return [
    ...staticRoutes.map(([path, priority]) => ({
      url: absoluteRoute(path),
      lastModified: dataset.updatedDate,
      changeFrequency: path === "/updates" ? "weekly" : "monthly",
      priority,
    })),
    ...dynamicRoutes.map((route) => ({
      url: new URL(route.path, siteConfig.siteUrl).toString(),
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  ];
}
