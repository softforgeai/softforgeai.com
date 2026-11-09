import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Bump when page content changes meaningfully.
const LAST_UPDATED = "2026-11-09";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/work", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: LAST_UPDATED,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
