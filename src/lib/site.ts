/**
 * Central site configuration.
 *
 * Public contact details are read from environment variables so they can be
 * changed per environment without touching code. Anything left unset is
 * simply not rendered in production (and shows as a labelled placeholder in
 * development so you can see where it will appear).
 */

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/** Only allow https links from config, so a typo can't produce a javascript: or http: URL. */
function httpsUrl(value: string | undefined): string | undefined {
  const v = clean(value);
  if (!v) return undefined;
  try {
    return new URL(v).protocol === "https:" ? v : undefined;
  } catch {
    return undefined;
  }
}

/** Basic sanity check so a malformed value never renders as a mailto: link. */
function emailAddress(value: string | undefined): string | undefined {
  const v = clean(value);
  return v && /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(v) ? v : undefined;
}

export const siteConfig = {
  name: "SoftForge AI",
  legalName: "SoftForge AI",
  url: (clean(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://softforgeai.com").replace(/\/$/, ""),
  domain: "softforgeai.com",
  tagline: "Engineering Intelligence. Building What's Next.",
  description:
    "SoftForge AI is an AI software development company. We build AI agents, intelligent automation, and scalable SaaS products for startups and growing businesses.",
  shortDescription:
    "AI engineering, custom software, and cloud solutions for ambitious businesses.",
  contact: {
    email: emailAddress(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    linkedin: httpsUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    calendarUrl: httpsUrl(process.env.NEXT_PUBLIC_CALENDAR_URL),
  },
  cta: {
    primary: { label: "Let's Build Together", href: "/contact" },
    secondary: { label: "Discuss Your Project", href: "/contact" },
  },
} as const;

export const isDev = process.env.NODE_ENV !== "production";

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}
