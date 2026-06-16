import Link from "next/link";
import DaanWidget from "@/components/DaanWidget";

export const metadata = {
  title: "Temple Daan — Donate for seva, annadanam & mandir causes | Aastha",
  description: "Offer daan to sacred causes — temple construction & renovation, annadanam, gaushala, deepa seva and Vedic education. Transparent, with a recorded receipt.",
};

const CAUSES = [
  { id: "construction", icon: "🛕", name: "Temple construction & renovation", desc: "Help build and restore mandirs" },
  { id: "annadanam", icon: "🍚", name: "Annadanam (feed devotees)", desc: "Sponsor meals for pilgrims & the needy" },
  { id: "gaushala", icon: "🐄", name: "Gaushala (cow care)", desc: "Fodder and shelter for temple cows" },
  { id: "deepa", icon: "🪔", name: "Deepa Seva (lamp offering)", desc: "Keep the temple lamps burning" },
  { id: "vastra", icon: "🧣", name: "Vastra Daan (clothing)", desc: "Garments for priests and the needy" },
  { id: "education", icon: "📿", name: "Vedic education (gurukul)", desc: "Support students of the shastras" },
];

export default function DaanPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">Home</Link> / Daan</div>
          <h1>Temple Daan</h1>
          <p>Offer daan to a sacred cause and receive a recorded receipt. Choose where your seva goes — from mandir construction to annadanam and gaushala.</p>
        </div>
      </section>

      <section>
        <div className="wrap" style={{ maxWidth: 1000 }}>
          <DaanWidget causes={CAUSES} />
        </div>
      </section>

      <section style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow">Why give through Aastha</span><h2>Transparent seva</h2></div>
          <div className="grid grid-3">
            <div className="card feature reveal"><div className="ico">🧾</div><h3>Recorded receipt</h3><p>Every daan generates a receipt ID, saved against your contribution.</p></div>
            <div className="card feature reveal"><div className="ico">🎯</div><h3>You choose the cause</h3><p>Direct your daan to the exact seva you care about — no pooled ambiguity.</p></div>
            <div className="card feature reveal"><div className="ico">🙏</div><h3>Alongside your puja</h3><p>Add daan to your devotion — book a puja and offer daan in the same place.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
