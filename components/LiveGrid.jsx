"use client";
import { useState } from "react";
import { toast } from "@/lib/toast";
import LiveModal from "@/components/LiveModal";

export default function LiveGrid({ items }) {
  const [watching, setWatching] = useState(null);

  return (
    <>
      <div className="grid grid-3">
        {items.map((l) => (
          <article className="card live-card reveal" key={l.temple}>
            <button
              className="lc-thumb"
              onClick={() => (l.live ? setWatching(l) : toast("🔔 Reminder set for " + l.ritual))}
              aria-label={l.live ? `Watch ${l.temple} live` : `Remind me about ${l.temple}`}
            >
              <span className="om-big om">ॐ</span>
              {l.live && <span className="live-pill"><span className="dot pulse" />LIVE</span>}
              {l.live && <span className="lc-play">▶</span>}
            </button>
            <div className="lc-body">
              <h3>{l.temple}</h3>
              <div className="meta">{l.ritual} · {l.city}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="viewers">{l.live ? `👁 ${l.viewers} watching` : `⏰ ${l.time}`}</span>
                <button
                  className={`btn ${l.live ? "btn-primary" : "btn-ghost"} btn-sm`}
                  onClick={() => (l.live ? setWatching(l) : toast("🔔 Reminder set"))}
                >
                  {l.live ? "Watch" : "Remind me"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {watching && <LiveModal item={watching} onClose={() => setWatching(null)} />}
    </>
  );
}
