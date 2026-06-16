"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/pujas", label: "Pujas" },
  { href: "/live-darshan", label: "Live Darshan" },
  { href: "/astrology", label: "Astrology" },
  { href: "/daily", label: "Daily" },
  { href: "/track-order", label: "Track Order" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link href="/" className="brand">
          <span className="mark om">ॐ</span>
          <span>Aastha<small>Bridge to the divine</small></span>
        </Link>
        <nav className={`nav-links ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={path === n.href ? "active" : ""}>{n.label}</Link>
          ))}
        </nav>
        <div className="nav-cta">
          <Link href="/track-order" className="btn btn-ghost btn-sm">Track my puja</Link>
          <Link href="/pujas" className="btn btn-primary btn-sm">Book a puja</Link>
        </div>
        <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen((v) => !v)}>☰</button>
      </div>
    </header>
  );
}
