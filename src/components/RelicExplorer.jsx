"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import statusSlugs from "@/src/data/wiki/status-slugs.json";

export default function RelicExplorer({ relics }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialQuery = searchParams.get("search") || searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [rarity, setRarity] = useState("All");
  const [category, setCategory] = useState("All");

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
    () => ["All", ...new Set(relics.map((relic) => relic.rarity))],
    [relics],
  );
  const categories = useMemo(
    () => ["All", ...new Set(relics.map((relic) => relic.category))],
    [relics],
  );
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const slugNeedle = needle.replace(/[_\s]+/g, "-");
    return relics.filter((relic) => {
      const haystack = `${relic.name} ${relic.addressBar} ${relic.effect} ${relic.tags.join(" ")}`.toLowerCase();
      const matchesQuery =
        !needle ||
        haystack.includes(needle) ||
        relic.addressBar.toLowerCase().includes(slugNeedle);
      return (
        matchesQuery &&
        (rarity === "All" || relic.rarity === rarity) &&
        (category === "All" || relic.category === category)
      );
    });
  }, [relics, query, rarity, category]);

  useEffect(() => {
    const slug = query.trim().toLowerCase().replace(/[_\s]+/g, "-");
    if (!slug || filtered.length === 0) return;
    const exact = filtered.find((relic) => relic.addressBar.toLowerCase() === slug);
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
      <div className="directory-toolbar" aria-label="Filter Guildrun relics">
        <input
          aria-label="Search relics"
          onChange={(event) => updateQuery(event.target.value)}
          placeholder="Search name, trigger, status, or reward…"
          type="search"
          value={query}
        />
        <select aria-label="Filter by rarity" onChange={(event) => setRarity(event.target.value)} value={rarity}>
          {rarities.map((entry) => <option key={entry}>{entry}</option>)}
        </select>
        <select aria-label="Filter by category" onChange={(event) => setCategory(event.target.value)} value={category}>
          {categories.map((entry) => <option key={entry}>{entry}</option>)}
        </select>
        <span className="directory-status">{filtered.length} of {relics.length}</span>
      </div>

      <div className="table-scroll">
        <table className="reference-table directory-table">
          <thead>
            <tr><th>Relic</th><th>Rarity</th><th>Category</th><th>Mechanics</th><th>Effect</th></tr>
          </thead>
          <tbody>
            {filtered.map((relic) => (
              <tr key={relic.id}>
                <td id={relic.addressBar}>
                  <span className="database-name">
                    <span><Image src={relic.imageUrl} alt="" fill sizes="52px" /></span>
                    <strong>{relic.name}</strong>
                  </span>
                </td>
                <td><span className={`rarity-pill rarity-${relic.rarity.toLowerCase()}`}>{relic.rarity}</span></td>
                <td>{relic.category}</td>
                <td>
                  <span className="tag-links">
                    {relic.tags.slice(0, 4).map((tag) => {
                      const slug = statusSlugs[tag];
                      return slug
                        ? <Link href={`/wiki/status-effects/${slug}/`} key={tag}>{tag}</Link>
                        : <span key={tag}>{tag}</span>;
                    })}
                  </span>
                </td>
                <td className="database-effect">{relic.effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
