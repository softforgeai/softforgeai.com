import Link from "next/link";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { ButtonLink } from "@/components/ui/Button";
import { Container, IconTile } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { services } from "@/content/services";
import { servicesSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "AI Engineering, SaaS & Software Development Services",
  description:
    "AI agent development, business automation, custom software, SaaS development, cloud & DevOps, and AI integration consulting for startups and growing businesses.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesSchema()} />
      <PageHeader
        eyebrow="Services"
        title="Engineering services for intelligent products."
        description="From AI agents and automation to SaaS platforms and cloud infrastructure, we design, build, and scale software that solves real business problems."
      >
        <nav aria-label="Services on this page">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={`#${s.id}`}
                  className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  {s.eyebrow.replace(/^\d+\s—\s/, "")}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <div className="divide-y divide-line">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <section
              key={service.id}
              id={service.id}
              aria-labelledby={`${service.id}-title`}
              className="py-20 md:py-28"
            >
              <Container>
                <div className="grid gap-12 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <div className="lg:sticky lg:top-28">
                      <IconTile>
                        <Icon aria-hidden />
                      </IconTile>
                      <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-accent-fg">
                        {service.eyebrow}
                      </p>
                      <h2
                        id={`${service.id}-title`}
                        className="mt-3 text-3xl font-semibold leading-tight text-fg sm:text-4xl"
                      >
                        {service.title}
                      </h2>
                      <p className="mt-5 leading-relaxed text-muted">{service.summary}</p>
                      <ButtonLink
                        href={`/contact?service=${service.id}`}
                        variant="secondary"
                        arrow
                        className="mt-8"
                      >
                        {siteConfig.cta.secondary.label}
                      </ButtonLink>
                    </div>
                  </div>

                  <div className="space-y-5 lg:col-span-7">
                    <Reveal>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="rounded-2xl border border-line bg-surface/60 p-6">
                          <h3 className="text-sm font-medium text-fg">Business problems we address</h3>
                          <ul className="mt-4 space-y-3">
                            {service.problems.map((p) => (
                              <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent-2" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-2xl border border-line bg-surface/60 p-6">
                          <h3 className="text-sm font-medium text-fg">Key capabilities</h3>
                          <ul className="mt-4 space-y-3">
                            {service.capabilities.map((c) => (
                              <li key={c} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-fg" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Reveal>
                    <Reveal delay={0.06}>
                      <div className="rounded-2xl border border-line bg-surface/60 p-6">
                        <h3 className="text-sm font-medium text-fg">Example use cases</h3>
                        <ul className="mt-5 grid gap-6 md:grid-cols-3">
                          {service.useCases.map((u) => (
                            <li key={u.title}>
                              <p className="font-medium text-fg">{u.title}</p>
                              <p className="mt-2 text-sm leading-relaxed text-muted">{u.description}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      <FinalCta
        title="Not sure which service fits?"
        description="Describe the problem you're trying to solve. We'll recommend the right approach — even if that means a smaller first step."
      />
    </>
  );
}
