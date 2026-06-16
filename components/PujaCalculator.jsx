"use client";
import { useState } from "react";
import Link from "next/link";

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

function PujaRec({ p }) {
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
          <div className="pj-benefits"><span className="pj-benefit">✦ {p.primary_benefit}</span></div>
        </div>
      )}
    </article>
  );
}

export default function PujaCalculator() {
  const [form, setForm] = useState({ name: "", dob: "", tob: "", pob: "", concern: "", gender: "male" });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
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

  function reset() { setData(null); setForm({ name: "", dob: "", tob: "", pob: "", concern: "", gender: "male" }); window.scrollTo({ top: 0, behavior: "smooth" }); }

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
        <div className="pc-recs">{reading.pujas.map((p) => <PujaRec key={p.rank} p={p} />)}</div>

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
          {source === "fallback"
            ? "This reading uses Aastha's rule-based Jyotish engine. "
            : "This reading was personalised by Claude AI interpreting your chart. "}
          It is spiritual guidance and inspiration — not a substitute for consultation with a qualified Jyotishi. Planetary positions are approximate; a precise reading requires professional ephemeris software.
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
          <div className="field"><label>Time of birth</label><input type="time" value={form.tob} onChange={set("tob")} /></div>
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
        </div>
        {error && <p className="pc-error">{error}</p>}
        <button className="btn btn-primary btn-block" disabled={loading} style={{ marginTop: 20 }}>
          {loading ? "🔮 Consulting the stars…" : "🔮 Calculate my puja prescription"}
        </button>
      </form>
    </div>
  );
}
