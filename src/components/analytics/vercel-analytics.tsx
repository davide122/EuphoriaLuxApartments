"use client";

import { Analytics } from "@vercel/analytics/next";

export function VercelAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        const pathname = new URL(event.url, window.location.origin).pathname;
        if (pathname.startsWith("/admin") || pathname.startsWith("/ospiti")) return null;
        return event;
      }}
    />
  );
}
