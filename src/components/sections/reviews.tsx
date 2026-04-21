import { Star } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { SectionHeader } from "@/components/ui/section-header";
import { noir } from "@/lib/noir";

export function ReviewsSection() {
  const whatsappHref =
    noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      "Ciao, vorrei verificare disponibilità. Date: __/__/__ → __/__/__. Siamo in __. Grazie."
    )}`;

  return (
    <section id="recensioni" data-ambient="noir" className="relative z-10 py-20 sm:py-28">
      <div className="noir-container">
        <Reveal>
          <SectionHeader
            eyebrow="Fiducia"
            title="Chi sceglie Euphoria non cerca una stanza. Cerca un ricordo."
            description={
              <>
                Privacy, atmosfera e benessere privato: è per questo che le coppie ci scelgono
                per anniversari, sorprese e fughe romantiche.
              </>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              who: "Coppia · Anniversario",
              quote:
                "Atmosfera incredibile. Jacuzzi privata e sauna perfette per il nostro anniversario.",
            },
            {
              who: "Coppia · Weekend romantico",
              quote:
                "Pulizia impeccabile e privacy totale. Prenotazione diretta facile e risposta velocissima.",
            },
            {
              who: "Coppia · Surprise night",
              quote:
                "Infinity è scenografica, Passion è super intima. Esperienza davvero fuori dall’ordinario.",
            },
          ].map((r, idx) => (
            <Reveal key={r.who} delay={0.04 + idx * 0.03}>
              <div className="noir-panel p-7">
                <div className="flex items-center gap-1 text-noir-aqua">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="mt-4 text-sm text-noir-mist/75">{r.who}</div>
                <div className="mt-3 text-sm leading-6 text-noir-mist/80">“{r.quote}”</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.14}>
          <div className="mt-10">
            <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
              Verifica disponibilità su WhatsApp
            </NoirAnchor>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

