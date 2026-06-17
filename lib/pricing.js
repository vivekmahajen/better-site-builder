// Onboarding pricing plans (mirrors the /plans page).
export const PRICING_PLANS = [
  { id: "shraddha", name: "Shraddha", tagline: "Begin your journey", price: 0, currency: "₹", cycle: null, badge: null, highlight: false,
    features: ["Free Puja Calculator", "Daily Panchang & mantra", "Live Darshan", "Browse all pujas", "Bhakti Radio (23 languages)", "Devi AI guide"] },
  { id: "bhakta", name: "Bhakta", tagline: "For the devoted", price: 499, currency: "₹", cycle: "month", annualPrice: 4999, badge: "Most popular", highlight: true,
    features: ["1 puja included / month", "10% off all bookings", "Free prasad delivery", "Priority verified priest", "Monthly chart-based recommendation"] },
  { id: "sadhak", name: "Sadhak", tagline: "For the serious seeker", price: 999, currency: "₹", cycle: "month", annualPrice: 9999, badge: "Best value", highlight: false,
    features: ["Up to 4 pujas' value / month", "15% off all bookings", "Monthly astrology consult", "Family sankalp included", "Completion certificate"] },
  { id: "nri", name: "NRI", tagline: "For devotees abroad", price: 19, currency: "$", cycle: "month", annualPrice: 189, badge: "International", highlight: false,
    features: ["International prasad shipping", "Pind Daan / shraddh coordination", "Annual tithi reminders", "USD/GBP/AUD billing", "NRI concierge"] },
];
