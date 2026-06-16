const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aastha.example";

export default function sitemap() {
  const routes = ["", "/pujas", "/live-darshan", "/astrology", "/daan", "/dosha-nivaran", "/puja-calculator", "/daily", "/radio", "/plans", "/track-order", "/faq"];
  const now = new Date();
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
