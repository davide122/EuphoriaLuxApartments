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
import { BLOG_POSTS, BLOG_POSTS_BY_SLUG, SEO_LANDINGS_BY_SLUG } from "@/lib/seo-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS_BY_SLUG[slug];
  if (!post) return { robots: { index: false, follow: false } };

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.metaDescription,
      siteName: noir.name,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
  };
}

function jsonLdForArticle(args: {
  url: string;
  imageUrl: string;
  headline: string;
  description: string;
  datePublishedISO: string;
  dateModifiedISO?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": args.url,
    },
    headline: args.headline,
    description: args.description,
    image: [args.imageUrl],
    datePublished: args.datePublishedISO,
    dateModified: args.dateModifiedISO ?? args.datePublishedISO,
    author: { "@type": "Organization", name: `${noir.name} Luxury Suite` },
    publisher: { "@type": "Organization", name: `${noir.name} Luxury Suite` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS_BY_SLUG[slug];
  if (!post) notFound();

  const pageUrl = `${noir.siteUrl}/blog/${post.slug}`;
  const imageUrl = `${noir.siteUrl}${post.heroImage.src}`;
  const crumbs = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Guide" },
    { href: `/blog/${post.slug}`, label: post.title },
  ];
  const relatedLandings = (post.relatedLandingSlugs ?? [])
    .map((s) => SEO_LANDINGS_BY_SLUG[s])
    .filter(Boolean);
  const whatsappHref =
    noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      `Ciao, arrivo da una guida (${post.primaryKeyword}). Vorrei verificare disponibilità. Date: __/__/__ → __/__/__. Siamo in __. Grazie.`
    )}`;

  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <TopNav />
      <main className="relative flex-1 pt-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              jsonLdForArticle({
                url: pageUrl,
                imageUrl,
                headline: post.title,
                description: post.metaDescription,
                datePublishedISO: post.datePublishedISO,
                dateModifiedISO: post.dateModifiedISO,
              }),
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
                      eyebrow="Guida"
                      title={post.title}
                      description={post.excerpt}
                    />
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                      <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
                        Verifica disponibilità su WhatsApp
                      </NoirAnchor>
                      <NoirLink href="/blog" variant="ghost">
                        Tutte le guide
                      </NoirLink>
                    </div>
                  </div>
                  <div className="lg:col-span-6">
                    <MediaFrame
                      label={post.primaryKeyword}
                      tone="night"
                      src={post.heroImage.src}
                      alt={post.heroImage.alt}
                      className="aspect-[16/10]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="grid gap-6">
                  {post.sections.map((s, idx) => (
                    <Reveal key={s.title} delay={0.04 + idx * 0.03}>
                      <div className="noir-panel p-8 sm:p-9">
                        <div className="text-xl font-medium tracking-tight text-noir-mist">
                          {s.title}
                        </div>
                        <p className="mt-4 text-sm leading-6 text-noir-muted">{s.body}</p>
                        {s.bullets ? (
                          <div className="mt-6 grid gap-2">
                            {s.bullets.map((t) => (
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

                <Reveal delay={0.16}>
                  <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
                      Prenota diretto su WhatsApp
                    </NoirAnchor>
                    <NoirLink href="/suites" variant="ghost">
                      Vedi le suites
                    </NoirLink>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-4">
                <Reveal delay={0.10}>
                  <div className="noir-panel p-8 sm:p-9">
                    <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                      Info rapide
                    </div>
                    <div className="mt-6 grid gap-2">
                      {[
                        `Da €${noir.startingFrom}/notte`,
                        "Jacuzzi privata",
                        "Sauna interna",
                        "Cucina completa con forno",
                        "Wi‑Fi e condizionatori",
                        noir.smartAccess,
                      ].map((k) => (
                        <div key={k} className="flex items-start gap-3 text-sm leading-6 text-noir-mist/80">
                          <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/45" />
                          <span>{k}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {relatedLandings.length ? (
                  <Reveal delay={0.14}>
                    <div className="mt-6 noir-panel p-8 sm:p-9">
                      <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                        Pagine utili
                      </div>
                      <div className="mt-6 grid gap-3">
                        {relatedLandings.slice(0, 3).map((l) => (
                          <NoirLink key={l.slug} href={`/${l.slug}`} variant="ghost" className="justify-center lg:justify-start">
                            {l.title}
                          </NoirLink>
                        ))}
                        <NoirLink href="/suites" variant="primary" className="justify-center">
                          Vedi Passion e Infinity
                        </NoirLink>
                      </div>
                    </div>
                  </Reveal>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
