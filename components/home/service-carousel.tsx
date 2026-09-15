"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { services } from "@/lib/home-data"

const N = services.length

function circularOffset(i: number, current: number) {
  let o = i - current
  if (o > N / 2) o -= N
  if (o < -N / 2) o += N
  return o
}

/**
 * 3D coverflow carousel that fills the width it's given (measured via
 * ResizeObserver, spacing/depth derive from that so cards never
 * overlap and it scales cleanly at any viewport). Drag/swipe, arrow
 * keys, prev/next buttons and dots all move a single `index` state;
 * card position is derived from the circular offset, so it loops
 * infinitely both directions. Clicking a side card re-centers it
 * instead of navigating (it's rotated away and hard to read); clicking
 * the centered card follows its link like a normal card. Respects
 * prefers-reduced-motion by skipping the CSS transition.
 */
export function ServiceCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const dragRef = useRef({ startX: 0, dragging: false, moved: false })
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(1100)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width)
    })
    observer.observe(el)
    setWidth(el.getBoundingClientRect().width)
    return () => observer.disconnect()
  }, [])

  function go(delta: number) {
    setIndex((i) => (i + delta + N) % N)
  }

  // Slow autoplay loop — pauses on hover/focus/drag and whenever the
  // user prefers reduced motion. Since navigation loops infinitely,
  // this never "ends"; it just keeps drifting to the next service.
  useEffect(() => {
    const reducedNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reducedNow || paused) return
    const id = window.setInterval(() => go(1), 4500)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused])

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragRef.current = { startX: e.clientX, dragging: true, moved: false }
    e.currentTarget.setPointerCapture(e.pointerId)
    setPaused(true)
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current.dragging) return
    if (Math.abs(e.clientX - dragRef.current.startX) > 6) {
      dragRef.current.moved = true
    }
  }
  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current.dragging) return
    const dx = e.clientX - dragRef.current.startX
    dragRef.current.dragging = false
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    setPaused(false)
  }

  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  // Card width and spacing both scale off the measured container width,
  // so the carousel genuinely fills the section edge-to-edge at any
  // size instead of sitting in a fixed small box, and adjacent cards
  // never overlap (spacing always exceeds card width).
  const cardWidth = Math.min(340, Math.max(240, width * 0.27))
  const spacingX = cardWidth * 1.05
  const depthStep = cardWidth * 0.62

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Servicios de Boxex"
      className="relative w-full"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1)
        if (e.key === "ArrowRight") go(1)
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={containerRef}
        tabIndex={0}
        className="relative flex h-[340px] w-full cursor-grab touch-pan-y items-center justify-center outline-none [perspective:1800px] active:cursor-grabbing sm:h-[380px]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {services.map((service, i) => {
          const offset = circularOffset(i, index)
          const abs = Math.abs(offset)
          const isCenter = offset === 0
          const Icon = service.icon

          if (abs > 2) return null

          const style: React.CSSProperties = {
            transform: `translate(-50%, -50%) translateX(${offset * spacingX}px) translateZ(${-abs * depthStep}px) rotateY(${offset * -30}deg) scale(${isCenter ? 1 : 0.84})`,
            transition: reduced
              ? "none"
              : "transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 550ms",
            opacity: abs > 1 ? 0.3 : 1,
            width: cardWidth,
            zIndex: 10 - abs,
            pointerEvents: dragRef.current.dragging ? "none" : "auto",
          }

          return (
            <div
              key={service.slug}
              className="absolute left-1/2 top-1/2"
              style={style}
              aria-hidden={!isCenter}
            >
              <Link
                href={`/servicios/${service.slug}`}
                draggable={false}
                onClick={(e) => {
                  if (dragRef.current.moved) {
                    e.preventDefault()
                    return
                  }
                  if (!isCenter) {
                    e.preventDefault()
                    setIndex(i)
                  }
                }}
                tabIndex={isCenter ? 0 : -1}
                className={`group flex h-full cursor-pointer select-none flex-col items-start rounded-2xl border border-white/60 bg-white/85 p-6 backdrop-blur-xl transition-shadow ${
                  isCenter
                    ? "shadow-[0_30px_60px_-10px_rgba(1,22,137,0.28)] hover:shadow-[0_35px_70px_-10px_rgba(1,22,137,0.35)]"
                    : "shadow-[0_15px_30px_rgba(1,22,137,0.12)]"
                }`}
              >
                <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-brand-soft-gold text-brand-blue">
                  <Icon className="size-5" />
                </div>
                <h3 className="mb-2 min-h-[54px] text-lg font-semibold text-brand-blue">
                  {service.name}
                </h3>
                <p className="mb-5 text-sm leading-[1.6] text-brand-blue/70">
                  {service.description}
                </p>
                <span className="mt-auto flex items-center gap-4 text-xs font-semibold text-brand-blue transition-[gap] duration-200 group-hover:gap-6">
                  Conoce el servicio
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Servicio anterior"
          className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-brand-line bg-white/80 text-brand-blue backdrop-blur transition-colors hover:bg-brand-pale"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex gap-2">
          {services.map((service, i) => (
            <button
              key={service.slug}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ir a ${service.name}`}
              aria-current={i === index}
              className="size-2.5 cursor-pointer rounded-full bg-brand-blue/25 transition-all hover:bg-brand-blue/50 aria-[current=true]:w-6 aria-[current=true]:bg-brand-blue"
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Siguiente servicio"
          className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-brand-line bg-white/80 text-brand-blue backdrop-blur transition-colors hover:bg-brand-pale"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  )
}
