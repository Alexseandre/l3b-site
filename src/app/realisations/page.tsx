import type { Metadata } from "next";
import { Building2, MapPin, Calendar } from "lucide-react";

import { generatePageMetadata } from "@/lib/metadata";
import { SITE_CONFIG } from "@/lib/constants";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = generatePageMetadata({
  title: "Nos Réalisations — Projets de Construction & Rénovation",
  description:
    "Découvrez les projets réalisés par L3B Construction : Lidl Marseille, Transdev IDF, Collégien et bien d'autres. Gros œuvre et rénovation en Île-de-France.",
  path: "/realisations",
});

const PROJECTS = [
  {
    title: "Lidl — Centre Bourse, Marseille",
    category: "Rénovation commerciale",
    location: "Marseille (13)",
    year: "2024",
    description:
      "Renforcement structurel d'une dalle béton existante pour l'ouverture d'un magasin Lidl. Installation de 13 600 connecteurs mécaniques, chape béton allégé, cage d'ascenseur et mur rideau aluminium.",
    tags: ["Renforcement structurel", "Béton armé", "Mur rideau"],
  },
  {
    title: "Projet Collégien — Groupe ADF",
    category: "Construction neuve",
    location: "Collégien (77)",
    year: "2023",
    description:
      "Réalisation complète du gros œuvre : dalle de compression, terrassement et construction de murs de soutènement en panneaux préfabriqués.",
    tags: ["Dalle de compression", "Terrassement", "Murs de soutènement"],
  },
  {
    title: "Dépôt Transdev — Île-de-France",
    category: "Infrastructure",
    location: "Île-de-France",
    year: "2023",
    description:
      "Coulage d'une dalle béton complète en seulement 4 jours. Un défi de réactivité relevé avec brio par nos équipes mobilisées.",
    tags: ["Dalle béton", "Délai express", "Infrastructure"],
  },
] as const;

const REALISATIONS_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Réalisations L3B Construction",
      numberOfItems: PROJECTS.length,
      itemListElement: PROJECTS.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        description: project.description,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_CONFIG.url },
        { "@type": "ListItem", position: 2, name: "Réalisations", item: `${SITE_CONFIG.url}/realisations` },
      ],
    },
  ],
};

export default function RealisationsPage() {
  return (
    <>
      <JsonLd data={REALISATIONS_JSON_LD} />

      <PageHero
        badge="Nos réalisations"
        title="Des projets qui parlent d'eux-mêmes"
        description="Chaque chantier est un défi unique. Découvrez comment L3B a su répondre aux exigences techniques et aux contraintes de délais de nos clients."
      />

      <Section>
        <SectionTitle
          badge="Portfolio"
          title="Projets récents"
          description="Une sélection de nos chantiers les plus emblématiques."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {PROJECTS.map((project) => (
            <Card key={project.title} className="overflow-hidden">
              {/* Image placeholder */}
              <div className="mb-6 flex h-48 items-center justify-center rounded-xl bg-muted">
                <Building2 className="h-12 w-12 text-muted-foreground/30" />
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full bg-secondary/10 px-3 py-1 font-medium text-secondary">
                  {project.category}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {project.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {project.year}
                </span>
              </div>

              <h3 className="mt-3 text-xl font-bold">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
