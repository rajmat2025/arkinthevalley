import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { getApartmentData } from "@/lib/apartment-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Apartments Near SHSU | Ark in the Valley | Huntsville, TX",
  description:
    "Spacious 1 & 2 bedroom apartments near SHSU in Huntsville, TX. Quiet 72-unit community on HWY 19 — no congestion, utilities included. Schedule a tour at Ark in the Valley.",
  keywords: [
    "apartments near SHSU",
    "Huntsville TX apartments",
    "Sam Houston State University housing",
    "student apartments Huntsville",
    "Ark in the Valley",
  ],
  openGraph: {
    title: "Apartments Near SHSU | Ark in the Valley | Huntsville, TX",
    description:
      "A peaceful place to call home — spacious apartments minutes from SHSU without the congestion of a big complex.",
    type: "website",
    locale: "en_US",
  },
};

const data = getApartmentData();

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  name: data.community.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: "774 SH 19, Apt #6",
    addressLocality: "Huntsville",
    addressRegion: "TX",
    postalCode: "77320",
    addressCountry: "US",
  },
  telephone: data.community.phone,
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.7238,
    longitude: -95.5488,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
