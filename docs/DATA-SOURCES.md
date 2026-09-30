# Data sources

Every business fact on this site lives in `src/data/restaurant.ts` (or
`src/data/menu.ts`) and carries a `src` field naming the source below. Nothing
was invented to fill a gap: where a value could not be confirmed it is either
omitted or explicitly marked `derived`.

| `src` id | Source | URL | Used for |
| --- | --- | --- | --- |
| `official-site` | Konkai Sushi House website | https://www.konkaisushi.es/ | Name, address, postal code, phone, cuisine description, terrace size, parking, printable menu PDF, privacy policy |
| `google-maps` | Google Maps listing | https://maps.app.goo.gl/8cKcmhTtrv5XRct88 | Canonical map link, neighbourhood, Maps listing link, opening hours, reservation link |
| `official-instagram` | Instagram (handle confirmed by the owner) | https://www.instagram.com/konkai.sushi.house | Social profile link |
| `ubereats` | Uber Eats store | https://www.ubereats.com/es-en/store/konkai-sushi-house/4pG2X2H_QKC5dcHP6P3b4w | Cuisine tags, dine-in / takeaway / delivery services, order link |
| `bcnrestaurantes` | BCN Restaurantes (directory) | https://www.bcnrestaurantes.com/ | Nearest metro station, cross-check of neighbourhood |
| `osm-nominatim` | OpenStreetMap / Nominatim | https://nominatim.openstreetmap.org/ | Latitude and longitude |
| `owner-supplied` | Supplied directly by the restaurant owner | — | Google rating 4.5 / 1,170 reviews |
| `derived` | Computed in this repo from the above | — | Price range `€€`, menu price bounds, per-dish range, category counts |
| `unavailable` | Deliberately blank | — | Values no source would confirm |

## Known discrepancies

- **Street number.** The official site says `222`. The restaurant's Instagram
  shows `222 Bis`. The site uses `222` because that is what the restaurant
  publishes about itself. Google Maps resolves to the same Knowledge Graph
  entity.
- **Postal code.** The official site says `08013`. Nominatim returns `08037`
  when geocoding the building number, which appears to be a geocoding artefact
  rather than the postal district. `08013` is used.
- **Instagram handle.** The owner's chosen handle is `konkai.sushi.house`. A
  footer on the official site links `@kon.kai.507`. The owner's choice is used,
  and the conflict is worth resolving before launch.

## Claims deliberately not made

- **Walk-ins.** No source states that walk-ins are accepted, so the site does
  not say so. It points to the restaurant's Google Maps listing to book or
  reserve instead.
- **Prices on reservation platforms.** No third-party price figures are shown;
  the a-la-carte menu is the only price source used.

## The Google reviews widget

Google does not permit reviews to be embedded directly — there is no official
widget and the Maps page cannot be framed. The live feed therefore comes from a
third-party service (Elfsight or Trustindex), configured with:

```
NEXT_PUBLIC_REVIEWS_PROVIDER=elsight      # or: trustindex
NEXT_PUBLIC_REVIEWS_WIDGET_ID=<your id>
```

Both are optional. With neither set, the section renders the rating (4.5 from
1,170 reviews) and a link to Google, and the page builds and deploys normally.

Because the site is in Barcelona, the widget is **not** loaded on page load:

- it sits behind a consent button, so no request reaches the vendor and no
  cookie is set until the visitor agrees (GDPR);
- keeping it out of the initial payload also protects LCP on the hero;
- the cookie notice at `/{locale}/cookies` names the third party and the data it
  may process, in all three languages.

The rating shown comes from the restaurant's Google business profile. The
restaurant operates its reservations and reviews through Google Maps; no
third-party review quotes are reproduced on the site.

## Photography

The gallery blends two sources:

- photographs downloaded from the official site's own gallery
  (`konkaisushi.es/img-trans/productos/...`), matching the previous build;
- ~25 new frames supplied by the owner for the relaunch. Four tiny thumbnails
  and one duplicate were dropped.

All were processed by `scripts/build-images.mjs` into WebP at up to 1600/960/480
px, and the official logo had its near-black plate keyed to alpha and trimmed
to its content box.

Alt text in `src/data/photos.ts` is generic and neutral. The photographs could
not be reviewed individually during the build, so:

- the owner should confirm what each image actually shows;
- a dish image is **not** asserted to be a specific named dish;
- confirm the restaurant's right to publish these images and that any visible
  guests have consented.

## Verifying a change

```bash
npm run typecheck   # types
npm run build       # production build + static prerender
npm run images      # rebuild WebP derivatives after changing raw-photos/
```

Set `NEXT_PUBLIC_SITE_URL` if this is deployed on a domain other than
`https://www.konkaisushi.es`; it feeds canonical URLs, `sitemap.xml` and
`robots.txt`.
