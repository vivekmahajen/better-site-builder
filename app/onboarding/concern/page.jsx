"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import { LIFE_CONCERNS } from "@/lib/concerns";

export default function OnboardConcern() {
  const router = useRouter();
  const [sel, setSel] = useState(null);
  const [loading, setLoading] = useState(false);

  async function next() {
    if (!sel) return;
    setLoading(true);
    const concern = LIFE_CONCERNS.find((c) => c.id === sel);
    try { localStorage.setItem("aastha_concern", sel); } catch { /* */ }
    await fetch("/api/user/onboarding", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ primary_concern: sel, default_puja_ids: concern.pujas.map((p) => p.id), onboarding_step: 5 }) }).catch(() => {});
    router.push("/onboarding/welcome-pujas");
  }

  return (
    <AuthShell step={4} wide>
      <h1 className="auth-title">What brings you here?</h1>
      <p className="auth-sub">We'll suggest the right pujas for your need — you can change this anytime 🙏</p>
      <div className="ob-concerns" role="radiogroup">
        {LIFE_CONCERNS.map((c) => (
          <button key={c.id} role="radio" aria-checked={sel === c.id} className={`ob-concern ${sel === c.id ? "on" : ""}`} onClick={() => setSel(c.id)}>
            <span className="ob-concern-i">{c.icon}</span>
            <span className="ob-concern-l">{c.label}</span>
            <span className="ob-concern-d">{c.description}</span>
          </button>
        ))}
      </div>
      <button className="btn btn-primary btn-block" onClick={next} disabled={loading || !sel}>{loading ? "Setting up…" : "See my recommended pujas →"}</button>
    </AuthShell>
  );
}
