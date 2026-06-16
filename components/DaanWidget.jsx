"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "@/lib/toast";

const PRESETS = [251, 501, 1100, 2100, 5100];

export default function DaanWidget({ causes }) {
  const [causeId, setCauseId] = useState(causes[0].id);
  const [amount, setAmount] = useState(501);
  const [custom, setCustom] = useState("");
  const [donor, setDonor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const cause = causes.find((c) => c.id === causeId);
  const finalAmount = custom.trim() ? Math.max(0, Math.round(Number(custom) || 0)) : amount;

  async function submit(e) {
    e.preventDefault();
    if (!donor.trim()) { toast("Please enter your name"); return; }
    if (!finalAmount || finalAmount < 1) { toast("Enter a valid amount"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/donations", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cause: cause.name, donor, amount: finalAmount }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "failed");
      setReceipt(data.donation);
      toast("🙏 Daan received — thank you");
    } catch {
      toast("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (receipt) {
    return (
      <div className="card daan-receipt">
        <div className="big">🙏</div>
        <h3>Your daan is received</h3>
        <p className="daan-amt">₹{receipt.amount.toLocaleString("en-IN")} · {receipt.cause}</p>
        <p style={{ color: "var(--ink-soft)" }}>Receipt no.</p>
        <div className="oid">{receipt.id}</div>
        <p style={{ color: "var(--ink-soft)", margin: "12px 0 18px" }}>
          May your seva bring blessings. A receipt has been recorded against this ID.
        </p>
        <button className="btn btn-ghost btn-block" onClick={() => { setReceipt(null); setDonor(""); setCustom(""); }}>Make another daan</button>
      </div>
    );
  }

  return (
    <div className="daan-grid">
      <div className="daan-causes">
        {causes.map((c) => (
          <button key={c.id} type="button" className={`card daan-cause ${causeId === c.id ? "active" : ""}`} onClick={() => setCauseId(c.id)}>
            <span className="daan-cause-ico">{c.icon}</span>
            <span>
              <span className="daan-cause-name">{c.name}</span>
              <span className="daan-cause-desc">{c.desc}</span>
            </span>
          </button>
        ))}
      </div>

      <form className="card daan-form" onSubmit={submit}>
        <h3>Offer daan</h3>
        <div className="daan-selected">{cause.icon} {cause.name}</div>
        <div className="daan-amounts">
          {PRESETS.map((p) => (
            <button type="button" key={p} className={`chip ${!custom && amount === p ? "active" : ""}`} onClick={() => { setAmount(p); setCustom(""); }}>₹{p.toLocaleString("en-IN")}</button>
          ))}
        </div>
        <div className="field">
          <label htmlFor="daan-custom">Or enter an amount (₹)</label>
          <input id="daan-custom" type="number" min="1" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Custom amount" />
        </div>
        <div className="field">
          <label htmlFor="daan-donor">Your name *</label>
          <input id="daan-donor" value={donor} onChange={(e) => setDonor(e.target.value)} placeholder="Name on the receipt" />
        </div>
        <div className="price-line">
          <span style={{ color: "var(--ink-soft)" }}>Total daan</span>
          <span className="price">₹{(finalAmount || 0).toLocaleString("en-IN")}</span>
        </div>
        <button className="btn btn-primary btn-block" disabled={submitting}>
          {submitting ? "Processing…" : "🪔 Offer daan (demo)"}
        </button>
        <p style={{ fontSize: ".78rem", color: "var(--ink-soft)", textAlign: "center", marginTop: 10 }}>
          100% of your daan goes to the chosen seva. <Link href="/track-order" style={{ color: "var(--saffron-dark)", fontWeight: 700 }}>Booked a puja?</Link>
        </p>
      </form>
    </div>
  );
}
