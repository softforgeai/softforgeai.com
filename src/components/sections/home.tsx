import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Badge, Card, Container, IconTile, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVisual } from "./HeroVisual";
import { serviceCategories } from "@/content/services";
import { projects } from "@/content/projects";
import { audiences, capabilities, principles, problemsWeSolve, processSteps, techStack } from "@/content/home";
import { siteConfig } from "@/lib/site";

/* ------------------------------------------------------------------ Hero */

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid mask-fade-b" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-20%] -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 22%, transparent), transparent)",
        }}
      />
      <Container className="grid items-center gap-14 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div>
          <Badge tone="accent">AI engineering · Software · Automation</Badge>
          <h1
            id="hero-title"
            className="mt-6 text-[2.6rem] font-semibold leading-[1.02] text-fg sm:text-6xl lg:text-[4.25rem]"
          >
            Engineering Intelligence.{" "}
            <span className="text-gradient">Building What&apos;s Next.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            We build intelligent software, AI-powered automation, and scalable digital products that help
            ambitious businesses move faster and achieve more.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={siteConfig.cta.primary.href} size="lg" arrow>
              {siteConfig.cta.primary.label}
            </ButtonLink>
            <ButtonLink href="/services" size="lg" variant="secondary">
              Explore Our Services
            </ButtonLink>
          </div>
        </div>
        <Reveal delay={0.1}>
          <HeroVisual />
        </Reveal>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------- Capabilities */

export function CapabilitiesStrip() {
  return (
    <section aria-labelledby="capabilities-title" className="border-y border-line bg-surface/30">
      <Container className="py-10">
        <h2
          id="capabilities-title"
          className="text-center font-mono text-xs font-medium uppercase tracking-[0.16em] text-subtle"
        >
          Core capabilities
        </h2>
        <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
          {capabilities.map(({ label, icon: Icon }) => (
            <li key={label} className="flex items-center justify-center gap-2.5 text-sm text-muted">
              <Icon aria-hidden className="size-4 shrink-0 text-fg/70" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------ What we do */

export function WhatWeDo() {
  return (
    <Section labelledBy="what-title">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            id="what-title"
            eyebrow="What we do"
            title="We turn ambitious ideas into intelligent, production-ready software."
            description="SoftForge AI combines modern software engineering, applied AI, and business-focused problem-solving. We work as your engineering partner — from the first conversation to launch and beyond."
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-6">
          <Reveal>
            <Card className="h-full">
              <h3 className="text-sm font-medium text-fg">Who we help</h3>
              <ul className="mt-5 space-y-3">
                {audiences.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-fg" />
                    {a}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="h-full">
              <h3 className="text-sm font-medium text-fg">Problems we solve</h3>
              <ul className="mt-5 space-y-3">
                {problemsWeSolve.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-2" />
                    {p}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- Services */

export function ServicesOverview() {
  return (
    <Section labelledBy="services-title" className="border-t border-line">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          id="services-title"
          eyebrow="Our services"
          title="Three disciplines. One engineering partner."
          description="AI, product engineering, and cloud infrastructure under one roof, so nothing gets lost between vendors."
        />
        <ButtonLink href="/services" variant="secondary" arrow className="shrink-0 self-start md:self-auto">
          All services
        </ButtonLink>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {serviceCategories.map((category, i) => {
          const Icon = category.icon;
          return (
            <Reveal key={category.id} delay={i * 0.08} className="h-full">
              <Link
                href={category.href}
                className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-7 transition-colors duration-300 hover:border-line-strong hover:bg-surface sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <IconTile>
                    <Icon aria-hidden />
                  </IconTile>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 text-subtle transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                  />
                </div>
                <h3 className="mt-8 text-xl font-semibold text-fg">{category.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{category.description}</p>
                <ul className="mt-7 space-y-2.5 border-t border-line pt-6">
                  {category.offerings.map((o) => (
                    <li key={o} className="flex items-center gap-2.5 text-sm text-muted">
                      <span aria-hidden className="size-1 rounded-full bg-accent" />
                      {o}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ Why */

export function WhyUs() {
  return (
    <Section labelledBy="why-title" className="border-t border-line">
      <SectionHeading
        id="why-title"
        eyebrow="Why SoftForge AI"
        title="Serious engineering, practical AI."
        description="AI is only valuable when it works reliably inside your business. Here is how we make sure it does."
      />
      <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {principles.map(({ title, description, icon: Icon }, i) => (
          <Reveal as="li" key={title} delay={(i % 3) * 0.06} className="bg-bg p-7 sm:p-8">
            <Icon aria-hidden className="size-5 text-accent-fg" />
            <h3 className="mt-5 font-semibold text-fg">{title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">{description}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------------------------------------------------- Selected work */

export function SelectedWork() {
  return (
    <Section labelledBy="work-title" className="border-t border-line">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title="The kind of systems we build."
          description="Demonstration projects that illustrate our approach. Client case studies will be published here as engagements are approved for release."
        />
        <ButtonLink href="/work" variant="secondary" arrow className="shrink-0 self-start md:self-auto">
          View all work
        </ButtonLink>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08} className="h-full">
            <Link
              href={`/work#${project.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-7 transition-colors duration-300 hover:border-line-strong hover:bg-surface"
            >
              <div className="flex flex-wrap items-center gap-2">
                {project.isDemo && <Badge tone="accent">Demonstration</Badge>}
                <Badge>{project.industry}</Badge>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-fg">{project.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg">
                Read the breakdown
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- Process */

export function Process() {
  return (
    <Section id="process" labelledBy="process-title" className="border-t border-line">
      <SectionHeading
        id="process-title"
        eyebrow="Our process"
        title="A clear path from idea to impact."
        description="A predictable, collaborative process with working software at every stage — so you always know where your project stands."
      />
      <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {processSteps.map(({ title, description, icon: Icon }, i) => (
          <Reveal as="li" key={title} delay={i * 0.06} className="relative">
            <div className="h-full rounded-2xl border border-line bg-surface/60 p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <Icon aria-hidden className="size-5 text-accent-fg" />
              </div>
              <h3 className="mt-8 font-semibold text-fg">{title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{description}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/* ------------------------------------------------------------ Tech stack */

export function TechStack() {
  return (
    <Section labelledBy="stack-title" className="border-t border-line">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            id="stack-title"
            eyebrow="Technology"
            title="Modern, proven tools."
            description="We choose technology for reliability and long-term maintainability — and stay model-agnostic so you're never locked into one AI provider."
          />
        </div>
        <dl className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
          {techStack.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.06}>
              <dt className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-subtle">
                {group.group}
              </dt>
              <dd className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-line bg-surface/60 px-3 py-1.5 text-sm text-muted"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </Section>
  );
}
