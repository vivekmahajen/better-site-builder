// Aastha — static catalogue (deities, pujas, astrologers, live darshan, daily)
// Demo content, illustrative only.
import { RAW_PUJAS } from "./pujas-data";

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
  "HD ritual video within 48 hours",
  "Blessed prasad couriered to your home",
];

// Derive the app's bookable puja list from the full reference data, enriching
// each with booking fields (slug, price, priest, inclusions) while keeping all
// the descriptive info (sanskrit, region, when, significance, samagri, benefits…).
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

export const TRACKS = [
  { t: "Om Jai Jagdish Hare", sub: "Aarti • All deities", dur: "5:12" },
  { t: "Hanuman Chalisa", sub: "Chalisa • Hanuman ji", dur: "9:34" },
  { t: "Shiv Tandav Stotram", sub: "Stotra • Mahadev", dur: "8:02" },
  { t: "Gayatri Mantra (108x)", sub: "Mantra • Universal", dur: "15:20" },
  { t: "Achyutam Keshavam", sub: "Bhajan • Krishna", dur: "6:45" },
  { t: "Shree Ganeshay Dheemahi", sub: "Bhajan • Ganesha", dur: "7:18" },
];

export const getPuja = (slug) => PUJAS.find((p) => p.slug === slug);
