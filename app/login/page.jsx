"use client";
import { useState } from "react";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";

const RESUME = { 2: "/onboarding/language", 3: "/onboarding/pricing", 4: "/onboarding/concern", 5: "/onboarding/welcome-pujas" };

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Login failed."); return; }
      const u = data.user;
      // Full navigation so the freshly-set session cookie passes the middleware gate.
      if (u && !u.onboarding_complete) window.location.assign(RESUME[u.onboarding_step] || "/onboarding/language");
      else {
        const next = new URLSearchParams(window.location.search).get("next");
        window.location.assign(next && next.startsWith("/") ? next : "/");
      }
      return;
    } catch { setError("Connection error. Please try again."); }
    finally { setLoading(false); }
  }

  return (
    <AuthShell>
      <h1 className="auth-title">Welcome back</h1>
      <p className="auth-sub"><em>Sarve bhavantu sukhinah</em> — may all be happy 🙏</p>
      <form className="auth-form" onSubmit={submit} noValidate>
        {error && <div className="auth-error" role="alert">⚠️ {error}</div>}
        <div className="field"><label htmlFor="le">Email</label><input id="le" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" autoComplete="email" /></div>
        <div className="field">
          <label htmlFor="lp">Password</label>
          <div className="auth-pw"><input id="lp" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" autoComplete="current-password" /><button type="button" className="auth-eye" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide" : "Show"}>{show ? "🙈" : "👁️"}</button></div>
        </div>
        <button className="btn btn-primary btn-block" disabled={loading || !email || !password}>{loading ? "Entering…" : "🙏 Log in"}</button>
      </form>
      <p className="auth-switch">New to Aastha? <Link href="/signup">Create account</Link></p>
    </AuthShell>
  );
}
