import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import { SITE_URL } from "@/data/restaurant";
import { isLocale } from "@/lib/i18n";
import "../globals.css";
import { SmoothAnchorScroll } from "@/components/SmoothAnchorScroll";

/**
 * Two families, and only these two.
 *
 * Sora is the display face — heavy weights, tight tracking, and enough
 * personality to carry 100px headlines. Manrope handles everything else.
 *
 * The earlier build paired a light serif (Cormorant) with Inter and a Mincho
 * face. That is a fine-dining voice; this brief asks for a contemporary
 * editorial one, and a serif-led page cannot hit the type scale specified.
 */
const display = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

/* -------------------------------------------------------------------------- */
/*  Site-wide metadata defaults                                                 */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Konkai Sushi House — Japanese restaurant in Barcelona",
    template: "%s | Konkai Sushi House",
  },
  applicationName: "Konkai Sushi House",
  authors: [{ name: "Konkai Sushi House" }],
  creator: "Konkai Sushi House",
  publisher: "Konkai Sushi House",
  formatDetection: { telephone: true, address: true },
  // Canonical URLs, hreflang, and per-language Open Graph data are set by
  // the page's generateMetadata, so they are not repeated here.
  openGraph: {
    type: "website",
    siteName: "Konkai Sushi House",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "restaurant",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf8f2" },
    { media: "(prefers-color-scheme: dark)", color: "#16150f" },
  ],
  colorScheme: "light",
};

/* -------------------------------------------------------------------------- */

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Only three languages exist, so an unrecognised one cannot reach the shell.
  const lang = isLocale(locale) ? locale : "en";

  return (
    <html lang={lang} className={`${display.variable} ${body.variable}`}>
      <body>
        {children}
        <SmoothAnchorScroll />
      </body>
    </html>
  );
}
