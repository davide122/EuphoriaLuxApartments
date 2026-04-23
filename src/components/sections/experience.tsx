import {
  Droplets,
  Flame,
  Gem,
  Heart,
  MoonStar,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { experiencePillars, noir } from "@/lib/noir";
import { NoirAnchor } from "@/components/ui/noir-anchor";

const ICONS = [Droplets, Flame, Sparkles, Heart, Gem, MoonStar] as const;

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
            eyebrow="The Experience"
            title={
              <>
                Sei dentro Euphoria.
                <br />
                Tutto il resto si spegne.
              </>
            }
            description={
              <>
                Una suite da vivere, non da raccontare. Jacuzzi privata e sauna interna,
                luci immersive e comfort completo (cucina con forno, Wi‑Fi, condizionatori).
                Smart check-in e smart check-out completamente da soli (tastierino).
              </>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {experiencePillars.map((p, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <Reveal key={p.title} delay={0.04 + idx * 0.03}>
                <div className="noir-panel group relative overflow-hidden p-7 transition hover:-translate-y-0.5 hover:border-white/20">
                  <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(700px_circle_at_20%_10%,rgba(var(--ambient-c)/0.16),transparent_58%),radial-gradient(700px_circle_at_80%_30%,rgba(var(--ambient-a)/0.14),transparent_62%)]" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5 text-noir-mist/85" />
                      </div>
                      <div className="h-1.5 w-1.5 rounded-full bg-white/45 transition group-hover:bg-white/70" />
                    </div>
                    <div className="mt-5 text-lg font-medium tracking-tight text-noir-mist">
                      {p.title}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-noir-muted">
                      {p.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.18}>
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
