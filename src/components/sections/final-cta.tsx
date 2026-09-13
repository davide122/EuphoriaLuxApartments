import { ArrowUpRight, Check, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { noir } from "@/lib/noir";

export function FinalCtaSection() {
  const whatsappHref =
    noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      "Ciao, vorrei verificare disponibilità per Passion o Infinity. Date: __/__/__ → __/__/__. Grazie."
    )}`;

  return (
    <section
      id="prenota"
      data-ambient="noir"
      className="relative z-10 overflow-hidden pb-20 pt-24 sm:pb-28 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="euphoria-stars absolute inset-0 opacity-[0.14]" />
        <div className="absolute inset-x-0 bottom-0 h-[80%] bg-[radial-gradient(ellipse_at_72%_70%,rgba(var(--ambient-c)/0.18),transparent_48%),radial-gradient(ellipse_at_18%_88%,rgba(var(--ambient-a)/0.16),transparent_48%)] blur-2xl" />
      </div>

      <div className="noir-container relative">
        <Reveal>
          <div className="relative overflow-hidden border-y border-fuchsia-100/15">
            <div className="absolute -right-8 -top-24 select-none font-display text-[15rem] leading-none text-white/[0.025] sm:text-[22rem]" aria-hidden="true">
              E
            </div>

            <div className="grid lg:grid-cols-12">
              <div className="relative py-12 sm:py-16 lg:col-span-8 lg:pr-16">
                <div className="euphoria-kicker">Prenotazione diretta</div>
                <h2 className="noir-h1 mt-6 max-w-3xl text-4xl leading-[0.98] text-noir-mist sm:text-5xl md:text-6xl lg:text-7xl">
                  La vostra notte può iniziare da qui.
                </h2>
                <p className="mt-7 max-w-xl text-base leading-7 text-noir-muted sm:text-lg sm:leading-8">
                  Inviateci le date e la suite che preferite. Vi rispondiamo
                  direttamente con disponibilità, prezzo e tutto ciò che serve.
                </p>

                <ul className="mt-9 grid gap-4 text-sm text-noir-mist/80 sm:grid-cols-3" aria-label="Vantaggi inclusi">
                  {["Jacuzzi e sauna private", noir.smartAccess, "Aperitivo incluso"].map(
                    (benefit) => (
                      <li key={benefit} className="flex items-start gap-3 border-l border-noir-fuchsia/30 pl-4">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-noir-champagne" />
                        <span className="leading-6">{benefit}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div
                id="contatti"
                className="relative border-t border-white/10 py-10 sm:py-12 lg:col-span-4 lg:border-l lg:border-t-0 lg:py-16 lg:pl-12"
              >
                <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-noir-mist/55">
                  Una notte, da
                </div>
                <div className="mt-3 flex items-end gap-2">
                  <span className="noir-h1 text-6xl leading-none text-noir-mist sm:text-7xl">
                    €{noir.startingFrom}
                  </span>
                  <span className="pb-1 text-sm text-noir-mist/55">/ notte</span>
                </div>
                <p className="mt-5 max-w-sm text-sm leading-6 text-noir-muted">
                  Nessun modulo complicato: bastano due date per cominciare.
                </p>

                <div className="mt-8 flex flex-col gap-3">
                  <NoirAnchor
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    variant="primary"
                    className="group w-full justify-between"
                  >
                    Verifica le date
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </NoirAnchor>
                  <NoirAnchor
                    href={`tel:${noir.contacts.phone.replaceAll(" ", "")}`}
                    variant="ghost"
                    className="group w-full justify-between"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Phone className="h-4 w-4 text-noir-mist/70" />
                      Chiama direttamente
                    </span>
                    <span className="text-xs text-noir-mist/45">{noir.contacts.phone}</span>
                  </NoirAnchor>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs text-noir-mist/50">
                  <MessageCircle className="h-3.5 w-3.5 text-noir-aqua" />
                  Risposta diretta su WhatsApp
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
