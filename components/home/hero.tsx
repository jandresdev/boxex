"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { quickActions } from "@/lib/home-data"

const HeroScene = dynamic(
  () => import("./hero-scene").then((m) => m.HeroScene),
  { ssr: false }
)

export function HeroSection() {
  const [paused, setPaused] = useState(false)

  return (
    <>
      <section className="relative overflow-hidden bg-white pt-10 pb-14 lg:pt-14 lg:pb-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:min-h-[600px] lg:grid-cols-[1.04fr_1fr] lg:gap-4">
          <div className="flex flex-col">
            <span className="mb-7 inline-flex w-fit items-center gap-2 text-[13px] text-brand-blue">
              <span className="size-[7px] rounded-full bg-brand-gold" />
              Desde USA. Hasta los tuyos.
            </span>
            <h1 className="mb-6 text-[46px] font-bold leading-[1.02] tracking-[-0.065em] text-brand-blue sm:text-[64px] lg:text-[72px]">
              Lo que envías,
              <br />
              acerca.
            </h1>
            <p className="mb-7 max-w-[480px] text-[17px] leading-[1.65] text-brand-blue/80">
              Tu familia. Tus compras. Tu próximo negocio.
              <br />
              Conectamos Estados Unidos con 11 destinos de Latinoamérica.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
                <Link href="/cotizar">
                  Cotizar mi envío
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="cursor-pointer border-brand-line text-brand-blue hover:bg-brand-pale"
              >
                <a href="https://clientes.boxexpress.com/">Crear casillero</a>
              </Button>
            </div>
            <div className="mt-9 flex items-center gap-3">
              <div>
                <strong className="block text-[30px] tracking-[-0.05em] text-brand-blue">
                  35+
                </strong>
                <span className="text-[11px] leading-[1.4] text-brand-blue/60">
                  años conectando
                  <br />
                  lo que importa
                </span>
              </div>
              <i className="mx-4 h-8 w-px bg-brand-line" aria-hidden="true" />
              <div>
                <strong className="block text-[30px] tracking-[-0.05em] text-brand-blue">
                  11
                </strong>
                <span className="text-[11px] leading-[1.4] text-brand-blue/60">
                  destinos
                  <br />
                  en Latinoamérica
                </span>
              </div>
            </div>
          </div>

          <div className="relative h-[340px] sm:h-[420px] lg:h-[540px]">
            {/* Soft gold glow behind the globe, matching the original hero-art */}
            <div
              aria-hidden="true"
              className="absolute inset-[12%_0_10%] rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(214,179,106,.25), rgba(214,179,106,0) 70%)",
              }}
            />
            <HeroScene paused={paused} />
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className="absolute bottom-2 right-2 z-10 cursor-pointer rounded-full border border-brand-line bg-white/90 px-3 py-2 text-[11px] font-medium text-brand-blue backdrop-blur transition-colors hover:bg-white"
            >
              {paused ? "Activar animación" : "Pausar animación"}
            </button>
          </div>
        </div>

        <a
          href="#enviar"
          className="mx-auto mt-8 flex w-fit items-center gap-3 px-6 text-[11px] text-brand-blue/60 transition-colors hover:text-brand-blue lg:absolute lg:bottom-6 lg:left-16 lg:mt-0"
        >
          Descubre tu próximo envío <span className="text-base">↓</span>
        </a>
      </section>

      <section
        id="enviar"
        className="mx-auto grid max-w-6xl grid-cols-1 border-y border-brand-line px-6 sm:grid-cols-3 sm:px-0"
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
