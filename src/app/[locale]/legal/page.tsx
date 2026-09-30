import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ui } from "@/data/ui";
import { isLocale } from "@/lib/i18n";
import { links } from "@/data/restaurant";
import { PageShell, PolicySection, Clause } from "@/components/PageShell";
import { ButtonLink } from "@/components/Button";

const TITLE: Record<string, string> = {
  en: "Legal notice | Konkai Sushi House",
  es: "Aviso legal | Konkai Sushi House",
  ca: "Avís legal | Konkai Sushi House",
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
    alternates: {
      canonical: `/${locale}/legal`,
      languages: {
        en: "/en/legal",
        es: "/es/legal",
        ca: "/ca/legal",
      },
    },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = ui[locale];
  const l = t.legal;

  return (
    <PageShell
      locale={locale}
      t={t}
      eyebrow={l.siteLabel}
      title={l.title}
      intro={l.intro}
      actions={
        <>
          <ButtonLink href={`/${locale}`} variant="solid" size="md">
            {t.footer.explore}
          </ButtonLink>
          <ButtonLink href={links.privacy.value} target="_blank" variant="outline" size="md">
            {t.privacy.title}
          </ButtonLink>
        </>
      }
    >
      <PolicySection title={l.acceptanceTitle}>
        <ol className="space-y-5">
          {l.conditions.map((c, i) => (
            <Clause key={i} index={i + 1}>
              {c}
            </Clause>
          ))}
        </ol>
      </PolicySection>

      <PolicySection title={l.dataTitle}>
        {l.data.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </PolicySection>

      <PolicySection title={l.changesTitle}>
        {l.changes.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </PolicySection>
    </PageShell>
  );
}
