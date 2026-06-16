"use client";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";

function Timeline({ order }) {
  return (
    <div className="track-result show">
      <div className="track-meta">
        <div><div className="k">Puja</div><div className="v">{order.puja}</div></div>
        <div><div className="k">Temple</div><div className="v">{order.temple}</div></div>
        <div><div className="k">Priest</div><div className="v">{order.priest}</div></div>
        <div><div className="k">Status</div><div><span className="status-pill green">● {order.status}</span></div></div>
      </div>
      <div className="timeline">
        {order.steps.map((s, i) => (
          <div className={`tl-item ${s.state}`} key={i}>
            <span className="dot" />
            <h4>{s.title}</h4>
            <div className="time">{s.time}</div>
            {s.note && <div className="note">{s.note}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrackClient() {
  const params = useSearchParams();
  const [id, setId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const lookup = useCallback(async (rawId) => {
    const q = (rawId || "").trim();
    if (!q) { setError("Enter your booking ID"); setOrder(null); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(q)}`);
      if (res.status === 404) {
        setOrder(null);
        setError(`No booking found for "${q}". Try a demo ID: AAS-72401 or AAS-68233.`);
      } else if (res.ok) {
        setOrder(await res.json());
      } else {
        setError("Could not load that order. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Deep-link support: /track-order?id=AAS-xxxxx
  useEffect(() => {
    const qid = params.get("id");
    if (qid) { setId(qid); lookup(qid); }
  }, [params, lookup]);

  return (
    <div className="track-box">
      <form className="track-input" onSubmit={(e) => { e.preventDefault(); lookup(id); }}>
        <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter booking ID (e.g. AAS-72401)" aria-label="Booking ID" />
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Tracking…" : "Track"}</button>
      </form>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <span style={{ fontSize: ".85rem", color: "var(--ink-soft)" }}>No booking handy? Try a demo:&nbsp;</span>
        <button className="chip" onClick={() => { setId("AAS-72401"); lookup("AAS-72401"); }}>AAS-72401 (in progress)</button>{" "}
        <button className="chip" onClick={() => { setId("AAS-68233"); lookup("AAS-68233"); }}>AAS-68233 (completed)</button>
      </div>
      {error && <div className="track-result show"><p style={{ textAlign: "center", color: "var(--ink-soft)" }}>{error}</p></div>}
      {order && <Timeline order={order} />}
    </div>
  );
}
