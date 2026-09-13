import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { noir } from "@/lib/noir";
import { NoirAnchor } from "@/components/ui/noir-anchor";

export function TopNav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-fuchsia-200/10 bg-[#08040d]/72 backdrop-blur-xl">
      <div className="noir-container">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="group noir-h1 text-2xl text-noir-mist" aria-label="Euphoria Luxury Suite, home">
            Euphoria <span className="ml-1 font-sans text-[9px] tracking-[0.22em] uppercase text-noir-champagne transition group-hover:text-noir-fuchsia">Luxury Suite</span>
          </Link>
          <div className="hidden items-center gap-6 text-xs tracking-[0.22em] uppercase text-noir-mist/55 md:flex">
            <Link href="/#suites" className="transition hover:text-noir-champagne">
              Suites
            </Link>
            <Link href="/#esperienza" className="transition hover:text-noir-champagne">
              Esperienza
            </Link>
            <Link href="/#pacchetti" className="transition hover:text-noir-champagne">
              Pacchetti
            </Link>
            <Link href="/#dove-siamo" className="transition hover:text-noir-champagne">
              Dove siamo
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <NoirAnchor
              href={
                noir.contacts.whatsapp +
                `?text=${encodeURIComponent(
                  "Ciao, vorrei verificare disponibilità per Passion o Infinity. Date: __/__/__ → __/__/__. Siamo in __. Grazie."
                )}`
              }
              target="_blank"
              rel="noreferrer"
              variant="primary"
              className="hidden min-h-10 px-5 py-2 md:inline-flex"
            >
              <CalendarDays className="h-4 w-4" />
              Verifica date
            </NoirAnchor>
            <NoirAnchor
              href={
                noir.contacts.whatsapp +
                `?text=${encodeURIComponent(
                  "Ciao, vorrei verificare disponibilità per Passion o Infinity. Date: __/__/__ → __/__/__. Siamo in __. Grazie."
                )}`
              }
              target="_blank"
              rel="noreferrer"
              variant="primary"
              className="min-h-10 px-4 py-2 md:hidden"
            >
              Prenota
            </NoirAnchor>
          </div>
        </div>
      </div>
    </header>
  );
}
