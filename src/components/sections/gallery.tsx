import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { galleryFrames } from "@/lib/noir";

export function GallerySection() {
  return (
    <section id="galleria" data-ambient="noir" className="relative z-10 py-16 sm:py-24">
      <div className="noir-container">
        <SectionHeader
          eyebrow="Le suite, davvero"
          title="Quello che vedete sarà tutto vostro."
          description="Sono foto reali di Passion e Infinity. Nessuna stanza campione, nessuna spa condivisa: prenotate proprio questi spazi."
        />

        <div className="mt-10 grid grid-cols-2 gap-3 lg:hidden">
          {galleryFrames.slice(0, 5).map((frame, index) => (
            <figure
              key={frame.src}
              className={`relative overflow-hidden rounded-2xl ${
                index === 0 ? "col-span-2 aspect-[16/11]" : "aspect-[3/4]"
              }`}
            >
              <Image
                src={encodeURI(frame.src)}
                alt={frame.label}
                fill
                sizes={index === 0 ? "calc(100vw - 40px)" : "calc(50vw - 26px)"}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-3 bottom-3 text-[9px] uppercase leading-4 tracking-[0.16em] text-white/75">
                {frame.label}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="euphoria-marquee-mask -mx-12 mt-12 hidden overflow-hidden lg:block">
          <div className="euphoria-marquee flex w-max gap-4">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex gap-4">
                {galleryFrames.map((frame) => (
                  <figure
                    key={`${copy}-${frame.src}`}
                    className="relative h-[52vh] min-h-[390px] w-[42vw] max-w-[520px] shrink-0 overflow-hidden rounded-2xl"
                  >
                    <Image src={encodeURI(frame.src)} alt={copy === 0 ? frame.label : ""} fill sizes="(max-width: 640px) 72vw, 42vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <figcaption className="absolute bottom-7 left-7 text-xs uppercase tracking-[0.24em] text-white/70">{frame.label}</figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
