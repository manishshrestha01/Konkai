"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { LOCALES, type Locale } from "@/data/restaurant";
import type { Ui } from "@/data/ui";
import { cx } from "@/lib/utils";
import { ArrowUpRight, Check, ChevronDown, Close, Globe, MenuIcon } from "./Icons";
import { OfficialLogo } from "./OfficialLogo";

/* -------------------------------------------------------------------------- */
/*  Wordmark                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * The brand in the header.
 *
 * `tone` names the *surface* it sits on, which is the convention
 * `LanguageSelector` and `LanguageRow` already use:
 *   - "light" -> a light surface, so the deep-red official raster (7:1)
 *   - "dark"  -> a dark surface, so a typeset wordmark in Sora
 *
 * The raster is never placed on dark: #AA1218 against #181818 is 2.45:1, which
 * fails. The typeset wordmark is what the header uses, and the official logo
 * still appears on the light surfaces — the mobile sheet and the footer.
 */
export function Wordmark({
  locale,
  tone = "light",
  className,
}: {
  locale: Locale;
  tone?: "light" | "dark";
  className?: string;
}) {
  const onDark = tone === "dark";

  return (
    <Link
      href={`/${locale}`}
      className={cx(
        "group inline-flex min-h-11 items-center no-underline",
        className,
      )}
      aria-label="Konkai Sushi House — home"
    >
      {onDark ? (
        <span
          className={cx(
            "font-display text-[1.7rem] leading-none font-extrabold tracking-[-0.03em] transition-colors duration-500 sm:text-[1.9rem]",
            "text-white",
          )}
        >
          KONKAI
        </span>
      ) : (
        <OfficialLogo
          height={56}
          trim
          priority
          className="transition-opacity duration-500 group-hover:opacity-75"
        />
      )}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Language selector                                                           */
/* -------------------------------------------------------------------------- */

const LOCALE_LABEL: Record<Locale, string> = { en: "English", es: "Español", ca: "Català" };

export function LanguageSelector({
  locale,
  labels,
  tone = "light",
  compact = false,
}: {
  locale: Locale;
  labels: Ui["nav"];
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dark = tone === "dark";

  /** Swaps the leading /<locale> segment and preserves the hash. */
  const hrefFor = (target: Locale) => {
    const rest = pathname.replace(/^\/(en|es|ca)(?=\/|$)/, "");
    return `/${target}${rest || ""}`;
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
        className={cx(
          "flex min-h-10 items-center gap-2 text-[0.75rem] font-medium tracking-[0.16em] uppercase transition-colors duration-300",
          dark ? "text-paper/85 hover:text-paper" : "text-ink-soft hover:text-ink",
        )}
      >
        <Globe className="h-[1.05rem] w-[1.05rem]" />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown
          className={cx("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")}
        />
        <span className="sr-only">{LOCALE_LABEL[locale]} — change language</span>
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 z-50 mt-2 min-w-40 overflow-hidden border border-line bg-paper shadow-[0_18px_40px_-24px_rgba(22,21,15,0.45)]"
        >
          {LOCALES.map((code) => {
            const active = code === locale;
            return (
              <Link
                key={code}
                role="menuitem"
                href={hrefFor(code)}
                hrefLang={code}
                lang={code}
                onClick={() => setOpen(false)}
                aria-current={active ? "true" : undefined}
                className={cx(
                  "flex items-center justify-between gap-6 px-4 py-3 text-[0.75rem] tracking-[0.1em] transition-colors duration-200",
                  active
                    ? "bg-ink/[0.04] text-ink"
                    : "text-ink-mute hover:bg-ink/[0.04] hover:text-ink",
                )}
              >
                <span>{LOCALE_LABEL[code]}</span>
                {active ? <Check className="h-3.5 w-3.5 text-accent" /> : null}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

/** Static EN | ES | CA row, used in the mobile sheet and the footer. */
export function LanguageRow({
  locale,
  labels,
  tone = "light",
}: {
  locale: Locale;
  labels: Ui["nav"];
  tone?: "light" | "dark";
}) {
  const pathname = usePathname();
  const dark = tone === "dark";
  return (
    <div
      className={cx(
        "flex items-center gap-1 border p-1",
        dark ? "border-paper/15" : "border-line",
      )}
      role="group"
      aria-label="Change language"
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        const rest = pathname.replace(/^\/(en|es|ca)(?=\/|$)/, "");
        return (
          <Link
            key={code}
            href={`/${code}${rest || ""}`}
            hrefLang={code}
            lang={code}
            aria-current={active ? "true" : undefined}
            aria-label={LOCALE_LABEL[code]}
            className={cx(
              "flex min-h-9 min-w-11 items-center justify-center px-3 text-[0.75rem] font-medium tracking-[0.14em] uppercase transition-all duration-300",
              active
                ? dark
                  ? "bg-paper text-ink"
                  : "bg-ink text-paper"
                : dark
                  ? "text-paper/60 hover:text-paper"
                  : "text-ink-mute hover:text-ink",
            )}
          >
            {code.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navbar                                                                      */
/* -------------------------------------------------------------------------- */

export function Navbar({ locale, t }: { locale: Locale; t: Ui["nav"] }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  /**
   * The sheet records *which route it was opened on*. Navigating changes
   * `pathname`, so the comparison flips to false and the sheet closes on its
   * own. Deriving it this way avoids resetting state in an effect, which would
   * cost an extra render pass on every navigation.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = useCallback((next: boolean) => setOpenedOn(next ? pathname : null), [pathname]);
  const toggleOpen = () => setOpen(!open);

/**
 * Height of the opaque bar, in pixels. The header and the mobile sheet both
 * need it, and they must agree or the sheet shows a seam under the bar.
 *
 * The logo renders at `height={120}`, which is 64px of visible mark once the
 * transparent padding is trimmed. The bar is 78px, so the mark fills most of
 * it — about 7px of air on each side — while keeping its 44px-tall tap target.
 */
const BAR_HEIGHT = 78;

const links = [
    { href: `/${locale}#menu`, label: t.menu },
    { href: `/${locale}#dishes`, label: t.dishes },
    { href: `/${locale}#restaurant`, label: t.restaurant },
    { href: `/${locale}#reviews`, label: t.reviews },
    { href: `/${locale}#gallery`, label: t.gallery },
    { href: `/${locale}#location`, label: t.location },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const solid = scrolled || open;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
      >
        {t.skip}
      </a>
      <a
        href={`/${locale}/sitemap`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-[13.5rem] focus:z-100 focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
      >
        {t.skipSitemap}
      </a>
      <a
        href={`/${locale}/accessibility`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-[27rem] focus:z-100 focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
      >
        {t.skipAccessibility}
      </a>

      {/* Two states. Over the hero the bar is transparent, so the links and
          the wordmark are white. Once you scroll — or the mobile sheet opens —
          the bar becomes warm ivory, which is the surface the deep-red official
          logo and the ink link colour are actually designed for. White links on
          a white bar would be unreadable, so the two states each get the pair
          that works on their own background. */}
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
          solid
            ? "border-b border-line bg-paper/92 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
        style={{ height: solid ? `${BAR_HEIGHT}px` : "var(--header-h)" }}
      >
        <div className="container-page relative flex h-full items-center gap-6 xl:gap-8">
          {solid ? (
            // The restaurant's own logo, large, on the ivory bar where its
            // #AA1218 red reaches 7:1.
            <Link
              href={`/${locale}`}
              className="group inline-flex shrink-0 items-center no-underline"
              /* Optical alignment of the mark inside the bar, set in devtools.
                 `color: transparent` is inert here: the link holds only the
                 logo, whose <img> is alt="" and hidden from assistive tech. */
              style={{ color: "transparent", marginTop: 26, marginLeft: 3 }}
              aria-label="Konkai Sushi House — home"
            >
              <OfficialLogo
                height={120}
                trim
                priority
                className="transition-opacity duration-500 group-hover:opacity-75"
              />
            </Link>
          ) : (
            <Wordmark locale={locale} tone="dark" className="shrink-0" />
          )}

          <nav
            aria-label="Main"
            className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 xl:flex"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cx(
                  "link-wipe text-[0.75rem] font-semibold tracking-[0.12em] uppercase transition-colors duration-300",
                  solid ? "text-ink-soft hover:text-accent" : "text-white/85 hover:text-white",
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex min-w-0 items-center gap-4 sm:gap-6">
            <div className="hidden sm:block">
              <LanguageSelector locale={locale} labels={t} tone={solid ? "light" : "dark"} />
            </div>

            <a
              href={t.reserve.startsWith("http") ? t.reserve : `/${locale}#reserve`}
              className={cx(
                "hidden min-h-11 shrink-0 items-center gap-2 px-6 text-[0.75rem] font-semibold tracking-[0.12em] uppercase transition-colors duration-300 md:inline-flex",
                solid
                  ? "bg-accent text-white hover:bg-accent-deep"
                  : "bg-white text-ink hover:bg-accent hover:text-white",
              )}
            >
              {t.reserve}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={toggleOpen}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className={cx(
                "inline-flex h-11 w-11 shrink-0 items-center justify-center transition-colors duration-300 xl:hidden",
                solid ? "text-ink" : "text-white",
              )}
            >
              <span className="sr-only">{open ? t.closeMenu : t.openMenu}</span>
              {open ? <Close className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className={cx(
          "fixed inset-0 z-40 bg-paper xl:hidden",
          "transition-opacity duration-500",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{ paddingTop: solid ? `${BAR_HEIGHT}px` : "var(--header-h)" }}
      >
        <div className="container-page flex h-full flex-col overflow-y-auto pb-10">
          {/* No logo here: the fixed header sits above this sheet and already
              shows the mark, so rendering one again gave two logos. */}
          <nav aria-label="Mobile" className="flex flex-col pt-6">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-16 items-center border-b border-line-soft font-display text-[1.9rem] leading-none font-bold tracking-[-0.03em] text-ink transition-opacity duration-500"
                style={{
                  transitionDelay: open ? `${120 + i * 45}ms` : "0ms",
                  opacity: open ? 1 : 0,
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="mt-8 space-y-6">
            <a
              href={t.reserve.startsWith("http") ? t.reserve : `/${locale}#reserve`}
              onClick={() => setOpen(false)}
              className="flex min-h-14 w-full items-center justify-center gap-2 bg-accent px-8 text-[0.78rem] font-semibold tracking-[0.14em] text-white uppercase transition-colors duration-300 hover:bg-accent-deep"
            >
              {t.reserve}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <LanguageRow locale={locale} labels={t} />
          </div>
        </div>
      </div>
    </>
  );
}
