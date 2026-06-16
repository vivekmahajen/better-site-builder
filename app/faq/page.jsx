import Link from "next/link";

export const metadata = {
  title: "FAQ — Booking, pujas, tracking & prasad | Aastha",
  description: "Answers to common questions about booking puja & chadhava on Aastha — verified priests, live order tracking, the 48-hour video SLA, prasad delivery, the puja calculator and refunds.",
};

const FAQS = [
  { q: "How does booking a puja on Aastha work?", a: "Choose a puja, share the name & gotra for the sankalp, and pay. We assign a verified priest, confirm the name pronunciation with you, perform the ritual on the muhurat, upload an HD video within 48 hours, and courier the prasad to your home — every stage visible on your Track Order page." },
  { q: "Can I track my puja after booking?", a: "Yes. Every booking gets a live, stage-by-stage timeline — order confirmed, priest assigned, sankalp recorded, ritual performed, video uploaded, prasad delivered — with timestamps. Open Track Order and enter your booking ID (e.g. AAS-12345)." },
  { q: "Are the priests verified?", a: "Every pandit is credential-checked — we show their name, years of experience and temple. We also confirm your name & gotra pronunciation before the ritual and guarantee a full, unhurried ceremony." },
  { q: "When will I get the puja video and prasad?", a: "Your HD ritual video is uploaded within 48 hours of the puja (our written SLA). Consecrated prasad is couriered to your address with a trackable shipment number, shown inside your order timeline." },
  { q: "What is the Puja Calculator?", a: "It's a free, instant tool: enter your birth details and it computes your Vedic chart (real ephemeris, Lahiri sidereal), Lagna, Dasha and doshas, then recommends pujas — factoring today's planetary transits. Each recommendation is one tap to book and track." },
  { q: "What does 'all-inclusive pricing' mean?", a: "Every puja shows one price with an explicit 'what's included' list — sankalp, the ritual, the HD video and prasad delivery. No surprises at checkout." },
  { q: "Do you offer live darshan?", a: "Yes — watch live aarti and darshan from major temples in-app, plus a directory of the top darshan site in every Indian state and union territory." },
  { q: "Can I get a refund?", a: "If we miss the 48-hour video SLA, you're eligible for a refund. Reach our 24×7 support with your booking ID and we'll resolve it with a published response-time SLA." },
  { q: "Do you perform dosha remedies?", a: "Yes. The Dosha Nivaran section covers 12 doshas (Mangal, Shani, Kaal Sarp, Pitru and more) with effects, the remedy puja, beej mantra, Panchang timing, gemstone and daan — and each remedy puja is bookable and trackable." },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">Home</Link> / FAQ</div>
          <h1>Frequently asked questions</h1>
          <p>Everything about booking, verified priests, live tracking, prasad delivery and the puja calculator.</p>
        </div>
      </section>

      <section>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="faq-list">
            {FAQS.map((f) => (
              <details className="faq-item card" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <div className="cta-band reveal" style={{ marginTop: 32 }}>
            <h2>Still have a question?</h2>
            <p>Our 24×7 support team replies within the published SLA — or book your puja now and watch it every step of the way.</p>
            <div className="hero-cta">
              <Link href="/pujas" className="btn btn-primary">🪔 Book a puja</Link>
              <Link href="/track-order" className="btn btn-outline-light">Track an order</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
