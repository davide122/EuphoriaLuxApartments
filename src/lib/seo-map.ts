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
  ...SEO_LANDINGS.map((l) => {
    const defaultSecondary = [`${noir.name} ${noir.location}`, "jacuzzi privata", "sauna interna", "prenotazione diretta WhatsApp"];

    if (l.slug === "spa-porto-empedocle") {
      return {
        url: `/${l.slug}`,
        primaryKeyword: l.primaryKeyword,
        secondaryKeywords: [
          "spa privata Porto Empedocle",
          "suite spa Porto Empedocle",
          "spa privata Agrigento",
          "suite spa privata",
          "jacuzzi idromassaggio privata",
          "sauna interna privata",
          "centro benessere privato Porto Empedocle",
          "appartamento con jacuzzi Porto Empedocle",
          "casa vacanze Porto Empedocle con jacuzzi",
          "Scala dei Turchi",
          "Valle dei Templi",
          "prenotazione diretta WhatsApp",
        ],
        intent: "locale" as const,
        primaryCta: "WhatsApp" as const,
      };
    }

    if (l.slug === "suite-porto-empedocle") {
      return {
        url: `/${l.slug}`,
        primaryKeyword: l.primaryKeyword,
        secondaryKeywords: [
          "suite Porto Empedocle",
          "dove dormire a Porto Empedocle",
          "alloggio romantico Porto Empedocle",
          "suite con jacuzzi Porto Empedocle",
          "suite spa Porto Empedocle",
          "jacuzzi privata",
          "sauna interna",
          "weekend romantico Porto Empedocle",
          "prenotazione diretta WhatsApp",
        ],
        intent: "locale" as const,
        primaryCta: "WhatsApp" as const,
      };
    }

    if (l.slug === "suite-spa-porto-empedocle") {
      return {
        url: `/${l.slug}`,
        primaryKeyword: l.primaryKeyword,
        secondaryKeywords: [
          "suite spa Porto Empedocle",
          "spa privata Porto Empedocle",
          "suite con jacuzzi Porto Empedocle",
          "suite con jacuzzi in camera",
          "jacuzzi privata in camera",
          "sauna privata",
          "hotel con spa Porto Empedocle",
          "prenotazione diretta WhatsApp",
        ],
        intent: "locale" as const,
        primaryCta: "WhatsApp" as const,
      };
    }

    if (l.slug === "suite-romantica-agrigento") {
      return {
        url: `/${l.slug}`,
        primaryKeyword: l.primaryKeyword,
        secondaryKeywords: [
          "suite romantica Agrigento",
          "dove alloggiare Agrigento coppia",
          "suite con jacuzzi Agrigento",
          "suite spa Agrigento",
          "weekend romantico Agrigento",
          "spa privata Agrigento",
          "Valle dei Templi",
          "prenotazione diretta WhatsApp",
        ],
        intent: "locale" as const,
        primaryCta: "WhatsApp" as const,
      };
    }

    if (l.slug === "spa-privata-sicilia") {
      return {
        url: `/${l.slug}`,
        primaryKeyword: l.primaryKeyword,
        secondaryKeywords: [
          "spa privata Sicilia",
          "suite spa Sicilia",
          "jacuzzi privata Sicilia",
          "suite con jacuzzi in camera",
          "suite romantica Sicilia",
          "weekend romantico Sicilia",
          "fuga romantica Sicilia",
          "suite di lusso Sicilia",
          "prenotazione diretta WhatsApp",
        ],
        intent: "locale" as const,
        primaryCta: "WhatsApp" as const,
      };
    }

    return {
      url: `/${l.slug}`,
      primaryKeyword: l.primaryKeyword,
      secondaryKeywords: defaultSecondary,
      intent: "locale" as const,
      primaryCta: "WhatsApp" as const,
    };
  }),
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
