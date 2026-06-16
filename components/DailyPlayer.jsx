"use client";
import { useState } from "react";
import { toast } from "@/lib/toast";
import { TRACK_CATEGORIES } from "@/lib/catalog";

export default function DailyPlayer({ tracks }) {
  const [active, setActive] = useState("All");
  const [q, setQ] = useState("");
  const shown = tracks.filter(
    (t) => (active === "All" || t.cat === active) && (!q.trim() || `${t.t} ${t.sub}`.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div className="state-search" style={{ marginBottom: 18 }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search aarti, chalisa, mantra…" aria-label="Search devotional tracks" />
        <span className="state-count">{shown.length} of {tracks.length}</span>
      </div>
      <div className="chips" style={{ marginBottom: 22 }}>
        {TRACK_CATEGORIES.map((c) => (
          <button key={c} className={`chip ${active === c ? "active" : ""}`} onClick={() => setActive(c)}>{c}</button>
        ))}
      </div>
      <div className="player reveal">
        {shown.map((t) => (
          <div className="track-row" key={t.t} onClick={() => toast(`▶ Now playing: ${t.t}`)}>
            <button className="play" aria-label={`Play ${t.t}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </button>
            <div className="ti"><h4>{t.t}</h4><span>{t.cat} • {t.sub}</span></div>
            <div className="dur">{t.dur}</div>
          </div>
        ))}
        {shown.length === 0 && <p style={{ textAlign: "center", color: "var(--ink-soft)", padding: "18px" }}>No tracks match “{q}”.</p>}
      </div>
    </div>
  );
}
