import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ui } from "@/data/ui";
import { isLocale } from "@/lib/i18n";
import { links } from "@/data/restaurant";
import { PageShell, PolicySection } from "@/components/PageShell";
import { ButtonLink } from "@/components/Button";

const TITLE: Record<string, string> = {
  en: "Privacy policy | Konkai Sushi House",
  es: "Política de privacidad | Konkai Sushi House",
  ca: "Política de privadesa | Konkai Sushi House",
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
    // Same rationale as the cookie notice: a policy page carries no search
    // intent, so keep it out of the index but let crawlers follow the links.
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {
        en: "/en/privacy",
        es: "/es/privacy",
        ca: "/ca/privacy",
      },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = ui[locale];
  const p = t.privacy;

  return (
    <PageShell
      locale={locale}
      t={t}
      eyebrow={t.footer.legal}
      title={p.title}
      intro={p.intro}
      actions={
        <>
          <ButtonLink href={`/${locale}`} variant="solid" size="md">
            {t.footer.explore}
          </ButtonLink>
          <ButtonLink href={`/${locale}/cookies`} variant="outline" size="md">
            {t.cookies.title}
          </ButtonLink>
        </>
      }
    >
      <PolicySection title={p.controllerTitle}>
        <p>{p.controllerBody}</p>
      </PolicySection>

      <PolicySection title={p.browsingTitle}>
        <p>{p.browsingBody}</p>
      </PolicySection>

      <PolicySection title={p.bookingTitle}>
        <p>{p.bookingBody}</p>
      </PolicySection>

      <PolicySection title={p.rightsTitle}>
        <p>{p.rightsBody}</p>
      </PolicySection>

      <PolicySection title={p.changesTitle}>
        <p>{p.changesBody}</p>
      </PolicySection>

      <PolicySection title={p.contactTitle}>
        <p>{p.contactBody}</p>
      </PolicySection>

      {/* The authoritative document for the new site. */}
      <p className="max-w-2xl text-[0.98rem] leading-[1.8] text-ink-mute">
        <a
          href={links.privacy.value}
          target="_blank"
          rel="noopener noreferrer"
          className="link-wipe text-ink"
        >
          {links.privacy.value.replace(/^https?:\/\//, "")}
        </a>
      </p>
    </PageShell>
  );
}
