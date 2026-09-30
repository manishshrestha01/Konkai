/**
 * Third-party Google Reviews widget, loaded behind explicit consent.
 *
 * Why it is gated rather than embedded directly:
 *
 *  - The restaurant is in Barcelona, so GDPR applies. A reviews widget is a
 *    non-essential third-party script: it must not run before the visitor
 *    agrees, and the choice has to be recorded.
 *  - The vendor's script is third-party JS. Keeping it out of the initial
 *    payload protects the Largest Contentful Paint on the hero photograph.
 *  - Nothing is requested from the vendor, and no identifier is set, until the
 *    visitor presses the button.
 *
 * Configure with:
 *   NEXT_PUBLIC_REVIEWS_PROVIDER   "elsight" | "trustindex"
 *   NEXT_PUBLIC_REVIEWS_WIDGET_ID  the widget/app id from the vendor dashboard
 *
 * With no id set the component renders the static Google quotes instead, so the
 * section is never empty and the page still builds and deploys cleanly.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "./Icons";
import { ratings } from "@/data/restaurant";

const PROVIDER = process.env.NEXT_PUBLIC_REVIEWS_PROVIDER?.toLowerCase();
const WIDGET_ID = process.env.NEXT_PUBLIC_REVIEWS_WIDGET_ID?.trim();

/** True when the build has both a supported provider and an id to load. */
export const widgetConfigured = Boolean(
  WIDGET_ID && (PROVIDER === "elsight" || PROVIDER === "trustindex"),
);

function widgetUrl(): string {
  return PROVIDER === "trustindex"
    ? `https://widget.trustindex.net/loader/${WIDGET_ID}`
    : `https://static.elfsight.com/apps/elfsight-app-${WIDGET_ID}.js`;
}

function mountPoint(): string {
  return PROVIDER === "trustindex" ? "trustindex-widget" : `elfsight-app-${WIDGET_ID}`;
}

interface GoogleReviewsWidgetProps {
  locale: string;
  strings: {
    consentTitle: string;
    consentBody: string;
    consentButton: string;
    vendorNote: string;
    fallbackTitle: string;
    loading: string;
  };
}

export function GoogleReviewsWidget({ locale, strings }: GoogleReviewsWidgetProps) {
  const [consented, setConsented] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const holder = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!consented || loaded || failed) return;

    let cancelled = false;

    // The vendor scans the document for its mount point on load, so the
    // container has to exist before the script tag is added.
    const start = () => {
      if (cancelled) return;
      setLoaded(true);
    };

    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-reviews-widget="true"]`,
    );

    if (existing) {
      start();
      return;
    }

    const script = document.createElement("script");
    script.src = widgetUrl();
    script.async = true;
    script.dataset.reviewsWidget = "true";
    script.addEventListener("load", start);
    script.addEventListener("error", () => {
      if (!cancelled) setFailed(true);
    });
    document.body.appendChild(script);

    // If the vendor never claims the container, do not leave a spinner up.
    const guard = window.setTimeout(() => {
      if (!cancelled && !holder.current?.firstElementChild) setFailed(true);
    }, 8000);

    return () => {
      cancelled = true;
      window.clearTimeout(guard);
    };
  }, [consented, loaded, failed]);

  if (!widgetConfigured) {
    return <StaticGoogleQuotes locale={locale} title={strings.fallbackTitle} />;
  }

  return (
    <div className="mt-12">
      {!consented ? (
        <ConsentGate
          title={strings.consentTitle}
          body={strings.consentBody}
          button={strings.consentButton}
          note={strings.vendorNote}
          onAccept={() => setConsented(true)}
        />
      ) : (
        <>
          <div
            ref={holder}
            id={mountPoint()}
            data-widget-locale={locale}
            className="min-h-40"
          />
          {!loaded || failed ? (
            <p className="mt-4 text-[0.8rem] text-paper/50" role="status">
              {failed ? strings.fallbackTitle : strings.loading}
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}

function ConsentGate({
  title,
  body,
  button,
  note,
  onAccept,
}: {
  title: string;
  body: string;
  button: string;
  note: string;
  onAccept: () => void;
}) {
  return (
    <div className="border border-line bg-paper/5 p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h3 className="font-display text-[1.35rem] leading-snug text-paper">{title}</h3>
          <p className="mt-2.5 text-[0.9rem] leading-relaxed text-paper/70">{body}</p>
          <p className="mt-3 text-[0.75rem] leading-relaxed text-paper/45">{note}</p>
        </div>
        <button
          type="button"
          onClick={onAccept}
          className="inline-flex min-h-12 shrink-0 items-center justify-center border border-paper/40 px-7 text-[0.75rem] font-medium tracking-[0.14em] text-paper uppercase transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink"
        >
          {button}
        </button>
      </div>
    </div>
  );
}

/**
 * Shown when no widget is configured. Renders the same Google rating the page
 * already publishes, and points at Google for the full set, so the section
 * never pretends to be a live feed of something it is not.
 */
function StaticGoogleQuotes({ locale, title }: { locale: string; title: string }) {
  const { value, count } = ratings.google;
  return (
    <div className="mt-12 border border-line bg-paper/5 p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span
          className="font-display text-[2.5rem] leading-none text-paper"
          aria-hidden="true"
        >
          {new Intl.NumberFormat(locale === "ca" ? "ca-ES" : locale === "es" ? "es-ES" : "en-GB", {
            minimumFractionDigits: 1,
          }).format(value)}
        </span>
        <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${value} / 5`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.round(value) ? "text-accent" : "text-paper/25"}`}
            />
          ))}
        </span>
        <span className="text-[0.85rem] text-paper/70">
          {new Intl.NumberFormat(locale === "ca" ? "ca-ES" : locale === "es" ? "es-ES" : "en-GB").format(count)}{" "}
          {locale === "en" ? "reviews" : locale === "es" ? "opiniones" : "opinions"}
        </span>
      </div>
      <p className="mt-4 max-w-2xl text-[0.9rem] leading-relaxed text-paper/70">{title}</p>
    </div>
  );
}
