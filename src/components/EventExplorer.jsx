"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function EventExplorer({ events }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("All");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return events.filter((event) => (
      (!needle || `${event.name} ${event.title || ""} ${event.id}`.toLowerCase().includes(needle)) &&
      (kind === "All" || event.kind === kind)
    ));
  }, [events, query, kind]);

  return (
    <>
      <div className="directory-toolbar" aria-label="Filter Guildrun events">
        <input aria-label="Search events" onChange={(event) => setQuery(event.target.value)} placeholder="Search event name or record ID…" type="search" value={query} />
        <select aria-label="Filter event kind" onChange={(event) => setKind(event.target.value)} value={kind}>
          {["All", "Decision event", "Fight event"].map((entry) => <option key={entry}>{entry}</option>)}
        </select>
        <span className="directory-status">{filtered.length} of {events.length}</span>
      </div>
      <div className="table-scroll">
        <table className="reference-table directory-table">
          <thead><tr><th>Event</th><th>Kind</th><th>Paths</th><th>Recorded choices</th><th>Reached via</th></tr></thead>
          <tbody>
            {filtered.map((event) => (
              <tr key={event.id}>
                <td>
                  <Link className="event-table-link" href={`/world/events/${event.addressBar}/`}>
                    {event.imageUrl ? (
                      <span className="event-table-link__art">
                        <Image src={event.imageUrl} alt="" fill sizes="58px" />
                      </span>
                    ) : null}
                    <span><strong>{event.name}</strong><small> #{event.id}</small></span>
                  </Link>
                </td>
                <td>{event.kind}</td>
                <td>{event.paths}</td>
                <td>{event.choices?.length || 0}</td>
                <td>{event.reachedVia?.map((route) => route.label).join(", ") || "Route event pool"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
