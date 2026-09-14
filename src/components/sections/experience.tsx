import {
  Droplets,
  Flame,
  Gem,
  Heart,
  MoonStar,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { noir } from "@/lib/noir";
import { NoirAnchor } from "@/components/ui/noir-anchor";

const ICONS = [Droplets, Flame, Sparkles, Heart, Gem, MoonStar] as const;
const VISUALS = [
  "/passion/WhatsApp Image 2026-08-16 at 21.29.22 (1).jpeg",
  "/passion/WhatsApp Image 2026-08-16 at 21.29.22.jpeg",
  "/873928200.jpg",
  "/images (1).jpeg",
  "/passion/WhatsApp Image 2026-08-16 at 21.29.23.jpeg",
  "/infinity/WhatsApp Image 2026-08-16 at 21.29.16 (4).jpeg",
] as const;

const experiencePillars = [
  {
    title: "Entrate da soli",
    description: "Il codice arriva prima. Nessuna reception, nessuna attesa, nessuno da incontrare.",
  },
  {
    title: "Scegliete la luce",
    description: "Viola, pink, più intensa o più discreta. La sera cambia con il vostro umore.",
  },
  {
    title: "Lasciate scorrere l’acqua",
    description: "La jacuzzi è già lì. È privata e potete restarci senza guardare l’ora.",
  },
  {
    title: "Scaldatevi piano",
    description: "La sauna è dentro la suite. Dalla doccia al letto, non dovete attraversare altro.",
  },
  {
    title: "Fate tardi",
    description: "Cucinate qualcosa, aprite una bottiglia, guardate un film. Non c’è un programma da seguire.",
  },
  {
    title: "Ricominciare piano",
    description: "La mattina resta vostra. Una colazione in suite e ancora qualche minuto senza fretta.",
  },
] as const;

export function ExperienceSection() {
  const whatsappHref =
    noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      "Ciao, vorrei verificare disponibilità per Passion o Infinity. Date: __/__/__ → __/__/__. Siamo in __. Grazie."
    )}`;

  return (
    <section
      id="esperienza"
      data-ambient="noir"
      className="relative z-10 py-20 sm:py-28"
    >
      <div className="noir-container">
        <Reveal>
          <SectionHeader
            eyebrow="Come si vive Euphoria"
            title={
              <>
                Qui non dovete fare niente.
                <br />
                Solo esserci.
              </>
            }
            description={
              <>
                Entrate, scegliete la luce e lasciate fuori il telefono per un po’.
                Tutto quello che serve è già nella suite.
              </>
            }
          />
        </Reveal>

        <div className="euphoria-snap-rail -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-7 sm:-mx-8 sm:px-8 lg:-mx-12 lg:mt-12 lg:gap-5 lg:px-12">
          {experiencePillars.map((p, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <Reveal
                key={p.title}
                delay={0.03 + idx * 0.02}
                className="min-w-[82vw] snap-center sm:min-w-[58vw] lg:min-w-[36vw]"
              >
                <article
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-fuchsia-100/20 bg-noir-graphite shadow-[0_28px_70px_rgba(0,0,0,.34)]"
                >
                  <Image
                    src={encodeURI(VISUALS[idx])}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 58vw, 36vw"
                    className="object-cover opacity-85 transition duration-1000 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 ${idx % 2 === 0 ? "bg-[linear-gradient(180deg,rgba(6,3,9,.08),rgba(139,92,246,.12)_40%,rgba(6,3,9,.97))]" : "bg-[linear-gradient(180deg,rgba(6,3,9,.08),rgba(237,63,166,.13)_40%,rgba(6,3,9,.97))]"}`} />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-9">
                    <Icon className="h-5 w-5 text-noir-champagne lg:h-6 lg:w-6" />
                    <div className={`noir-h1 mt-3 text-noir-mist ${idx === 0 ? "text-2xl" : "text-xl"} lg:mt-5 lg:text-3xl`}>
                      {p.title}
                    </div>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-white/85 lg:mt-3">
                      {p.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-noir-mist/65">
          Trascina per esplorare
        </div>

        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
              Verifica le tue date
            </NoirAnchor>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
