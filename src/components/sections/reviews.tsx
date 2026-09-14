import { DoorClosed, Heart, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { SectionHeader } from "@/components/ui/section-header";
import { noir } from "@/lib/noir";

export function ReviewsSection() {
  const whatsappHref =
    noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      "Ciao, vorrei verificare disponibilità. Date: __/__/__ → __/__/__. Grazie."
    )}`;

  return (
    <section id="recensioni" data-ambient="noir" className="relative z-10 py-16 sm:py-24">
      <div className="noir-container">
        <Reveal>
          <SectionHeader
            eyebrow="Perché Euphoria"
            title="Il lusso, qui, è non avere nessuno intorno."
            description={
              <>
                Non attraversate corridoi in accappatoio. Non prenotate un turno in spa.
                Non aspettate qualcuno per entrare. La suite è vostra.
              </>
            }
          />
        </Reveal>

        <div className="mt-10 grid gap-8 lg:-mx-12 lg:flex lg:snap-x lg:snap-mandatory lg:gap-10 lg:overflow-x-auto lg:px-12 lg:pb-5">
          {[
            {
              title: "Privacy, davvero",
              copy: "Jacuzzi, sauna, letto e cucina sono dentro la vostra suite. Non condividete nessuno spazio.",
              icon: Heart,
            },
            {
              title: "Entrate da soli",
              copy: "Il codice arriva sul telefono. Niente reception e nessuna attesa al vostro arrivo.",
              icon: DoorClosed,
            },
            {
              title: "La prepariamo per voi",
              copy: "Il romantico essenziale parte da €10. Per una sorpresa diversa, raccontateci direttamente cosa immaginate.",
              icon: Sparkles,
            },
          ].map((r, idx) => (
            <Reveal key={r.title} delay={0.04 + idx * 0.03} className="border-l border-noir-fuchsia/35 pl-6 lg:min-w-[36vw] lg:snap-center lg:pl-7">
              <article className="flex h-full flex-col py-5">
                <r.icon className="h-6 w-6 text-noir-champagne" />
                <div className="mt-4 text-xs tracking-[0.22em] uppercase text-noir-mist/55">
                  {r.title}
                </div>
                <p className="noir-h1 mt-5 text-2xl leading-snug text-noir-mist/85">{r.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.14}>
          <div className="mt-10">
            <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
              Chiedi le tue date
            </NoirAnchor>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
