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
    <section id="recensioni" data-ambient="noir" className="relative z-10 overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_12%_70%,rgba(237,63,166,.12),transparent_65%),radial-gradient(700px_circle_at_88%_20%,rgba(139,92,246,.14),transparent_65%)]" />
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

        <div className="euphoria-snap-rail -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-7 sm:-mx-8 sm:px-8 lg:-mx-12 lg:gap-7 lg:px-12">
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
            <Reveal key={r.title} delay={0.04 + idx * 0.03} className="min-w-[82vw] snap-center sm:min-w-[54vw] lg:min-w-[34vw]">
              <article className={`relative flex min-h-[22rem] h-full flex-col overflow-hidden rounded-2xl border p-8 sm:p-10 ${idx === 1 ? "border-violet-200/25 bg-[linear-gradient(145deg,rgba(73,42,166,.42),rgba(18,8,28,.9))]" : "border-fuchsia-200/25 bg-[linear-gradient(145deg,rgba(145,36,112,.38),rgba(20,8,26,.92))]"}`}>
                <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[70px] ${idx === 1 ? "bg-[#7137ff]/45" : "bg-[#ff2aa1]/40"}`} />
                <r.icon className="relative h-7 w-7 text-white" />
                <div className="relative mt-5 text-xs font-semibold tracking-[0.22em] uppercase text-[#ffc8ea]">
                  {r.title}
                </div>
                <p className="noir-h1 relative mt-auto pt-8 text-2xl leading-snug text-white sm:text-3xl">{r.copy}</p>
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
