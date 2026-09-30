import Image from "next/image";
import { heroPhoto } from "@/data/photos";
import { links, type Locale } from "@/data/restaurant";
import type { Ui } from "@/data/ui";
import { ButtonLink } from "./Button";
import { ArrowRight, ArrowUpRight } from "./Icons";

/**
 * Full-viewport hero.
 *
 * The photograph is the section — it is not in a card, not inset, and it fills
 * the frame. The name sits large in the lower-left over a gradient that only
 * darkens where the type is, so the top-right of the image stays readable as
 * food rather than as a dark panel.
 *
 * Motion: the image settles from 1.05 to 1 over 1.4s, then breathes very slowly
 * for good measure. The text block assembles in four short steps. All of it
 * collapses under prefers-reduced-motion (see globals.css).
 */
export function Hero({ locale, t }: { locale: Locale; t: Ui }) {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink pt-[var(--header-h)]"
      aria-labelledby="hero-title"
    >
      {/* Photography — the full frame */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={heroPhoto.blur}
          className="animate-hero animate-breathe object-cover object-center"
        />

        {/* Readability. One vertical wash weighted to the bottom, one diagonal
            wash over the type block. Deliberately not a flat overlay — an
            earlier build stacked enough scrims to flatten the food. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/20 to-ink/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(24,24,24,0.78)_0%,rgba(24,24,24,0.34)_42%,transparent_68%)]"
        />
      </div>

      <div className="container-page relative z-10 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-5xl">
          <h1
            id="hero-title"
            className="animate-rise d-1 font-display font-extrabold text-white"
          >
            <span className="block text-[clamp(2.9rem,9.5vw,7rem)] leading-[0.92] tracking-[-0.045em] uppercase">
              {t.hero.wordmark}
            </span>
          </h1>

          <p className="animate-rise d-2 mt-6 font-body text-[clamp(1.05rem,2.4vw,1.6rem)] font-semibold tracking-[-0.01em] text-white/92">
            {t.hero.cuisineLine}
          </p>

          <p className="animate-rise d-3 mt-2 font-body text-[0.95rem] font-medium tracking-[0.1em] text-white/70 uppercase">
            {t.hero.localityLine}
          </p>

          <div className="animate-rise d-4 mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <ButtonLink href={`/${locale}#menu`} variant="light" size="lg">
              {t.hero.ctaExplore}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>

            <ButtonLink
              href={links.reserveTheFork.value}
              variant="outline"
              size="lg"
              className="border-white/50 text-white hover:border-white hover:bg-white hover:text-ink"
            >
              {t.hero.ctaReserve}
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Postcode marker, bottom right — a quiet orienting detail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-5 bottom-7 hidden flex-col items-end gap-1 text-white/55 sm:flex sm:right-8 lg:right-12"
      >
        <span className="font-display text-[1.4rem] leading-none font-bold tracking-[-0.02em]">
          {t.hero.postcodeMark}
        </span>
        <span className="font-body text-[0.75rem] font-semibold tracking-[0.24em] uppercase">
          {t.hero.cityMark}
        </span>
      </div>
    </section>
  );
}
