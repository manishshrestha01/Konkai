"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cx } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Stagger in ms. */
  delay?: number;
  /** Distance travelled, in rem. */
  distance?: number;
  className?: string;
  as?: ElementType;
}

/**
 * Fades and lifts its children into view once, on first intersection.
 *
 * The settled state ("shown") is the default for both the SSR HTML and the
 * first client render, so content is never blank while JavaScript parses or
 * hydrates — no-JS browsers, crawlers and slow devices all see it at once.
 * Reveal only adds the hidden start afterwards: at commit time, elements that
 * are genuinely below the fold (and the user doesn't prefer reduced motion)
 * are dropped back to opacity 0 without a transition, then animated in on
 * scroll. Anything already on screen stays visible. Nothing is ever left
 * invisible if the observer never fires.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 1.5,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const attached = useRef(false);
  const [state, setState] = useState<"idle" | "shown">("shown");

  /**
   * Runs during commit, before paint, so content that is already on screen
   * never flashes hidden. The initial render (and the SSR HTML) is already
   * "shown" — this only pulls genuinely below-fold elements back to the
   * hidden start so the scroll-in animation has something to do.
   */
  const attach = (node: HTMLElement | null) => {
    ref.current = node;
    if (!node || attached.current) return;
    attached.current = true;

    // Nothing should move, and nothing may be left invisible.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = node.getBoundingClientRect();

    // Anything already in view on mount should stay visibly settled.
    if (rect.top < window.innerHeight * 0.92) return;

    // Below the fold: set the hidden start in the same commit pass (no
    // transition, so it never fades as it hides) and reveal on scroll.
    setState("idle");

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setState("shown");
      observer.current?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };

    // Deterministic fallback: an instant scroll jump (anchor link, restored
    // scroll position, a fast fling) can carry an element past the viewport
    // between observer callbacks, which would otherwise leave it invisible
    // forever. A plain scroll listener flips it visible the moment it reaches
    // the screen, so no content can ever strand hidden.
    const onScroll = () => {
      if (node.getBoundingClientRect().top < window.innerHeight * 0.98) reveal();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            return;
          }
        }
      },
      // Extra root margin below the fold so sections start animating just
      // before they enter the screen, and so a fast scroll never skips them.
      { threshold: 0.01, rootMargin: "0px 0px 25% 0px" },
    );

    observer.current = io;
    io.observe(node);
  };

  useEffect(() => () => observer.current?.disconnect(), []);

  return (
    <Tag
      ref={attach}
      className={cx(className)}
      style={
        state === "shown"
          ? {
              opacity: 1,
              transform: "none",
              transition: `opacity 900ms var(--ease-out-soft) ${delay}ms, transform 900ms var(--ease-out-soft) ${delay}ms`,
            }
          : {
              opacity: 0,
              transform: `translate3d(0, ${distance}rem, 0)`,
              transition: "opacity 900ms var(--ease-out-soft), transform 900ms var(--ease-out-soft)",
            }
      }
    >
      {children}
    </Tag>
  );
}
