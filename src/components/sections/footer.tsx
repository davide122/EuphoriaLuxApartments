import { Camera, MessageCircle } from "lucide-react";
import Link from "next/link";
import { noir } from "@/lib/noir";
import { SEO_LANDINGS } from "@/lib/seo-content";

export function FooterSection() {
  const whatsappHref =
    noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      "Ciao, vorrei verificare disponibilità per Passion o Infinity. Date: __/__/__ → __/__/__. Siamo in __. Grazie."
    )}`;

  const landingLinks = SEO_LANDINGS.slice(0, 3).map((l) => ({
    href: `/${l.slug}`,
    label: l.title,
  }));

  return (
    <footer data-ambient="noir" className="relative z-10 pb-28 pt-14 sm:pb-16">
      <div className="noir-container">
        <div className="noir-panel p-8 sm:p-10">
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <div className="noir-h1 text-3xl text-noir-mist">{noir.name}</div>
              <div className="mt-3 text-sm text-noir-muted">
                Luxury suite a {noir.location}. Jacuzzi privata, sauna interna, luci immersive.
                Da €{noir.startingFrom}/notte. {noir.smartAccess}.
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="grid gap-8 sm:grid-cols-3">
                <div>
                  <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                    Link
                  </div>
                  <div className="mt-4 grid gap-2 text-sm">
                    {[
                      { href: "/#esperienza", label: "Esperienza" },
                      { href: "/#suites", label: "Suites" },
                      { href: "/blog", label: "Guide" },
                      { href: "/#galleria", label: "Galleria" },
                      { href: "/#recensioni", label: "Recensioni" },
                      { href: "/#faq", label: "FAQ" },
                      ...landingLinks,
                    ].map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="text-noir-mist/75 transition hover:text-noir-mist"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                    Contatti
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-noir-mist/75">
                    <a
                      href={`mailto:${noir.contacts.email}`}
                      className="transition hover:text-noir-mist"
                    >
                      {noir.contacts.email}
                    </a>
                    <a
                      href={`tel:${noir.contacts.phone.replaceAll(" ", "")}`}
                      className="transition hover:text-noir-mist"
                    >
                      {noir.contacts.phone}
                    </a>
                    <div>{noir.location}</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                    Social
                  </div>
                  <div className="mt-4 grid gap-3 text-sm">
                    <a
                      href={noir.contacts.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-noir-mist/75 transition hover:text-noir-mist"
                    >
                      <Camera className="h-4 w-4 text-noir-aqua" />
                      Instagram
                    </a>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-noir-mist/75 transition hover:text-noir-mist"
                    >
                      <MessageCircle className="h-4 w-4 text-noir-aqua" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-noir-mist/45 sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} {noir.name}. Tutti i diritti riservati.</div>
            <div className="tracking-[0.22em] uppercase">Dark. Elegant. Unforgettable.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
