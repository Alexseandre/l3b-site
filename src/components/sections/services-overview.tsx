"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Hammer,
  ClipboardList,
  Layers,
  Sparkles,
  Factory,
  Briefcase,
  Home,
  ArrowRight,
} from "lucide-react";
import type { ReactNode } from "react";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { SERVICES_CONSTRUCTION, SERVICES_NETTOYAGE } from "@/lib/constants";

const ICON_MAP_CONSTRUCTION: Record<string, ReactNode> = {
  building: <Building2 className="h-6 w-6" />,
  hammer: <Hammer className="h-6 w-6" />,
  clipboard: <ClipboardList className="h-6 w-6" />,
  layers: <Layers className="h-6 w-6" />,
};

const ICON_MAP_NETTOYAGE: Record<string, ReactNode> = {
  sparkles: <Sparkles className="h-6 w-6" />,
  factory: <Factory className="h-6 w-6" />,
  briefcase: <Briefcase className="h-6 w-6" />,
  home: <Home className="h-6 w-6" />,
};

export function ServicesOverview() {
  return (
    <Section id="services">
      {/* Section header */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="section-accent-line" />
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-secondary">
            Nos expertises
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
        >
          Deux metiers,
          <br />
          <span className="text-secondary">une meme exigence.</span>
        </motion.h2>
      </div>

      {/* L3B Construction */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary">L3B Construction</h3>
            <p className="text-sm text-muted-foreground">Gros oeuvre &amp; renovation</p>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES_CONSTRUCTION.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/5 hover:-translate-y-1"
            >
              {/* Number */}
              <span className="absolute top-5 right-5 text-5xl font-extrabold text-muted/50 leading-none">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-secondary group-hover:text-white">
                {ICON_MAP_CONSTRUCTION[service.icon]}
              </div>
              <h4 className="mb-2 text-lg font-bold">{service.title}</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Button href="/construction" variant="primary" className="group">
            Decouvrir nos services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      {/* Pégase Nettoyage */}
      <div className="rounded-3xl bg-gradient-to-br from-pegase/5 to-transparent border border-pegase/10 p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pegase text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Pegase Nettoyage</h3>
            <p className="text-sm text-muted-foreground">Proprete professionnelle</p>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES_NETTOYAGE.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group rounded-2xl bg-white/80 backdrop-blur-sm border border-pegase/10 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-pegase/10 text-pegase transition-colors group-hover:bg-pegase group-hover:text-white">
                {ICON_MAP_NETTOYAGE[service.icon]}
              </div>
              <h4 className="mb-1 font-bold">{service.title}</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Button href="/nettoyage" variant="pegase" className="group">
            Decouvrir Pegase
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
