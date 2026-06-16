// Vedic astrology calculation engine for the Puja Calculator.
// Approximate sidereal (Lahiri) positions for demonstration — precise charts
// require Swiss Ephemeris. Pure functions, safe to run on the server.

export const SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
export const SIGNS_HI = ["Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya", "Tula", "Vrischika", "Dhanus", "Makara", "Kumbha", "Meena"];
export const PLANETS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
export const PLANET_ICONS = { Sun: "☀️", Moon: "🌙", Mars: "🔴", Mercury: "💚", Jupiter: "⭐", Venus: "💗", Saturn: "🪐", Rahu: "🐍", Ketu: "☄️" };
export const PLANET_COLORS = { Sun: "#E8710A", Moon: "#5b6bd6", Mars: "#d83434", Mercury: "#2e9e2e", Jupiter: "#D4A017", Venus: "#d6418c", Saturn: "#7a7a92", Rahu: "#9370DB", Ketu: "#CD853F" };

const NAKSHATRAS = ["Ashwini", "Bharani", "Kritika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Moola", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishtha", "Shatabhisha", "Purva Bhadra", "Uttara Bhadra", "Revati"];
const NAKSHATRA_LORDS = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury", "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury", "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
const DASHA_YEARS = { Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17, Ketu: 7, Venus: 20 };
const TITHIS = ["Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima/Amavasya"];

function getApproxPlanetSign(planet, jd) {
  const T = (jd - 2451545.0) / 36525.0;
  const LAHIRI = 23.85 + T * 0.0137;
  let lon = 0;
  switch (planet) {
    case "Sun": lon = (280.46646 + 36000.76983 * T) % 360; break;
    case "Moon": lon = (218.3165 + 481267.8813 * T) % 360; break;
    case "Mars": lon = (355.45332 + 19140.30268 * T) % 360; break;
    case "Mercury": lon = (252.25084 + 149472.67411 * T) % 360; break;
    case "Jupiter": lon = (34.89503 + 3034.74612 * T) % 360; break;
    case "Venus": lon = (181.97980 + 58517.81538 * T) % 360; break;
    case "Saturn": lon = (50.07444 + 1222.11360 * T) % 360; break;
    case "Rahu": lon = (125.04452 - 1934.13626 * T) % 360; break;
    case "Ketu": lon = ((125.04452 - 1934.13626 * T) + 180) % 360; break;
  }
  if (lon < 0) lon += 360;
  const sidereal = (lon - LAHIRI + 360) % 360;
  return Math.floor(sidereal / 30);
}

function dateToJD(year, month, day, hour = 12) {
  if (month <= 2) { year -= 1; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + hour / 24 + B - 1524.5;
}

function getMoonNakshatra(moonSign, deg) {
  const moonLon = moonSign * 30 + deg;
  const idx = Math.floor(moonLon / (360 / 27));
  return { name: NAKSHATRAS[idx % 27], lord: NAKSHATRA_LORDS[idx % 27], pada: Math.floor((moonLon % (360 / 27)) / (360 / 27 / 4)) + 1, index: idx % 27 };
}

function assignHouses(planets, lagnaSign) {
  const result = {};
  Object.keys(planets).forEach((p) => {
    const sign = planets[p];
    const house = ((sign - lagnaSign + 12) % 12) + 1;
    result[p] = { sign, house, signName: SIGNS[sign], signHi: SIGNS_HI[sign] };
  });
  return result;
}

function calculateDasha(moonNak, dob) {
  const lords = Object.keys(DASHA_YEARS);
  const startIndex = lords.indexOf(moonNak.lord);
  const padaFraction = (moonNak.pada - 1) / 4;
  const firstBalance = DASHA_YEARS[moonNak.lord] * (1 - padaFraction);
  const dashas = [];
  let cumulative = 0;
  const today = new Date();
  const ageYears = (today - dob) / (365.25 * 24 * 3600 * 1000);
  for (let i = 0; i < 9; i++) {
    const lord = lords[(startIndex + i) % 9];
    const years = i === 0 ? firstBalance : DASHA_YEARS[lord];
    const startYear = cumulative;
    const endYear = cumulative + years;
    const isActive = ageYears >= startYear && ageYears < endYear;
    dashas.push({ lord, years: Number(years.toFixed(1)), startAge: Number(startYear.toFixed(1)), endAge: Number(endYear.toFixed(1)), isActive, progress: isActive ? Number(((ageYears - startYear) / years * 100).toFixed(0)) : (endYear < ageYears ? 100 : 0) });
    cumulative += years;
  }
  return dashas;
}

function identifyDoshas(planets) {
  const doshas = [];
  const { Sun, Moon, Mars, Jupiter, Saturn, Rahu, Ketu } = planets;
  const ord = (n) => `${n}${["st", "nd", "rd", "th"][Math.min(n - 1, 3)]}`;
  if ([1, 2, 4, 7, 8, 12].includes(Mars.house)) doshas.push({ name: "Mangal Dosha (Kuja Dosha)", planet: "Mars", severity: "high", reason: `Mars in the ${ord(Mars.house)} house from Lagna affects marriage harmony`, pujas: ["Mangal Shanti Puja", "Hanuman Puja", "Navagraha Puja"] });
  const rahuSign = Rahu.sign, ketuSign = Ketu.sign;
  const allBetween = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"].every((p) => {
    const s = planets[p].sign;
    return rahuSign < ketuSign ? s >= rahuSign && s <= ketuSign : s >= rahuSign || s <= ketuSign;
  });
  if (allBetween) doshas.push({ name: "Kaal Sarp Dosha", planet: "Rahu-Ketu", severity: "critical", reason: "All planets hemmed between the Rahu-Ketu axis", pujas: ["Kaal Sarp Dosh Nivaran Puja", "Rudrabhishek", "Maha Mrityunjaya Japa"] });
  if ([1, 4, 7, 10].includes(Saturn.house)) doshas.push({ name: "Shani Dosha", planet: "Saturn", severity: "high", reason: `Saturn in the ${ord(Saturn.house)} house creates Kantaka Shani — delays in key life areas`, pujas: ["Shani Puja", "Hanuman Chalisa Path", "Navagraha Homam"] });
  if (Rahu.house === 9 || Sun.house === Rahu.house || Sun.house === Ketu.house) doshas.push({ name: "Pitru Dosha", planet: "Sun/Rahu", severity: "medium", reason: "Rahu in 9th house or Sun-Rahu conjunction indicates ancestral karma requiring resolution", pujas: ["Pitru Tarpan", "Narayan Nagbali", "Pind Daan at Gaya"] });
  if (Jupiter.sign === Rahu.sign) doshas.push({ name: "Guru Chandal Dosha", planet: "Jupiter-Rahu", severity: "medium", reason: "Jupiter and Rahu in the same sign distorts wisdom and creates misguidance", pujas: ["Guru Puja", "Brihaspati Stotra", "Vishnu Sahasranama"] });
  if ([6, 8, 12].includes(Moon.house) || Moon.sign === Saturn.sign || Moon.sign === Rahu.sign) doshas.push({ name: "Chandra Dosha", planet: "Moon", severity: "medium", reason: `Moon in the ${ord(Moon.house)} house or with malefic planets affects mental peace and emotional stability`, pujas: ["Chandra Puja", "Shiva Puja on Mondays", "Chandra Namaskar"] });
  return doshas;
}

