import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TopNav } from "@/components/nav/top-nav";
import { FooterSection } from "@/components/sections/footer";
import { FinalCtaSection } from "@/components/sections/final-cta";
import { StickyCta } from "@/components/sticky-cta";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { noir } from "@/lib/noir";
import { BLOG_POSTS } from "@/lib/seo-content";

function jsonLdBlogIndex() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${noir.siteUrl}/blog#collection`,
    name: `Guide & Idee — ${noir.name}`,
    url: `${noir.siteUrl}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: BLOG_POSTS.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${noir.siteUrl}/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };
}

export const metadata: Metadata = {
  title: `Guide & Idee — ${noir.name}`,
  description:
    "Guide concrete per coppie: weekend romantici, suite con jacuzzi privata e sauna, e consigli pratici per prenotare in modo diretto.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    siteName: noir.name,
    locale: "it_IT",
    title: `Guide & Idee — ${noir.name}`,
    description:
      "Guide concrete per coppie: weekend romantici, suite con jacuzzi privata e sauna, e consigli pratici per prenotare in modo diretto.",
    images: [{ url: "/blog/opengraph-image", width: 1200, height: 630, alt: `Guide & Idee — ${noir.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Guide & Idee — ${noir.name}`,
    description:
      "Guide concrete per coppie: weekend romantici, suite con jacuzzi privata e sauna, e consigli pratici per prenotare in modo diretto.",
    images: ["/blog/opengraph-image"],
  },
};

export default function BlogIndexPage() {
  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <TopNav />
      <main className="relative flex-1 pt-[72px]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlogIndex()) }}
        />
        <section data-ambient="noir" className="editorial-canvas relative z-10 overflow-hidden pb-20 pt-8 sm:pb-28 sm:pt-12">
          <div className="noir-container">
            <Reveal>
              <div className="editorial-hero relative overflow-hidden rounded-2xl px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
                <div className="pointer-events-none absolute -right-6 -top-16 select-none font-display text-[13rem] leading-none text-white/[0.025] sm:text-[18rem]" aria-hidden="true">J</div>
                <SectionHeader
                  eyebrow="Journal Euphoria"
                  title="Idee per una notte che vale il viaggio."
                  description="Luoghi, dettagli e consigli utili per scegliere bene e arrivare senza pensieri."
                />
              </div>
            </Reveal>

            {BLOG_POSTS[0] ? (
              <Reveal delay={0.05}>
                <Link
                  href={`/blog/${BLOG_POSTS[0].slug}`}
                  className="group relative mt-5 block min-h-[70svh] overflow-hidden rounded-2xl border border-white/10 shadow-[0_32px_90px_rgba(0,0,0,.38)] sm:mt-8 sm:min-h-[68svh]"
                >
                  <Image
                    src={BLOG_POSTS[0].heroImage.src}
                    alt={BLOG_POSTS[0].heroImage.alt}
                    fill
                    priority
                    sizes="(max-width: 1440px) 92vw, 1320px"
                    className="object-cover transition duration-[1400ms] group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,3,9,.08),rgba(6,3,9,.30)_32%,rgba(6,3,9,.98))]" />
                  <div className="absolute inset-x-0 bottom-0 max-w-4xl p-6 pb-8 sm:p-12 lg:p-16">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-noir-champagne">In evidenza · {BLOG_POSTS[0].primaryKeyword}</div>
                    <h2 className="noir-h1 mt-4 text-[2.65rem] leading-[0.94] text-white sm:mt-5 sm:text-6xl lg:text-7xl">
                      {BLOG_POSTS[0].title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-white/72">{BLOG_POSTS[0].excerpt}</p>
                    <span className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm text-white">
                      Leggi la guida <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ) : null}

            <div className="mt-16 sm:mt-20">
              <div className="mb-6 flex items-end justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <div className="euphoria-kicker">Esplora</div>
                  <h2 className="noir-h1 mt-3 text-3xl text-noir-mist sm:text-4xl">Tutte le guide</h2>
                </div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-noir-mist/40">{BLOG_POSTS.length - 1} storie</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BLOG_POSTS.slice(1).map((p, idx) => (
                <Reveal key={p.slug} delay={0.02 + Math.min(idx, 5) * 0.02}>
                  <Link href={`/blog/${p.slug}`} className="editorial-card group flex h-full min-h-[420px] cursor-pointer flex-col overflow-hidden rounded-2xl transition duration-300 hover:border-noir-fuchsia/35">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={p.heroImage.src} alt={p.heroImage.alt} fill sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 46vw, 30vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0510] via-transparent to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between gap-3 text-[9px] uppercase tracking-[0.2em] text-noir-champagne/65">
                        <span>{p.primaryKeyword}</span><span className="text-white/30">{String(idx + 2).padStart(2, "0")}</span>
                      </div>
                      <h3 className="noir-h1 mt-4 text-2xl leading-tight text-noir-mist transition group-hover:text-noir-champagne">{p.title}</h3>
                      <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-6 text-noir-muted">{p.excerpt}</p>
                      <span className="mt-auto flex min-h-11 items-end gap-2 pt-6 text-sm text-white">Leggi la guida <ArrowRight className="mb-0.5 h-4 w-4 transition group-hover:translate-x-1" /></span>
                    </div>
                  </Link>
                </Reveal>
              ))}
              </div>
            </div>
          </div>
        </section>
        <FinalCtaSection />
      </main>
      <FooterSection />
      <StickyCta revealAfter={420} />
    </div>
  );
}
