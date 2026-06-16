"use client";
import Link from "next/link";
import { Suspense } from "react";
import { PUJAS } from "@/lib/catalog";
import PujaBrowser from "@/components/PujaBrowser";
import TrackClient from "@/components/TrackClient";
import { useTranslation } from "@/lib/i18n/useTranslation";

// Per-feature competitor support (booleans align with home.cmp_features order).
const CMP = [
  [true, true, true], [false, false, false], [false, false, false], [false, false, false],
  [false, false, true], [false, true, true], [false, true, true], [false, false, false],
  [false, false, false], [false, false, false], [false, false, false], [false, false, false],
  [true, true, true], [false, false, false], [false, false, false], [false, false, false],
  [false, false, true], [false, false, false], [false, false, false],
];

const Cell = ({ on }) => on ? <td className="yes">✓</td> : <td className="no">✕</td>;

export default function Home() {
  const { t } = useTranslation();
  const stats = t("home.stats");
  const strip = t("home.strip");
  const gaps = t("home.gaps");
  const steps = t("home.steps");
  const features = t("home.cmp_features");
  const testimonials = t("home.testimonials");

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="reveal in">
            <span className="eyebrow">{t("home.eyebrow")}</span>
            <h1>{t("home.h1a")}<span className="accent">{t("home.accent")}</span>{t("home.h1b")}</h1>
            <p className="lead">{t("home.lead")}</p>
            <div className="hero-cta">
              <Link href="/pujas" className="btn btn-primary">{t("home.cta_book")}</Link>
              <Link href="/track-order" className="btn btn-ghost">{t("home.cta_track")}</Link>
            </div>
            <div className="hero-trust">
              {stats.map((s) => (
                <div className="stat" key={s.lbl}><div className="num">{s.num}</div><div className="lbl">{s.lbl}</div></div>
              ))}
            </div>
          </div>

          <div className="hero-art reveal in">
            <span className="hero-badge tl"><span className="dot pulse" style={{ background: "#2e7d4f" }} />{t("home.badge_ritual")}</span>
            <span className="hero-badge br">{t("home.badge_prasad")}</span>
            <svg className="temple" viewBox="0 0 400 300" role="img" aria-label="Temple illustration">
              <defs>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fde7c4" /><stop offset="1" stopColor="#fff8ef" /></linearGradient>
                <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e7c97a" /><stop offset="1" stopColor="#c8961e" /></linearGradient>
                <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#fdf1e1" /></linearGradient>
              </defs>
              <rect width="400" height="300" fill="url(#sky)" rx="12" />
              <circle cx="200" cy="70" r="42" fill="#fbd38d" opacity=".7" />
              <polygon points="200,30 168,150 232,150" fill="url(#gold)" />
              <polygon points="200,30 200,150 232,150" fill="#b8851a" />
              <circle cx="200" cy="24" r="8" fill="url(#gold)" />
              <rect x="196" y="6" width="8" height="14" rx="3" fill="#c8961e" />
              <polygon points="120,90 100,170 140,170" fill="url(#gold)" />
              <polygon points="280,90 260,170 300,170" fill="url(#gold)" />
              <rect x="92" y="150" width="216" height="110" fill="url(#wall)" stroke="#ecdcc8" />
              <rect x="92" y="150" width="216" height="14" fill="#c8961e" opacity=".25" />
              <path d="M175 260 V200 a25 25 0 0 1 50 0 V260 Z" fill="#7b1e1e" />
              <path d="M183 260 V202 a17 17 0 0 1 34 0 V260 Z" fill="#5c1414" />
              <rect x="108" y="172" width="14" height="88" fill="#f3e2cd" />
              <rect x="278" y="172" width="14" height="88" fill="#f3e2cd" />
              <ellipse cx="135" cy="250" rx="10" ry="4" fill="#c8961e" />
              <path d="M135 240 q4 -10 0 -16 q-4 6 0 16" fill="#ec6608" />
              <ellipse cx="265" cy="250" rx="10" ry="4" fill="#c8961e" />
              <path d="M265 240 q4 -10 0 -16 q-4 6 0 16" fill="#ec6608" />
              <rect x="80" y="260" width="240" height="8" fill="#e7c97a" />
              <rect x="70" y="268" width="260" height="9" fill="#d8b667" />
            </svg>
          </div>
        </div>
      </section>

      {/* STRIP */}
      <div className="strip">
        <div className="wrap">
          {strip.map((s) => <span key={s}>{s}</span>)}
        </div>
      </div>

      {/* GAP CLOSERS */}
      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">{t("home.gaps_eyebrow")}</span>
            <h2>{t("home.gaps_head")}</h2>
            <p>{t("home.gaps_lead")}</p>
          </div>
          <div className="grid grid-3">
            {gaps.map((g) => (
              <div className="card feature reveal" key={g.h}>
                <div className="ico">{g.ico}</div>
                <h3>{g.h}</h3>
                <p>{g.p}</p>
                <span className="tag">{g.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACKING SHOWCASE */}
      <section style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">{t("home.track_eyebrow")}</span>
            <h2>{t("home.track_head")}</h2>
            <p>{t("home.track_lead")}</p>
          </div>
          <Suspense fallback={null}><TrackClient /></Suspense>
        </div>
      </section>

      {/* POPULAR PUJAS */}
      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">{t("home.popular_eyebrow")}</span>
            <h2>{t("home.popular_head")}</h2>
            <p>{t("home.popular_lead")}</p>
          </div>
          <PujaBrowser pujas={PUJAS.slice(0, 6)} />
          <div style={{ textAlign: "center", marginTop: 36 }} className="reveal">
            <Link href="/pujas" className="btn btn-ghost">{t("home.view_all")}</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow">{t("home.how_eyebrow")}</span><h2>{t("home.how_head")}</h2></div>
          <div className="steps">
            {steps.map((s, i) => (
              <div className="step reveal" key={s.h}><div className="n">{i + 1}</div><h4>{s.h}</h4><p>{s.p}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">{t("home.cmp_eyebrow")}</span>
            <h2>{t("home.cmp_head")}</h2>
            <p>{t("home.cmp_lead")}</p>
          </div>
          <div className="compare reveal">
            <table className="cmp">
              <thead>
                <tr><th>{t("home.cmp_th_feature")}</th><th>Sri Mandir</th><th>VAMA</th><th>Utsav</th><th className="us">Aastha</th></tr>
              </thead>
              <tbody>
                {features.map((label, i) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <Cell on={CMP[i][0]} /><Cell on={CMP[i][1]} /><Cell on={CMP[i][2]} />
                    <td className="col-us yes">✓</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ textAlign: "center", fontSize: ".8rem", color: "var(--ink-soft)", marginTop: 14 }}>{t("home.cmp_note")}</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow">{t("home.testi_eyebrow")}</span><h2>{t("home.testi_head")}</h2></div>
          <div className="grid grid-3">
            {testimonials.map((tm) => (
              <div className="card quote reveal" key={tm.nm}>
                <div className="stars">★★★★★</div>
                <p>&ldquo;{tm.q}&rdquo;</p>
                <div className="who"><span className="av">{tm.av}</span><div><div className="nm">{tm.nm}</div><div className="pl">{tm.pl}</div></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="wrap">
          <div className="cta-band reveal">
            <h2>{t("home.cta_head")}</h2>
            <p>{t("home.cta_lead")}</p>
            <div className="hero-cta">
              <Link href="/pujas" className="btn btn-primary">{t("home.cta_book2")}</Link>
              <Link href="/live-darshan" className="btn btn-outline-light">{t("home.cta_darshan")}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
