import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { noir } from "@/lib/noir";

export function StickyCta() {
  const whatsappHref =
    noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      "Ciao, vorrei verificare disponibilità. Suite: Passion o Infinity. Date: __/__/__ → __/__/__. Siamo in __. Grazie."
    )}`;
  return (
    <div className="fixed inset-x-0 bottom-4 z-50 px-4 sm:hidden">
      <div className="noir-panel flex items-center justify-between gap-3 rounded-full px-3 py-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="noir-button noir-button-primary flex-1 justify-center rounded-full py-3"
        >
          WhatsApp disponibilità
        </a>
        <Link
          href="/prenota"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5"
          aria-label="Calendario"
        >
          <CalendarDays className="h-5 w-5 text-noir-aqua" />
        </Link>
      </div>
    </div>
  );
}
