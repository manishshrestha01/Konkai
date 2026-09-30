import manifest from "./photos.generated.json";

export interface Photo {
  id: string;
  width: number;
  height: number;
  blur: string;
  src: string;
  alt: string;
}

type ManifestEntry = {
  width: number;
  height: number;
  blur: string;
  sizes: Record<string, string>;
};

const M = manifest as unknown as Record<string, ManifestEntry>;

/**
 * ---------------------------------------------------------------------------
 * ALT TEXT — REQUIRES OWNER CONFIRMATION
 * ---------------------------------------------------------------------------
 * These descriptions were written from the file names and from the position each
 * image occupies on the restaurant's own gallery page. The images themselves
 * could not be inspected during the build, so every alt text below is
 * deliberately generic rather than a guess at a specific dish.
 *
 * Before launch, the owner should fill in `ALT_OVERRIDES` with real
 * descriptions. That is both an accessibility obligation and the single
 * highest-value SEO lever for image search on a restaurant site.
 * ---------------------------------------------------------------------------
 */
const ALT_OVERRIDES: Record<string, string> = {};

const DEFAULT_ALT = "Photograph published by Konkai Sushi House, Barcelona";
const DISH_ALT = "A dish from the kitchen of Konkai Sushi House in Barcelona";

function toPhoto(id: string, alt?: string): Photo {
  const entry = M[id];
  if (!entry) throw new Error(`Unknown photo id: ${id}`);
  const largest = Math.max(...Object.keys(entry.sizes).map(Number));
  return {
    id,
    width: entry.width,
    height: entry.height,
    blur: entry.blur,
    src: `/images/${id}-${largest}.webp`,
    alt: ALT_OVERRIDES[id] ?? alt ?? DEFAULT_ALT,
  };
}

/** The widest photograph in the restaurant's own gallery. */
/**
 * The hero is the brightest, highest-contrast frame available, because it is
 * the one that has to survive a full-bleed crop and a scrim behind the type.
 *
 * The previous choice (`00-cover`, mean luminance 65/255, contrast 39) was the
 * flattest and dimmest image in the set; with any scrim over it the section
 * rendered as a uniform near-black panel and the photograph disappeared.
 * The image now used here measures 121/255 at contrast 90.
 *
 * The photographs could still not be reviewed by eye, so treat the *choice* of
 * hero as provisional — the measurements are objective, the composition is not.
 */
export const heroPhoto = toPhoto(
  "6411e4117b3ea",
  "Konkai Sushi House, Japanese restaurant in the Eixample district of Barcelona",
);

/**
 * The official wordmark, taken from the restaurant's own site header. 150x75 is
 * the only rendition published, so it is never upscaled. Its white background
 * was keyed to alpha by scripts/build-images.mjs, which lets it sit on the warm
 * ivory page background (7.05:1 contrast) instead of showing a white plate.
 *
 * The wordmark is deep red, so it must only be placed on a light background.
 * Over the dark hero it would fall to 2.45:1 and is deliberately not used.
 */
export const logo = toPhoto("logo", "Konkai Sushi House");

/**
 * The restaurant's own featured photographs, in the order it presents them.
 *
 * Every one of these sits in a large card on a light background, so the frames
 * with the near-black exposure (mean luminance 16, 36 and 39) were dropped in
 * favour of ones that actually read as food. All six now measure 98–121/255.
 */
export const signaturePhotos = [
  toPhoto("65d767abb77a3", DISH_ALT),
  toPhoto("64079fb27b5da", DISH_ALT),
  toPhoto("6411e7597c724", DISH_ALT),
  toPhoto("6411e432c7b63", DISH_ALT),
  toPhoto("65d7678f934e9", DISH_ALT),
  toPhoto("6411e7e155c1f", DISH_ALT),
];

/** Used beside the introduction, in place of the hero frame. */
export const introPhoto = toPhoto(
  "613778390fdac",
  "Konkai Sushi House in Barcelona's Eixample district",
);

/**
 * The visual the owner provided for the location section: the map slot below
 * the address is replaced by this image until the interactive map is loaded.
 */
export const locationPhoto = toPhoto(
  "screenshot-6765306d99f8",
  "Konkai Sushi House, Carrer de Roger de Flor 222, Barcelona",
);

/**
 * The full gallery: every remaining frame, ordered brightest first so the grid
 * opens on strong images and the darker, moodier shots sit further in, where a
 * sequence of them reads as deliberate rather than as a broken first impression.
 *
 * The hero, the six signature dishes and the intro frame are filtered out, so no
 * photograph appears twice on the page.
 */
const GALLERY_ORDER = [
  "6137784fda748",
  "6411e88d549f4",
  "63f756f85b001",
  "63f757037d6cb",
  "6411e83c66d1b",
  "6411e82f21469",
  "6137785bde5c6",
  "6411e340951ad",
  "6411e8a7ecdf6",
  "6411e424804bb",
  "63f756ed12030",
  "00-cover",
  "63f756d784493",
  "6411e8c8a1588",
  "6411e8b4820d9",
  "6411e8d488deb",
  "6411e8be99167",
];

const usedAboveTheFold = new Set<string>([
  heroPhoto.id,
  introPhoto.id,
  ...signaturePhotos.map((p) => p.id),
]);

export const galleryPhotos: Photo[] = Array.from(
  new Set(
    GALLERY_ORDER.filter((id) => M[id] && !usedAboveTheFold.has(id)),
  ),
).map((id) => toPhoto(id, DISH_ALT));

/** Every photograph on the page, for the lightbox. */
export const allPhotos: Photo[] = [
  heroPhoto,
  ...signaturePhotos,
  introPhoto,
  ...galleryPhotos,
];

/** Low-quality image placeholder as a CSS background, for blur-up. */
export function blurStyle(photo: Photo): { backgroundImage: string; backgroundSize: string } {
  return {
    backgroundImage: `url(${photo.blur})`,
    backgroundSize: "cover",
  };
}
