"use client";

import { useId, useState } from "react";
import { menu, priceRangeEur, type MenuCategory } from "@/data/menu";
import { links, type Locale } from "@/data/restaurant";
import type { Ui } from "@/data/ui";
import { cx, formatPrice } from "@/lib/utils";
import { ButtonLink } from "./Button";
import { ArrowUpRight } from "./Icons";

/**
 * The menu, set the way a printed a-la-carte is set: the dish name on the left,
 * the price hard against the right margin, the description underneath in a
 * quieter weight. No cards, no grid of boxes.
 *
 * The category row is the real navigation. It is a horizontally scrollable
 * rail on a phone and a wrapping row from tablet up.
 *
 * Progressive enhancement: the default view is "All", which is what is rendered
 * to the server and what a crawler or a no-JS browser sees. The tabs only
 * narrow the list once JavaScript is running.
 */
export function MenuPreview({
  locale,
  menuLabels,
  navMenu,
  perDish,
  ctaReserve,
}: {
  locale: Locale;
  menuLabels: Ui["menu"];
  navMenu: string;
  perDish: string;
  ctaReserve: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const tabsId = useId();

  const shown: MenuCategory[] = active ? menu.filter((c) => c.id === active) : menu;

  return (
    <section id="menu" className="section bg-paper" aria-labelledby="menu-title">
      <div className="container-page">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2
              id="menu-title"
              className="font-display text-[clamp(2.1rem,5.2vw,4.4rem)] font-extrabold tracking-[-0.045em] text-ink uppercase"
            >
              {navMenu}
            </h2>
            <p className="measure mt-6 text-[1.05rem] leading-[1.75] text-ink-mute">
              {menuLabels.blurb}
            </p>
          </div>
          <div className="lg:col-span-5 lg:pb-2 lg:text-right">
            <p className="text-[0.85rem] text-ink-faint">
              {formatPrice(priceRangeEur[0], locale)} – {formatPrice(priceRangeEur[1], locale)}{" "}
              <span>{perDish}</span>
            </p>
          </div>
        </div>

        {/* Category rail */}
        <div
          id={tabsId}
          role="tablist"
          aria-label={menuLabels.categories}
          className="no-scrollbar mt-14 flex gap-x-7 gap-y-3 overflow-x-auto border-y border-line py-5"
        >
          <button
            type="button"
            role="tab"
            aria-selected={active === null}
            onClick={() => setActive(null)}
            className={cx(
              "inline-flex min-h-11 shrink-0 items-center text-[0.78rem] font-semibold tracking-[0.12em] uppercase transition-colors duration-300",
              active === null ? "text-accent" : "text-ink-faint hover:text-ink",
            )}
          >
            {menuLabels.all}
          </button>

          {menu.map((category) => {
            const isActive = active === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(isActive ? null : category.id)}
                className={cx(
                  "inline-flex min-h-11 shrink-0 items-center text-[0.78rem] font-semibold tracking-[0.12em] uppercase transition-colors duration-300",
                  isActive ? "text-accent" : "text-ink-faint hover:text-ink",
                )}
              >
                {category.name[locale]}
              </button>
            );
          })}
        </div>

        {/* The list */}
        <div className="mt-16 grid gap-x-16 gap-y-20 md:grid-cols-2">
          {shown.map((category) => (
            <section
              key={category.id}
              id={`cat-${category.id}`}
              aria-labelledby={`cat-${category.id}-h`}
              className="scroll-mt-32"
            >
              <div className="flex items-baseline gap-5 border-b border-ink pb-4">
                <h3
                  id={`cat-${category.id}-h`}
                  className="font-display text-[1.7rem] font-bold tracking-[-0.03em] text-ink"
                >
                  {category.name[locale]}
                </h3>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
                <span className="text-[0.75rem] font-semibold tracking-[0.12em] text-ink-faint uppercase tabular-nums">
                  {category.items.length}
                </span>
              </div>

              {category.blurb[locale] ? (
                <p className="mt-4 text-[0.88rem] leading-relaxed text-ink-faint italic">
                  {category.blurb[locale]}
                </p>
              ) : null}

              <ul className="mt-8">
                {category.items.map((item) => (
                  <li key={item.id} className="group border-b border-line-soft py-6 last:border-0">
                    <div className="flex items-baseline gap-6">
                      <h4 className="font-body text-[1.1rem] leading-snug font-semibold text-ink transition-transform duration-400 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1">
                        {item.name[locale]}
                      </h4>

                      {item.unit?.[locale] ? (
                        <span className="shrink-0 text-[0.75rem] font-semibold tracking-[0.12em] text-ink-faint uppercase">
                          {item.unit[locale]}
                        </span>
                      ) : null}

                      {/* Dotted leader: a typographic device, and it stops the
                          eye travelling across a wide measure on the way to
                          the price. */}
                      <span
                        aria-hidden="true"
                        className="hidden h-px flex-1 self-end bg-[repeating-linear-gradient(to_right,var(--color-line)_0_3px,transparent_3px_7px)] sm:block"
                      />

                      <p className="shrink-0 font-body text-[1.05rem] font-bold tabular-nums text-ink">
                        {formatPrice(item.price, locale)}
                      </p>
                    </div>

                    {item.description?.[locale] ? (
                      <p className="measure mt-2 text-[0.9rem] leading-[1.6] text-ink-mute">
                        {item.description[locale]}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Foot of the menu */}
        <div className="mt-20 flex flex-col items-start gap-6 border-t border-line pt-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={links.menu.value} variant="solid" size="lg">
              {menuLabels.viewPdf}
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={`/${locale}#reserve`} variant="outline" size="lg">
              {ctaReserve}
            </ButtonLink>
          </div>
          <p className="measure text-[0.8rem] leading-relaxed text-ink-faint">
            {menuLabels.pricesNote}
          </p>
        </div>
      </div>
    </section>
  );
}
