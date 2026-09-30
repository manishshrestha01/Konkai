/**
 * The complete a-la-carte, transcribed from the restaurant's own menu pages:
 *   https://www.konkaisushi.es/carta   (Spanish — the original, human-written)
 *   https://www.konkaisushi.es/ca/carta
 *   https://www.konkaisushi.es/en/carta
 *
 * Every dish and every price is the restaurant's own. The English menu published
 * on the official site is a machine translation with errors (its "Starters"
 * category is literally labelled "INPUTS"), so the Spanish list is treated as
 * the canonical source and correct English/Catalan renderings are used here.
 *
 * Dish names are kept in the form the restaurant uses. Where the official site
 * translates a name, that translation is preserved.
 */

import type { Locale } from "./restaurant";

export interface MenuItem {
  id: string;
  name: Record<Locale, string>;
  /** Absent for items the restaurant lists without a description. */
  description?: Partial<Record<Locale, string>>;
  /** Price in EUR, exactly as published. */
  price: number;
  /** Portion note, e.g. "8 pieces". */
  unit?: Partial<Record<Locale, string>>;
}

export interface MenuCategory {
  id: string;
  name: Record<Locale, string>;
  blurb: Record<Locale, string>;
  items: MenuItem[];
}

const pieces = (n: number): Record<Locale, string> => ({
  en: `${n} pieces`,
  es: `${n} piezas`,
  ca: `${n} peces`,
});

const one = (): Record<Locale, string> => ({ en: "1 piece", es: "1 pieza", ca: "1 peça" });

