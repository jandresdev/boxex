"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
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
      <section className="relative isolate min-h-[92vh] overflow-hidden bg-[#04102e] text-white lg:min-h-screen">
        {/* Full-bleed rotating globe background */}
        <HeroScene paused={paused} />

        {/* Vignette so text and characters stay readable over the globe */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#04102e] via-[#04102e]/70 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04102e] via-transparent to-[#04102e]/40"
        />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pt-16 pb-0 lg:grid-cols-2 lg:items-center lg:pt-24">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 text-xs font-medium text-white/80">
              <span className="size-2 rounded-full bg-brand-gold" />
              Desde USA. Hasta los tuyos.
            </span>
            <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl">
              Lo que envías,
              <br />
              <span className="text-brand-gold">acerca.</span>
            </h1>
            <p className="max-w-md text-white/70">
              Tu familia. Tus compras. Tu próximo negocio.
              <br />
              Conectamos Estados Unidos con 11 destinos de Latinoamérica.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="cursor-pointer bg-brand-gold text-brand-blue hover:bg-brand-gold/90"
              >
                <Link href="/cotizar">
                  Cotizar mi envío
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="cursor-pointer border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white"
              >
                <a href="https://clientes.boxexpress.com/">Crear casillero</a>
              </Button>
            </div>
            <div className="mt-4 flex gap-8">
              <div>
                <strong className="block text-2xl font-bold text-white">
                  35+
                </strong>
                <span className="text-xs text-white/60">
                  años conectando
                  <br />
                  lo que importa
                </span>
              </div>
              <div>
                <strong className="block text-2xl font-bold text-white">
                  11
                </strong>
                <span className="text-xs text-white/60">
                  destinos
                  <br />
                  en Latinoamérica
                </span>
              </div>
            </div>
          </div>

          {/* Empty column on large screens: the globe (full-bleed background)
              shows through here, characters sit on top via absolute layer below */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>

        {/* Characters float large over the globe, anchored to the bottom */}
        <div className="pointer-events-none relative mx-auto flex max-w-6xl justify-center px-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:justify-end lg:pr-10">
          <Image
            src="/assets/boxex-characters-hero.png"
            alt="Personajes Boxex frente a un globo terráqueo digital, representando la conexión entre Estados Unidos y Latinoamérica"
            width={900}
            height={900}
            priority
            className="h-auto w-[85%] max-w-xl drop-shadow-2xl sm:w-[70%] lg:w-[42vw] lg:max-w-2xl"
          />
        </div>

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="absolute bottom-4 right-4 z-10 cursor-pointer rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
        >
          {paused ? "Activar animación" : "Pausar animación"}
        </button>

        <a
          href="#enviar"
          className="relative z-10 mx-auto mb-8 flex w-fit items-center gap-2 px-6 pt-10 text-sm text-white/60 transition-colors hover:text-white lg:absolute lg:bottom-6 lg:left-1/2 lg:mb-0 lg:-translate-x-1/2 lg:pt-0"
        >
          Descubre tu próximo envío <span>↓</span>
        </a>
      </section>

      <section id="enviar" className="mx-auto grid max-w-6xl gap-4 px-6 py-14 sm:grid-cols-3">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.href}
              href={action.href}
              className="group flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue hover:shadow-md"
            >
              <Icon className="size-5 shrink-0 text-brand-blue" />
              <span>
                <strong className="block text-sm text-brand-blue">
                  {action.title}
                </strong>
                <small className="text-neutral-500">{action.subtitle}</small>
              </span>
            </Link>
          )
        })}
      </section>
    </>
  )
}
