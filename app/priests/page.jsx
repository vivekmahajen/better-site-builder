import Link from "next/link";
import { verifiedPriests, templeById } from "@/lib/data";
import PriestGrid from "@/components/PriestGrid";

export const metadata = {
  title: "Verified Temple Priests — sourced from official temple records | Aastha",
  description: "A directory of verified temple priests, grouped by temple, sourced from official temple-trust records. Booking is routed through each temple's official channel.",
};

function groupByTemple(priests) {
  const map = new Map();
  for (const p of priests) {
    if (!map.has(p.temple_id)) map.set(p.temple_id, []);
    map.get(p.temple_id).push(p);
  }
  return [...map.entries()].map(([tid, list]) => ({ temple: templeById(tid), priests: list }));
}

export default function PriestsPage() {
  const groups = groupByTemple(verifiedPriests());
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">Home</Link> / Temple Priests</div>
          <h1>Verified temple priests</h1>
          <p>
            Priests sourced from official temple-trust records and published only when verified.
            We prefer routing you through each temple&apos;s official booking channel rather than
            publishing personal contact details — and we list a priest&apos;s personal contact only
            with their recorded consent.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap"><PriestGrid groups={groups} /></div>
      </section>

      <section style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow">How this directory works</span><h2>Sourced, consenting, correctable</h2></div>
          <div className="grid grid-3">
            <div className="card feature reveal"><div className="ico">📜</div><h3>Official records</h3><p>Listings come from temple-trust records — never invented names or numbers.</p></div>
            <div className="card feature reveal"><div className="ico">🔐</div><h3>Consent for contact</h3><p>Personal phone numbers appear only with the priest&apos;s recorded consent; otherwise we route through the temple.</p></div>
            <div className="card feature reveal"><div className="ico">✏️</div><h3>Correction &amp; removal</h3><p>Every listed person can request an edit or removal in one click.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
