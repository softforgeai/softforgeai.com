import { siteConfig, absoluteUrl } from "./site";
import { services } from "@/content/services";

const orgId = `${siteConfig.url}/#organization`;

export function organizationSchema() {
  const { email, linkedin } = siteConfig.contact;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.svg"),
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    ...(email && { email }),
    ...(linkedin && { sameAs: [linkedin] }),
    knowsAbout: [
      "Artificial intelligence",
      "AI agents",
      "Retrieval-augmented generation",
      "Business process automation",
      "SaaS development",
      "Custom software development",
      "Cloud infrastructure",
      "DevOps",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": orgId },
  };
}

export function servicesSchema() {
  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.eyebrow.replace(/^\d+\s—\s/, ""),
    description: service.summary,
    url: absoluteUrl(`/services#${service.id}`),
    provider: { "@id": orgId },
    areaServed: ["US", "GB", "CA", "AU", "EU"],
  }));
}
