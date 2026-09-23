"use client";

import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { getAnalyticsContext, isWhatsAppHref, trackEvent } from "@/lib/analytics";

export type NoirButtonSize = "sm" | "md" | "lg";

export function NoirAnchor({
  children,
  variant = "ghost",
  size = "md",
  className = "",
  track,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: NoirButtonSize;
  track?: { name: string; params?: Record<string, string | number | boolean | null | undefined> };
}) {
  const base = "noir-button";
  const tone = variant === "primary" ? "noir-button-primary" : "";
  const sizing =
    size === "lg"
      ? "text-base px-6 py-4 rounded-2xl"
      : size === "sm"
        ? "text-xs px-3.5 py-2 rounded-xl"
        : "text-sm px-5 py-3 rounded-2xl";
  const href = typeof props.href === "string" ? props.href : "";

  return (
    <a
      {...props}
      data-analytics-tracked="true"
      className={`${base} ${tone} ${sizing} ${className}`}
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
            ...getAnalyticsContext(e.currentTarget),
            href,
            variant,
            size,
            ...track?.params,
          },
        });
      }}
    >
      {children}
    </a>
  );
}
