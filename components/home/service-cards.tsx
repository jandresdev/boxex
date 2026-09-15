import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { services } from "@/lib/home-data"
import { Reveal } from "./reveal"

export function ServiceCardsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal className="mb-10 flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-gold">
          Encuentra tu forma de enviar
        </span>
        <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
          Para cada conexión,
          <br />
          una solución.
        </h2>
        <p className="max-w-xl text-neutral-600">
          De una compra online a una caja para tu familia.
          <br />
          Empieza por lo que necesitas hacer.
        </p>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => {
          const Icon = service.icon
          return (
            <Reveal key={service.slug} delay={i * 80}>
              <Link
                href={`/servicios/${service.slug}`}
                className="group flex h-full cursor-pointer flex-col gap-4 rounded-xl border border-neutral-200 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-blue hover:shadow-lg"
              >
                <div className="flex size-11 items-center justify-center rounded-lg bg-brand-blue/5 text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-semibold text-brand-blue">{service.name}</h3>
                <p className="text-sm text-neutral-600">{service.description}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-brand-blue">
                  Conoce el servicio
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
