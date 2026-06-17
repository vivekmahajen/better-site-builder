"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import { PRICING_PLANS } from "@/lib/pricing";

export default function OnboardPricing() {
  const router = useRouter();
  const [sel, setSel] = useState("shraddha");
  const [billing, setBilling] = useState("monthly");
  const [loading, setLoading] = useState(false);

  async function next() {
    setLoading(true);
    await fetch("/api/user/onboarding", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan_id: sel, billing_cycle: billing, onboarding_step: 4 }) }).catch(() => {});
    router.push("/onboarding/concern");
  }

  return (
    <AuthShell step={3} wide>
      <h1 className="auth-title">Choose your path</h1>
      <p className="auth-sub">You can upgrade anytime — start with whatever feels right 🌸</p>
      <div className="ob-billing"><button className={`chip ${billing === "monthly" ? "active" : ""}`} onClick={() => setBilling("monthly")}>Monthly</button><button className={`chip ${billing === "annual" ? "active" : ""}`} onClick={() => setBilling("annual")}>Annual · save ~17%</button></div>
      <div className="ob-plans">
        {PRICING_PLANS.map((p) => (
          <button key={p.id} className={`ob-plan ${sel === p.id ? "on" : ""} ${p.highlight ? "hi" : ""}`} onClick={() => setSel(p.id)} aria-pressed={sel === p.id}>
            {p.badge && <span className="ob-plan-badge">{p.badge}</span>}
            <div className="ob-plan-name">{p.name}</div>
            <div className="ob-plan-tag">{p.tagline}</div>
            <div className="ob-plan-price">{p.price === 0 ? "Free" : <>{p.currency}{billing === "annual" && p.annualPrice ? Math.round(p.annualPrice / 12) : p.price}<small>/{p.cycle}</small></>}</div>
            <ul className="ob-plan-feats">{p.features.map((f) => <li key={f}>✓ {f}</li>)}</ul>
          </button>
        ))}
      </div>
      <p className="auth-note">Paid plans need a payment gateway (Razorpay/Stripe) — not yet connected, so any plan continues free for now.</p>
      <button className="btn btn-primary btn-block" onClick={next} disabled={loading}>{loading ? "Saving…" : sel === "shraddha" ? "Continue free →" : `Choose ${PRICING_PLANS.find((p) => p.id === sel)?.name} →`}</button>
    </AuthShell>
  );
}
