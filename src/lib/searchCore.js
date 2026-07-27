export const searchCategories = [
  "All",
  "Guides",
  "Heroes",
  "Updates",
  "Enemies",
  "Status Effects",
  "Events",
  "Stages",
  "Items",
  "Relics",
  "Specializations",
  "Pages",
];

export function unpackSearchIndex(rows) {
  return rows.map(([
    id,
    category,
    title,
    href,
    excerpt,
    keywords,
    imageUrl,
  ]) => {
    const haystack = [title, excerpt, category, ...keywords]
      .join(" ")
      .toLowerCase();

    return {
      id,
      category,
      title,
      href,
      excerpt,
      keywords,
      imageUrl,
      haystack,
    };
  });
}

export function searchSite(records, query, category = "All", limit = 60) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  const tokens = needle.split(/\s+/).filter(Boolean);

  return records
    .filter((item) => category === "All" || item.category === category)
    .map((item) => {
      let score = 0;
      const title = item.title.toLowerCase();
      if (title === needle) score += 100;
      else if (title.startsWith(needle)) score += 60;
      else if (title.includes(needle)) score += 40;
      if (tokens.every((token) => item.haystack.includes(token))) score += 20;
      if (item.keywords.some((keyword) => String(keyword).toLowerCase().includes(needle))) {
        score += 15;
      }
      if (item.excerpt.toLowerCase().includes(needle)) score += 8;
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}
