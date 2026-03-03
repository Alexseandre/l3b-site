"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Linkedin } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";

const CONTACT_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      url: `${SITE_CONFIG.url}/contact`,
      name: "Contactez L3B Construction & Rénovation",
      description: "Demandez un devis gratuit ou contactez-nous pour votre projet de construction ou de nettoyage.",
      mainEntity: { "@id": `${SITE_CONFIG.url}/#localbusiness` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_CONFIG.url },
        { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_CONFIG.url}/contact` },
      ],
    },
  ],
};

const CONTACT_INFO = [
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Adresse",
    value: `${SITE_CONFIG.address.street}\n${SITE_CONFIG.address.postalCode} ${SITE_CONFIG.address.city}`,
    href: `https://maps.google.com/?q=${encodeURIComponent(`${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.postalCode} ${SITE_CONFIG.address.city}`)}`,
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Téléphone",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone}`,
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: "Horaires",
    value: "Lun — Ven : 8h00 — 18h00",
    href: undefined,
  },
] as const;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <>
      <JsonLd data={CONTACT_JSON_LD} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <Container className="relative z-10">
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/90">
            Contact
          </span>
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Parlons de votre projet
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
            Un projet de construction, de rénovation ou de nettoyage ?
            Contactez-nous pour un devis gratuit sous 48h.
          </p>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="mb-8 text-2xl font-bold">Demande de devis gratuit</h2>

            {isSubmitted ? (
              <Card hover={false} className="bg-pegase/5 border-pegase/20 text-center py-12">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pegase/10">
                  <Send className="h-8 w-8 text-pegase" />
                </div>
                <h3 className="text-xl font-bold">Message envoyé !</h3>
                <p className="mt-2 text-muted-foreground">
                  Nous reviendrons vers vous sous 48h. Merci pour votre confiance.
                </p>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
                      Prénom *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className={cn(
                        "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm",
                        "transition-colors placeholder:text-muted-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent",
                      )}
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
                      Nom *
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className={cn(
                        "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm",
                        "transition-colors placeholder:text-muted-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent",
                      )}
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className={cn(
                        "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm",
                        "transition-colors placeholder:text-muted-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent",
                      )}
                      placeholder="votre@email.fr"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={cn(
                        "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm",
                        "transition-colors placeholder:text-muted-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent",
                      )}
                      placeholder="06 00 00 00 00"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="mb-2 block text-sm font-medium">
                    Type de prestation *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className={cn(
                      "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm",
                      "transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent",
                    )}
                  >
                    <option value="">Sélectionnez une prestation</option>
                    <option value="gros-oeuvre">Construction — Gros Œuvre</option>
                    <option value="renovation">Construction — Rénovation</option>
                    <option value="maitrise-oeuvre">Construction — Maîtrise d&apos;Œuvre</option>
                    <option value="nettoyage-chantier">Nettoyage — Fin de chantier</option>
                    <option value="nettoyage-industriel">Nettoyage — Industriel</option>
                    <option value="nettoyage-bureaux">Nettoyage — Bureaux</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Votre message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className={cn(
                      "w-full resize-none rounded-lg border border-border bg-white px-4 py-3 text-sm",
                      "transition-colors placeholder:text-muted-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent",
                    )}
                    placeholder="Décrivez votre projet, vos besoins, vos contraintes..."
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                  Envoyer ma demande
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>

          {/* Sidebar contact info */}
          <div className="lg:col-span-2">
            <h2 className="mb-8 text-2xl font-bold">Nos coordonnées</h2>
            <div className="space-y-6">
              {CONTACT_INFO.map((info) => (
                <div key={info.label} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.label === "Adresse" ? "_blank" : undefined}
                        rel={info.label === "Adresse" ? "noopener noreferrer" : undefined}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary whitespace-pre-line"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* LinkedIn */}
            <div className="mt-8 rounded-2xl border border-border bg-muted p-6">
              <h3 className="mb-3 font-bold">Suivez-nous</h3>
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-secondary"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn L3B Construction
              </a>
            </div>

            {/* Map placeholder */}
            <div className="mt-8 flex h-48 items-center justify-center rounded-2xl border border-border bg-muted">
              <div className="text-center text-muted-foreground">
                <MapPin className="mx-auto mb-2 h-8 w-8 opacity-40" />
                <p className="text-sm">Carte interactive</p>
                <p className="text-xs">(Google Maps à intégrer)</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
