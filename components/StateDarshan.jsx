"use client";
import { useState, useMemo } from "react";
import { liveSearchUrl } from "@/lib/catalog";
import LiveModal from "@/components/LiveModal";

export default function StateDarshan({ states }) {
  const [q, setQ] = useState("");
  const [watching, setWatching] = useState(null);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return states;
    return states.filter(
      (s) =>
        s.region.toLowerCase().includes(t) ||
        s.temple.toLowerCase().includes(t) ||
        s.city.toLowerCase().includes(t) ||
        s.deity.toLowerCase().includes(t)
    );
  }, [q, states]);

  return (
    <>
      <div className="state-search">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by state, temple, city or deity…"
          aria-label="Search darshan sites"
        />
        <span className="state-count">{filtered.length} of {states.length}</span>
      </div>

      <div className="grid grid-3">
        {filtered.map((s) => (
          <article className="card state-card reveal" key={s.region}>
            <div className="sc-top">
              <span className="state-badge">{s.region}</span>
              {s.channel && <span className="state-live"><span className="dot pulse" />LIVE</span>}
            </div>
            <h3>{s.temple}</h3>
            <div className="sc-meta">{s.deity} · {s.city}</div>
            {s.channel ? (
              <button className="btn btn-primary btn-sm btn-block" onClick={() => setWatching({ ...s, ritual: s.deity })}>
                ▶ Watch live darshan
              </button>
            ) : (
              <a
                className="btn btn-ghost btn-sm btn-block"
                href={liveSearchUrl(s.temple, s.region)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch live darshan ↗
              </a>
            )}
          </article>
        ))}
        {filtered.length === 0 && (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "var(--ink-soft)" }}>
            No darshan site matches “{q}”.
          </p>
        )}
      </div>

      {watching && <LiveModal item={watching} onClose={() => setWatching(null)} />}
    </>
  );
}
