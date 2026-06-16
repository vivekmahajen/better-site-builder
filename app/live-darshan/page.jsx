import Link from "next/link";
import { LIVE } from "@/lib/catalog";
import LiveGrid from "@/components/LiveGrid";

export const metadata = {
  title: "Live Darshan — Watch aartis live from India's temples | Aastha",
  description: "Join live aarti and darshan from Kashi Vishwanath, Mahakaleshwar, Siddhivinayak, Vaishno Devi and more — streamed daily, free to watch.",
};

export default function LiveDarshanPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">Home</Link> / Live Darshan</div>
          <h1>Live Darshan</h1>
          <p>Stand before the deity from wherever you are. Watch live aartis streamed daily from India's most revered temples — free, in HD, with reminders for upcoming rituals.</p>
        </div>
      </section>

      <section>
        <div className="wrap"><LiveGrid items={LIVE} /></div>
      </section>

      <section style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="cta-band reveal">
            <h2>Turn darshan into devotion</h2>
            <p>Watched an aarti and felt moved? Book a personalized puja or chadhava at that very temple — and track it all the way home.</p>
            <div className="hero-cta"><Link href="/pujas" className="btn btn-primary">🪔 Book at these temples</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
