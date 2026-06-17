"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import { AASTHA_LANGUAGES, isAvailable } from "@/lib/i18n/languages";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function OnboardLanguage() {
  const router = useRouter();
  const { setLanguage } = useLanguage();
  const [sel, setSel] = useState("en");
  const [loading, setLoading] = useState(false);

  async function next() {
    setLoading(true);
    if (isAvailable(sel)) setLanguage(sel);
    await fetch("/api/user/onboarding", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ language_code: sel, onboarding_step: 3 }) }).catch(() => {});
    router.push("/onboarding/pricing");
  }

  return (
    <AuthShell step={2} wide>
      <h1 className="auth-title">Choose your language</h1>
      <p className="auth-sub">Devi and Aastha will speak to you in your language 🙏</p>
      <div className="ob-lang-grid">
        {AASTHA_LANGUAGES.map((l) => (
          <button key={l.code} className={`ob-lang ${sel === l.code ? "on" : ""} ${isAvailable(l.code) ? "" : "soon"}`} onClick={() => isAvailable(l.code) && setSel(l.code)} disabled={!isAvailable(l.code)} aria-pressed={sel === l.code}>
            <span className="ob-lang-native">{l.name}</span>
            <span className="ob-lang-en">{l.english}</span>
            {!isAvailable(l.code) && <span className="ob-soon">soon</span>}
          </button>
        ))}
      </div>
      <button className="btn btn-primary btn-block" onClick={next} disabled={loading}>{loading ? "Saving…" : "Continue →"}</button>
    </AuthShell>
  );
}
