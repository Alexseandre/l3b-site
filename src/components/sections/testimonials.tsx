"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

import { Section } from "@/components/ui/section";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <Section background="muted" id="temoignages">
      <SectionTitle
        badge="Témoignages"
        title="Ils nous font confiance"
        description="Nos clients témoignent de la qualité de nos prestations et de notre engagement à leurs côtés."
      />

      <div className="grid gap-8 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <Card className="relative h-full bg-white">
              <Quote className="absolute top-6 right-6 h-8 w-8 text-secondary/15" />
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={`star-${testimonial.name}-${i}`}
                    className="h-4 w-4 fill-secondary text-secondary"
                  />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="mt-auto border-t border-border pt-4">
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
