"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const classIcons = {
  Assassin: "◆",
  Duelist: "⚔",
  Mage: "◈",
  Mystic: "♢",
  Tank: "⬢",
  Vanguard: "♜",
  Warrior: "✥",
};

const keywordIcons = {
  Backup: "⚑",
  Burn: "♨",
  Crit: "✦",
  Frost: "❄",
  Omnivamp: "♥",
  Poison: "✣",
  Rush: "➤",
  Shards: "♦",
  Shields: "⬡",
  Stall: "⌛",
};

const keywordSlugs = {
  Backup: "backup",
  Burn: "burn",
  Frost: "frost",
  Omnivamp: "omnivamp",
  Poison: "poison",
  Rush: "rush",
  Shields: "shields",
  Stall: "stall",
};

const classColors = {
  Assassin: "#a56cff",
  Duelist: "#df5f54",
  Mage: "#7c75ff",
  Mystic: "#59a8e8",
  Tank: "#9ba7ad",
  Vanguard: "#72b869",
  Warrior: "#e09b42",
};

function toggleValue(current, value) {
  return current.includes(value)
    ? current.filter((entry) => entry !== value)
    : [...current, value];
}

export default function HeroExplorer({ heroes, classes }) {
  const [query, setQuery] = useState("");
  const [keywordQuery, setKeywordQuery] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedAttacks, setSelectedAttacks] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [includeSecondary, setIncludeSecondary] = useState(true);
  const [sortBy, setSortBy] = useState("Name");

  const keywords = useMemo(
    () => [...new Set(heroes.flatMap((hero) => hero.keywords))].sort(),
    [heroes],
  );
  const visibleKeywords = keywords.filter((keyword) =>
    keyword.toLowerCase().includes(keywordQuery.trim().toLowerCase()),
  );
  const classCounts = useMemo(
    () => Object.fromEntries(classes.map((heroClass) => [
      heroClass,
      heroes.filter((hero) => (
        includeSecondary
          ? hero.classes.includes(heroClass)
          : hero.classes[0] === heroClass
      )).length,
    ])),
    [classes, heroes, includeSecondary],
  );
  const attackCounts = useMemo(
    () => Object.fromEntries(["Melee", "Ranged"].map((type) => [
      type,
      heroes.filter((hero) => hero.attackType === type).length,
    ])),
    [heroes],
  );
  const keywordCounts = useMemo(
    () => Object.fromEntries(keywords.map((keyword) => [
      keyword,
      heroes.filter((hero) => hero.keywords.includes(keyword)).length,
    ])),
    [heroes, keywords],
  );
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return heroes
      .filter((hero) => {
        const consideredClasses = includeSecondary ? hero.classes : hero.classes.slice(0, 1);
        return (
          (!needle || `${hero.name} ${hero.title} ${hero.guild} ${hero.role} ${hero.keywords.join(" ")}`.toLowerCase().includes(needle)) &&
          (!selectedClasses.length || selectedClasses.some((heroClass) => consideredClasses.includes(heroClass))) &&
          (!selectedAttacks.length || selectedAttacks.includes(hero.attackType)) &&
          (!selectedKeywords.length || selectedKeywords.every((keyword) => hero.keywords.includes(keyword)))
        );
      })
      .sort((left, right) => {
        if (sortBy === "HP") return Number(right.stats["Max HP"]) - Number(left.stats["Max HP"]);
        if (sortBy === "Damage") return Number(right.stats["Base Attack Damage"]) - Number(left.stats["Base Attack Damage"]);
        if (sortBy === "Defense") return Number(right.stats.Defense) - Number(left.stats.Defense);
        if (sortBy === "Range") return Number(right.stats["Attack Range"]) - Number(left.stats["Attack Range"]);
        return left.name.localeCompare(right.name);
      });
  }, [
    heroes,
    includeSecondary,
    query,
    selectedAttacks,
    selectedClasses,
    selectedKeywords,
    sortBy,
  ]);

  function clearFilters() {
    setQuery("");
    setKeywordQuery("");
    setSelectedClasses([]);
    setSelectedAttacks([]);
    setSelectedKeywords([]);
    setIncludeSecondary(true);
    setSortBy("Name");
  }

  return (
    <div className="hero-explorer">
      <aside className="hero-filter-panel">
        <div className="hero-filter-heading">
          <strong>Filters</strong>
          <span>{filtered.length} results</span>
          <button onClick={clearFilters} type="button">Clear</button>
        </div>

        <fieldset className="hero-filter-group">
          <legend><span>Class</span><small>{selectedClasses.length || classes.length}</small></legend>
          <label className="hero-filter-toggle">
            <input
              checked={includeSecondary}
              onChange={(event) => setIncludeSecondary(event.target.checked)}
              type="checkbox"
            />
            <span>Include secondary classes</span>
          </label>
          {classes.map((heroClass) => (
            <label className="hero-filter-option" key={heroClass}>
              <input
                checked={selectedClasses.includes(heroClass)}
                onChange={() => setSelectedClasses((current) => toggleValue(current, heroClass))}
                type="checkbox"
              />
              <i style={{ color: classColors[heroClass] }}>{classIcons[heroClass]}</i>
              <span>{heroClass}</span>
              <small>{classCounts[heroClass]}</small>
            </label>
          ))}
        </fieldset>

        <fieldset className="hero-filter-group">
          <legend><span>Attack</span><small>{selectedAttacks.length || 2}</small></legend>
          {["Melee", "Ranged"].map((type) => (
            <label className="hero-filter-option" key={type}>
              <input
                checked={selectedAttacks.includes(type)}
                onChange={() => setSelectedAttacks((current) => toggleValue(current, type))}
                type="checkbox"
              />
              <i>{type === "Melee" ? "⚔" : "➶"}</i>
              <span>{type}</span>
              <small>{attackCounts[type]}</small>
            </label>
          ))}
        </fieldset>

        <fieldset className="hero-filter-group">
          <legend><span>Keyword</span><small>{selectedKeywords.length || keywords.length}</small></legend>
          <input
            aria-label="Find a hero keyword"
            className="hero-keyword-search"
            onChange={(event) => setKeywordQuery(event.target.value)}
            placeholder="Find keyword…"
            type="search"
            value={keywordQuery}
          />
          <div className="hero-filter-keywords">
            {visibleKeywords.map((keyword) => (
              <label className="hero-filter-option" key={keyword}>
                <input
                  checked={selectedKeywords.includes(keyword)}
                  onChange={() => setSelectedKeywords((current) => toggleValue(current, keyword))}
                  type="checkbox"
                />
                <i>{keywordIcons[keyword] || "◇"}</i>
                <span>{keyword}</span>
                <small>{keywordCounts[keyword]}</small>
              </label>
            ))}
          </div>
        </fieldset>
      </aside>

      <div className="hero-catalog">
        <div className="hero-catalog-toolbar">
          <input
            aria-label="Search heroes"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search hero, guild, role, or effect…"
            type="search"
            value={query}
          />
          <select aria-label="Sort heroes" onChange={(event) => setSortBy(event.target.value)} value={sortBy}>
            {["Name", "HP", "Damage", "Defense", "Range"].map((entry) => (
              <option key={entry} value={entry}>Sort: {entry}</option>
            ))}
          </select>
          <span>{filtered.length} / {heroes.length}</span>
        </div>

        {filtered.length ? (
          <div className="hero-card-grid">
            {filtered.map((hero) => {
              const primaryClass = hero.classes[0];
              return (
                <article
                  className="hero-catalog-card"
                  key={hero.id}
                  style={{ "--hero-accent": classColors[primaryClass] }}
                >
                  <Link
                    aria-label={`Open ${hero.name} hero dossier`}
                    className="hero-card-frame"
                    href={`/heroes/${hero.addressBar}/`}
                  >
                    <span className="hero-card-frame__inner">
                      <Image
                        src={hero.splashUrl || hero.imageUrl}
                        alt={hero.imageAlt}
                        fill
                        sizes="(max-width: 768px) 44vw, (max-width: 1024px) 24vw, 190px"
                      />
                    </span>
                  </Link>
                  <div className="hero-card-copy">
                    <small>{hero.guild}</small>
                    <h2><Link href={`/heroes/${hero.addressBar}/`}>{hero.name}</Link></h2>
                    <div className="hero-card-classline">
                      {hero.classes.map((heroClass) => (
                        <span key={heroClass} style={{ color: classColors[heroClass] }}>
                          {classIcons[heroClass]} {heroClass}
                        </span>
                      ))}
                    </div>
                    <p>{hero.role}</p>
                    <div className="hero-card-keywords">
                      {hero.keywords.slice(0, 3).map((keyword) => (
                        keywordSlugs[keyword]
                          ? <Link href={`/wiki/status-effects/${keywordSlugs[keyword]}/`} key={keyword}>{keyword}</Link>
                          : <span key={keyword}>{keyword}</span>
                      ))}
                    </div>
                    <dl>
                      <div><dt>HP</dt><dd>{hero.stats["Max HP"]}</dd></div>
                      <div><dt>DMG</dt><dd>{hero.stats["Base Attack Damage"]}</dd></div>
                      <div><dt>RNG</dt><dd>{hero.stats["Attack Range"]}</dd></div>
                    </dl>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="hero-catalog-empty">
            <strong>No heroes match these filters.</strong>
            <p>Remove one class or keyword condition to widen the roster.</p>
            <button onClick={clearFilters} type="button">Reset filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
