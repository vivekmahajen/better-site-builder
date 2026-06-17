"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { LIFE_CONCERNS } from "@/lib/concerns";

export default function WelcomePujas() {
  const router = useRouter();
  const [concern, setConcern] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let id = "spiritual";
    try { id = localStorage.getItem("aastha_concern") || "spiritual"; } catch { /* */ }
    setConcern(LIFE_CONCERNS.find((c) => c.id === id) || LIFE_CONCERNS[0]);
  }, []);

  async function enter() {
    setLoading(true);
    await fetch("/api/user/onboarding", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ onboarding_step: 6, onboarding_complete: true }) }).catch(() => {});
    router.push("/");
  }

  if (!concern) return null;
  return (
    <AuthShell step={5} wide>
      <div style={{ textAlign: "center" }}><div style={{ fontSize: 40 }}>{concern.icon}</div></div>
      <h1 className="auth-title">Your sacred pujas</h1>
      <p className="auth-sub">Based on your focus on <strong>{concern.label}</strong>, these are ready for you 🌸</p>
      <div className="ob-welcome">
        {concern.pujas.map((p, i) => (
          <div className="ob-wp" key={p.id}><div className="ob-wp-n">{i + 1}</div><div className="ob-wp-b"><div className="ob-wp-name">{p.name}</div><div className="ob-wp-deity">🛕 {p.deity}</div><div className="ob-wp-why">{p.why}</div></div><div className="ob-wp-price">{p.price}</div></div>
        ))}
      </div>
      <button className="btn btn-primary btn-block" onClick={enter} disabled={loading}>{loading ? "Entering…" : "🙏 Enter Aastha"}</button>
      <p className="auth-switch"><Link href="/pujas">Browse all pujas →</Link></p>
    </AuthShell>
  );
}
