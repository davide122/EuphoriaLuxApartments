import { noir, suites } from "@/lib/noir";
import { BLOG_POSTS, SEO_LANDINGS } from "@/lib/seo-content";

export type SeoIntent = "transazionale" | "informativo" | "locale";

export type SeoMapEntry = {
  url: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: SeoIntent;
  primaryCta: "WhatsApp" | "Suites";
};

export const SEO_MAP: SeoMapEntry[] = [
  {
    url: "/",
    primaryKeyword: `${noir.name} Luxury Suite`,
    secondaryKeywords: [
      `luxury suite ${noir.location}`,
      "suite con jacuzzi privata",
      "suite con sauna interna",
    ],
    intent: "transazionale",
    primaryCta: "WhatsApp",
  },
  {
    url: "/suites",
    primaryKeyword: "suite con jacuzzi privata e sauna",
    secondaryKeywords: [
      `suite luxury ${noir.location}`,
      "Passion suite",
      "Infinity suite",
    ],
    intent: "transazionale",
    primaryCta: "WhatsApp",
  },
  ...suites.map((s) => ({
    url: `/suites/${s.slug}`,
    primaryKeyword: `suite ${s.name} con jacuzzi privata e sauna`,
    secondaryKeywords: [
      `suite ${s.name} ${noir.location}`,
      "cucina completa con forno",
      "Wi‑Fi e condizionatori",
    ],
    intent: "transazionale" as const,
    primaryCta: "WhatsApp" as const,
  })),
  ...SEO_LANDINGS.map((l) => ({
    url: `/${l.slug}`,
    primaryKeyword: l.primaryKeyword,
    secondaryKeywords: [
      `${noir.name} ${noir.location}`,
      "jacuzzi privata",
      "sauna interna",
      "prenotazione diretta WhatsApp",
    ],
    intent: "locale" as const,
    primaryCta: "WhatsApp" as const,
  })),
  {
    url: "/blog",
    primaryKeyword: "guide weekend romantico e suite",
    secondaryKeywords: ["suite romantica Sicilia", "weekend romantico Agrigento", "jacuzzi privata in suite"],
    intent: "informativo",
    primaryCta: "Suites",
  },
  ...BLOG_POSTS.map((p) => ({
    url: `/blog/${p.slug}`,
    primaryKeyword: p.primaryKeyword,
    secondaryKeywords: [
      `${noir.location}`,
      "prenotazione diretta WhatsApp",
      `da €${noir.startingFrom}/notte`,
    ],
    intent: "informativo" as const,
    primaryCta: "WhatsApp" as const,
  })),
];
