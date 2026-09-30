import Link from "next/link";
import {
  address,
  dayNames,
  links,
  openingHours,
  phone,
  type Locale,
} from "@/data/restaurant";
import type { Ui } from "@/data/ui";
import { LanguageRow, Wordmark } from "./Navbar";
import { ArrowUpRight, Clock, Facebook, Globe, Instagram, Phone, Pin } from "./Icons";

function FooterLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  const cls =
    className ??
    "link-wipe text-[0.9rem] text-ink-mute transition-colors duration-300 hover:text-ink";
  const inner = (
    <>
      {children}
      {external ? (
        <ArrowUpRight
          className="ml-1 inline-block h-3 w-3 -translate-y-px opacity-45"
          aria-hidden="true"
        />
      ) : null}
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Footer({ locale, t }: { locale: Locale; t: Ui }) {
  // Server-rendered, so this cannot drift between server and client
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ivory/70">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Wordmark locale={locale} tone="light" />
            <p className="mt-5 max-w-xs text-[0.9rem] leading-relaxed text-ink-mute">
              {t.footer.tagline}
            </p>
            <div className="mt-6">
              <LanguageRow locale={locale} labels={t.nav} />
            </div>
          </div>

          {/* Explore */}
          <nav aria-label={t.footer.explore} className="lg:col-span-2">
            <h2 className="text-[0.75rem] font-medium tracking-[0.2em] text-ink-faint uppercase">
              {t.footer.explore}
            </h2>
            <ul className="mt-5 space-y-3">
              {[
                { href: `/${locale}#dishes`, label: t.nav.dishes },
                { href: `/${locale}#menu`, label: t.nav.menu },
                { href: `/${locale}#gallery`, label: t.nav.gallery },
                { href: `/${locale}#reviews`, label: t.nav.reviews },
              ].map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div className="lg:col-span-3">
            <h2 className="text-[0.75rem] font-medium tracking-[0.2em] text-ink-faint uppercase">
              {t.footer.visit}
            </h2>
            <address className="mt-5 space-y-3 not-italic">
              <p className="flex items-start gap-2.5 text-[0.9rem] leading-relaxed text-ink-mute">
                <Pin className="mt-1 h-4 w-4 shrink-0 text-wood-dark" aria-hidden="true" />
                <span>
                  <FooterLink href={links.directions.value}>
                    {address.street}
                  </FooterLink>
                  <br />
                  {address.postalCode} {address.locality}
                  <br />
                  <span className="text-ink-faint">{address.neighborhood[locale]}</span>
                </span>
              </p>
              <p className="flex items-center gap-2.5 text-[0.9rem] text-ink-mute">
                <Phone className="h-4 w-4 shrink-0 text-wood-dark" aria-hidden="true" />
                <a href={`tel:${phone.e164}`} className="link-wipe">
                  {phone.display}
                </a>
              </p>
            </address>
          </div>

          {/* Hours */}
          <div className="lg:col-span-3">
            <h2 className="text-[0.75rem] font-medium tracking-[0.2em] text-ink-faint uppercase">
              {t.footer.contact}
            </h2>
            <ul className="mt-5 space-y-1.5">
              {openingHours.map((entry, i) => (
                <li
                  key={entry.day}
                  className="flex items-baseline justify-between gap-3 text-[0.85rem]"
                >
                  <span className="text-ink-mute">{dayNames[locale][i]}</span>
                  <span className="flex shrink-0 gap-2 tabular-nums text-ink-faint">
                    {entry.blocks.length === 0 ? (
                      <span>—</span>
                    ) : (
                      entry.blocks.map((b, bi) => (
                        <span key={bi}>
                          {b.from}–{b.to === "24:00" ? "00:00" : b.to}
                        </span>
                      ))
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social + legal */}
        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex items-center gap-5">
            <li>
              <a
                href={links.instagram.value}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center text-ink-mute transition-colors duration-300 hover:text-accent"
              >
                <Instagram className="h-[1.15rem] w-[1.15rem]" />
                <span className="sr-only">Instagram (@konkai.sushi.house)</span>
              </a>
            </li>
            <li>
              <a
                href={links.facebook.value}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center text-ink-mute transition-colors duration-300 hover:text-accent"
              >
                <Facebook className="h-[1.15rem] w-[1.15rem]" />
                <span className="sr-only">Facebook</span>
              </a>
            </li>
            <li>
              <a
                href={links.website.value}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center text-ink-mute transition-colors duration-300 hover:text-accent"
              >
                <Globe className="h-[1.15rem] w-[1.15rem]" />
                <span className="sr-only">{links.website.value}</span>
              </a>
            </li>
            <li>
              <a
                href={links.googleMaps.value}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center text-ink-mute transition-colors duration-300 hover:text-accent"
              >
                <Pin className="h-[1.15rem] w-[1.15rem]" />
                <span className="sr-only">Google Maps</span>
              </a>
            </li>
          </ul>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.78rem] text-ink-faint">
            <li>
              <a href={`/${locale}/legal`} className="link-wipe">
                {t.legal.title}
              </a>
            </li>
            <li>
              <a href={`/${locale}/privacy`} className="link-wipe">
                {t.privacy.title}
              </a>
            </li>
            <li>
              <a href={`/${locale}/cookies`} className="link-wipe">
                {t.cookies.title}
              </a>
            </li>
            <li>
              <a href={`/${locale}/sitemap`} className="link-wipe">
                {t.sitemapPage.title}
              </a>
            </li>
            <li>
              <a href={`/${locale}/accessibility`} className="link-wipe">
                {t.accessibility.title}
              </a>
            </li>
            <li>
              <a
                href={links.menu.value}
                target="_blank"
                rel="noopener noreferrer"
                className="link-wipe"
              >
                {t.footer.menuPdf}
              </a>
            </li>
            <li>
              <a
                href={links.reserveTheFork.value}
                target="_blank"
                rel="noopener noreferrer"
                className="link-wipe"
              >
                {t.nav.reserve}
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-line-soft pt-6 text-[0.75rem] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <p>
              © {year} Konkai Sushi House. {t.footer.rights}
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {t.location.hoursNote}
            </p>
          </div>
          <p>
            {t.footer.credit}{" "}
            <a
              href="https://www.shresthamanish.info.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-wipe"
            >
              Manish Shrestha
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
