"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { LANG_MAP, RTL_LANGUAGES, DEFAULT_LANG, FALLBACK_LANG, isAvailable } from "./languages";
import { loadFontForLanguage } from "./fonts";

// Translation bundles are statically imported so the UI renders instantly with
// no async flash. Adding a language = drop its 5 JSON files here.
import enCommon from "@/locales/en/common.json";
import enPujas from "@/locales/en/pujas.json";
import enChatbot from "@/locales/en/chatbot.json";
import enErrors from "@/locales/en/errors.json";
import enReligious from "@/locales/en/religious.json";
import hiCommon from "@/locales/hi/common.json";
import hiPujas from "@/locales/hi/pujas.json";
import hiChatbot from "@/locales/hi/chatbot.json";
import hiErrors from "@/locales/hi/errors.json";
import hiReligious from "@/locales/hi/religious.json";

const BUNDLES = {
  en: { common: enCommon, pujas: enPujas, chatbot: enChatbot, errors: enErrors, religious: enReligious },
  hi: { common: hiCommon, pujas: hiPujas, chatbot: hiChatbot, errors: hiErrors, religious: hiReligious },
};

// Map a key namespace → which bundle file holds it.
const NS = { nav: "common", buttons: "common", hero: "common", trust: "common", footer: "common", language_selector: "common", details: "pujas", booking: "pujas", devi: "chatbot", deities: "religious", greetings: "religious", panchang: "religious" };

function resolve(bundle, key, params) {
  const file = NS[key.split(".")[0]] || "common";
  const src = bundle?.[file] || {};
  let value = key.split(".").reduce((o, k) => (o == null ? o : o[k]), src);
  if (value == null) return key; // graceful fallback: show the key
  if (params && typeof value === "string") {
    for (const [k, v] of Object.entries(params)) value = value.replaceAll(`{{${k}}}`, v);
  }
  return value;
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(DEFAULT_LANG);

  const apply = useCallback((code) => {
    const cfg = LANG_MAP[code];
    if (!cfg || typeof document === "undefined") return;
    document.documentElement.lang = code;
    document.documentElement.dir = cfg.dir;
    document.documentElement.classList.toggle("rtl", RTL_LANGUAGES.includes(code));
    loadFontForLanguage(cfg);
  }, []);

  const setLanguage = useCallback((code) => {
    if (!isAvailable(code)) code = FALLBACK_LANG; // only ship vetted bundles
    try {
      localStorage.setItem("aastha_lang", code);
      document.cookie = `aastha_lang=${code};path=/;max-age=${365 * 24 * 3600};SameSite=Lax`;
    } catch { /* storage may be unavailable */ }
    apply(code);
    setLang(code);
    // Persist to the user account when auth exists (no-op today).
    fetch("/api/user/language", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ language: code }) }).catch(() => {});
  }, [apply]);

  useEffect(() => {
    const saved = (typeof localStorage !== "undefined" && localStorage.getItem("aastha_lang")) ||
      document.cookie.match(/aastha_lang=([^;]+)/)?.[1] || DEFAULT_LANG;
    if (isAvailable(saved)) { apply(saved); setLang(saved); }
  }, [apply]);

  const bundle = BUNDLES[lang] || BUNDLES[FALLBACK_LANG];
  const t = useCallback((key, params) => resolve(bundle, key, params), [bundle]);

  return (
    <LanguageContext.Provider value={{ lang, langConfig: LANG_MAP[lang], isRTL: RTL_LANGUAGES.includes(lang), setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
