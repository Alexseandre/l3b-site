import Link from "next/link";
import { MapPin, Phone, Mail, Linkedin, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { AnimatedLogo } from "@/components/ui/animated-logo";

const FOOTER_SERVICES = [
  { label: "Gros Œuvre", href: "/construction" },
  { label: "Rénovation", href: "/construction" },
  { label: "Maîtrise d'Œuvre", href: "/construction" },
  { label: "Nettoyage Pégase", href: "/nettoyage" },
] as const;

export function Footer() {
  return (
    <footer className="bg-primary text-white" role="contentinfo">
      <Container>
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="L3B - Accueil">
              <AnimatedLogo variant="full" size="md" light />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {SITE_CONFIG.slogan}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-secondary"
                aria-label="LinkedIn L3B"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_SERVICES.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="group flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {service.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">
              Contact
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <span>
                  {SITE_CONFIG.address.street}
                  <br />
                  {SITE_CONFIG.address.postalCode} {SITE_CONFIG.address.city}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-secondary" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-secondary" />
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Tous droits réservés.</p>
          <p>SIRET : {SITE_CONFIG.siret}</p>
        </div>
      </Container>
    </footer>
  );
}
