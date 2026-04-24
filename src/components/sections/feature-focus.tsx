import { Reveal } from "@/components/motion/reveal";
import { MediaFrame } from "@/components/ui/media-frame";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { SectionHeader } from "@/components/ui/section-header";
import { noir } from "@/lib/noir";

export function FeatureFocusSection({
  id,
  ambient,
  eyebrow,
  title,
  description,
  bullets,
  mediaLabel,
  mediaSrc,
  mediaTone,
  flip = false,
}: {
  id?: string;
  ambient: "spa" | "sauna";
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  mediaLabel: string;
  mediaSrc?: string;
  mediaTone: "spa" | "sauna" | "night" | "noir";
  flip?: boolean;
}) {
  return (
    <section
      id={id}
      data-ambient={ambient}
      className="relative z-10 py-20 sm:py-28"
    >
      <div className="noir-container">
        <div
          className={`grid gap-10 lg:grid-cols-12 lg:items-center ${
            flip ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeader
                eyebrow={eyebrow}
                title={title}
                description={description}
                right={<div className="hidden md:block" />}
              />
            </Reveal>
            <div className="mt-10 grid gap-2">
              {bullets.map((b, idx) => (
                <Reveal key={b} delay={0.06 + idx * 0.03}>
                  <div className="noir-panel px-6 py-5">
                    <div className="flex items-start gap-3 text-sm leading-6 text-noir-mist/80">
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/55" />
                      <span>{b}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.16}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <NoirAnchor
                  href={
                    noir.contacts.whatsapp +
                    `?text=${encodeURIComponent(
                      "Ciao, vorrei verificare disponibilità. Date: __/__/__ → __/__/__. Siamo in __. Grazie."
                    )}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                >
                  Verifica disponibilità su WhatsApp
                </NoirAnchor>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.08}>
              <div className="relative">
                <MediaFrame
                  label={mediaLabel}
                  tone={mediaTone}
                  src={mediaSrc}
                  className="aspect-[4/5] sm:aspect-[6/7] lg:aspect-[4/5]"
                />
                <div className="pointer-events-none absolute -inset-6 rounded-[34px] bg-[radial-gradient(900px_circle_at_20%_0%,rgba(var(--ambient-c)/0.20),transparent_58%),radial-gradient(900px_circle_at_80%_30%,rgba(var(--ambient-a)/0.18),transparent_62%)] blur-2xl opacity-70" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
