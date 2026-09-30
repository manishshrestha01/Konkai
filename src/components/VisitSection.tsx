import Image from "next/image";
import { galleryPhotos } from "@/data/photos";
import { type Locale } from "@/data/restaurant";
import type { Ui } from "@/data/ui";

/**
 * Section 03 — THE SPACE.
 *
 * Split screen: the photograph takes the left half edge to edge, the copy the
 * right. The "12" is set enormous rather than as a list item, which is what
 * turns three facts into an editorial moment instead of a feature list.
 *
 * Terrace capacity, indoor dining and the Sagrada Família's proximity are all
 * stated on the restaurant's own site.
 */
export function VisitSection({ locale, t }: { locale: Locale; t: Ui }) {
  const main = galleryPhotos[3];

  return (
    <section id="visit" className="bg-paper" aria-labelledby="visit-title">
      <div className="grid lg:grid-cols-2">
        {/* Photograph, bleeding to the viewport edge */}
        <div className="relative min-h-[60svh] lg:min-h-full">
          {main ? (
            <div className="media absolute inset-0">
              <Image
                src={main.src}
                alt={main.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="lazy"
                placeholder="blur"
                blurDataURL={main.blur}
                className="hover-zoom"
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-ivory-deep" />
          )}
        </div>

        {/* Copy */}
        <div className="flex flex-col justify-center px-[clamp(1.25rem,4vw,5rem)] py-20 lg:py-32">
          <p className="section-index">
            <span className="section-index__num">{t.visit.num}</span>
            <span aria-hidden="true" className="h-px w-10 translate-y-[-0.25rem] bg-line" />
            <span>{t.visit.label}</span>
          </p>

          <h2
            id="visit-title"
            className="mt-8 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold tracking-[-0.04em] text-ink"
          >
            {t.visit.headline}
          </h2>

          <p className="measure mt-7 text-[1.05rem] leading-[1.75] text-ink-mute">
            {t.visit.blurb}
          </p>

          {/* The headline fact, set as type rather than as a stat card */}
          <div className="mt-12 flex items-end gap-5 border-t border-line pt-10">
            <p className="font-display text-[clamp(4.5rem,11vw,7.5rem)] leading-[0.8] font-extrabold tracking-[-0.06em] text-accent">
              {t.visit.seatsNumber}
            </p>
            <p className="pb-2 text-[0.95rem] font-semibold tracking-[0.12em] text-ink uppercase">
              {t.visit.seatsLabel}
            </p>
          </div>

          <ul className="mt-10 flex flex-col gap-0">
            {t.visit.facts.map((fact) => (
              <li
                key={fact}
                className="flex items-center gap-4 border-b border-line-soft py-4 text-[0.95rem] text-ink-soft last:border-0"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
