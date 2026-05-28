import { Reveal } from "@/components/motion/reveal";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { SectionHeader } from "@/components/ui/section-header";
import { noir } from "@/lib/noir";

export function DirectBookingSection() {
  const whatsappHref =
    noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      "Ciao, vorrei verificare disponibilità per Passion o Infinity. Date: __/__/__ → __/__/__. Siamo in __. Grazie."
    )}`;

  return (
    <section data-ambient="noir" className="relative z-10 py-20 sm:py-28">
      <div className="noir-container">
        <Reveal>
          <SectionHeader
            eyebrow="Prenotazione Diretta"
            title="Prenotazione diretta su WhatsApp."
            description={
              <>
                Scrivi date e numero di persone: ti confermiamo disponibilità e ti aiutiamo a
                scegliere tra Passion e Infinity. Da €{noir.startingFrom}/notte. {noir.smartAccess}.
              </>
            }
            right={<div className="hidden items-center gap-2 md:inline-flex" />}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              k: "Risposta rapida",
              v: "Scrivi le date e ti diciamo subito cosa è libero.",
            },
            {
              k: "Scelta semplice",
              v: "Ti guidiamo tra Passion e Infinity in base a quello che cerchi.",
            },
            {
              k: "Privacy reale",
              v: "Jacuzzi e sauna sono in suite: nessun turno e nessuno spazio condiviso.",
            },
          ].map((b, idx) => (
            <Reveal key={b.k} delay={0.04 + idx * 0.03}>
              <div className="noir-panel group relative overflow-hidden p-7 transition hover:-translate-y-0.5 hover:border-white/20">
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(700px_circle_at_20%_10%,rgba(var(--ambient-c)/0.16),transparent_58%),radial-gradient(700px_circle_at_80%_30%,rgba(var(--ambient-a)/0.14),transparent_62%)]" />
                <div className="relative">
                  <div className="text-lg font-medium tracking-tight text-noir-mist">
                    {b.k}
                  </div>
                  <div className="mt-3 text-sm leading-6 text-noir-muted">{b.v}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
              Verifica disponibilità su WhatsApp
            </NoirAnchor>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
