import Link from "next/link";
import { PANCHANG, TRACKS } from "@/lib/catalog";
import DailyPlayer from "@/components/DailyPlayer";

export const metadata = {
  title: "Daily Aarti, Panchang & Horoscope — Free devotional library | Aastha",
  description: "Your daily devotion: today's Panchang & Shubh Muhurat, plus a free, ad-free library of aartis, chalisas, mantras and bhajans.",
};

export default function DailyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">Home</Link> / Daily</div>
          <h1>Your daily devotion</h1>
          <p>Begin each day with today's Panchang and Shubh Muhurat, and a free, completely ad-free library of aartis, chalisas, mantras and bhajans.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head reveal" style={{ marginBottom: 30 }}>
            <span className="eyebrow">Today · Tuesday</span>
            <h2>Aaj ka Panchang</h2>
          </div>
          <div className="panchang reveal">
            {PANCHANG.map((p) => (
              <div className="pan-item" key={p.k}><div className="k">{p.k}</div><div className="v">{p.v}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">5,000+ tracks · ad-free</span>
            <h2>Aarti, Chalisa & Bhajan library</h2>
            <p>Listen anytime, completely free and without ads — the way devotion should be.</p>
          </div>
          <DailyPlayer tracks={TRACKS} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="cta-band reveal">
            <h2>Found an auspicious muhurat today?</h2>
            <p>Book a puja for the right time — and follow it live from sankalp to prasad at your door.</p>
            <div className="hero-cta"><Link href="/pujas" className="btn btn-primary">🪔 Book a puja</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
