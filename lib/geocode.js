// Geocoding for the Puja Calculator (server-side).
// Primary: Open-Meteo geocoding API (free, no key). Falls back to a small
// offline table for resilience and offline/dev use. Also converts a local
// wall-clock birth time in an IANA timezone to the exact UTC instant.

const OFFLINE = {
  mumbai: { lat: 19.0760, lon: 72.8777, timezone: "Asia/Kolkata", label: "Mumbai, Maharashtra, India" },
  delhi: { lat: 28.6139, lon: 77.2090, timezone: "Asia/Kolkata", label: "New Delhi, Delhi, India" },
  "new delhi": { lat: 28.6139, lon: 77.2090, timezone: "Asia/Kolkata", label: "New Delhi, Delhi, India" },
  bengaluru: { lat: 12.9716, lon: 77.5946, timezone: "Asia/Kolkata", label: "Bengaluru, Karnataka, India" },
  bangalore: { lat: 12.9716, lon: 77.5946, timezone: "Asia/Kolkata", label: "Bengaluru, Karnataka, India" },
  kolkata: { lat: 22.5726, lon: 88.3639, timezone: "Asia/Kolkata", label: "Kolkata, West Bengal, India" },
  chennai: { lat: 13.0827, lon: 80.2707, timezone: "Asia/Kolkata", label: "Chennai, Tamil Nadu, India" },
  hyderabad: { lat: 17.3850, lon: 78.4867, timezone: "Asia/Kolkata", label: "Hyderabad, Telangana, India" },
  pune: { lat: 18.5204, lon: 73.8567, timezone: "Asia/Kolkata", label: "Pune, Maharashtra, India" },
  ahmedabad: { lat: 23.0225, lon: 72.5714, timezone: "Asia/Kolkata", label: "Ahmedabad, Gujarat, India" },
  jaipur: { lat: 26.9124, lon: 75.7873, timezone: "Asia/Kolkata", label: "Jaipur, Rajasthan, India" },
  lucknow: { lat: 26.8467, lon: 80.9462, timezone: "Asia/Kolkata", label: "Lucknow, Uttar Pradesh, India" },
  kanpur: { lat: 26.4499, lon: 80.3319, timezone: "Asia/Kolkata", label: "Kanpur, Uttar Pradesh, India" },
  varanasi: { lat: 25.3176, lon: 82.9739, timezone: "Asia/Kolkata", label: "Varanasi, Uttar Pradesh, India" },
  patna: { lat: 25.5941, lon: 85.1376, timezone: "Asia/Kolkata", label: "Patna, Bihar, India" },
  bhopal: { lat: 23.2599, lon: 77.4126, timezone: "Asia/Kolkata", label: "Bhopal, Madhya Pradesh, India" },
  indore: { lat: 22.7196, lon: 75.8577, timezone: "Asia/Kolkata", label: "Indore, Madhya Pradesh, India" },
  nagpur: { lat: 21.1458, lon: 79.0882, timezone: "Asia/Kolkata", label: "Nagpur, Maharashtra, India" },
  surat: { lat: 21.1702, lon: 72.8311, timezone: "Asia/Kolkata", label: "Surat, Gujarat, India" },
  chandigarh: { lat: 30.7333, lon: 76.7794, timezone: "Asia/Kolkata", label: "Chandigarh, India" },
  guwahati: { lat: 26.1445, lon: 91.7362, timezone: "Asia/Kolkata", label: "Guwahati, Assam, India" },
  bhubaneswar: { lat: 20.2961, lon: 85.8245, timezone: "Asia/Kolkata", label: "Bhubaneswar, Odisha, India" },
  thiruvananthapuram: { lat: 8.5241, lon: 76.9366, timezone: "Asia/Kolkata", label: "Thiruvananthapuram, Kerala, India" },
  kochi: { lat: 9.9312, lon: 76.2673, timezone: "Asia/Kolkata", label: "Kochi, Kerala, India" },
  amritsar: { lat: 31.6340, lon: 74.8723, timezone: "Asia/Kolkata", label: "Amritsar, Punjab, India" },
  london: { lat: 51.5074, lon: -0.1278, timezone: "Europe/London", label: "London, United Kingdom" },
  "new york": { lat: 40.7128, lon: -74.0060, timezone: "America/New_York", label: "New York, USA" },
  dubai: { lat: 25.2048, lon: 55.2708, timezone: "Asia/Dubai", label: "Dubai, UAE" },
  singapore: { lat: 1.3521, lon: 103.8198, timezone: "Asia/Singapore", label: "Singapore" },
  toronto: { lat: 43.6532, lon: -79.3832, timezone: "America/Toronto", label: "Toronto, Canada" },
  sydney: { lat: -33.8688, lon: 151.2093, timezone: "Australia/Sydney", label: "Sydney, Australia" },
};

export async function geocodePlace(place) {
  const city = String(place || "").split(",")[0].trim();
  if (!city) return null;
  const key = city.toLowerCase();
  if (OFFLINE[key]) return OFFLINE[key];
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (res.ok) {
      const j = await res.json();
      const r = j.results && j.results[0];
      if (r) return { lat: r.latitude, lon: r.longitude, timezone: r.timezone || "UTC", label: [r.name, r.admin1, r.country].filter(Boolean).join(", ") };
    }
  } catch {
    /* network unavailable — fall through to null */
  }
  return OFFLINE[key] || null;
}

// Offset (minutes) of an IANA timezone at a given UTC instant — DST-aware.
function tzOffsetMinutes(timeZone, utcMillis) {
  const d = new Date(utcMillis);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone, hour12: false, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(d).reduce((a, p) => { a[p.type] = p.value; return a; }, {});
  let hour = parseInt(parts.hour, 10);
  if (hour === 24) hour = 0;
  const asUTC = Date.UTC(+parts.year, +parts.month - 1, +parts.day, hour, +parts.minute, +parts.second);
  return Math.round((asUTC - utcMillis) / 60000);
}

// Convert a local wall-clock time (in `timeZone`) to the exact UTC Date.
export function zonedWallTimeToUtc(year, month, day, hour, minute, timeZone) {
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  const off1 = tzOffsetMinutes(timeZone, guess);
  let utc = guess - off1 * 60000;
  const off2 = tzOffsetMinutes(timeZone, utc);
  if (off2 !== off1) utc = guess - off2 * 60000; // refine across a DST boundary
  return new Date(utc);
}
