import type { MetadataRoute } from "next";
import { supportPages } from "@/data/content";

// No lastModified: a date that changes on every build tells Google nothing,
// and it learns to ignore the field. Add a real date per page if one is kept.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ringebutannlegesenter.no";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/behandlinger`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/kontakt`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/symptomer`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/informasjon`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/priser`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/dekning`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/personvern`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/vilkar`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // supportPages render at /dekning/<slug>, not /informasjon/<slug>. The old
  // template pointed every one of these at a route that does not exist, so all
  // six were 404s in the sitemap.
  const infoPages: MetadataRoute.Sitemap = supportPages.map((page) => ({
    url: `${baseUrl}/dekning/${page.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...infoPages];
}
