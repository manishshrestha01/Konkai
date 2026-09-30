import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ui } from "@/data/ui";
import { isLocale } from "@/lib/i18n";
import { PageShell } from "@/components/PageShell";
import { ArrowUpRight } from "@/components/Icons";

const TITLE: Record<string, string> = {
  en: "Sitemap | Konkai Sushi House",
  es: "Mapa del sitio | Konkai Sushi House",
  ca: "Mapa del lloc | Konkai Sushi House",
};

export function generateStaticParams() {
  return ["en", "es", "ca"].map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: TITLE[locale],
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${locale}/sitemap`,
      languages: {
        en: "/en/sitemap",
        es: "/es/sitemap",
        ca: "/ca/sitemap",
      },
    },
  };
}

export default async function SitemapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = ui[locale];
  const s = t.sitemapPage;

  const groups = [
    {
      title: s.mainTitle,
      items: [
        { href: `/${locale}`, label: s.home },
        { href: `/${locale}#menu`, label: t.nav.menu },
        { href: `/${locale}#dishes`, label: t.nav.dishes },
        { href: `/${locale}#restaurant`, label: t.nav.restaurant },
        { href: `/${locale}#reviews`, label: t.nav.reviews },
        { href: `/${locale}#gallery`, label: t.nav.gallery },
        { href: `/${locale}#location`, label: t.nav.location },
        { href: `/${locale}#reserve`, label: t.nav.reserve },
      ],
    },
    {
      title: s.infoTitle,
      items: [
        { href: `/${locale}/accessibility`, label: t.accessibility.title },
        { href: `/${locale}/sitemap`, label: s.title },
      ],
    },
    {
      title: s.legalTitle,
      items: [
        { href: `/${locale}/legal`, label: t.legal.title },
        { href: `/${locale}/privacy`, label: t.privacy.title },
        { href: `/${locale}/cookies`, label: s.cookies },
      ],
    },
  ];

  return (
    <PageShell locale={locale} t={t} eyebrow={t.footer.explore} title={s.title} intro={s.intro}>
      {groups.map((group) => (
        <section key={group.title}>
          <h2 className="font-display text-[1.4rem] leading-snug text-ink">{group.title}</h2>
          <ul className="mt-4 max-w-2xl space-y-1">
            {group.items.map((item) => (
              <li key={item.href + item.label}>
                <a
                  href={item.href}
                  className="group inline-flex min-h-11 items-center gap-2 text-[0.98rem] text-ink-mute transition-colors duration-300 hover:text-ink"
                >
                  <span className="link-wipe">{item.label}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </PageShell>
  );
}
