"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { noir } from "@/lib/noir";

export function StickyCta({
  href,
  label = "Verifica disponibilità",
  revealAfter = 620,
}: {
  href?: string;
  label?: string;
  revealAfter?: number;
} = {}) {
  const [visible, setVisible] = useState(false);
  const whatsappHref = href ??
    (noir.contacts.whatsapp +
    `?text=${encodeURIComponent(
      "Ciao, vorrei verificare disponibilità. Suite: Passion o Infinity. Date: __/__/__ → __/__/__. Siamo in __. Grazie."
    )}`);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > revealAfter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealAfter]);

  return (
    <div
      className={[
        "fixed inset-x-0 bottom-3 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)] sm:hidden transition duration-300",
        visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2",
      ].join(" ")}
    >
      <div className="w-full max-w-sm rounded-full border border-white/15 bg-[#120819]/92 p-1.5 shadow-2xl shadow-black/45 backdrop-blur-xl">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="noir-button noir-button-primary w-full justify-center rounded-full py-3"
        >
          <MessageCircle className="h-4 w-4" />
          {label}
        </a>
      </div>
    </div>
  );
}
