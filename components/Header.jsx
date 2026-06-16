"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  { href: "/plans", key: "nav.plans" },
  { href: "/track-order", key: "nav.track_order" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const { t } = useLanguage();
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
          <Link href="/track-order" className="btn btn-ghost btn-sm">{t("nav.track_my_puja")}</Link>
          <Link href="/pujas" className="btn btn-primary btn-sm">{t("nav.book_puja")}</Link>
        </div>
        <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen((v) => !v)}>☰</button>
      </div>
    </header>
  );
}
