"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

import { Section } from "@/components/ui/section";
import { KEY_FIGURES } from "@/lib/constants";

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function KeyFigures() {
  return (
    <Section background="primary" id="chiffres">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {KEY_FIGURES.map((figure, index) => (
          <motion.div
            key={figure.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <p className="text-4xl font-extrabold text-secondary sm:text-5xl lg:text-6xl">
              <AnimatedCounter target={figure.value} suffix={figure.suffix} />
            </p>
            <p className="mt-2 text-sm text-white/60 sm:text-base">{figure.label}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
