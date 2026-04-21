"use client";

import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { isWhatsAppHref, trackEvent } from "@/lib/analytics";

export function NoirAnchor({
  children,
  variant = "ghost",
  className = "",
  track,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost";
  track?: { name: string; params?: Record<string, string | number | boolean | null | undefined> };
}) {
  const base = "noir-button";
  const tone = variant === "primary" ? "noir-button-primary" : "";
  const href = typeof props.href === "string" ? props.href : "";

  return (
    <a
      {...props}
      className={`${base} ${tone} ${className}`}
      onClick={(e) => {
        props.onClick?.(e);
        if (e.defaultPrevented) return;
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
    </a>
  );
}
