// Aastha — static catalogue (deities, pujas, astrologers, live darshan, daily)
// Demo content, illustrative only.
import { RAW_PUJAS } from "./pujas-data";
import { RAW_DOSHAS } from "./doshas-data";
export { DOSHA_CATEGORIES } from "./doshas-data";

// Category metadata (deity-based) used for filtering on the Pujas page.
export const CATEGORIES = [
  { id: "All", label: "All Pujas" },
  { id: "shiva", label: "🔱 Shiva" },
  { id: "vishnu", label: "🪷 Vishnu" },
  { id: "devi", label: "🌸 Devi" },
  { id: "ganesh", label: "🐘 Ganesha" },
  { id: "navagraha", label: "🪐 Navagraha" },
  { id: "lifecycle", label: "🏠 Lifecycle" },
  { id: "regional", label: "🌏 Regional" },
];

const PRICE_BY_TYPE = {
  "Mantra Japa": 1500, "Dosha Nivaran": 1800, "Graha Puja": 1500, "Abhishek Puja": 1300,
  "Grand Festival Puja": 1500, "Grand Procession Puja": 1500, "Festival Puja": 1100,
  "Festival & Weekly Puja": 1100, "Midnight Puja": 1300, "Home Puja": 700, "Daily Puja": 500,
  "Archana Puja": 800, "Temple Archana": 900, "Nine-Night Vrat": 2100, "Women's Vrat": 900,
  "Monthly Vrat": 700, "Samskara": 2500, "Samskara Puja": 2100, "Wealth Puja": 1500,
  "Devotional Puja": 800, "Solar Worship": 900, "Harvest Festival Puja": 1100,
  "Agricultural Festival Puja": 1100,
};
const PRIESTS = [
  ["Pt. Ramesh Dwivedi", 18], ["Pt. Srinivasa Sharma", 21], ["Pt. K. Subramaniam", 24],
  ["Pt. Omkar Nath Tiwari", 23], ["Acharya Anil Joshi", 15], ["Pt. Giridhar Goswami", 17],
  ["Pt. Mahesh Trivedi", 20], ["Acharya Vinod Shastri", 19], ["Pt. Bhupen Goswami", 16],
  ["Pt. Anantha Shastri", 22],
];
const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

// Booking inclusions every puja ships with.
const inclusionsFor = (p) => [
  "Sankalp performed in your name & gotra",
  `Complete vidhi by a verified ${p.deity.split("(")[0].trim()} pandit`,
  "HD video + personal sankalp & offering clips within 48 hrs",
  "Blessed prasad couriered to your home",
];

// Life-goal / "shop by need" tags, derived from each puja's benefits + description.
export const GOALS = [
  { id: "All", label: "All needs" },
  { id: "health", label: "🩺 Health & longevity" },
  { id: "wealth", label: "💰 Wealth & success" },
  { id: "marriage", label: "💍 Marriage & love" },
  { id: "family", label: "👨‍👩‍👧 Family & children" },
  { id: "education", label: "📚 Education & wisdom" },
  { id: "protection", label: "🛡️ Protection" },
  { id: "peace", label: "🕉️ Peace of mind" },
  { id: "spiritual", label: "🪷 Spiritual growth" },
];
const GOAL_KEYWORDS = {
  health: /health|healing|illness|longevity|vitality|disease|surgery/i,
  wealth: /wealth|prosperity|abundance|business|financ|money|debt|fortune|career/i,
  marriage: /marri|marital|spouse|\blove\b|relationship|partner|husband|wife/i,
  family: /child|progeny|santan|family|home|household|ancestor|pitru/i,
  education: /educat|knowledge|wisdom|learning|academic|intellig|vidya|memory|study/i,
  protection: /protect|evil|enemy|fear|negative|black magic|obstacle|nazar|shield/i,
  peace: /peace|mental|anxiet|emotional|\bcalm\b|sleep|stillness|stress/i,
  spiritual: /moksha|liberation|spiritual|devotion|detachment|enlighten|consciousness/i,
};
function deriveGoals(p) {
  const text = `${p.desc} ${(p.benefits || []).map((b) => `${b.t} ${b.d}`).join(" ")}`;
  const goals = Object.keys(GOAL_KEYWORDS).filter((g) => GOAL_KEYWORDS[g].test(text));
  return goals.length ? goals : ["spiritual"];
}

