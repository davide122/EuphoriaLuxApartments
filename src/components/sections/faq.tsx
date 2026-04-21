import { Reveal } from "@/components/motion/reveal";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { SectionHeader } from "@/components/ui/section-header";
import { noir } from "@/lib/noir";

export function FaqSection() {
  const whatsappHref =
    noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      "Ciao, vorrei verificare disponibilità. Date: __/__/__ → __/__/__. Siamo in __. Grazie."
    )}`;

  const faqs = [
    {
      q: "La jacuzzi è privata?",
      a: "Sì. È interna alla suite ed è ad uso esclusivo: zero condivisione, zero spazi comuni.",
    },
    {
      q: "La sauna è nella suite?",
      a: "Sì, interna. Completa l’esperienza wellness senza uscire dalla tua privacy.",
    },
    {
      q: "È adatto a coppie?",
      a: "Sì. Euphoria è pensata per fughe romantiche, anniversari e notti speciali.",
    },
    {
      q: "Ci sono cucina e forno?",
      a: "Sì: cucina completa + forno, per vivere la suite con totale libertà.",
    },
    {
      q: "Wi‑Fi e condizionatori?",
      a: "Sì: Wi‑Fi e aria condizionata sono inclusi in entrambe le suite.",
    },
    {
      q: "Come prenoto più velocemente?",
      a: "WhatsApp: ti confermiamo disponibilità e dettagli in modo rapido e diretto.",
    },
    {
      q: "Smart check-in e smart check-out?",
      a: "Sì: accesso tramite tastierino. Arrivi e parti completamente da soli, senza attese.",
    },
    {
      q: "Posso organizzare una sorpresa (anniversario/proposta)?",
      a: "Sì: scrivici su WhatsApp e prepariamo l’esperienza in base alla tua occasione.",
    },
  ] as const;

  return (
    <section id="faq" data-ambient="noir" className="relative z-10 py-20 sm:py-28">
      <div className="noir-container">
        <Reveal>
          <SectionHeader
            eyebrow="FAQ"
            title="Risposte rapide. Zero dubbi. Più prenotazioni dirette."
            description="Le domande più comuni prima di scegliere Euphoria."
          />
        </Reveal>

        <div className="mt-12 grid gap-3">
          {faqs.map((f, idx) => (
            <Reveal key={f.q} delay={0.04 + idx * 0.02}>
              <details className="noir-panel group px-6 py-5">
                <summary className="cursor-pointer list-none text-sm font-medium text-noir-mist/85 [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between gap-6">
                    <span>{f.q}</span>
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/55 transition group-open:bg-white/80" />
                  </div>
                </summary>
                <div className="mt-3 text-sm leading-6 text-noir-muted">{f.a}</div>
              </details>
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
