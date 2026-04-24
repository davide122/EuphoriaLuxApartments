import type { Metadata } from "next";
import { TopNav } from "@/components/nav/top-nav";
import { FooterSection } from "@/components/sections/footer";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { NoirLink } from "@/components/ui/noir-link";
import { MediaFrame } from "@/components/ui/media-frame";
import { noir, suites } from "@/lib/noir";

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
  title: `Suites | ${noir.name}`,
  description:
    "Scopri Passion e Infinity: suites luxury a Porto Empedocle per coppie, con jacuzzi privata, sauna interna, cucina con forno, Wi‑Fi e condizionatori. Prenota via WhatsApp.",
  alternates: { canonical: "/suites" },
  openGraph: {
    type: "website",
    url: "/suites",
    siteName: noir.name,
    locale: "it_IT",
    title: `Suites | ${noir.name}`,
    description:
      "Scopri Passion e Infinity: suites luxury a Porto Empedocle per coppie, con jacuzzi privata, sauna interna, cucina con forno, Wi‑Fi e condizionatori. Prenota via WhatsApp.",
    images: [{ url: "/suites/opengraph-image", width: 1200, height: 630, alt: `Suites — ${noir.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Suites | ${noir.name}`,
    description:
      "Scopri Passion e Infinity: suites luxury a Porto Empedocle per coppie, con jacuzzi privata, sauna interna, cucina con forno, Wi‑Fi e condizionatori.",
    images: ["/suites/opengraph-image"],
  },
};

export default function SuitesPage() {
  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <TopNav />
      <main className="relative flex-1 pt-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSuitesIndex()) }}
        />
        <section data-ambient="noir" className="relative z-10 py-16 sm:py-20">
          <div className="noir-container">
            <Reveal>
              <SectionHeader
                eyebrow="Suites"
                title="Scegli la tua scena."
                description={
                  <>
                    Ogni suite è una firma. Stesso standard Euphoria, due interpretazioni
                    diverse di lusso notturno e benessere privato.
                  </>
                }
              />
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {suites.map((s, idx) => (
                <Reveal key={s.name} delay={0.05 + idx * 0.05}>
                  <div className="noir-panel overflow-hidden">
                    <div className="p-4 sm:p-5">
                      <MediaFrame
                        label={`${s.name} — preview`}
                        tone={s.slug === "passion" ? "spa" : "night"}
                        src={s.cover}
                        alt={s.name}
                        className="aspect-[16/10]"
                        priority={idx === 0}
                      />
                    </div>
                    <div className="px-9 pb-9 sm:px-10 sm:pb-10">
                      <div className="noir-h1 text-4xl leading-[1.02] text-noir-mist sm:text-5xl">
                        {s.name}
                      </div>
                      <p className="mt-5 text-sm leading-6 text-noir-muted sm:text-base">
                        {s.tagline}
                      </p>
                    <div className="mt-7 grid gap-2">
                      {s.highlights.map((h) => (
                        <div
                          key={h}
                          className="flex items-start gap-3 text-sm leading-6 text-noir-mist/80"
                        >
                          <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/45" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                      <NoirLink href={`/suites/${s.slug}`} variant="primary">
                        Dettagli suite
                      </NoirLink>
                      <NoirAnchor
                        href={
                          noir.contacts.whatsapp +
                          `?text=${encodeURIComponent(
                            `Ciao, vorrei verificare disponibilità per ${s.name}. Date: __/__/__ → __/__/__. Siamo in __. Grazie.`
                          )}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        variant="ghost"
                      >
                        Verifica disponibilità (WhatsApp)
                      </NoirAnchor>
                    </div>
                    </div>
                  </div>
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
