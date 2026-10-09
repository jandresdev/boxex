"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"

type Character = "boxy" | "boxella" | "boxyta" | "familia-boxex"

type CurtainScene = { label: string; character: Character }

const CHARACTER_SIZES: Record<Character, { width: number; height: number }> = {
  boxy: { width: 800, height: 709 },
  boxella: { width: 714, height: 800 },
  boxyta: { width: 607, height: 800 },
  "familia-boxex": { width: 800, height: 600 },
}

// First path segment → curtain copy and mascot. Rotating the four mascots
// keeps consecutive navigations from feeling repetitive.
const SCENES: Record<string, CurtainScene> = {
  "": { label: "Desde USA. Hasta los tuyos.", character: "familia-boxex" },
  servicios: { label: "Servicios", character: "boxy" },
  destinos: { label: "Destinos", character: "boxella" },
  "como-funciona": { label: "Cómo funciona", character: "boxyta" },
  cotizar: { label: "Cotizar", character: "boxy" },
  rastreo: { label: "Rastreo", character: "boxella" },
  oficinas: { label: "Oficinas", character: "boxyta" },
  nosotros: { label: "Nosotros", character: "familia-boxex" },
  contacto: { label: "Contacto", character: "boxella" },
  ayuda: { label: "Ayuda", character: "boxyta" },
  pqr: { label: "PQRs", character: "boxy" },
  aliados: { label: "Aliados", character: "familia-boxex" },
  pagos: { label: "Pagos", character: "boxella" },
  guias: { label: "Guías", character: "boxy" },
  condiciones: { label: "Condiciones", character: "boxyta" },
  legal: { label: "Aspectos legales", character: "boxy" },
  "mi-casillero": { label: "Mi casillero", character: "boxyta" },
}

const FALLBACK: CurtainScene = { label: "Unlimited Courier", character: "boxy" }

const WORD = [
  { text: "BOX", className: "text-white" },
  { text: "EX", className: "text-brand-gold" },
]

/**
 * Full-screen opening curtain shown at the start of every page, in the style
 * of an editorial "page loader": the BOXEX letters rise through a mask, the
 * page's mascot pops in, a gold progress bar fills, then the panel slides up.
 *
 * It is purely CSS-driven so it plays on the server-rendered HTML before
 * hydration, and keyed by pathname so a client-side navigation remounts it
 * and replays the sequence. It never intercepts pointer events, and it is
 * removed entirely under prefers-reduced-motion.
 */
export function PageCurtain() {
  const pathname = usePathname() ?? "/"
  const segment = pathname.split("/")[1] ?? ""
  const scene = SCENES[segment] ?? FALLBACK
  const size = CHARACTER_SIZES[scene.character]

  let letterIndex = 0

  return (
    <div
      key={pathname}
      aria-hidden="true"
      className="page-curtain pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#04102e] motion-reduce:hidden"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(1,22,137,0.55),transparent_70%)]"
      />
      <div className="relative flex flex-col items-center px-6">
        <Image
          src={`/characters/${scene.character}-cutout.webp`}
          alt=""
          width={size.width}
          height={size.height}
          priority
          sizes="220px"
          className="curtain-mascot mb-6 h-32 w-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] sm:h-40"
        />
        <div className="flex text-[56px] font-bold leading-none tracking-[-0.06em] sm:text-[88px]">
          {WORD.map((part) =>
            part.text.split("").map((char) => {
              const i = letterIndex++
              return (
                <span key={i} className="inline-block overflow-hidden pb-1">
                  <span
                    className={`curtain-letter inline-block ${part.className}`}
                    style={{ animationDelay: `${0.08 + i * 0.06}s` }}
                  >
                    {char}
                  </span>
                </span>
              )
            }),
          )}
        </div>
        <p className="curtain-meta mt-4 text-[11px] font-medium uppercase tracking-[0.32em] text-white/70 sm:text-xs">
          Unlimited Courier <span className="text-brand-gold">—</span>{" "}
          {scene.label}
        </p>
        <div className="mt-6 h-px w-40 overflow-hidden bg-white/15 sm:w-56">
          <div className="curtain-bar h-full w-full origin-left bg-brand-gold" />
        </div>
      </div>
    </div>
  )
}
