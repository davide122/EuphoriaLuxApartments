import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AmbientOrchestrator } from "@/components/ambient/ambient-orchestrator";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ClientAnalytics } from "@/components/analytics/client-analytics";
import { noir } from "@/lib/noir";

const noirDisplay = Bodoni_Moda({
  variable: "--font-noir-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const noirUI = Manrope({
  variable: "--font-noir-ui",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(noir.siteUrl),
  title: {
    default: "Euphoria — Luxury experience a Porto Empedocle",
    template: "%s — Euphoria",
  },
  description:
    "Euphoria Luxury Suite a Porto Empedocle: jacuzzi privata, sauna interna, luci immersive e atmosfera romantica. Da 135€ a notte. Smart check-in e smart check-out completamente da soli (tastierino). Prenotazione diretta via WhatsApp.",
  applicationName: "Euphoria",
  alternates: { canonical: "/" },
  robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Euphoria",
    locale: "it_IT",
    title: "Euphoria — Dove il lusso incontra la notte",
    description:
      "Jacuzzi privata, sauna, luci e design. Da 135€ a notte. Smart check-in e smart check-out completamente da soli (tastierino) e prenotazione diretta via WhatsApp a Porto Empedocle.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Euphoria Luxury Suite" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Euphoria",
    description:
      "Private luxury experience a Porto Empedocle: jacuzzi spa, sauna e atmosfera notturna.",
    images: ["/opengraph-image"],
  },
};

export const viewport = {
  themeColor: "#05060a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="it"
      className={`${noirDisplay.variable} ${noirUI.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Script id="data-layer-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];`}
        </Script>
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { send_page_view: false });`}
            </Script>
          </>
        ) : null}
        <SmoothScroll>
          <ClientAnalytics />
          <AmbientOrchestrator />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
