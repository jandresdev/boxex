"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { journeySteps } from "@/lib/home-data"

const PackageScene = dynamic(
  () => import("./package-scene").then((m) => m.PackageScene),
  { ssr: false }
)

export function JourneySection() {
  return (
    <section className="bg-brand-blue text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-[60px] lg:grid-cols-2 lg:gap-[90px] lg:py-[90px]">
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
            Gira la caja, es interactiva.
          </p>
          <div className="relative h-[260px] sm:h-[320px]" aria-hidden="true">
            <PackageScene />
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
