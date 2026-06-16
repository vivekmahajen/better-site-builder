import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="brand"><span className="mark om">ॐ</span><span>Aastha</span></div>
            <p>Bringing the temple home with verified priests, live tracking and total transparency. Devotion you can trust — and see.</p>
          </div>
          <div className="foot-col">
            <h4>Explore</h4>
            <Link href="/pujas">Book a Puja</Link>
            <Link href="/live-darshan">Live Darshan</Link>
            <Link href="/astrology">Astrology</Link>
            <Link href="/dosha-nivaran">Dosha Nivaran</Link>
            <Link href="/puja-calculator">Puja Calculator</Link>
            <Link href="/daily">Daily Aarti & Panchang</Link>
            <Link href="/track-order">Track Order</Link>
          </div>
          <div className="foot-col">
            <h4>Trust</h4>
            <Link href="#">Verified Priests</Link>
            <Link href="#">48-hr Video SLA</Link>
            <Link href="#">Refund Policy</Link>
            <Link href="#">How fulfilment works</Link>
          </div>
          <div className="foot-col">
            <h4>Support</h4>
            <Link href="/faq">FAQ</Link>
            <Link href="#">24×7 Live Chat</Link>
            <Link href="#">Help Center</Link>
            <Link href="#">Contact Us</Link>
            <Link href="#">Account & Security</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Aastha. A concept platform — content is illustrative.</span>
          <span>Made with devotion 🙏</span>
        </div>
      </div>
    </footer>
  );
}
