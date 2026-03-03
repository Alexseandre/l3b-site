import type { Metadata } from "next";
import { Users, ShieldCheck, Clock, Award, Target, Heart } from "lucide-react";

import { generatePageMetadata } from "@/lib/metadata";
import { SITE_CONFIG } from "@/lib/constants";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { SectionTitle } from "@/components/ui/section-title";
import { KeyFigures } from "@/components/sections/key-figures";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = generatePageMetadata({
  title: "À propos de L3B — Notre Histoire & Nos Valeurs",
  description:
    "Découvrez L3B Construction & Rénovation : fondée en 2020 par des professionnels du BTP, notre mission est de remettre le client au centre du projet.",
  path: "/a-propos",
});

const VALUES = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Client au centre",
    description:
      "Nous remettons le maître d'ouvrage au cœur de chaque décision. Votre projet est notre priorité absolue.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Qualité & Sécurité",
    description:
      "Aucun compromis sur la qualité des matériaux et le respect des normes de sécurité sur nos chantiers.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Réactivité",
    description:
      "Une organisation agile et des équipes mobilisées pour tenir nos engagements de délais.",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Expertise",
    description:
      "Un savoir-faire technique forgé au sein des plus grands groupes du BTP français.",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Rigueur",
    description:
      "Une méthodologie éprouvée, un suivi de chantier transparent et des processus structurés.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Engagement",
    description:
      "Une équipe passionnée qui s'investit personnellement dans la réussite de chaque projet.",
  },
] as const;

const ABOUT_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      url: `${SITE_CONFIG.url}/a-propos`,
      name: "À propos de L3B Construction & Rénovation",
      description:
        "Fondée en 2020 par des professionnels du BTP, L3B a pour mission de remettre le client au centre du projet.",
      mainEntity: { "@id": `${SITE_CONFIG.url}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_CONFIG.url },
        { "@type": "ListItem", position: 2, name: "À propos", item: `${SITE_CONFIG.url}/a-propos` },
      ],
    },
  ],
};

export default function AProposPage() {
  return (
    <>
      <JsonLd data={ABOUT_JSON_LD} />

      <PageHero
        badge="Notre histoire"
        title="Bâtir la confiance, projet après projet"
        description="Fondée en 2020 à Linas, L3B Construction & Rénovation est née de la volonté de professionnels expérimentés de replacer le client au cœur du métier."
      />

      {/* Notre histoire */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionTitle
            badge="Depuis 2020"
            title="D'où nous venons"
          />
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Les fondateurs de L3B sont issus de grands groupes du secteur de la construction.
              Forts de cette expérience, ils ont fait le choix de créer une structure à taille
              humaine pour <strong className="text-foreground">remettre le client au centre du projet</strong>.
            </p>
            <p>
              Notre ambition : revitaliser la relation maître d&apos;ouvrage / entreprise en
              revenant aux fondamentaux du métier — l&apos;écoute, la qualité et le respect
              des engagements.
            </p>
            <p>
              Aujourd&apos;hui, avec notre branche <strong className="text-pegase">Pégase</strong> dédiée
              au nettoyage professionnel, nous offrons une prestation complète du gros œuvre
              jusqu&apos;à la remise en état finale des locaux.
            </p>
          </div>
        </div>
      </Section>

      {/* Valeurs */}
      <Section background="muted">
        <SectionTitle
          badge="Nos valeurs"
          title="Ce qui nous guide au quotidien"
          description="Six principes fondamentaux qui définissent notre façon de travailler et notre engagement envers chaque client."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title} className="rounded-2xl border border-border bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                {value.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold">{value.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <KeyFigures />

      {/* Équipe */}
      <Section>
        <SectionTitle
          badge="L'équipe"
          title="Des hommes et des femmes de terrain"
          description="Notre force, c'est notre équipe. Des professionnels passionnés, encadrés par un Maître Compagnon, qui garantissent la qualité sur chaque chantier."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Olivier Bocarren", role: "Président", description: "Pilotage stratégique et relation client" },
            { name: "Bocarren Jr.", role: "Fils du patron", description: "Appui opérationnel et suivi de projets" },
            { name: "Da Silva Abreu A.", role: "Maître Compagnon", description: "Coordination chantier, sécurité et encadrement" },
            { name: "L'équipe L3B", role: "Compagnons", description: "6 à 9 collaborateurs qualifiés et formés" },
          ].map((member) => (
            <div key={member.name} className="text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <Users className="h-10 w-10 text-muted-foreground/40" />
              </div>
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-sm font-medium text-secondary">{member.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{member.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
