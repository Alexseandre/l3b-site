import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light" />
      <Container className="relative z-10 text-center">
        <p className="text-8xl font-extrabold text-secondary">404</p>
        <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
          Page introuvable
        </h1>
        <p className="mt-4 text-lg text-white/60">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="mt-8">
          <Button href="/" variant="secondary" size="lg">
            Retour à l&apos;accueil
          </Button>
        </div>
      </Container>
    </section>
  );
}
