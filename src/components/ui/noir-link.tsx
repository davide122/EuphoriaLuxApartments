"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { getAnalyticsContext, isWhatsAppHref, trackEvent } from "@/lib/analytics";

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
      data-analytics-tracked="true"
      className={`${base} ${tone} ${className}`}
      onClick={(event) => {
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
            ...getAnalyticsContext(event.currentTarget),
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
