import { Lightbulb, Wrench, Sprout } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { ButtonLink } from "@/components/ui/Button";
import { Card, IconTile, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { audiences, principles } from "@/content/home";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "SoftForge AI brings together software engineering, artificial intelligence, and thoughtful product development to help businesses turn ambitious ideas into scalable solutions.",
  path: "/about",
});

const approach = [
  {
    title: "Understand the problem",
    description:
      "We start by learning how your business works, who your users are, and what outcome actually matters — before writing a line of code.",
    icon: Lightbulb,
  },
  {
    title: "Engineer the right solution",
    description:
      "We choose the simplest architecture that solves the problem well, and apply AI where it adds real value rather than complexity.",
    icon: Wrench,
  },
  {
    title: "Build lasting value",
    description:
      "We ship maintainable, documented software that your team owns, and we stay on hand to help it grow.",
    icon: Sprout,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About SoftForge AI"
        title="Technology should create opportunities."
        description="We're an AI-powered software engineering company helping startups and growing businesses build intelligent products, automate operations, and scale with confidence."
      />

      <Section labelledBy="vision-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="vision-title" eyebrow="Our vision" title="Why we exist." />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-8">
            <p className="text-2xl leading-snug text-fg sm:text-3xl">
              At SoftForge AI, we believe technology should do more than solve problems. It should create
              opportunities.
            </p>
            <p>
              We bring together modern software engineering, artificial intelligence, and thoughtful product
              development to help businesses turn ambitious ideas into practical, scalable solutions.
            </p>
            <p>
              Our approach is simple: understand the problem, engineer the right solution, and build
              technology that creates lasting value.
            </p>
          </div>
        </div>
      </Section>

      <Section labelledBy="approach-title" className="border-t border-line">
        <SectionHeading id="approach-title" eyebrow="Our approach" title="Simple principles, applied rigorously." />
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {approach.map(({ title, description, icon: Icon }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08}>
              <Card className="h-full">
                <div className="flex items-center justify-between">
                  <IconTile>
                    <Icon aria-hidden />
                  </IconTile>
                  <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-fg">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
              </Card>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section labelledBy="values-title" className="border-t border-line">
        <SectionHeading
          id="values-title"
          eyebrow="How we work"
          title="What you can expect from us."
          description="These commitments shape every engagement, whatever its size."
        />
        <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map(({ title, description, icon: Icon }) => (
            <li key={title} className="border-t border-line pt-6">
              <Icon aria-hidden className="size-5 text-accent-fg" />
              <h3 className="mt-4 font-semibold text-fg">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="clients-title" className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="clients-title"
              eyebrow="Who we work with"
              title="Built for ambitious teams, worldwide."
              description="We partner with businesses across the United States, United Kingdom, Canada, Australia, and Europe — working remotely with clear communication across time zones."
            />
            <ButtonLink href={siteConfig.cta.primary.href} arrow className="mt-8">
              {siteConfig.cta.primary.label}
            </ButtonLink>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {audiences.map((a) => (
              <li
                key={a}
                className="rounded-xl border border-line bg-surface/60 px-5 py-4 text-sm font-medium text-fg"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
