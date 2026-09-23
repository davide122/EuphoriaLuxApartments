import { TopNav } from "@/components/nav/top-nav";
import { HeroSection } from "@/components/hero/hero-section";
import { ExperienceSection } from "@/components/sections/experience";
import { CinematicScrollSection } from "@/components/sections/cinematic-scroll";
import { AmbientOrchestrator } from "@/components/ambient/ambient-orchestrator";
import { SuitesSection } from "@/components/sections/suites";
import { RomanticPackagesSection } from "@/components/sections/romantic-packages";
import { GallerySection } from "@/components/sections/gallery";
import { ImagineSection } from "@/components/sections/imagine-section";
import { FaqSection } from "@/components/sections/faq";
import { LocationSection } from "@/components/sections/location";
import { FinalCtaSection } from "@/components/sections/final-cta";
import { FooterSection } from "@/components/sections/footer";
import { StickyCta } from "@/components/sticky-cta";
import { OccasionsSection } from "@/components/sections/occasions";
import { VoucherSection } from "@/components/sections/voucher";
import { InstagramSection } from "@/components/sections/instagram";
import { OCCASIONS } from "@/lib/occasions";
import { noir } from "@/lib/noir";

const homeFaqs = [
  {
    q: "Jacuzzi e sauna sono davvero private?",
    a: "Sì. Sono dentro la suite e restano a vostro uso esclusivo per tutto il soggiorno.",
  },
  {
    q: "Che differenza c’è tra Passion e Infinity?",
    a: "Passion è un ambiente unico da 55 m², con tutto vicino. Infinity misura 77 m² e offre più spazio tra zona notte, living e cucina. Jacuzzi e sauna sono presenti in entrambe.",
  },
  {
    q: "Posso fare colazione in suite?",
    a: "Sì. Potete fare colazione restando nella vostra suite.",
  },
  {
    q: "Ci sono cucina e forno?",
    a: "Sì. Entrambe hanno una cucina completa con forno.",
  },
  {
    q: "Come funziona l’ingresso?",
    a: "Ricevete un codice per il tastierino. Entrate e uscite senza passare dalla reception.",
  },
  {
    q: "Posso organizzare anniversari o sorprese?",
    a: "Sì. Il pacchetto romantico essenziale parte da €10 e include petali di rosa, atmosfera calda, luci accese e suite climatizzata al vostro arrivo. Per richieste personalizzate, scriveteci direttamente.",
  },
  {
    q: "Quanto costa e come prenoto?",
    a: "Le suite partono da €150 a notte e includono un aperitivo di benvenuto con tagliere di salumi e una bottiglia di prosecco. Scriveteci su WhatsApp con le date: vi mandiamo disponibilità e prezzo.",
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
        { "@type": "LocationFeatureSpecification", name: "Check-in con tastierino", value: true },
        { "@type": "LocationFeatureSpecification", name: "Aperitivo di benvenuto incluso", value: true },
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
        <AmbientOrchestrator />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHome()) }}
        />
        <HeroSection />
        <OccasionsSection moments={OCCASIONS.map(({ slug, label, line, detail, hero }) => ({ slug, label, line, detail, image: hero.image }))} />
        <ExperienceSection />
        <CinematicScrollSection />
        <SuitesSection />
        <RomanticPackagesSection />
        <VoucherSection />
        <InstagramSection />
        <GallerySection />
        <ImagineSection />
        <FaqSection faqs={homeFaqs} />
        <LocationSection />
        <FinalCtaSection />
        <FooterSection />
      </main>
      <StickyCta />
    </div>
  );
}
