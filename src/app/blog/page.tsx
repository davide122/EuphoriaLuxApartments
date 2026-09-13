import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TopNav } from "@/components/nav/top-nav";
import { FooterSection } from "@/components/sections/footer";
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
      <main className="relative flex-1 pt-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlogIndex()) }}
        />
        <section data-ambient="noir" className="relative z-10 py-16 sm:py-20">
          <div className="noir-container">
            <Reveal>
              <SectionHeader
                eyebrow="Journal"
                title="Idee per una notte che vale il viaggio."
                description="Luoghi, dettagli e consigli utili per scegliere bene e arrivare senza pensieri."
              />
            </Reveal>

            {BLOG_POSTS[0] ? (
              <Reveal delay={0.05}>
                <Link
                  href={`/blog/${BLOG_POSTS[0].slug}`}
                  className="group relative mt-14 block min-h-[68svh] overflow-hidden rounded-[2rem_2rem_10rem_2rem]"
                >
                  <Image
                    src={BLOG_POSTS[0].heroImage.src}
                    alt={BLOG_POSTS[0].heroImage.alt}
                    fill
                    priority
                    sizes="(max-width: 1440px) 92vw, 1320px"
                    className="object-cover transition duration-[1400ms] group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,3,9,.08),rgba(6,3,9,.26)_38%,rgba(6,3,9,.95))]" />
                  <div className="absolute inset-x-0 bottom-0 max-w-4xl p-8 sm:p-12 lg:p-16">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-noir-champagne">In evidenza · {BLOG_POSTS[0].primaryKeyword}</div>
                    <h2 className="noir-h1 mt-5 text-4xl leading-[0.96] text-white sm:text-6xl lg:text-7xl">
                      {BLOG_POSTS[0].title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-white/72">{BLOG_POSTS[0].excerpt}</p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm text-white">
                      Leggi la guida <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ) : null}

            <div className="mt-20">
              <div className="mb-5 text-[10px] uppercase tracking-[0.28em] text-noir-mist/45">Tutte le guide</div>
              {BLOG_POSTS.slice(1).map((p, idx) => (
                <Reveal key={p.slug} delay={0.02 + Math.min(idx, 5) * 0.02}>
                  <Link href={`/blog/${p.slug}`} className="group grid gap-5 border-t border-white/10 py-8 transition hover:border-noir-fuchsia/40 sm:grid-cols-12 sm:items-center">
                    <div className="text-[10px] text-noir-mist/35 sm:col-span-1">{String(idx + 2).padStart(2, "0")}</div>
                    <div className="sm:col-span-3 text-[10px] uppercase tracking-[0.22em] text-noir-champagne/65">{p.primaryKeyword}</div>
                    <div className="sm:col-span-7">
                      <h2 className="noir-h1 text-2xl leading-tight text-noir-mist transition group-hover:text-noir-champagne sm:text-3xl">{p.title}</h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-noir-muted">{p.excerpt}</p>
                    </div>
                    <ArrowUpRight className="hidden h-5 w-5 text-noir-fuchsia transition group-hover:translate-x-1 group-hover:-translate-y-1 sm:col-span-1 sm:block" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
