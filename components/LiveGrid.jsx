"use client";
import { toast } from "@/lib/toast";

export default function LiveGrid({ items }) {
  return (
    <div className="grid grid-3">
      {items.map((l) => (
        <article className="card live-card reveal" key={l.temple}>
          <div className="lc-thumb">
            <span className="om-big om">ॐ</span>
            {l.live && <span className="live-pill"><span className="dot pulse" />LIVE</span>}
          </div>
          <div className="lc-body">
            <h3>{l.temple}</h3>
            <div className="meta">{l.ritual} · {l.city}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span className="viewers">{l.live ? `👁 ${l.viewers} watching` : `⏰ ${l.time}`}</span>
              <button
                className={`btn ${l.live ? "btn-primary" : "btn-ghost"} btn-sm`}
                onClick={() => toast(l.live ? "📿 Joining live darshan…" : "🔔 Reminder set")}
              >
                {l.live ? "Watch" : "Remind me"}
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
