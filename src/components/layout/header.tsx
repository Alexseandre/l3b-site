"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AnimatedLogo } from "@/components/ui/animated-logo";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent",
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-20" aria-label="Navigation principale">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-50"
            aria-label={`${SITE_CONFIG.shortName} - Retour à l'accueil`}
          >
            <AnimatedLogo
              variant="full"
              size="sm"
              light={!isScrolled && !isMenuOpen}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  pathname === link.href
                    ? isScrolled
                      ? "text-secondary bg-secondary/10"
                      : "text-secondary"
                    : isScrolled
                      ? "text-foreground hover:text-primary hover:bg-muted"
                      : "text-white/80 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button href="/contact" variant={isScrolled ? "primary" : "outline"} size="sm">
              <Phone className="h-4 w-4" />
              Nous contacter
            </Button>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            className={cn(
              "relative z-50 flex items-center justify-center w-10 h-10 rounded-lg lg:hidden",
              "transition-colors duration-200",
              isMenuOpen
                ? "text-primary"
                : isScrolled
                  ? "text-foreground"
                  : "text-white",
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </Container>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "text-2xl font-bold transition-colors duration-200",
                      pathname === link.href
                        ? "text-secondary"
                        : "text-foreground hover:text-primary",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-4"
              >
                <Button href="/contact" variant="primary" size="lg">
                  <Phone className="h-5 w-5" />
                  Nous contacter
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
