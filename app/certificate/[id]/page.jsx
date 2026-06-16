import Link from "next/link";
import { getOrder } from "@/lib/db";
import PrintButton from "@/components/PrintButton";

export const metadata = { title: "Puja Certificate | Aastha", robots: { index: false } };

export default async function CertificatePage({ params }) {
  const { id } = await params;
  let order = null;
  try {
    order = await getOrder(id);
  } catch {
    order = null;
  }

  if (!order) {
    return (
      <section className="page-hero">
        <div className="wrap">
          <h1>Certificate not found</h1>
          <p>No booking matches “{id}”. Check your booking ID on the <Link href="/track-order">Track Order</Link> page.</p>
        </div>
      </section>
    );
  }

  const date = new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const names = [order.devotee, order.family].filter(Boolean).join(", ");

  return (
    <section className="cert-wrap">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="cert" id="cert">
          <div className="cert-border">
            <div className="cert-om om">ॐ</div>
            <div className="cert-brand">Aastha</div>
            <div className="cert-title">Certificate of Sankalp &amp; Puja</div>
            <p className="cert-line">This is to certify that the following puja was performed with full Vedic vidhi, sankalp in name &amp; gotra, on behalf of:</p>
            <div className="cert-names">{names}</div>
            {order.gotra && <div className="cert-gotra">Gotra: {order.gotra}</div>}
            <div className="cert-puja">{order.puja}</div>
            <div className="cert-meta">
              <div><span>Temple</span>{order.temple}</div>
              <div><span>Officiating priest</span>{order.priest}</div>
              {order.offerings && <div><span>Chadhava offered</span>{order.offerings}</div>}
              <div><span>Date of booking</span>{date}</div>
              <div><span>Status</span>{order.status}</div>
              <div><span>Certificate / Booking ID</span>{order.id}</div>
            </div>
            <p className="cert-bless">May the divine blessings of this puja bring peace, prosperity and protection to all named above. 🙏</p>
            <div className="cert-foot">
              <div className="cert-seal">✓ Verified · Aastha</div>
              <div className="cert-sign">Aastha — Bridge to the divine</div>
            </div>
          </div>
        </div>
        <div className="cert-actions no-print">
          <PrintButton />
          <Link href={`/track-order?id=${order.id}`} className="btn btn-primary btn-sm">Track this puja →</Link>
        </div>
      </div>
    </section>
  );
}
