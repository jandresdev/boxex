"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { services } from "@/lib/home-data"

type Theme = {
  card: string
  title: string
  body: string
  kicker: string
  icon: string
  primary: string
  secondary: string
}

const THEMES: Theme[] = [
  {
    card: "bg-[#04102e] text-white",
    title: "text-white",
    body: "text-white/70",
    kicker: "text-brand-gold",
    icon: "bg-white/10 text-brand-gold",
    primary: "bg-brand-gold text-brand-blue hover:bg-brand-gold/90",
    secondary: "border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white",
  },
  {
    card: "bg-[#f2f4fa] text-brand-blue",
    title: "text-brand-blue",
    body: "text-brand-blue/70",
    kicker: "text-brand-blue/60",
    icon: "bg-white text-brand-blue",
    primary: "bg-brand-blue text-white hover:bg-brand-blue/90",
    secondary: "border-brand-blue/25 bg-white text-brand-blue hover:bg-white/70",
  },
  {
    card: "bg-brand-blue text-white",
    title: "text-white",
    body: "text-white/75",
    kicker: "text-brand-gold",
    icon: "bg-white/10 text-brand-gold",
    primary: "bg-brand-gold text-brand-blue hover:bg-brand-gold/90",
    secondary: "border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white",
  },
  {
    card: "bg-brand-gold text-brand-blue",
    title: "text-brand-blue",
    body: "text-brand-blue/75",
    kicker: "text-brand-blue/70",
    icon: "bg-white/50 text-brand-blue",
    primary: "bg-brand-blue text-white hover:bg-brand-blue/90",
    secondary: "border-brand-blue/30 bg-white/40 text-brand-blue hover:bg-white/60",
  },
]

const STEP = 16 // px each stacked card peeks below the previous one

/**
 * Full-width service cards that pin under the header and stack as you
 * scroll: each new card slides over the previous one, which recedes
 * (scales down and dims), while the incoming card's illustration settles
 * with a light parallax. Pinning is plain CSS `position: sticky`, so the
 * layout works without JS; the scroll script only adds the depth effect,
 * is rAF-throttled, writes styles directly (no React renders) and is
 * skipped under prefers-reduced-motion.
 */
export function ServiceStack() {
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-stack-item]"))
    let frame = 0

    const update = () => {
      frame = 0
      const vh = window.innerHeight
      items.forEach((item, i) => {
        const card = item.querySelector<HTMLElement>("[data-stack-card]")
        const shade = item.querySelector<HTMLElement>("[data-stack-shade]")
        const art = item.querySelector<HTMLElement>("[data-stack-art]")
        if (!card || !shade || !art) return

        const rect = card.getBoundingClientRect()
        const stickyTop = parseFloat(getComputedStyle(item).top) || 0

        // Entering: 0 when the card's top is at the bottom of the viewport,
        // 1 once it is pinned.
        const enter = Math.min(1, Math.max(0, (vh - rect.top) / (vh - stickyTop)))
        art.style.transform = `translate3d(0, ${(1 - enter) * 60}px, 0) scale(${1.12 - enter * 0.12})`

        // Covered: how far the following cards have slid over this one.
        const next = items[i + 1]?.querySelector<HTMLElement>("[data-stack-card]")
        let covered = 0
        if (next) {
          const nextTop = next.getBoundingClientRect().top
          covered = Math.min(1, Math.max(0, (rect.bottom - nextTop) / rect.height))
        }
        const depth = items.length - 1 - i
        card.style.transform = `scale(${1 - covered * 0.04 * Math.min(depth, 2)})`
        shade.style.opacity = String(covered * 0.45)
      })
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
    <ol ref={listRef} className="mx-auto flex max-w-6xl flex-col gap-[12vh] px-4 pb-[14vh] sm:px-6">
      {services.map((service, i) => {
        const Icon = service.icon
        const theme = THEMES[i % THEMES.length]
        return (
          <li
            key={service.slug}
            data-stack-item
            className="sticky"
            style={{ top: `calc(var(--stack-top) + ${i * STEP}px)` }}
          >
            <article
              data-stack-card
              className={`relative grid origin-top overflow-hidden rounded-[28px] shadow-[0_-12px_40px_rgba(4,16,46,0.18)] will-change-transform lg:min-h-[min(68vh,560px)] lg:grid-cols-[1fr_1.05fr] ${theme.card}`}
            >
              <div className="relative z-[1] flex flex-col justify-center gap-4 p-6 sm:gap-5 sm:p-10 lg:p-14">
                <div className="flex items-center gap-4">
                  <span className={`grid size-12 place-items-center rounded-2xl ${theme.icon}`}>
                    <Icon className="size-6" />
                  </span>
                  <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${theme.kicker}`}>
                    {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </span>
                </div>
                <h2 className={`text-[32px] font-bold leading-[1.05] tracking-[-0.045em] sm:text-[44px] lg:text-[52px] ${theme.title}`}>
                  {service.name}
                </h2>
                <p className={`text-base font-semibold sm:text-lg ${theme.kicker}`}>{service.tag}</p>
                <p className={`max-w-[460px] text-sm leading-[1.7] sm:text-[15px] sm:leading-[1.75] ${theme.body}`}>
                  {service.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <Button asChild className={`cursor-pointer ${theme.primary}`}>
                    <Link href={`/servicios/${service.slug}`}>
                      Consultar
                      <ArrowRight />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className={`cursor-pointer ${theme.secondary}`}>
                    <Link href="/cotizar">Cotizar envío</Link>
                  </Button>
                </div>
              </div>

              <div className="relative order-first aspect-[16/9] overflow-hidden sm:aspect-[4/3] lg:order-none lg:aspect-auto">
                <div data-stack-art className="absolute inset-0 will-change-transform">
                  <Image
                    src={`/servicios/${service.slug}.webp`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div
                data-stack-shade
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[2] bg-[#04102e] opacity-0"
              />
            </article>
          </li>
        )
      })}
    </ol>
  )
}
