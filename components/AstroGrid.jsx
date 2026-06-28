"use client";
import { toast } from "@/lib/toast";

export default function AstroGrid({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="card reveal" style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}>
        <div style={{ fontSize: "2rem" }}>🔮</div>
        <h3 style={{ marginTop: ".5rem" }}>Verified astrologer listings coming soon</h3>
        <p style={{ color: "var(--ink-soft)", maxWidth: "40ch", margin: ".5rem auto 0" }}>
          We only list real, credential-verified astrologers who have consented to be here —
          so this directory is being built carefully rather than filled with placeholders.
          Please check back shortly.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-3">
      {items.map((a) => (
        <article className="card astro-card reveal" key={a.name}>
          <div className="avatar">{a.initials}</div>
          <h3>{a.name}</h3>
          <div className="spec">{a.spec}</div>
          <div className="stars">
            {"★".repeat(Math.round(a.rating))}
            <span style={{ color: "var(--ink-soft)", fontSize: ".8rem" }}> {a.rating} · {a.exp} yrs</span>
          </div>
          <p className="rate" style={{ margin: "10px 0 14px" }}>
            ₹{a.rate}<small style={{ fontWeight: 400, color: "var(--ink-soft)" }}>/min</small>
          </p>
          <button
            className={`btn ${a.online ? "btn-primary" : "btn-ghost"} btn-sm btn-block`}
            disabled={!a.online}
            style={a.online ? undefined : { opacity: 0.55 }}
            onClick={() => a.online && toast("🔮 Connecting you to the astrologer…")}
          >
            {a.online ? (<><span className="online-dot" />Talk now</>) : "Currently offline"}
          </button>
        </article>
      ))}
    </div>
  );
}
