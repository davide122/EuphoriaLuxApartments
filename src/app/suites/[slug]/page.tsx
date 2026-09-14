import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Bath,
  ChefHat,
  DoorClosed,
  Droplets,
  Flame,
  type LucideIcon,
  MapPin,
  MessageCircle,
  Shield,
  Sparkles,
  ThermometerSun,
  Wine,
  Wifi,
} from "lucide-react";
import { TopNav } from "@/components/nav/top-nav";
import { FooterSection } from "@/components/sections/footer";
import { Reveal } from "@/components/motion/reveal";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { NoirLink } from "@/components/ui/noir-link";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/ui/breadcrumbs";
import { noir, suites } from "@/lib/noir";
import { openGraphImage, socialImages } from "@/lib/social";

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
  const description = `${suite.name}: ${suite.tagline} Jacuzzi e sauna private, cucina completa e aperitivo di benvenuto incluso. Da €${noir.startingFrom} a notte.`;
  const socialImage = suite.slug === "infinity" ? socialImages.infinity : socialImages.passion;

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
      images: [openGraphImage(socialImage, `${suite.name} — ${noir.name}`)],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
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
      { "@type": "LocationFeatureSpecification", name: "Aperitivo di benvenuto incluso", value: true },
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
  Array<{ label: string; src: string; shape: "wide" | "tall" }>
> = {
  passion: [
    { label: "Letto, jacuzzi e sauna nello stesso spazio", src: "/passion-letto-jacuzzi-sauna.jpg", shape: "tall" },
    { label: "La suite nella luce del mattino", src: "/passion-morning.jpg", shape: "wide" },
    { label: "Jacuzzi privata", src: "/passion-jacuzzi.jpg", shape: "wide" },
    { label: "Il risveglio in Passion", src: "/passion-morning-1.jpg", shape: "tall" },
    { label: "Una prospettiva più intima", src: "/passion-morning-2.jpg", shape: "tall" },
    { label: "L’atmosfera della notte", src: "/passion/WhatsApp Image 2026-08-16 at 21.29.22.jpeg", shape: "tall" },
    { label: "Il benessere, a pochi passi dal letto", src: "/passion/WhatsApp Image 2026-08-16 at 21.29.22 (1).jpeg", shape: "tall" },
    { label: "Luci soffuse e privacy", src: "/passion/WhatsApp Image 2026-08-16 at 21.29.23.jpeg", shape: "tall" },
  ],
  infinity: [
    { label: "Il living immerso nelle proiezioni", src: "/infinity-salotto.jpg", shape: "tall" },
    { label: "La cucina completa", src: "/infinity-cucina.jpg", shape: "wide" },
    { label: "Jacuzzi privata e doccia", src: "/infinity-jacuzzi-doccia-vista.jpg", shape: "tall" },
    { label: "La zona notte", src: "/infinity-letto.jpg", shape: "tall" },
    { label: "La jacuzzi sotto una luce diversa", src: "/infinity-jacuzzi.jpg", shape: "tall" },
    { label: "Infinity in tutta la sua ampiezza", src: "/infinity/WhatsApp Image 2026-08-16 at 21.29.16.jpeg", shape: "wide" },
    { label: "Una suite che cambia atmosfera", src: "/infinity/WhatsApp Image 2026-08-16 at 21.29.16 (1).jpeg", shape: "wide" },
    { label: "Lo spazio wellness", src: "/infinity/WhatsApp Image 2026-08-16 at 21.29.23 (1).jpeg", shape: "tall" },
    { label: "Dettagli della zona giorno", src: "/infinity/WhatsApp Image 2026-08-16 at 21.29.15.jpeg", shape: "wide" },
    { label: "Luce, acqua, silenzio", src: "/infinity/WhatsApp Image 2026-08-16 at 21.29.16 (2).jpeg", shape: "wide" },
    { label: "Un’altra prospettiva sulla suite", src: "/infinity/WhatsApp Image 2026-08-16 at 21.29.23 (2).jpeg", shape: "tall" },
    { label: "La notte dentro Infinity", src: "/infinity/WhatsApp Image 2026-08-16 at 21.29.16 (4).jpeg", shape: "wide" },
  ],
};

const SUITE_VISUALS: Record<
  string,
  { hero: string; statement: string; introduction: string; size: string }
> = {
  passion: {
    hero: "/passion-letto-jacuzzi-sauna.jpg",
    statement: "Tutto vicino. Anche voi.",
    introduction:
      "Un unico ambiente avvolgente, pensato per far sparire il resto. Il letto, la jacuzzi e la sauna convivono nello stesso spazio: intimo, caldo, immediato.",
    size: "55 m²",
  },
  infinity: {
    hero: "/infinity-salotto.jpg",
    statement: "Più spazio per perdervi.",
    introduction:
      "Settantasette metri quadrati che cambiano ritmo insieme a voi. Living, cucina, zona notte e benessere diventano scene diverse della stessa esperienza.",
    size: "77 m²",
  },
};

