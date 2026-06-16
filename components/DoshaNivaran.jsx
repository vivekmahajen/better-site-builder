"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "@/lib/toast";

function SeverityBar({ label, value, accent }) {
  return (
    <div className="sev-row">
      <span className="sev-label">{label}</span>
      <div className="sev-track"><div className="sev-fill" style={{ width: `${value}%`, background: accent }} /></div>
      <span className="sev-val">{value}%</span>
    </div>
  );
}

function DoshaCard({ d, onOpen }) {
  return (
    <article className="card dosha-card reveal" data-cat={d.category} onClick={() => onOpen(d)}>
      <div className="dc-art" style={{ background: d.colors.art }}>
        <span className="dc-icon">{d.icon}</span>
        <span className="dc-planet">{d.planetLabel}</span>
      </div>
      <div className="dc-body">
        <div className="dc-san">{d.sanskrit}</div>
        <h3 style={{ color: d.colors.badge }}>{d.name}</h3>
        <p className="dc-desc">{d.shortDesc}</p>
        <SeverityBar label="Severity" value={d.severity.dosha} accent={d.colors.accent} />
        <div className="dc-effects">
          {d.effects.slice(0, 3).map((e) => (
            <span className="dc-effect" key={e.t}><span>{e.i}</span>{e.t.split(" — ")[0].split(";")[0]}</span>
          ))}
        </div>
        <div className="dc-remedy">🙏 {d.puja.name}</div>
      </div>
    </article>
  );
}

function BookingForm({ puja, onClose }) {
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
      toast("🙏 Remedy puja booked — now trackable");
    } catch {
      toast("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (order) {
    return (
      <div className="success-box">
        <div className="big">🪔</div>
        <p style={{ color: "var(--ink-soft)" }}>Your booking ID</p>
        <div className="oid">{order.id}</div>
        <p style={{ color: "var(--ink-soft)", marginBottom: 18 }}>
          Your remedy puja is saved — track each stage from sankalp to prasad.
        </p>
        <Link href={`/track-order?id=${order.id}`} className="btn btn-primary btn-block">Track this puja →</Link>
      </div>
    );
  }
  return (
    <form onSubmit={submit}>
      <div className="field">
        <label htmlFor="d-devotee">Name for the sankalp *</label>
        <input id="d-devotee" value={devotee} onChange={(e) => setDevotee(e.target.value)} placeholder="e.g. Sharma family" autoFocus />
      </div>
      <div className="field">
        <label htmlFor="d-gotra">Gotra (optional)</label>
        <input id="d-gotra" value={gotra} onChange={(e) => setGotra(e.target.value)} placeholder="e.g. Kashyap" />
      </div>
      <div className="price-line">
        <span style={{ color: "var(--ink-soft)" }}>All-inclusive total</span>
        <span className="price">₹{puja.price.toLocaleString("en-IN")}</span>
      </div>
      <button className="btn btn-primary btn-block" disabled={submitting}>
        {submitting ? "Confirming…" : "Confirm & pay (demo)"}
      </button>
    </form>
  );
}

