import { Check, Gift, Sparkles, type LucideIcon } from "lucide-react";
import { NoirAnchor } from "@/components/ui/noir-anchor";
import { Reveal } from "@/components/motion/reveal";
import { vouchers } from "@/lib/noir";

export function VoucherSection() {
  const featured = vouchers.find((v) => v.highlighted) ?? vouchers[1];
  const priceText = (v: (typeof vouchers)[number]) =>
    v.slug === "custom" ? (v.priceLabel ?? "su misura") : `€${v.price}`;
  return (
    <section id="voucher" className="relative z-10 overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_18%_12%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(900px_circle_at_86%_88%,rgba(236,72,153,0.16),transparent_55%)]" />
      </div>
      <div className="noir-container relative">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-purple-200/90">
                <Gift className="h-3.5 w-3.5" />
                Regalo Euphoria
              </div>
              <h2 className="noir-display max-w-xl text-3xl font-semibold leading-[1.02] text-white sm:text-4xl md:text-5xl">
                Un oggetto si dimentica.
                <br />
                <span className="bg-gradient-to-br from-purple-300 via-fuchsia-300 to-purple-500 bg-clip-text text-transparent">
                  Un voucher lo porti con te.
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300/90 sm:text-lg">
                Regala 3 ore di jacuzzi e sauna, o una notte intera in suite.
                Dedica personalizzata, PDF stampabile, valido 12 mesi.
                Perfetto per mamma, migliore amica, sposa, collega laureato, o chiunque si meriti di staccare.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <NoirAnchor href="/voucher" size="lg" variant="primary">
                  Scegli il voucher
                </NoirAnchor>
                <NoirAnchor
                  href="/collabora"
                  size="md"
                  variant="ghost"
                  className="inline-flex items-center gap-1.5"
                >
                  <Sparkles className="h-4 w-4 text-purple-200" />
                  Premi e benefit aziendali
                </NoirAnchor>
              </div>
              <dl className="mt-9 grid max-w-md grid-cols-3 gap-3 text-sm">
                {[
                  ["Da €90", "Prezzo di partenza"],
                  ["12 mesi", "Di validità"],
                  ["2 persone", "incluse sempre"],
                ].map(([t, d]) => (
                  <div
                    key={t}
                    className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
                  >
                    <dt className="noir-display text-lg font-semibold text-white">{t}</dt>
                    <dd className="mt-1 text-xs leading-relaxed text-zinc-400">{d}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 md:grid-cols-3">
                {vouchers.slice(0, 3).map((v) => {
                  const Icon = v.icon as LucideIcon;
                  const isFeatured = v.slug === featured.slug;
                  return (
                    <article
                      key={v.slug}
                      className={`relative flex flex-col overflow-hidden rounded-3xl border p-6 transition ${
                        isFeatured
                          ? "border-purple-500/30 bg-gradient-to-br from-purple-900/40 via-zinc-900 to-zinc-950 shadow-[0_0_80px_-24px_rgba(168,85,247,0.55)] md:scale-[1.04]"
                          : "border-white/5 bg-white/[0.02] hover:border-white/10"
                      }`}
                    >
                      {isFeatured && (
                        <div className="absolute right-5 top-5 rounded-full bg-purple-500/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-purple-200">
                          più regalato
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div
                          className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur ${v.iconAccent}`}
                        >
                          <Icon className="h-5 w-5" strokeWidth={1.7} />
                        </div>
                        <div className="noir-display text-2xl font-semibold text-white">
                          {priceText(v)}
                        </div>
                      </div>
                      <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                        {v.durationLabel}
                      </div>
                      <h3 className="noir-display mt-1 text-xl font-semibold text-white">
                        {v.name.replace("Euphoria ", "")}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{v.tagline}</p>
                      <ul className="mt-5 space-y-2 text-sm text-zinc-300/90">
                        {v.bullets.slice(0, 3).map((b) => (
                          <li key={b} className="flex items-start gap-2">
                            <span className="mt-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-purple-500/20 text-[9px] text-purple-200">
                              <Check className="h-3 w-3" strokeWidth={2.8} />
                            </span>
                            <span className="leading-snug">{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {v.suggestedFor.map((k) => (
                          <span
                            key={k}
                            className="rounded-full border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-400"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                      <NoirAnchor
                        className="mt-6 w-full"
                        href="/voucher"
                        size="sm"
                        variant={isFeatured ? "primary" : "ghost"}
                      >
                        {v.slug === "custom"
                          ? "Personalizza"
                          : `Regala · ${priceText(v)}`}
                      </NoirAnchor>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
