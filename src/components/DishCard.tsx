import Image from "next/image";
import type { MenuItem } from "@/data/menu";
import type { Photo } from "@/data/photos";
import type { Locale } from "@/data/restaurant";
import { cx, formatPrice } from "@/lib/utils";

interface DishCardProps {
  dish: MenuItem;
  locale: Locale;
  photo?: Photo;
  /** Index in the signature grid, used to stagger the reveal. */
  index?: number;
  className?: string;
}

/**
 * A single dish. The plate photograph is the restaurant's own; it is not
 * guaranteed to depict this exact dish, so the card never claims it does —
 * the image carries a neutral description and the dish name carries the detail.
 */
export function DishCard({ dish, locale, photo, index = 0, className }: DishCardProps) {
  const name = dish.name[locale];
  const description = dish.description?.[locale];
  const unit = dish.unit?.[locale];

  return (
    <article
      className={cx(
        "group relative flex h-full flex-col border border-line bg-paper transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:border-ink/25 hover:shadow-[0_24px_48px_-32px_rgba(22,21,15,0.42)]",
        className,
      )}
    >
      {photo ? (
        <div className="relative aspect-[3/2] overflow-hidden bg-ivory-deep">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1280px) 22rem, (min-width: 768px) 33vw, 86vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL={photo.blur}
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.045]"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[1.28rem] leading-tight text-ink">{name}</h3>
          <p className="shrink-0 pt-0.5 text-[0.95rem] font-medium tabular-nums text-accent">
            {formatPrice(dish.price, locale)}
          </p>
        </div>

        {unit ? (
          <p className="mt-1.5 text-[0.75rem] font-medium tracking-[0.18em] text-ink-faint uppercase">
            {unit}
          </p>
        ) : null}

        {description ? (
          <p className="mt-3.5 text-[0.88rem] leading-[1.7] text-ink-mute">{description}</p>
        ) : null}
      </div>
    </article>
  );
}
