import type { Metadata } from "next";
import { TopNav } from "@/components/nav/top-nav";
import { FooterSection } from "@/components/sections/footer";
import { noir, vouchers, type VoucherSlug } from "@/lib/noir";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { VoucherForm } from "@/components/voucher/voucher-form";
import { VoucherFaq } from "@/components/voucher/voucher-faq";
import { PremiumVoucherHero } from "@/components/voucher/premium-hero";
import { PremiumVoucherSteps } from "@/components/voucher/premium-steps";
import { PremiumVoucherCards } from "@/components/voucher/premium-cards";
import { PremiumVoucherCTA } from "@/components/voucher/premium-cta";

export const metadata: Metadata = {
  title: `Voucher Regalo Spa Privata · Euphoria Porto Empedocle`,
  description:
    "Voucher regalo Euphoria: 3 ore, una notte o un pacchetto personalizzato. Jacuzzi privata, sauna interna, prosecco e zero pubblico. Da 90€, valido 12 mesi, dedica inclusa.",
  alternates: { canonical: "/voucher" },
  openGraph: {
    title: `Voucher Regalo Spa Privata · Euphoria Porto Empedocle`,
    description:
      "Regala Euphoria: voucher 90€ / 150€ / 170€ o personalizzato. Jacuzzi, sauna, prosecco. Dedica inclusa, valido 12 mesi.",
    url: `${noir.siteUrl}/voucher`,
    type: "website",
    siteName: noir.name,
    images: [{ url: "/social/euphoria-home-v3.jpg", width: 1200, height: 630, alt: "Voucher Euphoria" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Voucher Regalo Spa Privata · Euphoria Porto Empedocle`,
    description:
      "Regala Euphoria: voucher 90€ / 150€ / 170€ o personalizzato. Jacuzzi, sauna, prosecco.",
    images: ["/social/euphoria-home-v3.jpg"],
  },
};

function priceText(v: (typeof vouchers)[number]) {
  if (v.slug === "custom") return v.priceLabel ?? "su misura";
  return `€${v.price}`;
}

export default async function VoucherPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Voucher regalo Euphoria Luxury Suite",
    itemListElement: vouchers
      .filter((v) => v.slug !== "custom")
      .map((v, i) => ({
        "@type": "Product",
        position: i + 1,
        name: v.name,
        description: v.tagline,
        sku: `EUPH-VOUCHER-${(v.slug as VoucherSlug).toUpperCase()}`,
        brand: { "@type": "Brand", name: noir.name },
        image: [
          v.suggestedSuite === "infinity"
            ? `${noir.siteUrl}/infinity-letto.jpg`
            : `${noir.siteUrl}/passion-letto-jacuzzi-sauna.jpg`,
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: v.price,
          availability: "https://schema.org/InStock",
          url: `${noir.siteUrl}/voucher`,
          seller: {
            "@type": "LodgingBusiness",
            name: noir.name,
            address: noir.address,
            telephone: noir.contacts.phone,
            url: noir.siteUrl,
          },
        },
      })),
  };
  return (
    <div className="relative flex min-h-[100svh] flex-col overflow-clip">
      <TopNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <main className="relative flex-1 pt-28">
        <PremiumVoucherHero />
        <PremiumVoucherSteps />
        <section id="scegli" className="relative z-10 py-16 sm:py-24" style={{ position: "relative" }}>
          <div className="noir-container">
            <PremiumVoucherCards />
          </div>
        </section>

        <section id="dedica" className="relative z-10 border-t border-white/5 bg-zinc-950/40 py-16 sm:py-20" style={{ position: "relative" }}>
          <div className="noir-container">
            <div className="mx-auto max-w-3xl">
              <div className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-purple-200/70">
                Dedica
              </div>
              <h2 className="noir-display text-center text-3xl font-semibold text-white sm:text-4xl">
                Componiamo il tuo voucher.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-400">
                Scegli la taglia, scrivi da chi è e a chi è rivolto, una frase. Il resto lo vediamo su WhatsApp
                (pagamento Stripe o bonifico — come preferisci).
              </p>
            </div>
            <div className="mt-10">
              <VoucherForm />
            </div>
          </div>
        </section>

        <section className="relative z-10 py-16 sm:py-20" style={{ position: "relative" }}>
          <div className="noir-container">
            <VoucherFaq />
          </div>
        </section>

        <PremiumVoucherCTA />
      </main>
      <FooterSection />
    </div>
  );
}
