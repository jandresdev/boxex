"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import {
  BellRing,
  House,
  Plane,
  ShoppingCart,
  UserPlus,
  Warehouse,
  type LucideIcon,
} from "lucide-react"

type Stage = {
  station: string
  title: string
  text: string
  detail?: string
  image: string
  icon: LucideIcon
  /** Position of the station along the route, 0–1. */
  at: number
}

// Proceso oficial de boxexpress.com (4 pasos) ampliado con el detalle de
// recepción, liquidación, pago y despacho que ya publica el sitio.
const STAGES: Stage[] = [
  {
    station: "Tu casillero",
    title: "Crea tu casillero gratis",
    text: "Regístrate con tus datos de contacto y recibe tu número personal IDBOX.",
    image: "/casillero/paso-02.png",
    icon: UserPlus,
    at: 0,
  },
  {
    station: "Tienda en USA",
    title: "Compra en tu tienda favorita",
    text: "Compra en cualquier tienda de Estados Unidos y usa tu casillero como dirección de envío.",
    detail: "Tu IDBOX + nombre y apellido + 2025 NW 102 Ave. Suite 109, Doral, FL 33172",
    image: "/casillero/paso-03.png",
    icon: ShoppingCart,
    at: 0.18,
  },
  {
    station: "Notificación",
    title: "Notifica tu compra",
    text: "En tu casillero virtual registra la tienda, el número de orden y el tracking para identificar tu paquete.",
    image: "/casillero/paso-05.png",
    icon: BellRing,
    at: 0.36,
  },
  {
    station: "Bodega Miami",
    title: "Lo recibimos en Miami",
    text: "Te avisamos por e-mail cuando llega a nuestra bodega. Verificamos peso y medidas para liquidar tu envío.",
    image: "/casillero/paso-06.png",
    icon: Warehouse,
    at: 0.52,
  },
  {
    station: "En vuelo",
    title: "Pagas y despachamos",
    text: "Paga con el medio disponible que prefieras y tu paquete sale hacia tu país.",
    image: "/casillero/paso-08.png",
    icon: Plane,
    at: 0.76,
  },
  {
    station: "Tu casa",
    title: "Lo recibes en casa",
    text: "Entregamos en la dirección indicada. Sigue el recorrido en todo momento con tu guía Boxex.",
    image: "/casillero/paso-09.png",
    icon: House,
    at: 1,
  },
]

// Route drawn in a 600×400 box: USA (top-left) → Miami → Latin America.
const ROUTE = "M60 70 C 150 40, 200 120, 240 170 S 300 250, 360 230 S 470 190, 500 260 S 520 340, 545 350"
const VIEW_W = 600
const VIEW_H = 400

/**
 * Scroll-driven walkthrough of the casillero process. The stage pins under
 * the header while its tall wrapper scrolls past; progress (0–1) draws the
 * gold route, moves Boxy along it, lights each station and swaps the step
 * card. All writes go straight to the DOM inside a rAF (no React renders).
 * Under prefers-reduced-motion the pinned stage is replaced by a static list.
 */
