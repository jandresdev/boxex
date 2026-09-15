"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

export interface HeroSlide {
  id: string
  type: "image" | "video"
  src: string
  alt?: string
  poster?: string
}

const slides: HeroSlide[] = [
  {
    id: "video-personajes-mundo",
    type: "video",
    src: "/assets/hero-video.mp4",
    poster: "/assets/boxex-characters-hero.png",
  },
  // Más slides se agregan aquí — el carrusel ya soporta varios, de imagen o video.
]

function HeroVideoSlide({
  slide,
  active,
}: {
  slide: HeroSlide
  active: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reduced] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  useEffect(() => {
    const el = videoRef.current
    if (!el || reduced) return

    if (active) {
      el.play().catch(() => {
        // Autoplay can be blocked before the user has interacted with the
        // page; the poster frame stays visible in that case, no error UI.
      })
    } else {
      el.pause()
    }
  }, [active, reduced])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (!active || reduced) return
        if (entries[0].isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [active, reduced])

  if (reduced) {
    return (
      <Image
        src={slide.poster ?? slide.src}
        alt="Boxex — envíos desde Estados Unidos a Latinoamérica"
        fill
        sizes="100vw"
        className="object-cover"
      />
    )
  }

  return (
    <video
      ref={videoRef}
      src={slide.src}
      poster={slide.poster}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      className="absolute inset-0 size-full object-cover"
    />
  )
}

/**
 * Full-bleed hero carousel — image or video slides. One slide today,
 * built to take more: autoplay/rotation pauses on hover/focus and
 * respects prefers-reduced-motion, dot controls are real buttons with
 * aria-current, arrows only render when there's more than one slide.
 * Video slides only play while active, in view, and motion isn't
 * reduced.
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
          {slide.type === "video" ? (
            <HeroVideoSlide slide={slide} active={i === index} />
          ) : (
            <Image
              src={slide.src}
              alt={slide.alt ?? ""}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          )}
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
