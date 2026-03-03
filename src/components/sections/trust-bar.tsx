"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FileCheck, HardHat, Leaf, Scale, Clock } from "lucide-react";

import { Section } from "@/components/ui/section";

const CERTIFICATIONS = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Garantie Décennale",
    description: "Assurance couvrant vos ouvrages pendant 10 ans",
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    title: "RC Professionnelle",
    description: "Responsabilité civile pour tous nos chantiers",
  },
  {
    icon: <Scale className="h-6 w-6" />,
    title: "Normes DTU",
    description: "Conformité aux Documents Techniques Unifiés",
  },
  {
    icon: <HardHat className="h-6 w-6" />,
    title: "Eurocodes",
    description: "Calcul de structures selon les normes européennes",
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "RE2020",
    description: "Conformité à la réglementation environnementale",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "PPSPS",
    description: "Plans de sécurité systématiques sur chantier",
  },
] as const;

const PARTNERS = [
  { name: "Groupe ADF", description: "Ingénierie industrielle" },
  { name: "FEHR Group", description: "Prémurs béton" },
  { name: "Transdev IDF", description: "Transport & infrastructure" },
  { name: "Lidl France", description: "Distribution" },
] as const;

export function TrustBar() {
  return (
    <Section background="anthracite">
      {/* Certifications */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="section-accent-line" />
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-secondary">
            Normes & Garanties
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          Conformité et <span className="text-secondary">sécurité</span> sur
          chaque chantier.
        </motion.h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-secondary/30 hover:bg-white/8"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary/15 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
              {cert.icon}
            </div>
            <div>
              <h3 className="font-bold text-white">{cert.title}</h3>
              <p className="mt-0.5 text-sm text-white/50">{cert.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Partners */}
      <div className="mt-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
            Ils nous font confiance
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              className="group text-center"
            >
              <div className="flex h-16 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 transition-all duration-300 hover:border-secondary/30 hover:bg-white/8">
                <span className="text-lg font-bold text-white/60 transition-colors group-hover:text-white">
                  {partner.name}
                </span>
              </div>
              <p className="mt-2 text-xs text-white/30">{partner.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
