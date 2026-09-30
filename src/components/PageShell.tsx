import type { ReactNode } from "react";
import type { Locale } from "@/data/restaurant";
import type { Ui } from "@/data/ui";
import { Footer } from "./Footer";
import { ButtonLink } from "./Button";
import { links } from "@/data/restaurant";

/**
 * Shared frame for the small text pages (legal notice, privacy, sitemap,
 * accessibility) so they sit on the same measure, the same vertical rhythm and
 * the same footer as the rest of the site, instead of each one re-deriving it.
 */
export function PageShell({
  locale,
  t,
  eyebrow,
  title,
  intro,
  children,
  actions,
}: {
  locale: Locale;
  t: Ui;
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  /** Optional trailing buttons. Defaults to the standard pair. */
  actions?: ReactNode;
}) {
  return (
    <>
      <main id="main" className="bg-paper">
        <div className="container-prose pt-32 pb-24 lg:pt-44 lg:pb-32">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 text-[clamp(2.2rem,6vw,3.75rem)] leading-[1.05] text-ink">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-[1.05rem] leading-[1.8] text-ink-soft">{intro}</p>

          <div className="mt-14 space-y-10 border-t border-line-soft pt-10">{children}</div>

          <div className="mt-14 flex flex-wrap gap-3 border-t border-line-soft pt-10">
            {actions ?? (
              <>
                <ButtonLink href={`/${locale}`} variant="solid" size="md">
                  {t.footer.explore}
                </ButtonLink>
                <ButtonLink href={`/${locale}/privacy`} variant="outline" size="md">
                  {t.privacy.title}
                </ButtonLink>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer locale={locale} t={t} />
    </>
  );
}

/** A titled block within a PageShell. */
export function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-[1.4rem] leading-snug text-ink">{title}</h2>
      <div className="mt-3 max-w-2xl space-y-4 text-[0.98rem] leading-[1.8] text-ink-mute">
        {children}
      </div>
    </section>
  );
}

/** A numbered clause, matching the legal notice's own "the following conditions" list. */
export function Clause({ index, children }: { index: number; children: ReactNode }) {
  return (
    <li className="grid gap-2 sm:grid-cols-12 sm:gap-6">
      <span
        aria-hidden="true"
        className="font-display text-[0.95rem] text-ink-faint tabular-nums sm:col-span-1"
      >
        {String(index).padStart(2, "0")}
      </span>
      <p className="sm:col-span-11">{children}</p>
    </li>
  );
}

export { links };
