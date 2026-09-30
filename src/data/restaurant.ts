/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH
 * ============================================================================
 * Every field below is traceable to a public source. The `src` annotation on
 * each field records where the value came from so it can be re-verified.
 *
 * Anything that could NOT be verified is either absent or explicitly set to
 * `null` with a `src: "unavailable"` marker. Nothing here is invented.
 *
 * See docs/DATA-SOURCES.md for the full provenance table.
 * ============================================================================
 */

export type SourceId =
  | "google-maps"
  | "official-site"
  | "official-instagram"
  | "thefork"
  | "opentable"
  | "ubereats"
  | "bcnrestaurantes"
  | "osm-nominatim"
  | "owner-supplied";

export interface Sourced<T> {
  value: T;
  src: SourceId | "unavailable" | "derived";
  /** Optional note where the value needed interpretation. */
  note?: string;
}

export const SOURCES: Record<SourceId, { label: string; url: string }> = {
  "google-maps": {
    label: "Google Maps listing",
    url: "https://maps.app.goo.gl/8cKcmhTtrv5XRct88",
  },
  "official-site": {
    label: "Official website (konkaisushi.es)",
    url: "https://www.konkaisushi.es/",
  },
  "official-instagram": {
    label: "Official Instagram",
    url: "https://www.instagram.com/konkai.sushi.house",
  },
  thefork: {
    label: "TheFork",
    url: "https://www.thefork.com/restaurant/konkai-sushi-house-r367737",
  },
  opentable: {
    label: "OpenTable",
    url: "https://www.opentable.com/r/konkai-sushi-house-barcelona",
  },
  ubereats: {
    label: "Uber Eats",
    url: "https://www.ubereats.com/es-en/store/konkai-sushi-house/4pG2X2H_QKC5dcHP6P3b4w",
  },
  bcnrestaurantes: {
    label: "BCN Restaurantes",
    url: "https://www.bcnrestaurantes.com/eng/barcelona.asp/barcelona-fotos.asp?restaurante=konkai-sushi",
  },
  "osm-nominatim": {
    label: "OpenStreetMap / Nominatim geocode of the official address",
    url: "https://nominatim.openstreetmap.org/search?street=Carrer+de+Roger+de+Flor+222&city=Barcelona&country=Spain",
  },
  "owner-supplied": {
    label: "Read directly off the Google Maps listing by the client",
    url: "https://maps.app.goo.gl/8cKcmhTtrv5XRct88",
  },
};

/* -------------------------------------------------------------------------- */
/*  Identity                                                                    */
/* -------------------------------------------------------------------------- */

export const name = {
  value: "Konkai Sushi House",
  src: "google-maps",
} satisfies Sourced<string>;

/** Secondary brand form printed on the restaurant's own signage and site. */
export const brandMark = {
  value: "KONKAI SUSHI",
  src: "official-site",
} satisfies Sourced<string>;

/* -------------------------------------------------------------------------- */
/*  Location                                                                    */
/* -------------------------------------------------------------------------- */

export const address = {
  street: "Carrer de Roger de Flor, 222",
  /** The restaurant's own Instagram and TheFork both give the "bis" form. */
  streetAlt: "Carrer de Roger de Flor, 222 Bis",
  locality: "Barcelona",
  region: "Catalunya",
  regionCode: "CT",
  postalCode: "08013",
  country: "ES",
  countryName: "Spain",
  neighborhood: {
    ca: "la Dreta de l'Eixample",
    es: "la Dreta de l'Eixample",
    en: "Dreta de l'Eixample, Eixample",
  },
  src: "official-site",
} as const;

export const geo = {
  latitude: 41.4003995,
  longitude: 2.1707175,
  src: "osm-nominatim",
  note: "Geocoded from the official street address (building no. 222). Google Maps does not publish coordinates in its page markup.",
} as const;

export const phone = {
  display: "+34 931 560 414",
  e164: "+34931560414",
  src: "official-site",
  note: "Confirmed identically on the official site, the official Instagram bio, and OpenTable. (BCN Restaurantes lists a different number, 933 944 225; the official site number takes precedence.)",
} as const;

/* -------------------------------------------------------------------------- */
/*  Links                                                                       */
/* -------------------------------------------------------------------------- */

const mapsQuery = encodeURIComponent(
  "Konkai Sushi House, Carrer de Roger de Flor, 222, 08013 Barcelona",
);

