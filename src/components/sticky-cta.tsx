"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { noir } from "@/lib/noir";

export function StickyCta() {
  const [visible, setVisible] = useState(false);
  const whatsappHref =
    noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      "Ciao, vorrei verificare disponibilità. Suite: Passion o Infinity. Date: __/__/__ → __/__/__. Siamo in __. Grazie."
    )}`;

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 180);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "fixed inset-x-0 bottom-4 z-50 px-4 sm:hidden transition duration-300",
        visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2",
      ].join(" ")}
    >
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
          href="/suites"
          className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-xs tracking-[0.22em] uppercase text-noir-mist/80"
          aria-label="Suites"
        >
          Suites
        </Link>
      </div>
    </div>
  );
}
