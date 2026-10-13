import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageIntro } from "@/components/layout/page-intro"
import { Reveal } from "@/components/home/reveal"
import { FinalCtaSection } from "@/components/home/final-cta"
import { PickupForm } from "@/components/recogida/pickup-form"
import { countries, slugify } from "@/lib/home-data"
import { countryFlagUrl } from "@/lib/country-flags"
import {
  PICKUP_PHONE,
  PICKUP_PHONE_LABEL,
  PICKUP_WHATSAPP_URL,
  pickupModes,
  pickupSteps,
  pickupZones,
} from "@/lib/pickup-data"

export const metadata: Metadata = {
  title: "Recogida en casa: solicita tu recogida en Estados Unidos | Boxex",
  description:
    "Recogemos tu paquete en New York, New Jersey, Boston, Miami y Texas (otros estados por UPS) y lo enviamos de forma segura a 11 países de Latinoamérica.",
}

const stepIcons = [PackageCheck, CheckCircle2, Truck, MapPin] as const

export default function RecogidaEnCasaPage() {
  const destinations = Object.keys(countries)

  return (
    <>
      <PageIntro
        kicker="Recogida en casa"
        title="No salgas de casa. Nosotros recogemos."
        description="Recogemos tu paquete en Estados Unidos y lo enviamos de forma segura a 11 países de Latinoamérica."
        image="/heroes/recogida.webp"
        actions={[
          { label: "Solicitar mi recogida", href: "#formulario" },
          { label: "Ver países de destino", href: "#paises" },
        ]}
        highlights={["Cobertura en 5 zonas", "UPS en otros estados", "Asesor personal"]}
        flush
      />

      {/* Cobertura */}
      <section aria-label="Zonas de recogida" className="bg-[#04102e]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="flex items-center gap-2 text-sm font-semibold text-white">
            <MapPin className="size-4 text-brand-gold" />
            Recogidas disponibles en
          </p>
          <ul className="flex flex-wrap gap-2">
            {pickupZones.map((zone) => (
              <li
                key={zone}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[13px] font-medium text-white"
              >
                {zone}
              </li>
            ))}
            <li className="rounded-full border border-brand-gold/50 bg-brand-gold/15 px-4 py-1.5 text-[13px] font-medium text-brand-gold">
              Otros estados: por UPS
            </li>
          </ul>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <Reveal className="mb-12 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
            Así de simple
          </span>
          <h2 className="mb-3 mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] text-brand-blue lg:text-[46px]">
            Del timbre de tu puerta a la puerta de tu familia.
          </h2>
          <p className="text-[15px] leading-[1.75] text-brand-blue/70">
            Cuatro pasos para que tu paquete salga de tu casa sin que tengas
            que moverte.
          </p>
        </Reveal>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pickupSteps.map((step, i) => {
            const Icon = stepIcons[i]
            return (
              <Reveal key={step.title} delay={i * 80}>
                <li className="group h-full rounded-2xl border border-brand-line bg-white p-6 shadow-[0_15px_40px_rgba(1,22,137,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(1,22,137,0.12)]">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-xl bg-brand-soft-gold text-brand-blue">
                      <Icon className="size-6" />
                    </span>
                    <span className="text-[44px] font-bold leading-none tracking-[-0.05em] text-brand-blue/10">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-brand-blue">{step.title}</h3>
                  <p className="text-sm leading-[1.7] text-brand-blue/70">{step.text}</p>
                </li>
              </Reveal>
            )
          })}
        </ol>
      </section>

      {/* Modalidades */}
      <section className="bg-brand-pale/60">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <Reveal className="mb-12 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
              Dos formas de recoger
            </span>
            <h2 className="mb-3 mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] text-brand-blue lg:text-[46px]">
              Llegamos hasta donde estés.
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {pickupModes.map((mode, i) => (
              <Reveal key={mode.name} delay={i * 100}>
                <article
                  className={`h-full rounded-3xl p-8 sm:p-10 ${
                    i === 0
                      ? "bg-brand-blue text-white"
                      : "border border-brand-line bg-white text-brand-blue"
                  }`}
                >
                  <span
                    className={`mb-4 inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${
                      i === 0 ? "bg-brand-gold text-brand-blue" : "bg-brand-soft-gold text-brand-blue"
                    }`}
                  >
                    {mode.badge}
                  </span>
                  <h3 className="mb-3 text-[28px] font-bold tracking-[-0.04em]">{mode.name}</h3>
                  <p className={`mb-6 text-[15px] leading-[1.7] ${i === 0 ? "text-white/75" : "text-brand-blue/70"}`}>
                    {mode.text}
                  </p>
                  <ul className="grid gap-3">
                    {mode.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-[1.6]">
                        <CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${i === 0 ? "text-brand-gold" : "text-brand-blue"}`} />
                        <span className={i === 0 ? "text-white/90" : "text-brand-blue/80"}>{p}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Países */}
      <section id="paises" className="mx-auto max-w-6xl scroll-mt-32 px-6 py-20 lg:py-28">
        <Reveal className="mb-12 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
            Enviamos a 11 países de Latinoamérica
          </span>
          <h2 className="mb-3 mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] text-brand-blue lg:text-[46px]">
            BOXEX conecta tus paquetes con tu familia.
          </h2>
        </Reveal>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {destinations.map((country, i) => {
            const flag = countryFlagUrl(country, 320)
            return (
              <Reveal key={country} delay={(i % 4) * 60}>
                <li>
                  <Link
                    href={`/destinos/${slugify(country)}`}
                    className="group flex items-center gap-3 rounded-2xl border border-brand-line bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-[0_15px_35px_rgba(1,22,137,0.1)]"
                  >
                    {flag && (
                      <Image
                        src={flag}
                        alt=""
                        width={44}
                        height={30}
                        className="h-[30px] w-11 rounded-md object-cover shadow-sm"
                      />
                    )}
                    <span className="text-sm font-semibold text-brand-blue">{country}</span>
                    <ArrowRight className="ml-auto size-4 text-brand-blue/40 transition-transform group-hover:translate-x-1 group-hover:text-brand-blue" />
                  </Link>
                </li>
              </Reveal>
            )
          })}
        </ul>
      </section>

      {/* Formulario */}
      <section id="formulario" className="scroll-mt-28 bg-[#04102e]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-28">
          <Reveal className="text-white lg:sticky lg:top-40 lg:self-start">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
              Solicita tu recogida
            </span>
            <h2 className="mb-4 mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] lg:text-[44px]">
              Déjanos tus datos y un asesor te contacta.
            </h2>
            <p className="mb-8 text-[15px] leading-[1.75] text-white/70">
              Un asesor de BOXEX se comunicará contigo para confirmar
              cobertura, condiciones y ayudarte a agendar la recogida.
            </p>
            <div className="grid gap-3">
              <Button
                asChild
                variant="outline"
                className="w-fit cursor-pointer border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <a href={PICKUP_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle />
                  WhatsApp: cotiza tu recogida
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-fit cursor-pointer border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <a href={`tel:${PICKUP_PHONE}`}>
                  <Phone />
                  Llama al {PICKUP_PHONE_LABEL}
                </a>
              </Button>
            </div>
          </Reveal>
          <PickupForm />
        </div>
      </section>

      <FinalCtaSection />
    </>
  )
}