// Derive the app's bookable puja list from the full reference data, enriching
// each with booking fields (slug, price, priest, inclusions) and life-goal tags
// while keeping all the descriptive info (sanskrit, region, when, significance…).
export const PUJAS = RAW_PUJAS.map((p) => {
  const [priest, priestYears] = PRIESTS[hash(p.id) % PRIESTS.length];
  return {
    ...p,
    slug: p.id,
    emoji: p.deityEmoji,
    temple: p.region,
    price: PRICE_BY_TYPE[p.type] ?? 1100,
    priest,
    priestYears,
    incl: inclusionsFor(p),
    goals: deriveGoals(p),
  };
}).sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

export const ASTROLOGERS = [
  { initials: "RP", name: "Acharya Rohit Pandey", spec: "Vedic • Kundli • Career", exp: 18, rating: 4.9, rate: 35, online: true },
  { initials: "MS", name: "Dr. Meena Shastri", spec: "Marriage • Manglik • Tarot", exp: 22, rating: 4.8, rate: 45, online: true },
  { initials: "VT", name: "Pt. Vivek Trivedi", spec: "Numerology • Vastu", exp: 12, rating: 4.7, rate: 28, online: true },
  { initials: "AS", name: "Acharya Anjali Sharma", spec: "Prashna • Lal Kitab", exp: 15, rating: 4.9, rate: 40, online: false },
  { initials: "GK", name: "Pt. Gopal Krishnan", spec: "Jyotish • Muhurat", exp: 25, rating: 5.0, rate: 55, online: true },
  { initials: "SD", name: "Acharya Suman Das", spec: "Palmistry • Remedies", exp: 10, rating: 4.6, rate: 22, online: true },
];

// Live darshan sources are major, established institutional channels that run
// official 24/7 darshan and won't be taken down (unlike small temple channels,
// which get terminated or stop streaming). Each `channel` is a verified channel id.
export const LIVE = [
  { temple: "Siddhivinayak", city: "Mumbai", ritual: "Ganpati Darshan", time: "Live now", live: true, viewers: "16.9k", videoId: "1oS-N5Y0QHI" },
  { temple: "ISKCON Vrindavan", city: "Vrindavan", ritual: "Krishna Balaram Darshan", time: "Live now", live: true, viewers: "18.2k", channel: "UCAA6IsLVfbHrP1I_lzxv09Q" },
  { temple: "ISKCON Bangalore", city: "Bengaluru", ritual: "Radha Krishna Darshan", time: "Live now", live: true, viewers: "11.5k", channel: "UCPXnayBvF7ynbG_I3VOTgIg" },
  { temple: "Tirumala · SVBC", city: "Tirupati", ritual: "Venkateswara Seva", time: "Live now", live: true, viewers: "24.3k", channel: "UCTboTRX74UydvU_cBdm_cCQ" },
  { temple: "Vrindavan Chandrodaya", city: "Vrindavan", ritual: "Sandhya Aarti", time: "Live now", live: true, viewers: "8.7k", channel: "UCFi2lv2x3yo8Ha2jciDzD2w" },
  { temple: "Kashi Vishwanath", city: "Varanasi", ritual: "Mangala Aarti", time: "Live now", live: true, viewers: "12.4k", channel: "UCdMj2twWfMHXrWgX5oVdoyA" },
  { temple: "Golden Temple", city: "Amritsar", ritual: "Palki Sahib", time: "9:45 PM today", live: false, viewers: "—", channel: null },
];

// Fallback live-darshan channel (ISKCON Bangalore — official 24/7 darshan).
export const LIVE_FALLBACK_CHANNEL = "UCPXnayBvF7ynbG_I3VOTgIg";

