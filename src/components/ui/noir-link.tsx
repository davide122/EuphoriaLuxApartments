"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { isWhatsAppHref, trackEvent } from "@/lib/analytics";

export function NoirLink({
  href,
  children,
  variant = "ghost",
  className = "",
  track,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  track?: { name: string; params?: Record<string, string | number | boolean | null | undefined> };
}) {
  const base = "noir-button";
  const tone = variant === "primary" ? "noir-button-primary" : "";

  return (
    <Link
      href={href}
      className={`${base} ${tone} ${className}`}
      onClick={() => {
        const eventName =
          track?.name ??
          (isWhatsAppHref(href)
            ? "whatsapp_click"
            : variant === "primary"
              ? "cta_click"
              : "link_click");
        trackEvent({
          name: eventName,
          params: {
            href,
            variant,
            ...track?.params,
          },
        });
      }}
    >
      {children}
    </Link>
  );
}
