"use client";

import { useEffect, useState } from "react";
import { links, type Locale } from "@/data/restaurant";
import { cx } from "@/lib/utils";
import { ArrowUpRight, Pin } from "./Icons";

/**
 * Mobile-only action bar. Appears once the hero has been scrolled past and
 * hides as the reservation section comes into view, so it never sits on top
 * of the buttons it duplicates.
 */
export function StickyActions({
  labels,
}: {
  locale: Locale;
  labels: { directions: string; reserve: string };
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.85;
      const reserve = document.getElementById("reserve");
      const inReserve = reserve
        ? reserve.getBoundingClientRect().top < window.innerHeight * 0.85
        : false;
      setVisible(past && !inReserve);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cx(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/94 backdrop-blur-xl",
        "transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      // The bar is decorative duplication of in-page CTAs; hide it from AT
      // on desktop where those CTAs are always visible.
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-2 divide-x divide-line">
        <a
          href={links.directions.value}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 flex-col items-center justify-center gap-1 text-ink transition-colors active:bg-ink/[0.05]"
        >
          <Pin className="h-4 w-4" aria-hidden="true" />
          <span className="text-[0.75rem] font-medium tracking-[0.14em] uppercase">
            {labels.directions}
          </span>
        </a>
        <a
          href={links.reserve.value}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 flex-col items-center justify-center gap-1 bg-ink text-paper transition-colors active:bg-accent"
        >
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          <span className="text-[0.75rem] font-medium tracking-[0.14em] uppercase">
            {labels.reserve}
          </span>
        </a>
      </div>
    </div>
  );
}
