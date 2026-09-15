"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

export interface HeroSlide {
  id: string
  src: string
  alt: string
}

const slides: HeroSlide[] = [
  {
    id: "personajes-mundo",
    src: "/assets/boxex-characters-hero.png",
    alt: "Personajes Boxex frente a un globo terráqueo digital con la bandera de Colombia, representando la conexión entre Estados Unidos y Latinoamérica",
  },
  // Más slides se agregan aquí — el carrusel ya soporta varios.
]

/**
 * Full-bleed hero image carousel. One slide today, built to take more:
 * autoplay pauses on hover/focus and respects prefers-reduced-motion,
 * dot controls are real buttons with aria-current, arrows only render
 * when there's more than one slide.
 */
export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<number | null>(null)

  const goTo = useCallback((i: number) => {
    setIndex(((i % slides.length) + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (slides.length <= 1) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced || paused) return
    timerRef.current = window.setInterval(() => goTo(index + 1), 6000)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [index, paused, goTo])

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== index}
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {slides.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a la imagen ${i + 1} de ${slides.length}`}
              aria-current={i === index}
              className="size-2.5 cursor-pointer rounded-full bg-white/50 transition-all hover:bg-white/80 aria-[current=true]:w-6 aria-[current=true]:bg-white"
            />
          ))}
        </div>
      )}
    </div>
  )
}
