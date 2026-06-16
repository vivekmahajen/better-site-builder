import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Plans & Membership — Shraddha, Bhakta, Sadhak & NRI | Aastha",
  description:
    "Start free with the Puja Calculator and Live Darshan, or join a membership — Bhakta (₹499/mo), Sadhak (₹999/mo) or NRI ($19/mo) — for included pujas, member pricing, free prasad delivery and Aastha's per-stage tracking with verified priests.",
};

const PLANS = [
  {
    id: "shraddha",
    name: "Shraddha",
    sanskrit: "श्रद्धा",
    tagline: "For every devotee — free forever",
    price: "₹0",
    period: "",
    cta: "Start free",
    href: "/puja-calculator",
    featured: false,
    feats: [
      "Free, transit-aware Puja Calculator",
      "Live Darshan — daily aartis + all-India temple directory",
      "Daily Panchang + aarti, chalisa & mantra library",
      "Browse & book 200+ pujas at all-inclusive prices",
      "Per-stage live order tracking on every booking",
      "Devi — your sacred guide, 24×7",
    ],
  },
  {
    id: "bhakta",
    name: "Bhakta",
    sanskrit: "भक्त",
    tagline: "For the regular devotee",
    price: "₹499",
    period: "/month",
    cta: "Become a Bhakta",
    href: "/pujas",
    featured: true,
    badge: "Most popular",
    feats: [
      "Everything in Shraddha",
      "1 puja included every month",
      "10% off all puja & chadhava bookings",
      "Free prasad delivery on member pujas",
      "Priority verified-priest assignment",
      "Monthly personalised puja recommendation from your chart",
      "Puja completion certificate on every ritual",
    ],
  },
  {
    id: "sadhak",
    name: "Sadhak",
    sanskrit: "साधक",
    tagline: "For the deeply devoted",
    price: "₹999",
    period: "/month",
    cta: "Become a Sadhak",
    href: "/pujas",
    featured: false,
    feats: [
      "Everything in Bhakta",
      "Up to 4 pujas' value each month (weekly cadence)",
      "15% off all bookings",
      "1 live astrology consultation every month",
      "Family sankalp — add family & friends, included",
      "Dosha Nivaran remedy guidance",
      "Dedicated priority support",
    ],
  },
  {
    id: "nri",
    name: "NRI",
    sanskrit: "प्रवासी",
    tagline: "For families abroad",
    price: "$19",
    period: "/month",
    note: "Billed in USD · GBP · AUD",
    cta: "Join NRI membership",
    href: "/pujas",
    featured: false,
    feats: [
      "Everything in Sadhak",
      "International prasad shipping",
      "Time-zone-friendly live darshan reminders",
      "Pind Daan & shraddh coordination at Gaya / Kashi",
      "Annual ancestral tithi reminders, performed on the exact day",
      "Dedicated NRI concierge + multi-currency billing",
    ],
  },
];

const WHY = [
  { ico: "📍", h: "Per-stage tracking", p: "Every membership puja is tracked stage by stage — no silence after payment." },
  { ico: "✅", h: "Verified priests", p: "Credential-checked pandits, name & gotra pronunciation confirmed — on every tier." },
  { ico: "🧾", h: "Transparent pricing", p: "All-inclusive prices with an exact 'what's included' list. Cancel anytime, no lock-in." },
];

export default function PlansPage() {
  return (
    <>
      <PageHero crumbKey="nav.plans" titleKey="plans_page.title" introKey="plans_page.intro" />

      <section>
        <div className="wrap">
          <div className="plans-grid">
            {PLANS.map((p) => (
              <div className={`card plan-card ${p.featured ? "plan-featured" : ""}`} key={p.id}>
                {p.badge && <span className="plan-badge">{p.badge}</span>}
                <div className="plan-top">
                  <div className="plan-san">{p.sanskrit}</div>
                  <h3 className="plan-name">{p.name}</h3>
                  <p className="plan-tagline">{p.tagline}</p>
                  <div className="plan-price">{p.price}<small>{p.period}</small></div>
                  {p.note && <div className="plan-note">{p.note}</div>}
                </div>
                <Link href={p.href} className={`btn ${p.featured ? "btn-primary" : "btn-ghost"} btn-block`}>{p.cta}</Link>
                <ul className="plan-feats">
                  {p.feats.map((f) => (
                    <li key={f}><span className="plan-tick" aria-hidden>✓</span>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="plans-fineprint">
            Concept platform — pricing is illustrative. Memberships are billed monthly and can be paused or cancelled anytime.
            The NRI tier is priced in USD/GBP/AUD for families abroad.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Why a membership pays off</span>
            <h2>We compete on trust, not the lowest rupee</h2>
            <p>Other apps compete on price or temple count. Aastha anchors on operational trust — and your membership carries it into every booking.</p>
          </div>
          <div className="grid grid-3">
            {WHY.map((w) => (
              <div className="card feature reveal" key={w.h}><div className="ico">{w.ico}</div><h3>{w.h}</h3><p>{w.p}</p></div>
            ))}
          </div>
          <div className="cta-band reveal" style={{ marginTop: 32 }}>
            <h2>Not sure where to begin?</h2>
            <p>Try the free Puja Calculator — your chart will point to the right puja, and you can upgrade anytime.</p>
            <div className="hero-cta">
              <Link href="/puja-calculator" className="btn btn-primary">🔮 Try the free calculator</Link>
              <Link href="/pujas" className="btn btn-outline-light">Browse pujas</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
