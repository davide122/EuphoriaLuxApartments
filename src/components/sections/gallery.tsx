import { Reveal } from "@/components/motion/reveal";
import { MediaFrame } from "@/components/ui/media-frame";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { NoirLink } from "@/components/ui/noir-link";
import { SectionHeader } from "@/components/ui/section-header";
import { galleryFrames, noir } from "@/lib/noir";

export function GallerySection() {
  return (
    <section
      id="galleria"
      data-ambient="noir"
      className="relative z-10 py-20 sm:py-28"
    >
      <div className="noir-container">
        <Reveal>
          <SectionHeader
            eyebrow="Galleria"
            title="Immagini che respirano. Sì. Ma soprattutto: è reale."
            description={
              <>
                Quello che vedi è ciò che vivi: ambienti privati, luci notturne, spa interna
                e dettagli scenografici. Se ti immagini già qui, verifica subito la disponibilità.
              </>
            }
          />
        </Reveal>

        <div className="mt-12 hidden grid-cols-12 gap-6 lg:grid">
          <div className="col-span-7">
            <Reveal>
              <div className="grid gap-6">
                <MediaFrame
                  label={galleryFrames[0].label}
                  tone={galleryFrames[0].tone}
                  src={galleryFrames[0].src}
                  className="aspect-[16/10]"
                  priority
                />
                <div className="grid grid-cols-2 gap-6">
                  <MediaFrame
                    label={galleryFrames[3].label}
                    tone={galleryFrames[3].tone}
                    src={galleryFrames[3].src}
                    className="aspect-[4/5]"
                  />
                  <MediaFrame
                    label={galleryFrames[2].label}
                    tone={galleryFrames[2].tone}
                    src={galleryFrames[2].src}
                    className="aspect-[4/5]"
                  />
                </div>
              </div>
            </Reveal>
          </div>
          <div className="col-span-5">
            <Reveal delay={0.08}>
              <div className="grid gap-6">
                <MediaFrame
                  label={galleryFrames[1].label}
                  tone={galleryFrames[1].tone}
                  src={galleryFrames[1].src}
                  className="aspect-[4/5]"
                />
                <MediaFrame
                  label={galleryFrames[4].label}
                  tone={galleryFrames[4].tone}
                  src={galleryFrames[4].src}
                  className="aspect-[16/11]"
                />
                <MediaFrame
                  label={galleryFrames[5].label}
                  tone={galleryFrames[5].tone}
                  src={galleryFrames[5].src}
                  className="aspect-[16/10]"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-10 lg:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {galleryFrames.map((f) => (
              <div key={f.label} className="min-w-[78%] snap-start">
                <Reveal>
                  <MediaFrame
                    label={f.label}
                    tone={f.tone}
                    src={f.src}
                    className="aspect-[4/5]"
                  />
                </Reveal>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs tracking-[0.22em] uppercase text-noir-mist/50">
            Swipe per esplorare
          </div>
        </div>

        <Reveal delay={0.14}>
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
              Scrivi su WhatsApp
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
