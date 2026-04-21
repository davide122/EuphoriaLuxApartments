import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopNav } from "@/components/nav/top-nav";
import { FooterSection } from "@/components/sections/footer";
import { Reveal } from "@/components/motion/reveal";
import { MediaFrame } from "@/components/ui/media-frame";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { NoirLink } from "@/components/ui/noir-link";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/ui/breadcrumbs";
import { noir, suites } from "@/lib/noir";

const BY_SLUG: Record<string, (typeof suites)[number]> = Object.fromEntries(
  suites.map((s) => [s.slug, s])
);

export const dynamicParams = false;

export function generateStaticParams() {
  return suites.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const suite = BY_SLUG[slug];
  if (!suite) return { robots: { index: false, follow: false } };

  const title = `${suite.name} — Suite con jacuzzi privata e sauna | ${noir.name}`;
  const description = `${suite.name}: ${suite.tagline} Jacuzzi privata, sauna interna, cucina completa con forno, Wi‑Fi e condizionatori. Da €${noir.startingFrom}/notte. Prenota via WhatsApp.`;

  return {
    title,
    description,
    alternates: { canonical: `/suites/${suite.slug}` },
    openGraph: {
      type: "website",
      url: `/suites/${suite.slug}`,
      siteName: noir.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function jsonLdForSuite(args: { url: string; imageUrl: string; suiteName: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: `${noir.name} — ${args.suiteName}`,
    url: args.url,
    image: [args.imageUrl],
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
  };
}

const FRAMES: Record<
  string,
  Array<{ label: string; tone: "spa" | "sauna" | "night" | "noir"; src: string }>
> = {
  passion: [
    { label: "Letto, jacuzzi, sauna", tone: "spa", src: "/passion-letto-jacuzzi-sauna.jpg" },
    { label: "Jacuzzi", tone: "spa", src: "/passion-jacuzzi.jpg" },
    { label: "Morning light", tone: "night", src: "/passion-morning-2.jpg" },
  ],
  infinity: [
    { label: "Letto", tone: "night", src: "/infinity-letto.jpg" },
    { label: "Cucina completa", tone: "noir", src: "/infinity-cucina.jpg" },
    { label: "Jac + doccia a vista", tone: "spa", src: "/infinity-jacuzzi-doccia-vista.jpg" },
  ],
};

export default async function SuiteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const suite = BY_SLUG[slug];
  if (!suite) notFound();
  const pageUrl = `${noir.siteUrl}/suites/${suite.slug}`;
  const imageUrl = `${noir.siteUrl}${suite.cover}`;
  const crumbs = [
    { href: "/", label: "Home" },
    { href: "/suites", label: "Suites" },
    { href: `/suites/${suite.slug}`, label: suite.name },
  ];
  const whatsappHref =
    noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      `Ciao, vorrei verificare disponibilità per ${suite.name}. Date: __/__/__ → __/__/__. Siamo in __. Grazie.`
    )}`;

  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <TopNav />
      <main className="relative flex-1 pt-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              jsonLdForSuite({ url: pageUrl, imageUrl, suiteName: suite.name }),
              breadcrumbJsonLd({ baseUrl: noir.siteUrl, items: crumbs }),
            ]),
          }}
        />
        <section data-ambient="noir" className="relative z-10 py-16 sm:py-20">
          <div className="noir-container">
            <Breadcrumbs items={crumbs} />
            <Reveal>
              <div className="noir-panel noir-glow p-9 sm:p-12">
                <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                  Suite
                </div>
                <div className="noir-h1 mt-5 text-5xl leading-[0.98] text-noir-mist sm:text-6xl">
                  {suite.name}
                </div>
                <p className="mt-6 max-w-2xl text-base leading-7 text-noir-muted">
                  {suite.tagline}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    `Da €${noir.startingFrom}/notte`,
                    "Jacuzzi privata",
                    "Sauna interna",
                    noir.smartAccess,
                  ].map((k) => (
                    <span key={k} className="noir-chip text-noir-mist/80">
                      {k}
                    </span>
                  ))}
                </div>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
                    Verifica disponibilità su WhatsApp
                  </NoirAnchor>
                  <NoirLink href={`/prenota?suite=${slug}`} variant="ghost">
                    Guarda il calendario
                  </NoirLink>
                  <NoirLink href="/suites" variant="ghost">
                    Torna alle suites
                  </NoirLink>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal delay={0.05}>
                  <MediaFrame
                    label="Atmosfera — luci & materiali"
                    tone={slug === "passion" ? "spa" : "night"}
                    src={suite.cover}
                    alt={suite.name}
                    className="aspect-[16/10]"
                    priority
                  />
                </Reveal>
              </div>
              <div className="lg:col-span-5">
                <Reveal delay={0.10}>
                  <div className="noir-panel p-8 sm:p-9">
                    <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                      Highlights
                    </div>
                    <div className="mt-6 grid gap-2">
                      {suite.highlights.map((h) => (
                        <div
                          key={h}
                          className="flex items-start gap-3 text-sm leading-6 text-noir-mist/80"
                        >
                          <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/45" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(FRAMES[slug] ?? []).map((f, idx) => (
                <Reveal key={f.label} delay={0.06 + idx * 0.04}>
                  <MediaFrame
                    label={f.label}
                    tone={f.tone}
                    src={f.src}
                    className="aspect-[4/5]"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