export function ProcessMotion() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const travelerRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const path = pathRef.current
    const traveler = travelerRef.current
    const bar = barRef.current
    if (!wrap || !path || !traveler || !bar) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    const stations = Array.from(wrap.querySelectorAll<HTMLElement>("[data-station]"))
    // Snap each station onto the exact route point its stage triggers at.
    stations.forEach((el, i) => {
      const p = path.getPointAtLength(length * STAGES[i].at)
      el.style.left = `${(p.x / VIEW_W) * 100}%`
      el.style.top = `${(p.y / VIEW_H) * 100}%`
    })
    const cards = Array.from(wrap.querySelectorAll<HTMLElement>("[data-stage-card]"))
    const dots = Array.from(wrap.querySelectorAll<HTMLElement>("[data-stage-dot]"))
    let frame = 0
    let lastActive = -1

    const update = () => {
      frame = 0
      const rect = wrap.getBoundingClientRect()
      const stage = wrap.querySelector<HTMLElement>("[data-stage]")
      const stageH = stage?.offsetHeight ?? window.innerHeight
      const scrollable = rect.height - stageH
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, scrollable)))

      path.style.strokeDashoffset = `${length * (1 - progress)}`
      bar.style.transform = `scaleX(${progress})`

      const point = path.getPointAtLength(length * progress)
      const ahead = path.getPointAtLength(Math.min(length, length * progress + 2))
      const angle = Math.atan2(ahead.y - point.y, ahead.x - point.x) * (180 / Math.PI)
      const lean = Math.max(-18, Math.min(18, angle * 0.25))
      traveler.style.left = `${(point.x / VIEW_W) * 100}%`
      traveler.style.top = `${(point.y / VIEW_H) * 100}%`
      traveler.style.transform = `translate(-50%, -88%) rotate(${lean}deg)`

      let active = 0
      STAGES.forEach((s, i) => {
        if (progress >= s.at - 0.04) active = i
      })
      stations.forEach((el, i) => {
        el.dataset.state = i < active ? "done" : i === active ? "active" : "todo"
      })
      if (active !== lastActive) {
        lastActive = active
        cards.forEach((el, i) => {
          el.dataset.state = i === active ? "active" : i < active ? "past" : "next"
          el.setAttribute("aria-hidden", String(i !== active))
        })
        dots.forEach((el, i) => el.setAttribute("aria-current", String(i === active)))
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <section id="proceso" aria-labelledby="proceso-titulo" className="scroll-mt-28 bg-[#04102e] text-white">
      <div className="mx-auto max-w-6xl px-6 pt-20 lg:pt-28">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
          Nuestro proceso
        </span>
        <h2
          id="proceso-titulo"
          className="mt-3 max-w-2xl text-[34px] font-bold leading-[1.05] tracking-[-0.045em] lg:text-[52px]"
        >
          Recibe tus compras desde USA, <span className="text-brand-gold">paso a paso.</span>
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-[1.75] text-white/65">
          Desliza y acompaña a Boxy en el recorrido de tu paquete: de la tienda a
          nuestra bodega en Miami y de ahí hasta tu puerta.
        </p>
      </div>

      {/* Pinned, scroll-driven version */}
      <div
        ref={wrapRef}
        className="relative motion-reduce:hidden"
        style={{ height: `${STAGES.length * 70 + 60}vh` }}
      >
        <div
          data-stage
          className="sticky top-[calc(var(--stack-top)-1rem)] flex h-[calc(100svh-var(--stack-top)+1rem)] items-center"
        >
          <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-6 py-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
            {/* Route map */}
            <div className="relative rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(1,22,137,0.55),transparent_60%),radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:auto,18px_18px] p-3 sm:p-5">
              <div className="relative aspect-[3/2] w-full">
                <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="absolute inset-0 size-full" aria-hidden="true">
                  <path d={ROUTE} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
                  <path
                    ref={pathRef}
                    d={ROUTE}
                    fill="none"
                    stroke="#d6b36a"
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 6px rgba(214,179,106,0.6))" }}
                  />
                </svg>

                {STAGES.map((s) => (
                  <StationMarker key={s.station} stage={s} />
                ))}

                <div ref={travelerRef} className="pointer-events-none absolute left-[10%] top-[17.5%] z-10 will-change-transform" aria-hidden="true">
                  <Image
                    src="/characters/boxy-cutout.webp"
                    alt=""
                    width={800}
                    height={709}
                    sizes="80px"
                    className="process-boxy h-auto w-12 drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)] sm:w-16"
                  />
                </div>
              </div>
              <div className="mx-2 mt-2 h-1 overflow-hidden rounded-full bg-white/10 sm:mx-3">
                <div ref={barRef} className="h-full origin-left scale-x-0 rounded-full bg-brand-gold" />
              </div>
            </div>

            {/* Step cards */}
            <div className="relative min-h-[300px] sm:min-h-[400px]">
              {STAGES.map((s, i) => (
                <article
                  key={s.title}
                  data-stage-card
                  data-state={i === 0 ? "active" : "next"}
                  aria-hidden={i !== 0}
                  className="process-card absolute inset-0 flex flex-col pb-8"
                >
                  <div className="relative mb-4 hidden h-28 w-40 overflow-hidden rounded-2xl bg-white sm:block lg:h-32 lg:w-44">
                    <Image src={s.image} alt="" fill sizes="176px" className="object-contain p-2" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                    Paso {String(i + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
                  </span>
                  <h3 className="mb-3 mt-2 text-[26px] font-bold leading-[1.1] tracking-[-0.04em] lg:text-[34px]">
                    {s.title}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-white/70">{s.text}</p>
                  {s.detail && (
                    <p className="mt-4 rounded-xl border border-brand-gold/40 bg-brand-gold/10 px-4 py-3 text-[13px] font-medium leading-[1.5] text-brand-gold">
                      {s.detail}
                    </p>
                  )}
                </article>
              ))}
              <div className="absolute bottom-0 left-0 flex gap-2" aria-hidden="true">
                {STAGES.map((s, i) => (
                  <span
                    key={s.title}
                    data-stage-dot
                    aria-current={i === 0}
                    className="h-1.5 w-1.5 rounded-full bg-white/30 transition-all duration-300 aria-[current=true]:w-6 aria-[current=true]:bg-brand-gold"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static version for reduced motion */}
      <ol className="mx-auto hidden max-w-6xl gap-6 px-6 py-14 motion-reduce:grid sm:grid-cols-2 lg:grid-cols-3">
        {STAGES.map((s, i) => (
          <li key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <span className="text-xs font-semibold text-brand-gold">Paso {i + 1}</span>
            <h3 className="mb-2 mt-1 text-lg font-semibold">{s.title}</h3>
            <p className="text-sm leading-[1.7] text-white/70">{s.text}</p>
            {s.detail && <p className="mt-3 text-[13px] text-brand-gold">{s.detail}</p>}
          </li>
        ))}
      </ol>
      <div className="h-16 lg:h-24" />
    </section>
  )
}

/** Station pin rendered over the SVG; left/top are relative to the 600×400 viewBox. */
function StationMarker({ stage }: { stage: Stage }) {
  const Icon = stage.icon
  const pos = STATION_POINTS[stage.station]
  return (
    <div
      data-station
      data-state="todo"
      className="process-station absolute z-[5] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
      style={{ left: `${(pos.x / VIEW_W) * 100}%`, top: `${(pos.y / VIEW_H) * 100}%` }}
    >
      <span className="process-station-dot grid size-8 place-items-center rounded-full border sm:size-10">
        <Icon className="size-4 sm:size-5" />
      </span>
      <span className="process-station-label whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold sm:text-[11px]">
        {stage.station}
      </span>
    </div>
  )
}

// Server-rendered approximations; the effect snaps them onto ROUTE exactly.
const STATION_POINTS: Record<string, { x: number; y: number }> = {
  "Tu casillero": { x: 60, y: 70 },
  "Tienda en USA": { x: 175, y: 82 },
  Notificación: { x: 240, y: 170 },
  "Bodega Miami": { x: 330, y: 238 },
  "En vuelo": { x: 470, y: 205 },
  "Tu casa": { x: 545, y: 350 },
}
