"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const FAQ = [
  {
    q: "Quanto dura un voucher?",
    a: "12 mesi dalla data di acquisto. Entro quella finestra si prenota via WhatsApp con il codice del voucher — date a scelta, in base alla disponibilità.",
  },
  {
    q: "Posso cambiare importo dopo averlo comprato?",
    a: "Certo. Se dopo l'acquisto vuoi aggiungere un pacchetto romantico o salire di taglia, la differenza la saldi su WhatsApp, senza pratiche.",
  },
  {
    q: "Come lo riceve la persona a cui lo regalo?",
    a: "Puoi scegliere: (1) PDF via email a te, che poi stampi o inoltri; (2) PDF direttamente alla casella della persona che lo riceve. In ogni caso dedica e nome sono già stampati.",
  },
  {
    q: "È riservato solo a coppie?",
    a: "Assolutamente no. Il voucher vale per due persone — possono essere mamma e figlia, due amiche, sposa e testimone, o anche una persona sola che vuole 3 ore di reset totale.",
  },
  {
    q: "Posso regalarlo a una persona sola?",
    a: "Sì. Small e Medium coprono perfettamente un day-use o una notte in solitaria: telefono silenzioso, jacuzzi, sauna, Netflix, niente obblighi.",
  },
  {
    q: "Che metodi di pagamento accettate?",
    a: "Carta via Stripe (link che ti mandiamo su WhatsApp), bonifico bancario o Satispay. Fattura elettronica disponibile su richiesta.",
  },
  {
    q: "Valido anche il giorno dopo averlo comprato?",
    a: "Se c'è disponibilità in calendario, sì. Di solito consigliamo 48h di anticipo per poter allestire la suite con la dedica stampata.",
  },
  {
    q: "Si può annullare o rimborsare?",
    a: "Il voucher non è rimborsabile ma è nominativo e modificabile: puoi cambiare nome, data o dettagli in qualsiasi momento, sempre via WhatsApp.",
  },
] as const;

export function VoucherFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <div className="mb-3 text-xs uppercase tracking-[0.2em] text-purple-200/70">Domande veloci</div>
        <h3 className="noir-display text-2xl font-semibold text-white sm:text-3xl">
          Prima di regalare Euphoria, quello che si chiedono tutti.
        </h3>
      </div>
      <div className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
        {FAQ.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-sm text-white transition hover:bg-white/[0.015]"
              >
                <span className="flex-1 font-medium">{f.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="text-zinc-500"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={`a-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pr-14 text-sm leading-relaxed text-zinc-400">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
