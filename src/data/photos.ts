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
  const widths = Object.keys(entry.sizes).map(Number);
  const largest = widths.length > 0 ? Math.max(...widths) : entry.width;
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
 * The official logo, taken from the owner's own artwork. Its white background
 * was keyed to alpha and it was trimmed to its 1966x385 content box by
 * scripts/build-images.mjs, so it sits on the warm ivory page background
 * without a box.
 *
 * The lockup is a bright red (#F30203) wordmark with a subtitle below, so it
 * must only be placed on a light background — over the dark hero it would not
 * read.
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

/**
 * Photos the owner has confirmed match a specific dish, keyed by the dish id
 * in `src/data/menu.ts`. These override the positional signature layout, so the
 * confirmed dish always shows the right plate regardless of its grid slot.
 */
export const dishPhotoById: Record<string, Photo> = {
  "uramaki-casa": toPhoto("6411e4117b3ea", DISH_ALT),
  "gyoza-pollo": toPhoto("att.5oTsYqIg728835hoNnjE3GpAJjDb68AjxAm-B8tkeSw", DISH_ALT),
  "wakame-sarada": toPhoto("613778390fdac", DISH_ALT),
  "uramaki-konkai": toPhoto("att.Nz-4HzmV0EPmQPIvvLsReN7GPsDrNPE66L3s8rKStCE", DISH_ALT),
  "uramaki-tori": toPhoto("att.rinum2utz90O2ssxbUAmurg2ETicKT2wiMzt5V7ifVA", DISH_ALT),
  "gyoza-gambas": toPhoto("att.bOBr7uebJ-Set-j3AHucYBPJ4YmOZSRd1mPEROOyxIc", DISH_ALT),
  "poke-atun": toPhoto("att.gkKs1Ys-a7Z2jv-5t3PjJnPEUhAc_VPG2PMxg0FgxG8", DISH_ALT),
};

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
  "att.ai8uxf3dJOH4RwgNaZW8u90EodP0M23K4aaSSJeAQ7c",
  "Konkai Sushi House, Carrer de Roger de Flor 222, Barcelona",
);

/**
 * The full gallery: every remaining frame, ordered brightest first so the grid
 * opens on strong images and the darker, moodier shots sit further in, where a
 * sequence of them reads as deliberate rather than as a broken first impression.
 *
 * It combines the photographs from the official site's own gallery with the
 * frames the owner supplied for the relaunch, interleaved by measured
 * luminance so the bright-to-dark flow is unbroken.
 *
 * The hero, the six signature dishes and the intro frame are filtered out, so no
 * photograph appears twice on the page.
 */
const GALLERY_ORDER = [
  "6137784fda748",
  "att.ai8uxf3dJOH4RwgNaZW8u90EodP0M23K4aaSSJeAQ7c",
  "att.qd3k46qlQQazrA8Cp1zD_n0QtGv1VFxRA3HxxuO2zF8",
  "6411e88d549f4",
  "63f756f85b001",
  "att.Yo_FCyrOcE1rRjJXiWbMEXg_dVjr4A8cTEZjLXvG3tI",
  "att.RGr3RMFqmZUSxWJmrHWfzp06LzczuQbn61pENG5GE5o",
  "att.OjF1Ja4Mvc4JSu8Gxci-pYgunam5Fw0tamoCz8RcEYM",
  "att.3yDiT5PAd01kxoezKW5ILKOg_AaeqCZ90DlpB7C-NgQ",
  "att.IQ5TAVO54QcNoQp_lYUQbvh_8WPX_aT0Qh4Lsd0m4wc",
  "63f757037d6cb",
  "6411e83c66d1b",
  "6411e82f21469",
  "att.1pBKNKGFf_yvUJyYwtXyN44oeEOOrYtACWMMFzyekXY",
  "6137785bde5c6",
  "att.jHThuRSHb76IyalOl37MXiAZZpdyGANXs7v7mExY5Uk",
  "6411e340951ad",
  "6411e8a7ecdf6",
  "6411e424804bb",
  "63f756ed12030",
  "00-cover",
  "63f756d784493",
  "att.p6rJhUVETFa-jc1v5UAF8E8FHNeYhJMU4mqTYVaJsdw",
  "att.Y3lHR5-HAAd1QBfMirGxfLNbkx6NAelzjSi-_JDJdrE",
  "att.x_2bHkONpzZr767uovgElT-L0GvHx-l7o4mL1CO_bJE",
  "att.bng4sw4dXSk4_dNy-5dBUXgIR1lFXK6dm7w_a0DWXvQ",
  "att.pXBvyXUABxybBcqoyGF20j-Dzv9qMXZcQYUU9qH97Lc",
  "6411e8c8a1588",
  "att.gkKs1Ys-a7Z2jv-5t3PjJnPEUhAc_VPG2PMxg0FgxG8",
  "6411e8b4820d9",
  "6411e8d488deb",
  "att.Ap-m3QGGFpxqeG-xdqgAK13y70iXs7dOc0Ljv8nPwE4",
  "att.L4SZNQx0d9D8OlwTIaXn2H5J_G0jlAqj5hKpdQKSDAw",
  "att.8fvFbIBcIvuMGNxCZ3uNdxAdEm7BNqjRNS1of6h9oIQ",
  "att.iiIoFvREwzSwCbvEMPq4MRltDj-NRx3r9wHomxcQq1E",
  "att.19oH7xSlC3GHdwI1r0Jbyoy5Oa5a6A7jFcoiuoS3qHI",
  "att.5oTsYqIg728835hoNnjE3GpAJjDb68AjxAm-B8tkeSw",
  "att.BnCX4Q_KvHlpdFBzNKZP0NLh-WikHojTPXBNQ6VMeEw",
  "6411e8be99167",
  "att.bOBr7uebJ-Set-j3AHucYBPJ4YmOZSRd1mPEROOyxIc",
  "att.Gf6ww2roAvqhJB1aAWazToz_RcodGbZYr_EhHQio1O4",
  "att.CcXsojF4hwhU8J8kZNYHgSDwGCSZVptXYwZ_1ZL62dA",
];

const usedAboveTheFold = new Set<string>([
  heroPhoto.id,
  introPhoto.id,
  locationPhoto.id,
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
