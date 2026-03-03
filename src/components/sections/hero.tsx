"use client";

import { Suspense, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((mod) => ({ default: mod.HeroScene })),
  { ssr: false },
);

const WORDS = ["Construire", "Rénover", "Bâtir", "Transformer"];

function RotatingWord() {
  const ref = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const interval = setInterval(() => {
      el.style.transform = "translateY(-100%)";
      el.style.opacity = "0";

      setTimeout(() => {
        indexRef.current = (indexRef.current + 1) % WORDS.length;
        el.textContent = WORDS[indexRef.current] ?? "";
        el.style.transform = "translateY(100%)";
        el.style.opacity = "0";

        requestAnimationFrame(() => {
          el.style.transform = "translateY(0)";
          el.style.opacity = "1";
        });
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block overflow-hidden h-[1.15em] align-bottom">
      <span
        ref={ref}
        className="inline-block transition-all duration-500 ease-out text-secondary"
      >
        {WORDS[0]}
      </span>
    </span>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Animated grid background */}
      <div className="absolute inset-0 hero-grid-bg" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-transparent to-primary-dark" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/60 via-transparent to-transparent" />

      {/* Three.js Scene */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Diagonal accent line */}
      <div className="absolute top-0 right-[30%] w-px h-full bg-gradient-to-b from-transparent via-secondary/20 to-transparent rotate-[15deg] origin-top" />
      <div className="absolute top-0 right-[60%] w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent rotate-[-10deg] origin-top" />

      <motion.div style={{ opacity, y }} className="relative z-10 w-full">
        <Container>
          <div className="max-w-5xl">
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="h-px w-12 bg-secondary" />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-secondary">
                Gros Oeuvre &bull; Renovation &bull; Ile-de-France
              </span>
            </motion.div>

            {/* Main heading - MASSIVE */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
            >
              <RotatingWord />,
              <br />
              <span className="text-white/90">c&apos;est notre</span>
              <br />
              <span className="relative">
                metier
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-secondary/40" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0 8 Q50 0 100 6 T200 4" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 sm:text-xl"
            >
              Du terrassement a la livraison, L3B vous accompagne sur tous vos projets
              de construction et renovation en Ile-de-France.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Button href="/contact" variant="secondary" size="lg" className="group">
                Demander un devis gratuit
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="tel:+33100000000" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                <Phone className="h-5 w-5" />
                Nous appeler
              </Button>
            </motion.div>
          </div>

          {/* Stats bar at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4 lg:mt-28"
          >
            {[
              { value: "50+", label: "Projets livres" },
              { value: "5 ans", label: "D'experience" },
              { value: "100%", label: "Clients satisfaits" },
              { value: "9", label: "Collaborateurs" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-extrabold text-white sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-white/40">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-white/30">Scroll</span>
        <div className="h-12 w-px bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
