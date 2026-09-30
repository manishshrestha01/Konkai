"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { allPhotos, type Photo } from "@/data/photos";
import type { Locale } from "@/data/restaurant";
import type { Ui } from "@/data/ui";
import { cx } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Close } from "./Icons";

/** Two columns on a phone, three from tablet up. */
const COLUMNS = "columns-2 gap-3 lg:columns-3";

/**
 * A fixed rotation of frame shapes. The photographs are all 3:2 natively, so
 * these crops are what stop the wall reading as a grid of identical bricks.
 */
const FRAME_RATIOS = ["3 / 4", "1 / 1", "4 / 5", "3 / 2", "4 / 5", "1 / 1"] as const;

export function Gallery({ locale: _locale, t }: { locale: Locale; t: Ui["gallery"] }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const open = index !== null;

  const close = useCallback(() => {
    setIndex(null);
    // Return focus to the thumbnail that opened the lightbox
    lastTrigger.current?.focus();
  }, []);

  const step = useCallback((delta: number) => {
    setIndex((current) => (current === null ? current : (current + delta + allPhotos.length) % allPhotos.length));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Move focus into the dialog
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const current: Photo | null = open ? allPhotos[index] : null;

  return (
    <section id="gallery" className="section bg-paper" aria-labelledby="gallery-title">
      <div className="container-page">
        <div className="grid gap-x-16 gap-y-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">{t.eyebrow}</p>
            <h2
              id="gallery-title"
              className="mt-5 font-display text-[clamp(2.1rem,5.2vw,4.4rem)] font-extrabold tracking-[-0.045em] text-ink uppercase"
            >
              {t.title}
            </h2>
          </div>
          <p className="measure text-[0.975rem] leading-[1.7] text-ink-mute lg:col-span-5">
            {t.blurb}
          </p>
        </div>

        {/* A genuine masonry: CSS columns pack the varied heights, so the rows
            do not have to line up. Every frame keeps a deliberate ratio. */}
        <ul className={cx("mt-14", COLUMNS)}>
          {allPhotos.map((photo, i) => (
            <li key={photo.id} className="group relative mb-3 break-inside-avoid">
              <button
                type="button"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setIndex(i);
                }}
                className="relative block w-full cursor-zoom-in overflow-hidden bg-ivory-deep"
                style={{ aspectRatio: FRAME_RATIOS[i % FRAME_RATIOS.length] }}
                aria-label={`${t.open}: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 47vw"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={photo.blur}
                  className="object-cover transition-all duration-[1.1s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06] group-hover:opacity-88"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/12"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Lightbox */}
      {open && current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-90 flex flex-col bg-ink/96 backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="text-[0.78rem] tracking-[0.2em] text-paper/60 uppercase">
              {t.counter} {(index ?? 0) + 1} / {allPhotos.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="inline-flex h-11 w-11 items-center justify-center text-paper/80 transition-colors hover:text-paper"
            >
              <span className="sr-only">{t.close}</span>
              <Close className="h-5 w-5" />
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute left-2 z-10 inline-flex h-12 w-12 items-center justify-center text-paper/70 transition-colors hover:text-paper sm:left-5"
            >
              <span className="sr-only">{t.prev}</span>
              <ChevronLeft className="h-6 w-6" />
            </button>

            <figure className="relative flex h-full max-h-[74svh] w-full max-w-4xl flex-col items-center justify-center">
              <div className="relative h-full min-h-0 w-full">
                <Image
                  key={current.id}
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  className="animate-fade object-contain"
                />
              </div>
            </figure>

            <button
              type="button"
              onClick={() => step(1)}
              className="absolute right-2 z-10 inline-flex h-12 w-12 items-center justify-center text-paper/70 transition-colors hover:text-paper sm:right-5"
            >
              <span className="sr-only">{t.next}</span>
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
