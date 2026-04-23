import { MessageCircle, Phone, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { noir } from "@/lib/noir";

export function FinalCtaSection() {
  return (
    <section
      id="prenota"
      data-ambient="noir"
      className="relative z-10 overflow-hidden py-24 sm:py-32"
    >
      <div className="absolute inset-0 opacity-90">
        <div className="absolute -inset-24 bg-[radial-gradient(900px_circle_at_20%_18%,rgba(var(--ambient-c)/0.22),transparent_60%),radial-gradient(900px_circle_at_76%_22%,rgba(var(--ambient-a)/0.20),transparent_60%),radial-gradient(1200px_circle_at_50%_120%,rgba(var(--ambient-b)/0.14),transparent_62%)] blur-2xl" />
      </div>

      <div className="noir-container relative">
        <Reveal>
          <div className="noir-panel noir-glow p-10 sm:p-12">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                  <Sparkles className="h-4 w-4 text-noir-aqua" />
                  Prenotazioni
                </div>
                <div className="noir-h1 mt-5 text-4xl leading-[1.02] text-noir-mist sm:text-5xl md:text-6xl">
                  Se vuoi una suite normale,
                  <br />
                  non è questa.
                </div>
                <p className="mt-6 max-w-xl text-base leading-7 text-noir-muted">
                  Se vuoi una notte privata con jacuzzi, sauna e atmosfera notturna da ricordare,
                  fai la cosa più semplice: scrivici ora. Risposta rapida, prenotazione diretta.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {[
                    `Da €${noir.startingFrom}/notte`,
                    noir.smartAccess,
                    "Zero spazi condivisi",
                  ].map((k) => (
                    <span key={k} className="noir-chip text-noir-mist/80">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <NoirAnchor
                  href={
                    noir.contacts.whatsapp +
                    `?text=${encodeURIComponent(
                      "Ciao, vorrei verificare disponibilità. Suite: Passion o Infinity. Date: __/__/__ → __/__/__. Siamo in __. Grazie."
                    )}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                  className="group"
                >
                  Apri WhatsApp e chiedi disponibilità
                  <MessageCircle className="h-4 w-4 text-noir-aqua transition group-hover:translate-x-0.5" />
                </NoirAnchor>
                <NoirAnchor
                  href={`tel:${noir.contacts.phone.replaceAll(" ", "")}`}
                  variant="ghost"
                  className="group"
                >
                  Chiama ora
                  <span className="h-1.5 w-1.5 rounded-full bg-white/50 transition group-hover:scale-125" />
                </NoirAnchor>
              </div>
            </div>

            <div
              id="contatti"
              className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
                <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                  Telefono
                </div>
                <a
                  href={`tel:${noir.contacts.phone.replaceAll(" ", "")}`}
                  className="mt-3 inline-flex items-center gap-2 text-sm text-noir-mist/80"
                >
                  <Phone className="h-4 w-4 text-noir-aqua" />
                  {noir.contacts.phone}
                </a>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
                <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                  Email
                </div>
                <a
                  href={`mailto:${noir.contacts.email}`}
                  className="mt-3 inline-flex items-center gap-2 text-sm text-noir-mist/80"
                >
                  {noir.contacts.email}
                </a>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
                <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                  Località
                </div>
                <div className="mt-3 text-sm text-noir-mist/80">
                  {noir.location}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
