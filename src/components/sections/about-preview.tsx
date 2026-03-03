"use client";

import { motion } from "framer-motion";
import { Users, ShieldCheck, Clock, Award, ArrowRight } from "lucide-react";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

const VALUES = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Qualite & Securite",
    description: "Exigence sur chaque chantier. Zero compromis.",
    accent: "from-secondary to-secondary-dark",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Delais tenus",
    description: "Une equipe mobilisee, des plannings respectes.",
    accent: "from-secondary to-secondary-dark",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Ecoute client",
    description: "Le maitre d'ouvrage au coeur de chaque decision.",
    accent: "from-secondary to-secondary-dark",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Expertise BTP",
    description: "Un savoir-faire issu des plus grands groupes.",
    accent: "from-secondary to-secondary-dark",
  },
] as const;

export function AboutPreview() {
  return (
    <Section id="a-propos-preview" background="muted">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Text side */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="section-accent-line" />
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-secondary">
              Qui sommes-nous
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Nes dans le BTP,
            <br />
            <span className="text-secondary">batis pour durer.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-muted-foreground"
          >
            Fondee en 2020 par des professionnels issus de grands groupes de la construction,
            L3B a pour ambition de revitaliser la relation client en remettant l&apos;ecoute et
            la qualite au coeur de chaque projet.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
          >
            Du gros oeuvre au nettoyage de fin de chantier avec Pegase, nous offrons
            une prestation complete, de A a Z.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <Button href="/a-propos" variant="primary" className="group">
              Decouvrir L3B
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-2 gap-4">
          {VALUES.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Accent top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-secondary-light opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white transition-colors group-hover:bg-secondary">
                {value.icon}
              </div>
              <h3 className="mb-1.5 font-bold text-foreground">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
