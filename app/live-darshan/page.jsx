import Link from "next/link";
import { LIVE, STATES } from "@/lib/catalog";
import LiveGrid from "@/components/LiveGrid";
import StateDarshan from "@/components/StateDarshan";

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
        <div className="wrap">
          <div className="section-head reveal" style={{ marginBottom: 30 }}>
            <span className="eyebrow">Streaming now</span>
            <h2>Featured live darshan</h2>
            <p>Official 24×7 darshan from major temples — plays right here in the app.</p>
          </div>
          <LiveGrid items={LIVE} />
        </div>
      </section>

      <section style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Darshan across India</span>
            <h2>Top darshan site in every state</h2>
            <p>One revered shrine for each state & union territory. Tap a card to watch its live darshan — featured streams play in-app, the rest open the temple's current live stream on YouTube.</p>
          </div>
          <StateDarshan states={STATES} />
        </div>
      </section>

      <section style={{ background: "var(--cream)" }}>
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
