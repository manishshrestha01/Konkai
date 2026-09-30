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

/** "12:00" -> "12:00" in 24h; "24:00" and "25:00" roll over to 00:00 / 01:00. */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const total = h * 60 + m;
  const rolled = total % (24 * 60);
  return `${String(Math.floor(rolled / 60)).padStart(2, "0")}:${String(rolled % 60).padStart(2, "0")}`;
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
  return madridPart(new Date()).day;
}

/**
 * The day index and minutes-since-midnight in Barcelona local time
 * (Europe/Madrid, CET or CEST depending on the season), regardless of where
 * the visitor is. Opening hours are quoted in Barcelona time, so the "open
 * now" badge must evaluate that clock, not the visitor's.
 */
function madridPart(now: Date): { day: number; minutes: number } {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Madrid",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(fmt.formatToParts(now).map((p) => [p.type, p.value]));
  const js = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(
    parts.weekday.toLowerCase().slice(0, 3),
  );
  const day = (js + 6) % 7;
  const hour = Number(parts.hour) % 24;
  const minute = Number(parts.minute);
  return { day, minutes: hour * 60 + minute };
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
 * Resolves live open/closed state in the browser against the restaurant's own
 * clock (Europe/Madrid), so visitors anywhere see the same answer as someone
 * standing outside the door. Rendered on the server as a neutral "check
 * hours" state, then hydrated, so the static HTML never asserts a claim that
 * could be wrong.
 */
export function getOpenState(now: Date = new Date()): OpenState {
  const { day, minutes } = madridPart(now);
  const today = openingHours[day];

  // A block that opened the previous day and runs past midnight (e.g. the
  // late "25:00" close on Friday/Saturday) is still in swing early today.
  const previous = openingHours[(day + 6) % 7];
  for (const block of previous.blocks) {
    const to = toMinutes(block.to);
    if (to > 24 * 60 && minutes < to - 24 * 60) {
      return {
        isOpen: true,
        current: `${block.from} – ${formatTime(block.to)}`,
        dayClosed: false,
        closingNote: null,
      };
    }
  }

  if (today.blocks.length === 0) {
    return { isOpen: false, current: null, dayClosed: true, closingNote: null };
  }

  for (const block of today.blocks) {
    const from = toMinutes(block.from);
    const to = toMinutes(block.to);
    if (minutes >= from && minutes < to) {
      return {
        isOpen: true,
        current: `${block.from} – ${formatTime(block.to)}`,
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
