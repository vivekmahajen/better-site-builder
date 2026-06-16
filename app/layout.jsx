import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Fx from "@/components/Fx";

export const metadata = {
  title: "Aastha — Your bridge to the divine | Online Puja, Chadhava, Live Darshan & Astrology",
  description:
    "Aastha brings the temple home: book personalized puja & chadhava at 1000+ temples with verified priests, live order tracking, prasad delivery, live darshan and astrology — with total transparency.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪔</text></svg>",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Fx />
      </body>
    </html>
  );
}
