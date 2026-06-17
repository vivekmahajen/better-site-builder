import Link from "next/link";
import { Suspense } from "react";
import { PUJAS, CATEGORIES, GOALS } from "@/lib/catalog";
import PujaBrowser from "@/components/PujaBrowser";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Book a Puja & Chadhava — Verified priests, all-inclusive pricing | Aastha",
  description: "Browse personalized puja & chadhava at 1000+ temples. Verified priests, transparent pricing, 48-hr HD video and prasad delivered home.",
};

export default function PujasPage() {
  return (
    <>
      <PageHero crumbKey="nav.pujas" titleKey="pujas_page.title" introKey="pujas_page.intro" />

      <section>
        <div className="wrap">
          <Suspense fallback={null}><PujaBrowser pujas={PUJAS} categories={CATEGORIES} goals={GOALS} showFilters /></Suspense>
        </div>
      </section>

      <section style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">For ongoing intentions</span>
            <h2>Subscription pujas</h2>
            <p>Set a puja to repeat every week or on a specific tithi — perfect for long-term health, prosperity or ancestral remembrance. Pause or cancel anytime.</p>
          </div>
          <div className="grid grid-3">
            <div className="card feature reveal"><div className="ico">📅</div><h3>Weekly</h3><p>Same puja, same temple, every week — with a fresh HD video and tracking each time.</p><div className="price" style={{ marginTop: 12 }}>from ₹699<small> /week</small></div></div>
            <div className="card feature reveal"><div className="ico">🌙</div><h3>By Tithi</h3><p>Aligned to Amavasya, Purnima, Ekadashi or your chosen tithi automatically.</p><div className="price" style={{ marginTop: 12 }}>from ₹899<small> /cycle</small></div></div>
            <div className="card feature reveal"><div className="ico">🕉️</div><h3>Annual Shraddh</h3><p>Never miss a parent's tithi — we remind you and perform it on the exact day, every year.</p><div className="price" style={{ marginTop: 12 }}>from ₹1,199<small> /year</small></div></div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="cta-band reveal">
            <h2>Not sure which puja you need?</h2>
            <p>Talk to a verified astrologer — they'll recommend the right ritual for your situation and muhurat.</p>
            <div className="hero-cta"><Link href="/astrology" className="btn btn-primary">🔮 Ask an astrologer</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
