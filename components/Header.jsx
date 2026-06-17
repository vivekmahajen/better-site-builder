"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSelector from "@/components/LanguagePicker/LanguageSelector";

const NAV = [
  { href: "/pujas", key: "nav.pujas" },
  { href: "/live-darshan", key: "nav.live_darshan" },
  { href: "/astrology", key: "nav.astrology" },
  { href: "/daan", key: "nav.daan" },
  { href: "/dosha-nivaran", key: "nav.dosha_nivaran" },
  { href: "/puja-calculator", key: "nav.puja_calculator" },
  { href: "/daily", key: "nav.daily" },
  { href: "/radio", key: "nav.radio" },
  { href: "/plans", key: "nav.plans" },
  { href: "/track-order", key: "nav.track_order" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const path = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    let on = true;
    fetch("/api/auth/me").then((r) => r.json()).then((d) => { if (on) setUser(d.user); }).catch(() => {});
    return () => { on = false; };
  }, [path]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setUser(null);
    window.location.href = "/";
  }
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link href="/" className="brand">
          <span className="mark om">ॐ</span>
          <span>Aastha<small>{t("hero.tagline")}</small></span>
        </Link>
        <nav className={`nav-links ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={path === n.href ? "active" : ""}>{t(n.key)}</Link>
          ))}
        </nav>
        <div className="nav-cta">
          <LanguageSelector />
          {user ? (
            <span className="nav-account"><span className="nav-hi">🙏 {user.name?.split(" ")[0] || "You"}</span><button className="btn btn-ghost btn-sm" onClick={logout}>Logout</button></span>
          ) : (
            <Link href="/login" className="btn btn-ghost btn-sm">Log in</Link>
          )}
          <Link href="/pujas" className="btn btn-primary btn-sm">{t("nav.book_puja")}</Link>
        </div>
        <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen((v) => !v)}>☰</button>
      </div>
    </header>
  );
}
