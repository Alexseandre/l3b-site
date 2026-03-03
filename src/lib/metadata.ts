import type { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = "/og/default.jpg",
}: PageMetadataOptions): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: "fr_FR",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
