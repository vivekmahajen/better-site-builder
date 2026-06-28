// ⚠️ ILLUSTRATIVE SAMPLE DATA — NOT REAL PEOPLE. DO NOT PRESENT AS VERIFIED. ⚠️
//
// These names, ratings, fees and experience numbers were placeholder/demo
// content. Under the Data-Integrity Doctrine, fabricated humans must never be
// shown to devotees as real, verified practitioners. They are quarantined here
// purely so the values aren't lost; nothing user-facing should import this file.
//
// Real astrologer/priest listings live in data/astrologers.json and
// data/priests.json and are surfaced ONLY when verification === "verified"
// (see lib/data/index.js). Until sourced, those directories are intentionally
// empty and the UI shows an honest "coming soon" state.

export const DEMO_ASTROLOGERS = [
  { initials: "RP", name: "Acharya Rohit Pandey", spec: "Vedic • Kundli • Career", exp: 18, rating: 4.9, rate: 35, online: true },
  { initials: "MS", name: "Dr. Meena Shastri", spec: "Marriage • Manglik • Tarot", exp: 22, rating: 4.8, rate: 45, online: true },
  { initials: "VT", name: "Pt. Vivek Trivedi", spec: "Numerology • Vastu", exp: 12, rating: 4.7, rate: 28, online: true },
  { initials: "AS", name: "Acharya Anjali Sharma", spec: "Prashna • Lal Kitab", exp: 15, rating: 4.9, rate: 40, online: false },
  { initials: "GK", name: "Pt. Gopal Krishnan", spec: "Jyotish • Muhurat", exp: 25, rating: 5.0, rate: 55, online: true },
  { initials: "SD", name: "Acharya Suman Das", spec: "Palmistry • Remedies", exp: 10, rating: 4.6, rate: 22, online: true },
];

export const DEMO_PRIESTS = [
  ["Pt. Ramesh Dwivedi", 18], ["Pt. Srinivasa Sharma", 21], ["Pt. K. Subramaniam", 24],
  ["Pt. Omkar Nath Tiwari", 23], ["Acharya Anil Joshi", 15], ["Pt. Giridhar Goswami", 17],
  ["Pt. Mahesh Trivedi", 20], ["Acharya Vinod Shastri", 19], ["Pt. Bhupen Goswami", 16],
  ["Pt. Anantha Shastri", 22],
];
