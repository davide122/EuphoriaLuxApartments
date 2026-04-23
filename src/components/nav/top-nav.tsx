import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { noir } from "@/lib/noir";
import { NoirAnchor } from "@/components/ui/noir-anchor";

export function TopNav() {
  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      <div className="noir-container pt-4">
        <div className="noir-panel flex items-center justify-between rounded-full px-4 py-3">
          <Link href="/" className="noir-h1 text-lg text-noir-mist">
            Euphoria
          </Link>
          <div className="hidden items-center gap-6 text-xs tracking-[0.22em] uppercase text-noir-mist/55 md:flex">
            <Link href="/#esperienza" className="transition hover:text-noir-mist">
              Esperienza
            </Link>
            <Link href="/#suites" className="transition hover:text-noir-mist">
              Suites
            </Link>
            <Link href="/#galleria" className="transition hover:text-noir-mist">
              Galleria
            </Link>
            <Link href="/#contatti" className="transition hover:text-noir-mist">
              Contatti
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
              className="hidden rounded-full px-5 py-2.5 md:inline-flex"
            >
              <MessageCircle className="h-4 w-4 text-noir-aqua" />
              Disponibilità
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
              className="rounded-full px-5 py-2.5 md:hidden"
            >
              WhatsApp
            </NoirAnchor>
          </div>
        </div>
      </div>
    </div>
  );
}
