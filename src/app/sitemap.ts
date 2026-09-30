import type { MetadataRoute } from "next";
import { LOCALES, SITE_URL } from "@/data/restaurant";

const staticRoutes = [
  { path: "", priority: 1 },
  { path: "/legal", priority: 0.3 },
  { path: "/privacy", priority: 0.3 },
  { path: "/cookies", priority: 0.3 },
  { path: "/sitemap", priority: 0.2 },
  { path: "/accessibility", priority: 0.2 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languages = {
    en: "/en",
    es: "/es",
    ca: "/ca",
    "x-default": "/en",
  };

  return LOCALES.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${SITE_URL}/${locale}${route.path}`,
      lastModified,
      changeFrequency: ("weekly" as const),
      priority: route.priority,
      alternates: { languages },
    })),
  );
}