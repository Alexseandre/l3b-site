import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { AboutPreview } from "@/components/sections/about-preview";
import { TrustBar } from "@/components/sections/trust-bar";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_CONFIG, TESTIMONIALS } from "@/lib/constants";

const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/images/logo.png`,
      description: SITE_CONFIG.description,
      slogan: SITE_CONFIG.slogan,
      foundingDate: "2020",
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONFIG.address.street,
        addressLocality: SITE_CONFIG.address.city,
        postalCode: SITE_CONFIG.address.postalCode,
        addressRegion: SITE_CONFIG.address.region,
        addressCountry: "FR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.phone,
        contactType: "customer service",
        availableLanguage: "French",
      },
      sameAs: [SITE_CONFIG.socials.linkedin],
      knowsAbout: [
        "Construction gros oeuvre",
        "Béton armé",
        "Terrassement",
        "Rénovation structurelle",
        "Murs de soutènement",
        "Dalles de compression",
        "Nettoyage professionnel",
        "Nettoyage fin de chantier",
      ],
    },
    {
      "@type": "GeneralContractor",
      "@id": `${SITE_CONFIG.url}/#localbusiness`,
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONFIG.address.street,
        addressLocality: SITE_CONFIG.address.city,
        postalCode: SITE_CONFIG.address.postalCode,
        addressRegion: SITE_CONFIG.address.region,
        addressCountry: "FR",
      },
      priceRange: "$$",
      foundingDate: "2020",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        minValue: 6,
        maxValue: 11,
      },
      areaServed: [
        {
          "@type": "State",
          name: "Île-de-France",
          sameAs: "https://fr.wikipedia.org/wiki/%C3%8Ele-de-France",
        },
        { "@type": "Country", name: "France" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services de construction et nettoyage",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Gros Œuvre",
              description:
                "Terrassement, fondations, structures béton armé, dalles et planchers.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Rénovation",
              description:
                "Renforcement structurel, réhabilitation de bâtiments existants.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Béton Armé",
              description:
                "Dalles de compression, murs de soutènement, cages d'ascenseur.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Nettoyage Professionnel Pégase",
              description:
                "Nettoyage fin de chantier, nettoyage industriel, entretien de bureaux et copropriétés.",
            },
          },
        ],
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      sameAs: [SITE_CONFIG.socials.linkedin],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: String(TESTIMONIALS.length),
        bestRating: "5",
      },
      review: TESTIMONIALS.map((t) => ({
        "@type": "Review",
        author: { "@type": "Organization", name: t.name },
        reviewRating: { "@type": "Rating", ratingValue: String(t.rating) },
        reviewBody: t.content,
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.name,
      publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
      inLanguage: "fr-FR",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: SITE_CONFIG.url,
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={HOME_JSON_LD} />
      <Hero />
      <ServicesOverview />
      <AboutPreview />
      <TrustBar />
      <Testimonials />
      <CtaSection />
    </>
  );
}
