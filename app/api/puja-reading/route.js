import { NextResponse } from "next/server";
import { computeChart, getTodayPanchang, buildFallbackReading } from "@/lib/jyotish";
import { resolvePujaSlug, getPuja } from "@/lib/catalog";
import { geocodePlace, zonedWallTimeToUtc } from "@/lib/geocode";
import { getTransit, transitDates } from "@/lib/transits";

// Attach a bookable puja (slug/name/price) to each recommendation when one matches.
function withBooking(reading) {
  const pujas = (reading.pujas || []).map((p) => {
    const slug = resolvePujaSlug(p.name, p.deity);
    const bookable = slug ? getPuja(slug) : null;
    return bookable
      ? { ...p, bookSlug: slug, bookName: bookable.name, bookPrice: bookable.price }
      : p;
  });
  return { ...reading, pujas };
}

// JSON schema the model must return (structured outputs).
const READING_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    cosmic_profile: { type: "string" },
    pujas: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          rank: { type: "integer" },
          name: { type: "string" },
          deity: { type: "string" },
          priority: { type: "string", enum: ["critical", "high", "medium", "daily"] },
          why_for_you: { type: "string" },
          mantra: { type: "string" },
          timing: { type: "string" },
          key_samagri: { type: "string" },
          primary_benefit: { type: "string" },
        },
        required: ["rank", "name", "deity", "priority", "why_for_you", "mantra", "timing", "key_samagri", "primary_benefit"],
      },
    },
    daily_sadhana: { type: "string" },
    golden_muhurta: { type: "string" },
    jyotish_insight: { type: "string" },
  },
  required: ["cosmic_profile", "pujas", "daily_sadhana", "golden_muhurta", "jyotish_insight"],
};

async function aiReading(chart, transit) {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

  const transitBlock = transit
    ? `\nCURRENT PLANETARY EVENT TO FACTOR IN: ${transit.name} (${transitDates(transit)}).\n${transit.blurb}\nWeave this transit into the cosmic_profile and prioritise at least one puja that helps the person harness or remedy it.\n`
    : "";

  const prompt = `You are a senior Vedic astrologer (Jyotishi) with 30 years of experience. Analyse this birth chart and produce a personalised puja prescription.

BIRTH CHART
Name: ${chart.name}
DOB: ${chart.dob}  Time: ${chart.tob}  Place: ${chart.pob}
Lagna: ${chart.lagna}
Moon sign: ${chart.moonSign}
Nakshatra: ${chart.nakshatra}
Primary concern: ${chart.concern || "general wellbeing"}
Gender: ${chart.gender}

PLANETARY POSITIONS (sidereal)
${Object.entries(chart.planets).map(([p, v]) => `${p}: ${v.signName} (House ${v.house})`).join("\n")}

IDENTIFIED DOSHAS
${chart.doshas.map((d) => `- ${d.name}: ${d.reason}`).join("\n") || "None from this simplified analysis"}

CURRENT MAHADASHA: ${chart.activeDasha}
${transitBlock}
Provide: a 2-3 sentence cosmic_profile; the top 5 pujas in priority order, each grounded in THIS chart's actual house placements, doshas and dasha (name, deity, priority of critical|high|medium|daily, why_for_you, the key mantra, timing/day, one key_samagri item, primary_benefit); a daily_sadhana; a golden_muhurta for this week; and one profound jyotish_insight. Be specific to this chart — reference actual placements, not generic advice.`;

  const res = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 4000,
    thinking: { type: "adaptive" },
    output_config: { format: { type: "json_schema", schema: READING_SCHEMA } },
    messages: [{ role: "user", content: prompt }],
  });
  const text = res.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  return JSON.parse(text);
}

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "invalid_json" }, { status: 400 }); }

  const { name, dob, pob } = body || {};
  if (!name?.trim() || !dob || !pob?.trim()) {
    return NextResponse.json({ error: "missing_fields", message: "Name, date of birth and place of birth are required." }, { status: 400 });
  }

  // Geocode the birth place → coordinates + timezone (needed for an accurate Lagna).
  const geo = await geocodePlace(pob);
  if (!geo) {
    return NextResponse.json(
      { error: "geocode_failed", message: `Couldn't locate "${pob}". Try "City, Country" — e.g. "Pune, India".` },
      { status: 422 },
    );
  }

  let chart;
  try {
    const dobDate = new Date(dob); // YYYY-MM-DD
    const [y, mo, d] = [dobDate.getUTCFullYear(), dobDate.getUTCMonth() + 1, dobDate.getUTCDate()];
    const timeKnown = !!(body.tob && /^\d{1,2}:\d{2}$/.test(body.tob));
    const [hh, mi] = (timeKnown ? body.tob : "12:00").split(":").map(Number);
    const dateUtc = zonedWallTimeToUtc(y, mo, d, hh, mi, geo.timezone);
    chart = computeChart({ ...body, dateUtc, lat: geo.lat, lon: geo.lon, placeLabel: geo.label, timezone: geo.timezone, timeKnown });
  } catch (err) {
    console.error("chart computation failed:", err);
    return NextResponse.json({ error: "chart_error" }, { status: 400 });
  }

  const transit = body.transitId ? getTransit(body.transitId) : null;

  let reading;
  let source = "ai";
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      reading = await aiReading(chart, transit);
    } catch (err) {
      console.error("AI reading failed, using rule-based fallback:", err?.message || err);
      reading = buildFallbackReading(chart, transit);
      source = "fallback";
    }
  } else {
    reading = buildFallbackReading(chart, transit);
    source = "fallback";
  }

  reading = withBooking(reading);

  // Attach the selected transit as contextual cosmic weather + a bookable remedy.
  if (transit) {
    const rp = getPuja(transit.remedy);
    reading.transit = {
      id: transit.id, name: transit.name, category: transit.category,
      dates: transitDates(transit), blurb: transit.blurb, harness: transit.harness,
      ...(rp ? { bookSlug: transit.remedy, bookName: rp.name, bookPrice: rp.price } : {}),
    };
  }

  return NextResponse.json({ chart, dashas: chart.dashas, panchang: getTodayPanchang(), reading, source });
}
