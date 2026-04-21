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

function jsonLdHome() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${noir.name} Luxury Suite`,
      url: noir.siteUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
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
    },
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
