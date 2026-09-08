import type { Metadata } from "next";
import "./globals.css";
import { GlobalFX } from "../components/fx";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";

const SITE = "https://hysystems.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "HY Systems / Autonomous Web & AI Infrastructure",
    template: "%s / HY Systems",
  },
  description:
    "HY Systems architects autonomous, 24/7 web and AI infrastructure for high-revenue Australian trade and service businesses. We capture, qualify, and close inbound demand without human constraint.",
  applicationName: "HY Systems",
  keywords: [
    "AI automation Melbourne",
    "lead infrastructure",
    "GoHighLevel automation",
    "trade business website",
    "missed call text back",
    "local service business automation",
    "Boronia Victoria",
  ],
  authors: [{ name: "HY Systems" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: SITE,
    siteName: "HY Systems",
    title: "HY Systems / Autonomous Web & AI Infrastructure",
    description:
      "Autonomous, 24/7 web and AI infrastructure for high-revenue Australian trade and service businesses.",
    images: [{ url: "/og-cover.png", width: 1200, height: 630, alt: "HY Systems" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HY Systems / Autonomous Web & AI Infrastructure",
    description:
      "Autonomous, 24/7 web and AI infrastructure for high-revenue Australian trade and service businesses.",
    images: ["/og-cover.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

// Organization + LocalBusiness. No ratings or review counts are asserted:
// fabricated aggregateRating data would breach Australian Consumer Law s18.
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HY Systems",
    url: SITE,
    email: "info@hysystems.com.au",
    telephone: "+61450935568",
    logo: `${SITE}/hy-systems-logo.png`,
    description:
      "Autonomous web and AI infrastructure for high-revenue Australian trade and service businesses.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Boronia",
      addressRegion: "VIC",
      postalCode: "3155",
      addressCountry: "AU",
    },
    areaServed: { "@type": "Country", name: "Australia" },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "HY Systems",
    url: SITE,
    image: `${SITE}/og-cover.png`,
    email: "info@hysystems.com.au",
    telephone: "+61450935568",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Boronia",
      addressRegion: "VIC",
      postalCode: "3155",
      addressCountry: "AU",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Greater Melbourne" },
      { "@type": "Country", name: "Australia" },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="hy-root">
          <GlobalFX />
          <Nav />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
