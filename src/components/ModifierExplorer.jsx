"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function ModifierExplorer({ modifiers, classes }) {
  const [query, setQuery] = useState("");
  const [heroClass, setHeroClass] = useState("All");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return modifiers.filter((modifier) => {
      const matchesClass =
        heroClass === "All" || modifier.classes.includes(heroClass);
      const matchesQuery =
        !needle ||
        [
          modifier.name,
          modifier.effect,
          ...modifier.classes,
          ...modifier.heroes.map((hero) => hero.name),
        ]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      return matchesClass && matchesQuery;
    });
  }, [modifiers, query, heroClass]);

  return (
    <>
      <div className="directory-toolbar modifier-toolbar" aria-label="Filter Rank Modifiers">
        <input
          aria-label="Search Rank Modifiers"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search effect, trigger, class, or hero…"
          type="search"
          value={query}
        />
        <select
          aria-label="Filter by class"
          onChange={(event) => setHeroClass(event.target.value)}
          value={heroClass}
        >
          <option>All</option>
          {classes.map((entry) => <option key={entry}>{entry}</option>)}
        </select>
        <span className="directory-status">{filtered.length} of {modifiers.length}</span>
      </div>

      {filtered.length ? (
        <div className="modifier-ledger">
          {filtered.map((modifier) => (
            <article className="modifier-ledger__row" id={modifier.id} key={modifier.id}>
              <div className="modifier-ledger__identity">
                <span>{modifier.classes.join(" / ") || "Shared pool"}</span>
                <h2>{modifier.name}</h2>
              </div>
              <p>{modifier.effect}</p>
              <div className="modifier-ledger__heroes" aria-label={`Heroes with ${modifier.name}`}>
                {modifier.heroes.map((hero) => (
                  <Link href={hero.href} key={hero.name}>{hero.name}</Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="directory-empty">
          <strong>No Rank Modifiers match these filters.</strong>
          <span>Clear the search or choose another class to reopen the pool.</span>
        </div>
      )}
    </>
  );
}
