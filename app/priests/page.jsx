import { verifiedPriests, templeById } from "@/lib/data";
import PriestDirectory from "@/components/PriestDirectory";

export const metadata = {
  title: "Verified Temple Priests — sourced from official temple records | Aastha",
  description: "A directory of verified temple priests, grouped by temple, sourced from official temple-trust records. Booking is routed through each temple's official channel.",
};

function groupByTemple(priests) {
  const map = new Map();
  for (const p of priests) {
    if (!map.has(p.temple_id)) map.set(p.temple_id, []);
    map.get(p.temple_id).push(p);
  }
  return [...map.entries()].map(([tid, list]) => ({ temple: templeById(tid), priests: list }));
}

export default function PriestsPage() {
  return <PriestDirectory groups={groupByTemple(verifiedPriests())} />;
}
