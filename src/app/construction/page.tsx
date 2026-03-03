import type { Metadata } from "next";
import {
  Building2,
  Hammer,
  ClipboardList,
  Layers,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { generatePageMetadata } from "@/lib/metadata";
import { SERVICES_CONSTRUCTION, SITE_CONFIG } from "@/lib/constants";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = generatePageMetadata({
  title: "Construction & Gros Œuvre — L3B Construction",
  description:
    "Spécialistes du gros œuvre en Île-de-France : terrassement, béton armé, dalles, murs de soutènement, rénovation structurelle. Devis gratuit.",
  path: "/construction",
});

const ICON_MAP = {
  building: <Building2 className="h-6 w-6" />,
  hammer: <Hammer className="h-6 w-6" />,
  clipboard: <ClipboardList className="h-6 w-6" />,
  layers: <Layers className="h-6 w-6" />,
};

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Étude & Devis",
    description: "Analyse de votre projet, visite de site et élaboration d'un devis détaillé gratuit.",
  },
  {
    step: "02",
    title: "Préparation",
    description: "Planification du chantier, coordination des équipes et approvisionnement des matériaux.",
  },
  {
    step: "03",
    title: "Exécution",
    description: "Réalisation des travaux avec suivi qualité, sécurité et respect des délais.",
  },
  {
    step: "04",
    title: "Livraison",
    description: "Réception des travaux, contrôle qualité final et remise des clés.",
  },
] as const;

const CONSTRUCTION_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      provider: { "@id": `${SITE_CONFIG.url}/#organization` },
      name: "Construction & Gros Œuvre",
      description:
        "Services de construction gros œuvre : terrassement, béton armé, dalles, murs de soutènement, rénovation structurelle en Île-de-France.",
      areaServed: {
        "@type": "State",
        name: "Île-de-France",
      },
      serviceType: "Construction",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_CONFIG.url },
        { "@type": "ListItem", position: 2, name: "Construction", item: `${SITE_CONFIG.url}/construction` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quels types de travaux de gros œuvre réalisez-vous ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nous réalisons tous types de travaux de gros œuvre : terrassement, fondations, structures en béton armé, dalles de compression, planchers, murs de soutènement, cages d'ascenseur et longrines.",
          },
        },
        {
          "@type": "Question",
          name: "Dans quelle zone géographique intervenez-vous ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nous intervenons principalement en Île-de-France, avec des projets réalisés dans toute la France, notamment à Marseille pour des chantiers d'envergure.",
          },
        },
        {
          "@type": "Question",
          name: "Quel est le délai moyen pour un devis ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nous vous fournissons un devis détaillé sous 48h après visite de site. Le devis est gratuit et sans engagement.",
          },
        },
      ],
    },
  ],
};

export default function ConstructionPage() {
  return (
    <>
      <JsonLd data={CONSTRUCTION_JSON_LD} />

      <PageHero
        badge="L3B Construction"
        title="Gros Œuvre & Rénovation structurelle"
        description="Terrassement, béton armé, dalles, murs de soutènement — notre expertise au service de vos projets de construction et de rénovation en Île-de-France."
      />

      {/* Services */}
      <Section>
        <SectionTitle
          badge="Nos expertises"
          title="Des solutions pour chaque projet"
          description="Du terrassement à la livraison, nous maîtrisons l'ensemble des métiers du gros œuvre."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES_CONSTRUCTION.map((service) => (
            <Card key={service.title}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {ICON_MAP[service.icon]}
              </div>
              <h3 className="mb-2 text-lg font-bold">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section background="muted">
        <SectionTitle
          badge="Notre process"
          title="Un accompagnement de A à Z"
          description="Une méthodologie éprouvée pour garantir la réussite de chaque projet."
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <div key={step.step} className="relative">
              <span className="text-5xl font-extrabold text-secondary/20">{step.step}</span>
              <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Engagements */}
      <Section>
        <SectionTitle
          badge="Nos engagements"
          title="La qualité sans compromis"
        />
        <div className="mx-auto max-w-2xl space-y-4">
          {[
            "Respect strict des délais contractuels",
            "Conformité aux normes et DTU en vigueur",
            "Équipes qualifiées et encadrées",
            "Suivi de chantier transparent et régulier",
            "Assurance décennale et responsabilité civile",
            "Nettoyage de fin de chantier inclus",
          ].map((engagement) => (
            <div key={engagement} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary" />
              <span className="font-medium">{engagement}</span>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/contact" variant="primary" size="lg">
            Demander un devis gratuit
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section background="muted">
        <SectionTitle
          badge="FAQ"
          title="Questions fréquentes"
        />
        <div className="mx-auto max-w-3xl space-y-4">
          {[
            {
              q: "Quels types de travaux de gros œuvre réalisez-vous ?",
              a: "Nous réalisons tous types de travaux de gros œuvre : terrassement, fondations, structures en béton armé, dalles de compression, planchers, murs de soutènement, cages d'ascenseur et longrines.",
            },
            {
              q: "Dans quelle zone géographique intervenez-vous ?",
              a: "Nous intervenons principalement en Île-de-France, avec des projets réalisés dans toute la France, notamment à Marseille pour des chantiers d'envergure.",
            },
            {
              q: "Quel est le délai moyen pour un devis ?",
              a: "Nous vous fournissons un devis détaillé sous 48h après visite de site. Le devis est gratuit et sans engagement.",
            },
          ].map((faq) => (
            <details key={faq.q} className="group rounded-xl border border-border bg-white p-6">
              <summary className="flex cursor-pointer items-center justify-between font-bold">
                {faq.q}
                <span className="ml-4 text-secondary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
