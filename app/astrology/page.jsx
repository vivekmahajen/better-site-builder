import Link from "next/link";
import { verifiedAstrologers } from "@/lib/data";
import AstroGrid from "@/components/AstroGrid";

export const metadata = {
  title: "Talk to Verified Astrologers — Live Vedic consultations | Aastha",
  description: "Connect live with verified Vedic astrologers for kundli, marriage, career, vastu and remedies — transparent per-minute pricing and published credentials.",
};

export default function AstrologyPage() {
  const astrologers = verifiedAstrologers();
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">Home</Link> / Astrology</div>
          <h1>Talk to a verified astrologer</h1>
          <p>Real guidance from credential-checked Vedic astrologers — for career, marriage, kundli, vastu and remedies. Transparent per-minute pricing, with published credentials and experience shown up front.</p>
        </div>
      </section>

      <section>
        <div className="wrap"><AstroGrid items={astrologers} /></div>
      </section>

      <section style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow">No surprises</span><h2>Honest astrology, by design</h2></div>
          <div className="grid grid-3">
            <div className="card feature reveal"><div className="ico">🎓</div><h3>Verified credentials</h3><p>Every astrologer is background- and qualification-checked. Experience and specialities shown openly.</p></div>
            <div className="card feature reveal"><div className="ico">⏱️</div><h3>Per-minute clarity</h3><p>You see the rate before you connect, and a live timer during the call. No upselling, no fear tactics.</p></div>
            <div className="card feature reveal"><div className="ico">🔁</div><h3>From insight to action</h3><p>If a remedy puja is recommended, book it in one tap — then track it from sankalp to prasad.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
