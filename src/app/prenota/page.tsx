import type { Metadata } from "next";
import { TopNav } from "@/components/nav/top-nav";
import { FooterSection } from "@/components/sections/footer";
import { Reveal } from "@/components/motion/reveal";
import { BookingWidget } from "@/components/booking/booking-widget";
import { noir } from "@/lib/noir";

export const metadata: Metadata = {
  title: `Calendario & Richiesta prenotazione | ${noir.name}`,
  description:
    "Seleziona le date e verifica disponibilità. Prenotazione diretta via WhatsApp per Passion e Infinity a Porto Empedocle: jacuzzi privata e sauna interna.",
  alternates: { canonical: "/prenota" },
};

export default async function PrenotaPage({
  searchParams,
}: {
  searchParams?: Promise<{ suite?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <TopNav />
      <main className="relative flex-1 pt-28">
        <section data-ambient="noir" className="relative z-10 py-16 sm:py-20">
          <div className="noir-container">
            <Reveal>
              <BookingWidget initialSuite={sp.suite ?? null} />
            </Reveal>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
