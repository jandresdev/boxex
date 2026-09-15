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
    <section ref={sectionRef} className="bg-neutral-50 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-gold">
            Así de cerca
          </span>
          <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
            De tus manos.
            <br />
            A su puerta.
          </h2>
          <p className="max-w-md text-neutral-600">
            Un recorrido claro, desde la primera pregunta hasta la entrega.
          </p>
          <div className="relative mt-4" aria-hidden="true">
            <svg viewBox="0 0 480 250" className="w-full max-w-sm text-brand-blue">
              <path
                d="M40 195C130 195 70 55 185 55S270 200 365 160 410 60 445 60"
                className="fill-none stroke-brand-blue/15"
                strokeWidth={3}
              />
              <path
                ref={pathRef}
                d="M40 195C130 195 70 55 185 55S270 200 365 160 410 60 445 60"
                className="fill-none stroke-brand-gold"
                strokeWidth={3}
                strokeLinecap="round"
              />
              <circle cx={40} cy={195} r={8} className="fill-brand-blue" />
              <circle cx={445} cy={60} r={8} className="fill-brand-blue" />
            </svg>
          </div>
          <Button asChild variant="outline" className="mt-2 w-fit">
            <Link href="/como-funciona">Ver cómo funciona</Link>
          </Button>
        </div>
        <div className="flex flex-col gap-6">
          {journeySteps.map((step, i) => (
            <article key={step.title} className="flex gap-4">
              <span className="text-2xl font-bold text-brand-gold">
                0{i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-brand-blue">{step.title}</h3>
                <p className="text-sm text-neutral-600">{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
