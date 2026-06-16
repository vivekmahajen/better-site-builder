"use client";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="brand"><span className="mark om">ॐ</span><span>Aastha</span></div>
            <p>{t("footer.blurb")}</p>
          </div>
          <div className="foot-col">
            <h4>{t("footer.explore")}</h4>
            <Link href="/pujas">{t("nav.book_puja")}</Link>
            <Link href="/live-darshan">{t("nav.live_darshan")}</Link>
            <Link href="/astrology">{t("nav.astrology")}</Link>
            <Link href="/daan">{t("nav.daan")}</Link>
            <Link href="/dosha-nivaran">{t("nav.dosha_nivaran")}</Link>
            <Link href="/puja-calculator">{t("nav.puja_calculator")}</Link>
            <Link href="/daily">{t("nav.daily")}</Link>
            <Link href="/plans">{t("nav.plans")}</Link>
            <Link href="/track-order">{t("nav.track_order")}</Link>
          </div>
          <div className="foot-col">
            <h4>{t("footer.trust")}</h4>
            <Link href="#">Verified Priests</Link>
            <Link href="#">48-hr Video SLA</Link>
            <Link href="#">Refund Policy</Link>
            <Link href="#">How fulfilment works</Link>
          </div>
          <div className="foot-col">
            <h4>{t("footer.support")}</h4>
            <Link href="/faq">FAQ</Link>
            <Link href="#">24×7 Live Chat</Link>
            <Link href="#">Help Center</Link>
            <Link href="#">Contact Us</Link>
            <Link href="#">Account &amp; Security</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Aastha. A concept platform — content is illustrative.</span>
          <span>{t("footer.made")}</span>
        </div>
      </div>
    </footer>
  );
}
