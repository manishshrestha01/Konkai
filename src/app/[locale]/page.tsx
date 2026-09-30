import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, type Locale } from "@/data/restaurant";
import { ui } from "@/data/ui";
import { faqJsonLd, restaurantJsonLd } from "@/lib/schema";
import { SITE_URL } from "@/data/restaurant";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { RestaurantIntro } from "@/components/RestaurantIntro";
import { SignatureDishes } from "@/components/SignatureDishes";
import { MenuPreview } from "@/components/MenuPreview";
import { FoodBreak } from "@/components/FoodBreak";
import { VisitSection } from "@/components/VisitSection";
import { Reviews } from "@/components/Reviews";
import { Gallery } from "@/components/Gallery";
import { Location } from "@/components/Location";
import { ReservationCTA } from "@/components/ReservationCTA";
import { Footer } from "@/components/Footer";
import { StickyActions } from "@/components/StickyActions";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { isLocale } from "@/lib/i18n";
import { heroPhoto } from "@/data/photos";

/* -------------------------------------------------------------------------- */
/*  Per-language SEO copy — written for the query it is meant to match          */
/* -------------------------------------------------------------------------- */

const SEO: Record<
  Locale,
  { title: string; description: string; keywords: string[]; ogAlt: string }
> = {
  en: {
    title: "Konkai Sushi House | Japanese Restaurant & Sushi in Barcelona",
    description:
      "Konkai Sushi House is a Japanese restaurant on Carrer de Roger de Flor 222, in the Dreta de l'Eixample near the Sagrada Família, Barcelona. Sushi, sashimi, maki, nigiri, temaki, chirashi and poke bowls, plus a broad hot menu. Open every day, 12:00–00:00. Rated 4.5 on Google from 1,170 reviews.",
    keywords: [
      "Japanese restaurant Barcelona",
      "sushi Barcelona",
      "Japanese food Barcelona",
      "sushi restaurant Eixample",
      "sushi near Sagrada Familia",
      "Konkai Sushi House",
      "sushi Dreta de l'Eixample",
      "poke bowl Barcelona",
      "ramen Barcelona",
    ],
    ogAlt: "Konkai Sushi House, Japanese restaurant in Barcelona",
  },
  es: {
    title: "Konkai Sushi House | Restaurante japonés y sushi en Barcelona",
    description:
      "Konkai Sushi House es un restaurante japonés en Carrer de Roger de Flor 222, en la Dreta de l'Eixample, junto a la Sagrada Família. Sushi, sashimi, maki, nigiri, temaki, chirashi y poke bowls, además de una amplia carta caliente. Abierto todos los días de 12:00 a 00:00. 4,5 en Google con 1.170 opiniones.",
    keywords: [
      "restaurante japonés Barcelona",
      "sushi Barcelona",
      "comida japonesa Barcelona",
      "restaurante sushi Eixample",
      "sushi cerca Sagrada Familia",
      "Konkai Sushi House",
      "sushi Dreta de l'Eixample",
      "poke bowl Barcelona",
      "ramen Barcelona",
    ],
    ogAlt: "Konkai Sushi House, restaurante japonés en Barcelona",
  },
  ca: {
    title: "Konkai Sushi House | Restaurant japonès i sushi a Barcelona",
    description:
      "Konkai Sushi House és un restaurant japonès al Carrer de Roger de Flor 222, a la Dreta de l'Eixample, a prop de la Sagrada Família. Sushi, sashimi, maki, nigiri, temaki, chirashi i poke bowls, a més d'una àmplia carta calenta. Obert cada dia de 12:00 a 00:00. 4,5 a Google amb 1.170 opinions.",
    keywords: [
      "restaurant japonès Barcelona",
      "sushi Barcelona",
      "cuina japonesa Barcelona",
      "restaurant sushi Eixample",
      "sushi a prop Sagrada Família",
      "Konkai Sushi House",
      "sushi Dreta de l'Eixample",
      "poke bowl Barcelona",
      "ramen Barcelona",
    ],
    ogAlt: "Konkai Sushi House, restaurant japonès a Barcelona",
  },
};

/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const seo = SEO[locale];
  const url = `${SITE_URL}/${locale}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        es: "/es",
        ca: "/ca",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      url,
      title: seo.title,
      description: seo.description,
      siteName: "Konkai Sushi House",
      locale: locale === "en" ? "en_GB" : locale === "es" ? "es_ES" : "ca_ES",
      alternateLocale: locale === "en" ? ["es_ES", "ca_ES"] : ["en_GB", "ca_ES"],
      images: [
        {
          url: heroPhoto.src,
          width: heroPhoto.width,
          height: heroPhoto.height,
          alt: seo.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [heroPhoto.src],
    },
  };
}

/* -------------------------------------------------------------------------- */

const FAQ_LABELS = {
  en: { eyebrow: "Good to know", title: "Before you come" },
  es: { eyebrow: "Bueno saber", title: "Antes de venir" },
  ca: { eyebrow: "Bo saber", title: "Abans de venir" },
} as const;

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = ui[locale];
  const faq = faqJsonLd(locale);
  const faqLabels = FAQ_LABELS[locale];

  // Render the same FAQ answers visibly that the JSON-LD declares
  const faqItems = (
    faq.mainEntity as Array<{ name: string; acceptedAnswer: { text: string } }>
  ).map((item) => ({ q: item.name, a: item.acceptedAnswer.text }));

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output is escaped for a <script> context
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantJsonLd(locale)).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faq).replace(/</g, "\\u003c"),
        }}
      />

      <Navbar locale={locale} t={t.nav} />

      <main id="main">
        <Hero locale={locale} t={t} />
        {/* 01 The restaurant */}
        <RestaurantIntro locale={locale} t={t} />
        {/* 02 From the kitchen */}
        <SignatureDishes locale={locale} t={t} />
        <MenuPreview locale={locale} menuLabels={t.menu} navMenu={t.nav.menu} perDish={t.labels.perDish} ctaReserve={t.hero.ctaReserve} />
        <FoodBreak locale={locale} t={t} />
        {/* 03 The space */}
        <VisitSection locale={locale} t={t} />
        {/* 04 Guests say */}
        <Reviews locale={locale} t={t} />
        <Gallery locale={locale} t={t.gallery} />
        <Location locale={locale} location={t.location} ctaDirections={t.hero.ctaDirections} />
        <ReservationCTA locale={locale} t={t} />

        {/* FAQ — the visible counterpart of the FAQPage structured data */}
        <section
          className="border-t border-line bg-ivory/40 py-16 lg:py-20"
          aria-labelledby="faq-title"
        >
          <div className="container-prose">
            <SectionHeading
              eyebrow={faqLabels.eyebrow}
              title={faqLabels.title}
              id="faq-title"
            />
            <dl className="mt-10 divide-y divide-line">
              {faqItems.map((item, i) => (
                <Reveal key={item.q} delay={i * 60} distance={0.75}>
                  <div className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-6">
                    <dt className="font-display text-[1.15rem] leading-snug text-ink sm:col-span-5">
                      {item.q}
                    </dt>
                    <dd className="text-[0.95rem] leading-[1.75] text-ink-mute sm:col-span-7">
                      {item.a}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <Footer locale={locale} t={t} />
      <StickyActions locale={locale} labels={{ directions: t.hero.ctaDirections, reserve: t.nav.reserve }} />
    </>
  );
}
