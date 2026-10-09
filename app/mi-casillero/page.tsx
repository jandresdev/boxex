import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Check, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageIntro } from "@/components/layout/page-intro"
import { Reveal } from "@/components/home/reveal"
import {
  CASILLERO_LOGIN_URL,
  CASILLERO_REGISTER_URL,
  WHATSAPP_URL,
  casilleroBenefits,
  casilleroFaqs,
  casilleroRates,
  casilleroSteps,
} from "@/lib/home-data"

export const metadata: Metadata = {
  title: "Casillero virtual en Miami | Boxex",
  description:
    "Compra en Estados Unidos y recibe en Colombia con tu casillero virtual Boxex: dirección gratuita en Miami, IDBOX personal, consolidación y seguimiento.",
}

const external = { target: "_blank", rel: "noopener noreferrer" } as const

export default function MiCasilleroPage() {
  return (
    <>
      <PageIntro
        kicker="Mi casillero"
        title="Compra en Estados Unidos. Recibe en Colombia."
        description="Tu casillero virtual Boxex conecta tus compras con Colombia de forma fácil, segura y acompañada de principio a fin."
        image="/heroes/mi-casillero.webp"
        actions={[
          { label: "Crear casillero gratis", href: CASILLERO_REGISTER_URL },
          { label: "Entrar a mi casillero", href: CASILLERO_LOGIN_URL },
        ]}
        highlights={["Registro gratuito", "IDBOX personal", "Asesoría directa"]}
      />

      {/* Accesos rápidos */}
      <section className="mx-auto -mt-6 max-w-6xl px-6">
        <div className="grid divide-y divide-brand-line rounded-2xl border border-brand-line bg-white shadow-[0_12px_35px_rgba(1,22,137,0.08)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { kicker: "¿Ya tienes un envío?", title: "Consulta dónde está tu paquete", label: "Rastrear guía", href: "/rastreo" },
            { kicker: "¿Necesitas ayuda?", title: "Habla con un asesor Boxex", label: "Ir a WhatsApp", href: WHATSAPP_URL },
            { kicker: "¿Ya tienes casillero?", title: "Gestiona tus compras", label: "Entrar", href: CASILLERO_LOGIN_URL },
          ].map((item) => {
            const isExternal = item.href.startsWith("http")
            const Comp = isExternal ? "a" : Link
            return (
              <div key={item.kicker} className="flex items-center justify-between gap-4 p-6">
                <div>
                  <small className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-blue/50">
                    {item.kicker}
                  </small>
                  <strong className="mt-1 block text-[15px] text-brand-blue">{item.title}</strong>
                </div>
                <Comp
                  href={item.href}
                  {...(isExternal ? external : {})}
                  className="inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-brand-blue hover:underline"
                >
                  {item.label}
                  <ArrowUpRight className="size-4" />
                </Comp>
              </div>
            )
          })}
        </div>
      </section>

      {/* Beneficios */}
      <section id="beneficios" className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
              Casillero virtual
            </span>
            <h2 className="mb-5 mt-3 text-[34px] font-bold leading-[1.05] tracking-[-0.045em] text-brand-blue lg:text-[48px]">
              Tu puerta de entrada a miles de tiendas.
            </h2>
            <p className="mb-10 max-w-[520px] text-[16px] leading-[1.75] text-brand-blue/70">
              Recibe una dirección física en Miami para comprar en tiendas de
              Estados Unidos. Cuando tus paquetes lleguen, Boxex los procesa y
              los lleva hasta Colombia.
            </p>
            <div className="grid gap-x-8 gap-y-7 border-t border-brand-line pt-8 sm:grid-cols-2">
              {casilleroBenefits.map((b, i) => (
                <article key={b.title}>
                  <span className="text-[11px] font-bold text-brand-gold">0{i + 1}</span>
                  <h3 className="mb-2 mt-2 text-[17px] font-semibold text-brand-blue">{b.title}</h3>
                  <p className="text-sm leading-[1.7] text-brand-blue/70">{b.text}</p>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="relative mx-auto w-full max-w-md pt-8">
            <div className="absolute -left-4 right-6 top-0 z-10 flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-[0_15px_40px_rgba(0,20,51,0.18)] sm:-left-8">
              <div>
                <small className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-blue/50">
                  Origen
                </small>
                <b className="text-brand-blue">Miami, FL</b>
              </div>
              <span className="flex items-center gap-2 text-brand-gold">
                <Plane className="size-4" />
                <i className="h-px w-16 bg-brand-gold/60" />
              </span>
              <div className="text-right">
                <small className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-blue/50">
                  Destino
                </small>
                <b className="text-brand-blue">Colombia</b>
              </div>
            </div>
            <Image
              src="/casillero/casillero-virtual.webp"
              alt="Casillero virtual Boxex: dirección gratuita en Miami, compras en miles de tiendas, seguimiento y consolidación"
              width={900}
              height={1125}
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="h-auto w-full rounded-2xl shadow-[0_30px_70px_rgba(4,16,46,0.35)]"
            />
          </Reveal>
        </div>
      </section>

      {/* Paso a paso */}
      <section id="como" className="bg-[#04102e] text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <Reveal className="mb-14 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
              Paso a paso
            </span>
            <h2 className="mb-3 mt-3 text-[34px] font-bold tracking-[-0.045em] lg:text-[48px]">
              De tu carrito a tu puerta.
            </h2>
            <p className="text-white/65">Ocho pasos claros. Cero enredos internacionales.</p>
          </Reveal>
          <ol className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {casilleroSteps.map((step, i) => (
              <li key={step.title} className="group bg-[#08245a] p-6 transition-colors hover:bg-[#0b2d6e]">
                <div className="relative mb-5 h-36 w-full">
                  <Image
                    src={step.image}
                    alt={`Paso ${i + 1}: ${step.title}`}
                    fill
                    sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 90vw"
                    className="object-contain transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03]"
                  />
                </div>
                <span className="text-[11px] font-bold text-brand-gold">0{i + 1}</span>
                <h3 className="mb-2 mt-4 text-[15px] font-bold uppercase tracking-wide">{step.title}</h3>
                <p className="text-[13px] leading-[1.65] text-white/65">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Button asChild className="cursor-pointer bg-brand-gold text-brand-blue hover:bg-brand-gold/90">
              <a href={CASILLERO_REGISTER_URL} {...external}>
                Quiero empezar ahora
                <ArrowRight />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Tarifas */}
      <section id="tarifas" className="bg-brand-pale/50">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
          <Reveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
              Tarifas web – Colombia
            </span>
            <h2 className="mb-4 mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] text-brand-blue lg:text-[44px]">
              Elige la modalidad que se ajusta a tu compra.
            </h2>
            <p className="text-[15px] leading-[1.75] text-brand-blue/70">
              Alternativas para paquetes pequeños, una Web Box de 5 libras y
              envíos regulares de hasta 110 libras.
            </p>
            <p className="my-6 border-l-[3px] border-brand-gold bg-white p-4 text-xs leading-[1.6] text-brand-blue/70">
              <b className="text-brand-blue">Importante:</b> las tarifas pueden
              cambiar sin previo aviso. Confirma el valor vigente con un asesor.
            </p>
            <a
              href={WHATSAPP_URL}
              {...external}
              className="inline-flex items-center gap-1 text-[13px] font-bold text-brand-blue hover:underline"
            >
              Consultar tarifa vigente <ArrowRight className="size-4" />
            </a>
          </Reveal>

          <Reveal delay={100} className="grid gap-4 sm:grid-cols-3">
            <article className="flex flex-col rounded-2xl border border-brand-line bg-white p-6 shadow-[0_15px_35px_rgba(12,36,68,0.05)]">
              <small className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-blue/50">
                Paquetes de 1 a 4 libras
              </small>
              <h3 className="mb-4 mt-6 text-[22px] font-bold text-brand-blue">Box Libra a Libra</h3>
              <div className="grid gap-2">
                {casilleroRates.libraALibra.map((r) => (
                  <div key={r.weight} className="flex items-center justify-between rounded-lg bg-brand-pale px-3 py-2 text-[13px] font-semibold text-brand-blue">
                    <span className="rounded-md bg-brand-blue px-2 py-1 text-white">{r.weight}</span>
                    {r.price}
                  </div>
                ))}
              </div>
            </article>

            <article className="flex flex-col rounded-2xl bg-brand-blue p-6 text-white shadow-[0_25px_50px_rgba(1,22,137,0.25)] sm:-translate-y-3">
              <small className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/60">
                Opción destacada
              </small>
              <h3 className="mb-3 mt-6 text-[22px] font-bold">Web Box</h3>
              <p className="text-[13px] text-white/70">Tarifa para un paquete de</p>
              <b className="mb-2 mt-4 text-[30px] leading-none text-brand-gold">
                {casilleroRates.webBox.weight}
              </b>
              <b className="mt-auto pt-6 text-lg">{casilleroRates.webBox.price}</b>
            </article>

            <article className="flex flex-col rounded-2xl border border-brand-line bg-white p-6 shadow-[0_15px_35px_rgba(12,36,68,0.05)]">
              <small className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-blue/50">
                Paquetes de 6 a 110 libras
              </small>
              <h3 className="mb-3 mt-6 text-[22px] font-bold text-brand-blue">Regular</h3>
              <b className="mt-4 whitespace-nowrap text-[26px] leading-none text-brand-blue xl:text-[30px]">
                {casilleroRates.regular.pricePerLb}{" "}
                <small className="text-sm font-semibold text-brand-blue/60">× lb</small>
              </b>
              <ul className="mt-5 grid gap-2 text-xs leading-[1.55] text-brand-blue/70">
                {[casilleroRates.regular.minimum, "Aplican otros costos asociados al envío"].map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check className="size-4 shrink-0 text-brand-gold" />
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Seguimiento */}
      <section className="bg-brand-pale/50 px-6 pb-20 lg:pb-28">
        <Reveal className="mx-auto flex max-w-6xl flex-col gap-8 rounded-2xl bg-gradient-to-r from-[#07245a] to-[#0a4ea7] p-10 text-white sm:flex-row sm:items-center sm:justify-between lg:p-14">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Seguimiento</span>
            <h2 className="mb-2 mt-3 text-[28px] font-bold tracking-[-0.04em] lg:text-[38px]">
              Tu envío siempre a la vista.
            </h2>
            <p className="text-white/70">Consulta el estado de tu guía y sigue el recorrido de tu paquete.</p>
          </div>
          <Button asChild className="cursor-pointer bg-brand-gold text-brand-blue hover:bg-brand-gold/90">
            <Link href="/rastreo">
              Rastrear mi envío
              <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </section>

      {/* Preguntas frecuentes */}
      <section id="preguntas" className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:py-28">
        <Reveal>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
            Preguntas frecuentes
          </span>
          <h2 className="mb-4 mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] text-brand-blue lg:text-[44px]">
            Todo claro antes de comprar.
          </h2>
          <p className="mb-5 text-[15px] leading-[1.75] text-brand-blue/70">
            Y si algo sigue dando vueltas, un asesor te ayuda por WhatsApp.
          </p>
          <a
            href={WHATSAPP_URL}
            {...external}
            className="inline-flex items-center gap-1 text-[13px] font-bold text-brand-blue hover:underline"
          >
            Hablar con un asesor <ArrowRight className="size-4" />
          </a>
        </Reveal>
        <div className="flex flex-col divide-y divide-brand-line border-y border-brand-line">
          {casilleroFaqs.map((item) => (
            <details key={item.q} className="group cursor-pointer py-[22px]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[16px] font-semibold text-brand-blue marker:content-none">
                {item.q}
                <span className="shrink-0 text-[23px] font-normal text-brand-gold transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2 pr-8 text-[15px] leading-[1.7] text-brand-blue/70">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="px-6 pb-20 lg:pb-28">
        <Reveal className="mx-auto grid max-w-6xl items-center gap-8 rounded-2xl bg-brand-gold p-10 text-brand-blue lg:grid-cols-[1.2fr_0.8fr] lg:p-14">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Empieza hoy</span>
            <h2 className="mb-3 mt-3 text-[30px] font-bold leading-[1.08] tracking-[-0.045em] lg:text-[42px]">
              Estados Unidos está a un casillero de distancia.
            </h2>
            <p className="text-brand-blue/75">Crea tu cuenta gratis y recibe tu dirección personal en Miami.</p>
          </div>
          <div className="lg:text-right">
            <Button asChild size="lg" className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
              <a href={CASILLERO_REGISTER_URL} {...external}>
                Crear mi casillero gratis
                <ArrowRight />
              </a>
            </Button>
            <small className="mt-3 block text-[11px] text-brand-blue/70">
              Registro gratuito en la plataforma Boxex.
            </small>
          </div>
        </Reveal>
      </section>
    </>
  )
}
