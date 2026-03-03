import type { Metadata } from "next";
import { Sparkles, Factory, Briefcase, Home, CheckCircle2, ArrowRight } from "lucide-react";

import { generatePageMetadata } from "@/lib/metadata";
import { SERVICES_NETTOYAGE, SITE_CONFIG } from "@/lib/constants";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = generatePageMetadata({
  title: "Pégase — Nettoyage Professionnel en Île-de-France",
  description:
    "Pégase, votre partenaire nettoyage professionnel : fin de chantier, nettoyage industriel, entretien de bureaux et copropriétés en Île-de-France.",
  path: "/nettoyage",
});

const ICON_MAP = {
  sparkles: <Sparkles className="h-6 w-6" />,
  factory: <Factory className="h-6 w-6" />,
  briefcase: <Briefcase className="h-6 w-6" />,
  home: <Home className="h-6 w-6" />,
};

const NETTOYAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      provider: { "@id": `${SITE_CONFIG.url}/#organization` },
      name: "Pégase — Nettoyage Professionnel",
      description: "Services de nettoyage professionnel : fin de chantier, industriel, bureaux et copropriétés.",
      areaServed: { "@type": "State", name: "Île-de-France" },
      serviceType: "Nettoyage professionnel",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_CONFIG.url },
        { "@type": "ListItem", position: 2, name: "Nettoyage", item: `${SITE_CONFIG.url}/nettoyage` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quel est le lien entre Pégase et L3B Construction ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pégase est la branche nettoyage professionnel de L3B. Cette complémentarité nous permet d'offrir une prestation complète, du gros œuvre au nettoyage final.",
          },
        },
        {
          "@type": "Question",
          name: "Intervenez-vous pour le nettoyage de fin de chantier ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, le nettoyage de fin de chantier est l'une de nos spécialités. Nous assurons la remise en état complète des locaux après travaux.",
          },
        },
      ],
    },
  ],
};

export default function NettoyagePage() {
  return (
    <>
      <JsonLd data={NETTOYAGE_JSON_LD} />

      <PageHero
        badge="Pégase Nettoyage"
        title="Nettoyage professionnel en Île-de-France"
        description="Pégase, la branche nettoyage de L3B, vous garantit des locaux impeccables. Du nettoyage fin de chantier à l'entretien régulier de vos espaces."
        accent="pegase"
      />

      {/* Services */}
      <Section>
        <SectionTitle
          badge="Nos services"
          title="Une propreté irréprochable"
          description="Des solutions de nettoyage adaptées à chaque besoin, avec des équipes formées et du matériel professionnel."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES_NETTOYAGE.map((service) => (
            <Card key={service.title}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pegase/10 text-pegase">
                {ICON_MAP[service.icon]}
              </div>
              <h3 className="mb-2 text-lg font-bold">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Engagements */}
      <Section background="muted">
        <SectionTitle badge="Nos engagements" title="La propreté comme exigence" />
        <div className="mx-auto max-w-2xl space-y-4">
          {[
            "Produits professionnels et respectueux de l'environnement",
            "Équipes formées et encadrées",
            "Interventions rapides et flexibles",
            "Contrôle qualité systématique",
            "Devis transparent et sans surprise",
            "Assurance responsabilité civile professionnelle",
          ].map((engagement) => (
            <div key={engagement} className="flex items-center gap-3 rounded-xl border border-border bg-white p-4">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-pegase" />
              <span className="font-medium">{engagement}</span>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/contact" variant="pegase" size="lg">
            Demander un devis nettoyage
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionTitle badge="FAQ" title="Questions fréquentes" />
        <div className="mx-auto max-w-3xl space-y-4">
          {[
            {
              q: "Quel est le lien entre Pégase et L3B Construction ?",
              a: "Pégase est la branche nettoyage professionnel de L3B. Cette complémentarité nous permet d'offrir une prestation complète, du gros œuvre au nettoyage final.",
            },
            {
              q: "Intervenez-vous pour le nettoyage de fin de chantier ?",
              a: "Oui, le nettoyage de fin de chantier est l'une de nos spécialités. Nous assurons la remise en état complète des locaux après travaux : dépoussiérage, nettoyage des surfaces, vitres et sols.",
            },
            {
              q: "Proposez-vous des contrats d'entretien régulier ?",
              a: "Oui, nous proposons des contrats sur mesure pour l'entretien régulier de bureaux, copropriétés et locaux industriels, avec une fréquence adaptée à vos besoins.",
            },
          ].map((faq) => (
            <details key={faq.q} className="group rounded-xl border border-border bg-muted p-6">
              <summary className="flex cursor-pointer items-center justify-between font-bold">
                {faq.q}
                <span className="ml-4 text-pegase transition-transform group-open:rotate-45">+</span>
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
