import { Reveal } from "@/components/motion/reveal";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { SectionHeader } from "@/components/ui/section-header";
import { noir } from "@/lib/noir";

type Faq = { q: string; a: string };

type FaqSectionProps = {
  faqs?: ReadonlyArray<Faq>;
};

const defaultFaqs: Faq[] = [
  {
    q: "Jacuzzi e sauna sono davvero private?",
    a: "Sì. Sono dentro la suite e restano a vostro uso esclusivo per tutto il soggiorno.",
  },
  {
    q: "Che differenza c’è tra Passion e Infinity?",
    a: "Passion è un ambiente unico da 55 m². Infinity misura 77 m² e offre più spazio tra zona notte, living e cucina.",
  },
  {
    q: "Come funziona l’ingresso?",
    a: "Ricevete un codice per il tastierino. Entrate e uscite senza passare dalla reception.",
  },
  {
    q: "Posso organizzare anniversari o sorprese?",
    a: "Sì. Il pacchetto romantico essenziale parte da €10 e include petali di rosa, atmosfera calda, luci accese e suite climatizzata al vostro arrivo. Per altre preparazioni, scriveteci direttamente.",
  },
];

export function FaqSection(props: FaqSectionProps) {
  const faqs = (props.faqs ?? defaultFaqs).slice();
  const whatsappHref =
    noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      "Ciao, ho una domanda veloce prima di prenotare. Grazie."
    )}`;

  return (
    <section id="faq" data-ambient="noir" className="relative z-10 py-16 sm:py-24">
      <div className="noir-container">
        <Reveal>
          <SectionHeader
            eyebrow="Prima di arrivare"
            title="Le cose utili, senza giri di parole."
            description="Se manca qualcosa, scriveteci. Vi risponde una persona, non un messaggio automatico."
          />
        </Reveal>

        <div className="mt-10 grid gap-3">
          {faqs.map((f, idx) => (
            <Reveal key={f.q} delay={0.04 + idx * 0.02}>
              <details className="group border-b border-fuchsia-100/12 px-1 py-6 transition hover:border-fuchsia-200/30">
                <summary className="flex min-h-11 cursor-pointer list-none items-center text-sm font-medium text-noir-mist/85 [&::-webkit-details-marker]:hidden">
                  <div className="flex w-full items-center justify-between gap-6">
                    <span>{f.q}</span>
                    <span className="text-2xl font-light text-noir-fuchsia transition duration-300 group-open:rotate-45">+</span>
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
              Chiedici quello che vuoi
            </NoirAnchor>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
