import { CalendarDays, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { LinkedInIcon } from "@/components/brand/LinkedInIcon";
import { Container, Eyebrow } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig, isDev } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact — Start Your Project",
  description:
    "Tell us about your AI, software, or SaaS project. SoftForge AI works with startups and growing businesses in the US, UK, Canada, Australia, and Europe.",
  path: "/contact",
});

const nextSteps = [
  { title: "We review your inquiry", description: "Every message is read by an engineer, not a bot." },
  { title: "Introductory call", description: "We discuss your goals, constraints, and timeline." },
  { title: "Proposal & plan", description: "You receive a clear scope, approach, and estimate." },
];

function Placeholder({ label }: { label: string }) {
  if (!isDev) return null;
  return (
    <li className="rounded-lg border border-dashed border-line-strong px-3 py-2 font-mono text-xs text-subtle">
      {label}
    </li>
  );
}

export default function ContactPage() {
  const { email, linkedin, calendarUrl } = siteConfig.contact;

  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-grid mask-fade-b" />
      <Container className="grid gap-14 pb-24 pt-16 md:pb-32 md:pt-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>Contact</Eyebrow>
          <h1 id="page-title" className="mt-5 text-4xl font-semibold leading-[1.05] text-fg sm:text-5xl">
            Let&apos;s build together.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Tell us about your idea, product, or the process you want to automate. We&apos;ll get back to you
            to discuss how we can help.
          </p>

          <ol className="mt-12 space-y-6">
            {nextSteps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-xs text-muted">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-fg">{step.title}</p>
                  <p className="mt-1 text-sm text-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          {(email || linkedin || calendarUrl || isDev) && (
          <div className="mt-12 border-t border-line pt-8">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-subtle">
              Other ways to reach us
            </h2>
            <ul className="mt-5 space-y-3">
              {email ? (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-3 text-muted transition-colors hover:text-fg"
                  >
                    <Mail aria-hidden className="size-4" />
                    {email}
                  </a>
                </li>
              ) : (
                <Placeholder label="Business email placeholder — set NEXT_PUBLIC_CONTACT_EMAIL" />
              )}
              {linkedin ? (
                <li>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-muted transition-colors hover:text-fg"
                  >
                    <LinkedInIcon className="size-4" />
                    LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ) : (
                <Placeholder label="LinkedIn placeholder — set NEXT_PUBLIC_LINKEDIN_URL" />
              )}
              {calendarUrl ? (
                <li>
                  <a
                    href={calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-muted transition-colors hover:text-fg"
                  >
                    <CalendarDays aria-hidden className="size-4" />
                    Book a call<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ) : (
                <Placeholder label="Calendar booking (optional) — set NEXT_PUBLIC_CALENDAR_URL" />
              )}
            </ul>
          </div>
          )}
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
