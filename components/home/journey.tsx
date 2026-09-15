"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { journeySteps } from "@/lib/home-data"

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (reduced) return

    let cleanup = () => {}
    let cancelled = false

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (cancelled || !sectionRef.current || !pathRef.current) return
        gsap.registerPlugin(ScrollTrigger)

        const length = pathRef.current.getTotalLength()
        pathRef.current.style.strokeDasharray = `${length}`
        pathRef.current.style.strokeDashoffset = `${length}`

        const tween = gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 70%",
            scrub: 0.7,
          },
        })

        cleanup = () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      }
    )

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return (
    <section ref={sectionRef} className="bg-brand-blue text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-[60px] lg:grid-cols-2 lg:gap-[110px] lg:py-[90px]">
        <div className="flex flex-col lg:sticky lg:top-[135px] lg:self-start">
          <span className="mb-5 block text-[13px] font-medium text-brand-gold">
            Así de cerca
          </span>
          <h2 className="mb-3 text-[40px] font-bold tracking-[-0.048em] text-white lg:text-[52px]">
            De tus manos.
            <br />
            A su puerta.
          </h2>
          <p className="mb-2 max-w-[390px] text-[16px] text-white/85">
            Un recorrido claro, desde la primera pregunta hasta la entrega.
          </p>
          <div className="relative my-3 max-w-[450px]" aria-hidden="true">
            <svg viewBox="0 0 480 250" className="w-full">
              <path
                d="M40 195C130 195 70 55 185 55S270 200 365 160 410 60 445 60"
                className="fill-none stroke-white/20"
                strokeWidth={2}
                strokeDasharray="5 7"
              />
              <path
                ref={pathRef}
                d="M40 195C130 195 70 55 185 55S270 200 365 160 410 60 445 60"
                className="fill-none stroke-brand-gold"
                strokeWidth={2}
              />
              <circle cx={40} cy={195} r={6} className="fill-brand-gold" />
              <circle cx={445} cy={60} r={6} className="fill-brand-gold" />
            </svg>
          </div>
          <Button
            asChild
            variant="outline"
            className="mt-4 w-fit cursor-pointer border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/como-funciona">Ver cómo funciona</Link>
          </Button>
        </div>
        <div className="pt-4 lg:pt-[60px]">
          {journeySteps.map((step, i) => (
            <article
              key={step.title}
              className="flex gap-6 border-t border-white/20 py-6 first:border-t-0 lg:py-6"
            >
              <span className="pt-1 text-sm text-brand-gold">0{i + 1}</span>
              <div>
                <h3 className="mb-2 text-[22px] font-semibold text-white lg:text-[26px]">
                  {step.title}
                </h3>
                <p className="text-[15px] text-white/80">{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
