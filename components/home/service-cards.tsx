import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { services } from "@/lib/home-data"
import { Reveal } from "./reveal"

export function ServiceCardsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-[66px] sm:py-20 lg:py-[110px]">
      <Reveal className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="mb-5 block text-[13px] font-medium text-brand-blue">
            Encuentra tu forma de enviar
          </span>
          <h2 className="text-[35px] font-bold tracking-[-0.048em] text-brand-blue lg:text-[49px]">
            Para cada conexión,
            <br />
            una solución.
          </h2>
        </div>
        <p className="max-w-[390px] text-[15px] text-brand-blue/70 lg:text-base">
          De una compra online a una caja para tu familia.
          <br />
          Empieza por lo que necesitas hacer.
        </p>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {services.map((service, i) => {
          const Icon = service.icon
          return (
            <Reveal key={service.slug} delay={i * 80}>
              <Link
                href={`/servicios/${service.slug}`}
                className="group flex h-full cursor-pointer flex-col items-start border-t-2 border-brand-blue pt-7 pb-6"
              >
                <div className="mb-7 flex size-12 items-center justify-center rounded-xl bg-brand-soft-gold text-brand-blue">
                  <Icon className="size-[25px]" />
                </div>
                <h3 className="mb-3.5 min-h-[54px] text-[22px] font-semibold text-brand-blue">
                  {service.name}
                </h3>
                <p className="mb-7 text-sm leading-[1.7] text-brand-blue/70">
                  {service.description}
                </p>
                <span className="mt-auto flex items-center gap-5 text-xs font-semibold text-brand-blue transition-[gap] duration-200 group-hover:gap-7">
                  Conoce el servicio
                  <ArrowRight className="size-[18px]" />
                </span>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
