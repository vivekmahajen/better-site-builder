"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault(); setError("");
    if (!form.name.trim()) return setError("Please enter your name.");
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    if (!agreed) return setError("Please accept the terms.");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name, email: form.email, password: form.password }) });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Could not create account."); return; }
      router.push("/onboarding/language");
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  }

  return (
    <AuthShell>
      <h1 className="auth-title">Join Aastha</h1>
      <p className="auth-sub">Begin your divine journey 🌸</p>
      <form className="auth-form" onSubmit={submit} noValidate>
        {error && <div className="auth-error" role="alert">⚠️ {error}</div>}
        <div className="field"><label htmlFor="sn">Your full name</label><input id="sn" value={form.name} onChange={set("name")} placeholder="As you'd like to be called in the sankalp" autoComplete="name" /></div>
        <div className="field"><label htmlFor="se">Email</label><input id="se" type="email" value={form.email} onChange={set("email")} placeholder="your@email.com" autoComplete="email" /></div>
        <div className="field">
          <label htmlFor="sp">Create password</label>
          <div className="auth-pw"><input id="sp" type={show ? "text" : "password"} value={form.password} onChange={set("password")} placeholder="Minimum 8 characters" autoComplete="new-password" /><button type="button" className="auth-eye" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide" : "Show"}>{show ? "🙈" : "👁️"}</button></div>
        </div>
        <div className="field"><label htmlFor="sc">Confirm password</label><input id="sc" type="password" value={form.confirm} onChange={set("confirm")} placeholder="Type password again" autoComplete="new-password" /></div>
        <label className="auth-check"><input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} /> <span>I agree to the <Link href="/faq">Terms</Link> &amp; <Link href="/faq">Privacy Policy</Link></span></label>
        <button className="btn btn-primary btn-block" disabled={loading}>{loading ? "Creating…" : "🙏 Create account"}</button>
      </form>
      <p className="auth-switch">Already on Aastha? <Link href="/login">Log in</Link></p>
    </AuthShell>
  );
}
