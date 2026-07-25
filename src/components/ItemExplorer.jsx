"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import statusSlugs from "@/src/data/wiki/status-slugs.json";

export default function ItemExplorer({ items }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialQuery = searchParams.get("search") || searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [rarity, setRarity] = useState("All");
  const [type, setType] = useState("All");

  useEffect(() => {
    function restoreQuery() {
      const params = new URLSearchParams(window.location.search);
      setQuery(params.get("search") || params.get("q") || "");
    }
    window.addEventListener("popstate", restoreQuery);
    return () => window.removeEventListener("popstate", restoreQuery);
  }, []);

  useEffect(() => {
    const next = searchParams.get("search") || searchParams.get("q") || "";
    setQuery(next);
  }, [searchParams]);

  const rarities = useMemo(
    () => ["All", ...new Set(items.map((item) => item.rarity))],
    [items],
  );
  const types = useMemo(
    () => ["All", ...new Set(items.map((item) => item.itemType))],
    [items],
  );
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const slugNeedle = needle.replace(/[_\s]+/g, "-");
    return items.filter((item) => {
      const haystack = `${item.name} ${item.addressBar} ${item.effect} ${item.tags.join(" ")}`.toLowerCase();
      const matchesQuery =
        !needle ||
        haystack.includes(needle) ||
        item.addressBar.toLowerCase().includes(slugNeedle);
      return (
        matchesQuery &&
        (rarity === "All" || item.rarity === rarity) &&
        (type === "All" || item.itemType === type)
      );
    });
  }, [items, query, rarity, type]);

  useEffect(() => {
    const slug = query.trim().toLowerCase().replace(/[_\s]+/g, "-");
    if (!slug || filtered.length === 0) return;
    const exact = filtered.find((item) => item.addressBar.toLowerCase() === slug);
    const target = exact || (filtered.length === 1 ? filtered[0] : null);
    if (!target) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(target.addressBar)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [query, filtered]);

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
      <div className="directory-toolbar" aria-label="Filter Guildrun items">
        <input
          aria-label="Search items"
          onChange={(event) => updateQuery(event.target.value)}
          placeholder="Search name, stat, status, or effect…"
          type="search"
          value={query}
        />
        <select aria-label="Filter by rarity" onChange={(event) => setRarity(event.target.value)} value={rarity}>
          {rarities.map((entry) => <option key={entry}>{entry}</option>)}
        </select>
        <select aria-label="Filter by item type" onChange={(event) => setType(event.target.value)} value={type}>
          {types.map((entry) => <option key={entry}>{entry}</option>)}
        </select>
        <span className="directory-status">{filtered.length} of {items.length}</span>
      </div>

      <div className="table-scroll">
        <table className="reference-table directory-table">
          <thead>
            <tr><th>Item</th><th>Rarity</th><th>Price</th><th>Stats / mechanics</th><th>Effect</th></tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td id={item.addressBar}>
                  <span className="database-name">
                    <span><Image src={item.imageUrl} alt="" fill sizes="52px" /></span>
                    <strong>{item.name}</strong>
                  </span>
                </td>
                <td><span className={`rarity-pill rarity-${item.rarity.toLowerCase()}`}>{item.rarity}</span></td>
                <td>{item.price === "Not sold" ? "—" : item.price}</td>
                <td>
                  <span className="tag-links">
                    {(item.tags.length ? item.tags : [item.itemType]).slice(0, 4).map((tag) => {
                      const slug = statusSlugs[tag];
                      return slug
                        ? <Link href={`/wiki/status-effects/${slug}/`} key={tag}>{tag}</Link>
                        : <span key={tag}>{tag}</span>;
                    })}
                  </span>
                </td>
                <td className="database-effect">{item.effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
