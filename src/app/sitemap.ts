import { type MetadataRoute } from "next";
import { noir, suites } from "@/lib/noir";
import { BLOG_POSTS, SEO_LANDINGS } from "@/lib/seo-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = noir.siteUrl.replace(/\/$/, "");
  const now = new Date();

  const abs = (pathOrUrl: string) => {
    if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
    return `${base}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
  };

  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>();
  const push = (e: MetadataRoute.Sitemap[number]) => {
    byUrl.set(e.url, e);
  };

  push({
    url: `${base}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
    images: [abs("/passion-letto-jacuzzi-sauna.jpg"), abs("/infinity-letto.jpg")],
  });

  push({
    url: `${base}/suites`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
    images: suites.map((s) => abs(s.cover)),
  });

  for (const s of suites) {
    push({
      url: `${base}/suites/${s.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      images: [abs(s.cover)],
    });
  }

  push({
    url: `${base}/blog`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.65,
    images: BLOG_POSTS.length ? [abs(BLOG_POSTS[0].heroImage.src)] : undefined,
  });

  for (const p of BLOG_POSTS) {
    push({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.dateModifiedISO ?? p.datePublishedISO),
      changeFrequency: "monthly",
      priority: 0.55,
      images: [abs(p.heroImage.src)],
    });
  }

  for (const l of SEO_LANDINGS) {
    push({
      url: `${base}/${l.slug}`,
      lastModified: l.dateModifiedISO ? new Date(l.dateModifiedISO) : now,
      changeFrequency: "monthly",
      priority: 0.75,
      images: [abs(l.hero.image.src)],
    });
  }

  return Array.from(byUrl.values()).sort((a, b) => a.url.localeCompare(b.url));
}
