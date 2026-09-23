import { BriefcaseBusiness, Camera, Gift, MessageCircle } from "lucide-react";
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
        <div className="border-t border-fuchsia-100/12 pt-10">
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-4">
              <div className="noir-h1 text-3xl text-noir-mist">{noir.name}</div>
              <div className="mt-3 max-w-sm text-sm text-noir-muted">
                Due suite private a {noir.location}. Jacuzzi, sauna e una notte
                da vivere senza condividere niente con nessuno. Non solo per coppie.
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/voucher"
                  className="inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/5 px-4 py-2 text-xs font-medium text-purple-200 transition hover:bg-purple-500/10"
                >
                  <Gift className="h-3.5 w-3.5" />
                  Voucher regalo · da €90
                </Link>
                <Link
                  href="/collabora"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-medium text-noir-mist/80 transition hover:bg-white/[0.04] hover:text-noir-mist"
                >
                  <BriefcaseBusiness className="h-3.5 w-3.5" />
                  Collabora con noi
                </Link>
              </div>
            </div>
            <div className="md:col-span-8">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                    Pagine
                  </div>
                  <div className="mt-4 grid gap-2 text-sm">
                    {[
                      { href: "/#esperienza", label: "Esperienza" },
                      { href: "/#occasioni", label: "Le vostre occasioni" },
                      { href: "/#suites", label: "Suites" },
                      { href: "/suites/passion", label: "Passion · 55 m²" },
                      { href: "/suites/infinity", label: "Infinity · 77 m²" },
                      { href: "/prenota", label: "Prenota" },
                      { href: "/blog", label: "Guide" },
                      { href: "/#galleria", label: "Galleria" },
                      { href: "/#faq", label: "FAQ" },
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
                    Idee & Regali
                  </div>
                  <div className="mt-4 grid gap-2 text-sm">
                    <Link
                      href="/voucher"
                      className="text-noir-mist/75 transition hover:text-noir-mist"
                    >
                      🎁 Voucher regalo
                    </Link>
                    <Link
                      href="/spa-privata-mamma-figlia-porto-empedocle"
                      className="text-noir-mist/75 transition hover:text-noir-mist"
                    >
                      Mamma & figlia
                    </Link>
                    <Link
                      href="/pre-wedding-spa-privata-sposa-testimone"
                      className="text-noir-mist/75 transition hover:text-noir-mist"
                    >
                      Pre-wedding & sposa
                    </Link>
                    <Link
                      href="/spa-privata-persona-sola-sicilia"
                      className="text-noir-mist/75 transition hover:text-noir-mist"
                    >
                      Solo per te
                    </Link>
                    <Link
                      href="/compleanno-spa-privata-senza-festa"
                      className="text-noir-mist/75 transition hover:text-noir-mist"
                    >
                      Compleanno
                    </Link>
                    <Link
                      href="/stacca-spa-privata-dopo-esami-lavoro"
                      className="text-noir-mist/75 transition hover:text-noir-mist"
                    >
                      Dopo il periodo pesante
                    </Link>
                    {landingLinks.map((l) => (
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
                    <div>{noir.address}</div>
                    <div className="text-noir-mist/55">{noir.location} · Sicilia</div>
                    <Link
                      href="/collabora"
                      className="mt-3 transition hover:text-noir-mist"
                    >
                      💼 Collaborazioni · Partner
                    </Link>
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
                    <a
                      href="/voucher"
                      className="mt-2 inline-flex items-center gap-2 text-noir-mist/75 transition hover:text-noir-mist"
                    >
                      <Gift className="h-4 w-4 text-purple-200" />
                      Regala Euphoria
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-noir-mist/45 sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} {noir.name}. Tutti i diritti riservati.</div>
            <div className="tracking-[0.22em] uppercase">Entrate. Chiudete. Restate.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

