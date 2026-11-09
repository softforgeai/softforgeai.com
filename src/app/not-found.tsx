import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid mask-fade-b" />
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-mono text-sm text-accent-fg">404</p>
        <h1 id="nf-title" className="mt-4 text-4xl font-semibold text-fg sm:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-5 max-w-md text-lg text-muted">
          The link may be broken or the page may have moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
