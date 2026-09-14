import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ClientAnalytics } from "@/components/analytics/client-analytics";
import { VercelAnalytics } from "@/components/analytics/vercel-analytics";
import { noir } from "@/lib/noir";
import { openGraphImage, socialImages } from "@/lib/social";

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
    default: "Suite con SPA privata a Porto Empedocle | Euphoria",
    template: "%s — Euphoria",
  },
  description:
    "Due suite romantiche con jacuzzi e sauna private a Porto Empedocle, vicino Agrigento. Self check-in, cucina, Netflix e aperitivo. Da 150€ a coppia.",
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
    title: "Suite con SPA privata a Porto Empedocle | Euphoria",
    description:
      "Suite romantiche vicino Agrigento con jacuzzi e sauna ad uso esclusivo, self check-in e aperitivo incluso. Da 150€ a coppia.",
    images: [openGraphImage(socialImages.home, "Euphoria Luxury Suite con SPA privata")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suite con SPA privata a Porto Empedocle | Euphoria",
    description:
      "Due suite romantiche vicino Agrigento con jacuzzi, sauna e privacy totale.",
    images: [socialImages.home],
  },
};

export const viewport = {
  themeColor: "#060309",
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
          {children}
        </SmoothScroll>
        <VercelAnalytics />
      </body>
    </html>
  );
}