// Top darshan site in every Indian state & major union territory.
// `channel` (optional, verified) enables the in-app player; otherwise the card
// opens YouTube's *live* search for that temple, which always surfaces whatever
// stream is actually live right now — robust to channels being removed/offline.
export const STATES = [
  { region: "Andhra Pradesh", temple: "Tirumala Venkateswara", city: "Tirupati", deity: "Lord Venkateswara", channel: "UCTboTRX74UydvU_cBdm_cCQ" },
  { region: "Arunachal Pradesh", temple: "Parashuram Kund", city: "Lohit", deity: "Lord Parashuram" },
  { region: "Assam", temple: "Kamakhya Devi", city: "Guwahati", deity: "Maa Kamakhya" },
  { region: "Bihar", temple: "Mahabodhi Temple", city: "Bodh Gaya", deity: "Lord Buddha" },
  { region: "Chhattisgarh", temple: "Maa Bamleshwari", city: "Dongargarh", deity: "Maa Bamleshwari" },
  { region: "Goa", temple: "Shree Mangueshi Temple", city: "Ponda", deity: "Lord Manguesh (Shiva)" },
  { region: "Gujarat", temple: "Somnath Jyotirlinga", city: "Prabhas Patan", deity: "Lord Somnath (Shiva)" },
  { region: "Haryana", temple: "Mata Mansa Devi", city: "Panchkula", deity: "Maa Mansa Devi" },
  { region: "Himachal Pradesh", temple: "Jwala Ji", city: "Jwalamukhi", deity: "Maa Jwalamukhi" },
  { region: "Jharkhand", temple: "Baidyanath Dham", city: "Deoghar", deity: "Lord Baidyanath (Shiva)" },
  { region: "Karnataka", temple: "Sri Krishna Matha", city: "Udupi", deity: "Lord Krishna" },
  { region: "Kerala", temple: "Sabarimala Ayyappa", city: "Pathanamthitta", deity: "Lord Ayyappa" },
  { region: "Madhya Pradesh", temple: "Mahakaleshwar Jyotirlinga", city: "Ujjain", deity: "Lord Mahakal (Shiva)" },
  { region: "Maharashtra", temple: "Shree Siddhivinayak", city: "Mumbai", deity: "Lord Ganesha", videoId: "1oS-N5Y0QHI" },
  { region: "Manipur", temple: "Shree Govindajee Temple", city: "Imphal", deity: "Lord Govindajee" },
  { region: "Meghalaya", temple: "Nartiang Durga Temple", city: "Jaintia Hills", deity: "Maa Durga (Shakti Peeth)" },
  { region: "Mizoram", temple: "Solomon's Temple", city: "Aizawl", deity: "Christian shrine" },
  { region: "Nagaland", temple: "Dimapur Kalibari", city: "Dimapur", deity: "Maa Kali" },
  { region: "Odisha", temple: "Shree Jagannath", city: "Puri", deity: "Lord Jagannath" },
  { region: "Punjab", temple: "Golden Temple (Harmandir Sahib)", city: "Amritsar", deity: "Sri Guru Granth Sahib" },
  { region: "Rajasthan", temple: "Khatu Shyam Ji", city: "Sikar", deity: "Khatu Shyam (Krishna)" },
  { region: "Sikkim", temple: "Rumtek Monastery", city: "Gangtok", deity: "Buddhist Dharmachakra" },
  { region: "Tamil Nadu", temple: "Meenakshi Amman", city: "Madurai", deity: "Maa Meenakshi" },
  { region: "Telangana", temple: "Yadadri Lakshmi Narasimha", city: "Yadagirigutta", deity: "Lord Narasimha" },
  { region: "Tripura", temple: "Tripura Sundari", city: "Udaipur (Tripura)", deity: "Maa Tripura Sundari (Shakti Peeth)" },
  { region: "Uttar Pradesh", temple: "Kashi Vishwanath", city: "Varanasi", deity: "Lord Vishwanath (Shiva)", channel: "UCdMj2twWfMHXrWgX5oVdoyA" },
  { region: "Uttarakhand", temple: "Kedarnath Dham", city: "Rudraprayag", deity: "Lord Kedarnath (Shiva)" },
  { region: "West Bengal", temple: "Dakshineswar Kali", city: "Kolkata", deity: "Maa Bhavatarini (Kali)" },
  // Union Territories
  { region: "Delhi (NCT)", temple: "Akshardham", city: "New Delhi", deity: "Bhagwan Swaminarayan" },
  { region: "Jammu & Kashmir", temple: "Mata Vaishno Devi", city: "Katra", deity: "Maa Vaishno Devi" },
  { region: "Ladakh", temple: "Thiksey Monastery", city: "Leh", deity: "Maitreya Buddha" },
  { region: "Chandigarh", temple: "ISKCON Chandigarh", city: "Chandigarh", deity: "Radha Krishna" },
  { region: "Puducherry", temple: "Manakula Vinayagar", city: "Puducherry", deity: "Lord Ganesha" },
];

