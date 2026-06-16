"use client";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function PageHero({ crumbKey, titleKey, introKey }) {
  const { t } = useTranslation();
  return (
    <section className="page-hero">
      <div className="wrap">
        <div className="breadcrumb"><Link href="/">{t("nav.home")}</Link> / {t(crumbKey)}</div>
        <h1>{t(titleKey)}</h1>
        <p>{t(introKey)}</p>
      </div>
    </section>
  );
}
