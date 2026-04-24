import type { Metadata } from "next";
import { TopNav } from "@/components/nav/top-nav";
import { FooterSection } from "@/components/sections/footer";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { NoirLink } from "@/components/ui/noir-link";
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
                eyebrow="Blog"
                title="Guide che portano a prenotare."
                description="Contenuti utili e concreti: niente articoli generici, solo scelte e idee che servono davvero a coppie e viaggiatori."
              />
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {BLOG_POSTS.map((p, idx) => (
                <Reveal key={p.slug} delay={0.04 + idx * 0.04}>
                  <div className="noir-panel p-8 sm:p-9">
                    <div className="text-xs tracking-[0.26em] uppercase text-noir-mist/55">
                      {p.primaryKeyword}
                    </div>
                    <div className="mt-5 text-2xl font-medium tracking-tight text-noir-mist">
                      {p.title}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-noir-muted">{p.excerpt}</p>
                    <div className="mt-7">
                      <NoirLink href={`/blog/${p.slug}`} variant="primary">
                        Leggi la guida
                      </NoirLink>
                    </div>
                  </div>
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
