import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Fx from "@/components/Fx";
import DeviChatbot from "@/components/DeviChatbot";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aastha.example";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aastha — Your bridge to the divine | Online Puja, Chadhava, Live Darshan & Astrology",
    template: "%s",
  },
  description:
    "Aastha brings the temple home: book personalized puja & chadhava at 1000+ temples with verified priests, live order tracking, prasad delivery, live darshan and astrology — with total transparency.",
  applicationName: "Aastha",
  keywords: ["online puja", "chadhava", "live darshan", "puja booking", "kundli puja calculator", "dosha nivaran", "astrology", "prasad delivery"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Aastha",
    url: SITE_URL,
    title: "Aastha — Online Puja, Chadhava, Live Darshan & Astrology",
    description: "Book puja & chadhava with verified priests and follow it live — from sankalp to prasad at your door. Plus live darshan, dosha remedies and a free, transit-aware puja calculator.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aastha — Your bridge to the divine",
    description: "Online puja & chadhava with verified priests, live order tracking, live darshan and a free puja calculator.",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪔</text></svg>",
  },
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aastha",
  url: SITE_URL,
  description: "Transparency-first Hindu devotional platform — online puja & chadhava, live darshan, astrology, dosha remedies and a puja calculator.",
  sameAs: [],
};
const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aastha",
  url: SITE_URL,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }} />
        <Header />
        <main>{children}</main>
        <Footer />
        <Fx />
        <DeviChatbot />
      </body>
    </html>
  );
}
