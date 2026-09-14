import { Car, MapPin, Waves } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { SectionHeader } from "@/components/ui/section-header";
import { noir } from "@/lib/noir";

const PILLS = [
  {
    title: "Dove siamo",
    value: `${noir.location}, Sicilia`,
    icon: MapPin,
  },
  {
    title: "Vicino al mare",
    value: "A pochi minuti dalla costa",
    icon: Waves,
  },
  {
    title: "Parcheggio",
    value: "Facile da raggiungere in auto",
    icon: Car,
  },
];

export function LocationSection() {
  return (
    <section id="dove-siamo" data-ambient="location" className="relative z-10 py-16 sm:py-24">
      <div className="noir-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeader
                eyebrow="Porto Empedocle, Sicilia"
                title="Il mare vicino. Il mondo abbastanza lontano."
                description={
                  <>
                    Arrivate facilmente in auto. Il mare è a pochi minuti;
                    una volta entrati, però, potreste non avere voglia di uscire.
                  </>
                }
              />
            </Reveal>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {PILLS.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.title} delay={0.04 + idx * 0.02}>
                    <div className="flex items-start gap-4 border-l border-noir-violet/30 py-3 pl-5">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                        <Icon className="h-4 w-4 text-noir-aqua" />
                      </span>
                      <div>
                        <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                          {p.title}
                        </div>
                        <div className="mt-2 text-sm text-noir-mist/80">{p.value}</div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.12}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <NoirAnchor
                  href={
                    noir.contacts.whatsapp +
                    `?text=${encodeURIComponent(
                      "Ciao, vorrei la posizione esatta e informazioni su parcheggio e arrivo. Grazie."
                    )}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                >
                  Mandami la posizione
                </NoirAnchor>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.06}>
              <div className="noir-glow overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/infinity/WhatsApp%20Image%202026-08-16%20at%2021.29.15.jpeg"
                    alt="Euphoria — Porto Empedocle, vista della suite"
                    fill
                    sizes="(max-width: 1024px) 92vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-noir-mist/85 backdrop-blur">
                    <MapPin className="h-4 w-4 text-noir-aqua" />
                    {noir.location}
                  </div>
                  <div className="absolute inset-x-5 bottom-5 text-sm leading-6 text-noir-mist/90">
                    Dopo la prenotazione ricevete posizione, indicazioni e codice d’ingresso direttamente su WhatsApp.
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