const SERVICE_GROUPS: Array<{
  title: string;
  items: Array<{ k: string; v: string; Icon: LucideIcon }>;
}> = [
  {
    title: "Benessere privato",
    items: [
      { k: "Jacuzzi privata", v: "Dentro la suite, sempre e soltanto vostra.", Icon: Bath },
      { k: "Sauna interna", v: "La accendete quando volete, senza prenotare un turno.", Icon: Flame },
      { k: "Doccia in suite", v: "Dall’acqua calda al letto, senza uscire dal vostro spazio.", Icon: Droplets },
    ],
  },
  {
    title: "Comfort pratico",
    items: [
      { k: "Cucina completa + forno", v: "Per una cena, un caffè o una colazione senza uscire.", Icon: ChefHat },
      { k: "Wi‑Fi", v: "Incluso nel soggiorno.", Icon: Wifi },
      { k: "Aria condizionata", v: "Comfort in ogni stagione.", Icon: ThermometerSun },
    ],
  },
  {
    title: "Privacy e accesso",
    items: [
      { k: "Nessuno spazio condiviso", v: "La suite e la spa restano soltanto vostre.", Icon: Shield },
      { k: "Ingresso autonomo", v: "Ricevete il codice e non passate dalla reception.", Icon: DoorClosed },
      { k: "Aperitivo di benvenuto", v: "Tagliere di salumi e una bottiglia di prosecco, inclusi nel soggiorno.", Icon: Wine },
    ],
  },
];

