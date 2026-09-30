import Image from "next/image";
import { logo } from "@/data/photos";

/**
 * The transparent margin baked into the 150x75 source, measured from
 * `public/images/logo-150.webp`: the red wordmark occupies x 20–128, y 17–56,
 * so the canvas carries 20px of left padding, 21px of right, 17px of top and
 * 18px of bottom. That is 53% of the height spent on nothing, which is why the
 * logo reads as tiny until it is trimmed.
 *
 * If the asset is ever replaced, re-measure these four numbers against
 * `public/images/logo-150.webp`.
 */
const PAD = { top: 17, right: 21, bottom: 18, left: 20 } as const;

const CONTENT_W = logo.width - PAD.left - PAD.right; // 109
const CONTENT_H = logo.height - PAD.top - PAD.bottom; // 40

interface OfficialLogoProps {
  /**
   * Rendered height in CSS pixels of the *canvas*. Never upscales past the
   * source's 150px width. Use `trim` to make this mean the visible mark.
   */
  height?: number;
  className?: string;
  priority?: boolean;
  /**
   * Crop the transparent padding so the wordmark fills its box. At
   * `height={40}` this renders the mark at exactly its native 109x40 — sharp,
   * with no upscaling. Leave it off where the padding is wanted as breathing
   * room, e.g. beside a large heading.
   */
  trim?: boolean;
  /**
   * The wordmark is deep red (#AA1218) and only reaches 7:1 on a light
   * background — 2.45:1 on the dark hero, which fails contrast. It therefore
   * never carries a `tone` prop; callers place it only on light surfaces.
   */
}

/**
 * The restaurant's official wordmark, taken from its own site header.
 *
 * Decorative by default — the accessible name comes from the link or heading
 * it sits inside, so the image itself is hidden from assistive technology to
 * avoid a doubled name.
 */
export function OfficialLogo({
  height = 34,
  className,
  priority = false,
  trim = false,
}: OfficialLogoProps) {
  const width = Math.round((logo.width / logo.height) * height);

  const image = (
    <Image
      src={logo.src}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      priority={priority}
      unoptimized
      className={className}
      style={
        trim
          ? {
              // Pull the canvas up and left so the visible mark sits in the box
              marginTop: `${-(PAD.top / logo.height) * height}px`,
              marginLeft: `${-(PAD.left / logo.width) * width}px`,
            }
          : { height: `${height}px`, width: `${width}px` }
      }
    />
  );

  if (!trim) return image;

  // A wrapper of exactly the content's size, with the overflow cropped off.
  return (
    <span
      aria-hidden="true"
      className="inline-block overflow-hidden align-middle"
      style={{
        width: `${(CONTENT_W / logo.width) * width}px`,
        height: `${(CONTENT_H / logo.height) * height}px`,
      }}
    >
      {image}
    </span>
  );
}
