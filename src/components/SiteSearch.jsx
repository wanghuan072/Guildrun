"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  searchCategories,
  searchSite,
  unpackSearchIndex,
} from "@/src/lib/searchCore";
import dataset from "@/src/data/dataset.json";

export default function SiteSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialQuery = searchParams.get("q") || searchParams.get("search") || "";
  const initialCategory = searchParams.get("type") || "All";
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(
    searchCategories.includes(initialCategory) ? initialCategory : "All",
  );
  const [records, setRecords] = useState(null);
  const [indexStatus, setIndexStatus] = useState("idle");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const shouldLoadIndex =
    Boolean(query.trim()) && !records && indexStatus !== "error";

  useEffect(() => {
    function restoreSearch() {
      const params = new URLSearchParams(window.location.search);
      const nextType = params.get("type") || "All";
      setQuery(params.get("q") || params.get("search") || "");
      setCategory(searchCategories.includes(nextType) ? nextType : "All");
    }
    window.addEventListener("popstate", restoreSearch);
    return () => window.removeEventListener("popstate", restoreSearch);
  }, []);

  useEffect(() => {
    if (!shouldLoadIndex) return;

    let active = true;

    async function loadLocalIndex() {
      try {
        const response = await fetch("/search-index.json", {
          cache: "force-cache",
        });
        if (!response.ok) {
          throw new Error(`Search index returned ${response.status}`);
        }
        const rows = await response.json();
        if (!active) return;
        setRecords(unpackSearchIndex(rows));
        setIndexStatus("ready");
      } catch {
        if (active) setIndexStatus("error");
      }
    }

    loadLocalIndex();
    return () => {
      active = false;
    };
  }, [loadAttempt, shouldLoadIndex]);

  const results = useMemo(
    () => searchSite(records || [], query, category),
    [records, query, category],
  );

  function syncUrl(nextQuery, nextCategory) {
    const params = new URLSearchParams();
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    if (nextCategory && nextCategory !== "All") params.set("type", nextCategory);
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }

  return (
    <div className="site-search">
      <form
        className="site-search-form"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          syncUrl(query, category);
        }}
      >
        <label className="site-search-field">
          <span>Search Guildrun</span>
          <input
            aria-label="Search Guildrun guides and databases"
            onChange={(event) => {
              const value = event.target.value;
              setQuery(value);
              syncUrl(value, category);
            }}
            placeholder="Search heroes, items, relics, enemies, guides…"
            type="search"
            value={query}
          />
        </label>
        <label className="site-search-field site-search-field--type">
          <span>Type</span>
          <select
            aria-label="Filter by result type"
            onChange={(event) => {
              const value = event.target.value;
              setCategory(value);
              syncUrl(query, value);
            }}
            value={category}
          >
            {searchCategories.map((entry) => (
              <option key={entry} value={entry}>{entry}</option>
            ))}
          </select>
        </label>
      </form>

      {!query.trim() ? (
        <div className="site-search-empty">
          <p>
            Type a keyword to search the {dataset.gameVersion} guide and
            databases.
          </p>
          <div className="site-search-suggestions">
            {["Pimenta", "Poison", "Mandate", "Hydra", "Beginner", "Rank"].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => {
                  setQuery(term);
                  syncUrl(term, category);
                }}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      ) : indexStatus === "idle" ? (
        <div className="site-search-empty site-search-loading" role="status">
          <p>Loading the local {dataset.gameVersion} search index…</p>
        </div>
      ) : indexStatus === "error" ? (
        <div className="site-search-empty">
          <p>The local search index could not be loaded.</p>
          <button
            className="site-search-retry"
            type="button"
            onClick={() => {
              setIndexStatus("idle");
              setLoadAttempt((current) => current + 1);
            }}
          >
            Retry local search
          </button>
        </div>
      ) : (
        <>
          <p className="site-search-count">
            {results.length} result{results.length === 1 ? "" : "s"} for <strong>{query.trim()}</strong>
            {category !== "All" ? <> in {category}</> : null}
          </p>
          {results.length ? (
            <ul className="site-search-results">
              {results.map((result) => (
                <li key={result.id}>
                  <Link href={result.href}>
                    {result.imageUrl ? (
                      <span className="site-search-thumb">
                        <Image src={result.imageUrl} alt="" fill sizes="56px" />
                      </span>
                    ) : (
                      <span className="site-search-thumb is-empty" aria-hidden="true">◈</span>
                    )}
                    <span className="site-search-copy">
                      <small>{result.category}</small>
                      <strong>{result.title}</strong>
                      <span>{result.excerpt}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="site-search-empty">
              <p>No matches. Try a shorter keyword, a hero name, or a status like Burn.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
