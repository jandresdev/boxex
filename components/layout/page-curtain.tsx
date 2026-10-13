"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"

type Character = "boxy" | "boxella" | "boxyta" | "familia-boxex"

type CurtainScene = { label: string; character: Character }

// Halloween costumes (campaign of October 2026): Boxy as a vampire, Boxyta as a
// witch, Boxella as a pumpkin and the three together as the family.
const CHARACTERS: Record<Character, { src: string; width: number; height: number; className: string }> = {
  boxy: { src: "/characters/boxy-halloween-cutout.webp", width: 410, height: 365, className: "h-32 sm:h-40" },
  boxella: { src: "/characters/boxella-halloween-cutout.webp", width: 347, height: 370, className: "h-32 sm:h-40" },
  boxyta: { src: "/characters/boxyta-halloween-cutout.webp", width: 406, height: 456, className: "h-32 sm:h-40" },
  "familia-boxex": { src: "/characters/familia-halloween-cutout.webp", width: 1457, height: 640, className: "h-28 sm:h-36" },
}

// First path segment → curtain label and mascot. Each section uses the same
// costume as its hero (vampire Boxy, witch Boxyta, pumpkin Boxella).
const SCENES: Record<string, CurtainScene> = {
  "": { label: "Desde USA. Hasta los tuyos.", character: "familia-boxex" },
  servicios: { label: "Servicios", character: "boxy" },
  "recogida-en-casa": { label: "Recogida en casa", character: "boxy" },
  "mi-casillero": { label: "Casillero virtual", character: "boxyta" },
  destinos: { label: "Destinos", character: "boxyta" },
  cotizar: { label: "Cotizar", character: "boxyta" },
  rastreo: { label: "Rastreo", character: "boxy" },
  oficinas: { label: "Oficinas", character: "boxy" },
  nosotros: { label: "Nosotros", character: "familia-boxex" },
  ayuda: { label: "Ayuda y contacto", character: "boxella" },
  pqr: { label: "PQRs", character: "boxy" },
  aliados: { label: "Aliados", character: "boxy" },
  pagos: { label: "Pagos", character: "boxella" },
  guias: { label: "Guías", character: "boxyta" },
  condiciones: { label: "Condiciones", character: "boxella" },
  legal: { label: "Aspectos legales", character: "boxy" },
  encuesta: { label: "Encuesta", character: "boxella" },
}

const FALLBACK: CurtainScene = { label: "Unlimited Courier", character: "boxy" }

/**
 * Full-screen opening curtain shown at the start of every page, in the style
 * of an editorial "page loader": the original BOXEX logo rises through a mask,
 * the page's (costumed) mascot pops in, a gold progress bar fills, then the panel slides up.
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
  const character = CHARACTERS[scene.character]

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
          src={character.src}
          alt=""
          width={character.width}
          height={character.height}
          priority
          sizes="320px"
          className={`curtain-mascot mb-6 w-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] ${character.className}`}
        />
        {/* The original BOXEX logo rises through a mask, like the old letters */}
        <div className="overflow-hidden pb-1">
          <Image
            src="/logo-white.png"
            alt=""
            width={849}
            height={244}
            priority
            sizes="(min-width: 640px) 420px, 280px"
            className="curtain-letter h-auto w-[240px] sm:w-[380px]"
            style={{ animationDelay: "0.1s" }}
          />
        </div>
        <p className="curtain-meta mt-4 text-[11px] font-medium uppercase tracking-[0.32em] text-white/70 sm:text-xs">
          <span className="text-brand-gold">—</span> {scene.label}{" "}
          <span className="text-brand-gold">—</span>
        </p>
        <div className="mt-6 h-px w-40 overflow-hidden bg-white/15 sm:w-56">
          <div className="curtain-bar h-full w-full origin-left bg-brand-gold" />
        </div>
      </div>
    </div>
  )
}
