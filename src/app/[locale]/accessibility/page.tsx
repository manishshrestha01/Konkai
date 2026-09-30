import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ui } from "@/data/ui";
import { isLocale } from "@/lib/i18n";
import { PageShell, PolicySection } from "@/components/PageShell";

const TITLE: Record<string, string> = {
  en: "Accessibility | Konkai Sushi House",
  es: "Accesibilidad | Konkai Sushi House",
  ca: "Accessibilitat | Konkai Sushi House",
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
      canonical: `/${locale}/accessibility`,
      languages: {
        en: "/en/accessibility",
        es: "/es/accessibility",
        ca: "/ca/accessibility",
      },
    },
  };
}

export default async function AccessibilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = ui[locale];
  const a = t.accessibility;

  return (
    <PageShell
      locale={locale}
      t={t}
      eyebrow={t.footer.explore}
      title={a.title}
      intro={a.intro}
    >
      <PolicySection title={a.standardsTitle}>
        <p>{a.standardsBody}</p>
      </PolicySection>

      <PolicySection title={a.measuresTitle}>
        <ul className="space-y-3">
          {a.measures.map((m, i) => (
            <li key={i} className="grid gap-2 sm:grid-cols-12 sm:gap-6">
              <span aria-hidden="true" className="text-ink-faint sm:col-span-1">
                &middot;
              </span>
              <span className="sm:col-span-11">{m}</span>
            </li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection title={a.limitsTitle}>
        <p>{a.limitsBody}</p>
      </PolicySection>

      <PolicySection title={a.contactTitle}>
        <p>{a.contactBody}</p>
      </PolicySection>
    </PageShell>
  );
}