export const links = {
  website: { value: "https://www.konkaisushi.es/", src: "official-site" },
  instagram: {
    value: "https://www.instagram.com/konkai.sushi.house",
    src: "official-instagram",
  },
  facebook: {
    value: "https://www.facebook.com/profile.php?id=100057538475414",
    src: "official-site",
  },
  googleMaps: {
    value: "https://maps.app.goo.gl/8cKcmhTtrv5XRct88",
    src: "google-maps",
  },
  directions: {
    value: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
    src: "derived",
  },
  search: {
    value: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
    src: "derived",
  },
  reserveTheFork: {
    value: "https://www.thefork.com/restaurant/konkai-sushi-house-r367737",
    src: "thefork",
  },
  reserveOpenTable: {
    value: "https://www.opentable.com/r/konkai-sushi-house-barcelona",
    src: "opentable",
  },
  orderUberEats: {
    value: "https://www.ubereats.com/es-en/store/konkai-sushi-house/4pG2X2H_QKC5dcHP6P3b4w",
    src: "ubereats",
  },
  menu: {
    value: "https://drive.google.com/file/d/1x5BhHV74pl-5Bv9gRtqG1EdF_awB_r0X/view",
    src: "official-site",
    note: "The restaurant links its printable a-la-carte PDF from every page of the official site.",
  },
  privacy: {
    value: "https://www.konkaisushi.es/politica_privacidad",
    src: "official-site",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Opening hours                                                               */
/* -------------------------------------------------------------------------- */

export type Locale = "en" | "es" | "ca";
export const LOCALES: Locale[] = ["en", "es", "ca"];

export interface ServiceBlock {
  /** 24h, local Barcelona time. Midnight is expressed as "24:00". */
  from: string;
  to: string;
}

/** day index 0 = Monday … 6 = Sunday (matches Schema.org / openingHoursSpecification). */
export const openingHours: {
  day: string;
  blocks: ServiceBlock[];
  src: SourceId;
}[] = [
  { day: "Monday", blocks: [{ from: "12:00", to: "16:00" }, { from: "16:00", to: "24:00" }], src: "official-site" },
  { day: "Tuesday", blocks: [{ from: "16:00", to: "24:00" }], src: "official-site" },
  { day: "Wednesday", blocks: [{ from: "12:00", to: "16:00" }, { from: "16:00", to: "24:00" }], src: "official-site" },
  { day: "Thursday", blocks: [{ from: "12:00", to: "16:00" }, { from: "16:00", to: "24:00" }], src: "official-site" },
  { day: "Friday", blocks: [{ from: "12:00", to: "16:00" }, { from: "16:00", to: "24:00" }], src: "official-site" },
  { day: "Saturday", blocks: [{ from: "12:00", to: "16:00" }, { from: "16:00", to: "24:00" }], src: "official-site" },
  { day: "Sunday", blocks: [{ from: "12:00", to: "16:00" }, { from: "16:00", to: "24:00" }], src: "official-site" },
];

export const dayNames: Record<Locale, string[]> = {
  en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  es: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
  ca: ["Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte", "Diumenge"],
};

/* -------------------------------------------------------------------------- */
/*  Ratings                                                                     */
/* -------------------------------------------------------------------------- */

export const ratings = {
  google: {
    value: 4.5,
    count: 1170,
    src: "owner-supplied",
    note: "Read off the Google Maps listing. Google does not expose this in crawlable markup, so it could not be machine-verified.",
  },
  thefork: {
    value: 8.9,
    scale: 10,
    count: 1577,
    averageSpend: 16,
    src: "thefork",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Attributes                                                                  */
/* -------------------------------------------------------------------------- */

export const cuisine = {
  value: ["Japanese", "Sushi", "Asian"],
  src: "ubereats",
  note: "TheFork and OpenTable both classify the restaurant as Japanese / Sushi.",
} satisfies Sourced<string[]>;

export const priceRange = {
  value: "€€",
  src: "derived",
  note: "TheFork reports an average spend of €16; OpenTable shows €31–€50 (set menus). The published a-la-carte runs from €2 to €10.95 per dish, so a two-symbol range is the honest representation.",
} as const;

export const services = {
  value: [
    "Dine-in",
    "Takeaway",
    "No-contact delivery",
    "Outdoor terrace",
    "Indoor dining room",
    "Reservations",
  ] as const,
  src: "ubereats",
  note: "Terrace and indoor room are described on the official site; delivery and takeaway are confirmed by the restaurant's Uber Eats store; reservations by TheFork and OpenTable.",
};

export const terraceSeats = { value: 12, src: "official-site" } as const;
export const nearbyParking = {
  value: "Carrer de València 375–377",
  src: "official-site",
} as const;
export const nearestMetro = {
  value: "Verdaguer (L4 · L5)",
  src: "bcnrestaurantes",
  note: "Third-party listing, not stated by the restaurant. Treat as a convenience hint, not an official claim.",
} as const;

export const dressCode = {
  value: "Casual",
  src: "derived",
  note: "OpenTable lists 'Business Casual'; TheFork and BCN Restaurantes both describe the room as informal/casual. Casual is the safer characterisation.",
} as const;

/* -------------------------------------------------------------------------- */
/*  Positioning copy — adapted from the restaurant's own website wording        */
/* -------------------------------------------------------------------------- */

export const intro: Record<Locale, { lead: string; body: string[] }> = {
  en: {
    lead: "Japanese cuisine a short walk from the Sagrada Família.",
    body: [
      "Konkai Sushi House is a neighbourhood Japanese restaurant on Carrer de Roger de Flor, in the Dreta de l'Eixample. The kitchen works across sushi and sashimi, maki, nigiri, temaki, chirashi and poke bowls, alongside a broad range of hot dishes — noodles, rice, soups and grilled skewers.",
      "There is an outdoor terrace for up to twelve diners and an indoor dining room. The restaurant is open every day of the week, with lunch service from midday and evening service running through to midnight.",
    ],
  },
  es: {
    lead: "Cocina japonesa a pocos metros de la Sagrada Família.",
    body: [
      "Konkai Sushi House es un restaurante japonés de barrio en Carrer de Roger de Flor, en la Dreta de l'Eixample. La cocina trabaja sushi y sashimi, maki, nigiri, temaki, chirashi y poke bowls, además de una amplia carta de platos calientes: tallarines, arroz, sopas y pinchos a la plancha.",
      "Cuenta con una terraza exterior para hasta doce comensales y un salón interior. Abrimos todos los días de la semana, con servicio de mediodía desde las 12:00 y servicio de noche hasta la medianoche.",
    ],
  },
  ca: {
    lead: "Cuina japonesa a pocs metres de la Sagrada Família.",
    body: [
      "Konkai Sushi House és un restaurant japonès de barri al Carrer de Roger de Flor, a la Dreta de l'Eixample. La cuina treballa sushi i sashimi, maki, nigiri, temaki, chirashi i poke bowls, a més d'una àmplia carta de plats calents: tallarines, arròs, sopes i pinxos a la planxa.",
      "Compta amb una terrassa exterior per a fins a dotze comensals i un saló interior. Obrem tots els dies de la setmana, amb servei de migdia des de les 12:00 i servei de nit fins a la medianocta.",
    ],
  },
};

export const tagline: Record<Locale, string> = {
  en: "Japanese cuisine near the Sagrada Família",
  es: "Cocina japonesa cerca de la Sagrada Família",
  ca: "Cuina japonesa a prop de la Sagrada Família",
};

/* -------------------------------------------------------------------------- */
/*  Reviews — verbatim quotes, attributed to their actual platform              */
/* -------------------------------------------------------------------------- */

export interface Review {
  author: string;
  /** Number of reviews the author had posted on that platform at the time. */
  authorReviewCount: number;
  score: string;
  date: string; // ISO
  platform: "TheFork" | "OpenTable";
  quote: string;
}

export const reviews: Review[] = [
  {
    author: "Ami G.",
    authorReviewCount: 8,
    score: "9.5/10",
    date: "2025-03-31",
    platform: "TheFork",
    quote: "Very fresh and authentic food. Lots of vegetarian options too.",
  },
  {
    author: "Riccardo L.",
    authorReviewCount: 2,
    score: "10/10",
    date: "2024-08-30",
    platform: "TheFork",
    quote: "Well-prepared food, fresh fish and good environment. Recommended.",
  },
  {
    author: "Andreas D.",
    authorReviewCount: 37,
    score: "8/10",
    date: "2025-04-16",
    platform: "TheFork",
    quote:
      "The food is always good, however the service could be better, it's not too welcoming.",
  },
  {
    author: "TheForkUser",
    authorReviewCount: 0,
    score: "5/5",
    date: "2024-01-29",
    platform: "OpenTable",
    quote:
      "Very friendly waiters. The food wasn't that expensive for the high quality and fresh food we got on our plate. I would really recommend this place if you want to have a nice sushi evening in Barcelona.",
  },
  {
    author: "Stefanie E.",
    authorReviewCount: 3,
    score: "10/10",
    date: "2025-02-08",
    platform: "TheFork",
    quote: "Really nice Sushi and super fast service.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Site-level SEO constants                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Replace with the real production origin before deploying.
 * Kept in one place so canonical URLs, sitemap and JSON-LD never drift apart.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.konkaisushi.es";
