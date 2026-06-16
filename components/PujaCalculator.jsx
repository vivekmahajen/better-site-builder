"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { relevantTransits, CAT_EMOJI, transitDates } from "@/lib/transits";

const PLANET_ICONS = { Sun: "☀️", Moon: "🌙", Mars: "🔴", Mercury: "💚", Jupiter: "⭐", Venus: "💗", Saturn: "🪐", Rahu: "🐍", Ketu: "☄️" };
const PLANET_COLORS = { Sun: "#E8710A", Moon: "#5b6bd6", Mars: "#d83434", Mercury: "#2e9e2e", Jupiter: "#D4A017", Venus: "#d6418c", Saturn: "#7a7a92", Rahu: "#9370DB", Ketu: "#CD853F" };
const PRI = {
  critical: { label: "🔴 Critical", cls: "pri-critical" },
  high: { label: "🟠 High priority", cls: "pri-high" },
  medium: { label: "🟡 Regular", cls: "pri-medium" },
  daily: { label: "🟢 Daily practice", cls: "pri-daily" },
};
const CONCERNS = [
  ["health", "Health & Longevity"], ["marriage", "Marriage & Relationships"], ["career", "Career & Finances"],
  ["children", "Children & Family"], ["spiritual", "Spiritual Growth"], ["obstacles", "Obstacle Removal"],
  ["peace", "Peace of Mind"], ["prosperity", "Wealth & Prosperity"], ["education", "Education & Knowledge"], ["protection", "Protection from Evil"],
];

