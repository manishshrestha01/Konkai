"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  address,
  dayNames,
  links,
  nearestMetro,
  nearbyParking,
  openingHours,
  phone,
  type Locale,
} from "@/data/restaurant";
import type { Ui } from "@/data/ui";
import { locationPhoto, type Photo } from "@/data/photos";
import { formatTime, getOpenState, todayIndex, type OpenState } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ButtonLink } from "./Button";
import { ArrowUpRight, Clock, Parking, Phone, Pin, Train } from "./Icons";

/**
 * The Google Maps embed is a plain iframe, so it costs nothing until the user
 * asks for it. The slot shows the owner-provided photograph by default;
 * clicking it swaps in the live map without contacting Google beforehand.
 */
function MapFacade({
  title,
  locale,
  photo,
}: {
  title: string;
  locale: Locale;
  photo: Photo;
}) {
  const [active, setActive] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(address.street + ", " + address.postalCode + " " + address.locality)}&hl=${locale === "en" ? "en" : locale}&z=17&output=embed`;

  if (active) {
    return (
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="group absolute inset-0 block h-full w-full cursor-pointer overflow-hidden text-left"
      aria-label={title}
    >
      <Image
        src={photo.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 44vw, 92vw"
        placeholder="blur"
        blurDataURL={photo.blur}
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
      />
      {/* A quiet hint that this opens the live map, not just the photograph
          — a pin like the block-plan facade used to show. */}
      <span className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-ink/80 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.16em] text-paper uppercase opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <Pin className="h-3.5 w-3.5" aria-hidden="true" />
        {title}
      </span>
    </button>
  );
}

/** Live open/closed state, resolved on the client so SSR never asserts it. */
function OpenNowBadge({ t }: { t: Ui["location"] }) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(getOpenState());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!state) {
    // Server-rendered placeholder: states the source of truth without guessing
    return (
      <p className="text-[0.75rem] text-ink-mute">
        {t.hoursNote}
      </p>
    );
  }

  if (state.isOpen) {
    return (
      <p className="flex items-center gap-2 text-[0.78rem] text-ink-soft">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="font-medium">{t.openNow}</span>
        {state.current ? <span className="text-ink-mute">· {state.current}</span> : null}
      </p>
    );
  }

  return (
    <p className="text-[0.78rem] text-ink-mute">
      <span className="font-medium text-ink-soft">{t.closedNow}</span>
      {state.dayClosed ? <span> · {t.closed}</span> : null}
    </p>
  );
}

export function Location({
  locale,
  location: locationCopy,
  ctaDirections,
}: {
  locale: Locale;
  location: Ui["location"];
  ctaDirections: string;
}) {
  const todayIdx = todayIndex();

  return (
    <section
      id="location"
      className="section border-t border-line bg-ivory/55"
      aria-labelledby="location-title"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow={locationCopy.eyebrow}
          title={locationCopy.title}
          blurb={locationCopy.blurb}
          id="location-title"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal>
              <dl className="space-y-7">
                <div>
                  <dt className="flex items-center gap-2.5 text-[0.75rem] font-medium tracking-[0.2em] text-ink-faint uppercase">
                    <Pin className="mt-0.5 h-4 w-4 text-wood-dark" aria-hidden="true" />
                    {locationCopy.address}
                  </dt>
                  <dd className="mt-2.5 text-[1.05rem] leading-relaxed text-ink">
                    {address.street}
                    <br />
                    <span className="text-ink-mute">
                      {address.postalCode} {address.locality}, {address.region}
                    </span>
                    <br />
                    <span className="text-[0.9rem] text-ink-faint">
                      {address.neighborhood[locale]}
                    </span>
                  </dd>
                </div>

                <div>
                  <dt className="flex items-center gap-2.5 text-[0.75rem] font-medium tracking-[0.2em] text-ink-faint uppercase">
                    <Phone className="h-4 w-4 text-wood-dark" aria-hidden="true" />
                    {locationCopy.phone}
                  </dt>
                  <dd className="mt-2.5">
                    <a
                      href={`tel:${phone.e164}`}
                      className="link-wipe text-[1.05rem] text-ink"
                    >
                      {phone.display}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="flex items-center gap-2.5 text-[0.75rem] font-medium tracking-[0.2em] text-ink-faint uppercase">
                    <Train className="h-4 w-4 text-wood-dark" aria-hidden="true" />
                    {locationCopy.gettingHere}
                  </dt>
                  <dd className="mt-2.5 space-y-1.5 text-[0.9rem] text-ink-mute">
                    <p>
                      {locationCopy.metro}: {nearestMetro.value}
                    </p>
                    <p>
                      {locationCopy.parking}: {nearbyParking.value}
                    </p>
                  </dd>
                </div>
              </dl>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={links.directions.value} variant="solid" size="md">
                  {ctaDirections}
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href={links.googleMaps.value} variant="outline" size="md">
                  Google Maps
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Map */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={120}>
              <div className="relative aspect-[4/3] overflow-hidden border border-line bg-ivory-deep sm:aspect-[16/11]">
                <MapFacade title={locationCopy.mapTitle} locale={locale} photo={locationPhoto} />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Hours */}
        <Reveal delay={100}>
          <div className="mt-16 border-t border-line pt-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="flex items-center gap-2.5 font-display text-[1.55rem] text-ink">
                <Clock className="h-5 w-5 text-wood-dark" aria-hidden="true" />
                {locationCopy.hours}
              </h3>
              <OpenNowBadge t={locationCopy} />
            </div>

            <ul className="mt-7 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
              {openingHours.map((entry, i) => {
                const isToday = i === todayIdx;
                return (
                  <li
                    key={entry.day}
                    className={
                      "flex items-baseline justify-between gap-4 border-b border-line-soft py-3.5 " +
                      (isToday ? "font-medium text-ink" : "text-ink-mute")
                    }
                  >
                    <span className="text-[0.9rem]">
                      {dayNames[locale][i]}
                      {isToday ? (
                        <span className="ml-2 text-[0.75rem] tracking-[0.16em] text-accent uppercase">
                          {locationCopy.today}
                        </span>
                      ) : null}
                    </span>
                    <span className="shrink-0 text-right text-[0.85rem] tabular-nums">
                      {entry.blocks.length === 0 ? (
                        <span className="text-ink-faint">{locationCopy.closed}</span>
                      ) : entry.blocks.length === 1 ? (
                        `${entry.blocks[0].from} – ${formatTime(entry.blocks[0].to)}`
                      ) : (
                        <span className="flex flex-col">
                          <span>
                            {entry.blocks[0].from} – {formatTime(entry.blocks[0].to)}
                          </span>
                          <span className="text-ink-faint">
                            {entry.blocks[1].from} – {formatTime(entry.blocks[1].to)}
                          </span>
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.78rem] text-ink-faint">
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-wood/60" aria-hidden="true" />
                {locationCopy.lunch}
              </p>
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-wood-dark/60" aria-hidden="true" />
                {locationCopy.dinner}
              </p>
              <p>{locationCopy.hoursNote}</p>
              <p className="flex items-center gap-2">
                <Parking className="h-3.5 w-3.5" aria-hidden="true" />
                {address.postalCode} {address.locality}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
