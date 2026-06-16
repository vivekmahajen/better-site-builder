import Link from "next/link";
import { DOSHAS, DOSHA_CATEGORIES, DOSHA_REMEDY_PUJAS } from "@/lib/catalog";
import DoshaNivaran from "@/components/DoshaNivaran";

export const metadata = {
  title: "Dosha Nivaran — Planetary Dosha Remedies & Sacred Pujas | Aastha",
  description:
    "A complete Vedic guide to planetary doshas (Mangal, Shani, Kaal Sarp, Pitru and more) — their effects, remedy pujas, beej mantras, Panchang timing, gemstones and daan. Book the remedy puja with a verified pandit.",
};

const EXPLAINER = [
  { ico: "📜", t: "What is a Dosha?", p: "\"Dosha\" means fault or imbalance. In Jyotish, it's a planetary configuration in your Kundali indicating karmic patterns now manifesting as challenges. Doshas are not curses — they are karma awaiting conscious resolution." },
  { ico: "⚡", t: "How Doshas Form", p: "Each of the nine planets governs life domains. When a planet is debilitated, badly placed, conjunct malefics, or afflicted by Rahu/Ketu, its energy distorts and creates a dosha. The Brihat Parashara Hora Shastra provides the foundational rules." },
  { ico: "🌸", t: "How to Remedy", p: "The four pillars: Mantra (resonant sound), Puja/Homam (ritual worship), Daan (charitable giving), and Upaya (lifestyle correction). Done sincerely, these don't suppress the dosha — they transform the underlying karma into grace." },
];

const STATS = [
  { n: "9", l: "Navagrahas" },
  { n: "12", l: "Doshas Covered" },
  { n: "5000+", l: "Years of Jyotish" },
  { n: "4", l: "Paths to Freedom" },
];

export default function DoshaNivaranPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">Home</Link> / Dosha Nivaran</div>
          <h1>Planetary Dosha Remedies</h1>
          <p>Understand the planetary afflictions in your birth chart — and the sacred pujas, mantras, and rituals that transform karmic challenges into blessings.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="grid grid-3">
            {EXPLAINER.map((e) => (
              <div className="card feature reveal" key={e.t}>
                <div className="ico">{e.ico}</div>
                <h3>{e.t}</h3>
                <p>{e.p}</p>
              </div>
            ))}
          </div>
          <div className="dosha-stats reveal">
            {STATS.map((s) => (
              <div className="dosha-stat" key={s.l}><div className="num">{s.n}</div><div className="lbl">{s.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Choose your planet</span>
            <h2>Find your dosha & its remedy</h2>
            <p>Tap any dosha to see its effects, the primary remedy puja, beej mantra, Panchang timing, gemstone, daan and more — then book the remedy with a verified pandit.</p>
          </div>
          <DoshaNivaran doshas={DOSHAS} categories={DOSHA_CATEGORIES} remedies={DOSHA_REMEDY_PUJAS} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="cta-band reveal">
            <h2>Not sure which dosha affects you?</h2>
            <p>Talk to a verified astrologer — they'll analyse your kundali and recommend the exact remedy puja for your chart.</p>
            <div className="hero-cta"><Link href="/astrology" className="btn btn-primary">🔮 Consult an astrologer</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
