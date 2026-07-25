"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function StageExplorer({ stages }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [act, setAct] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const types = useMemo(() => ["All", ...new Set(stages.map((stage) => stage.stageType))], [stages]);
  const difficulties = useMemo(() => ["All", ...new Set(stages.map((stage) => stage.difficulty))], [stages]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return stages.filter((stage) => (
      (!needle || `${stage.name} ${stage.title || ""} ${stage.id}`.toLowerCase().includes(needle)) &&
      (type === "All" || stage.stageType === type) &&
      (act === "All" || stage.actLabel === act) &&
      (difficulty === "All" || stage.difficulty === difficulty)
    ));
  }, [stages, query, type, act, difficulty]);

  return (
    <>
      <div className="directory-toolbar" aria-label="Filter Guildrun stages">
        <input aria-label="Search stages" onChange={(event) => setQuery(event.target.value)} placeholder="Search stage name or record ID…" type="search" value={query} />
        <select aria-label="Filter stage type" onChange={(event) => setType(event.target.value)} value={type}>
          {types.map((entry) => <option key={entry}>{entry}</option>)}
        </select>
        <select aria-label="Filter act" onChange={(event) => setAct(event.target.value)} value={act}>
          {["All", "Act 1", "Act 2", "Endless"].map((entry) => <option key={entry}>{entry}</option>)}
        </select>
        <select aria-label="Filter difficulty" onChange={(event) => setDifficulty(event.target.value)} value={difficulty}>
          {difficulties.map((entry) => (
            <option key={entry} value={entry}>{entry === "All" ? entry : `Difficulty ${entry}`}</option>
          ))}
        </select>
        <span className="directory-status">{filtered.length} of {stages.length}</span>
      </div>
      <div className="table-scroll">
        <table className="reference-table directory-table">
          <thead><tr><th>Stage</th><th>Type</th><th>Act</th><th>Floor</th><th>Diff.</th><th>Enemies</th><th>EHP</th><th>EOff</th><th>Shards</th></tr></thead>
          <tbody>
            {filtered.map((stage) => (
              <tr key={stage.id}>
                <td><Link href={`/world/stages/${stage.addressBar}/`}><strong>{stage.name}</strong><small> #{stage.id}</small></Link></td>
                <td>{stage.stageType}</td>
                <td>{stage.actLabel}</td>
                <td>{stage.floor}</td>
                <td>{stage.difficulty}</td>
                <td>{stage.enemyCount}</td>
                <td>{Number(stage.effectiveHealth).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                <td>{Number(stage.effectiveOffense).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                <td>{stage.gold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
