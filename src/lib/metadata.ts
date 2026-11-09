import type { Metadata } from "next";
import { siteConfig } from "./site";
import { ogAlt, ogSize } from "./og-config";

// Pages that define their own openGraph replace the root object, so the
// shared social image is attached explicitly.
const ogImage = { url: "/opengraph-image", ...ogSize, alt: ogAlt, type: "image/png" };

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

/** Per-page metadata with canonical URL, Open Graph and Twitter tags. */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
  };
}
