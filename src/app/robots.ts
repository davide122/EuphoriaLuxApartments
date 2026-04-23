import { type MetadataRoute } from "next";
import { noir } from "@/lib/noir";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: `${noir.siteUrl}/sitemap.xml`,
    host: noir.siteUrl.replace(/^https?:\/\//, ""),
  };
}
