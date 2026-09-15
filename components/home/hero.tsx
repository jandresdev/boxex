import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { quickActions } from "@/lib/home-data"
import { HeroCarousel } from "./hero-carousel"

export function HeroSection() {
  return (
    <>
      <section className="relative isolate min-h-[78vh] overflow-hidden lg:min-h-[86vh]">
        <HeroCarousel />

        {/* Scrim so the copy stays readable over any slide */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#04102e]/85 via-[#04102e]/45 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04102e]/70 via-transparent to-transparent"
        />

        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-6 py-16 lg:min-h-[86vh]">
          <div className="flex max-w-xl flex-col">
            <span className="mb-7 inline-flex w-fit items-center gap-2 text-[13px] text-white/85">
              <span className="size-[7px] rounded-full bg-brand-gold" />
              Desde USA. Hasta los tuyos.
            </span>
            <h1 className="mb-6 text-[46px] font-bold leading-[1.02] tracking-[-0.065em] text-white sm:text-[64px] lg:text-[72px]">
              Lo que envías,
              <br />
              <span className="text-brand-gold">acerca.</span>
            </h1>
            <p className="mb-7 max-w-[480px] text-[17px] leading-[1.65] text-white/80">
              Tu familia. Tus compras. Tu próximo negocio.
              <br />
              Conectamos Estados Unidos con 11 destinos de Latinoamérica.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="cursor-pointer bg-brand-gold text-brand-blue hover:bg-brand-gold/90">
                <Link href="/cotizar">
                  Cotizar mi envío
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="cursor-pointer border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              >
                <a href="https://clientes.boxexpress.com/">Crear casillero</a>
              </Button>
            </div>
            <div className="mt-9 flex items-center gap-3">
              <div>
                <strong className="block text-[30px] tracking-[-0.05em] text-white">
                  35+
                </strong>
                <span className="text-[11px] leading-[1.4] text-white/70">
                  años conectando
                  <br />
                  lo que importa
                </span>
              </div>
              <i className="mx-4 h-8 w-px bg-white/25" aria-hidden="true" />
              <div>
                <strong className="block text-[30px] tracking-[-0.05em] text-white">
                  11
                </strong>
                <span className="text-[11px] leading-[1.4] text-white/70">
                  destinos
                  <br />
                  en Latinoamérica
                </span>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#enviar"
          className="absolute bottom-6 left-1/2 z-10 flex w-fit -translate-x-1/2 items-center gap-3 text-[11px] text-white/70 transition-colors hover:text-white lg:left-16 lg:translate-x-0"
        >
          Descubre tu próximo envío <span className="text-base">↓</span>
        </a>
      </section>

      <section
        id="enviar"
        className="mx-auto grid max-w-6xl grid-cols-1 border-b border-brand-line px-6 sm:grid-cols-3 sm:px-0"
      >
        {quickActions.map((action, i) => {
          const Icon = action.icon
          return (
            <Link
              key={action.href}
              href={action.href}
              className={[
                "group flex min-w-0 cursor-pointer items-center gap-4 py-6 transition-colors hover:bg-brand-pale",
                i > 0 ? "sm:border-l sm:border-brand-line sm:pl-6" : "",
                i === 0 ? "sm:pr-6" : "sm:px-6",
                "border-t border-brand-line first:border-t-0 sm:border-t-0",
              ].join(" ")}
            >
              <Icon className="size-5 shrink-0 text-brand-blue" />
              <span className="min-w-0">
                <strong className="block text-[15px] text-brand-blue">
                  {action.title}
                </strong>
                <small className="block text-xs text-brand-blue/60">
                  {action.subtitle}
                </small>
              </span>
              <ArrowRight className="ml-auto size-[18px] shrink-0 text-brand-blue transition-transform group-hover:translate-x-1" />
            </Link>
          )
        })}
      </section>
    </>
  )
}
