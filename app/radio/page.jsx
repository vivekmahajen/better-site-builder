import { Suspense } from "react";
import BhaktiRadio from "@/components/BhaktiRadio";

export const metadata = {
  title: "Aastha Bhakti Radio — Devotional music for the soul",
  description: "Listen to bhajans, aartis, kirtans and mantras in Hindi, Telugu, Tamil, Bengali, Gujarati, Marathi, Punjabi and Sanskrit. Choose a language, a singer, then a song.",
};

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "RadioStation",
  name: "Aastha Bhakti Radio",
  description: "Devotional music — bhajans, aartis, kirtans and mantras across 8 Indian languages.",
  inLanguage: ["hi", "te", "ta", "bn", "gu", "mr", "pa", "sa"],
};

export default function RadioPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <section className="radio-page">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <Suspense fallback={null}><BhaktiRadio /></Suspense>
        </div>
      </section>
    </>
  );
}
