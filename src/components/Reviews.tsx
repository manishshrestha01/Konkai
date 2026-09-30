import { formatScore } from "@/lib/utils";
import { address, links, ratings, type Locale } from "@/data/restaurant";
import type { Ui } from "@/data/ui";
import { ButtonLink } from "./Button";
import { ArrowUpRight, Quote, Star } from "./Icons";

/** Renders a 0–5 rating as filled / half / empty stars. */
function Stars({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${formatScore(value, "en")} ${label}`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative block h-4 w-4">
            <Star className="absolute inset-0 h-4 w-4 text-line" />
            {fill > 0 ? (
              <span
                className="absolute inset-0 overflow-hidden text-accent"
                style={{ width: `${fill * 100}%` }}
                aria-hidden="true"
              >
                <Star className="h-4 w-4" />
              </span>
            ) : null}
          </span>
        );
      })}
    </span>
  );
}

export function Reviews({ locale, t }: { locale: Locale; t: Ui }) {
  const { value, count } = ratings.google;
  const formattedCount = new Intl.NumberFormat(
    locale === "en" ? "en-GB" : locale === "es" ? "es-ES" : "ca-ES",
  ).format(count);

  return (
    <section
      id="reviews"
      className="section bg-paper"
      aria-labelledby="reviews-title"
    >
      <div className="container-page">
        <p className="section-index">
          <span className="section-index__num">{t.reviews.num}</span>
          <span aria-hidden="true" className="h-px w-10 translate-y-[-0.25rem] bg-line" />
          <span>{t.reviews.label}</span>
        </p>

        <div className="mt-10 grid gap-x-16 gap-y-14 lg:grid-cols-12">
          {/* Rating, set as typography rather than as a card */}
          <div className="lg:col-span-5">
            <h2
              id="reviews-title"
              className="font-display text-[clamp(1.9rem,4.2vw,3.2rem)] font-extrabold tracking-[-0.04em] text-ink uppercase"
            >
              {t.reviews.title}
            </h2>

            <p className="mt-10 font-display text-[clamp(5rem,13vw,9rem)] leading-[0.8] font-extrabold tracking-[-0.06em] text-accent">
              {formatScore(value, locale)}
            </p>

            <Stars value={value} label={t.a11y.ratingStars} />

            <p className="mt-4 text-[0.95rem] text-ink-mute">
              <span className="font-semibold text-ink">{formattedCount}</span>{" "}
              {t.reviews.reviewsCaption}
            </p>
            <p className="mt-1 text-[0.78rem] font-semibold tracking-[0.12em] text-ink-faint uppercase">
              {t.reviews.ratingCaption}
            </p>

            <ButtonLink href={links.search.value} variant="outline" size="md" className="mt-8">
              {t.reviews.seeAllGoogle}
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          {/* A note on where the rating comes from, in place of the quotes */}
          <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <Quote aria-hidden="true" className="h-10 w-10 text-accent" />
            <p className="mt-6 measure text-[1.05rem] leading-[1.7] text-ink-soft">
              {t.reviews.blurb}
            </p>
          </div>
        </div>

        <p className="sr-only">{address.street}, {address.locality}</p>
      </div>
    </section>
  );
}