function PujaRec({ p, onBook }) {
  const [open, setOpen] = useState(p.rank === 1);
  const pri = PRI[p.priority] || PRI.medium;
  return (
    <article className="card pr-card">
      <button className="pr-head" onClick={() => setOpen((v) => !v)}>
        <span className="pr-rank">{p.rank}</span>
        <span className="pr-titles">
          <span className="pr-title">{p.name}</span>
          <span className="pr-deity">{p.deity}</span>
        </span>
        <span className={`pri-chip ${pri.cls}`}>{pri.label}</span>
        <span className={`pr-chev ${open ? "open" : ""}`}>▾</span>
      </button>
      {open && (
        <div className="pr-body">
          <div className="pr-why"><strong>Why this is prescribed for you</strong>{p.why_for_you}</div>
          <div className="pr-grid">
            <div className="pr-cell"><div className="pr-cell-l">⏰ When to perform</div><div>{p.timing}</div></div>
            <div className="pr-cell"><div className="pr-cell-l">🌿 Key samagri</div><div>{p.key_samagri}</div></div>
          </div>
          <div className="pr-mantra"><span>Sacred mantra — chant 108 times</span>{p.mantra}</div>
          <div className="pr-foot-row">
            <div className="pj-benefits"><span className="pj-benefit">✦ {p.primary_benefit}</span></div>
            {p.bookSlug && (
              <button className="btn btn-primary btn-sm" onClick={() => onBook(p)}>
                🪔 Book {p.bookPrice ? `· ₹${p.bookPrice.toLocaleString("en-IN")}` : "this puja"}
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

function BookingModal({ puja, defaultName, onClose }) {
  const [devotee, setDevotee] = useState(defaultName || "");
  const [gotra, setGotra] = useState("");
  const [family, setFamily] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);

  async function submit(e) {
    e.preventDefault();
    if (!devotee.trim()) { return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: puja.bookSlug, devotee, gotra, family }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "failed");
      setOrder(data.order);
    } catch {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h3>{order ? "Booking confirmed" : `Book: ${puja.bookName || puja.name}`}</h3>
            <div className="temple">Recommended for {defaultName}</div>
          </div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {!order ? (
            <form onSubmit={submit}>
              <div className="field">
                <label htmlFor="pc-book-name">Name for the sankalp *</label>
                <input id="pc-book-name" value={devotee} onChange={(e) => setDevotee(e.target.value)} placeholder="e.g. Sharma family" autoFocus />
              </div>
              <div className="field">
                <label htmlFor="pc-book-gotra">Gotra (optional)</label>
                <input id="pc-book-gotra" value={gotra} onChange={(e) => setGotra(e.target.value)} placeholder="e.g. Kashyap" />
              </div>
              <div className="field">
                <label htmlFor="pc-book-family">Include family & friends (optional)</label>
                <input id="pc-book-family" value={family} onChange={(e) => setFamily(e.target.value)} placeholder="e.g. Anil, Priya — added to the sankalp" />
              </div>
              {puja.bookPrice != null && (
                <div className="price-line">
                  <span style={{ color: "var(--ink-soft)" }}>All-inclusive total</span>
                  <span className="price">₹{puja.bookPrice.toLocaleString("en-IN")}</span>
                </div>
              )}
              <button className="btn btn-primary btn-block" disabled={submitting}>
                {submitting ? "Confirming…" : "Confirm & pay (demo)"}
              </button>
              <p style={{ fontSize: ".78rem", color: "var(--ink-soft)", textAlign: "center", marginTop: 10 }}>
                We'll confirm name &amp; gotra pronunciation before the ritual.
              </p>
            </form>
          ) : (
            <div className="success-box">
              <div className="big">🪔</div>
              <p style={{ color: "var(--ink-soft)" }}>Your booking ID</p>
              <div className="oid">{order.id}</div>
              <p style={{ color: "var(--ink-soft)", marginBottom: 18 }}>
                Saved to your account — follow every stage from sankalp to prasad.
              </p>
              <Link href={`/track-order?id=${order.id}`} className="btn btn-primary btn-block">Track this puja →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PujaCalculator() {
  const [form, setForm] = useState({ name: "", dob: "", tob: "", pob: "", concern: "", gender: "male", transitId: "" });
  const transits = useMemo(() => relevantTransits(), []);
  const activeT = transits.filter((t) => t.status === "active");
  const upcomingT = transits.filter((t) => t.status === "upcoming");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.dob || !form.pob.trim()) { setError("Please enter your name, date of birth, and place of birth."); return; }
    setError(""); setLoading(true); setData(null);
    try {
      const res = await fetch("/api/puja-reading", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Could not calculate your reading.");
      setData(json);
      setTimeout(() => document.getElementById("pc-results")?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally { setLoading(false); }
  }

  function reset() { setData(null); setForm({ name: "", dob: "", tob: "", pob: "", concern: "", gender: "male", transitId: "" }); window.scrollTo({ top: 0, behavior: "smooth" }); }

  if (data) {
    const { chart, dashas, panchang, reading, source } = data;
    const today = new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    return (
      <div id="pc-results" className="pc-results">
        {/* PROFILE */}
        <div className="card pc-profile reveal in">
          <div className="pc-profile-head">
            <div className="pc-avatar">{PLANET_ICONS[chart.activeDasha] || "🙏"}</div>
            <div>
              <h3>{chart.name}</h3>
              <div className="pc-sub">🌙 {chart.moonSign} &nbsp;·&nbsp; ⬆️ {chart.lagna} &nbsp;·&nbsp; ✨ {chart.nakshatra}</div>
            </div>
          </div>
          {chart.place && <div className="pc-place">📍 {chart.place}{chart.timezone ? ` · ${chart.timezone}` : ""}</div>}
          {chart.timeKnown === false && (
            <div className="pc-warn">⚠️ No birth time entered — the Lagna and house placements assume noon and may be off. Add your exact time of birth for an accurate chart.</div>
          )}
          <p className="pc-cosmic">{reading.cosmic_profile}</p>
          <div className="pc-planets">
            {Object.entries(chart.planets).map(([p, v]) => (
              <div className="pc-planet" key={p}>
                <div className="pc-planet-n">{PLANET_ICONS[p]} {p}</div>
                <div className="pc-planet-s" style={{ color: PLANET_COLORS[p] }}>{v.signName}</div>
                <div className="pc-planet-h">House {v.house} · {v.signHi}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CURRENT TRANSIT */}
        {reading.transit && (
          <div className="card pc-transit reveal in">
            <div className="pc-transit-t">{CAT_EMOJI[reading.transit.category] || "🪐"} Factoring in: {reading.transit.name}</div>
            <div className="pc-transit-dates">{reading.transit.dates}</div>
            <p style={{ color: "var(--ink-soft)", margin: "8px 0" }}>{reading.transit.blurb}</p>
            <p className="pc-transit-harness">✨ {reading.transit.harness}</p>
            {reading.transit.bookSlug && (
              <button className="btn btn-primary btn-sm" style={{ marginTop: 6 }}
                onClick={() => setBooking({ bookSlug: reading.transit.bookSlug, bookName: reading.transit.bookName, bookPrice: reading.transit.bookPrice })}>
                🪔 Book the remedy puja{reading.transit.bookPrice ? ` · ₹${reading.transit.bookPrice.toLocaleString("en-IN")}` : ""}
              </button>
            )}
          </div>
        )}

        {/* PANCHANG */}
        <div className="card pc-block reveal in">
          <h3 className="pc-block-t">📅 Today's Panchang — {today}</h3>
          <div className="panchang">
            {[
              ["Vaara (Day)", panchang.vaara, "auspicious"], ["Tithi", `${panchang.tithi}`, panchang.paksha],
              ["Nakshatra", panchang.nakshatra, "Moon's mansion"], ["Yoga", panchang.yoga, "Sun–Moon yoga"],
              ["Moon Rashi", panchang.moonRashi, ""], ["Sun Rashi", panchang.sunRashi, ""],
              ["Rahu Kaal", panchang.rahuKaal, "avoid"], ["Today's Remedy", panchang.todayDo, ""],
            ].map(([k, v, tag]) => (
              <div className="pan-item" key={k}>
                <div className="k">{k}</div><div className="v">{v}</div>
                {tag === "auspicious" ? <span className="auspicious-tag">✓ Auspicious</span> : tag === "avoid" ? <span className="inauspicious-tag">⚠ Avoid</span> : tag ? <div className="panch-sub">{tag}</div> : null}
              </div>
            ))}
          </div>
        </div>

        {/* DASHA */}
        <div className="card pc-block reveal in">
          <h3 className="pc-block-t">⏳ Vimshottari Dasha timeline</h3>
          {dashas.map((d) => (
            <div className={`dasha-row ${d.isActive ? "active" : ""}`} key={d.lord}>
              <div className="dasha-planet" style={{ color: PLANET_COLORS[d.lord] }}>{PLANET_ICONS[d.lord]} {d.lord} {d.isActive ? "← now" : ""}</div>
              <div className="dasha-bar-wrap"><div className="dasha-bar" style={{ width: `${d.progress}%`, background: PLANET_COLORS[d.lord] }} /></div>
              <div className="dasha-years">{d.years} yr</div>
            </div>
          ))}
        </div>

        {/* RECOMMENDATIONS */}
        <div className="section-head reveal in" style={{ textAlign: "left", margin: "10px 0 18px" }}>
          <span className="eyebrow">Your personalised prescription</span>
          <h2 style={{ fontSize: "1.6rem", color: "var(--maroon)" }}>{chart.name}'s recommended pujas</h2>
        </div>
        <div className="priority-row">
          {Object.values(PRI).map((p) => <span className={`pri-chip ${p.cls}`} key={p.label}>{p.label}</span>)}
        </div>
        <div className="pc-recs">{reading.pujas.map((p) => <PujaRec key={p.rank} p={p} onBook={setBooking} />)}</div>
        {booking && <BookingModal puja={booking} defaultName={chart.name} onClose={() => setBooking(null)} />}

        <div className="card pc-callout sadhana"><div className="pc-callout-t">🌿 Your daily sadhana</div><p>{reading.daily_sadhana}</p></div>
        <div className="card pc-callout golden"><div className="pc-callout-t">🌅 Golden muhurta this week</div><p>{reading.golden_muhurta}</p></div>
        <div className="card pc-callout insight"><div className="pc-callout-t">🔮 Jyotish insight</div><p>{reading.jyotish_insight}</p></div>

        <div className="cta-band reveal in" style={{ marginTop: 28 }}>
          <h2>Ready to perform your prescribed pujas?</h2>
          <p>Book any of these with a verified pandit and track it from sankalp to prasad — or consult an astrologer to go deeper.</p>
          <div className="hero-cta">
            <Link href="/pujas" className="btn btn-primary">🪔 Book a puja</Link>
            <Link href="/dosha-nivaran" className="btn btn-outline-light">Dosha remedies</Link>
            <Link href="/astrology" className="btn btn-outline-light">Consult an astrologer</Link>
          </div>
        </div>

        <p className="pc-disclaimer">
          Planetary positions are computed with a real ephemeris (astronomy-engine) using Lahiri sidereal positions and whole-sign houses; the Lagna is derived from your geocoded birth place and exact time. {source === "fallback" ? "The prescription uses Aastha's rule-based Jyotish engine. " : "The prescription was personalised by Claude AI interpreting your chart. "}
          It is spiritual guidance — not a substitute for a qualified Jyotishi. Accuracy depends on the precision of your birth time and place.
        </p>
        <div style={{ textAlign: "center", marginTop: 18 }}>
          <button className="btn btn-ghost" onClick={reset}>← Calculate for another person</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card pc-form reveal">
      <div className="pc-form-head">
        <h3>✦ Your birth details</h3>
        <p>Accurate birth time and place give the most precise chart. Your details are used only for this reading.</p>
      </div>
      <form onSubmit={submit}>
        <div className="pc-grid">
          <div className="field full"><label>Your full name *</label><input value={form.name} onChange={set("name")} placeholder="Enter your name" /></div>
          <div className="field"><label>Date of birth *</label><input type="date" value={form.dob} onChange={set("dob")} max="2018-01-01" /></div>
          <div className="field"><label>Time of birth <span style={{ color: "var(--saffron-dark)" }}>(for accurate Lagna)</span></label><input type="time" value={form.tob} onChange={set("tob")} /></div>
          <div className="field full"><label>Place of birth (city, country) *</label><input value={form.pob} onChange={set("pob")} placeholder="e.g. Mumbai, India" /></div>
          <div className="field">
            <label>Primary life concern</label>
            <select value={form.concern} onChange={set("concern")}>
              <option value="">Select your main concern…</option>
              {CONCERNS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Gender</label>
            <select value={form.gender} onChange={set("gender")}>
              <option value="male">Male</option><option value="female">Female</option><option value="other">Other / Prefer not to say</option>
            </select>
          </div>
          <div className="field full">
            <label>Current planetary event to factor in <span style={{ color: "var(--ink-soft)" }}>(optional · live for today)</span></label>
            <select value={form.transitId} onChange={set("transitId")}>
              <option value="">None — just my birth chart</option>
              {activeT.length > 0 && (
                <optgroup label="🟢 Active now">
                  {activeT.map((t) => <option key={t.id} value={t.id}>{CAT_EMOJI[t.category]} {t.name} · {transitDates(t)}</option>)}
                </optgroup>
              )}
              {upcomingT.length > 0 && (
                <optgroup label="🔜 Coming up">
                  {upcomingT.map((t) => <option key={t.id} value={t.id}>{CAT_EMOJI[t.category]} {t.name} · {transitDates(t)}</option>)}
                </optgroup>
              )}
            </select>
          </div>
        </div>
        {error && <p className="pc-error">{error}</p>}
        <button className="btn btn-primary btn-block" disabled={loading} style={{ marginTop: 20 }}>
          {loading ? "🔮 Consulting the stars…" : "🔮 Calculate my puja prescription"}
        </button>
      </form>
    </div>
  );
}
