import type { Locale } from "@/data/restaurant";

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Formats a price the Spanish way: 8.5 -> "8,50 €". */
export function formatPrice(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "en" ? "es-ES" : locale === "es" ? "es-ES" : "ca-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);
}

/** "12:00" -> "12:00" in 24h; already 24h so only padding is needed. */
export function formatTime(hhmm: string): string {
  return hhmm;
}

/** Numeric rating rendered with the locale's decimal separator. */
export function formatScore(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "en" ? "es-ES" : locale === "es" ? "es-ES" : "ca-ES", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatReviewDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(
    locale === "en" ? "en-GB" : locale === "es" ? "es-ES" : "ca-ES",
    { day: "numeric", month: "long", year: "numeric" },
  ).format(new Date(iso));
}

/** A single address line per locale, following each country's conventions. */
export function formatAddressLine(locale: Locale): string {
  return "Carrer de Roger de Flor, 222 · 08013 Barcelona";
}

export function localePath(locale: Locale, hash = ""): string {
  return `/${locale}${hash}`;
}

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* -------------------------------------------------------------------------- */
/*  Opening-hours helpers                                                       */
/* -------------------------------------------------------------------------- */

import { openingHours } from "@/data/restaurant";

const JS_DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Index 0 = Monday, matching the `openingHours` table. */
export function todayIndex(): number {
  const js = new Date().getDay();
  return (js + 6) % 7;
}

/** Minutes since midnight. Treats "24:00" as end-of-day rather than 0. */
function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export interface OpenState {
  isOpen: boolean;
  /** "12:00 – 16:00" for the block currently in progress, if any. */
  current: string | null;
  /** True when the day has no service at all. */
  dayClosed: boolean;
  /** Hours of service remaining today, e.g. "Closes at 00:00". */
  closingNote: string | null;
}

/**
 * Resolves live open/closed state in the browser using the visitor's clock.
 * Rendered on the server as a neutral "check hours" state, then hydrated, so
 * the static HTML never asserts a claim that could be wrong.
 */
export function getOpenState(now: Date = new Date()): OpenState {
  const idx = todayIndex();
  const today = openingHours[idx];
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (today.blocks.length === 0) {
    return { isOpen: false, current: null, dayClosed: true, closingNote: null };
  }

  for (const block of today.blocks) {
    const from = toMinutes(block.from);
    // A block ending at 24:00 runs to the end of the day
    const to = block.to === "24:00" ? 24 * 60 : toMinutes(block.to);
    if (minutes >= from && minutes < to) {
      return {
        isOpen: true,
        current: `${block.from} – ${block.to === "24:00" ? "00:00" : block.to}`,
        dayClosed: false,
        closingNote: null,
      };
    }
  }

  return {
    isOpen: false,
    current: null,
    dayClosed: false,
    closingNote: null,
  };
}

export { JS_DAY };
