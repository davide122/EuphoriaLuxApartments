import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopNav } from "@/components/nav/top-nav";
import { FooterSection } from "@/components/sections/footer";
import { Reveal } from "@/components/motion/reveal";
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

  const landingKeywords = (post.relatedLandingSlugs ?? [])
    .map((s) => SEO_LANDINGS_BY_SLUG[s])
    .filter(Boolean)
    .flatMap((l) => [l.primaryKeyword, l.title]);
  const keywords = Array.from(
    new Set([
      post.primaryKeyword,
      "SPA privata",
      "jacuzzi privata",
      "sauna interna",
      "Porto Empedocle",
      "Agrigento",
      noir.location,
      ...landingKeywords,
    ])
  ).slice(0, 14);

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.metaDescription,
      siteName: noir.name,
      locale: "it_IT",
      images: [
        { url: `/blog/${post.slug}/opengraph-image`, width: 1200, height: 630, alt: post.heroImage.alt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [`/blog/${post.slug}/opengraph-image`],
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
  keywords?: string[];
}) {
  const orgName = `${noir.name} Luxury Suite`;
  const logoUrl = `${noir.siteUrl}/android-chrome-512x512.png`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": args.url,
    },
    headline: args.headline,
    description: args.description,
    inLanguage: "it-IT",
    image: [args.imageUrl],
    datePublished: args.datePublishedISO,
    dateModified: args.dateModifiedISO ?? args.datePublishedISO,
    keywords: args.keywords?.join(", "),
    author: { "@type": "Organization", name: orgName, url: noir.siteUrl, logo: { "@type": "ImageObject", url: logoUrl } },
    publisher: { "@type": "Organization", name: orgName, url: noir.siteUrl, logo: { "@type": "ImageObject", url: logoUrl } },
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
  const landingSlugSet = new Set(post.relatedLandingSlugs ?? []);
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug)
    .map((p) => {
      const overlap = (p.relatedLandingSlugs ?? []).reduce((acc, s) => acc + (landingSlugSet.has(s) ? 1 : 0), 0);
      const score = overlap + (p.primaryKeyword === post.primaryKeyword ? 1 : 0);
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.p.datePublishedISO.localeCompare(a.p.datePublishedISO);
    })
    .map((x) => x.p);
  const landingKeywords = relatedLandings.flatMap((l) => [l.primaryKeyword, l.title]);
  const keywords = Array.from(
    new Set([
      post.primaryKeyword,
      "SPA privata",
      "jacuzzi privata",
      "sauna interna",
      "Porto Empedocle",
      "Agrigento",
      noir.location,
      ...landingKeywords,
    ])
  ).slice(0, 14);
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
                keywords,
              }),
              breadcrumbJsonLd({ baseUrl: noir.siteUrl, items: crumbs }),
            ]),
          }}
        />

        <section data-ambient="noir" className="relative z-10 py-16 sm:py-20">
          <div className="noir-container">
            <Breadcrumbs items={crumbs} />
            <Reveal>
              <div className="overflow-hidden border-y border-fuchsia-100/15 py-10 sm:py-14">
                <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-6">
                    <div className="euphoria-kicker">Journal · {post.primaryKeyword}</div>
                    <h1 className="noir-h1 mt-6 text-5xl leading-[0.94] text-noir-mist sm:text-6xl lg:text-7xl">
                      {post.title}
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-7 text-noir-muted">{post.excerpt}</p>
                    <time dateTime={post.datePublishedISO} className="mt-6 block text-[10px] uppercase tracking-[0.24em] text-noir-mist/40">
                      {new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "long", year: "numeric" }).format(new Date(post.datePublishedISO))}
                    </time>
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                      <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
                        Chiedi le tue date
                      </NoirAnchor>
                      <NoirLink href="/blog" variant="ghost">
                        Torna al journal
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

            <div className="mt-20 grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <article className="grid gap-0">
                  {post.sections.map((s, idx) => (
                    <Reveal key={s.title} delay={0.04 + idx * 0.03}>
                      <section className="border-t border-white/10 py-10 sm:py-12">
                        <div className="text-[10px] uppercase tracking-[0.24em] text-noir-fuchsia/70">{String(idx + 1).padStart(2, "0")}</div>
                        <h2 className="noir-h1 mt-4 text-3xl leading-tight text-noir-mist sm:text-4xl">
                          {s.title}
                        </h2>
                        <p className="mt-6 text-base leading-8 text-noir-muted sm:text-lg">{s.body}</p>
                        {s.bullets ? (
                          <ul className="mt-7 grid gap-3 border-l border-noir-violet/30 pl-6">
                            {s.bullets.map((t) => (
                              <li key={t} className="text-base leading-7 text-noir-mist/78">{t}</li>
                            ))}
                          </ul>
                        ) : null}
                      </section>
                    </Reveal>
                  ))}
                </article>

                <Reveal delay={0.16}>
                  <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <NoirAnchor href={whatsappHref} target="_blank" rel="noreferrer" variant="primary">
                      Chiedi disponibilità
                    </NoirAnchor>
                    <NoirLink href="/suites" variant="ghost">
                      Confronta Passion e Infinity
                    </NoirLink>
                  </div>
                </Reveal>

                {relatedPosts.length ? (
                  <Reveal delay={0.20}>
                    <div className="mt-12 border-t border-fuchsia-100/15 pt-9">
                      <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                        Guide correlate
                      </div>
                      <div className="mt-6 grid gap-1">
                        {relatedPosts.slice(0, 5).map((p) => (
                          <NoirLink key={p.slug} href={`/blog/${p.slug}`} variant="ghost" className="justify-start border-x-0 border-b-0 border-t border-white/10 px-0 text-left">
                            {p.title}
                          </NoirLink>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ) : null}
              </div>

              <aside className="lg:col-span-4">
                <Reveal delay={0.10}>
                  <div className="border-l border-noir-fuchsia/25 pl-7 lg:sticky lg:top-28">
                    <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                      Info rapide
                    </div>
                    <div className="mt-6 grid gap-3">
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
                    <div className="mt-10 border-l border-noir-violet/25 pl-7">
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
              </aside>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
