import {
  address,
  cuisine,
  geo,
  intro,
  links,
  name,
  openingHours,
  phone,
  priceRange,
  ratings,
  reviews,
  SITE_URL,
  type Locale,
} from "@/data/restaurant";
import { menu } from "@/data/menu";
import { heroPhoto } from "@/data/photos";

/**
 * Schema.org Restaurant, plus a Menu graph so the published dishes and prices
 * are machine-readable.
 *
 * Every value traces back to src/data/restaurant.ts. `aggregateRating` is only
 * emitted because a Google rating was confirmed; if it is ever removed from
 * the data file, the block disappears with it rather than shipping a blank or
 * invented score.
 */

const DAY_SCHEMA: Record<string, string> = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday",
};

export function restaurantJsonLd(locale: Locale) {
  const openingHoursSpecification = openingHours.map((entry) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${DAY_SCHEMA[entry.day]}`,
    ...(entry.blocks.length > 0
      ? {
          opens: entry.blocks[0].from,
          closes: entry.blocks[entry.blocks.length - 1].to,
        }
      : {}),
    ...(entry.blocks.length > 1
      ? {
          additionalOpeningHoursSpecification: entry.blocks.slice(1).map((b) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: `https://schema.org/${DAY_SCHEMA[entry.day]}`,
            opens: b.from,
            closes: b.to,
          })),
        }
      : {}),
  }));

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Restaurant",
      "@id": `${SITE_URL}/#restaurant`,
      name: name.value,
      url: `${SITE_URL}/${locale}`,
      image: [`${SITE_URL}${heroPhoto.src}`],
      description: intro[locale].lead,
      servesCuisine: cuisine.value,
      priceRange: priceRange.value,
      currenciesAccepted: "EUR",
      telephone: phone.e164,
      address: {
        "@type": "PostalAddress",
        streetAddress: address.street,
        addressLocality: address.locality,
        addressRegion: address.region,
        postalCode: address.postalCode,
        addressCountry: address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
      hasMap: links.googleMaps.value,
      openingHoursSpecification,
      acceptsReservations: `${links.reserveTheFork.value} ${links.reserveOpenTable.value}`,
      hasMenu: links.menu.value,
      sameAs: [
        links.googleMaps.value,
        links.website.value,
        links.instagram.value,
        links.facebook.value,
        links.reserveTheFork.value,
        links.reserveOpenTable.value,
        links.orderUberEats.value,
      ],
      ...(ratings.google.value != null
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: ratings.google.value,
              reviewCount: ratings.google.count,
              bestRating: 5,
              worstRating: 1,
            },
          }
        : {}),
      review: reviews.slice(0, 3).map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.author },
        datePublished: r.date,
        reviewBody: r.quote,
        // Named so it is clear these are third-party published reviews,
        // not statements made by the restaurant.
        publisher: { "@type": "Organization", name: r.platform },
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.score.includes("/")
            ? (Number.parseFloat(r.score) / 10) * 5
            : Number.parseFloat(r.score),
          bestRating: 5,
          worstRating: 1,
        },
      })),
    },

    /* ---------------------------------------------------------------- */
    /*  Menu                                                             */
    /* ---------------------------------------------------------------- */
    {
      "@type": "Menu",
      "@id": `${SITE_URL}/#menu`,
      name: name.value,
      inLanguage: locale,
      url: `${SITE_URL}/${locale}#menu`,
      hasMenuSection: menu.map((category) => ({
        "@type": "MenuSection",
        name: category.name[locale],
        description: category.blurb[locale],
        hasMenuItem: category.items.map((item) => ({
          "@type": "MenuItem",
          name: item.name[locale],
          ...(item.description?.[locale]
            ? { description: item.description[locale] }
            : {}),
          offers: {
            "@type": "Offer",
            price: item.price.toFixed(2),
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
        })),
      })),
    },

    /* ---------------------------------------------------------------- */
  ];

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/** FAQ entries, each answer derived from a verified field. */
export function faqJsonLd(locale: Locale) {
  const t = {
    en: {
      q1: "Where is Konkai Sushi House in Barcelona?",
      a1: `${address.street}, ${address.postalCode} ${address.locality}, in the ${address.neighborhood.en} district — a short walk from the Sagrada Família.`,
      q2: "What are the opening hours?",
      a2: "Monday to Sunday: lunch from 12:00 to 16:00 and dinner from 16:00 to midnight. Tuesday has no lunch service.",
      q3: "What kind of cuisine does Konkai Sushi House serve?",
      a3: "Japanese cuisine, with sushi, sashimi, maki, nigiri, temaki, chirashi and poke bowls, alongside hot dishes such as noodles, rice and soups.",
      q4: "Can I reserve a table at Konkai Sushi House?",
      a4: "Yes. Tables can be booked through TheFork or OpenTable, or by calling the restaurant on +34 931 560 414.",
    },
    es: {
      q1: "¿Dónde está Konkai Sushi House en Barcelona?",
      a1: `${address.street}, ${address.postalCode} ${address.locality}, en el barrio de ${address.neighborhood.es} — a pocos metros de la Sagrada Família.`,
      q2: "¿Cuál es el horario de apertura?",
      a2: "De lunes a domingo: comida de 12:00 a 16:00 y cena de 16:00 a medianoche. El martes no hay servicio de mediodía.",
      q3: "¿Qué tipo de cocina sirve Konkai Sushi House?",
      a3: "Cocina japonesa, con sushi, sashimi, maki, nigiri, temaki, chirashi y poke bowls, además de platos calientes como tallarines, arroz y sopas.",
      q4: "¿Puedo reservar mesa en Konkai Sushi House?",
      a4: "Sí. Se puede reservar en TheFork o OpenTable, o llamando al +34 931 560 414.",
    },
    ca: {
      q1: "On és Konkai Sushi House a Barcelona?",
      a1: `${address.street}, ${address.postalCode} ${address.locality}, al barri de ${address.neighborhood.ca} — a pocs metres de la Sagrada Família.`,
      q2: " Quin és l'horari d'obertura?",
      a2: "De dilluns a diumenge: dinar de 12:00 a 16:00 i sopar de 16:00 a mitjanit. El dimarts no hi ha servei de migdia.",
      q3: "Quin tipus de cuina serveix Konkai Sushi House?",
      a3: "Cuina japonesa, amb sushi, sashimi, maki, nigiri, temaki, chirashi i poke bowls, a més de plats calents com tallarines, arròs i sopes.",
      q4: "Puc reservar taula a Konkai Sushi House?",
      a4: "Sí. Es pot reservar a TheFork o OpenTable, o trucant al +34 931 560 414.",
    },
  }[locale];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { q: t.q1, a: t.a1 },
      { q: t.q2, a: t.a2 },
      { q: t.q3, a: t.a3 },
      { q: t.q4, a: t.a4 },
    ].map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