function DoshaModal({ dosha, remedy, onClose }) {
  const [booking, setBooking] = useState(false);
  const a = dosha.colors.accent;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal pj-modal" onClick={(e) => e.stopPropagation()}>
        <div className="dosha-modal-art" style={{ background: dosha.colors.art }}>
          <span style={{ fontSize: "3.2rem" }}>{dosha.icon}</span>
          <button className="modal-close" aria-label="Close" onClick={onClose} style={{ color: "#fff" }}>×</button>
        </div>
        <div className="modal-body pj-modal-body">
          <h3 style={{ color: "var(--maroon)", fontSize: "1.4rem" }}>{dosha.name}</h3>
          <div className="temple" style={{ marginBottom: 10 }}>{dosha.sanskrit} · {dosha.planetLabel}</div>

          {booking ? (
            <>
              <div className="pj-sec-l">Book remedy — {remedy.name}</div>
              <BookingForm puja={remedy} onClose={onClose} />
              <button className="btn btn-ghost btn-sm btn-block" style={{ marginTop: 10 }} onClick={() => setBooking(false)}>← Back to details</button>
            </>
          ) : (
            <>
              <div className="dosha-sev-grid">
                <SeverityBar label="Dosha" value={dosha.severity.dosha} accent={a} />
                <SeverityBar label="Health" value={dosha.severity.health} accent={a} />
                <SeverityBar label="Career" value={dosha.severity.career} accent={a} />
                <SeverityBar label="Relations" value={dosha.severity.relations} accent={a} />
              </div>

              <div className="pj-sec-l">What is this dosha?</div>
              <p className="pj-sec-p">{dosha.what}</p>

              <div className="pj-sec-l">Why it forms — Vedic explanation</div>
              <p className="pj-sec-p">{dosha.why}</p>

              <div className="pj-sec-l">🔴 Life challenges created</div>
              <ul className="dosha-effects-list">
                {dosha.effects.map((e) => (
                  <li key={e.t}><span>{e.i}</span>{e.t}</li>
                ))}
              </ul>

              <div className="pj-sec-l">🙏 Primary puja — the sacred remedy</div>
              <div className="dosha-puja-block">
                <div className="dosha-puja-name">{dosha.puja.name}</div>
                <p className="pj-sec-p">{dosha.puja.detail}</p>
              </div>

              <div className="pj-sec-l">🔊 Beej mantra</div>
              <div className="dosha-mantra">
                <div className="dosha-mantra-san">{dosha.mantra.san}</div>
                <div className="dosha-mantra-mean">{dosha.mantra.mean}</div>
                <div className="dosha-mantra-count">Japa: {dosha.mantra.count}</div>
              </div>

              <div className="pj-sec-l">⏰ Panchang timing</div>
              <div className="pj-panch-grid">
                {dosha.timing.map((t) => (
                  <div className="pj-panch" key={t.l}><div className="pj-panch-l">{t.l}</div><div className="pj-panch-v">{t.v}</div></div>
                ))}
              </div>

              <div className="pj-sec-l">💎 Gemstone & upaya</div>
              <div className="pj-panch-grid">
                <div className="pj-panch"><div className="pj-panch-l">Gemstone</div><div className="pj-panch-v">{dosha.gem.stone}</div></div>
                <div className="pj-panch"><div className="pj-panch-l">Alternative</div><div className="pj-panch-v">{dosha.gem.alt}</div></div>
                <div className="pj-panch"><div className="pj-panch-l">Metal</div><div className="pj-panch-v">{dosha.gem.metal}</div></div>
                <div className="pj-panch"><div className="pj-panch-l">Finger</div><div className="pj-panch-v">{dosha.gem.finger}</div></div>
                <div className="pj-panch" style={{ gridColumn: "1 / -1" }}><div className="pj-panch-l">When to wear</div><div className="pj-panch-v">{dosha.gem.when}</div></div>
              </div>

              <div className="pj-sec-l">🎁 Daan (sacred giving)</div>
              <p className="pj-sec-p">{dosha.daan}</p>

              <div className="pj-sec-l">🌺 Additional remedies</div>
              <div className="dosha-rem-list">
                {dosha.remedies.map((r) => (
                  <div className="dosha-rem" key={r.t}>
                    <span className="dosha-rem-i">{r.i}</span>
                    <div><div className="dosha-rem-t">{r.t}</div><div className="dosha-rem-d">{r.d}</div></div>
                  </div>
                ))}
              </div>

              <div className="pj-sec-l">✨ Joy, peace & prosperity after remedy</div>
              <div className="pj-ben-grid">
                {dosha.joy.map((j) => (
                  <div className="pj-ben" key={j.t}><span className="pj-ben-i">{j.i}</span><div><div className="pj-ben-t">{j.t}</div><div className="pj-ben-d">{j.d}</div></div></div>
                ))}
              </div>

              <button className="btn btn-primary btn-block" style={{ marginTop: 22 }} onClick={() => setBooking(true)}>
                🪔 Book remedy puja — ₹{remedy.price.toLocaleString("en-IN")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DoshaNivaran({ doshas, categories, remedies }) {
  const [active, setActive] = useState("all");
  const [open, setOpen] = useState(null);
  const shown = active === "all" ? doshas : doshas.filter((d) => d.category === active);
  const remedyFor = (id) => remedies.find((r) => r.slug === id);

  return (
    <>
      <div className="chips">
        {categories.map((c) => (
          <button key={c.id} className={`chip ${active === c.id ? "active" : ""}`} onClick={() => setActive(c.id)}>{c.label}</button>
        ))}
      </div>
      <div className="grid grid-3">
        {shown.map((d) => (<DoshaCard key={d.id} d={d} onOpen={setOpen} />))}
      </div>
      {open && <DoshaModal dosha={open} remedy={remedyFor(open.id)} onClose={() => setOpen(null)} />}
    </>
  );
}
