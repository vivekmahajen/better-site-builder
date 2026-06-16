"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "@/lib/toast";

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PujaCard({ p, onBook }) {
  return (
    <article className="card puja-card reveal" data-cat={p.category}>
      <div className="pc-top">
        <div className="pc-emoji">{p.emoji}</div>
        <div><h3>{p.name}</h3><div className="temple">{p.temple}</div></div>
      </div>
      <div className="pc-body">
        <span className="badge-verified"><Check /> Verified priest · {p.priest}</span>
        <ul className="pc-incl" style={{ marginTop: 14 }}>
          {p.incl.map((i) => (<li key={i}><Check /><span>{i}</span></li>))}
        </ul>
      </div>
      <div className="pc-foot">
        <div className="price">₹{p.price.toLocaleString("en-IN")} <small>all inclusive</small></div>
        <button className="btn btn-primary btn-sm" onClick={() => onBook(p)}>Book puja</button>
      </div>
    </article>
  );
}

function BookingModal({ puja, onClose }) {
  const [devotee, setDevotee] = useState("");
  const [gotra, setGotra] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);

  async function submit(e) {
    e.preventDefault();
    if (!devotee.trim()) { toast("Please enter the name for the sankalp"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: puja.slug, devotee, gotra }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "failed");
      setOrder(data.order);
      toast("🙏 Booking confirmed — your puja is now trackable");
    } catch {
      toast("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h3>{order ? "Booking confirmed" : `Book: ${puja.name}`}</h3>
            <div className="temple">{puja.temple}</div>
          </div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {!order ? (
            <form onSubmit={submit}>
              <div className="field">
                <label htmlFor="devotee">Name for the sankalp *</label>
                <input id="devotee" value={devotee} onChange={(e) => setDevotee(e.target.value)} placeholder="e.g. Sharma family" autoFocus />
              </div>
              <div className="field">
                <label htmlFor="gotra">Gotra (optional)</label>
                <input id="gotra" value={gotra} onChange={(e) => setGotra(e.target.value)} placeholder="e.g. Kashyap" />
              </div>
              <div className="price-line">
                <span style={{ color: "var(--ink-soft)" }}>All-inclusive total</span>
                <span className="price">₹{puja.price.toLocaleString("en-IN")}</span>
              </div>
              <button className="btn btn-primary btn-block" disabled={submitting}>
                {submitting ? "Confirming…" : "Confirm & pay (demo)"}
              </button>
              <p style={{ fontSize: ".78rem", color: "var(--ink-soft)", textAlign: "center", marginTop: 10 }}>
                We'll confirm name & gotra pronunciation before the ritual.
              </p>
            </form>
          ) : (
            <div className="success-box">
              <div className="big">🪔</div>
              <p style={{ color: "var(--ink-soft)" }}>Your booking ID</p>
              <div className="oid">{order.id}</div>
              <p style={{ color: "var(--ink-soft)", marginBottom: 18 }}>
                Saved to your account. Follow every stage — from sankalp to prasad — on the tracking page.
              </p>
              <Link href={`/track-order?id=${order.id}`} className="btn btn-primary btn-block">Track this puja →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PujaBrowser({ pujas, categories, showFilters = false }) {
  const [active, setActive] = useState("All");
  const [booking, setBooking] = useState(null);
  const shown = active === "All" ? pujas : pujas.filter((p) => p.category === active);

  return (
    <>
      {showFilters && categories && (
        <div className="chips">
          {categories.map((c) => (
            <button key={c} className={`chip ${active === c ? "active" : ""}`} onClick={() => setActive(c)}>{c}</button>
          ))}
        </div>
      )}
      <div className="grid grid-3">
        {shown.map((p) => (<PujaCard key={p.slug} p={p} onBook={setBooking} />))}
      </div>
      {booking && <BookingModal puja={booking} onClose={() => setBooking(null)} />}
    </>
  );
}