function ServiceMatrix({
  suiteName,
}: {
  suiteName: string;
}) {
  return (
    <section className="mt-28 border-y border-white/10 py-16 sm:mt-36 sm:py-24">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-base text-noir-aqua">Dentro {suiteName}</p>
          <h2 className="noir-h1 mt-5 max-w-xl text-5xl leading-[0.98] text-noir-mist sm:text-6xl">
            Tutto vostro. Senza orari.
          </h2>
          <p className="mt-7 max-w-lg text-lg leading-8 text-noir-muted">
            La spa non è in un’altra stanza dell’hotel. È qui, nella vostra suite, pronta quando lo siete voi.
          </p>
        </div>
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {SERVICE_GROUPS.flatMap((group) => group.items).map((item) => {
            const Icon = item.Icon;
            return (
              <div key={item.k} className="flex gap-5 border-t border-white/10 pt-6">
                <Icon className="mt-1 h-6 w-6 shrink-0 text-noir-aqua" />
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-noir-mist">{item.k}</h3>
                  <p className="mt-2 text-base leading-7 text-noir-muted">{item.v}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExperienceFlow() {
  const steps = [
    {
      k: "Arrivo",
      v: "Ricevete il codice sul telefono ed entrate senza passare dalla reception.",
      Icon: DoorClosed,
    },
    {
      k: "Benessere",
      v: "Jacuzzi e sauna sono dentro la suite. Nessun turno da prenotare.",
      Icon: Bath,
    },
    {
      k: "Soggiorno",
      v: "Preparate qualcosa, scegliete la musica e restate dentro quanto volete.",
      Icon: ChefHat,
    },
    {
      k: "Uscita",
      v: "Al check-out richiudete la porta. Nessuna coda e nessuna chiave da consegnare.",
      Icon: Sparkles,
    },
  ] as const;

  return (
    <section className="mt-28 sm:mt-36">
      <p className="text-base text-noir-aqua">Dal primo messaggio all’ultimo istante</p>
      <h2 className="noir-h1 mt-5 max-w-4xl text-5xl leading-[0.98] text-noir-mist sm:text-6xl lg:text-7xl">
        Arrivate. Chiudete la porta. Il tempo cambia ritmo.
      </h2>
      <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-4">
        {steps.map((s, idx) => (
          <div key={s.k}>
            <div className="flex items-center gap-4 text-noir-aqua">
              <span className="text-lg tabular-nums">0{idx + 1}</span>
              <s.Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-medium tracking-tight text-noir-mist">{s.k}</h3>
            <p className="mt-3 text-base leading-7 text-noir-muted">{s.v}</p>
          </div>
        ))}
      </div>
    </section>
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
  const visual = SUITE_VISUALS[slug];
  const gallery = FRAMES[slug] ?? [];
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
    <div className="relative flex min-h-[100svh] flex-col bg-[#060309]">
      <TopNav />
      <main className="relative flex-1">
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
        <section
          data-ambient="noir"
          className="relative z-10 overflow-hidden bg-[radial-gradient(ellipse_at_12%_30%,rgba(139,92,246,0.11),transparent_34%),radial-gradient(ellipse_at_88%_68%,rgba(237,63,166,0.08),transparent_32%),linear-gradient(180deg,#060309_0%,#0a050e_50%,#060309_100%)] pb-20"
        >
          <Reveal>
            <div className="relative min-h-[100svh] overflow-hidden rounded-2xl">
              <Image
                src={visual.hero}
                alt={`${suite.name}, suite con jacuzzi privata e sauna`}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,3,12,0.58)_0%,rgba(6,3,12,0.08)_38%,rgba(6,3,12,0.9)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_24%,rgba(219,39,119,0.18),transparent_34%),radial-gradient(circle_at_12%_70%,rgba(124,58,237,0.22),transparent_38%)]" />
              <div className="noir-container relative z-10 flex min-h-[100svh] flex-col pb-10 pt-28 sm:pb-16">
                <Breadcrumbs items={crumbs} />
                <div className="mt-auto max-w-5xl">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-base text-white/80 sm:text-lg">
                    <span className="inline-flex items-center gap-2"><MapPin className="h-5 w-5 text-noir-aqua" />{locationLine}</span>
                    <span>{visual.size}</span>
                    <span>Da €{noir.startingFrom} / notte</span>
                  </div>
                  <h1 className="noir-h1 mt-6 text-[clamp(4.5rem,14vw,11rem)] leading-[0.78] tracking-[-0.055em] text-white">
                    {suite.name}
                  </h1>
                  <p className="noir-h1 mt-8 text-3xl leading-tight text-white sm:text-5xl">
                    {visual.statement}
                  </p>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
                      Verifica le tue date
                      <MessageCircle className="h-5 w-5 text-noir-aqua" />
                    </NoirAnchor>
                    <NoirLink href="/suites" variant="ghost">Confronta le suite</NoirLink>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="noir-container">
            <Reveal delay={0.05}>
              <div className="grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8">
                  <h2 className="noir-h1 text-5xl leading-[0.98] text-noir-mist sm:text-7xl">
                    {visual.introduction}
                  </h2>
                </div>
                <div className="lg:col-span-4 lg:pl-8">
                  <div className="space-y-5 border-l border-noir-fuchsia/35 pl-6">
                    <p className="flex gap-3 text-lg leading-7 text-noir-mist">
                      <Wine className="mt-0.5 h-6 w-6 shrink-0 text-noir-aqua" />
                      <span>{noir.welcomeIncluded}, incluso.</span>
                    </p>
                    {suite.highlights.slice(0, 4).map((highlight) => (
                      <p key={highlight} className="text-lg leading-7 text-noir-mist/80">{highlight}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="mb-10 flex flex-wrap items-end justify-between gap-5 border-b border-white/10 pb-7">
              <div>
                <p className="text-base text-noir-aqua">Galleria completa</p>
                <h2 className="noir-h1 mt-3 text-4xl text-noir-mist sm:text-6xl">Guardate ogni spazio.</h2>
              </div>
              <p className="text-lg text-noir-muted">{gallery.length} fotografie</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 sm:gap-7">
              {gallery.slice(1).map((frame, idx) => (
                <Reveal
                  key={frame.src}
                  delay={Math.min(idx * 0.025, 0.15)}
                  className={frame.shape === "wide" ? "md:col-span-2" : ""}
                >
                  <figure>
                    <div className={`relative overflow-hidden ${
                      frame.shape === "wide"
                        ? "aspect-[16/10] rounded-2xl sm:aspect-[16/8]"
                        : "aspect-[4/5] rounded-2xl"
                    }`}>
                      <Image
                        src={frame.src}
                        alt={`${suite.name}: ${frame.label}`}
                        fill
                        sizes={frame.shape === "wide" ? "(max-width: 768px) 100vw, 1200px" : "(max-width: 768px) 100vw, 50vw"}
                        className="object-cover transition duration-1000 ease-out hover:scale-[1.025]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    </div>
                    <figcaption className="mt-4 text-lg text-noir-mist/75">{frame.label}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.08}><ServiceMatrix suiteName={suite.name} /></Reveal>
            <Reveal delay={0.1}><ExperienceFlow /></Reveal>

            <Reveal delay={0.12}>
              <div className="mt-28 border-y border-white/10 py-16 sm:mt-36 sm:py-24">
                <p className="text-lg text-noir-aqua">Prenotazione diretta</p>
                <h2 className="noir-h1 mt-5 max-w-4xl text-5xl leading-[0.98] text-noir-mist sm:text-7xl">
                  La suite è pronta. Mancano solo le vostre date.
                </h2>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-noir-muted">
                  Scriveteci quando volete arrivare. Vi rispondiamo direttamente, senza passaggi inutili.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
                    Chiedi disponibilità
                    <MessageCircle className="h-5 w-5 text-noir-aqua" />
                  </NoirAnchor>
                  <NoirAnchor href={`tel:${noir.contacts.phone.replaceAll(" ", "")}`} variant="ghost">Chiama</NoirAnchor>
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
