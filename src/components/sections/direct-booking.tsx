import { Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { NoirLink } from "@/components/ui/noir-link";
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
            title="Prenota diretto. Più semplice. Più veloce. Più Euphoria."
            description={
              <>
                WhatsApp è il modo più rapido: ti diciamo disponibilità e miglior opzione tra
                Passion e Infinity. Da €{noir.startingFrom}/notte. {noir.smartAccess}.
              </>
            }
            right={
              <div className="hidden items-center gap-2 md:inline-flex">
                <span className="noir-chip text-noir-mist/80">
                  <Sparkles className="h-4 w-4 text-noir-aqua" />
                  Risposta rapida
                </span>
              </div>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              k: "Disponibilità immediata",
              v: "Niente passaggi: scrivi e ti rispondiamo rapidamente con le date libere.",
            },
            {
              k: "Esperienza su misura",
              v: "Anniversario, sorpresa, weekend romantico: scegliamo insieme la suite giusta.",
            },
            {
              k: "Privacy e chiarezza",
              v: "Zero spazi condivisi. Tutto è privato, dall’arrivo all’esperienza wellness.",
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
            <NoirLink href="/prenota" variant="ghost">
              Guarda il calendario
            </NoirLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

