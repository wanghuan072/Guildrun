import { createMetadata } from "@/src/seo/siteConfig";

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function defineDetailCollection({
  key,
  label,
  basePath,
  records,
  priority,
  changeFrequency = "monthly",
  metadataType = "website",
  image = (record) => record.imageUrl,
  updatedDate = (record) => record.updatedDate || record.publishDate,
  search,
}) {
  const recordIndex = new Map();

  for (const record of records) {
    if (!record.addressBar) {
      throw new Error(`${label} contains a record without addressBar`);
    }
    if (recordIndex.has(record.addressBar)) {
      throw new Error(`${label} contains duplicate addressBar: ${record.addressBar}`);
    }
    recordIndex.set(record.addressBar, record);
  }

  const collection = {
    key,
    label,
    basePath,
    records,
    priority,
    changeFrequency,
    get(addressBar) {
      return recordIndex.get(addressBar);
    },
    href(recordOrSlug) {
      const addressBar =
        typeof recordOrSlug === "string"
          ? recordOrSlug
          : recordOrSlug.addressBar;
      return `${basePath}/${addressBar}/`;
    },
    staticParams() {
      return records.map(({ addressBar }) => ({ addressBar }));
    },
    metadata(record) {
      return createMetadata({
        ...record.seo,
        path: collection.href(record),
        image: image(record),
        type: metadataType,
      });
    },
    sitemap(record, fallbackDate) {
      return {
        path: collection.href(record),
        priority,
        changeFrequency,
        lastModified: updatedDate(record) || fallbackDate,
      };
    },
    search(record) {
      return search(record, collection.href(record));
    },
  };

  return Object.freeze(collection);
}
