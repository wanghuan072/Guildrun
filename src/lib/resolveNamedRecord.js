/**
 * Resolve a human label to a data record by exact name, addressBar, or
 * startsWith / includes match (case-insensitive).
 */
export function resolveNamedRecord(list, label) {
  if (!label || !list?.length) return undefined;
  const needle = String(label).trim().toLowerCase();
  if (!needle) return undefined;

  const exactName = list.find((entry) => entry.name?.toLowerCase() === needle);
  if (exactName) return exactName;

  const exactSlug = list.find((entry) => entry.addressBar?.toLowerCase() === needle);
  if (exactSlug) return exactSlug;

  const startsWith = list.find(
    (entry) =>
      entry.name?.toLowerCase().startsWith(needle) ||
      entry.addressBar?.toLowerCase().startsWith(needle),
  );
  if (startsWith) return startsWith;

  return list.find(
    (entry) =>
      entry.name?.toLowerCase().includes(needle) ||
      entry.addressBar?.toLowerCase().includes(needle),
  );
}

export function wikiItemHref(addressBar) {
  return `/wiki/items/?search=${encodeURIComponent(addressBar)}`;
}

export function wikiRelicHref(addressBar) {
  return `/wiki/relics/?search=${encodeURIComponent(addressBar)}`;
}
