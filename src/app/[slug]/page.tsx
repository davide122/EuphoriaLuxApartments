import { OccasionLanding } from "@/components/sections/occasion-landing";
import { OCCASIONS } from "@/lib/occasions";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopNav } from "@/components/nav/top-nav";
import { FooterSection } from "@/components/sections/footer";
import { FinalCtaSection } from "@/components/sections/final-cta";
import { StickyCta } from "@/components/sticky-cta";
import { Reveal } from "@/components/motion/reveal";
import { MediaFrame } from "@/components/ui/media-frame";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { NoirLink } from "@/components/ui/noir-link";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/ui/breadcrumbs";
import { noir } from "@/lib/noir";
import { BLOG_POSTS_BY_SLUG, SEO_LANDINGS, SEO_LANDINGS_BY_SLUG } from "@/lib/seo-content";
import { openGraphImage, socialImageForSource } from "@/lib/social";

export const dynamicParams = false;

export function generateStaticParams() {
  return SEO_LANDINGS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const landing = SEO_LANDINGS_BY_SLUG[slug];
  if (!landing) return { robots: { index: false, follow: false } };
  const socialImage = socialImageForSource(landing.hero.image.src);

  const keywords = Array.from(
    new Set([
      landing.primaryKeyword,
      landing.title,
      noir.location,
      "suite",
      "suite per coppie",
      "suite romantica",
      "suite con jacuzzi",
      "suite spa",
      "spa privata",
      "jacuzzi privata",
      "vasca idromassaggio",
      "sauna interna",
      "sauna privata",
      "Agrigento",
      "Scala dei Turchi",
      "Valle dei Templi",
      "prenotazione diretta WhatsApp",
    ])
  ).slice(0, 16);

  return {
    title: landing.metaTitle,
    description: landing.metaDescription,
    keywords,
    alternates: { canonical: `/${landing.slug}` },
    openGraph: {
      type: "website",
      url: `/${landing.slug}`,
      title: landing.ogTitle,
      description: landing.ogDescription,
      siteName: noir.name,
      locale: "it_IT",
      images: [openGraphImage(socialImage, landing.hero.image.alt)],
    },
    twitter: {
      card: "summary_large_image",
      title: landing.ogTitle,
      description: landing.ogDescription,
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

function jsonLdForLanding(args: { landingUrl: string; imageUrl: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${args.landingUrl}#business`,
    name: `${noir.name} Luxury Suite`,
    url: args.landingUrl,
    image: [args.imageUrl],
    priceRange: `€${noir.startingFrom}+`,
    telephone: noir.contacts.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: noir.location,
      addressRegion: "Sicilia",
      addressCountry: "IT",
    },
    makesOffer: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: noir.startingFrom,
      url: args.landingUrl,
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

export default async function SeoLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const landing = SEO_LANDINGS_BY_SLUG[slug];
  if (!landing) notFound();

  const pageUrl = `${noir.siteUrl}/${landing.slug}`;
  const imageUrl = `${noir.siteUrl}${landing.hero.image.src}`;
  const crumbs = [
    { href: "/", label: "Home" },
    { href: `/${landing.slug}`, label: landing.title },
  ];
  const relatedPosts = (landing.relatedBlogSlugs ?? [])
    .map((s) => BLOG_POSTS_BY_SLUG[s])
    .filter(Boolean);
  const suggestedSuiteHref = landing.suggestedSuite ? `/suites/${landing.suggestedSuite}` : "/suites";
  const whatsappHref =
    noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      `Ciao, vorrei verificare disponibilità. Tema: ${landing.title}. Date: __/__/__ → __/__/__. Siamo in __. Grazie.`
    )}`;

  const occasion = OCCASIONS.find((item) => item.slug === slug);
  if (occasion) {
    return <OccasionLanding occasion={occasion} whatsappHref={whatsappHref} schema={[
      jsonLdOrganization(),
      { "@context": "https://schema.org", "@type": "WebPage", "@id": `${pageUrl}#page`, url: pageUrl, name: landing.title, description: landing.metaDescription, primaryImageOfPage: imageUrl, about: { "@id": `${noir.siteUrl}#business` } },
      jsonLdFaqPage({ pageUrl, faqs: landing.faqs }),
      breadcrumbJsonLd({ baseUrl: noir.siteUrl, items: [{ href: "/", label: "Home" }, { href: "/#occasioni", label: "Occasioni" }, { href: `/${occasion.slug}`, label: occasion.label }] }),
    ]} />;
  }

  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <TopNav />
      <main className="relative flex-1 pt-[72px]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              jsonLdOrganization(),
              jsonLdForLanding({ landingUrl: pageUrl, imageUrl }),
              jsonLdFaqPage({ pageUrl, faqs: landing.faqs }),
              breadcrumbJsonLd({ baseUrl: noir.siteUrl, items: crumbs }),
            ]),
          }}
        />

        <section data-ambient="noir" className="editorial-canvas relative z-10 overflow-hidden pb-20 pt-7 sm:pb-28 sm:pt-10">
          <div className="noir-container">
            <Breadcrumbs items={crumbs} />
            <Reveal>
              <div className="editorial-hero relative overflow-hidden rounded-2xl p-4 sm:p-7 lg:p-10">
                <div className="pointer-events-none absolute -bottom-24 -left-4 select-none font-display text-[16rem] leading-none text-white/[0.018]" aria-hidden="true">E</div>
                <div className="relative grid gap-7 lg:grid-cols-12 lg:items-center lg:gap-10">
                  <div className="order-2 px-2 pb-4 lg:order-1 lg:col-span-6 lg:px-2 lg:py-4">
                    <div className="euphoria-kicker">{landing.hero.eyebrow}</div>
                    <h1 className="noir-h1 mt-5 text-[2.65rem] leading-[0.94] text-noir-mist sm:text-6xl lg:text-7xl">
                      {landing.hero.h1}
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-7 text-noir-muted">{landing.hero.sub}</p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-10">
                      <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
                        Chiedi le tue date
                      </NoirAnchor>
                      <NoirLink href="/suites" variant="ghost">
                        Confronta Passion e Infinity
                      </NoirLink>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2 lg:col-span-6">
                    <MediaFrame
                      label={landing.title}
                      tone="noir"
                      src={landing.hero.image.src}
                      alt={landing.hero.image.alt}
                      className="aspect-[16/11] rounded-xl sm:aspect-[16/10]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <article className="editorial-prose mx-auto mt-10 grid max-w-4xl gap-4 sm:mt-16">
              {landing.blocks.map((b, idx) => (
                <Reveal key={b.title} delay={0.05 + idx * 0.04}>
                  <section className="editorial-card rounded-2xl p-6 sm:p-9">
                    <div className="text-[10px] uppercase tracking-[0.24em] text-noir-champagne/65">
                      {String(idx + 1).padStart(2, "0")} · {landing.primaryKeyword}
                    </div>
                    <h2 className="noir-h1 mt-5 text-3xl leading-tight text-noir-mist sm:text-4xl">
                      {b.title}
                    </h2>
                    <p className="mt-6 text-base leading-8 text-noir-muted sm:text-lg">{b.body}</p>
                    {b.bullets ? (
                      <ul className="mt-7 grid gap-3 rounded-xl border border-white/8 bg-white/[0.025] p-5">
                        {b.bullets.map((t) => (
                          <li key={t} className="text-base leading-7 text-noir-mist/78">{t}</li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                </Reveal>
              ))}
            </article>

            <Reveal delay={0.14}>
              <div className="editorial-card mx-auto mt-4 flex max-w-4xl flex-wrap gap-x-2 gap-y-2 rounded-2xl px-6 py-5 text-sm text-noir-mist/70 sm:mt-6">
                <span className="font-medium text-noir-mist/85">Da €{noir.startingFrom}/notte · aperitivo incluso</span>
                <span className="mx-2 text-white/25">•</span>
                Jacuzzi privata
                <span className="mx-2 text-white/25">•</span>
                Sauna interna
                <span className="mx-2 text-white/25">•</span>
                {noir.smartAccess}
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="editorial-card mx-auto mt-12 max-w-4xl rounded-2xl p-6 sm:mt-16 sm:p-9">
                <div className="euphoria-kicker">Domande frequenti</div>
                <div className="grid gap-3">
                  {landing.faqs.map((f) => (
                    <details key={f.q} className="group border-b border-white/10 px-1 py-5 last:border-0">
                      <summary className="min-h-11 cursor-pointer list-none text-base font-medium text-noir-mist/90 [&::-webkit-details-marker]:hidden">
                        <div className="flex items-center justify-between gap-6">
                          <span>{f.q}</span>
                          <span className="text-xl font-light text-noir-fuchsia transition group-open:rotate-45">+</span>
                        </div>
                      </summary>
                      <div className="mt-3 text-sm leading-6 text-noir-muted">{f.a}</div>
                    </details>
                  ))}
                </div>
              </div>
            </Reveal>

            {relatedPosts.length ? (
              <Reveal delay={0.20}>
                <div className="editorial-card mt-12 grid gap-10 rounded-2xl p-6 sm:mt-16 sm:p-9 lg:grid-cols-12 lg:items-start">
                  <div className="lg:col-span-7">
                    <div>
                      <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                        Approfondisci
                      </div>
                      <div className="mt-5 text-lg font-medium tracking-tight text-noir-mist">
                        Qualcosa da leggere prima di partire.
                      </div>
                      <div className="mt-5 grid gap-3">
                        {relatedPosts.slice(0, 5).map((p) => (
                          <NoirLink key={p.slug} href={`/blog/${p.slug}`} variant="ghost" className="justify-start border-x-0 border-b-0 border-t border-white/10 px-0 text-left">
                            {p.title}
                          </NoirLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="border-l border-noir-fuchsia/25 pl-7">
                      <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                        La suite giusta
                      </div>
                      <div className="mt-6 grid gap-3">
                        <NoirLink href={suggestedSuiteHref} variant="primary" className="justify-center">
                          Scopri la suite consigliata
                        </NoirLink>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={0.22}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
                  Chiedi disponibilità
                </NoirAnchor>
                <NoirLink href="/blog" variant="ghost">
                  Torna al journal
                </NoirLink>
              </div>
            </Reveal>
          </div>
        </section>
        <FinalCtaSection />
      </main>
      <FooterSection />
      <StickyCta href={whatsappHref} label="Chiedi le tue date" revealAfter={360} />
    </div>
  );
}
