import Image from "next/image";
import { featuredDishIds, dishById } from "@/data/menu";
import { signaturePhotos, type Photo } from "@/data/photos";
import { links, type Locale } from "@/data/restaurant";
import type { Ui } from "@/data/ui";
import { cx, formatPrice } from "@/lib/utils";
import { ArrowUpRight } from "./Icons";

/**
 * Section 02 — FROM THE KITCHEN.
 *
 * The brief is explicit that these must not be six identical cards, so the
 * layout alternates deliberately: a large 4:5 lead dish, a smaller 1:1, a wide
 * 16:10 band, and so on. The sequence is fixed rather than random so the
 * composition is the same on every visit and on every language.
 *
 * The six dishes and their prices are the restaurant's own featured list.
 * Each photograph is the restaurant's, but the site never claims a given
 * photo is a picture of that specific dish.
 */

type Size = "lead" | "tall" | "wide" | "std";

/** Hand-set rhythm: wide, tall, std, lead, std, wide. */
const LAYOUT: Size[] = ["lead", "std", "tall", "wide", "std", "wide"];

const FRAME: Record<Size, string> = {
  lead: "aspect-[4/5] sm:aspect-[3/4]",
  tall: "aspect-[3/4]",
  std: "aspect-square",
  wide: "aspect-[16/10]",
};

const TITLE: Record<Size, string> = {
  lead: "text-[clamp(1.6rem,3.2vw,2.4rem)]",
  tall: "text-[clamp(1.3rem,2.2vw,1.75rem)]",
  std: "text-[clamp(1.2rem,1.9vw,1.5rem)]",
  wide: "text-[clamp(1.25rem,2.1vw,1.65rem)]",
};

function Dish({ dish, locale, photo, size }: {
  dish: NonNullable<ReturnType<typeof dishById.get>>;
  locale: Locale;
  photo?: Photo;
  size: Size;
}) {
  const description = dish.description?.[locale];
  const unit = dish.unit?.[locale];

  return (
    <article className="group">
      <div className={cx("media overflow-hidden", FRAME[size])}>
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1280px) 30rem, (min-width: 768px) 44vw, 84vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL={photo.blur}
            className="hover-zoom"
          />
        ) : null}
      </div>

      {/* The caption is not inside a card: it sits on the page under the image
          with a rule, and the whole block shifts on hover. */}
      <div className="mt-4 flex items-start justify-between gap-5 border-t border-line pt-4 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5">
        <div className="min-w-0">
          <h3
            className={cx(
              "font-display font-bold tracking-[-0.03em] text-ink",
              TITLE[size],
            )}
          >
            {dish.name[locale]}
          </h3>
          {unit ? (
            <p className="mt-1 text-[0.75rem] font-semibold tracking-[0.12em] text-ink-faint uppercase">
              {unit}
            </p>
          ) : null}
          {description ? (
            <p className="measure mt-2 text-[0.9rem] leading-[1.6] text-ink-mute">
              {description}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <p className="font-body text-[1.05rem] font-bold tabular-nums text-accent">
            {formatPrice(dish.price, locale)}
          </p>
          {/* Appears on hover, as asked for */}
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
      </div>
    </article>
  );
}

export function SignatureDishes({ locale, t }: { locale: Locale; t: Ui }) {
  const dishes = featuredDishIds
    .map((id) => dishById.get(id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  if (dishes.length === 0) return null;

  return (
    <section id="dishes" className="section bg-paper-warm" aria-labelledby="signature-title">
      <div className="container-page">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="section-index">
              <span className="section-index__num">{t.signature.kitchenNum}</span>
              <span aria-hidden="true" className="h-px w-10 translate-y-[-0.25rem] bg-line" />
              <span>{t.signature.kitchenLabel}</span>
            </p>
            <h2
              id="signature-title"
              className="mt-8 max-w-3xl font-display text-[clamp(2.1rem,5.2vw,4.4rem)] font-extrabold tracking-[-0.045em] text-ink"
            >
              {t.signature.headline}
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <p className="text-[0.95rem] leading-[1.7] text-ink-mute">{t.signature.blurb}</p>
          </div>
        </div>

        {/* Asymmetric editorial grid. Explicit spans, not auto-flow: the point
            is that no two frames are the same size. */}
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-12">
          {dishes.map((dish, i) => {
            const size = LAYOUT[i % LAYOUT.length];
            const span: Record<Size, string> = {
              lead: "sm:col-span-2 lg:col-span-5",
              std: "lg:col-span-3",
              tall: "sm:col-span-1 lg:col-span-3",
              wide: "sm:col-span-2 lg:col-span-4",
            };
            return (
              <div key={dish.id} className={span[size]}>
                <Dish
                  dish={dish}
                  locale={locale}
                  photo={signaturePhotos[i % signaturePhotos.length]}
                  size={size}
                />
              </div>
            );
          })}
        </div>

        <p className="mt-14 text-[0.8rem] text-ink-faint">
          {t.signature.featuredBy} ·{" "}
          <a
            href={links.website.value}
            target="_blank"
            rel="noopener noreferrer"
            className="link-wipe text-ink-mute"
          >
            {links.website.value.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </a>
        </p>
      </div>
    </section>
  );
}
