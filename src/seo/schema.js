import { siteConfig } from "@/src/seo/siteConfig";

export function absoluteUrl(path) {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function breadcrumbSchema(entries) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  };
}

export function definedTermSchema({
  name,
  description,
  path,
  image,
  category,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name,
    description,
    url: absoluteUrl(path),
    image: image ? absoluteUrl(image) : undefined,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: category,
      url: siteConfig.siteUrl,
    },
  };
}

export function articleSchema({
  headline,
  description,
  path,
  image,
  datePublished,
  dateModified,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl(image || siteConfig.defaultImage),
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: "Guildrun Guide Team",
    },
  };
}

export function collectionPageSchema({ name, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
  };
}

export function webPageSchema({ name, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
  };
}

export function faqPageSchema(entries) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}
