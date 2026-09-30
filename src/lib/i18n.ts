import { LOCALES, type Locale } from "@/data/restaurant";

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value);
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  ca: "Català",
};

export { LOCALES };
export type { Locale };
