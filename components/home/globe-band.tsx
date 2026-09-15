"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Reveal } from "./reveal"

const HeroScene = dynamic(
  () => import("./hero-scene").then((m) => m.HeroScene),
  { ssr: false }
)

/** The rotating globe, now its own compact band right under the hero. */
export function GlobeBandSection() {
  const [paused, setPaused] = useState(false)

  return (
    <section className="relative overflow-hidden border-b border-brand-line bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-6 px-6 py-10 lg:grid-cols-[1fr_1.1fr] lg:py-6">
        <Reveal className="order-2 lg:order-1">
          <span className="mb-3 block text-[13px] font-medium text-brand-blue">
            Un solo mundo, más cerca
          </span>
          <h2 className="text-[26px] font-bold tracking-[-0.03em] text-brand-blue lg:text-[32px]">
            Conectamos cada punto,
            <br />
            de un lado al otro.
          </h2>
        </Reveal>
        <div className="relative order-1 h-[220px] sm:h-[280px] lg:order-2 lg:h-[300px]">
          <div
            aria-hidden="true"
            className="absolute inset-[10%] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(214,179,106,.2), rgba(214,179,106,0) 70%)",
            }}
          />
          <HeroScene paused={paused} />
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="absolute bottom-1 right-1 z-10 cursor-pointer rounded-full border border-brand-line bg-white/90 px-3 py-1.5 text-[11px] font-medium text-brand-blue backdrop-blur transition-colors hover:bg-white"
          >
            {paused ? "Activar animación" : "Pausar animación"}
          </button>
        </div>
      </div>
    </section>
  )
}
