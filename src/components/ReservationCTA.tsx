import { links, phone, type Locale } from "@/data/restaurant";
import type { Ui } from "@/data/ui";
import { Reveal } from "./Reveal";
import { ButtonLink } from "./Button";
import { ArrowUpRight, Phone } from "./Icons";

/**
 * Reservations run through the platforms the restaurant already uses.
 * No booking form is invented here — both buttons go to a real provider,
 * and the phone number is the restaurant's own.
 */
export function ReservationCTA({ locale, t }: { locale: Locale; t: Ui }) {
  return (
    <section id="reserve" className="section bg-paper" aria-labelledby="reserve-title">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden border border-line bg-ivory/60">
            {/* A single restrained accent: a vertical rule in the deep red */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-transparent via-accent/55 to-transparent sm:block"
            />

            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:gap-14 lg:p-16">
              <div className="lg:col-span-6">
                <p className="eyebrow">{t.reserve.eyebrow}</p>
                <h2
                  id="reserve-title"
                  className="mt-5 text-[clamp(1.95rem,4.4vw,3.1rem)] leading-[1.06] text-ink"
                >
                  {t.reserve.title}
                </h2>
                <p className="mt-5 max-w-lg text-[1rem] leading-[1.75] text-ink-mute">
                  {t.reserve.blurb}
                </p>
                <p className="mt-5 max-w-lg text-[0.82rem] leading-relaxed text-ink-faint">
                  {t.reserve.note}
                </p>
              </div>

              <div className="lg:col-span-5 lg:col-start-8 lg:self-center">
                <div className="flex flex-col gap-3">
                  <ButtonLink href={links.reserveTheFork.value} variant="solid" size="lg">
                    {t.reserve.thefork}
                    <ArrowUpRight className="h-4 w-4" />
                  </ButtonLink>

                  <ButtonLink href={links.reserveOpenTable.value} variant="outline" size="lg">
                    {t.reserve.opentable}
                    <ArrowUpRight className="h-4 w-4" />
                  </ButtonLink>

                  <div className="mt-3 border-t border-line pt-5">
                    <p className="text-[0.78rem] font-medium tracking-[0.16em] text-ink-faint uppercase">
                      {t.reserve.byPhone}
                    </p>
                    <a
                      href={`tel:${phone.e164}`}
                      className="link-wipe mt-2.5 inline-flex min-h-12 items-center gap-2.5 text-[1.05rem] text-ink"
                    >
                      <Phone className="h-4 w-4 text-wood-dark" aria-hidden="true" />
                      {phone.display}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Takeaway and delivery — verified on the restaurant's Uber Eats store */}
        <Reveal delay={120}>
          <div className="mt-6 flex flex-col gap-4 border border-line-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <p className="text-[0.78rem] font-medium tracking-[0.16em] text-ink-faint uppercase">
                {locale === "en" ? "Takeaway & delivery" : locale === "es" ? "Para llevar y a domicilio" : "Per demanar i a domicili"}
              </p>
              <p className="mt-2 text-[0.9rem] text-ink-mute">
                {locale === "en"
                  ? "Order for collection or delivery through the restaurant's own Uber Eats store."
                  : locale === "es"
                    ? "Pide para recoger o a domicilio a través de la tienda Uber Eats del restaurante."
                    : "Demana per recollir o a domicili a través de la botiga Uber Eats del restaurant."}
              </p>
            </div>
            <ButtonLink href={links.orderUberEats.value} variant="outline" size="md" className="shrink-0">
              Uber Eats
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
