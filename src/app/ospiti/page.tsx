import type { Metadata } from "next";
import { TopNav } from "@/components/nav/top-nav";
import { FooterSection } from "@/components/sections/footer";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { NoirLink } from "@/components/ui/noir-link";
import { MediaFrame } from "@/components/ui/media-frame";
import { noir } from "@/lib/noir";

export const metadata: Metadata = {
  title: `Guida Ospiti | ${noir.name}`,
  description:
    "Hub guida ospiti: scegli suite e formula del soggiorno per aprire la guida pratica con accesso, jacuzzi, sauna e istruzioni utili.",
  alternates: { canonical: "/ospiti" },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: "/ospiti",
    siteName: noir.name,
    locale: "it_IT",
    title: `Guida Ospite | ${noir.name}`,
    description: "Guida pratica per ospiti: accesso, tastierino, jacuzzi, sauna e istruzioni per il soggiorno.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `Guida Ospite — ${noir.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Guida Ospite | ${noir.name}`,
    description: "Guida pratica per ospiti: accesso, tastierino, jacuzzi, sauna e istruzioni per il soggiorno.",
    images: ["/opengraph-image"],
  },
};

const GUIDE_LINKS = [
  {
    title: "Passion · Pernottamento",
    href: "/ospiti/passion/pernottamento",
    image: "/passion-letto-jacuzzi-sauna.jpg",
    tone: "spa" as const,
    body: "Guida completa per chi dorme in Passion: accesso, dispositivi, tempi e uscita.",
  },
  {
    title: "Passion · Day Use",
    href: "/ospiti/passion/dayuse",
    image: "/passion-jacuzzi.jpg",
    tone: "spa" as const,
    body: "Versione rapida e chiara per accessi a ore nella suite Passion.",
  },
  {
    title: "Infinity · Pernottamento",
    href: "/ospiti/infinity/pernottamento",
    image: "/infinity-letto.jpg",
    tone: "night" as const,
    body: "Guida completa per soggiorno in Infinity: arrivo, accesso e uso della suite.",
  },
  {
    title: "Infinity · Day Use",
    href: "/ospiti/infinity/dayuse",
    image: "/infinity-jacuzzi-doccia-vista.jpg",
    tone: "night" as const,
    body: "Guida day use Infinity con accesso, jacuzzi, sauna e istruzioni essenziali.",
  },
] as const;

export default function OspitiPage() {
  const mapsQuery = encodeURIComponent(`${noir.name} Luxury Suite ${noir.location}`);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <TopNav />
      <main className="relative flex-1 pt-28">
        <section data-ambient="noir" className="relative z-10 py-16 sm:py-20">
          <div className="noir-container">
            <Reveal>
              <div className="noir-panel noir-glow overflow-hidden p-9 sm:p-12">
                <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-6">
                    <SectionHeader
                      eyebrow="Guida Ospiti"
                      title="Una guida semplice da inviare al cliente."
                      description={
                        <>
                          Abbiamo ridotto tutto a quattro percorsi chiari: due suite e due formule
                          di soggiorno. Le istruzioni vere stanno nelle guide dedicate; nel link
                          cambiano solo i dettagli variabili come codice e orari.
                        </>
                      }
                    />
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                      <NoirAnchor href={mapsHref} target="_blank" rel="noreferrer" variant="primary">
                        Apri Google Maps
                      </NoirAnchor>
                      <NoirAnchor href={noir.contacts.whatsapp} target="_blank" rel="noreferrer" variant="ghost">
                        Assistenza (WhatsApp)
                      </NoirAnchor>
                    </div>
                  </div>
                  <div className="lg:col-span-6">
                    <MediaFrame
                      label="Guida ospiti — Euphoria"
                      tone="night"
                      src="/infinity-letto.jpg"
                      alt="Guida ospiti Euphoria"
                      className="aspect-[16/10]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {GUIDE_LINKS.map((guide, idx) => (
                <Reveal key={guide.href} delay={0.04 + idx * 0.05}>
                  <div className="noir-panel overflow-hidden p-5 sm:p-6">
                    <MediaFrame
                      label={guide.title}
                      tone={guide.tone}
                      src={guide.image}
                      alt={guide.title}
                      className="aspect-[16/10]"
                    />
                    <div className="mt-6">
                      <div className="text-2xl font-medium tracking-tight text-noir-mist">
                        {guide.title}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-noir-muted">{guide.body}</p>
                      <div className="mt-5">
                        <NoirLink href={guide.href} variant="primary">
                          Apri guida
                        </NoirLink>
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
