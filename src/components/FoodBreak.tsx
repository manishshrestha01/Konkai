import Image from "next/image";
import { galleryPhotos } from "@/data/photos";
import { name, type Locale } from "@/data/restaurant";
import type { Ui } from "@/data/ui";

/**
 * A full-bleed photograph between menu sections. No cards, no body copy — it
 * exists to break the page up and let the food be the only thing on screen for
 * a moment. The wordmark sits in the corner as an overlay.
 */
export function FoodBreak({ locale, t }: { locale: Locale; t: Ui }) {
  // A frame that is not already used above the fold, so nothing repeats.
  const photo = galleryPhotos[0] ?? galleryPhotos[galleryPhotos.length - 1];
  if (!photo) return null;

  return (
    <section className="relative bg-ink" aria-label={name.value}>
      <div className="media aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL={photo.blur}
          className="hover-zoom"
        />
      </div>

      {/* A light wash only along the bottom edge, so the overlay type reads
          without turning the photograph into a dark panel. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0">
        <div className="container-page pb-8 sm:pb-10">
          <p className="font-display text-[clamp(1.6rem,4vw,2.8rem)] leading-none font-extrabold tracking-[-0.04em] text-white uppercase">
            {t.hero.wordmark}
          </p>
        </div>
      </div>
    </section>
  );
}
