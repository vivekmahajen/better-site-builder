import Link from "next/link";
import { Suspense } from "react";
import TrackClient from "@/components/TrackClient";

export const metadata = {
  title: "Track your Puja — Live, stage-by-stage transparency | Aastha",
  description: "Track your puja like a parcel: priest assigned, sankalp recorded, ritual performed, HD video uploaded, prasad delivered — with timestamps and SLAs.",
};

export default function TrackOrderPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">Home</Link> / Track Order</div>
          <h1>Track your puja, stage by stage</h1>
          <p>The transparency no other devotional platform offers. Enter your booking ID to see exactly where your offering is — from sankalp to prasad at your door.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Suspense fallback={null}><TrackClient /></Suspense>
        </div>
      </section>

      <section style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow">Our promise</span><h2>Every stage, guaranteed in writing</h2></div>
          <div className="grid grid-4">
            <div className="card feature reveal"><div className="ico">🙏</div><h3>Sankalp confirmed</h3><p>We call to verify your name & gotra pronunciation before the ritual begins.</p></div>
            <div className="card feature reveal"><div className="ico">🎥</div><h3>48-hr video SLA</h3><p>Your HD ritual video is uploaded within 48 hours — or your money back.</p></div>
            <div className="card feature reveal"><div className="ico">📦</div><h3>Tracked prasad</h3><p>Prasad ships with a courier number you can follow right here.</p></div>
            <div className="card feature reveal"><div className="ico">💬</div><h3>Stuck? Real help</h3><p>24×7 live chat with a published 15-minute first-response SLA.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
