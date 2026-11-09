import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site";

export function FinalCta({
  title = "Have an idea worth building?",
  description = "Tell us about your project. We'll help you shape the right solution and a realistic plan to deliver it.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="py-24 md:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-surface px-6 py-16 text-center sm:px-12 md:py-24">
          <div aria-hidden className="absolute inset-0 bg-grid mask-fade-b opacity-80" />
          <div
            aria-hidden
            className="absolute -top-40 left-1/2 h-80 w-[640px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 30%, transparent), transparent)",
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="cta-title" className="text-3xl font-semibold leading-tight text-fg sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{description}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={siteConfig.cta.primary.href} size="lg" arrow>
                {siteConfig.cta.primary.label}
              </ButtonLink>
              <ButtonLink href="/services" size="lg" variant="secondary">
                Explore Our Services
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
