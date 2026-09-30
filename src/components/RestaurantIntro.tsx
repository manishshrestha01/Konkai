import Image from "next/image";
import { locationPhoto } from "@/data/photos";
import {
  address,
  cuisine,
  intro,
  links,
  name,
  openingHours,
  terraceSeats,
  type Locale,
} from "@/data/restaurant";
import type { Ui } from "@/data/ui";
import { ArrowUpRight } from "./Icons";

/**
 * Section 01 — THE RESTAURANT.
 *
 * Editorial, not a card grid. The section number and label sit top-left, the
 * headline is set large beneath them, the body copy sits in a narrow column on
 * the right, and a full-bleed-ish photograph runs underneath, offset to the
 * right so the composition is deliberately asymmetric.
 *
 * Everything here is the restaurant's own published description of itself.
 */
export function RestaurantIntro({ locale, t }: { locale: Locale; t: Ui }) {
  const copy = intro[locale];
  const openEveryDay = openingHours.every((d) => d.blocks.length > 0);

  return (
    <section id="restaurant" className="section bg-paper" aria-labelledby="intro-title">
      <div className="container-page">
        {/* Top band: headline left, body right */}
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="section-index">
              <span className="section-index__num">{t.intro.restaurantNum}</span>
              <span aria-hidden="true" className="h-px w-10 translate-y-[-0.25rem] bg-line" />
              <span>{t.intro.restaurantLabel}</span>
            </p>

            <h2
              id="intro-title"
              className="mt-8 font-display text-[clamp(2.4rem,6.2vw,5.4rem)] font-extrabold tracking-[-0.045em] text-ink uppercase"
            >
              <span className="block">{t.intro.headlineA}</span>
              <span className="block text-accent">{t.intro.headlineB}</span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-16">
            <p className="measure text-[1.1rem] leading-[1.75] text-ink-soft">{copy.lead}</p>

            {copy.body.slice(0, 2).map((paragraph, i) => (
              <p key={i} className="measure mt-5 text-[1rem] leading-[1.8] text-ink-mute">
                {paragraph}
              </p>
            ))}

            <a
              href={links.menu.value}
              target="_blank"
              rel="noopener noreferrer"
              className="link-wipe mt-8 gap-2 text-[0.8rem] font-semibold tracking-[0.12em] text-accent uppercase"
            >
              {t.footer.menuPdf}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Address line, set as a horizontal rule of type */}
        <div className="mt-16 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-line pt-8">
          <p className="font-display text-[1.35rem] font-bold tracking-[-0.02em] text-ink">
            {address.street}
          </p>
          <p className="text-[0.95rem] text-ink-mute">
            {address.postalCode} {address.locality}
          </p>
          <p className="text-[0.95rem] text-ink-mute">{address.neighborhood[locale]}</p>
          <p className="ml-auto text-[0.95rem] text-ink-mute">
            {cuisine.value.join(" · ")}
            <span className="mx-2 text-ink-faint">·</span>
            {terraceSeats.value} {t.labels.covers}
            {openEveryDay ? (
              <>
                <span className="mx-2 text-ink-faint">·</span>
                {t.facts.openEveryDay}
              </>
            ) : null}
          </p>
          <p className="sr-only">{name.value}</p>
        </div>

        {/* Photograph, offset right and wider than the text column above it */}
        <figure className="reveal-clip mt-14 lg:ml-[14%]">
          <div className="media aspect-[16/10] lg:aspect-[21/9]">
            <Image
              src={locationPhoto.src}
              alt={locationPhoto.alt}
              fill
              sizes="(min-width: 1024px) 76vw, 92vw"
              placeholder="blur"
              blurDataURL={locationPhoto.blur}
              className="hover-zoom"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
