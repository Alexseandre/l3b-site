"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <Section background="primary" className="relative overflow-hidden">
      {/* Blueprint grid */}
      <div className="absolute inset-0 hero-grid-bg opacity-50" />

      {/* Glow accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-pegase/8 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative max-w-3xl mx-auto text-center"
      >
        <div className="mb-6 flex justify-center">
          <div className="section-accent-line mx-auto" />
        </div>

        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Votre prochain
          <br />
          <span className="text-secondary">projet commence ici.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/50">
          Construction, renovation, nettoyage &mdash; discutons de votre projet.
          Devis gratuit sous 48h.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contact" variant="secondary" size="lg" className="group">
            Demander un devis gratuit
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            href="tel:+33100000000"
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/10 hover:text-white"
          >
            <Phone className="h-5 w-5" />
            Nous appeler
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
