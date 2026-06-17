import { Suspense } from "react";
import PujaCalculator from "@/components/PujaCalculator";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Puja Calculator — Your personal Vedic ritual prescription | Aastha",
  description:
    "Enter your birth details and receive a personalised Vedic puja prescription — based on your Kundali, planetary doshas, current Dasha and today's Panchang.",
};

export default function PujaCalculatorPage() {
  return (
    <>
      <PageHero crumbKey="nav.puja_calculator" titleKey="calc_page.title" introKey="calc_page.intro" />

      <section>
        <div className="wrap" style={{ maxWidth: 920 }}>
          <Suspense fallback={null}><PujaCalculator /></Suspense>
        </div>
      </section>
    </>
  );
}
