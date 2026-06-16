/* Aastha — shared demo data (no backend; illustrative content) */

const PUJAS = [
  { emoji: "🪔", name: "Maha Mrityunjaya Jaap", temple: "Mahakaleshwar Jyotirlinga, Ujjain",
    category: "Health", price: 1100, priest: "Pt. Ramesh Dwivedi",
    incl: ["11,000 mantra jaap by 4 Vedic priests", "Sankalp in your name & gotra", "HD ritual video in 48 hrs", "Bhasma prasad couriered home"] },
  { emoji: "💰", name: "Lakshmi Kubera Puja", temple: "Padmavathi Temple, Tirupati",
    category: "Wealth", price: 1500, priest: "Pt. Srinivasa Sharma",
    incl: ["Shri Suktam & Kubera mantra", "Sankalp in your name & gotra", "HD ritual video in 48 hrs", "Yantra + prasad delivered"] },
  { emoji: "💍", name: "Swayamvara Parvati Puja", temple: "Kamakhya Devi, Guwahati",
    category: "Marriage", price: 1300, priest: "Pt. Bhupen Goswami",
    incl: ["Manglik dosha shanti", "Sankalp in your name & gotra", "HD ritual video in 48 hrs", "Sindoor prasad couriered"] },
  { emoji: "📿", name: "Navagraha Shanti Puja", temple: "Suryanar Kovil, Tamil Nadu",
    category: "Doshas", price: 1800, priest: "Pt. K. Subramaniam",
    incl: ["All 9 planet havan", "Sankalp in your name & gotra", "HD ritual video in 48 hrs", "Navagraha prasad delivered"] },
  { emoji: "🎓", name: "Saraswati Vidya Puja", temple: "Sharada Peeth, Sringeri",
    category: "Education", price: 900, priest: "Pt. Anantha Shastri",
    incl: ["Saraswati Vandana & havan", "Sankalp in your name & gotra", "HD ritual video in 48 hrs", "Blessed pen + prasad"] },
  { emoji: "🛡️", name: "Hanuman Sankat Mochan", temple: "Sankat Mochan, Varanasi",
    category: "Health", price: 800, priest: "Pt. Mahant Vishwambhar",
    incl: ["Sundarkand path", "Sankalp in your name & gotra", "HD ritual video in 48 hrs", "Sindoor & chola prasad"] },
  { emoji: "🌺", name: "Santan Gopal Puja", temple: "Banke Bihari, Vrindavan",
    category: "Family", price: 1400, priest: "Pt. Giridhar Goswami",
    incl: ["Santan Gopal mantra havan", "Sankalp in your name & gotra", "HD ritual video in 48 hrs", "Charan prasad delivered"] },
  { emoji: "🔱", name: "Rudrabhishek", temple: "Kashi Vishwanath, Varanasi",
    category: "Doshas", price: 1600, priest: "Pt. Omkar Nath Tiwari",
    incl: ["Rudri path with abhishek", "Sankalp in your name & gotra", "HD ritual video in 48 hrs", "Bhasma & bilva prasad"] },
];

const CATEGORIES = ["All", "Health", "Wealth", "Marriage", "Education", "Family", "Doshas"];

const ASTROLOGERS = [
  { initials: "RP", name: "Acharya Rohit Pandey", spec: "Vedic • Kundli • Career", exp: 18, rating: 4.9, rate: 35, online: true },
  { initials: "MS", name: "Dr. Meena Shastri", spec: "Marriage • Manglik • Tarot", exp: 22, rating: 4.8, rate: 45, online: true },
  { initials: "VT", name: "Pt. Vivek Trivedi", spec: "Numerology • Vastu", exp: 12, rating: 4.7, rate: 28, online: true },
  { initials: "AS", name: "Acharya Anjali Sharma", spec: "Prashna • Lal Kitab", exp: 15, rating: 4.9, rate: 40, online: false },
  { initials: "GK", name: "Pt. Gopal Krishnan", spec: "Jyotish • Muhurat", exp: 25, rating: 5.0, rate: 55, online: true },
  { initials: "SD", name: "Acharya Suman Das", spec: "Palmistry • Remedies", exp: 10, rating: 4.6, rate: 22, online: true },
];

