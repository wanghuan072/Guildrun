import { guidesData } from "@/src/lib/content/guides";
import { heroesData } from "@/src/lib/content/heroes";
import { enemiesData, statusEffectsData } from "@/src/lib/content/wiki";
import { eventsReferenceData, stagesReferenceData } from "@/src/lib/content/world";
import { updatesData } from "@/src/lib/content/updates";
import { siteConfig } from "@/src/seo/siteConfig";

function latestDate(...dates) {
  const valid = dates
    .filter(Boolean)
    .map((value) => new Date(value))
    .filter((date) => !Number.isNaN(date.getTime()));
  if (!valid.length) return new Date("2026-07-25");
  return new Date(Math.max(...valid.map((date) => date.getTime())));
}

export default function sitemap() {
  const contentUpdated = latestDate(
    ...guidesData.flatMap((guide) => [guide.publishDate, guide.updatedDate]),
    ...updatesData.map((update) => update.publishDate),
  );

  const staticRoutes = [
    { path: "", priority: 1, lastModified: contentUpdated },
    { path: "/gameplay", priority: 0.9, lastModified: contentUpdated },
    { path: "/gameplay/growth-route", priority: 0.9, lastModified: contentUpdated },
    { path: "/wiki", priority: 0.85, lastModified: contentUpdated },
    { path: "/wiki/items", priority: 0.8, lastModified: contentUpdated },
    { path: "/wiki/relics", priority: 0.8, lastModified: contentUpdated },
    { path: "/wiki/enemies", priority: 0.8, lastModified: contentUpdated },
    { path: "/wiki/status-effects", priority: 0.8, lastModified: contentUpdated },
    { path: "/heroes", priority: 0.9, lastModified: contentUpdated },
    { path: "/world", priority: 0.85, lastModified: contentUpdated },
    { path: "/world/stages", priority: 0.8, lastModified: contentUpdated },
    { path: "/world/events", priority: 0.8, lastModified: contentUpdated },
    { path: "/world/crossroads", priority: 0.7, lastModified: contentUpdated },
    { path: "/world/fight-modes", priority: 0.8, lastModified: contentUpdated },
    { path: "/world/stat-mods", priority: 0.7, lastModified: contentUpdated },
    { path: "/guides", priority: 0.9, lastModified: contentUpdated },
    { path: "/updates", priority: 0.85, lastModified: contentUpdated },
    { path: "/search", priority: 0.6, lastModified: contentUpdated },
    { path: "/release-date", priority: 0.8, lastModified: contentUpdated },
    { path: "/legal/privacy-policy", priority: 0.3, lastModified: contentUpdated },
    { path: "/legal/terms-of-service", priority: 0.3, lastModified: contentUpdated },
    { path: "/legal/copyright", priority: 0.3, lastModified: contentUpdated },
    { path: "/legal/about-us", priority: 0.4, lastModified: contentUpdated },
    { path: "/legal/contact-us", priority: 0.4, lastModified: contentUpdated },
  ];

  const dynamicRoutes = [
    ...heroesData.map((entry) => ({
      path: `/heroes/${entry.addressBar}`,
      priority: 0.75,
      lastModified: contentUpdated,
      changeFrequency: "monthly",
    })),
    ...enemiesData.map((entry) => ({
      path: `/wiki/enemies/${entry.addressBar}`,
      priority: 0.7,
      lastModified: contentUpdated,
      changeFrequency: "monthly",
    })),
    ...statusEffectsData.map((entry) => ({
      path: `/wiki/status-effects/${entry.addressBar}`,
      priority: 0.7,
      lastModified: contentUpdated,
      changeFrequency: "monthly",
    })),
    ...stagesReferenceData.map((entry) => ({
      path: `/world/stages/${entry.addressBar}`,
      priority: 0.65,
      lastModified: contentUpdated,
      changeFrequency: "monthly",
    })),
    ...eventsReferenceData.map((entry) => ({
      path: `/world/events/${entry.addressBar}`,
      priority: 0.65,
      lastModified: contentUpdated,
      changeFrequency: "monthly",
    })),
    ...updatesData.map((entry) => ({
      path: `/updates/${entry.addressBar}`,
      priority: 0.8,
      lastModified: new Date(entry.publishDate || contentUpdated),
      changeFrequency: "weekly",
    })),
    ...guidesData.map((entry) => ({
      path: `/guides/${entry.addressBar}`,
      priority: 0.9,
      lastModified: latestDate(entry.updatedDate, entry.publishDate, contentUpdated),
      changeFrequency: "monthly",
    })),
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route.path ? `${route.path}/` : "/", siteConfig.siteUrl).toString(),
      lastModified: route.lastModified,
      changeFrequency: route.path.startsWith("/updates") ? "weekly" : "monthly",
      priority: route.priority,
    })),
    ...dynamicRoutes.map((route) => ({
      url: new URL(`${route.path}/`, siteConfig.siteUrl).toString(),
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  ];
}
