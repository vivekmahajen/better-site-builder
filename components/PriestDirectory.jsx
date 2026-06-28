"use client";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/useTranslation";
import PriestGrid from "@/components/PriestGrid";

export default function PriestDirectory({ groups }) {
  const { t } = useTranslation();
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">{t("nav.home")}</Link> / {t("priests_page.title")}</div>
          <h1>{t("priests_page.title")}</h1>
          <p>{t("priests_page.intro")}</p>
        </div>
      </section>

      <section>
        <div className="wrap"><PriestGrid groups={groups} /></div>
      </section>

      <section style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow">{t("priests_page.features_eyebrow")}</span><h2>{t("priests_page.features_title")}</h2></div>
          <div className="grid grid-3">
            <div className="card feature reveal"><div className="ico">📜</div><h3>{t("priests_page.f1_title")}</h3><p>{t("priests_page.f1_body")}</p></div>
            <div className="card feature reveal"><div className="ico">🔐</div><h3>{t("priests_page.f2_title")}</h3><p>{t("priests_page.f2_body")}</p></div>
            <div className="card feature reveal"><div className="ico">✏️</div><h3>{t("priests_page.f3_title")}</h3><p>{t("priests_page.f3_body")}</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
