import { type MetadataRoute } from "next";
import { noir } from "@/lib/noir";
import { BLOG_POSTS, SEO_LANDINGS } from "@/lib/seo-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = noir.siteUrl;
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/prenota`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/suites`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/suites/passion`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/suites/infinity`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    ...BLOG_POSTS.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.dateModifiedISO ?? p.datePublishedISO),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...SEO_LANDINGS.map((l) => ({
      url: `${base}/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
