// Planetary events 2026 (transits, retrogrades, eclipses, rare windows,
// combinations) for the Puja Calculator. Each event maps to a bookable remedy
// puja slug (resolved via lib/catalog getPuja). Client- and server-safe.

export const CAT_EMOJI = { transit: "🪐", retrograde: "↩️", rare: "✨", eclipse: "🌑", combination: "🔗" };
export const CAT_LABEL = { transit: "Transits", retrograde: "Retrogrades", rare: "Rare windows", eclipse: "Eclipses", combination: "Combinations" };

export const TRANSITS = [
  { id: "saturn-aries", category: "transit", name: "Saturn enters Aries — new 2.5-year cycle", start: "2026-03-08", end: "2028-04-30", remedy: "shani-dosha",
    blurb: "Saturn begins a fresh sidereal cycle in Aries, restructuring ambition, discipline and karmic responsibility.", harness: "Honour Shani with steady service and Saturday discipline." },
  { id: "jupiter-cancer", category: "transit", name: "Jupiter enters Cancer (exaltation)", start: "2026-06-02", end: "2027-06-30", remedy: "guru-dosha",
    blurb: "Jupiter moves into Cancer, its sign of exaltation — a year of grace, wisdom and growth around home and family.", harness: "Receive Guru's grace through Thursday worship, learning and charity." },
  { id: "rahu-aquarius", category: "transit", name: "Rahu → Aquarius, Ketu → Cancer", start: "2026-12-05", end: "2028-06-30", remedy: "rahu-dosha",
    blurb: "The nodal axis shifts for ~18 months, redefining career ambition (Rahu) and emotional / home karma (Ketu).", harness: "Steady the nodes with Rahu-Ketu remedies and daily meditation." },

  { id: "mercury-retro-summer", category: "retrograde", name: "Mercury retrograde (summer · approx.)", start: "2026-06-29", end: "2026-07-23", remedy: "budh-dosha",
    blurb: "Mercury turns retrograde — double-check communication, contracts and travel.", harness: "Strengthen Budh with Ganesha & Saraswati worship on Wednesdays." },
  { id: "saturn-retro", category: "retrograde", name: "Saturn retrograde (Aries)", start: "2026-07-13", end: "2026-11-28", remedy: "shani-dosha",
    blurb: "Saturn turns retrograde — revisit duties, clear karmic backlog and build patience.", harness: "Intensify Shani seva and the Hanuman Chalisa on Saturdays." },
  { id: "venus-retro", category: "retrograde", name: "Venus retrograde", start: "2026-10-03", end: "2026-11-14", remedy: "shukra-dosha",
    blurb: "Venus retrograde — reassess love, values, art and finances; avoid major new commitments in these areas.", harness: "Honour Shukra / Lakshmi on Fridays; serve women and cultivate beauty." },
  { id: "mercury-retro-autumn", category: "retrograde", name: "Mercury retrograde (autumn · approx.)", start: "2026-10-24", end: "2026-11-13", remedy: "budh-dosha",
    blurb: "The autumn Mercury retrograde — review plans carefully before acting.", harness: "Chant the Saraswati Vandana; keep communication ethical and precise." },

  { id: "jupiter-exalt-peak", category: "rare", name: "Jupiter exalted in Cancer (peak window)", start: "2026-06-02", end: "2026-10-31", remedy: "guru-dosha",
    blurb: "One of 2026's strongest influences — Jupiter at full exaltation strength. Excellent for vidya, dharma, children and expansion.", harness: "Begin learning, spiritual practice or auspicious ventures now." },

  { id: "solar-eclipse-aug", category: "eclipse", name: "Total Solar Eclipse", start: "2026-08-12", end: "2026-08-12", remedy: "mahamrityunjaya",
    blurb: "A total solar eclipse — a high-karma window where mantra and puja are greatly amplified; avoid new worldly action during totality.", harness: "Chant Mahamrityunjaya; pause new starts during the eclipse." },
  { id: "lunar-eclipse-aug", category: "eclipse", name: "Partial Lunar Eclipse", start: "2026-08-28", end: "2026-08-28", remedy: "chandra-dosha",
    blurb: "A partial lunar eclipse stirs the mind and emotions — protect mental peace with Chandra remedies.", harness: "Offer to Shiva / Chandra; meditate and fast lightly." },

  { id: "jupiter-ketu-leo", category: "combination", name: "Jupiter–Ketu conjunction in Leo", start: "2026-10-30", end: "2026-12-07", remedy: "guru-dosha",
    blurb: "A Guru-Ketu conjunction (Guru Chandal type) — can cloud judgement and faith, yet is potent for detachment and moksha-oriented sadhana.", harness: "Anchor wisdom with Guru worship and the Vishnu Sahasranama." },
];

const day = 86400000;
function endMs(e) { return e.end ? new Date(e.end + "T23:59:59Z").getTime() : new Date(e.start).getTime() + day; }

// Format a human date range like "8 Mar 2026 – 30 Apr 2028" / single day.
export function transitDates(e) {
  const fmt = (s) => new Date(s + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  return e.end && e.end !== e.start ? `${fmt(e.start)} – ${fmt(e.end)}` : fmt(e.start);
}

// Events active now or upcoming within `horizonDays`, annotated with status.
export function relevantTransits(ref = new Date(), horizonDays = 200) {
  const now = ref.getTime();
  const horizon = now + horizonDays * day;
  return TRANSITS
    .map((e) => {
      const s = new Date(e.start + "T00:00:00Z").getTime();
      const en = endMs(e);
      let status = null;
      if (s <= now && now <= en) status = "active";
      else if (s > now && s <= horizon) status = "upcoming";
      return status ? { ...e, status, startMs: s } : null;
    })
    .filter(Boolean)
    .sort((a, b) => (a.status === b.status ? a.startMs - b.startMs : a.status === "active" ? -1 : 1));
}

export const getTransit = (id) => TRANSITS.find((t) => t.id === id);
