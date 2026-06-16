"use client";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { AASTHA_LANGUAGES, isAvailable } from "@/lib/i18n/languages";

export default function LanguageSelector() {
  const { lang, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = AASTHA_LANGUAGES.find((l) => l.code === lang);

  return (
    <div className="lang-selector" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}>
      <button
        className="lang-selector-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Language: ${current?.english}. Change language.`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span aria-hidden>🌐</span>
        <span className="lang-selector-native">{current?.name}</span>
        <span aria-hidden>▾</span>
      </button>

      {open && (
        <div className="lang-dropdown" role="listbox" aria-label={t("language_selector.choose_language")}>
          {AASTHA_LANGUAGES.map((l) => {
            const avail = isAvailable(l.code);
            return (
              <button
                key={l.code}
                role="option"
                aria-selected={l.code === lang}
                disabled={!avail}
                className={`lang-dropdown-item ${l.code === lang ? "active" : ""} ${avail ? "" : "soon"}`}
                onClick={() => { if (avail) { setLanguage(l.code); setOpen(false); } }}
              >
                <span className="ldi-native">{l.name}</span>
                <span className="ldi-english">{l.english}</span>
                {l.code === lang && <span className="ldi-check" aria-hidden>✓</span>}
                {!avail && <span className="ldi-soon">soon</span>}
              </button>
            );
          })}
          <p className="lang-dropdown-note">{t("language_selector.coming_soon")} — {AASTHA_LANGUAGES.length} languages total</p>
        </div>
      )}
    </div>
  );
}
