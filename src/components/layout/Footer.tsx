import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { LinkedInIcon } from "@/components/brand/LinkedInIcon";
import { Container } from "@/components/ui/Section";
import { footerNav } from "@/content/navigation";
import { siteConfig, isDev } from "@/lib/site";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  const { email, linkedin } = siteConfig.contact;

  return (
    <footer className="border-t border-line">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" aria-label={`${siteConfig.name} — home`} className="inline-block rounded-md">
              <Logo />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.tagline} AI engineering, custom software, and cloud solutions for ambitious
              businesses worldwide.
            </p>
            <ul className="mt-6 flex flex-wrap items-center gap-3">
              {email ? (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <Mail aria-hidden className="size-4" />
                    {email}
                  </a>
                </li>
              ) : (
                isDev && (
                  <li className="rounded-md border border-dashed border-line-strong px-2 py-1 font-mono text-xs text-subtle">
                    Email placeholder — set NEXT_PUBLIC_CONTACT_EMAIL
                  </li>
                )
              )}
              {linkedin ? (
                <li>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.name} on LinkedIn (opens in a new tab)`}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
                  >
                    <LinkedInIcon className="size-4" />
                  </a>
                </li>
              ) : (
                isDev && (
                  <li className="rounded-md border border-dashed border-line-strong px-2 py-1 font-mono text-xs text-subtle">
                    LinkedIn placeholder — set NEXT_PUBLIC_LINKEDIN_URL
                  </li>
                )
              )}
            </ul>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title} className="md:col-span-3">
              <h2 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-subtle">
                {group.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-muted transition-colors hover:text-fg">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="font-mono">{siteConfig.domain}</p>
        </div>
      </Container>
    </footer>
  );
}
