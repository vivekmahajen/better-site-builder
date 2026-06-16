import Link from "next/link";
import PujaCalculator from "@/components/PujaCalculator";

export const metadata = {
  title: "Puja Calculator — Your personal Vedic ritual prescription | Aastha",
  description:
    "Enter your birth details and receive a personalised Vedic puja prescription — based on your Kundali, planetary doshas, current Dasha and today's Panchang.",
};

export default function PujaCalculatorPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">Home</Link> / Puja Calculator</div>
          <h1>🙏 Puja Calculator</h1>
          <p>Enter your birth details and receive a personalised Vedic puja prescription — based on your Kundali, planetary doshas, current Dasha, and today's Panchang.</p>
        </div>
      </section>

      <section>
        <div className="wrap" style={{ maxWidth: 920 }}>
          <PujaCalculator />
        </div>
      </section>
    </>
  );
}
