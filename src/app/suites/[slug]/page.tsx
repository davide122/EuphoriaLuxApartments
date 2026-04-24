import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Bath,
  ChefHat,
  DoorClosed,
  Droplets,
  Flame,
  Lightbulb,
  type LucideIcon,
  MapPin,
  MessageCircle,
  Shield,
  Sparkles,
  ThermometerSun,
  Wifi,
} from "lucide-react";
import { TopNav } from "@/components/nav/top-nav";
import { FooterSection } from "@/components/sections/footer";
import { Reveal } from "@/components/motion/reveal";
import { MediaFrame } from "@/components/ui/media-frame";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { NoirLink } from "@/components/ui/noir-link";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/ui/breadcrumbs";
import { noir, suites } from "@/lib/noir";

const BY_SLUG: Record<string, (typeof suites)[number]> = Object.fromEntries(
  suites.map((s) => [s.slug, s])
);

export const dynamicParams = false;

export function generateStaticParams() {
  return suites.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const suite = BY_SLUG[slug];
  if (!suite) return { robots: { index: false, follow: false } };

  const title = `${suite.name} — Suite con jacuzzi privata e sauna | ${noir.name}`;
  const description = `${suite.name}: ${suite.tagline} Jacuzzi privata, sauna interna, cucina completa con forno, Wi‑Fi e condizionatori. Da €${noir.startingFrom}/notte. Prenota via WhatsApp.`;

  return {
    title,
    description,
    alternates: { canonical: `/suites/${suite.slug}` },
    openGraph: {
      type: "website",
      url: `/suites/${suite.slug}`,
      siteName: noir.name,
      title,
      description,
      locale: "it_IT",
      images: [
        { url: `/suites/${suite.slug}/opengraph-image`, width: 1200, height: 630, alt: `${suite.name} — ${noir.name}` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/suites/${suite.slug}/opengraph-image`],
    },
  };
}

function jsonLdOrganization() {
  const logoUrl = `${noir.siteUrl}/android-chrome-512x512.png`;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${noir.siteUrl}#org`,
    name: `${noir.name} Luxury Suite`,
    url: noir.siteUrl,
    logo: { "@type": "ImageObject", url: logoUrl },
    email: noir.contacts.email,
    telephone: noir.contacts.phone,
  };
}

function jsonLdForSuite(args: { url: string; imageUrl: string; suiteName: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${args.url}#business`,
    name: `${noir.name} — ${args.suiteName}`,
    url: args.url,
    image: [args.imageUrl],
    priceRange: `€${noir.startingFrom}+`,
    telephone: noir.contacts.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: noir.location,
      addressRegion: "Sicilia",
      addressCountry: "IT",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Jacuzzi privata", value: true },
      { "@type": "LocationFeatureSpecification", name: "Sauna interna", value: true },
      { "@type": "LocationFeatureSpecification", name: "Cucina completa con forno", value: true },
      { "@type": "LocationFeatureSpecification", name: "Wi‑Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Aria condizionata", value: true },
    ],
    makesOffer: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: noir.startingFrom,
      url: args.url,
      availability: "https://schema.org/InStock",
    },
    isPartOf: { "@id": `${noir.siteUrl}#org` },
  };
}

function jsonLdFaqPage(args: { pageUrl: string; faqs: Array<{ q: string; a: string }> }) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${args.pageUrl}#faq`,
    mainEntity: args.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

const FRAMES: Record<
  string,
  Array<{ label: string; tone: "spa" | "sauna" | "night" | "noir"; src: string }>
> = {
  passion: [
    { label: "Private spa — letto · jacuzzi · sauna", tone: "spa", src: "/passion-letto-jacuzzi-sauna.jpg" },
    { label: "Jacuzzi privata (LED)", tone: "spa", src: "/passion-jacuzzi.jpg" },
    { label: "Mattina — luce naturale", tone: "night", src: "/passion-morning-2.jpg" },
  ],
  infinity: [
    { label: "Letto (luci immersive)", tone: "night", src: "/infinity-letto.jpg" },
    { label: "Cucina completa + forno", tone: "noir", src: "/infinity-cucina.jpg" },
    { label: "Jacuzzi + doccia a vista", tone: "spa", src: "/infinity-jacuzzi-doccia-vista.jpg" },
  ],
};

const SERVICE_GROUPS: Array<{
  title: string;
  items: Array<{ k: string; v: string; Icon: LucideIcon }>;
}> = [
  {
    title: "Wellness privato",
    items: [
      { k: "Jacuzzi privata", v: "Uso esclusivo, dentro la suite.", Icon: Bath },
      { k: "Sauna interna", v: "Percorso completo, senza uscire.", Icon: Flame },
      { k: "Doccia scenografica", v: "Dettagli che fanno scena.", Icon: Droplets },
    ],
  },
  {
    title: "Comfort reale",
    items: [
      { k: "Cucina completa + forno", v: "Libertà totale, anche di notte.", Icon: ChefHat },
      { k: "Wi‑Fi", v: "Stabile e veloce.", Icon: Wifi },
      { k: "Condizionatori", v: "Comfort in ogni stagione.", Icon: ThermometerSun },
    ],
  },
  {
    title: "Privacy & accesso",
    items: [
      { k: "Zero spazi condivisi", v: "Qui conta la vostra privacy.", Icon: Shield },
      { k: "Ingresso riservato", v: "Arrivo discreto e semplice.", Icon: DoorClosed },
      { k: "Smart access", v: noir.smartAccess, Icon: Sparkles },
    ],
  },
  {
    title: "Mood & design",
    items: [
      { k: "Lights experience", v: "Regia luminosa immersiva.", Icon: Lightbulb },
      { k: "Materiali e dettagli", v: "Scelte che non sembrano “standard”.", Icon: Sparkles },
      { k: "Atmosfera notturna", v: "Quando cala la luce, si accende la scena.", Icon: Sparkles },
    ],
  },
];

function ServiceMatrix({
  suiteName,
}: {
  suiteName: string;
}) {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="noir-panel p-8 sm:p-9">
          <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
            Servizi inclusi
          </div>
          <div className="mt-5 text-2xl font-medium tracking-tight text-noir-mist">
            Tutto quello che serve, già dentro la suite.
          </div>
          <p className="mt-4 text-sm leading-6 text-noir-muted">
            Una suite non si giudica solo dalle foto. Conta ciò che trovi davvero: benessere privato,
            comfort e privacy, senza frizioni. {suiteName} è pronta quando lo sei tu.
          </p>
          <div className="mt-7 text-sm text-noir-mist/70">
            <span className="font-medium text-noir-mist/85">Da €{noir.startingFrom}/notte</span>
            <span className="mx-2 text-white/25">•</span>
            Jacuzzi privata
            <span className="mx-2 text-white/25">•</span>
            Sauna interna
            <span className="mx-2 text-white/25">•</span>
            Cucina completa + forno
            <span className="mx-2 text-white/25">•</span>
            Wi‑Fi + condizionatori
            <span className="mx-2 text-white/25">•</span>
            {noir.smartAccess}
          </div>
        </div>
      </div>
      <div className="lg:col-span-7">
        <div className="grid gap-4 sm:grid-cols-2">
          {SERVICE_GROUPS.map((g) => (
            <div key={g.title} className="noir-panel p-7">
              <div className="flex items-center justify-between gap-6">
                <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                  {g.title}
                </div>
                <div className="h-1.5 w-1.5 rounded-full bg-white/45" />
              </div>
              <div className="mt-5 grid gap-4">
                {g.items.map((it) => {
                  const Icon = it.Icon;
                  return (
                    <div key={it.k} className="flex items-start gap-4">
                      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5 text-noir-aqua" />
                      </div>
                      <div>
                        <div className="text-sm font-medium tracking-tight text-noir-mist">
                          {it.k}
                        </div>
                        <div className="mt-1 text-sm leading-6 text-noir-muted">{it.v}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceFlow() {
  const steps = [
    {
      k: "Arrivo",
      v: "Entrate in autonomia: zero attese, zero stress. Il mood parte subito.",
      Icon: DoorClosed,
    },
    {
      k: "Rituale",
      v: "Jacuzzi privata e sauna interna: acqua, calore, silenzio. Solo voi due.",
      Icon: Bath,
    },
    {
      k: "Notte",
      v: "Luci immersive e design: la suite diventa scena. Elegante, non eccessiva.",
      Icon: Lightbulb,
    },
    {
      k: "Libertà",
      v: "Cucina completa + forno: restate dentro l’esperienza, senza interromperla.",
      Icon: ChefHat,
    },
  ] as const;

  return (
    <div className="mt-12">
      <div className="noir-panel p-8 sm:p-9">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
              Come si vive
            </div>
            <div className="mt-5 text-2xl font-medium tracking-tight text-noir-mist">
              Un percorso semplice. Ma potentissimo.
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-noir-muted">
              Ogni dettaglio è pensato per eliminare frizioni e aumentare sensazioni. Non “servizi”:
              momenti.
            </p>
          </div>
          <div className="hidden md:inline-flex items-center gap-2" />
        </div>
        <div className="relative mt-10 grid gap-4 md:grid-cols-4">
          <div className="pointer-events-none absolute left-6 right-6 top-6 hidden h-px bg-white/10 md:block" />
          {steps.map((s, idx) => (
            <div key={s.k} className="relative rounded-2xl border border-white/10 bg-white/5 px-6 py-6">
              <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-[radial-gradient(120%_120%_at_20%_0%,rgba(var(--ambient-c)/0.32),transparent_58%),radial-gradient(120%_120%_at_80%_10%,rgba(var(--ambient-a)/0.28),transparent_62%),rgba(255,255,255,0.06)]">
                <s.Icon className="h-5 w-5 text-noir-aqua" />
                <div className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] font-medium text-noir-mist/80">
                  {idx + 1}
                </div>
              </div>
              <div className="mt-4 text-sm font-medium tracking-tight text-noir-mist">
                {s.k}
              </div>
              <div className="mt-2 text-sm leading-6 text-noir-muted">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function SuiteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const suite = BY_SLUG[slug];
  if (!suite) notFound();
  const pageUrl = `${noir.siteUrl}/suites/${suite.slug}`;
  const imageUrl = `${noir.siteUrl}${suite.cover}`;
  const crumbs = [
    { href: "/", label: "Home" },
    { href: "/suites", label: "Suites" },
    { href: `/suites/${suite.slug}`, label: suite.name },
  ];
  const locationLine = `${noir.location}, Sicilia`;
  const whatsappHref =
    noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      `Ciao, vorrei verificare disponibilità per ${suite.name}. Date: __/__/__ → __/__/__. Siamo in __. Grazie.`
    )}`;
  const suiteFaqs = [
    { q: "Smart check-in/out", a: noir.smartAccess, Icon: DoorClosed },
    { q: "Privacy", a: "Zero spazi condivisi. Solo voi.", Icon: Shield },
    { q: "Comfort", a: "Cucina completa + forno, Wi‑Fi, condizionatori.", Icon: ChefHat },
  ] as const;

  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <TopNav />
      <main className="relative flex-1 pt-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              jsonLdOrganization(),
              jsonLdForSuite({ url: pageUrl, imageUrl, suiteName: suite.name }),
              jsonLdFaqPage({ pageUrl, faqs: suiteFaqs.map(({ q, a }) => ({ q, a })) }),
              breadcrumbJsonLd({ baseUrl: noir.siteUrl, items: crumbs }),
            ]),
          }}
        />
        <section data-ambient="noir" className="relative z-10 py-16 sm:py-20">
          <div className="noir-container">
            <Breadcrumbs items={crumbs} />
            <Reveal>
              <div className="noir-panel noir-glow p-9 sm:p-12">
                <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                  Suite
                </div>
                <div className="noir-h1 mt-5 text-5xl leading-[0.98] text-noir-mist sm:text-6xl">
                  {suite.name}
                </div>
                <p className="mt-6 max-w-2xl text-base leading-7 text-noir-muted">
                  {suite.tagline}
                </p>
                <div className="mt-7 grid gap-4 lg:grid-cols-12 lg:items-end">
                  <div className="lg:col-span-8">
                    <div className="text-sm text-noir-mist/70">
                      <span className="font-medium text-noir-mist/85">Da €{noir.startingFrom}/notte</span>
                      <span className="mx-2 text-white/25">•</span>
                      Jacuzzi privata
                      <span className="mx-2 text-white/25">•</span>
                      Sauna interna
                      <span className="mx-2 text-white/25">•</span>
                      Cucina completa + forno
                      <span className="mx-2 text-white/25">•</span>
                      Wi‑Fi + condizionatori
                      <span className="mx-2 text-white/25">•</span>
                      {noir.smartAccess}
                    </div>
                  </div>
                  <div className="lg:col-span-4">
                    <div className="noir-panel px-6 py-5">
                      <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                        Località
                      </div>
                      <div className="mt-3 inline-flex items-center gap-2 text-sm text-noir-mist/80">
                        <MapPin className="h-4 w-4 text-noir-aqua" />
                        {locationLine}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
                    Verifica disponibilità su WhatsApp
                    <MessageCircle className="h-4 w-4 text-noir-aqua" />
                  </NoirAnchor>
                  <NoirLink href="/suites" variant="ghost">
                    Torna alle suites
                  </NoirLink>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal delay={0.05}>
                  <MediaFrame
                    label="Atmosfera — luci & materiali"
                    tone={slug === "passion" ? "spa" : "night"}
                    src={suite.cover}
                    alt={suite.name}
                    className="aspect-[16/10]"
                    priority
                  />
                </Reveal>
              </div>
              <div className="lg:col-span-5">
                <Reveal delay={0.10}>
                  <div className="noir-panel p-8 sm:p-9">
                    <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                      In questa suite
                    </div>
                    <div className="mt-6 grid gap-2">
                      {suite.highlights.map((h) => (
                        <div
                          key={h}
                          className="flex items-start gap-3 text-sm leading-6 text-noir-mist/80"
                        >
                          <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/45" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 grid gap-3">
                      {suiteFaqs.map((f) => (
                        <details key={f.q} className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
                          <summary className="cursor-pointer list-none text-sm font-medium text-noir-mist/85 [&::-webkit-details-marker]:hidden">
                            <div className="flex items-center justify-between gap-6">
                              <span className="inline-flex items-center gap-2">
                                <f.Icon className="h-4 w-4 text-noir-aqua" />
                                {f.q}
                              </span>
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/55" />
                            </div>
                          </summary>
                          <div className="mt-3 text-sm leading-6 text-noir-muted">{f.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(FRAMES[slug] ?? []).map((f, idx) => (
                <Reveal key={f.label} delay={0.06 + idx * 0.04}>
                  <MediaFrame
                    label={f.label}
                    tone={f.tone}
                    src={f.src}
                    className="aspect-[4/5]"
                  />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.10}>
              <ExperienceFlow />
            </Reveal>

            <Reveal delay={0.12}>
              <ServiceMatrix suiteName={suite.name} />
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-12 noir-panel noir-glow p-9 sm:p-10">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                      Prenotazione diretta
                    </div>
                    <div className="mt-5 text-2xl font-medium tracking-tight text-noir-mist">
                      Dimmi data e occasione. Ti rispondiamo con la soluzione migliore.
                    </div>
                    <p className="mt-4 text-sm leading-6 text-noir-muted">
                      Weekend romantico, anniversario, sorpresa: scrivi su WhatsApp e ti guidiamo tra Passion e Infinity
                      in base al mood che vuoi.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary" className="group">
                      Scrivi su WhatsApp
                      <MessageCircle className="h-4 w-4 text-noir-aqua transition group-hover:translate-x-0.5" />
                    </NoirAnchor>
                    <NoirAnchor href={`tel:${noir.contacts.phone.replaceAll(" ", "")}`} variant="ghost" className="group">
                      Chiama
                      <span className="h-1.5 w-1.5 rounded-full bg-white/50 transition group-hover:scale-125" />
                    </NoirAnchor>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
