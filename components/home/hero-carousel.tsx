"use client"

import Image from "next/image"
import Link from "next/link"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  fallbackSlide,
  heroSlides,
  type BrandSlide,
  type CampaignAction,
  type CampaignSlide,
  type PromoSlide,
} from "@/lib/hero-slides"

// Today's local date (YYYY-MM-DD) on the client, "" on the server. Reading it
// through useSyncExternalStore keeps hydration consistent: the server renders
// every slide and the client drops the expired ones right after hydrating.
const subscribeNoop = () => () => {}
const getToday = () => new Date().toLocaleDateString("en-CA")
const getServerToday = () => ""

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

function PromoSlideView({ slide }: { slide: PromoSlide }) {
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

function CampaignButton({
  action,
  primary,
}: {
  action: CampaignAction
  primary: boolean
}) {
  const external = action.href.startsWith("http")
  const content = (
    <>
      {action.label}
      {primary && <ArrowRight />}
    </>
  )
  return (
    <Button
      asChild
      variant={primary ? "default" : "outline"}
      className={
        primary
          ? "cursor-pointer bg-brand-gold text-brand-blue hover:bg-brand-gold/90"
          : "cursor-pointer border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
      }
    >
      {external ? (
        <a href={action.href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <Link href={action.href}>{content}</Link>
      )}
    </Button>
  )
}

function step(i: number): CSSProperties {
  return { "--i": i } as CSSProperties
}

/**
 * Campaign scene: full-bleed illustration plus live text (headline, steps or
 * rate card, buttons). The copy re-reveals each time the slide becomes active
 * (see .campaign-copy in globals.css), so it reads as a fresh hero every turn.
 */
function CampaignSlideView({
  slide,
  active,
}: {
  slide: CampaignSlide
  active: boolean
}) {
  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 bg-[#0a0524]" />
      {/* Phones: the scene fills the top ~55% and the copy sits below it */}
      <div className="absolute inset-x-0 top-0 h-[56%] lg:inset-0 lg:h-full">
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="100vw"
          style={{ "--op": slide.objectPosition ?? "center" } as CSSProperties}
          className="object-cover [object-position:var(--op)] lg:[object-position:center]"
        />
      </div>
      {/* Phones: copy sits at the bottom over a fade so the mascot stays visible above it */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,5,36,0.97)_0%,rgba(10,5,36,0.88)_48%,rgba(10,5,36,0)_78%)] lg:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#0a0524]/85 via-[#0a0524]/45 to-transparent lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-[#0a0524]/65 via-transparent to-transparent lg:block"
      />

      <div
        data-active={active}
        className="campaign-copy relative z-[3] mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-20 pt-10 lg:justify-center lg:pt-12"
      >
        <span
          style={step(0)}
          className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[12px] text-white/90 backdrop-blur-sm sm:text-[13px]"
        >
          <span className="size-[7px] rounded-full bg-brand-gold" />
          {slide.kicker}
        </span>

        <h2
          style={step(1)}
          className="mb-4 max-w-[560px] text-[34px] font-bold leading-[1.04] tracking-[-0.06em] text-white sm:text-[48px] lg:text-[58px]"
        >
          {slide.title}{" "}
          <span className="block text-brand-gold">{slide.accent}</span>
        </h2>

        {slide.description && (
          <p
            style={step(2)}
            className="mb-6 max-w-[480px] text-[16px] leading-[1.65] text-white/80"
          >
            {slide.description}
          </p>
        )}

        {slide.steps && (
          <ol
            style={step(2)}
            className="mb-7 grid max-w-[500px] grid-cols-3 gap-3 sm:gap-5"
          >
            {slide.steps.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-1.5">
                <span className="grid size-7 place-items-center rounded-full bg-brand-gold text-[13px] font-bold text-brand-blue">
                  {i + 1}
                </span>
                <strong className="text-[15px] text-white sm:text-base">
                  {s.title}
                </strong>
                <span className="text-[11px] leading-[1.45] text-white/70 sm:text-[13px]">
                  {s.text}
                </span>
              </li>
            ))}
          </ol>
        )}

        {slide.rates && (
          <div
            style={step(2)}
            className="mb-5 w-full max-w-[460px] rounded-2xl border border-white/15 bg-[#0a0524]/60 p-3.5 backdrop-blur-md sm:mb-6 sm:p-5"
          >
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
              {slide.rates.lead}
            </p>
            <ul>
              {slide.rates.rows.map((row) => (
                <li
                  key={row.origin}
                  className="flex items-baseline justify-between gap-4 border-b border-white/10 py-1.5 last:border-0 sm:py-2"
                >
                  <span className="text-[13px] font-medium text-white sm:text-[15px]">
                    {row.origin}
                  </span>
                  <strong className="whitespace-nowrap text-[20px] tracking-[-0.03em] text-brand-gold sm:text-[26px]">
                    {row.price}
                  </strong>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 rounded-xl bg-brand-gold px-3 py-2 text-[13px] font-bold text-brand-blue shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:text-[15px]">
              <ColombiaFlag />
              <span>{slide.rates.footnote}</span>
              {slide.rates.badge && (
                <span className="rounded-full bg-brand-blue px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-[11px]">
                  {slide.rates.badge}
                </span>
              )}
            </p>
            <p className="mt-0.5 text-[11px] text-white/55">
              {slide.rates.legal}
            </p>
          </div>
        )}

        <div style={step(3)} className="flex flex-wrap gap-3">
          {slide.actions.map((action, i) => (
            <CampaignButton key={action.label} action={action} primary={i === 0} />
          ))}
        </div>
      </div>
    </>
  )
}

/** Bandera de Colombia (amarillo 50 %, azul 25 %, rojo 25 %) en CSS puro: los emoji de bandera no se ven en Windows. */
function ColombiaFlag() {
  return (
    <span
      role="img"
      aria-label="Bandera de Colombia"
      className="inline-flex h-[18px] w-[27px] shrink-0 flex-col overflow-hidden rounded-[3px] ring-1 ring-brand-blue/30 sm:h-5 sm:w-[30px]"
    >
      <span className="h-1/2 bg-[#fcd116]" />
      <span className="h-1/4 bg-[#003893]" />
      <span className="h-1/4 bg-[#ce1126]" />
    </span>
  )
}

/**
 * Full-bleed hero carousel: brand video first, then campaign scenes and
 * banners. Each slide has its own duration; rotation pauses while the
 * controls are hovered or anything inside has keyboard focus, and is off
 * entirely under prefers-reduced-motion. Slides past their `until` date
 * disappear on their own. Images are only mounted once their turn is near,
 * so the first paint loads just the video poster. Inactive slides are inert
 * (no tab stops, hidden from assistive tech).
 */
export function HeroCarousel({ children }: { children: ReactNode }) {
  const today = useSyncExternalStore(subscribeNoop, getToday, getServerToday)
  const active = heroSlides.filter(
    (s) => !("until" in s && s.until) || today === "" || today <= s.until
  )
  // Campaigns only; the brand video steps in when none is current.
  const slides = active.length > 0 ? active : [fallbackSlide]

  const [index, setIndex] = useState(0)
  const [reach, setReach] = useState(1)
  const [paused, setPaused] = useState(false)

  const current = Math.min(index, slides.length - 1)
  const total = slides.length

  const goTo = useCallback(
    (i: number) => {
      const next = ((i % total) + total) % total
      setIndex(next)
      setReach((r) => Math.max(r, next + 1))
    },
    [total]
  )

  useEffect(() => {
    if (total <= 1 || paused) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setTimeout(
      () => goTo(current + 1),
      slides[current].duration
    )
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- slides derives from `today` and `total`
  }, [current, paused, goTo, total])

  const showCopy = slides[current].kind === "brand"

  return (
    <div
      // Keyboard focus pauses rotation; a mouse click on a dot does not.
      onFocus={(e) => setPaused(e.target.matches(":focus-visible"))}
      onBlur={() => setPaused(false)}
    >
      <div className="absolute inset-0" aria-roledescription="carrusel" aria-label="Destacados Boxex">
        {slides.map((slide, i) => {
          const active = i === current
          const mounted = slide.kind === "brand" || i <= reach
          return (
            <div
              key={slide.id}
              inert={!active}
              aria-hidden={!active}
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${total}`}
              className={`absolute inset-0 overflow-hidden bg-[#04102e] transition-opacity duration-700 ease-out ${
                active ? "z-[1] opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {mounted &&
                (slide.kind === "promo" ? (
                  <PromoSlideView slide={slide} />
                ) : slide.kind === "campaign" ? (
                  <CampaignSlideView slide={slide} active={active} />
                ) : (
                  <HeroVideoSlide slide={slide} active={active} />
                ))}
            </div>
          )
        })}
      </div>

      {/* Scrims + fixed copy belong to the brand slide only */}
      <div
        className={`transition-opacity duration-500 ease-out ${
          showCopy ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        inert={!showCopy}
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

      {total > 1 && (
        <div
          className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#04102e]/45 px-3 py-2 backdrop-blur-sm"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            onClick={() => goTo(current - 1)}
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
              aria-label={`Ir a la diapositiva ${i + 1} de ${total}`}
              aria-current={i === current}
              className="size-2.5 cursor-pointer rounded-full bg-white/50 transition-all hover:bg-white/80 aria-[current=true]:w-6 aria-[current=true]:bg-brand-gold"
            />
          ))}
          <button
            type="button"
            onClick={() => goTo(current + 1)}
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
