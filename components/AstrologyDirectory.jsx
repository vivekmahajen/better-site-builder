"use client";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/useTranslation";
import AstroGrid from "@/components/AstroGrid";

export default function AstrologyDirectory({ astrologers }) {
  const { t } = useTranslation();
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">{t("nav.home")}</Link> / {t("nav.astrology")}</div>
          <h1>{t("astro_page.title")}</h1>
          <p>{t("astro_page.intro")}</p>
        </div>
      </section>

      <section>
        <div className="wrap"><AstroGrid items={astrologers} /></div>
      </section>

      <section style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow">{t("astro_page.features_eyebrow")}</span><h2>{t("astro_page.features_title")}</h2></div>
          <div className="grid grid-3">
            <div className="card feature reveal"><div className="ico">🎓</div><h3>{t("astro_page.f1_title")}</h3><p>{t("astro_page.f1_body")}</p></div>
            <div className="card feature reveal"><div className="ico">⏱️</div><h3>{t("astro_page.f2_title")}</h3><p>{t("astro_page.f2_body")}</p></div>
            <div className="card feature reveal"><div className="ico">🔁</div><h3>{t("astro_page.f3_title")}</h3><p>{t("astro_page.f3_body")}</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
