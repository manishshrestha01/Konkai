import Image from "next/image";
import { logo } from "@/data/photos";

/**
 * The official lockup, keyed to alpha (remove.bg export) and trimmed to its
 * 636x142 content box by scripts/build-images.mjs, so there is no wasted margin
 * to crop out: the asset fills its own box exactly at any size.
 *
 * Aspect ratio ≈ 4.48:1 — the red wordmark with its grey subtitle. Callers pick
 * a `height`; the width follows the aspect, so a height of 48 reads as a
 * 215px-wide lockup.
 */
interface OfficialLogoProps {
  /** Rendered height in CSS pixels. Never upscales past the source's 636px width. */
  height?: number;
  className?: string;
  priority?: boolean;
  /**
   * The lockup's red (#F40204) reaches about 3.9:1 on the ivory page — a
   * decorative brand mark, not text, so it is not held to a 4.5:1 threshold.
   * It is still never placed on the dark hero, where it would drop far lower.
   */
}

/**
 * The restaurant's official logo, taken from its own site header.
 *
 * Decorative by default — the accessible name comes from the link or heading
 * it sits inside, so the image itself is hidden from assistive technology to
 * avoid a doubled name.
 */
export function OfficialLogo({
  height = 40,
  className,
  priority = false,
}: OfficialLogoProps) {
  const width = Math.round((logo.width / logo.height) * height);

  return (
    <Image
      src={logo.src}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      priority={priority}
      unoptimized
      className={className}
      style={{ height: `${height}px`, width: `${width}px` }}
    />
  );
}