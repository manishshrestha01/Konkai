import type { MetadataRoute } from "next";
import { LOCALES, SITE_URL } from "@/data/restaurant";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

/** Language alternates are declared per route; this export is for clarity. */
export const supportedLocales = LOCALES;
