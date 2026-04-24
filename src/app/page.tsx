import { TopNav } from "@/components/nav/top-nav";
import { HeroSection } from "@/components/hero/hero-section";
import { DirectBookingSection } from "@/components/sections/direct-booking";
import { IntroSection } from "@/components/sections/intro";
import { ExperienceSection } from "@/components/sections/experience";
import { SuitesSection } from "@/components/sections/suites";
import { JacuzziSection } from "@/components/sections/jacuzzi";
import { SaunaSection } from "@/components/sections/sauna";
import { GallerySection } from "@/components/sections/gallery";
import { ReviewsSection } from "@/components/sections/reviews";
import { FaqSection } from "@/components/sections/faq";
import { NightSection } from "@/components/sections/night";
import { LocationSection } from "@/components/sections/location";
import { FinalCtaSection } from "@/components/sections/final-cta";
import { FooterSection } from "@/components/sections/footer";
import { StickyCta } from "@/components/sticky-cta";
import { noir } from "@/lib/noir";

const homeFaqs = [
  {
    q: "La jacuzzi è privata?",
    a: "Sì. È interna alla suite ed è ad uso esclusivo: zero condivisione, zero spazi comuni.",
  },
  {
    q: "La sauna è nella suite?",
    a: "Sì, interna. Completa l’esperienza wellness senza uscire dalla tua privacy.",
  },
  {
    q: "È adatto a coppie?",
    a: "Sì. Euphoria è pensata per fughe romantiche, anniversari e notti speciali.",
  },
  {
    q: "Ci sono cucina e forno?",
    a: "Sì: cucina completa + forno, per vivere la suite con totale libertà.",
  },
  {
    q: "Wi‑Fi e condizionatori?",
    a: "Sì: Wi‑Fi e aria condizionata sono inclusi in entrambe le suite.",
  },
  {
    q: "Come prenoto più velocemente?",
    a: "WhatsApp: ti confermiamo disponibilità e dettagli in modo rapido e diretto.",
  },
  {
    q: "Smart check-in e smart check-out?",
    a: "Sì: accesso tramite tastierino. Arrivi e parti completamente da soli, senza attese.",
  },
  {
    q: "Posso organizzare una sorpresa (anniversario/proposta)?",
    a: "Sì: scrivici su WhatsApp e prepariamo l’esperienza in base alla tua occasione.",
  },
] as const;

function jsonLdOrganization() {
  const logoUrl = `${noir.siteUrl}/android-chrome-512x512.png`;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${noir.siteUrl}#org`,
    name: `${noir.name} Luxury Suite`,
    url: noir.siteUrl,
    logo: { "@type": "ImageObject", url: logoUrl },
    email: noir.contacts.email,
    telephone: noir.contacts.phone,
  };
}

function jsonLdFaqPage(args: { pageUrl: string; faqs: Array<{ q: string; a: string }> }) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${args.pageUrl}#faq`,
    mainEntity: args.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function jsonLdHome() {
  return [
    jsonLdOrganization(),
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${noir.name} Luxury Suite`,
      url: noir.siteUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "@id": `${noir.siteUrl}#business`,
      name: `${noir.name} Luxury Suite`,
      url: noir.siteUrl,
      priceRange: `€${noir.startingFrom}+`,
      telephone: noir.contacts.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: noir.location,
        addressRegion: "Sicilia",
        addressCountry: "IT",
      },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Jacuzzi privata", value: true },
        { "@type": "LocationFeatureSpecification", name: "Sauna interna", value: true },
        { "@type": "LocationFeatureSpecification", name: "Cucina completa con forno", value: true },
        { "@type": "LocationFeatureSpecification", name: "Wi‑Fi", value: true },
        { "@type": "LocationFeatureSpecification", name: "Aria condizionata", value: true },
      ],
      isPartOf: { "@id": `${noir.siteUrl}#org` },
    },
    jsonLdFaqPage({ pageUrl: noir.siteUrl, faqs: [...homeFaqs] }),
  ];
}

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col">
      <TopNav />
      <main className="relative flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHome()) }}
        />
        <HeroSection />
        <DirectBookingSection />
        <SuitesSection />
        <IntroSection />
        <ExperienceSection />
        <JacuzziSection />
        <SaunaSection />
        <GallerySection />
        <ReviewsSection />
        <FaqSection />
        <NightSection />
        <LocationSection />
        <FinalCtaSection />
        <FooterSection />
      </main>
      <StickyCta />
    </div>
  );
}
