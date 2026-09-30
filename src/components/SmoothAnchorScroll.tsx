"use client";

import { useEffect } from "react";

/**
 * Animates in-page anchor jumps (the navbar's Menu / Location links, the
 * footer, the cookie notice) without putting `scroll-behavior: smooth` on the
 * root element.
 *
 * That CSS is unsafe with the App Router: during a route transition Next walks
 * the DOM calling `scrollIntoView()` on every element to force layout, and it
 * assumes the ambient scroll-behavior is `auto`. A global `smooth` turns each
 * of those internal calls into an animation, and since the walk ends at the
 * last element in the document, every navigation glides to the footer.
 *
 * So we opt in per link instead: only a real click on a same-page hash is
 * animated, and the scroll is driven from JS where the behaviour is explicit.
 */
export function SmoothAnchorScroll() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Let the browser handle modified clicks (new tab, download, etc.).
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const id = decodeURIComponent(href.slice(1));
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

      // Keep the URL shareable without letting the router re-scroll.
      window.history.replaceState(null, "", href);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