export function getTodayPanchang() {
  const today = new Date();
  const jd = dateToJD(today.getFullYear(), today.getMonth() + 1, today.getDate(), 12);
  const moonSign = getApproxPlanetSign("Moon", jd);
  const sunSign = getApproxPlanetSign("Sun", jd);
  const diff = ((moonSign * 30 + 15) - (sunSign * 30 + 15) + 360) % 360;
  const tithi = Math.floor(diff / 12) + 1;
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const vaara = days[today.getDay()];
  const nakIdx = Math.floor((moonSign * 30 + 15) / (360 / 27)) % 27;
  const rahuKaal = ["4:30–6:00 PM", "7:30–9:00 AM", "3:00–4:30 PM", "12:00–1:30 PM", "1:30–3:00 PM", "10:30 AM–12:00 PM", "9:00–10:30 AM"][today.getDay()];
  const yoga = ["Saubhagya", "Shobhana", "Sukarman", "Dhriti", "Soola", "Ganda", "Vriddhi", "Dhruva", "Harshana", "Vajra", "Siddhi", "Variyan", "Shiva", "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", "Mahendra", "Vaidhriti"][today.getDate() % 20];
  const todayDo = { Sunday: "Offer water to Surya at sunrise · gold & wheat", Monday: "Milk to Shiva · white flowers", Tuesday: "Hanuman puja · red flowers", Wednesday: "Ganesha puja · durva grass", Thursday: "Banana to Vishnu · yellow items", Friday: "Lotus to Lakshmi · white cloth", Saturday: "Sesame oil lamp · black til" }[vaara];
  return { tithi: TITHIS[Math.min(tithi - 1, 14)], paksha: tithi <= 15 ? "Shukla Paksha" : "Krishna Paksha", vaara, nakshatra: NAKSHATRAS[nakIdx], yoga, rahuKaal, moonRashi: SIGNS_HI[moonSign], sunRashi: SIGNS_HI[sunSign], todayDo };
}

