import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type HeroAction = { label: string; href: string }

const DEFAULT_ACTIONS: HeroAction[] = [
  { label: "Cotizar mi envío", href: "/cotizar" },
  { label: "Rastrear envío", href: "/rastreo" },
]

const FALLBACK_IMAGE = "/assets/boxex-characters-hero.png"

function delay(seconds: number): CSSProperties {
  return { "--d": `${seconds}s` } as CSSProperties
}

/**
 * Full-bleed page hero, sharing the home hero's language: background image
 * with Ken Burns motion, navy scrims, gold-dot kicker, word-by-word headline
 * (last word in gold) and CTAs. Its reveal is timed to start right after the
 * page curtain lifts (see the hero-* rules in globals.css).
 */
export function PageIntro({
  kicker,
  title,
  description,
  image = FALLBACK_IMAGE,
  actions = DEFAULT_ACTIONS,
}: {
  kicker: string
  title: string
  description: string
  image?: string
  actions?: HeroAction[]
}) {
  const words = title.split(" ")
  const [primary, secondary] = actions

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#04102e]">
        <div aria-hidden="true" className="hero-bg absolute inset-0 -z-10">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center] lg:object-center"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#04102e]/90 via-[#04102e]/55 to-[#04102e]/5"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#04102e]/75 via-transparent to-[#04102e]/20"
        />

        <div className="mx-auto flex min-h-[68vh] max-w-6xl flex-col justify-center px-6 pb-20 pt-14 lg:min-h-[76vh]">
          <nav aria-label="Ruta de navegación" className="hero-fade mb-8 text-xs text-white/60">
            <Link href="/" className="hover:text-white hover:underline">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/85">{kicker}</span>
          </nav>

          <div className="flex max-w-2xl flex-col">
            <span
              className="hero-fade mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[13px] text-white/90 backdrop-blur-sm"
              style={delay(0.05)}
            >
              <span className="size-[7px] rounded-full bg-brand-gold" />
              {kicker}
            </span>

            <h1
              key={title}
              className="mb-6 text-[40px] font-bold leading-[1.04] tracking-[-0.06em] text-white sm:text-[56px] lg:text-[66px]"
            >
              {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span
                    className={`hero-word inline-block ${
                      i === words.length - 1 ? "text-brand-gold" : ""
                    }`}
                    style={{ "--i": i } as CSSProperties}
                  >
                    {word}
                  </span>
                  {i < words.length - 1 && " "}
                </span>
              ))}
            </h1>

            <p
              className="hero-fade mb-8 max-w-[520px] text-[17px] leading-[1.65] text-white/80"
              style={delay(0.35)}
            >
              {description}
            </p>

            {primary && (
              <div className="hero-fade flex flex-wrap gap-3" style={delay(0.5)}>
                <Button
                  asChild
                  className="cursor-pointer bg-brand-gold text-brand-blue hover:bg-brand-gold/90"
                >
                  <Link href={primary.href}>
                    {primary.label}
                    <ArrowRight />
                  </Link>
                </Button>
                {secondary && (
                  <Button
                    asChild
                    variant="outline"
                    className="cursor-pointer border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                  >
                    <Link href={secondary.href}>{secondary.label}</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        <a
          href="#contenido"
          className="hero-fade absolute bottom-6 left-1/2 flex w-fit -translate-x-1/2 items-center gap-3 text-[11px] text-white/70 transition-colors hover:text-white lg:left-16 lg:translate-x-0"
          style={delay(0.7)}
        >
          Sigue explorando <span className="hero-float inline-block text-base">↓</span>
        </a>
      </section>
      <div id="contenido" className="scroll-mt-28 pt-14 lg:pt-16" />
    </>
  )
}
