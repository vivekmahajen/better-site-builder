import Link from "next/link";
import { Suspense } from "react";
import { PUJAS } from "@/lib/catalog";
import PujaBrowser from "@/components/PujaBrowser";
import TrackClient from "@/components/TrackClient";

const GAPS = [
  { ico: "📍", h: "Live order tracking", p: "A real timeline for every booking — priest assigned, sankalp recorded, ritual performed, video uploaded, prasad delivered. No more silence after payment.", tag: 'Closes: "video never arrived"' },
  { ico: "✅", h: "Verified priests, unhurried rituals", p: "Every pandit is credential-checked. We confirm your name & gotra pronunciation before the puja, and guarantee a full, unhurried ritual.", tag: 'Closes: "wrong names, rushed pujas"' },
  { ico: "📦", h: "Prasad to your doorstep", p: "Consecrated prasad couriered home with a trackable shipment number, folded right into your order timeline.", tag: 'Closes: "no prasad clarity"' },
  { ico: "💬", h: "24×7 human support", p: "Reach a real person by chat or call with a published response-time SLA — not an inbox that ignores you.", tag: 'Closes: "support never replied"' },
  { ico: "🧾", h: "Transparent pricing", p: 'Every puja shows an all-inclusive price and an exact "what\'s included" list. No surprises at checkout.', tag: 'Closes: "opaque pricing"' },
  { ico: "🔐", h: "Secure, self-serve account", p: "Change your phone number yourself with dual-OTP verification. No login loops, no OTP stuck on an old number.", tag: 'Closes: "login & OTP defects"' },
];

const CMP = [
  ["Online puja & chadhava", true, true, true],
  ["Live order tracking (per stage)", false, false, false],
  ["Verified-priest credentials shown", false, false, false],
  ["Name pronunciation confirmed", false, false, false],
  ["Prasad delivery + courier tracking", false, false, true],
  ["Live darshan", false, true, true],
  ["Live astrology consultation", false, true, true],
  ["Free, instant birth-chart puja calculator", false, false, false],
  ["Calculator → one-tap bookable & tracked pujas", false, false, false],
  ["Factors today's live planetary transits", false, false, false],
  ["Subscription pujas", false, false, true],
  ['Transparent "what\'s included" pricing', false, false, false],
  ["24×7 human support with SLA", false, false, false],
];