const LIVE = [
  { temple: "Kashi Vishwanath", city: "Varanasi", ritual: "Mangala Aarti", time: "Live now", live: true, viewers: "12.4k" },
  { temple: "Siddhivinayak", city: "Mumbai", ritual: "Kakad Aarti", time: "Live now", live: true, viewers: "9.1k" },
  { temple: "Mahakaleshwar", city: "Ujjain", ritual: "Bhasma Aarti", time: "Live now", live: true, viewers: "21.7k" },
  { temple: "Vaishno Devi", city: "Katra", ritual: "Atka Aarti", time: "6:30 PM today", live: false, viewers: "—" },
  { temple: "Golden Temple", city: "Amritsar", ritual: "Palki Sahib", time: "9:45 PM today", live: false, viewers: "—" },
  { temple: "Jagannath", city: "Puri", ritual: "Sandhya Aarti", time: "7:00 PM today", live: false, viewers: "—" },
];

/* Demo tracking records — the differentiator: full transparency */
const ORDERS = {
  "AAS-72401": {
    puja: "Maha Mrityunjaya Jaap", temple: "Mahakaleshwar, Ujjain",
    devotee: "Sharma family", priest: "Pt. Ramesh Dwivedi (Verified ✓, 18 yrs)",
    status: "In progress",
    steps: [
      { t: "Order confirmed", time: "14 Jun, 9:02 AM", state: "done", note: "Payment received. Booking #AAS-72401" },
      { t: "Verified priest assigned", time: "14 Jun, 11:20 AM", state: "done", note: "Pt. Ramesh Dwivedi — 18 yrs, Mahakaleshwar" },
      { t: "Sankalp recorded", time: "15 Jun, 8:10 AM", state: "done", note: "Name & gotra pronunciation confirmed with you via call" },
      { t: "Ritual being performed", time: "16 Jun, 6:00 AM", state: "active", note: "Bhasma Aarti slot — unhurried 90-min ritual" },
      { t: "HD video upload", time: "Expected 16 Jun, by 8 PM", state: "pending", note: "Within 48 hrs SLA" },
      { t: "Prasad delivered", time: "Expected 19 Jun", state: "pending", note: "Bhasma prasad • BlueDart #BD55291" },
    ],
  },
  "AAS-68233": {
    puja: "Lakshmi Kubera Puja", temple: "Padmavathi, Tirupati",
    devotee: "Anita Reddy", priest: "Pt. Srinivasa Sharma (Verified ✓, 21 yrs)",
    status: "Completed",
    steps: [
      { t: "Order confirmed", time: "8 Jun, 7:40 PM", state: "done", note: "Payment received. Booking #AAS-68233" },
      { t: "Verified priest assigned", time: "8 Jun, 9:05 PM", state: "done", note: "Pt. Srinivasa Sharma — 21 yrs" },
      { t: "Sankalp recorded", time: "9 Jun, 7:30 AM", state: "done", note: "Name & gotra confirmed" },
      { t: "Ritual performed", time: "10 Jun, 10:15 AM", state: "done", note: "Shri Suktam + Kubera mantra completed" },
      { t: "HD video uploaded", time: "10 Jun, 6:50 PM", state: "done", note: "Watch in your account → Orders" },
      { t: "Prasad delivered", time: "13 Jun, 2:20 PM", state: "done", note: "Yantra + prasad delivered • signed by recipient" },
    ],
  },
};

const PANCHANG = [
  { k: "Tithi", v: "Shukla Tritiya" },
  { k: "Nakshatra", v: "Punarvasu" },
  { k: "Yoga", v: "Siddhi" },
  { k: "Vaar", v: "Mangalvaar" },
  { k: "Sunrise", v: "5:42 AM" },
  { k: "Sunset", v: "7:18 PM" },
  { k: "Rahu Kaal", v: "3:30–5:00 PM" },
  { k: "Shubh Muhurat", v: "11:54 AM–12:48 PM" },
];

const TRACKS = [
  { t: "Om Jai Jagdish Hare", sub: "Aarti • All deities", dur: "5:12" },
  { t: "Hanuman Chalisa", sub: "Chalisa • Hanuman ji", dur: "9:34" },
  { t: "Shiv Tandav Stotram", sub: "Stotra • Mahadev", dur: "8:02" },
  { t: "Gayatri Mantra (108x)", sub: "Mantra • Universal", dur: "15:20" },
  { t: "Achyutam Keshavam", sub: "Bhajan • Krishna", dur: "6:45" },
  { t: "Shree Ganeshay Dheemahi", sub: "Bhajan • Ganesha", dur: "7:18" },
];
