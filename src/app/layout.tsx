import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SITE_CONFIG } from "@/lib/constants";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — Gros Œuvre & Rénovation en Île-de-France`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "construction gros œuvre",
    "rénovation bâtiment",
    "Île-de-France",
    "Essonne",
    "Linas",
    "béton armé",
    "terrassement",
    "nettoyage professionnel",
    "L3B",
    "Pégase",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — Gros Œuvre & Rénovation en Île-de-France`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/og/default.jpg",
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  other: {
    "content-language": "fr",
    "geo.region": "FR-IDF",
    "geo.placename": "Linas, Essonne",
    "geo.position": "48.6243;2.2547",
    "ICBM": "48.6243, 2.2547",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={plusJakarta.variable}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <a href="#main-content" className="skip-to-content">
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
