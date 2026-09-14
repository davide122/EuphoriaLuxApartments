import type { Metadata } from "next";
import { TopNav } from "@/components/nav/top-nav";
import { FooterSection } from "@/components/sections/footer";
import { SuitesSection } from "@/components/sections/suites";
import { noir, suites } from "@/lib/noir";
import { openGraphImage, socialImages } from "@/lib/social";

function jsonLdSuitesIndex() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${noir.siteUrl}/suites#collection`,
    name: `Suites — ${noir.name}`,
    url: `${noir.siteUrl}/suites`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: suites.map((s, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${noir.siteUrl}/suites/${s.slug}`,
        name: s.name,
      })),
    },
  };
}

export const metadata: Metadata = {
  title: `Suites con jacuzzi e sauna a Porto Empedocle | ${noir.name}`,
  description:
    "Passion è raccolta e tiene tutto vicino. Infinity offre più spazio tra zona notte, living e cucina. Entrambe hanno jacuzzi e sauna private.",
  alternates: { canonical: "/suites" },
  openGraph: {
    type: "website",
    url: "/suites",
    siteName: noir.name,
    locale: "it_IT",
    title: `Suites con jacuzzi e sauna a Porto Empedocle | ${noir.name}`,
    description:
      "Passion: 55 m², un unico ambiente. Infinity: 77 m², più spazio da vivere. Jacuzzi e sauna private in entrambe.",
    images: [openGraphImage(socialImages.home, `Passion e Infinity — ${noir.name}`)],
  },
  twitter: {
    card: "summary_large_image",
    title: `Suites con jacuzzi e sauna a Porto Empedocle | ${noir.name}`,
    description:
      "Passion o Infinity: due modi diversi di stare insieme, con jacuzzi e sauna private.",
    images: [socialImages.home],
  },
};

export default function SuitesPage() {
  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <TopNav />
      <main className="relative flex-1 pt-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSuitesIndex()) }}
        />
        <SuitesSection />
      </main>
      <FooterSection />
    </div>
  );
}