// Build a YouTube *live* search URL for a temple (sp=EgJAAQ%3D%3D = "Live" filter).
export const liveSearchUrl = (temple, region) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(`${temple} ${region} live darshan`)}&sp=EgJAAQ%3D%3D`;

export const PANCHANG = [
  { k: "Tithi", v: "Shukla Tritiya" }, { k: "Nakshatra", v: "Punarvasu" },
  { k: "Yoga", v: "Siddhi" }, { k: "Vaar", v: "Mangalvaar" },
  { k: "Sunrise", v: "5:42 AM" }, { k: "Sunset", v: "7:18 PM" },
  { k: "Rahu Kaal", v: "3:30–5:00 PM" }, { k: "Shubh Muhurat", v: "11:54 AM–12:48 PM" },
];

// À-la-carte chadhava offerings that can be added to a puja booking.
export const CHADHAVA_OFFERINGS = [
  { id: "tulsi", name: "Tulsi mala", icon: "🌿", price: 51 },
  { id: "sindoor", name: "Sindoor", icon: "🔴", price: 51 },
  { id: "bilva", name: "Bilva patra", icon: "☘️", price: 51 },
  { id: "pushpa", name: "Pushpa (flowers)", icon: "🌸", price: 101 },
  { id: "oil", name: "Til oil abhishek", icon: "🪔", price: 101 },
  { id: "nariyal", name: "Nariyal (coconut)", icon: "🥥", price: 101 },
  { id: "ladoo", name: "Ladoo bhog", icon: "🟡", price: 151 },
  { id: "milk", name: "Milk abhishek", icon: "🥛", price: 151 },
  { id: "chunri", name: "Chunri", icon: "🧣", price: 251 },
  { id: "saree", name: "Saree / Vastra", icon: "🥻", price: 501 },
];

export const TRACK_CATEGORIES = ["All", "Aarti", "Chalisa", "Mantra", "Bhajan", "Stotra"];

export const TRACKS = [
  { t: "Om Jai Jagdish Hare", sub: "All deities", cat: "Aarti", dur: "5:12" },
  { t: "Aarti Kunj Bihari Ki", sub: "Krishna", cat: "Aarti", dur: "6:02" },
  { t: "Jai Ambe Gauri", sub: "Maa Durga", cat: "Aarti", dur: "5:40" },
  { t: "Om Jai Lakshmi Mata", sub: "Lakshmi", cat: "Aarti", dur: "4:55" },
  { t: "Sukhkarta Dukhharta", sub: "Ganesha", cat: "Aarti", dur: "4:20" },
  { t: "Hanuman Chalisa", sub: "Hanuman ji", cat: "Chalisa", dur: "9:34" },
  { t: "Durga Chalisa", sub: "Maa Durga", cat: "Chalisa", dur: "8:50" },
  { t: "Shiv Chalisa", sub: "Mahadev", cat: "Chalisa", dur: "8:15" },
  { t: "Gayatri Mantra (108x)", sub: "Universal", cat: "Mantra", dur: "15:20" },
  { t: "Maha Mrityunjaya Mantra (108x)", sub: "Shiva", cat: "Mantra", dur: "18:40" },
  { t: "Om Namah Shivaya (108x)", sub: "Shiva", cat: "Mantra", dur: "11:05" },
  { t: "Om Gan Ganapataye Namah (108x)", sub: "Ganesha", cat: "Mantra", dur: "10:30" },
  { t: "Achyutam Keshavam", sub: "Krishna", cat: "Bhajan", dur: "6:45" },
  { t: "Shree Ganeshay Dheemahi", sub: "Ganesha", cat: "Bhajan", dur: "7:18" },
  { t: "Mere Ghar Ram Aaye Hain", sub: "Rama", cat: "Bhajan", dur: "6:30" },
  { t: "Shiv Tandav Stotram", sub: "Mahadev", cat: "Stotra", dur: "8:02" },
  { t: "Vishnu Sahasranama", sub: "Vishnu", cat: "Stotra", dur: "28:10" },
  { t: "Lingashtakam", sub: "Shiva", cat: "Stotra", dur: "5:25" },
];

// ── Dosha Nivaran (planetary remedies) ──
// Each dosha's remedy puja is bookable through the normal flow. Compound doshas
// (Kaal Sarp, Pitru, Shrapit) are priced higher as multi-planet remedies.
const DOSHA_PRICE = { sun: 1300, moon: 1300, mars: 1500, mercury: 1300, jupiter: 1500, venus: 1300, saturn: 1800, rahu: 1800, ketu: 1600, compound: 2500 };

export const DOSHAS = RAW_DOSHAS;

export const DOSHA_REMEDY_PUJAS = RAW_DOSHAS.map((d) => {
  const [priest, priestYears] = PRIESTS[hash(d.id) % PRIESTS.length];
  return {
    slug: d.id,
    name: d.puja.name,
    deity: d.planetLabel,
    emoji: d.icon,
    region: d.planetLabel,
    temple: "Remedy homam performed in your name",
    category: "dosha",
    price: DOSHA_PRICE[d.category] ?? 1500,
    priest,
    priestYears,
    incl: [
      "Sankalp performed in your name & gotra",
      "Beej mantra japa as prescribed by the shastra",
      "HD ritual video within 48 hours",
      "Blessed prasad & yantra couriered to your home",
    ],
  };
});

// Resolve a puja by slug across the main catalogue and dosha remedies.
export const getPuja = (slug) =>
  PUJAS.find((p) => p.slug === slug) || DOSHA_REMEDY_PUJAS.find((p) => p.slug === slug);

// Map a free-text puja recommendation (name + deity) to a bookable slug.
// Planet/dosha keywords are checked first so combined names like
// "Mangal Shanti Puja & Hanuman Puja" resolve to the Mangal remedy, not Hanuman.
const BOOK_KEYWORDS = [
  [/kaal\s*sarp/, "kaal-sarp"], [/shrapit/, "shrapit-dosha"], [/pitru|tarpan|shraddh|pind\s*daan/, "pitru-dosha"],
  [/mangal|kuja|manglik|bhauma|angarak/, "mangal-dosha"], [/shani|saturn|shanaischar/, "shani-dosha"],
  [/rahu/, "rahu-dosha"], [/ketu/, "ketu-dosha"], [/budh|mercury/, "budh-dosha"],
  [/guru|brihaspati|jupiter/, "guru-dosha"], [/shukra|venus/, "shukra-dosha"],
  [/surya|aditya|\bsun\b|ravi/, "surya-dosha"], [/chandra|\bmoon\b|soma/, "chandra-dosha"],
  [/navagraha|navgraha|nine planet/, "navagraha-puja"],
  [/mahamrityunjaya|mrityunjaya|tryambak/, "mahamrityunjaya"], [/rudrabhishek|rudra/, "rudrabhishek"],
  [/satyanarayan/, "satyanarayan"], [/vishnu|sahasranama|narayan/, "vishnu-puja"],
  [/krishna|janmashtami|gopal/, "krishna-janmashtami"], [/\bram\b|rama|navami/, "ram-navami"],
  [/kuber/, "kuber-puja"], [/ganesh|ganpati|ganapati|vinayak/, "ganesh-chaturthi"],
  [/lakshmi|laxmi/, "lakshmi-puja"], [/saraswati|vasant/, "saraswati-puja"],
  [/kali/, "kali-puja"], [/varalakshmi/, "varalakshmi"],
  [/navratri/, "navratri-puja"], [/durga|chandi/, "durga-puja"],
  [/hanuman|chalisa|sankat\s*mochan/, "hanuman-puja"],
  [/shiva|mahadev|somvar|shivaratri/, "shiva-puja"],
];

export function resolvePujaSlug(name = "", deity = "") {
  const text = `${name} ${deity}`.toLowerCase();
  for (const [re, slug] of BOOK_KEYWORDS) {
    if (re.test(text) && getPuja(slug)) return slug;
  }
  return null;
}
