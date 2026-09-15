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
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 text-xs font-medium text-brand-blue">
              <span className="size-2 rounded-full bg-brand-gold" />
              Desde USA. Hasta los tuyos.
            </span>
            <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-brand-blue sm:text-6xl">
              Lo que envías,
              <br />
              acerca.
            </h1>
            <p className="max-w-md text-neutral-600">
              Tu familia. Tus compras. Tu próximo negocio.
              <br />
              Conectamos Estados Unidos con 11 destinos de Latinoamérica.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/cotizar">
                  Cotizar mi envío
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href="https://clientes.boxexpress.com/">Crear casillero</a>
              </Button>
            </div>
            <div className="mt-4 flex gap-8">
              <div>
                <strong className="block text-2xl font-bold text-brand-blue">
                  35+
                </strong>
                <span className="text-xs text-neutral-500">
                  años conectando
                  <br />
                  lo que importa
                </span>
              </div>
              <div>
                <strong className="block text-2xl font-bold text-brand-blue">
                  11
                </strong>
                <span className="text-xs text-neutral-500">
                  destinos
                  <br />
                  en Latinoamérica
                </span>
              </div>
            </div>
          </div>

          <div className="relative aspect-square w-full">
            <HeroScene paused={paused} />
            <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-6">
              <div className="relative">
                <Image
                  src="/assets/boxex-characters-hero.png"
                  alt="Personajes Boxex en una escena 3D con una ruta internacional"
                  width={420}
                  height={420}
                  priority
                  className="drop-shadow-xl"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className="pointer-events-auto absolute bottom-2 right-2 rounded-full border border-brand-blue/20 bg-white/90 px-3 py-1.5 text-xs font-medium text-brand-blue shadow-sm backdrop-blur"
            >
              {paused ? "Activar animación" : "Pausar animación"}
            </button>
          </div>
        </div>

        <a
          href="#enviar"
          className="mx-auto mb-10 flex w-fit items-center gap-2 px-6 text-sm text-neutral-500 hover:text-brand-blue"
        >
          Descubre tu próximo envío <span>↓</span>
        </a>
      </section>

      <section id="enviar" className="mx-auto grid max-w-6xl gap-4 px-6 pb-20 sm:grid-cols-3">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.href}
              href={action.href}
              className="group flex items-center gap-3 rounded-xl border border-neutral-200 p-5 transition-colors hover:border-brand-blue"
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