// Compute the full chart from birth details.
export function computeChart({ name, dob, tob, pob, concern, gender }) {
  const dobDate = new Date(dob);
  const birthTime = tob || "12:00";
  const [bh, bm] = birthTime.split(":").map(Number);
  const jd = dateToJD(dobDate.getFullYear(), dobDate.getMonth() + 1, dobDate.getDate(), bh + bm / 60);
  const rawPlanets = {};
  PLANETS.forEach((p) => { rawPlanets[p] = getApproxPlanetSign(p, jd); });
  const lagnaSign = (rawPlanets.Sun + Math.floor(bh / 2)) % 12;
  const planets = assignHouses(rawPlanets, lagnaSign);
  const moonNak = getMoonNakshatra(rawPlanets.Moon, 15);
  const dashas = calculateDasha(moonNak, dobDate);
  const activeDasha = dashas.find((d) => d.isActive) || null;
  const doshas = identifyDoshas(planets);
  return {
    name, dob, tob: birthTime, pob, concern, gender,
    lagna: `${SIGNS[lagnaSign]} (${SIGNS_HI[lagnaSign]})`,
    moonSign: `${SIGNS[rawPlanets.Moon]} (${SIGNS_HI[rawPlanets.Moon]})`,
    nakshatra: `${moonNak.name} Pada ${moonNak.pada} (Lord: ${moonNak.lord})`,
    planets, dashas, activeDasha: activeDasha ? activeDasha.lord : moonNak.lord, doshas,
  };
}