export const menu: MenuCategory[] = [
  /* ---------------------------------------------------------------- */
  {
    id: "entrantes",
    name: { en: "Starters", es: "Entrantes", ca: "Entrants" },
    blurb: {
      en: "Small plates to begin — salads, dumplings and skewers straight off the grill.",
      es: "Platos pequeños para empezar — ensaladas, empanadillas y pinchos recién hechos a la plancha.",
      ca: "Plats petits per començar — amanides, crestes i pinxos fets al moment a la planxa.",
    },
    items: [
      {
        id: "wakame-sarada",
        name: { en: "Wakame Sarada", es: "Wakame Sarada", ca: "Wakame Sarada" },
        description: {
          en: "Hiyashi wakame seaweed salad.",
          es: "Ensalada de algas Hiyashi Wakame.",
          ca: "Amanida d'algues Hiyashi Wakame.",
        },
        price: 4.5,
      },
      {
        id: "edamame",
        name: { en: "Edamame", es: "Edamame", ca: "Edamame" },
        description: {
          en: "Soya beans.",
          es: "Habas de soja.",
          ca: "Faves de soja.",
        },
        price: 4.5,
      },
      {
        id: "ensalada-ebi",
        name: { en: "Ebi Salad", es: "Ensalada Ebi", ca: "Amanida Ebi" },
        description: {
          en: "Prawn salad.",
          es: "Ensalada de gambas.",
          ca: "Amanida de gambes.",
        },
        price: 7,
      },
      {
        id: "misoshiru",
        name: { en: "Misoshiru", es: "Misoshiru", ca: "Misoshiru" },
        description: { en: "Miso soup.", es: "Sopa de miso.", ca: "Sopa de miso." },
        price: 4.7,
      },
      {
        id: "rollitos-japoneses",
        name: {
          en: "Japanese spring rolls",
          es: "Rollitos japoneses",
          ca: "Rotllets japonesos",
        },
        description: {
          en: "Fried rice-pastry rolls filled with meat and vegetables.",
          es: "Rollitos de pasta de arroz fritos rellenos de carne y verduras.",
          ca: "Rotllets de pasta d'arròs fregits farcits de carn i verdures.",
        },
        price: 6.95,
      },
      {
        id: "yaki-tori",
        name: { en: "Yaki Tori", es: "Yaki Tori", ca: "Yaki Tori" },
        description: { en: "Chicken skewers.", es: "Pinchos de pollo.", ca: "Pinxos de pollastre." },
        price: 6.95,
      },
      {
        id: "yaki-seke",
        name: { en: "Yaki Seke", es: "Yaki Seke", ca: "Yaki Seke" },
        description: { en: "Salmon skewers.", es: "Pinchos de salmón.", ca: "Pinxos de salmó." },
        price: 8.95,
      },
      {
        id: "gyoza-pollo",
        name: {
          en: "Chicken / vegetable gyoza",
          es: "Gyoza pollo / vegetal",
          ca: "Gyoza pollastre / vegetal",
        },
        description: {
          en: "Steamed, grilled or fried dumplings.",
          es: "Empanadillas de pollo / vegetal (vapor / plancha / frito).",
          ca: "Crestes de pollastre / vegetal (vapor / planxa / fregit).",
        },
        price: 6.95,
      },
      {
        id: "gyoza-gambas",
        name: {
          en: "Prawn gyoza",
          es: "Gyoza de gambas",
          ca: "Gyoza de gambes",
        },
        description: {
          en: "Steamed, grilled or fried prawn dumplings.",
          es: "Empanadillas de gambas (vapor / plancha / frito).",
          ca: "Crestes de gambes (vapor / planxa / fregit).",
        },
        price: 7.95,
      },
      {
        id: "ebi-tempura",
        name: { en: "Ebi Tempura", es: "Ebi Tempura", ca: "Ebi Tempura" },
        description: {
          en: "Crispy fried prawns.",
          es: "Gambas fritas crujientes.",
          ca: "Gambes fregides cruixents.",
        },
        price: 7.95,
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "maki",
    name: { en: "Maki", es: "Maki", ca: "Maki" },
    blurb: {
      en: "Eight pieces per roll, rolled in nori.",
      es: "Ocho piezas por rollo, envuelto en nori.",
      ca: "Vuit peces per rotllo, embolat en nori.",
    },
    items: [
      {
        id: "maki-maguro",
        name: { en: "Maguro / Tuna", es: "Maguro / Atún", ca: "Maguro / Tonyina" },
        price: 6.95,
        unit: pieces(8),
      },
      {
        id: "maki-sake",
        name: { en: "Sake / Salmon", es: "Sake / Salmón", ca: "Sake / Salmó" },
        price: 5.45,
        unit: pieces(8),
      },
      {
        id: "maki-ebi",
        name: { en: "Ebi / Prawn", es: "Ebi / Gambas", ca: "Ebi / Gambes" },
        price: 5.45,
        unit: pieces(8),
      },
      {
        id: "maki-kapa",
        name: {
          en: "Cucumber and mango",
          es: "Kapa de pepino y mango",
          ca: "Kapa de cogombre i mango",
        },
        price: 4.9,
        unit: pieces(8),
      },
      {
        id: "maki-aguacate",
        name: {
          en: "Avocado maki",
          es: "Maki de aguacate",
          ca: "Maki d'alvocat",
        },
        price: 4.9,
        unit: pieces(8),
      },
      {
        id: "maki-crujiente",
        name: {
          en: "Crispy salmon, avocado & Philadelphia maki",
          es: "Maki crujiente de salmón, aguacate y philadelfia",
          ca: "Maki cruixent de salmó, alvocat i philadelfia",
        },
        price: 8.45,
        unit: pieces(8),
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "nigiri",
    name: { en: "Nigiri", es: "Nigiri", ca: "Nigiri" },
    blurb: {
      en: "Two pieces of fish seasoned over vinegared rice.",
      es: "Dos piezas de pescado sazonadas sobre arroz avinagrado.",
      ca: "Dos peces de peix condimentats sobre arròs avinagrat.",
    },
    items: [
      {
        id: "nigiri-maguro",
        name: { en: "Maguro / Tuna", es: "Maguro / Atún", ca: "Maguro / Tonyina" },
        price: 4.4,
        unit: pieces(2),
      },
      {
        id: "nigiri-sake",
        name: { en: "Sake / Salmon", es: "Sake / Salmón", ca: "Sake / Salmó" },
        price: 3.95,
        unit: pieces(2),
      },
      {
        id: "nigiri-aburi",
        name: { en: "Aburi Sake", es: "Aburi Sake", ca: "Aburi Sake" },
        description: {
          en: "With grilled salmon.",
          es: "Con salmón asado.",
          ca: "Amb salmó rostit.",
        },
        price: 4.25,
        unit: pieces(2),
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "temaki",
    name: { en: "Temaki", es: "Temaki", ca: "Temaki" },
    blurb: {
      en: "Hand-rolled cones, cut at the table.",
      es: "Conos enrollados a mano, se cortan en la mesa.",
      ca: "Cònes enrollats a mà, es tallen a la taula.",
    },
    items: [
      {
        id: "temaki-maguro",
        name: { en: "Maguro / Tuna", es: "Maguro / Atún", ca: "Maguro / Tonyina" },
        description: {
          en: "Tuna with avocado, rice, salad, surimi and cucumber.",
          es: "Relleno de atún con aguacate, arroz, ensalada, surimi y pepino.",
          ca: "Farcit de tonyina amb alvocat, arròs, amanida, surimi i cogombre.",
        },
        price: 7.95,
        unit: one(),
      },
      {
        id: "temaki-sake",
        name: { en: "Sake / Salmon", es: "Sake / Salmón", ca: "Sake / Salmó" },
        description: {
          en: "Salmon with avocado, rice, salad, surimi and cucumber.",
          es: "Relleno de salmón con aguacate, arroz, ensalada, surimi y pepino.",
          ca: "Farcit de salmó amb alvocat, arròs, amanida, surimi i cogombre.",
        },
        price: 7.95,
        unit: one(),
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "sashimi",
    name: { en: "Sashimi", es: "Sashimi", ca: "Sashimi" },
    blurb: {
      en: "Six slices of raw fish, served on the day.",
      es: "Seis lonchas de pescado crudo, servidas del día.",
      ca: "Sis talls de peix cru, servits del dia.",
    },
    items: [
      {
        id: "sashimi-salmon",
        name: {
          en: "Salmon sashimi",
          es: "Sashimi de salmón",
          ca: "Sashimi de salmó",
        },
        price: 9.5,
        unit: pieces(6),
      },
      {
        id: "sashimi-atun",
        name: { en: "Tuna sashimi", es: "Sashimi atún", ca: "Sashimi tonyina" },
        price: 9.95,
        unit: pieces(6),
      },
      {
        id: "sashimi-mixto",
        name: { en: "Mixed sashimi", es: "Sashimi mixto", ca: "Sashimi mixt" },
        price: 9.95,
        unit: pieces(6),
      },
      {
        id: "ceviche-salmon",
        name: {
          en: "Salmon ceviche",
          es: "Ceviche de salmón",
          ca: "Ceviche de salmó",
        },
        description: {
          en: "Salmon with lime juice, coriander and onion.",
          es: "Salmón con zumo de lima, cilantro y cebolla.",
          ca: "Salmó amb suc de llima, coriandre i ceba.",
        },
        price: 9.95,
        unit: pieces(6),
      },
      {
        id: "ceviche-atun",
        name: { en: "Tuna ceviche", es: "Ceviche de atún", ca: "Ceviche de tonyina" },
        description: {
          en: "Tuna with lime juice, coriander and onion.",
          es: "Atún con zumo de lima, cilantro y cebolla.",
          ca: "Tonyina amb suc de llima, coriandre i ceba.",
        },
        price: 9.95,
        unit: pieces(6),
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "uramaki",
    name: { en: "Uramaki", es: "Uramaki", ca: "Uramaki" },
    blurb: {
      en: "Inside-out rolls, eight pieces each.",
      es: "Rollos invertidos, ocho piezas cada uno.",
      ca: "Rotllos invertits, vuit peces cadascun.",
    },
    items: [
      {
        id: "uramaki-maguro",
        name: {
          en: "Maguro avocado",
          es: "Maguro aguacate",
          ca: "Maguro alvocat",
        },
        description: {
          en: "Tuna, avocado, sesame and mayonnaise.",
          es: "Atún, aguacate, sésamo y mayonesa.",
          ca: "Tonyina, alvocat, sèsam i maionesa.",
        },
        price: 9.95,
        unit: pieces(8),
      },
      {
        id: "uramaki-sake",
        name: { en: "Sake aguacate", es: "Sake aguacate", ca: "Sake alvocat" },
        description: {
          en: "Salmon, avocado, sesame and mayonnaise.",
          es: "Salmón, aguacate, sésamo y mayonesa.",
          ca: "Salmó, alvocat, sèsam i maionesa.",
        },
        price: 8.45,
        unit: pieces(8),
      },
      {
        id: "uramaki-crispy",
        name: {
          en: "Crispy salmon & avocado uramaki",
          es: "Uramaki crispy de salmón y aguacate",
          ca: "Uramaki crispy de salmó i alvocat",
        },
        description: {
          en: "Tempura uramaki with salmon and fried avocado.",
          es: "Uramaki tempurizado con salmón y aguacate frito.",
          ca: "Uramaki tempuritzat amb salmó i alvocat fregit.",
        },
        price: 9.95,
        unit: pieces(8),
      },
      {
        id: "uramaki-rainbow",
        name: { en: "Rainbow uramaki", es: "Rainbow uramaki", ca: "Rainbow uramaki" },
        description: {
          en: "Salmon, tuna, crab, avocado and Philadelphia.",
          es: "Salmón, atún, cangrejo, aguacate y philadelfia.",
          ca: "Salmó, tonyina, cranc, alvocat i philadelfia.",
        },
        price: 10.95,
        unit: pieces(8),
      },
      {
        id: "uramaki-tori",
        name: { en: "Tori Maki", es: "Tori Maki", ca: "Tori Maki" },
        description: {
          en: "Chicken, avocado, wasabi sauce and mayonnaise.",
          es: "Pollo, aguacate, salsa wasabi y mayonesa.",
          ca: "Pollastre, alvocat, salsa wasabi i maionesa.",
        },
        price: 8.45,
        unit: pieces(8),
      },
      {
        id: "uramaki-casa",
        name: {
          en: "Maki of the house",
          es: "Maki de la casa",
          ca: "Maki de la casa",
        },
        description: {
          en: "Salmon, avocado, crab and masago.",
          es: "Salmón, aguacate, cangrejo y masago.",
          ca: "Salmó, alvocat, cranc i masago.",
        },
        price: 9.5,
        unit: pieces(8),
      },
      {
        id: "uramaki-picante",
        name: {
          en: "Spicy uramaki",
          es: "Picante uramaki",
          ca: "Picant uramaki",
        },
        description: {
          en: "Spicy tuna, avocado and sesame.",
          es: "Atún picante, aguacate y sésamo.",
          ca: "Tonyina picant, alvocat i sèsam.",
        },
        price: 9.95,
        unit: pieces(8),
      },
      {
        id: "uramaki-konkai",
        name: {
          en: "Konkai Maki",
          es: "Konkai Maki",
          ca: "Konkai Maki",
        },
        description: {
          en: "Salmon, avocado, shrimp, onion and mayonnaise.",
          es: "Salmón, aguacate, langostino, cebolla y mayonesa.",
          ca: "Salmó, alvocat, llagostí, ceba i maionesa.",
        },
        price: 10.95,
        unit: pieces(8),
      },
      {
        id: "uramaki-wakame",
        name: { en: "Wakame Maki", es: "Wakame maki", ca: "Wakame maki" },
        description: {
          en: "Seaweed, avocado and sesame.",
          es: "Algas de mar, aguacate y sésamo.",
          ca: "Algues de mar, alvocat i sèsam.",
        },
        price: 8.45,
        unit: pieces(8),
      },
      {
        id: "uramaki-ebi-tempura",
        name: { en: "Ebi Tempura", es: "Ebi tempura", ca: "Ebi tempura" },
        description: {
          en: "Shrimp tempura, avocado, tempura sauce, wasabi and mayonnaise.",
          es: "Tempura de langostino, aguacate, con salsa tempura, wasabi y mayonesa.",
          ca: "Tempura de llagostí, alvocat, amb salsa tempura, wasabi i maionesa.",
        },
        price: 9.45,
        unit: pieces(8),
      },
      {
        id: "uramaki-philadelphia",
        name: {
          en: "Philadelphia uramaki",
          es: "Uramaki de philadelfia",
          ca: "Uramaki de philadelfia",
        },
        description: {
          en: "Salmon, avocado and Philadelphia.",
          es: "Salmón, aguacate y philadelfia.",
          ca: "Salmó, alvocat i philadelfia.",
        },
        price: 8.9,
        unit: pieces(8),
      },
      {
        id: "uramaki-dargon",
        name: { en: "Dargon Uramaki", es: "Dargon Uramaki", ca: "Dargon Uramaki" },
        description: {
          en: "Ebi tempura, salmon, avocado, cream cheese, tobiko and Konkai sauce.",
          es: "Ebi tempura, salmón, aguacate, crema de queso, tobiko y salsa Konkai.",
          ca: "Ebi tempura, salmó, alvocat, crema de formatge, tobiko i salsa Konkai.",
        },
        price: 10.95,
        unit: pieces(8),
      },
      {
        id: "uramaki-tataki",
        name: { en: "Tataki Uramaki", es: "Tataki Uramaki", ca: "Tataki Uramaki" },
        description: {
          en: "Ebi tempura, tuna, avocado, cream cheese, tobiko and Konkai sauce.",
          es: "Ebi tempura, atún, aguacate, crema de queso, tobiko y salsa Konkai.",
          ca: "Ebi tempura, tonyina, alvocat, crema de formatge, tobiko i salsa Konkai.",
        },
        price: 10.95,
        unit: pieces(8),
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "poke",
    name: { en: "Poke bowls", es: "Poke bowls", ca: "Poke bowls" },
    blurb: {
      en: "Sushi rice bowls built to order.",
      es: "Bowls de arroz sushi a tu elección.",
      ca: "Bowls d'arròs sushi a triar.",
    },
    items: [
      {
        id: "poke-atun",
        name: { en: "Poke tuna", es: "Atún poke", ca: "Tonyina poke" },
        description: {
          en: "Sushi rice, tuna, sauce, carrot, fried onion, salad, sesame and avocado.",
          es: "Arroz sushi, atún, salsa, zanahoria, cebolla frita, ensalada, sésamo y aguacate.",
          ca: "Arròs sushi, tonyina, salsa, pastanaga, ceba frita, amanida, sèsam i alvocat.",
        },
        price: 9.95,
      },
      {
        id: "poke-mixto",
        name: {
          en: "Poke salmon / chicken / bacon",
          es: "Poke salmón / pollo / bacon",
          ca: "Poke salmó / pollastre / bacó",
        },
        description: {
          en: "Sushi rice, sauce, carrot, fried onion, salad, sesame and avocado.",
          es: "Arroz sushi, salsa, zanahoria, cebolla frita, ensalada, sésamo y aguacate.",
          ca: "Arròs sushi, salsa, pastanaga, ceba frita, amanida, sèsam i alvocat.",
        },
        price: 8.45,
      },
      {
        id: "poke-konkai",
        name: { en: "Konkai poke", es: "Konkai poke", ca: "Konkai poke" },
        description: {
          en: "Sushi rice, fried onion, avocado, wakame, edamame, carrot, sauce, salad and sesame.",
          es: "Arroz sushi, cebolla frita, aguacate, wakame, edamame, zanahoria, salsa, ensalada y sésamo.",
          ca: "Arròs sushi, ceba frita, alvocat, wakame, edamame, pastanaga, salsa, amanida i sèsam.",
        },
        price: 9,
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "chirashi",
    name: { en: "Chirashi", es: "Chirashi", ca: "Chirashi" },
    blurb: {
      en: "Scattered sushi — sliced fish laid over seasoned rice.",
      es: "Sushi esparcido — pescado fileteado sobre arroz sazonado.",
      ca: "Sushi escampat — peix tallat damunt d'un arròs condimentat.",
    },
    items: [
      {
        id: "chirashi-salmon",
        name: {
          en: "Chirashi salmon",
          es: "Chirashi salmón",
          ca: "Chirashi salmó",
        },
        description: {
          en: "Salmon, avocado and sushi rice.",
          es: "Salmón, aguacate y arroz sushi.",
          ca: "Salmó, alvocat i arròs sushi.",
        },
        price: 9.95,
      },
      {
        id: "chirashi-atun",
        name: { en: "Chirashi tuna", es: "Chirashi atún", ca: "Chirashi tonyina" },
        description: {
          en: "Tuna, avocado and sushi rice.",
          es: "Atún, aguacate y arroz sushi.",
          ca: "Tonyina, alvocat i arròs sushi.",
        },
        price: 10.5,
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "calientes",
    name: { en: "Hot dishes", es: "Calientes", ca: "Calentes" },
    blurb: {
      en: "Noodles, rice and soups, cooked to order.",
      es: "Tallarines, arroz y sopas, al momento.",
      ca: "Tallarines, arròs i sopes, al moment.",
    },
    items: [
      {
        id: "bao",
        name: { en: "Black / white bun bao", es: "Black / White Bun Bao", ca: "Black / White Bun Bao" },
        description: {
          en: "Steamed bun with black or white dough, fried chicken, salmon, grilled chicken or bacon.",
          es: "Pan negro o blanco casero al vapor con pollo rebozado, salmón, pollo al grill o bacon.",
          ca: "Pa negre o blanc casolà al vapor amb pollastre arrebossat, salmó, pollastre al grill o bacó.",
        },
        price: 7.95,
      },
      {
        id: "tallarines-soja",
        name: { en: "Soy noodles", es: "Tallarines de soja", ca: "Tallarines de soja" },
        description: {
          en: "Chicken, prawn or beef, sautéed with vegetables, egg and soy or oyster sauce.",
          es: "Pollo, gambas o ternera, salteados con verduras, huevo y salsa de soja o de ostra.",
          ca: "Pollastre, gambes o vedella, saltats amb verdures, ou i salsa de soja o d'ostra.",
        },
        price: 6.95,
      },
      {
        id: "tallarines-thai",
        name: {
          en: "Thai curry noodles & coconut milk",
          es: "Tallarines de Thai curry y leche de coco",
          ca: "Tallarines de Thai curri i llet de coco",
        },
        description: {
          en: "Rice noodles with Thai red curry and coconut milk (spicy), egg and vegetables.",
          es: "Tallarines de arroz salteados al curry rojo tailandés y leche de coco (picante), huevo y verdura.",
          ca: "Tallarines d'arròs saltats a l.curri vermell tailandès i llet de coco (picant), ou i verdura.",
        },
        price: 6.95,
      },
      {
        id: "tallarines-yakisoba",
        name: {
          en: "Japanese yakisoba noodles",
          es: "Tallarines de yakisoba japonés",
          ca: "Tallarines de yakisoba japonès",
        },
        description: {
          en: "Rice noodles sautéed yakisoba-style with vegetables.",
          es: "Tallarines de arroz salteadas al yakisoba con verduras.",
          ca: "Tallarines d'arròs saltats a l'yakisoba amb verdures.",
        },
        price: 6.95,
      },
      {
        id: "tallarines-ostra",
        name: {
          en: "Oyster sauce noodles",
          es: "Tallarines de salsa de ostra",
          ca: "Tallarines de salsa d'ostra",
        },
        description: {
          en: "Chicken, prawn or beef, sautéed with vegetables and oyster sauce.",
          es: "Pollo, gambas o ternera, salteados con verduras y salsa de ostra.",
          ca: "Pollastre, gambes o vedella, saltats amb verdures i salsa d'ostra.",
        },
        price: 6.95,
      },
      {
        id: "fideos-arroz-soja",
        name: {
          en: "Rice noodles with vegetables & soy / oyster",
          es: "Fideos de arroz salteados con verduras y soja / ostra",
          ca: "Fideus d'arròs saltats amb verdures i soja / ostra",
        },
        description: {
          en: "With chicken, prawn or beef.",
          es: "Con pollo, gambas o ternera.",
          ca: "Amb pollastre, gambes o vedella.",
        },
        price: 6.95,
      },
      {
        id: "fideos-huevo-yakisoba",
        name: {
          en: "Egg noodles with vegetables & yakisoba sauce",
          es: "Fideos de huevo salteados con verduras y salsa yakisoba",
          ca: "Fideus d'ou saltats amb verdures i salsa yakisoba",
        },
        description: {
          en: "With chicken, prawn or beef.",
          es: "Con pollo, gambas o ternera.",
          ca: "Amb pollastre, gambes o vedella.",
        },
        price: 6.95,
      },
      {
        id: "fideos-huevo-ostra",
        name: {
          en: "Egg noodles with vegetables & oyster sauce",
          es: "Fideos de huevo salteados con verdura y salsa de ostra",
          ca: "Fideus d'ou saltats amb verdura i salsa d'ostra",
        },
        description: {
          en: "With chicken, prawn or beef.",
          es: "Con pollo, gambas o ternera.",
          ca: "Amb pollastre, gambes o vedella.",
        },
        price: 6.95,
      },
      {
        id: "udon",
        name: {
          en: "Stir-fried udon with vegetables & yakisoba sauce",
          es: "Fideos de udon salteados con verduras y salsa yakisoba",
          ca: "Fideus d'udon saltats amb verdures i salsa yakisoba",
        },
        description: {
          en: "With chicken, prawn or beef.",
          es: "Con pollo, gambas o ternera.",
          ca: "Amb pollastre, gambes o vedella.",
        },
        price: 6.95,
      },
      {
        id: "fideos-crujientes",
        name: {
          en: "Crispy noodles with vegetables & yakisoba sauce",
          es: "Fideos crujientes salteados con verduras y salsa yakisoba",
          ca: "Tallarines cruixents saltats amb verdures i salsa yakisoba",
        },
        description: {
          en: "With chicken, prawn or beef.",
          es: "Con pollo, gambas o ternera.",
          ca: "Amb pollastre, gambes o vedella.",
        },
        price: 6.95,
      },
      {
        id: "pad-thai",
        name: { en: "Pad Thai", es: "Padhe Thai", ca: "Pathe Thai" },
        description: {
          en: "Rice noodles with vegetables, peanuts, tofu, prawn, chicken, egg, turnip and garlic.",
          es: "Tallarines de arroz salteados con verduras, cacahuetes, tofu, gambas, pollo, huevo, nabo y ajo.",
          ca: "Tallarines d'arròs saltats amb verdures, cacauets, tofu, gambes, pollastre, ou, nap i all.",
        },
        price: 7.45,
      },
      {
        id: "ternera-cebolleta",
        name: {
          en: "Beef with chives, sesame",
          es: "Ternera con cebolleta salteados y sésamo",
          ca: "Vedella amb ceba tendra saltats i sèsam",
        },
        price: 9.95,
      },
      {
        id: "yakimeshi",
        name: { en: "Yakimeshi", es: "Yakimeshi", ca: "Yakimeshi" },
        description: {
          en: "Fried rice with prawns, ham, egg and vegetables.",
          es: "Arroz salteado con gambas, jamón, huevo y verduras.",
          ca: "Arròs saltat amb gambes, pernil, ou i verdures.",
        },
        price: 6.95,
      },
      {
        id: "arroz-frito",
        name: {
          en: "Fried rice with vegetables",
          es: "Arroz frito con verduras",
          ca: "Arròs fregit amb verdures",
        },
        description: {
          en: "Rice sautéed with egg and vegetables.",
          es: "Arroz salteado con huevo y verduras.",
          ca: "Arròs saltat amb ou i verdures.",
        },
        price: 6.95,
      },
      {
        id: "gohan",
        name: { en: "Gohan", es: "Gohan", ca: "Gohan" },
        description: { en: "White rice.", es: "Arroz blanco.", ca: "Arròs blanc." },
        price: 3.5,
      },
      {
        id: "sopa-ternera",
        name: {
          en: "Beef / chicken / prawn soup",
          es: "Sopa de ternera / pollo / gambas",
          ca: "Sopa de vedella / pollastre / gambes",
        },
        description: {
          en: "Rice and beef noodle soup with bean sprout, coriander and green onion.",
          es: "Sopa de tallarines de arroz y ternera con brote de soja, cilantro y cebolla verde.",
          ca: "Sopa de tallarines d'arròs i vedella amb brot de soja, coriandre i ceba verda.",
        },
        price: 9.5,
      },
      {
        id: "ramen",
        name: { en: "Ramen soup", es: "Sopa de ramen", ca: "Sopa de ramen" },
        description: {
          en: "Ramen noodle soup with grilled pork, egg, bean sprouts and green onion.",
          es: "Sopa de ramen y tallarines japoneses con cerdo a la plancha, huevo, brote de soja y cebolla verde.",
          ca: "Sopa de ramen i tallarines japonesos amb porc a la planxa, ou, brot de soja i ceba verda.",
        },
        price: 9.95,
      },
      {
        id: "pollo-almendra",
        name: {
          en: "Battered chicken with sliced almonds",
          es: "Pollo rebozado con finas y crujientes láminas de almendra",
          ca: "Pollastre arrebossat amb fines i cruixents làmines d'ametlla",
        },
        price: 7.95,
      },
      {
        id: "karaage",
        name: { en: "Karaage", es: "Karaage", ca: "Karaage" },
        description: {
          en: "Crispy battered chicken.",
          es: "Pollo rebozado con crujiente.",
          ca: "Pollastre arrebossat amb cruixent.",
        },
        price: 7.7,
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "postres",
    name: { en: "Desserts", es: "Postres", ca: "Postres" },
    blurb: {
      en: "Two sweets, both made to share.",
      es: "Dos dulces, ambos pensados para compartir.",
      ca: "Dos dolços, tots dos pensats per compartir.",
    },
    items: [
      {
        id: "chocolate-coulant",
        name: {
          en: "Chocolate coulant",
          es: "Chocolate coulant",
          ca: "Xocolata coulant",
        },
        description: { en: "1 piece.", es: "1 pieza.", ca: "1 peça." },
        price: 5.5,
        unit: one(),
      },
      {
        id: "mochi-te-verde",
        name: { en: "Green tea mochi", es: "Mochi de té verde", ca: "Mochi de te verd" },
        description: { en: "1 piece.", es: "1 pieza.", ca: "1 peça." },
        price: 4,
        unit: one(),
      },
      {
        id: "mochi-fresa",
        name: { en: "Strawberry mochi", es: "Mochi de fresa", ca: "Mochi de maduixa" },
        description: { en: "1 piece.", es: "1 pieza.", ca: "1 peça." },
        price: 4,
        unit: one(),
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "bebidas",
    name: { en: "Drinks", es: "Bebidas", ca: "Begudes" },
    blurb: {
      en: "Japanese and Spanish beer, wine by the bottle, soft drinks.",
      es: "Cerveza japonesa y española, vino de botella y refrescos.",
      ca: "Cervesa japonesa i espanyola, vi de botlla i refrescos.",
    },
    items: [
      {
        id: "vino-rioja",
        name: { en: "Rioja red wine", es: "Vino tinto Rioja", ca: "Vi negre Rioja" },
        description: { en: "750 ml.", es: "750 ml.", ca: "750 ml." },
        price: 9,
      },
      {
        id: "vino-tinto",
        name: { en: "Red wine", es: "Vino tinto", ca: "Vi negre" },
        description: { en: "750 ml.", es: "750 ml.", ca: "750 ml." },
        price: 9,
      },
      {
        id: "vino-verdejo",
        name: { en: "Verdejo white wine", es: "Vino blanco Verdejo", ca: "Vi blanc Verdejo" },
        description: { en: "750 ml.", es: "750 ml.", ca: "750 ml." },
        price: 9,
      },
      {
        id: "vino-bach",
        name: { en: "Bach white wine", es: "Vino blanco Bach", ca: "Vi blanc Bach" },
        description: { en: "750 ml.", es: "750 ml.", ca: "750 ml." },
        price: 9,
      },
      {
        id: "kirin",
        name: { en: "Kirin beer", es: "Cerveza Kirin", ca: "Cervesa Kirin" },
        description: { en: "330 ml.", es: "330 ml.", ca: "330 ml." },
        price: 3,
      },
      {
        id: "sapporo",
        name: { en: "Sapporo beer", es: "Cerveza Sapporo", ca: "Cervesa Sapporo" },
        description: { en: "330 ml.", es: "330 ml.", ca: "330 ml." },
        price: 3,
      },
      {
        id: "estrella-damm",
        name: { en: "Estrella Damm beer", es: "Cerveza Estrella Damm", ca: "Cervesa Estrella Damm" },
        description: { en: "330 ml.", es: "330 ml.", ca: "330 ml." },
        price: 2.5,
      },
      {
        id: "estrella-galicia",
        name: {
          en: "Estrella Galicia beer",
          es: "Cerveza Estrella Galicia",
          ca: "Cervesa Estrella Galicia",
        },
        description: { en: "330 ml.", es: "330 ml.", ca: "330 ml." },
        price: 2.5,
      },
      {
        id: "moritz",
        name: {
          en: "Moritz non-alcoholic beer",
          es: "Cerveza Moritz sin alcohol",
          ca: "Cervesa Moritz sense alcohol",
        },
        description: { en: "330 ml.", es: "330 ml.", ca: "330 ml." },
        price: 2.5,
      },
      {
        id: "fanta-naranja",
        name: { en: "Orange Fanta", es: "Fanta Naranja", ca: "Fanta Taronja" },
        description: { en: "330 ml can.", es: "Lata 330 ml.", ca: "Llauna 330 ml." },
        price: 2.5,
      },
      {
        id: "fanta-limon",
        name: { en: "Lemon Fanta", es: "Fanta Limón", ca: "Fanta Llimona" },
        description: { en: "330 ml can.", es: "Lata 330 ml.", ca: "Llauna 330 ml." },
        price: 2.5,
      },
      {
        id: "aquarius-naranja",
        name: { en: "Aquarius orange", es: "Aquarius Naranja", ca: "Aquarius Taronja" },
        description: { en: "330 ml can.", es: "Lata 330 ml.", ca: "Llauna 330 ml." },
        price: 2.5,
      },
      {
        id: "aquarius-limon",
        name: { en: "Aquarius lemon", es: "Aquarius Limón", ca: "Aquarius Llimona" },
        description: { en: "330 ml can.", es: "Lata 330 ml.", ca: "Llauna 330 ml." },
        price: 2.5,
      },
      {
        id: "fuze-tea",
        name: { en: "Fuze Tea lemon", es: "Fuze Tea Lemon", ca: "Fuze Tea Lemon" },
        description: { en: "330 ml can.", es: "Lata 330 ml.", ca: "Llauna 330 ml." },
        price: 2.5,
      },
      {
        id: "nestea",
        name: { en: "Nestea lemon", es: "Nestea Lemon", ca: "Nestea Lemon" },
        description: { en: "330 ml can.", es: "Lata 330 ml.", ca: "Llauna 330 ml." },
        price: 2.5,
      },
      {
        id: "schweppes",
        name: { en: "Schweppes", es: "Schweppes", ca: "Schweppes" },
        description: { en: "330 ml can.", es: "Lata 330 ml.", ca: "Llauna 330 ml." },
        price: 2.5,
      },
      {
        id: "coca-cola-zero",
        name: {
          en: "Coca-Cola Zero sugar",
          es: "Coca-Cola Zero azúcar",
          ca: "Coca-Cola Zero sucre",
        },
        description: { en: "330 ml can.", es: "Lata 330 ml.", ca: "Llauna 330 ml." },
        price: 2.5,
      },
      {
        id: "coca-cola",
        name: { en: "Coca-Cola original", es: "Coca-Cola sabor original", ca: "Coca-Cola sabor original" },
        description: { en: "330 ml can.", es: "Lata 330 ml.", ca: "Llauna 330 ml." },
        price: 2.5,
      },
      {
        id: "agua-con-gas",
        name: { en: "Sparkling water", es: "Agua mineral con gas", ca: "Aigua mineral amb gas" },
        description: { en: "500 ml.", es: "500 ml.", ca: "500 ml." },
        price: 2.5,
      },
      {
        id: "agua",
        name: { en: "Still water", es: "Agua mineral", ca: "Aigua mineral" },
        description: { en: "500 ml.", es: "500 ml.", ca: "500 ml." },
        price: 2,
      },
    ],
  },
];

/**
 * The dishes the restaurant itself highlights as "featured" on its homepage,
 * in the order it presents them.
 */
export const featuredDishIds = [
  "wakame-sarada",
  "poke-atun",
  "gyoza-pollo",
  "gyoza-gambas",
  "uramaki-casa",
  "uramaki-konkai",
];

/** Every dish on the menu, flattened — used for the signature grid and search. */
export const allDishes = menu.flatMap((c) =>
  c.items.map((item) => ({ ...item, categoryId: c.id, categoryName: c.name })),
);

export const dishById = new Map(allDishes.map((d) => [d.id, d]));

/** Cheapest and dearest published prices — used to state the menu range honestly. */
export const priceRangeEur = allDishes.reduce(
  (acc, d) => [Math.min(acc[0], d.price), Math.max(acc[1], d.price)] as [number, number],
  [Infinity, -Infinity],
);
