"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import statusSlugs from "@/src/data/wiki/status-slugs.json";

const explorerConfig = {
  items: {
    label: "Item",
    plural: "items",
    filterKey: "itemType",
    filterLabel: "item type",
    placeholder: "Search name, stat, status, or effect…",
    thirdColumn: "Price",
    thirdValue: (record) => record.price === "Not sold" ? "—" : record.price,
    tags: (record) => record.tags.length ? record.tags : [record.itemType],
  },
  relics: {
    label: "Relic",
    plural: "relics",
    filterKey: "category",
    filterLabel: "category",
    placeholder: "Search name, trigger, status, or reward…",
    thirdColumn: "Category",
    thirdValue: (record) => record.category,
    tags: (record) => record.tags,
  },
};

export default function CollectibleExplorer({ records, variant }) {
  const config = explorerConfig[variant];
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialQuery = searchParams.get("search") || searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [rarity, setRarity] = useState("All");
  const [secondaryFilter, setSecondaryFilter] = useState("All");

  useEffect(() => {
    function restoreQuery() {
      const params = new URLSearchParams(window.location.search);
      setQuery(params.get("search") || params.get("q") || "");
    }

    window.addEventListener("popstate", restoreQuery);
    return () => window.removeEventListener("popstate", restoreQuery);
  }, []);

  const rarities = useMemo(
    () => ["All", ...new Set(records.map((record) => record.rarity))],
    [records],
  );
  const secondaryOptions = useMemo(
    () => [
      "All",
      ...new Set(records.map((record) => record[config.filterKey])),
    ],
    [config.filterKey, records],
  );
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const slugNeedle = needle.replace(/[_\s]+/g, "-");

    return records.filter((record) => {
      const haystack = [
        record.name,
        record.addressBar,
        record.effect,
        ...record.tags,
      ].join(" ").toLowerCase();
      const matchesQuery =
        !needle ||
        haystack.includes(needle) ||
        record.addressBar.toLowerCase().includes(slugNeedle);

      return (
        matchesQuery &&
        (rarity === "All" || record.rarity === rarity) &&
        (
          secondaryFilter === "All" ||
          record[config.filterKey] === secondaryFilter
        )
      );
    });
  }, [config.filterKey, query, rarity, records, secondaryFilter]);

  useEffect(() => {
    const slug = query.trim().toLowerCase().replace(/[_\s]+/g, "-");
    if (!slug || filtered.length === 0) return;

    const exact = filtered.find(
      (record) => record.addressBar.toLowerCase() === slug,
    );
    const target = exact || (filtered.length === 1 ? filtered[0] : null);
    if (!target) return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(target.addressBar)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [filtered, query]);

  function updateQuery(nextValue) {
    setQuery(nextValue);
    const params = new URLSearchParams(searchParams.toString());
    const trimmed = nextValue.trim();

    if (trimmed) {
      params.set("search", trimmed);
      params.delete("q");
    } else {
      params.delete("search");
      params.delete("q");
    }

    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }

  return (
    <>
      <div
        className="directory-toolbar"
        aria-label={`Filter Guildrun ${config.plural}`}
      >
        <input
          aria-label={`Search ${config.plural}`}
          onChange={(event) => updateQuery(event.target.value)}
          placeholder={config.placeholder}
          type="search"
          value={query}
        />
        <select
          aria-label="Filter by rarity"
          onChange={(event) => setRarity(event.target.value)}
          value={rarity}
        >
          {rarities.map((entry) => <option key={entry}>{entry}</option>)}
        </select>
        <select
          aria-label={`Filter by ${config.filterLabel}`}
          onChange={(event) => setSecondaryFilter(event.target.value)}
          value={secondaryFilter}
        >
          {secondaryOptions.map((entry) => (
            <option key={entry}>{entry}</option>
          ))}
        </select>
        <span className="directory-status">
          {filtered.length} of {records.length}
        </span>
      </div>

      <div className="table-scroll">
        <table className="reference-table directory-table">
          <thead>
            <tr>
              <th>{config.label}</th>
              <th>Rarity</th>
              <th>{config.thirdColumn}</th>
              <th>Mechanics</th>
              <th>Effect</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((record) => (
              <tr key={record.id}>
                <td id={record.addressBar}>
                  <span className="database-name">
                    <span>
                      <Image
                        src={record.imageUrl}
                        alt=""
                        fill
                        sizes="52px"
                      />
                    </span>
                    <strong>{record.name}</strong>
                  </span>
                </td>
                <td>
                  <span
                    className={`rarity-pill rarity-${record.rarity.toLowerCase()}`}
                  >
                    {record.rarity}
                  </span>
                </td>
                <td>{config.thirdValue(record)}</td>
                <td>
                  <span className="tag-links">
                    {config.tags(record).slice(0, 4).map((tag) => {
                      const slug = statusSlugs[tag];
                      return slug ? (
                        <Link
                          href={`/wiki/status-effects/${slug}/`}
                          key={tag}
                        >
                          {tag}
                        </Link>
                      ) : (
                        <span key={tag}>{tag}</span>
                      );
                    })}
                  </span>
                </td>
                <td className="database-effect">{record.effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
