// Aastha — static catalogue (deities, pujas, astrologers, live darshan, daily)
// Demo content, illustrative only.

export const PUJAS = [
  { slug: "maha-mrityunjaya", emoji: "🪔", name: "Maha Mrityunjaya Jaap", temple: "Mahakaleshwar Jyotirlinga, Ujjain",
    category: "Health", price: 1100, priest: "Pt. Ramesh Dwivedi", priestYears: 18,
    incl: ["11,000 mantra jaap by 4 Vedic priests", "Sankalp in your name & gotra", "HD ritual video in 48 hrs", "Bhasma prasad couriered home"] },
  { slug: "lakshmi-kubera", emoji: "💰", name: "Lakshmi Kubera Puja", temple: "Padmavathi Temple, Tirupati",
    category: "Wealth", price: 1500, priest: "Pt. Srinivasa Sharma", priestYears: 21,
    incl: ["Shri Suktam & Kubera mantra", "Sankalp in your name & gotra", "HD ritual video in 48 hrs", "Yantra + prasad delivered"] },
  { slug: "swayamvara-parvati", emoji: "💍", name: "Swayamvara Parvati Puja", temple: "Kamakhya Devi, Guwahati",
    category: "Marriage", price: 1300, priest: "Pt. Bhupen Goswami", priestYears: 16,
    incl: ["Manglik dosha shanti", "Sankalp in your name & gotra", "HD ritual video in 48 hrs", "Sindoor prasad couriered"] },
  { slug: "navagraha-shanti", emoji: "📿", name: "Navagraha Shanti Puja", temple: "Suryanar Kovil, Tamil Nadu",
    category: "Doshas", price: 1800, priest: "Pt. K. Subramaniam", priestYears: 24,
    incl: ["All 9 planet havan", "Sankalp in your name & gotra", "HD ritual video in 48 hrs", "Navagraha prasad delivered"] },
  { slug: "saraswati-vidya", emoji: "🎓", name: "Saraswati Vidya Puja", temple: "Sharada Peeth, Sringeri",
    category: "Education", price: 900, priest: "Pt. Anantha Shastri", priestYears: 14,
    incl: ["Saraswati Vandana & havan", "Sankalp in your name & gotra", "HD ritual video in 48 hrs", "Blessed pen + prasad"] },
  { slug: "hanuman-sankat-mochan", emoji: "🛡️", name: "Hanuman Sankat Mochan", temple: "Sankat Mochan, Varanasi",
    category: "Health", price: 800, priest: "Pt. Mahant Vishwambhar", priestYears: 19,
    incl: ["Sundarkand path", "Sankalp in your name & gotra", "HD ritual video in 48 hrs", "Sindoor & chola prasad"] },
  { slug: "santan-gopal", emoji: "🌺", name: "Santan Gopal Puja", temple: "Banke Bihari, Vrindavan",
    category: "Family", price: 1400, priest: "Pt. Giridhar Goswami", priestYears: 17,
    incl: ["Santan Gopal mantra havan", "Sankalp in your name & gotra", "HD ritual video in 48 hrs", "Charan prasad delivered"] },
  { slug: "rudrabhishek", emoji: "🔱", name: "Rudrabhishek", temple: "Kashi Vishwanath, Varanasi",
    category: "Doshas", price: 1600, priest: "Pt. Omkar Nath Tiwari", priestYears: 23,
    incl: ["Rudri path with abhishek", "Sankalp in your name & gotra", "HD ritual video in 48 hrs", "Bhasma & bilva prasad"] },
];

export const CATEGORIES = ["All", "Health", "Wealth", "Marriage", "Education", "Family", "Doshas"];

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
  { temple: "ISKCON Vrindavan", city: "Vrindavan", ritual: "Krishna Balaram Darshan", time: "Live now", live: true, viewers: "18.2k", channel: "UCAA6IsLVfbHrP1I_lzxv09Q" },
  { temple: "ISKCON Bangalore", city: "Bengaluru", ritual: "Radha Krishna Darshan", time: "Live now", live: true, viewers: "11.5k", channel: "UCPXnayBvF7ynbG_I3VOTgIg" },
  { temple: "Tirumala · SVBC", city: "Tirupati", ritual: "Venkateswara Seva", time: "Live now", live: true, viewers: "24.3k", channel: "UCTboTRX74UydvU_cBdm_cCQ" },
  { temple: "Vrindavan Chandrodaya", city: "Vrindavan", ritual: "Sandhya Aarti", time: "Live now", live: true, viewers: "8.7k", channel: "UCFi2lv2x3yo8Ha2jciDzD2w" },
  { temple: "Kashi Vishwanath", city: "Varanasi", ritual: "Mangala Aarti", time: "Live now", live: true, viewers: "12.4k", channel: "UCdMj2twWfMHXrWgX5oVdoyA" },
  { temple: "Golden Temple", city: "Amritsar", ritual: "Palki Sahib", time: "9:45 PM today", live: false, viewers: "—", channel: null },
];

// Fallback live-darshan channel (ISKCON Bangalore — official 24/7 darshan).
export const LIVE_FALLBACK_CHANNEL = "UCPXnayBvF7ynbG_I3VOTgIg";

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
