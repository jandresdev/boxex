"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

/**
 * "brand" slides sit behind the hero copy (scrims + headline + CTAs).
 * "promo" slides are finished campaign artwork that already carries its own
 * text, so the copy and scrims fade out and the banner is shown whole
 * (contained, over a blurred copy of itself) and links to its destination.
 */
type BrandSlide = {
  id: string
  kind: "brand"
  type: "image" | "video"
  src: string
  poster?: string
  alt?: string
  duration: number
}

type PromoSlide = {
  id: string
  kind: "promo"
  src: string
  alt: string
  href: string
  label: string
  duration: number
}

type HeroSlide = BrandSlide | PromoSlide

const otono = (city: string, slug: string, prices: [string, string, string]): PromoSlide => ({
  id: `otono-${slug}`,
  kind: "promo",
  src: `/promos/otono-${slug}.webp`,
  alt: `Promoción de otoño Boxex: envíos por paquetería aérea desde ${city} hacia Colombia, más seguro. 30 libras USD ${prices[0]}, 40 libras USD ${prices[1]}, 50 libras USD ${prices[2]}. Aplican cargos y condiciones.`,
  href: "/cotizar?destino=colombia",
  label: `Cotizar promoción desde ${city}`,
  duration: 6000,
})

// Para agregar una promoción: guarda el banner (16:9) en /public/promos y
// añade una entrada aquí. El orden de la lista es el orden del carrusel.
const slides: HeroSlide[] = [
  {
    id: "video-personajes-mundo",
    kind: "brand",
    type: "video",
    src: "/assets/hero-video.mp4",
    poster: "/assets/boxex-characters-hero.png",
    duration: 9000,
  },
  otono("New York", "new-york", ["48", "64", "80"]),
  otono("New Jersey", "new-jersey", ["48", "64", "80"]),
  otono("Boston", "boston", ["48", "64", "80"]),
  otono("Miami", "miami", ["45", "60", "75"]),
]

function HeroVideoSlide({
  slide,
  active,
}: {
  slide: BrandSlide
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

function PromoSlideView({ slide, active }: { slide: PromoSlide; active: boolean }) {
  return (
    <>
      {/* Blurred fill so a 16:9 banner never leaves empty bars on any viewport */}
      <Image
        src={slide.src}
        alt=""
        fill
        sizes="40vw"
        className="scale-110 object-cover blur-2xl brightness-90"
      />
      <Link
        href={slide.href}
        aria-label={slide.label}
        tabIndex={active ? 0 : -1}
        className="absolute inset-0 flex items-center justify-center"
        data-no-hop
      >
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="100vw"
          className="object-contain"
        />
      </Link>
    </>
  )
}

/**
 * Full-bleed hero carousel: the brand video first, then campaign banners.
 * Each slide has its own duration; rotation pauses while the controls are
 * hovered or anything inside has keyboard focus, and is off entirely under
 * prefers-reduced-motion. Banner images are only mounted once their turn is
 * near, so the first paint loads just the video poster.
 */
export function HeroCarousel({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0)
  const [reach, setReach] = useState(1)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((i: number) => {
    const next = ((i % slides.length) + slides.length) % slides.length
    setIndex(next)
    setReach((r) => Math.max(r, next + 1))
  }, [])

  useEffect(() => {
    if (slides.length <= 1 || paused) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setTimeout(() => goTo(index + 1), slides[index].duration)
    return () => window.clearTimeout(timer)
  }, [index, paused, goTo])

  const showCopy = slides[index].kind === "brand"

  return (
    <div
      // Keyboard focus pauses rotation; a mouse click on a dot does not.
      onFocus={(e) => setPaused(e.target.matches(":focus-visible"))}
      onBlur={() => setPaused(false)}
    >
      <div className="absolute inset-0" aria-roledescription="carrusel" aria-label="Destacados Boxex">
        {slides.map((slide, i) => {
          const active = i === index
          const mounted = slide.kind === "brand" || i <= reach
          return (
            <div
              key={slide.id}
              aria-hidden={!active}
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${slides.length}`}
              className={`absolute inset-0 overflow-hidden bg-[#04102e] transition-opacity duration-700 ease-out ${
                active ? "z-[1] opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {mounted &&
                (slide.kind === "promo" ? (
                  <PromoSlideView slide={slide} active={active} />
                ) : slide.type === "video" ? (
                  <HeroVideoSlide slide={slide} active={active} />
                ) : (
                  <Image
                    src={slide.src}
                    alt={slide.alt ?? ""}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                ))}
            </div>
          )
        })}
      </div>

      {/* Scrims + copy belong to brand slides only */}
      <div
        className={`transition-opacity duration-500 ease-out ${
          showCopy ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#04102e]/85 via-[#04102e]/45 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#04102e]/70 via-transparent to-transparent"
        />
        <div className="relative z-[3]">{children}</div>
      </div>

      {slides.length > 1 && (
        <div
          className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#04102e]/45 px-3 py-2 backdrop-blur-sm"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Diapositiva anterior"
            className="grid size-7 cursor-pointer place-items-center rounded-full text-white/80 hover:bg-white/15 hover:text-white"
          >
            <ChevronLeft className="size-4" />
          </button>
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a la diapositiva ${i + 1} de ${slides.length}`}
              aria-current={i === index}
              className="size-2.5 cursor-pointer rounded-full bg-white/50 transition-all hover:bg-white/80 aria-[current=true]:w-6 aria-[current=true]:bg-brand-gold"
            />
          ))}
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Diapositiva siguiente"
            className="grid size-7 cursor-pointer place-items-center rounded-full text-white/80 hover:bg-white/15 hover:text-white"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  )
}
