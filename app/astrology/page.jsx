import { verifiedAstrologers } from "@/lib/data";
import AstrologyDirectory from "@/components/AstrologyDirectory";

export const metadata = {
  title: "Talk to Verified Astrologers — Live Vedic consultations | Aastha",
  description: "Connect live with verified Vedic astrologers for kundli, marriage, career, vastu and remedies — transparent per-minute pricing and published credentials.",
};

export default function AstrologyPage() {
  return <AstrologyDirectory astrologers={verifiedAstrologers()} />;
}