// ── Puja knowledge base ──
export const PUJA_DB = {
  sun_weak: { name: "Surya Namaskar & Aditya Hridayam", deity: "Lord Surya", icon: "☀️", timing: "Daily at sunrise, especially Sundays", mantra: "ॐ ह्रीं ह्रीं सूर्याय नमः", benefits: ["Confidence & vitality restored", "Father relationship healed", "Career authority strengthened"], samagri: "Copper vessel of water with red flowers, red sandalwood, wheat, jaggery" },
  moon_weak: { name: "Chandra Puja & Shiva Abhishek", deity: "Lord Shiva & Chandra", icon: "🌙", timing: "Mondays and Purnima (full moon night)", mantra: "ॐ सों सोमाय नमः", benefits: ["Mental peace restored", "Sleep improved", "Emotional balance achieved"], samagri: "White flowers, milk, white rice, silver vessel, camphor" },
  mars_dosha: { name: "Mangal Shanti Puja & Hanuman Puja", deity: "Lord Hanuman & Mangal Devata", icon: "🔴", timing: "Tuesdays, especially Hanuman Jayanti", mantra: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः", benefits: ["Marriage harmony restored", "Anger controlled", "Courage amplified"], samagri: "Sindoor, red flowers, masoor dal, red cloth, coconut" },
  kaal_sarp: { name: "Kaal Sarp Dosh Nivaran Puja", deity: "Lord Shiva — Naga Devata", icon: "🐉", timing: "Monday + Saturday, especially Nag Panchami or at Trimbakeshwar", mantra: "ॐ नागकुलाय नमः — ॐ नमः शिवाय", benefits: ["Repeated obstacles removed", "Career finally moves forward", "Ancestral serpent karma resolved"], samagri: "Silver Nag-Nagin pair, milk, blue flowers, rudraksha, bilva leaves" },
  shani: { name: "Shani Puja & Hanuman Chalisa", deity: "Lord Shani & Lord Hanuman", icon: "🪐", timing: "Saturdays, especially Shani Amavasya and Shani Jayanti", mantra: "ॐ शं शनैश्चराय नमः", benefits: ["Delays dissolved", "Career obstacles removed", "Hard-won success arrives"], samagri: "Black sesame, mustard oil, urad dal, black cloth, iron" },
  rahu: { name: "Rahu Dosha Nivaran & Durga Puja", deity: "Goddess Durga & Rahu Devata", icon: "🐍", timing: "Saturdays, Rahu Kaal, and Nag Panchami", mantra: "ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः", benefits: ["Confusion & illusion lift", "Black magic protection", "Material obsession transcended"], samagri: "Blue flowers, hessonite (gomed), blue/black cloth, coconut, sesame" },
  ketu: { name: "Ketu Dosha Shanti & Ganesha Puja", deity: "Lord Ganesha & Ketu Devata", icon: "☄️", timing: "Tuesdays and Chaturthi, especially Sankashti", mantra: "ॐ केतवे नमः", benefits: ["Mysterious illness healed", "Spiritual clarity restored", "Grounding in physical world"], samagri: "Brown cloth, cat's-eye stone, sesame, multi-colored flowers, durva grass" },
  guru: { name: "Guru Puja & Vishnu Sahasranama", deity: "Lord Vishnu & Brihaspati", icon: "⭐", timing: "Thursdays, especially Guruvayur Ekadashi", mantra: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः", benefits: ["Wisdom restored", "Children blessed", "Financial prosperity flows"], samagri: "Yellow flowers, turmeric, yellow cloth, banana, chana dal, saffron" },
  venus: { name: "Shukra Puja & Lakshmi Aradhana", deity: "Goddess Lakshmi & Shukracharya", icon: "💗", timing: "Fridays, especially Varalakshmi Puja day", mantra: "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः", benefits: ["Love & marriage blessed", "Artistic gifts flourish", "Joy returns to life"], samagri: "White flowers, rose petals, curd, silver, white sandalwood, perfume, lotus" },
  pitru: { name: "Pitru Tarpan & Shraddha", deity: "Pitru Devatas (Ancestors)", icon: "🪔", timing: "Every Amavasya, and Pitru Paksha (16 days in Ashwin month)", mantra: "ॐ पितृभ्यः स्वधा नमः", benefits: ["Ancestral karma cleared", "Children and family blessed", "Generational trauma healed"], samagri: "Black sesame, water in copper vessel, cooked food, milk, white cloth" },
  ganesh: { name: "Ganesha Chaturthi Puja", deity: "Lord Ganesha", icon: "🐘", timing: "Every Chaturthi, especially Sankashti and Vinayak Chaturthi", mantra: "ॐ गं गणपतये नमः", benefits: ["All obstacles cleared", "New beginnings blessed", "Intelligence sharpened"], samagri: "21 modaks, durva grass (21 blades), red flowers, red cloth, coconut" },
  mahamrityunjaya: { name: "Mahamrityunjaya Japa", deity: "Lord Tryambakeshwara (Shiva)", icon: "🔱", timing: "Mondays, Maha Shivaratri, Brahma Muhurta (4–6 AM)", mantra: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्…", benefits: ["Serious illness healed", "Longevity extended", "Fear of death transcended"], samagri: "Rudraksha mala, bilva leaves, white flowers, holy water, ghee deepa" },
  satyanarayan: { name: "Satyanarayan Puja", deity: "Lord Vishnu (Satyanarayan)", icon: "🪷", timing: "Purnima of any month, after good news or before a new venture", mantra: "ॐ नमो भगवते वासुदेवाय", benefits: ["Family prosperity", "Business success", "New venture blessed"], samagri: "Panchamrit, banana, tulsi, yellow cloth, semolina for sheera prasad, coconut" },
  navgraha: { name: "Navagraha Puja & Homam", deity: "All Nine Planetary Deities", icon: "🌌", timing: "When significant life transitions occur, or astrologer prescribes", mantra: "ॐ नवग्रहाय नमः", benefits: ["All planetary doshas addressed", "Life balanced holistically", "Multiple blockages removed"], samagri: "Nine grains, nine flowers, nine cloths, nine incense sticks, nine metals" },
  durga: { name: "Durga Puja & Navratri Havan", deity: "Goddess Durga", icon: "⚔️", timing: "Navratri (twice yearly), and Ashtami of any month", mantra: "ॐ दुं दुर्गायै नमः", benefits: ["Enemy protection", "Strength & courage", "All obstacles overcome"], samagri: "Red hibiscus (108), red cloth, durva, bilva, coconut, sindoor" },
  lakshmi: { name: "Lakshmi Puja (Diwali & Fridays)", deity: "Goddess Lakshmi", icon: "🪙", timing: "Diwali (Kartik Amavasya), every Friday, and Purnima", mantra: "ॐ श्रीं महालक्ष्म्यै नमः", benefits: ["Financial prosperity", "Home abundance", "Material blessings arrive"], samagri: "Lotus flowers, 108 coins, shankha, turmeric, kumkum, ghee deepa" },
  hanuman: { name: "Hanuman Puja & Chalisa Path", deity: "Lord Hanuman", icon: "💪", timing: "Tuesdays and Saturdays, Hanuman Jayanti (Chaitra Purnima)", mantra: "ॐ हं हनुमते नमः", benefits: ["Protection from evil", "Saturn troubles reduced", "Fear & anxiety dissolved"], samagri: "Sindoor, jasmine oil, orange flowers, red garments, betel leaves, coconut" },
  rudrabhishek: { name: "Rudrabhishek Puja", deity: "Lord Shiva (Rudra)", icon: "🔱", timing: "Mondays, Pradosh Vrat (Trayodashi), especially Shravan month", mantra: "ॐ नमः शिवाय — Sri Rudram recitation", benefits: ["All doshas addressed", "Health & longevity", "Spiritual awakening"], samagri: "Panchamrit, bilva patra, gangajal, dhatura, white flowers, rudraksha" },
};

const CONCERN_PUJAS = {
  health: ["mahamrityunjaya", "rudrabhishek", "navgraha", "sun_weak"],
  marriage: ["mars_dosha", "venus", "satyanarayan", "ganesh"],
  career: ["ganesh", "lakshmi", "navgraha", "guru"],
  children: ["satyanarayan", "guru", "moon_weak", "durga"],
  spiritual: ["rudrabhishek", "mahamrityunjaya", "ganesh", "navgraha"],
  obstacles: ["ganesh", "hanuman", "durga", "kaal_sarp"],
  peace: ["moon_weak", "mahamrityunjaya", "satyanarayan", "hanuman"],
  prosperity: ["lakshmi", "guru", "satyanarayan", "navgraha"],
  education: ["guru", "ganesh", "moon_weak", "navgraha"],
  protection: ["hanuman", "durga", "kaal_sarp", "rahu"],
};
const DASHA_PUJAS = {
  Sun: ["sun_weak", "rudrabhishek", "satyanarayan"], Moon: ["moon_weak", "rudrabhishek", "satyanarayan"],
  Mars: ["mars_dosha", "hanuman", "rudrabhishek"], Mercury: ["ganesh", "guru", "navgraha"],
  Jupiter: ["guru", "rudrabhishek", "satyanarayan"], Venus: ["venus", "lakshmi", "satyanarayan"],
  Saturn: ["shani", "hanuman", "rudrabhishek"], Rahu: ["rahu", "kaal_sarp", "navgraha"], Ketu: ["ketu", "mahamrityunjaya", "navgraha"],
};

// Rule-based reading — used when no AI key is configured or the AI call fails.
export function buildFallbackReading(chart) {
  const concern = chart.concern || "obstacles";
  const dasha = chart.activeDasha;
  const keys = [...new Set([...(CONCERN_PUJAS[concern] || CONCERN_PUJAS.obstacles), ...(DASHA_PUJAS[dasha] || []), "ganesh", "navgraha"])].slice(0, 5);
  const priorities = ["critical", "high", "high", "medium", "daily"];
  return {
    cosmic_profile: `${chart.name} carries the energy of ${chart.nakshatra} with ${chart.lagna} rising — a soul on a journey of deep purpose. The ${dasha} Mahadasha currently shapes your experiences, calling you toward specific spiritual practices aligned with your birth chart.`,
    pujas: keys.map((key, i) => {
      const p = PUJA_DB[key] || PUJA_DB.ganesh;
      return { rank: i + 1, name: p.name, deity: p.deity, priority: priorities[i], why_for_you: `Based on your ${dasha} Mahadasha and focus on ${concern}, this puja brings targeted blessings aligned with your current planetary period.`, mantra: p.mantra, timing: p.timing, key_samagri: p.samagri.split(",")[0], primary_benefit: p.benefits[0] };
    }),
    daily_sadhana: `Chant "Om Namah Shivaya" 108 times each morning at sunrise, facing East. In your ${dasha} Mahadasha, this anchors divine protection and aligns your daily energy with cosmic grace.`,
    golden_muhurta: `This coming ${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()]} morning, between sunrise and 9 AM, is your most powerful window this week for puja.`,
    jyotish_insight: `Your ${chart.nakshatra} indicates a deep soul purpose connected to service, wisdom, and the transformation of karmic patterns into living grace.`,
  };
}

// Match an AI/rule puja name back to PUJA_DB for icons & extra data.
export function matchPujaMeta(name = "", deity = "") {
  const n = name.toLowerCase();
  const key = Object.keys(PUJA_DB).find((k) => {
    const db = PUJA_DB[k];
    return n.includes(db.name.toLowerCase().split(" ")[0]) || db.name.toLowerCase().includes(n.split(" ")[0]) || db.deity.toLowerCase().includes((deity || "").toLowerCase().split(" ").slice(-1)[0]);
  });
  return key ? PUJA_DB[key] : null;
}
