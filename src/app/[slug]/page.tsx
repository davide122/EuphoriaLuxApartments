import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopNav } from "@/components/nav/top-nav";
import { FooterSection } from "@/components/sections/footer";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { MediaFrame } from "@/components/ui/media-frame";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { NoirLink } from "@/components/ui/noir-link";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/ui/breadcrumbs";
import { noir } from "@/lib/noir";
import { BLOG_POSTS_BY_SLUG, SEO_LANDINGS, SEO_LANDINGS_BY_SLUG } from "@/lib/seo-content";

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

  return {
    title: landing.metaTitle,
    description: landing.metaDescription,
    alternates: { canonical: `/${landing.slug}` },
    openGraph: {
      type: "website",
      url: `/${landing.slug}`,
      title: landing.ogTitle,
      description: landing.ogDescription,
      siteName: noir.name,
    },
    twitter: {
      card: "summary_large_image",
      title: landing.ogTitle,
      description: landing.ogDescription,
    },
  };
}

function jsonLdForLanding(args: { landingUrl: string; imageUrl: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
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

  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <TopNav />
      <main className="relative flex-1 pt-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              jsonLdForLanding({ landingUrl: pageUrl, imageUrl }),
              breadcrumbJsonLd({ baseUrl: noir.siteUrl, items: crumbs }),
            ]),
          }}
        />

        <section data-ambient="noir" className="relative z-10 py-16 sm:py-20">
          <div className="noir-container">
            <Breadcrumbs items={crumbs} />
            <Reveal>
              <div className="noir-panel noir-glow overflow-hidden p-9 sm:p-12">
                <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-6">
                    <SectionHeader
                      eyebrow={landing.hero.eyebrow}
                      title={landing.hero.h1}
                      description={landing.hero.sub}
                    />
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                      <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
                        Verifica disponibilità su WhatsApp
                      </NoirAnchor>
                      <NoirLink href="/suites" variant="ghost">
                        Vedi Passion e Infinity
                      </NoirLink>
                    </div>
                  </div>
                  <div className="lg:col-span-6">
                    <MediaFrame
                      label={landing.title}
                      tone="noir"
                      src={landing.hero.image.src}
                      alt={landing.hero.image.alt}
                      className="aspect-[16/10]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {landing.blocks.map((b, idx) => (
                <Reveal key={b.title} delay={0.05 + idx * 0.04}>
                  <div className="noir-panel p-8 sm:p-9">
                    <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                      {landing.primaryKeyword}
                    </div>
                    <div className="mt-5 text-xl font-medium tracking-tight text-noir-mist">
                      {b.title}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-noir-muted">{b.body}</p>
                    {b.bullets ? (
                      <div className="mt-6 grid gap-2">
                        {b.bullets.map((t) => (
                          <div key={t} className="flex items-start gap-3 text-sm leading-6 text-noir-mist/80">
                            <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/45" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.14}>
              <div className="mt-10 flex flex-wrap gap-2">
                {[`Da €${noir.startingFrom}/notte`, noir.smartAccess, "Jacuzzi privata", "Sauna interna"].map((k) => (
                  <span key={k} className="noir-chip text-noir-mist/80">
                    {k}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 grid gap-3">
                <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">FAQ</div>
                <div className="grid gap-3">
                  {landing.faqs.map((f) => (
                    <details key={f.q} className="noir-panel group px-6 py-5">
                      <summary className="cursor-pointer list-none text-sm font-medium text-noir-mist/85 [&::-webkit-details-marker]:hidden">
                        <div className="flex items-center justify-between gap-6">
                          <span>{f.q}</span>
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/55 transition group-open:bg-white/80" />
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
                <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-7">
                    <div className="noir-panel p-8 sm:p-9">
                      <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                        Approfondisci
                      </div>
                      <div className="mt-5 text-lg font-medium tracking-tight text-noir-mist">
                        Una guida utile prima di prenotare.
                      </div>
                      <div className="mt-5 grid gap-3">
                        {relatedPosts.slice(0, 2).map((p) => (
                          <NoirLink key={p.slug} href={`/blog/${p.slug}`} variant="ghost" className="justify-center sm:justify-start">
                            {p.title}
                          </NoirLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="noir-panel p-8 sm:p-9">
                      <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                        Link rapidi
                      </div>
                      <div className="mt-6 grid gap-3">
                        <NoirLink href={suggestedSuiteHref} variant="primary" className="justify-center">
                          Vedi la suite consigliata
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
                  Prenota diretto su WhatsApp
                </NoirAnchor>
                <NoirLink href="/blog" variant="ghost">
                  Leggi le guide
                </NoirLink>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