const Cell = ({ on }) => on ? <td className="yes">✓</td> : <td className="no">✕</td>;

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="reveal in">
            <span className="eyebrow">Trusted devotion, delivered transparently</span>
            <h1>Bring the <span className="accent">temple home</span> — and watch every blessing arrive.</h1>
            <p className="lead">Book personalized puja & chadhava at 1,000+ temples with <b>verified priests</b>, then follow your offering live — from sankalp to ritual to prasad at your door. Plus live darshan, astrology and a 5,000+ aarti library.</p>
            <div className="hero-cta">
              <Link href="/pujas" className="btn btn-primary">🪔 Book a puja</Link>
              <Link href="/track-order" className="btn btn-ghost">See live tracking →</Link>
            </div>
            <div className="hero-trust">
              <div className="stat"><div className="num">1,000+</div><div className="lbl">partner temples</div></div>
              <div className="stat"><div className="num">48 hr</div><div className="lbl">video SLA, guaranteed</div></div>
              <div className="stat"><div className="num">100%</div><div className="lbl">verified priests</div></div>
              <div className="stat"><div className="num">4.9★</div><div className="lbl">devotee rating</div></div>
            </div>
          </div>

          <div className="hero-art reveal in">
            <span className="hero-badge tl"><span className="dot pulse" style={{ background: "#2e7d4f" }} />Ritual in progress</span>
            <span className="hero-badge br">📦 Prasad out for delivery</span>
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
          <span>✓ Live order tracking</span>
          <span>✓ Verified Vedic priests</span>
          <span>✓ Prasad to your doorstep</span>
          <span>✓ Transparent pricing</span>
          <span>✓ 24×7 human support</span>
        </div>
      </div>

      {/* GAP CLOSERS */}
      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Why devotees switch to Aastha</span>
            <h2>Devotion you can actually see happening</h2>
            <p>Other apps take your money and leave you waiting. We built Aastha around the things devotees told us were broken.</p>
          </div>
          <div className="grid grid-3">
            {GAPS.map((g) => (
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
            <span className="eyebrow">The Aastha difference</span>
            <h2>Track your puja like you track a parcel</h2>
            <p>Enter a demo booking ID to see the transparency no other devotional app offers.</p>
          </div>
          <Suspense fallback={null}><TrackClient /></Suspense>
        </div>
      </section>

      {/* POPULAR PUJAS */}
      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Most-booked this week</span>
            <h2>Popular pujas & chadhava</h2>
            <p>Performed by verified priests at India's most revered temples — every price all-inclusive.</p>
          </div>
          <PujaBrowser pujas={PUJAS.slice(0, 6)} />
          <div style={{ textAlign: "center", marginTop: 36 }} className="reveal">
            <Link href="/pujas" className="btn btn-ghost">View all pujas →</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow">Simple & sacred</span><h2>How Aastha works</h2></div>
          <div className="steps">
            <div className="step reveal"><div className="n">1</div><h4>Choose your puja</h4><p>Pick from 1,000+ temples with clear, all-inclusive pricing.</p></div>
            <div className="step reveal"><div className="n">2</div><h4>Share name & gotra</h4><p>We confirm pronunciation with you before the ritual.</p></div>
            <div className="step reveal"><div className="n">3</div><h4>Track it live</h4><p>Follow each stage on your timeline as it happens.</p></div>
            <div className="step reveal"><div className="n">4</div><h4>Receive video + prasad</h4><p>HD video within 48 hrs; prasad couriered to your door.</p></div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Honest comparison</span>
            <h2>How Aastha compares</h2>
            <p>The same devotion you expect — plus the transparency you deserve.</p>
          </div>
          <div className="compare reveal">
            <table className="cmp">
              <thead>
                <tr><th>Feature</th><th>Sri Mandir</th><th>VAMA</th><th>Utsav</th><th className="us">Aastha</th></tr>
              </thead>
              <tbody>
                {CMP.map(([label, a, b, c]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <Cell on={a} /><Cell on={b} /><Cell on={c} />
                    <td className="col-us yes">✓</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ textAlign: "center", fontSize: ".8rem", color: "var(--ink-soft)", marginTop: 14 }}>Comparison reflects publicly available features & common user feedback as of June 2026; for illustration. Sri Mandir, VAMA and Utsav do offer kundli-based puja suggestions — but as paid reports or astrologer consultations, not a free, instant, self-serve calculator whose recommended pujas are directly bookable and tracked.</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow">From our devotees</span><h2>Faith, finally without the worry</h2></div>
          <div className="grid grid-3">
            <div className="card quote reveal"><div className="stars">★★★★★</div><p>"For the first time I could actually see when the priest was assigned and when the ritual happened. The prasad reached Pune in three days."</p><div className="who"><span className="av">RK</span><div><div className="nm">Radhika K.</div><div className="pl">Pune</div></div></div></div>
            <div className="card quote reveal"><div className="stars">★★★★★</div><p>"They called to confirm how to pronounce my late father's name before the shraddh puja. That small thing meant everything."</p><div className="who"><span className="av">AM</span><div><div className="nm">Anil M.</div><div className="pl">Dubai</div></div></div></div>
            <div className="card quote reveal"><div className="stars">★★★★★</div><p>"Booked a weekly subscription puja for my mother's health. The HD video arrives every Monday, on time, every single week."</p><div className="who"><span className="av">SP</span><div><div className="nm">Suresh P.</div><div className="pl">Chennai</div></div></div></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="wrap">
          <div className="cta-band reveal">
            <h2>Your prayers deserve to be seen through.</h2>
            <p>Join Aastha and experience devotion with complete transparency — from sankalp to prasad at your door.</p>
            <div className="hero-cta">
              <Link href="/pujas" className="btn btn-primary">🪔 Book your first puja</Link>
              <Link href="/live-darshan" className="btn btn-outline-light">Watch live darshan</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
