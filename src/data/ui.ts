import type { Locale } from "./restaurant";

/**
 * Interface copy. Written per locale rather than machine-translated at runtime,
 * so the three versions read naturally in their own language.
 * The restaurant's own name and dish names are never translated.
 */
export const ui = {
  en: {
    localeName: "English",
    htmlLang: "en",

    nav: {
      menu: "Menu",
      dishes: "Dishes",
      restaurant: "Restaurant",
      reviews: "Reviews",
      gallery: "Gallery",
      location: "Location",
      reserve: "Reserve a table",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      skip: "Skip to content",
      skipSitemap: "Go to sitemap page",
      skipAccessibility: "Go to accessibility page",
    },

    hero: {
      headline: "Come find us",
      eyebrow: "Dreta de l'Eixample · Barcelona",
      wordmark: "Konkai Sushi House",
      cuisineLine: "Japanese & Asian cuisine",
      localityLine: "Dreta de l'Eixample · Barcelona",
      postcodeMark: "08013",
      cityMark: "BCN",
      ctaExplore: "Explore the menu",
      ctaMenu: "View menu",
      ctaReserve: "Reserve a table",
      ctaDirections: "Get directions",
      scroll: "Scroll",
    },

    intro: {
      eyebrow: "The restaurant",
      title: "A neighbourhood table, a few steps from the Sagrada Família",
      headlineA: "Japanese flavours,",
      headlineB: "Barcelona energy.",
      restaurantNum: "01",
      restaurantLabel: "The restaurant",
      factsTitle: "At a glance",
    },

    facts: {
      cuisine: "Cuisine",
      priceRange: "Price",
      seats: "Terrace",
      openEveryDay: "Open daily",
      address: "Address",
      phone: "Phone",
      services: "Services",
    },

    /* Display labels for the canonical values in @/data/restaurant. The
       canonical English values stay in place for schema.org output. */
    labels: {
      cuisine: ["Japanese", "Sushi", "Asian"],
      perDish: "/ dish",
      covers: "covers",
      services: [
        "Dine-in",
        "Takeaway",
        "No-contact delivery",
        "Outdoor terrace",
        "Indoor dining room",
        "Reservations",
      ],
    },

    visit: {
      num: "03",
      label: "The space",
      headline: "Come for the food, stay for the room.",
      blurb:
        "An outdoor terrace for up to twelve guests, and an indoor dining room that aims to feel like home. We are in the middle of the Dreta de l'Eixample, a few minutes' walk from the Sagrada Família.",
      seatsNumber: "12",
      seatsLabel: "terrace seats",
      facts: [
        "Outdoor terrace",
        "Indoor dining room",
        "Near the Sagrada Família",
      ],
    },

    signature: {
      eyebrow: "Signature dishes",
      title: "What the kitchen is known for",
      blurb:
        "Six plates the restaurant puts at the top of its own menu. Prices are the published a-la-carte prices.",
      kitchenNum: "02",
      kitchenLabel: "From the kitchen",
      headline: "Six plates worth starting with.",
      featuredBy: "Highlighted by the restaurant",
    },

    menu: {
      eyebrow: "The menu",
      title: "Sushi, sashimi and a broad hot menu",
      blurb:
        "A wide a-la-carte: cold and hot, from three pieces of nigiri to bowls of ramen. Everything below is the restaurant's own list and pricing.",
      all: "All",
      viewFull: "View full menu",
      viewPdf: "Open printable menu (PDF)",
      pricesNote: "All prices in euros. Allergies and dietary requirements: please ask the team.",
      categories: "Menu categories",
      jumpTo: "Jump to",
    },

    reviews: {
      eyebrow: "What guests say",
      title: "Rated 4.5 out of 5 on Google",
      blurb:
        "The rating below comes from the restaurant's Google Business Profile. The individual quotes are published reviews from TheFork and OpenTable, shown unedited and attributed to their platform.",
      num: "04",
      label: "Guests say",
      ratingCaption: "Google rating",
      reviewsCaption: "reviews",
      seeAllGoogle: "See all reviews on Google",
      seeAllTheFork: "Read all reviews on TheFork",
      sourceLabel: "Google rating",
      quoteSource: "Guest review published on",
      ourReply: "Note",
      widget: {
        consentTitle: "Load the live Google reviews feed",
        consentBody:
          "Google does not allow reviews to be embedded directly, so this feed is provided by a third-party service. Loading it will contact that service, which may set its own cookies and collect data about your visit.",
        consentButton: "Load Google reviews",
        vendorNote:
          "Nothing is requested and no cookie is set until you press the button. See the cookie notice for details.",
        fallbackTitle:
          "The full set of reviews is on Google. Use the button above to read them there.",
        loading: "Loading reviews…",
      },
    },

    gallery: {
      eyebrow: "Gallery",
      title: "The room, the terrace and the plates",
      blurb: "Photographs published by the restaurant on its own website.",
      open: "View larger",
      close: "Close",
      prev: "Previous image",
      next: "Next image",
      counter: "Image",
    },

    location: {
      eyebrow: "Find us",
      title: "Carrer de Roger de Flor, 222",
      blurb:
        "In the Dreta de l'Eixample, on Roger de Flor between Mallorca and Provença — a short walk from the Sagrada Família.",
      address: "Address",
      hours: "Opening hours",
      phone: "Phone",
      gettingHere: "Getting here",
      metro: "Nearest metro",
      parking: "Parking nearby",
      today: "Today",
      closed: "Closed",
      lunch: "Lunch",
      dinner: "Dinner",
      openNow: "Open now",
      closedNow: "Closed now",
      hoursNote: "Times are Barcelona local time (CET / CEST).",
      mapTitle: "Map showing Konkai Sushi House on Carrer de Roger de Flor, Barcelona",
    },

    reserve: {
      eyebrow: "Reservations",
      title: "Book a table",
      blurb:
        "Tables are booked through the platforms the restaurant uses. Pick whichever suits you — both go to the same kitchen.",
      headlineA: "Your table",
      headlineB: "is waiting.",
      thefork: "Reserve on TheFork",
      opentable: "Reserve on OpenTable",
      byPhone: "Prefer to call?",
      callCta: "Call the restaurant",
      note: "For a specific table and time, book through TheFork or OpenTable. Opening hours are listed below.",
    },

    footer: {
      tagline: "Japanese cuisine near the Sagrada Família, Barcelona.",
      credit: "Created by",
      explore: "Explore",
      visit: "Visit",
      contact: "Contact",
      follow: "Follow",
      rights: "All rights reserved.",
      legal: "Privacy",
      top: "Back to top",
      closing: "Barcelona · 08013",
      menuPdf: "Printable menu",
    },

    a11y: {
      ratingStars: "out of 5 stars",
      externalLink: "opens in a new tab",
    },

    cookies: {

      title: "Cookie notice",
      intro:
        "This website does not set its cookies of its own, and runs no analytics or advertising. The only exception is the Google reviews feed described below, which is loaded from a third-party service and only after you agree.",
      mapTitle: "The map",
      mapBody:
        "The address section shows a schematic map drawn with CSS. A real Google map is only requested if you press the button on it. Until you do, Google receives no request from this page. After you load it, Google may set its own cookies and apply its own privacy policy.",
      thirdPartyTitle: "Links to other services",
      thirdPartyBody:
        "Booking (TheFork, OpenTable), delivery (Uber Eats), the restaurant's own site, and its social accounts are operated by other companies. Anything you do on those services is governed by their privacy policies, not by this notice.",
      widgetTitle: "The Google reviews feed",
      widgetBody:
        "The reviews section can show a live feed of Google reviews. Google does not allow reviews to be embedded directly, so that feed comes from a third-party service. It is not requested, and no cookie is set by it, until you press its button. If you accept, that service may set its own cookies and process data about your visit under its own privacy policy. You can decline and carry on using the rest of the site; the rating and the published quotes remain available either way.",
      contactTitle: "Questions",
      contactBody: "Write to the restaurant and we will point you in the right direction.",
    },
    
    /* ---------------------------------------------------------------- */
    /*  Legal notice — text supplied by the site owner, reproduced as     */
    /*  given. The long-form conditions are kept verbatim and only        */
    /*  grouped under navigational headings.                             */
    /* ---------------------------------------------------------------- */
    legal: {
      title: "Legal notice",
      siteLabel: "www.konkaisushi.es",
      owner: "BHUPANDRA KUMAR SHRESTHA",
      intro:
        "This website belongs to BHUPANDRA KUMAR SHRESTHA, located at 222 Roger de Flor Street, 08013. The use by the user of the services contained on this website, as well as the request for information/reservations/orders, fully implies the following conditions:",
      acceptanceTitle: "Acceptance and use of the site",
      conditions: [
        "All rights associated with this designation are protected and reserved. Consequently, the reproduction, in whole or in part, of any of its contents is strictly prohibited, even when citing the source.",
        "The infringement will be prosecuted through civil and criminal proceedings, with a demand for compensation for any damages that may arise from it.",
        "BHUPANDRA KUMAR SHRESTHA does not accept any responsibility for the infringement that the user may make against such protected rights or those covered by the rights protected by the Intellectual Property Law, the Law on the Civil Protection of the Right to Honor, Personal and Family Privacy and Image, the Trademark Law, the General Advertising Law, the General Law for the Defense of Consumers and Users (State or Autonomous), the Unfair Competition Law or the Law of General Contracting Conditions, among others.",
        "BHUPANDRA KUMAR SHRESTHA is not responsible for the information that the user or any third party posts on this website, nor for any harm that such information may cause to other users. Therefore, this website may, at its sole discretion, deny or even remove any information that could violate the aforementioned legal provisions or any other applicable laws, including those that violate morality and established customs.",
        "BHUPANDRA KUMAR SHRESTHA will not be liable for any communication failures, including deletion, incomplete transmission, or delays in delivery, nor does it guarantee that the transmission network will be operational at all times. BHUPANDRA KUMAR SHRESTHA will also not be liable if a third party, breaching the security measures established by BHUPANDRA KUMAR SHRESTHA, accesses the messages or uses them to transmit computer viruses.",
        "BHUPANDRA KUMAR SHRESTHA does not guarantee the legality, reliability, or usefulness of the content, nor its truthfulness or accuracy. Furthermore, it does not offer or sell the products and services available on linked sites and assumes no responsibility for such products or services.",
        "BHUPANDRA KUMAR SHRESTHA does not control the use of the portal by users, nor does it guarantee that they will do so in accordance with these general conditions.",
        "The user accepts that by clicking on the links that direct him to third-party websites he stops browsing this website, exonerating BHUPANDRA KUMAR SHRESTHA from any responsibility, damage or loss in contracting with third-party companies.",
        "BHUPANDRA KUMAR SHRESTHA does not enter into any contracts with the user but merely acts as an intermediary, facilitating access to third-party companies. This is inherent to the nature of the internet and the services provided. The information about these services contained on the portal is purely for advertising and informational purposes; BHUPANDRA KUMAR SHRESTHA does not constitute any contractual offer. The user contracts directly with the companies from which they request services or through which they link, without any contractual relationship or management whatsoever on the part of BHUPANDRA KUMAR SHRESTHA.",
        "BHUPANDRA KUMAR SHRESTHA assumes no responsibility for the products sold or services provided by such companies, nor for the accurate and proper performance of such services or contracts. BHUPANDRA KUMAR SHRESTHA cannot control, and therefore is not responsible for, the compliance of its partner companies with their legal obligations.",
      ],
      dataTitle: "Personal data",
      data: [
        "If, as a result of using this website, the user provides their personal data, they agree that the personal data provided to BHUPANDRA KUMAR SHRESTHA may be processed in a personal data file. The data thus recorded may be used for commercial purposes, including compiling statistics, sending advertising, offers, and promotions, conducting prize contests, administering the service, and managing incidents, unless the user expresses their objection in writing to the address indicated below.",
        "The files thus created will be owned by BHUPANDRA KUMAR SHRESTHA. The data subject will have at all times the right to access, rectify, cancel and oppose their data at c/Roger de Flor 222. 08013",
        "BHUPANDRA KUMAR SHRESTHA has adopted all legally required security measures for the protection of personal data provided by the user. However, BHUPANDRA KUMAR SHRESTHA cannot guarantee the absolute invulnerability of its security systems, nor can it guarantee the security or inviolability of such data during its transmission over the network.",
      ],
      changesTitle: "Changes to this website",
      changes: [
        "BHUPANDRA KUMAR SHRESTHA reserves the right to make any modifications it deems appropriate to its websites without prior notice, and may change, delete or add both the content and services provided through them, as well as the way in which they are presented or located on its websites.",
      ],
    },

    privacy: {
      title: "Privacy policy",
      intro:
        "This page explains what happens to your data when you use this website. It is a plain summary; the notice published by the restaurant on its own site is the authoritative document and is linked at the end.",
      controllerTitle: "Who is responsible",
      controllerBody:
        "This website is operated by BHUPANDRA KUMAR SHRESTHA, at Carrer de Roger de Flor 222, 08013 Barcelona. The restaurant can be reached on +34 931 560 414.",
      browsingTitle: "Simply visiting this site",
      browsingBody:
        "Reading this website requires no account and no form. The site sets no cookies of its own and runs no analytics, advertising or profiling scripts, so no profile of you is built by visiting. The only third-party content that can be requested from this page is the map in the address section, and only if you press its button; until you do, no request reaches Google.",
      bookingTitle: "Reservations and enquiries",
      bookingBody:
        "Tables are booked through TheFork, OpenTable or by telephone. Those services are run by other companies, and what they collect is governed by their own privacy policies, not by this one. Booking on this site does not send your details to the restaurant: nothing on this website transmits a booking.",
      rightsTitle: "Your rights",
      rightsBody:
        "You may ask what data is held about you, have it corrected, deleted or restricted, object to its use, and request a copy, by writing to the address above. Because most of the data about bookings sits with the booking platforms rather than with the restaurant, it is usually fastest to ask them directly.",
      changesTitle: "Changes",
      changesBody:
        "If this policy changes, the updated text will appear on this page. There is no separate mailing list and no consent to withdraw, because no marketing list is kept here.",
      contactTitle: "Questions",
      contactBody:
        "Write to the restaurant and we will point you in the right direction.",
    },

    sitemapPage: {
      title: "Sitemap",
      intro: "Every page on this site, grouped by what it is for.",
      mainTitle: "Main",
      infoTitle: "Information",
      legalTitle: "Legal",
      home: "Home",
      cookies: "Cookie notice",
    },

    accessibility: {
      title: "Accessibility",
      intro:
        "We want this site to be usable by everyone, including people who browse with a keyboard, a screen reader, or at a large text size. This page records what we have done and where it still falls short.",
      standardsTitle: "Standard",
      standardsBody:
        "The site is built to conform to WCAG 2.2 at level AA. That is a target we work towards rather than a certification we hold, and we would rather say so plainly than imply an audit that has not been carried out.",
      measuresTitle: "What we have done",
      measures: [
        "Every page has one main heading and a logical heading order, and the language of the page is declared so screen readers pronounce it correctly.",
        "All navigation and controls can be reached and operated with a keyboard, with a visible focus ring that is never removed.",
        "A 'Skip to content' link is the first focusable element, so the navigation can be bypassed in one keypress.",
        "Text and background colours are chosen for at least 4.5:1 contrast, and interactive targets are at least 44 by 44 pixels.",
        "Images carry alternative text describing what they show, unless they are purely decorative, in which case they are hidden from assistive technology so they are not announced twice.",
        "The menu, the photo gallery and the language selector all work from the keyboard, and the gallery lightbox returns focus to the thumbnail that opened it.",
        "Animation respects the operating system's 'reduce motion' setting, and nothing on the site flashes or moves on its own for more than a few seconds.",
        "The layout reflows to a single column at narrow widths and remains usable at 200% browser zoom without horizontal scrolling.",
      ],
      limitsTitle: "Known limitations",
      limitsBody:
        "The map in the address section is third-party content and inherits the accessibility of the map service, which we do not control. If you hit a barrier anywhere on this site that is not listed here, please tell us and we will treat it as a bug.",
      contactTitle: "Reporting a problem",
      contactBody:
        "Write to the restaurant describing the page and what happened. We aim to reply within a few working days.",
    },

  },

  es: {
    localeName: "Español",
    htmlLang: "es",

    nav: {
      menu: "Carta",
      dishes: "Platos",
      restaurant: "Restaurante",
      reviews: "Opiniones",
      gallery: "Galería",
      location: "Ubicación",
      reserve: "Reservar mesa",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      skip: "Ir al contenido",
      skipSitemap: "Ir a la página del mapa del sitio",
      skipAccessibility: "Ir a la página de accesibilidad",
    },

    hero: {
      headline: "Encuéntranos",
      eyebrow: "Dreta de l'Eixample · Barcelona",
      wordmark: "Konkai Sushi House",
      cuisineLine: "Cocina japonesa y asiática",
      localityLine: "Dreta de l'Eixample · Barcelona",
      postcodeMark: "08013",
      cityMark: "BCN",
      ctaExplore: "Explorar la carta",
      ctaMenu: "Ver carta",
      ctaReserve: "Reservar mesa",
      ctaDirections: "Cómo llegar",
      scroll: "Desliza",
    },

    intro: {
      eyebrow: "El restaurante",
      title: "Una mesa de barrio, a metros de la Sagrada Família",
      headlineA: "Sabores japoneses,",
      headlineB: "Energía de Barcelona.",
      restaurantNum: "01",
      restaurantLabel: "El restaurante",
      factsTitle: "En resumen",
    },

    facts: {
      cuisine: "Cocina",
      priceRange: "Precio",
      seats: "Terraza",
      openEveryDay: "Abierto todos los días",
      address: "Dirección",
      phone: "Teléfono",
      services: "Servicios",
    },

    labels: {
      cuisine: ["Japonesa", "Sushi", "Asiática"],
      perDish: "/ plato",
      covers: "comensales",
      services: [
        "En sala",
        "Para llevar",
        "Delivery sin contacto",
        "Terraza exterior",
        "Comedor interior",
        "Reservas",
      ],
    },

    visit: {
      num: "03",
      label: "El espacio",
      headline: "Vienes por la comida, te quedas por el local.",
      blurb:
        "Una terraza exterior para hasta doce comensales y un comedor interno en el que te sentirás como en casa. Estamos en pleno Eixample Derecho, a unos minutos de la Sagrada Família.",
      seatsNumber: "12",
      seatsLabel: "plazas en terraza",
      facts: [
        "Terraza exterior",
        "Comedor interior",
        "Cerca de la Sagrada Família",
      ],
    },

    signature: {
      eyebrow: "Platos destacados",
      title: "Lo que se pide en casa",
      blurb:
        "Seis platos que el propio restaurante coloca en cabeza de su carta. Los precios son los de la carta oficial.",
      kitchenNum: "02",
      kitchenLabel: "De la cocina",
      headline: "Seis platos para empezar.",
      featuredBy: "Destacado por el restaurante",
    },

    menu: {
      eyebrow: "La carta",
      title: "Sushi, sashimi y una carta caliente amplia",
      blurb:
        "Una carta extensa, de frío y caliente, desde tres piezas de nigiri hasta un bol de ramen. Todo lo que sigue es la lista y los precios del propio restaurante.",
      all: "Todo",
      viewFull: "Ver carta completa",
      viewPdf: "Abrir carta imprimible (PDF)",
      pricesNote: "Todos los precios en euros. Alergias y preferencias: consulta al equipo.",
      categories: "Secciones de la carta",
      jumpTo: "Ir a",
    },

    reviews: {
      eyebrow: "Opiniones",
      title: "4,5 sobre 5 en Google",
      blurb:
        "La valoración procede del perfil de empresa en Google. Las citas individuales son opiniones publicadas en TheFork y OpenTable, mostradas sin editar y atribuidas a su plataforma.",
      num: "04",
      label: "Dicen los clientes",
      ratingCaption: "Valoración en Google",
      reviewsCaption: "opiniones",
      seeAllGoogle: "Ver todas las opiniones en Google",
      seeAllTheFork: "Leer todas las opiniones en TheFork",
      sourceLabel: "Valoración en Google",
      quoteSource: "Opinión publicada en",
      ourReply: "Nota",
      widget: {
        consentTitle: "Cargar las opiniones de Google en directo",
        consentBody:
          "Google no permite incrustar opiniones directamente, por lo que este feed lo proporciona un servicio de terceros. Al cargarlo se contactará con ese servicio, que podrá instalar sus propias cookies y recopilar datos sobre tu visita.",
        consentButton: "Cargar opiniones de Google",
        vendorNote:
          "No se envía ninguna petición ni se instala ninguna cookie hasta que pulses el botón. Consulta el aviso de cookies para más detalle.",
        fallbackTitle:
          "El conjunto completo de opiniones está en Google. Usa el botón de arriba para leerlas allí.",
        loading: "Cargando opiniones…",
      },
    },

    gallery: {
      eyebrow: "Galería",
      title: "La sala, la terraza y los platos",
      blurb: "Fotografías publicadas por el restaurante en su propia web.",
      open: "Ver más grande",
      close: "Cerrar",
      prev: "Imagen anterior",
      next: "Imagen siguiente",
      counter: "Imagen",
    },

    location: {
      eyebrow: "Dónde estamos",
      title: "Carrer de Roger de Flor, 222",
      blurb:
        "En la Dreta de l'Eixample, en Roger de Flor entre Mallorca y Provenza — a pocos metros de la Sagrada Família.",
      address: "Dirección",
      hours: "Horario",
      phone: "Teléfono",
      gettingHere: "Cómo llegar",
      metro: "Metro más cercano",
      parking: "Parking cercano",
      today: "Hoy",
      closed: "Cerrado",
      lunch: "Comida",
      dinner: "Cena",
      openNow: "Abierto ahora",
      closedNow: "Cerrado ahora",
      hoursNote: "Horas locales de Barcelona (CET / CEST).",
      mapTitle: "Mapa con Konkai Sushi House en Carrer de Roger de Flor, Barcelona",
    },

    reserve: {
      eyebrow: "Reservas",
      title: "Reserva tu mesa",
      blurb:
        "Las reservas se hacen a través de las plataformas que usa el restaurante. Elige la que prefieras: ambas van a la misma cocina.",
      headlineA: "Tu mesa",
      headlineB: "te espera.",
      thefork: "Reservar en TheFork",
      opentable: "Reservar en OpenTable",
      byPhone: "¿Prefieres llamar?",
      callCta: "Llamar al restaurante",
      note: "Para una mesa y una hora concretas, reserva en TheFork o OpenTable. Los horarios están indicados abajo.",
    },

    footer: {
      tagline: "Cocina japonesa cerca de la Sagrada Família, Barcelona.",
      credit: "Creado por",
      explore: "Explorar",
      visit: "Visitar",
      contact: "Contacto",
      follow: "Síguenos",
      rights: "Todos los derechos reservados.",
      legal: "Privacidad",
      top: "Volver arriba",
      closing: "Barcelona · 08013",
      menuPdf: "Carta imprimible",
    },

    a11y: {
      ratingStars: "sobre 5 estrellas",
      externalLink: "se abre en una pestaña nueva",
    },

    cookies: {

      title: "Aviso de cookies",
      intro:
        "Este sitio web no instala cookies propias ni usa analítica ni publicidad. La única excepción es el feed de opiniones de Google descrito abajo, que se carga desde un servicio de terceros y solo después de que aceptes.",
      mapTitle: "El mapa",
      mapBody:
        "La sección de dirección muestra un mapa esquemático dibujado con CSS. El mapa real de Google solo se solicita si pulsas el botón. Hasta que lo hagas, esta página no envía ninguna petición a Google. Después de cargarlo, Google puede instalar sus propias cookies y aplicar su propia política de privacidad.",
      thirdPartyTitle: "Enlaces a otros servicios",
      thirdPartyBody:
        "Las reservas (TheFork, OpenTable), el reparto (Uber Eats), la web del restaurante y sus redes sociales son gestionados por otras empresas. Lo que hagas en esos servicios se rige por sus políticas de privacidad, no por este aviso.",
      widgetTitle: "El feed de opiniones de Google",
      widgetBody:
        "La sección de opiniones puede mostrar un feed en directo de opiniones de Google. Google no permite incrustar opiniones directamente, así que ese feed procede de un servicio de terceros. No se solicita, ni dicho servicio instala cookies, hasta que pulses su botón. Si aceptas, ese servicio podrá instalar sus propias cookies y tratar datos sobre tu visita conforme a su propia política de privacidad. Puedes rechazarlo y seguir usando el resto del sitio; la valoración y las citas publicadas están disponibles igualmente.",
      contactTitle: "Preguntas",
      contactBody: "Escríbenos al restaurante y te orientaremos.",
    },
    
    legal: {
      title: "Aviso legal",
      siteLabel: "www.konkaisushi.es",
      owner: "BHUPANDRA KUMAR SHRESTHA",
      intro:
        "Este sitio web pertenece a BHUPANDRA KUMAR SHRESTHA, con domicilio en Roger de Flor 222, 08013. El uso por el usuario de los servicios contenidos en este sitio web, así como la solicitud de información/reservas/pedidos, implica plenamente las siguientes condiciones:",
      acceptanceTitle: "Aceptación y uso del sitio",
      conditions: [
        "Todos los derechos asociados a esta denominación están protegidos y reservados. En consecuencia, queda estrictamente prohibida la reproducción, total o parcial, de cualquiera de sus contenidos, incluso citando la fuente.",
        "La infracción será perseguida por vía civil y penal, con reclamación de la correspondiente indemnización por los daños que puedan derivarse de la misma.",
        "BHUPANDRA KUMAR SHRESTHA no acepta ninguna responsabilidad por la infracción que el usuario pueda cometer sobre dichos derechos protegidos ni sobre los cubiertos por los derechos protegidos por la Ley de Propiedad Intelectual, la Ley de Protección Civil del Derecho al Honor, la Intimidad Personal y Familiar y la Imagen, la Ley de Marcas, la Ley General de Publicidad, la Ley General de Defensa de los Consumidores y Usuarios (Estatal o Autonómica), la Ley de Competencia Desleal o la Ley de Condiciones Generales de Contratación, entre otras.",
        "BHUPANDRA KUMAR SHRESTHA no es responsable de la información que el usuario o cualquier tercero publique en este sitio web, ni de ningún perjuicio que dicha información pueda causar a otros usuarios. Por lo tanto, este sitio web podrá, a su sola discreción, denegar o incluso retirar cualquier información que pueda vulnerar las disposiciones legales antes mencionadas o cualquier otra ley aplicable, incluidas las que vulneren la moral y las costumbres admitidas.",
        "BHUPANDRA KUMAR SHRESTHA no responderá de ningún fallo de comunicación, incluida la eliminación, transmisión incompleta o retrasos en la entrega, ni garantiza que la red de transmisión esté operativa en todo momento. BHUPANDRA KUMAR SHRESTHA tampoco responderá si un tercero, incumpliendo las medidas de seguridad establecidas por BHUPANDRA KUMAR SHRESTHA, accede a los mensajes o los utiliza para transmitir virus informáticos.",
        "BHUPANDRA KUMAR SHRESTHA no garantiza la legalidad, fiabilidad ni utilidad del contenido, ni su veracidad o exactitud. Asimismo, no ofrece ni vende los productos o servicios disponibles en sitios enlazados y no asume responsabilidad alguna por dichos productos o servicios.",
        "BHUPANDRA KUMAR SHRESTHA no controla el uso del portal por parte de los usuarios, ni garantiza que lo hagan de conformidad con estas condiciones generales.",
        "El usuario acepta que, al pulsar los enlaces que le dirigen a sitios web de terceros, deja de navegar por este sitio web, exonerando a BHUPANDRA KUMAR SHRESTHA de cualquier responsabilidad, daño o perjuicio al contratar con terceros.",
        "BHUPANDRA KUMAR SHRESTHA no celebra ningún contrato con el usuario, sino que actúa mero intermediario facilitando el acceso a terceros. Ello es inherente a la naturaleza de internet y de los servicios prestados. La información sobre dichos servicios contenida en el portal es puramente publicitaria e informativa; BHUPANDRA KUMAR SHRESTHA no constituye oferta contractual alguna. El usuario contrata directamente con las empresas a las que solicite los servicios o a través de las que enlaza, sin relación ni gestión contractual alguna por parte de BHUPANDRA KUMAR SHRESTHA.",
        "BHUPANDRA KUMAR SHRESTHA no asume responsabilidad por los productos vendidos o servicios prestados por dichas empresas, ni por la correcta y adecuada ejecución de dichos servicios o contratos. BHUPANDRA KUMAR SHRESTHA no puede controlar, y por tanto no responde del, el cumplimiento de sus obligaciones legales por parte de las empresas colaboradoras.",
      ],
      dataTitle: "Datos personales",
      data: [
        "Si como consecuencia del uso de este sitio web el usuario facilita sus datos personales, acepta que los datos personales facilitados a BHUPANDRA KUMAR SHRESTHA puedan ser tratados en un fichero de datos personales. Los datos así registrados podrán utilizarse con fines comerciales, entre ellos la elaboración de estadísticas, el envío de publicidad, ofertas y promociones, la realización de concursos, la gestión del servicio y la gestión de incidencias, salvo que el usuario manifieste su oposición por escrito a la dirección indicada abajo.",
        "Los ficheros así creados serán de propiedad de BHUPANDRA KUMAR SHRESTHA. El interesado tendrá en todo momento el derecho de acceder, rectificar, cancelar y oponerse a sus datos en c/Roger de Flor 222. 08013",
        "BHUPANDRA KUMAR SHRESTHA ha adoptado todas las medidas de seguridad legalmente exigibles para la protección de los datos personales facilitados por el usuario. No obstante, BHUPANDRA KUMAR SHRESTHA no puede garantizar la invulnerabilidad absoluta de sus sistemas de seguridad, ni garantizar la seguridad o inviolabilidad de dichos datos durante su transmisión a través de la red.",
      ],
      changesTitle: "Modificaciones de este sitio web",
      changes: [
        "BHUPANDRA KUMAR SHRESTHA se reserva el derecho a realizar las modificaciones que estime oportunas en sus sitios web sin previo aviso, y podrá cambiar, eliminar o añadir tanto el contenido como los servicios prestados a través de los mismos, así como la forma en que se presentan o se localizan en sus sitios web.",
      ],
    },

    privacy: {
      title: "Política de privacidad",
      intro:
        "Esta página explica qué ocurre con tus datos cuando utilizas este sitio web. Es un resumen claro; el aviso publicado por el restaurante en su propia web es el documento oficial y figura enlazado al final.",
      controllerTitle: "Quién es el responsable",
      controllerBody:
        "Este sitio web lo explota BHUPANDRA KUMAR SHRESTHA, en Carrer de Roger de Flor 222, 08013 Barcelona. Se puede contactar con el restaurante en el +34 931 560 414.",
      browsingTitle: "Solo visitar este sitio",
      browsingBody:
        "Leer este sitio web no requiere cuenta ni formulario. El sitio no instala cookies propias ni utiliza analítica, publicidad ni scripts de perfilado, por lo que la visita no construye ningún perfil sobre ti. El único contenido de terceros que puede solicitarse desde esta página es el mapa de la sección de dirección, y solo si pulsas su botón; hasta que lo hagas, no llega ninguna petición a Google.",
      bookingTitle: "Reservas y consultas",
      bookingBody:
        "Las mesas se reservan a través de TheFork, OpenTable o por teléfono. Esos servicios los gestionan otras empresas, y los datos que recojan se rigen por sus propias políticas de privacidad, no por esta. Reservar desde este sitio no envía tus datos al restaurante: nada en esta web transmite una reserva.",
      rightsTitle: "Tus derechos",
      rightsBody:
        "Puedes pedir qué datos se tratan sobre ti, solicitar su rectificación, supresión o limitación, oponerte a su uso y pedir una copia, escribiendo a la dirección indicada arriba. Como la mayor parte de los datos de las reservas se encuentran en las plataformas de reserva y no en el restaurante, suele ser más rápido pedirlo directamente a ellas.",
      changesTitle: "Cambios",
      changesBody:
        "Si esta política cambia, el texto actualizado aparecerá en esta página. No hay lista de correo ni consentimiento que retirar, porque aquí no se conserva ninguna lista de marketing.",
      contactTitle: "Preguntas",
      contactBody: "Escríbenos al restaurante y te orientaremos.",
    },

    sitemapPage: {
      title: "Mapa del sitio",
      intro: "Todas las páginas de este sitio web, agrupadas por finalidad.",
      mainTitle: "Principal",
      infoTitle: "Información",
      legalTitle: "Legal",
      home: "Inicio",
      cookies: "Aviso de cookies",
    },

    accessibility: {
      title: "Accesibilidad",
      intro:
        "Queremos que este sitio web sea utilizable por todo el mundo, incluidas las personas que navegan con teclado, con lector de pantalla o con un tamaño de texto ampliado. Esta página recoge lo que hemos hecho y dónde queda pendiente.",
      standardsTitle: "Estándar",
      standardsBody:
        "El sitio web está construido para cumplir las WCAG 2.2 en nivel AA. Es un objetivo hacia el que trabajamos más que una certificación que poseamos, y preferimos decirlo con claridad antes que insinuar una auditoría que no se ha realizado.",
      measuresTitle: "Qué hemos hecho",
      measures: [
        "Cada página tiene un único encabezado principal y un orden lógico de encabezados, y el idioma de la página está declarado para que los lectores de pantalla lo pronuncien correctamente.",
        "Toda la navegación y los controles se pueden alcanzar y usar con teclado, con un anillo de foco visible que nunca se elimina.",
        "El enlace «Ir al contenido» es el primer elemento enfocable, de modo que la navegación puede saltarse con una sola pulsación.",
        "Los colores de texto y de fondo están elegidos para un contraste mínimo de 4,5:1, y las zonas interactivas miden al menos 44 por 44 píxeles.",
        "Las imágenes llevan texto alternativo que describe lo que muestran, salvo cuando son puramente decorativas, en cuyo caso se ocultan a la tecnología asistiva para que no se anuncien dos veces.",
        "La carta, la galería de fotos y el selector de idioma funcionan con teclado, y la galería devuelve el foco a la miniatura que la abrió.",
        "La animación respeta la opción «reducir movimiento» del sistema operativo, y nada en el sitio parpadea ni se mueve por sí solo más de unos segundos.",
        "La maquetación se refunde en una sola columna en pantallas estrechas y sigue siendo utilizable al 200 % de zoom sin desplazamiento horizontal.",
      ],
      limitsTitle: "Limitaciones conocidas",
      limitsBody:
        "El mapa de la sección de dirección es contenido de terceros y hereda la accesibilidad del servicio de mapas, que no controlamos. Si encuentras una barrera en este sitio que aquí no esté recogida, escríbenos y la trataremos como un error.",
      contactTitle: "Comunicar un problema",
      contactBody:
        "Escríbenos al restaurante indicando la página y lo ocurrido. Intentaremos responder en pocos días laborables.",
    },

  },

  ca: {
    localeName: "Català",
    htmlLang: "ca",

    nav: {
      menu: "Carta",
      dishes: "Plats",
      restaurant: "Restaurant",
      reviews: "Opinions",
      gallery: "Galeria",
      location: "Ubicació",
      reserve: "Reservar taula",
      openMenu: "Obrir menú",
      closeMenu: "Tancar menú",
      skip: "Anar al contingut",
      skipSitemap: "Anar a la pàgina del mapa del lloc",
      skipAccessibility: "Anar a la pàgina d'accessibilitat",
    },

    hero: {
      headline: "Troba'ns",
      eyebrow: "Dreta de l'Eixample · Barcelona",
      wordmark: "Konkai Sushi House",
      cuisineLine: "Cuina japonesa i asiàtica",
      localityLine: "Dreta de l'Eixample · Barcelona",
      postcodeMark: "08013",
      cityMark: "BCN",
      ctaExplore: "Explorar la carta",
      ctaMenu: "Veure carta",
      ctaReserve: "Reservar taula",
      ctaDirections: "Com arribar-hi",
      scroll: "Desplaça",
    },

    intro: {
      eyebrow: "El restaurant",
      title: "Una taula de barri, a metres de la Sagrada Família",
      headlineA: "Sabors japanesos,",
      headlineB: "Energia de Barcelona.",
      restaurantNum: "01",
      restaurantLabel: "El restaurant",
      factsTitle: "En resum",
    },

    facts: {
      cuisine: "Cuina",
      priceRange: "Preu",
      seats: "Terrassa",
      openEveryDay: "Obert cada dia",
      address: "Adreça",
      phone: "Telèfon",
      services: "Serveis",
    },

    labels: {
      cuisine: ["Japonesa", "Sushi", "Asiàtica"],
      perDish: "/ plat",
      covers: "comensals",
      services: [
        "A sala",
        "Per endur",
        "Delivery sense contacte",
        "Terrassa exterior",
        "Sala interior",
        "Reserves",
      ],
    },

    visit: {
      num: "03",
      label: "L'espai",
      headline: "Véns per la comida, t'hi quedes per la sala.",
      blurb:
        "Una terrassa exterior per a fins a dotze comensals i un comedor interior on et sentiràs com a casa. Som al mig de la Dreta de l'Eixample, a uns minuts de la Sagrada Família.",
      seatsNumber: "12",
      seatsLabel: "places a la terrassa",
      facts: [
        "Terrassa exterior",
        "Comedor interior",
        "A prop de la Sagrada Família",
      ],
    },

    signature: {
      eyebrow: "Plats destacats",
      title: "Què es demana a casa",
      blurb:
        "Sis plats que el mateix restaurant posa al capdavant de la carta. Els preus són els de la carta oficial.",
      kitchenNum: "02",
      kitchenLabel: "De la cuina",
      headline: "Sis plats per començar.",
      featuredBy: "Destacat pel restaurant",
    },

    menu: {
      eyebrow: "La carta",
      title: "Sushi, sashimi i una carta calenta àmplia",
      blurb:
        "Una carta àmplia, de fred i calent, des de tres peces de nigiri fins a un bol de ramen. Tota la llista i els preus són els del restaurant.",
      all: "Tot",
      viewFull: "Veure carta completa",
      viewPdf: "Obrir carta imprimible (PDF)",
      pricesNote: "Tots els preus en euros. Al·lèrgies i preferències: consulta l'equip.",
      categories: "Seccions de la carta",
      jumpTo: "Vés a",
    },

    reviews: {
      eyebrow: "Opinions",
      title: "4,5 sobre 5 a Google",
      blurb:
        "La valoració prové del perfil d'empresa a Google. Les citacions individuals són opinions publicades a TheFork i OpenTable, mostrades sense editar i atribuïdes a la seva plataforma.",
      num: "04",
      label: "Diuen els clients",
      ratingCaption: "Valoració a Google",
      reviewsCaption: "opinions",
      seeAllGoogle: "Veure totes les opinions a Google",
      seeAllTheFork: "Llegir totes les opinions a TheFork",
      sourceLabel: "Valoració a Google",
      quoteSource: "Opinió publicada a",
      ourReply: "Nota",
      widget: {
        consentTitle: "Carregar les opinions de Google en directe",
        consentBody:
          "Google no permet incrustar opinions directament, de manera que aquest feed l'ofereix un servei de tercers. En carregar-lo es contactará amb aquest servei, que podrà instal·lar les seves pròpies galetes i recollir dades sobre la teva visita.",
        consentButton: "Carregar opinions de Google",
        vendorNote:
          "No s'envia cap petició ni s'instal·la cap galeta fins que premis el botó. Consulta l'avís de galetes per obtenir més informació.",
        fallbackTitle:
          "El conjunt complet d'opinions és a Google. Fes servir el botó de dalt per llegir-les allà.",
        loading: "Carregant opinions…",
      },
    },

    gallery: {
      eyebrow: "Galeria",
      title: "La sala, la terrassa i els plats",
      blurb: "Fotografies publicades pel restaurant al seu propi web.",
      open: "Veure més gran",
      close: "Tancar",
      prev: "Imatge anterior",
      next: "Imatge següent",
      counter: "Imatge",
    },

    location: {
      eyebrow: "On som",
      title: "Carrer de Roger de Flor, 222",
      blurb:
        "A la Dreta de l'Eixample, al Roger de Flor entre Mallorca i Provença — a pocs metres de la Sagrada Família.",
      address: "Adreça",
      hours: "Horari",
      phone: "Telèfon",
      gettingHere: "Com arribar-hi",
      metro: "Metro mésProper",
      parking: "Parking proper",
      today: "Avui",
      closed: "Tancat",
      lunch: "Dinar",
      dinner: "Sopar",
      openNow: "Obert ara",
      closedNow: "Tancat ara",
      hoursNote: "Hores locals de Barcelona (CET / CEST).",
      mapTitle: "Mapa amb Konkai Sushi House al Carrer de Roger de Flor, Barcelona",
    },

    reserve: {
      eyebrow: "Reserves",
      title: "Reserva la teva taula",
      blurb:
        "Les reserves es fan a través de les plataformes que fa servir el restaurant. Tria la que vulguis: totes dues van a la mateixa cuina.",
      headlineA: "La teva taula",
      headlineB: "t'espera.",
      thefork: "Reservar a TheFork",
      opentable: "Reservar a OpenTable",
      byPhone: "Prefereixes trucar?",
      callCta: "Trucar al restaurant",
      note: "Per a una taula i una hora concretes, reserva a TheFork o OpenTable. Els horaris són indicats a sota.",
    },

    footer: {
      tagline: "Cuina japonesa a prop de la Sagrada Família, Barcelona.",
      credit: "Creat per",
      explore: "Explorar",
      visit: "Visitar",
      contact: "Contacte",
      follow: "Segueix-nos",
      rights: "Tots els drets reservats.",
      legal: "Privacitat",
      top: "Tornar a dalt",
      closing: "Barcelona · 08013",
      menuPdf: "Carta imprimible",
    },

    a11y: {
      ratingStars: "sobre 5 estrelles",
      externalLink: "s'obre en una pestanya nova",
    },

    cookies: {

      title: "Avís de galetes",
      intro:
        "Aquest lloc web no instal·la galetes pròpies ni utilitza analítica ni publicitat. L'única excepció és el feed d'opinions de Google descrit a sota, que es carrega des d'un servei de tercers i només després que ho acceptis.",
      mapTitle: "El mapa",
      mapBody:
        "L'apartat de l'adreça mostra un mapa esquemàtic dibuixat amb CSS. El mapa real de Google només se sol·licita si prems el botó. Fins que ho facis, aquesta pàgina no envia cap sol·licitud a Google. Després de carregar-lo, Google pot instal·lar les seves pròpies galetes i aplicar la seva política de privadesa.",
      thirdPartyTitle: "Enllaços a altres serveis",
      thirdPartyBody:
        "Les reserves (TheFork, OpenTable), el repartiment (Uber Eats), el web del restaurant i les seves xarxes socials els gestionen altres empreses. El que facis en aquests serveis es regeix per les seves pròpies polítiques de privadesa, no per aquest avís.",
      widgetTitle: "El feed d'opinions de Google",
      widgetBody:
        "La secció d'opinions pot mostrar un feed en directe d'opinions de Google. Google no permet incrustar opinions directament, de manera que aquest feed prové d'un servei de tercers. No se sol·licita, ni dit servei instal·la galetes, fins que prems el botó. Si ho acceptes, aquest servei podrà instal·lar les seves pròpies galetes i tractar dades sobre la teva visita d'acord amb la seva política de privadesa. Ho pots rebutjar i continuar fent servir la resta del lloc; la valoració i les citacions publicades continuen disponibles igualment.",
      contactTitle: "Preguntes",
      contactBody: "Escriu-nos al restaurant i t'orientarem.",
    },
    
    legal: {
      title: "Avís legal",
      siteLabel: "www.konkaisushi.es",
      owner: "BHUPANDRA KUMAR SHRESTHA",
      intro:
        "Aquest lloc web pertany a BHUPANDRA KUMAR SHRESTHA, amb domicili a Roger de Flor 222, 08013. L'ús per part de l'usuari dels serveis continguts en aquest lloc web, així com la sol·licitud d'informació/reserves/comandes, implica plenament les condicions següents:",
      acceptanceTitle: "Acceptació i ús del lloc",
      conditions: [
        "Tots els drets associats a aquesta denominació estan protegits i reservats. En conseqüència, queda estrictament prohibida la reproducció, total o parcial, de qualsevol dels seus continguts, fins i tot citant la font.",
        "La infracció serà perseguida per via civil i penal, amb reclamació de la corresponent indemnització pels danys que se'n puguin derivar.",
        "BHUPANDRA KUMAR SHRESTHA no accepta cap responsabilitat per la infracció que l'usuari pugui cometre sobre esmentats drets protegits ni sobre els coberts pels drets protegits per la Llei de Propietat Intel·lectual, la Llei de Protecció Civil del Dret a l'Honor, la Intimitat Personal i Familiar i la Imatge, la Llei de Marques, la Llei General de Publicitat, la Llei General de Defensa dels Consumidors i Usuaris (Estatal o Autonòmica), la Llei de Competència Desleial o la Llei de Condicions Generals de Contractació, entre altres.",
        "BHUPANDRA KUMAR SHRESTHA no és responsable de la informació que l'usuari o qualsevol tercer publiqui en aquest lloc web, ni de cap perjudici que aquesta informació pugui causar a altres usuaris. Per tant, aquest lloc web podrà, a la seva sola discreció, denegar o fins i tot retirar qualsevol informació que pugui vulnerar les disposicions legals esmentades o qualsevol altra llei aplicable, incloses les que vulnerin la moral i els costums admesos.",
        "BHUPANDRA KUMAR SHRESTHA no respondrà de cap fallada de comunicació, inclosa l'eliminació, la transmissió incompleta o els retards en la lliurament, ni garanteix que la xarxa de transmissió estigui operativa en tot moment. BHUPANDRA KUMAR SHRESTHA tampoc respondrà si un tercer, incomplint les mesures de seguretat estabertes per BHUPANDRA KUMAR SHRESTHA, accedeix als missatges o els utilitza per transmetre virus informàtics.",
        "BHUPANDRA KUMAR SHRESTHA no garanteix la legalitat, fiabilitat ni utilitat del contingut, ni la seva veracitat o exactitud. així mateix, no ofereix ni ven els productes o serveis disponibles en llocs enllaçats i no assumeix cap responsabilitat per aquests productes o serveis.",
        "BHUPANDRA KUMAR SHRESTHA no controla l'ús del portal per part dels usuaris, ni garanteix que ho facin de conformitat amb aquestes condicions generals.",
        "L'usuari accepta que, en prémer els enllaços que l'adrecen a llocs web de tercers, deixa de navegar per aquest lloc web, exonerant BHUPANDRA KUMAR SHRESTHA de qualsevol responsabilitat, dany o perjudici en contractar amb tercers.",
        "BHUPANDRA KUMAR SHRESTHA no celebra cap contracte amb l'usuari, sinó que actua com a simple intermediari facilitant l'accés a tercers. Això és inherent a la naturalesa d'internet i dels serveis prestats. La informació sobre aquests serveis continguda al portal és purament publicitària i informativa; BHUPANDRA KUMAR SHRESTHA no constitueix cap oferta contractual. L'usuari contracta directament amb les empreses a les que sol·liciti els serveis o a través de les quals enllaça, sense relació ni gestió contractual alguna per part de BHUPANDRA KUMAR SHRESTHA.",
        "BHUPANDRA KUMAR SHRESTHA no assumeix responsabilitat pels productes venuts o serveis prestats per aquestes empreses, ni per la correcta i adequada execució d'aquests serveis o contractes. BHUPANDRA KUMAR SHRESTHA no pot controlar, i per tant no respon del, el compliment de les seves obligacions legals per part de les empreses col·laboradores.",
      ],
      dataTitle: "Dades personals",
      data: [
        "Si com a conseqüència de l'ús d'aquest lloc web l'usuari facilita les seves dades personals, accepta que les dades personals facilitades a BHUPANDRA KUMAR SHRESTHA puguin ser tractades en un fitxer de dades personals. Les dades així registrades podran utilitzar-se amb finalitats comercials, entre elles l'elaboració d'estadístiques, l'enviament de publicitat, ofertes i promocions, la realització de concursos, la gestió del servei i la gestió d'incidències, llevat que l'usuari manifesti la seva oposició per escrit a l'adreça indicada a sota.",
        "Els fitxers així creats seran de propietat de BHUPANDRA KUMAR SHRESTHA. L'interessat tindrà en tot moment el dret d'accedir, rectificar, cancel·lar i oposar-se a les seves dades a c/Roger de Flor 222. 08013",
        "BHUPANDRA KUMAR SHRESTHA ha adoptat totes les mesures de seguretat legalment exigibles per a la protecció de les dades personals facilitades per l'usuari. Tanmateix, BHUPANDRA KUMAR SHRESTHA no pot garantir la invulnerabilitat absoluta dels seus sistemes de seguretat, ni garantir la seguretat o inviolabilitat d'aquestes dades durant la seva transmissió a través de la xarxa.",
      ],
      changesTitle: "Modificacions d'aquest lloc web",
      changes: [
        "BHUPANDRA KUMAR SHRESTHA es reserva el dret a fer les modificacions que consideri oportunes en els seus llocs web sense avís previ, i podrà canviar, eliminar o afegir tant el contingut com els serveis prestats a través d'ells, així com la manera en què es presenten o se situen als seus llocs web.",
      ],
    },

    privacy: {
      title: "Política de privadesa",
      intro:
        "Aquesta pàgina explica què passa amb les teves dades quan utilitzes aquest lloc web. És un resum clar; l'avís publicat pel restaurant al seu propi web és el document oficial i enllaçat al final.",
      controllerTitle: "Qui n'és el responsable",
      controllerBody:
        "Aquest lloc web l'explota BHUPANDRA KUMAR SHRESTHA, a Carrer de Roger de Flor 222, 08013 Barcelona. Es pot posar en contacte amb el restaurant al +34 931 560 414.",
      browsingTitle: "Només visitar aquest lloc",
      browsingBody:
        "Llegir aquest lloc web no requereix compte ni formulari. El lloc no instal·la galetes pròpies ni utilitza analítica, publicitat ni scripts de perfilació, de manera que la visita no construeix cap perfil sobre tu. L'únic contingut de tercers que es pot sol·licitar des d'aquesta pàgina és el mapa de l'apartat d'adreça, i només si prems el botó; fins que ho facis, no arriba cap sol·licitud a Google.",
      bookingTitle: "Reserves i consultes",
      bookingBody:
        "Les taules es reserven a través de TheFork, OpenTable o per telèfon. Aquests serveis els gestiona altres empreses, i les dades que recullin es regeixen per les seves pròpies polítiques de privadesa, no per aquesta. Reservar des d'aquest lloc no envia les teves dades al restaurant: res en aquest web transmet una reserva.",
      rightsTitle: "Els teus drets",
      rightsBody:
        "Pots demanar quines dades es tracten sobre tu, sol·licitar-ne la rectificació, supressió o limitació, oposar-te al seu ús i demanar-ne una còpia, escrivint a l'adreça indicada a dalt. Com que la major part de les dades de les reserves es troben a les plataformes de reserva i no al restaurant, sol ser més ràpid demanar-ho directament a elles.",
      changesTitle: "Canvis",
      changesBody:
        "Si aquesta política canvia, el text actualitzat apareixerà en aquesta pàgina. No hi ha cap llista de correu ni consentiment que retirar, perquè aquí no es conserva cap llista de màrqueting.",
      contactTitle: "Preguntes",
      contactBody: "Escriu-nos al restaurant i t'orientarem.",
    },

    sitemapPage: {
      title: "Mapa del lloc",
      intro: "Totes les pàgines d'aquest lloc web, agrupades per finalitat.",
      mainTitle: "Principal",
      infoTitle: "Informació",
      legalTitle: "Legal",
      home: "Inici",
      cookies: "Avís de galetes",
    },

    accessibility: {
      title: "Accessibilitat",
      intro:
        "Volem que aquest lloc web sigui utilitzable per tothom, incloses les persones que naveguen amb teclat, amb lector de pantalla o amb una mida de text ampliada. Aquesta pàgina recull allò que hem fet i on queda pendent.",
      standardsTitle: "Estàndard",
      standardsBody:
        "El lloc web està construït per complir les WCAG 2.2 en nivell AA. És un objectiu cap al qual treballem més que una certificació que tenim, i preferim dir-ho clarament abans que insinuar una auditoria que no s'ha fet.",
      measuresTitle: "Què hem fet",
      measures: [
        "Cada pàgina té un únic encapçalament principal i un ordre lògic d'encapçalaments, i l'idioma de la pàgina està declarat perquè els lectors de pantalla el pronunciïn correctament.",
        "Tota la navegació i els controls es poden assolir i fer servir amb teclat, amb un anell de focus visible que mai s'elimina.",
        "L'enllaç «Vés al contingut» és el primer element enfocable, de manera que la navegació es pot saltar amb una sola pulsació.",
        "Els colors de text i de fons estan triats per a un contrast mínim de 4,5:1, i les àrees interactives mesuren com a mínim 44 per 44 píxels.",
        "Les imatges porten text alternatiu que descriu què mostren, llevat que siguen purament decoratives, cas en què s'oculten a la tecnologia assistiva perquè no s'anunciïn dues vegades.",
        "La carta, la galeria de fotos i el selector d'idioma funcionen amb teclat, i la galeria retorna el focus a la miniatura que la va obrir.",
        "L'animació respecta l'opció «reduir moviment» del sistema operatiu, i res al lloc parpelleja ni es mou per si sol més d'uns segons.",
        "La maquetació es refundeix en una sola columna en pantalles estretes i continua sent utilitzable al 200 % de zoom sense desplaçament horitzontal.",
      ],
      limitsTitle: "Limitacions conegudes",
      limitsBody:
        "El mapa de l'apartat d'adreça és contingut de tercers i hereta l'accessibilitat del servei de mapes, que no controlem. Si trobes una barrera en aquest lloc que aquí no estigui recollida, escriu-nos i la tractarem com un error.",
      contactTitle: "Comunicar un problema",
      contactBody:
        "Escriu-nos al restaurant indicant la pàgina i què ha passat. Intentarem respondre en pocs dies laborables.",
    },

  },
} as const;

export type Ui = (typeof ui)[Locale];
