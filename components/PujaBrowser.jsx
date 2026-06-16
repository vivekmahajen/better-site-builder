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

function PujaCard({ p, onBook, onDetails }) {
  return (
    <article className="card pj-card reveal" data-cat={p.category}>
      <div className="pj-head">
        <div className="pj-emoji">{p.emoji}</div>
        <div className="pj-titles">
          <div className="pj-san">{p.sanskrit}</div>
          <h3>{p.name}</h3>
          <div className="pj-deity">{p.deity}</div>
        </div>
      </div>
      <div className="pj-typerow">
        <span className="pj-type">{p.type}</span>
        <span className="pj-region">📍 {p.region}</span>
      </div>
      <p className="pj-desc">{p.desc}</p>
      <div className="pj-when">
        <span className="pj-when-l">🕐 When to perform</span>
        {p.when}
      </div>
      <div className="pj-benefits">
        {p.benefits.slice(0, 4).map((b) => (
          <span className="pj-benefit" key={b.t}><span>{b.i}</span>{b.t}</span>
        ))}
      </div>
      <div className="pj-foot">
        <div className="price">₹{p.price.toLocaleString("en-IN")} <small>all inclusive</small></div>
        <div className="pj-actions">
          <button className="btn btn-ghost btn-sm" onClick={() => onDetails(p)}>Details</button>
          <button className="btn btn-primary btn-sm" onClick={() => onBook(p)}>Book</button>
        </div>
      </div>
    </article>
  );
}

function DetailsModal({ puja, onClose, onBook }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal pj-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h3>{puja.emoji} {puja.name}</h3>
            <div className="temple">{puja.sanskrit} · {puja.deity}</div>
          </div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body pj-modal-body">
          <div className="pj-sec-l">About this puja</div>
          <p className="pj-sec-p">{puja.desc}</p>

          <div className="pj-sec-l">Vedic significance</div>
          <p className="pj-sec-p">{puja.significance}</p>

          <div className="pj-sec-l">When to perform · Panchang</div>
          <div className="pj-panch-grid">
            {puja.panchang.map((pa) => (
              <div className="pj-panch" key={pa.l}>
                <div className="pj-panch-l">{pa.l}</div>
                <div className="pj-panch-v">{pa.v}</div>
              </div>
            ))}
          </div>

          <div className="pj-sec-l">Sacred offerings (Samagri)</div>
          <p className="pj-sec-p">{puja.samagri}</p>

          <div className="pj-sec-l">Spiritual benefits</div>
          <div className="pj-ben-grid">
            {puja.benefits.map((b) => (
              <div className="pj-ben" key={b.t}>
                <span className="pj-ben-i">{b.i}</span>
                <div><div className="pj-ben-t">{b.t}</div><div className="pj-ben-d">{b.d}</div></div>
              </div>
            ))}
          </div>

          <button className="btn btn-primary btn-block" style={{ marginTop: 22 }} onClick={() => onBook(puja)}>
            🪔 Book this puja — ₹{puja.price.toLocaleString("en-IN")}
          </button>
        </div>
      </div>
    </div>
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
            <div className="temple">{puja.region}</div>
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
  const [details, setDetails] = useState(null);
  const shown = active === "All" ? pujas : pujas.filter((p) => p.category === active);

  return (
    <>
      {showFilters && categories && (
        <div className="chips">
          {categories.map((c) => (
            <button key={c.id} className={`chip ${active === c.id ? "active" : ""}`} onClick={() => setActive(c.id)}>
              {c.label}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-3">
        {shown.map((p) => (
          <PujaCard key={p.slug} p={p} onBook={setBooking} onDetails={setDetails} />
        ))}
      </div>
      {details && (
        <DetailsModal
          puja={details}
          onClose={() => setDetails(null)}
          onBook={(p) => { setDetails(null); setBooking(p); }}
        />
      )}
      {booking && <BookingModal puja={booking} onClose={() => setBooking(null)} />}
    </>
  );
}
