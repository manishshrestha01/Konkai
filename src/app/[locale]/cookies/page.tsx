import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ui } from "@/data/ui";
import { isLocale } from "@/lib/i18n";
import { Footer } from "@/components/Footer";
import { ButtonLink } from "@/components/Button";
import { links } from "@/data/restaurant";

const TITLE: Record<string, string> = {
  en: "Cookie notice | Konkai Sushi House",
  es: "Aviso de cookies | Konkai Sushi House",
  ca: "Avís de galetes | Konkai Sushi House",
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
    // A policy page carries no search intent; keep it out of the index and
    // follow the language alternates declared on the homepage.
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${locale}/cookies`,
      languages: {
        en: "/en/cookies",
        es: "/es/cookies",
        ca: "/ca/cookies",
      },
    },
  };
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = ui[locale];
  const c = t.cookies;
  const sections = [
    { title: c.mapTitle, body: c.mapBody },
    { title: c.widgetTitle, body: c.widgetBody },
    { title: c.thirdPartyTitle, body: c.thirdPartyBody },
    { title: c.contactTitle, body: c.contactBody },
  ];

  return (
    <>
      <main id="main" className="bg-paper">
        <div className="container-prose pt-32 pb-24 lg:pt-44 lg:pb-32">
          <p className="eyebrow">Konkai Sushi House</p>
          <h1 className="mt-5 text-[clamp(2.2rem,6vw,3.75rem)] leading-[1.05] text-ink">
            {c.title}
          </h1>
          <p className="mt-7 max-w-2xl text-[1.05rem] leading-[1.8] text-ink-soft">
            {c.intro}
          </p>

          <div className="mt-14 space-y-10 border-t border-line-soft pt-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-display text-[1.4rem] leading-snug text-ink">
                  {s.title}
                </h2>
                <p className="mt-3 max-w-2xl text-[0.98rem] leading-[1.8] text-ink-mute">
                  {s.body}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-3 border-t border-line-soft pt-10">
            <ButtonLink href={`/${locale}`} variant="solid" size="md">
              {t.footer.explore}
            </ButtonLink>
            <ButtonLink href={links.privacy.value} variant="outline" size="md">
              {t.footer.legal}
            </ButtonLink>
          </div>
        </div>
      </main>

      <Footer locale={locale} t={t} />
    </>
  );
}
