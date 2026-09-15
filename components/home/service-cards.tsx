import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { services } from "@/lib/home-data"

export function ServiceCardsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 flex flex-col gap-2">
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
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <Link
              key={service.slug}
              href={`/servicios/${service.slug}`}
              className="group flex flex-col gap-4 rounded-xl border border-neutral-200 p-6 transition-colors hover:border-brand-blue"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-brand-blue/5 text-brand-blue">
                <Icon className="size-5" />
              </div>
              <h3 className="font-semibold text-brand-blue">{service.name}</h3>
              <p className="text-sm text-neutral-600">{service.description}</p>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-brand-blue">
                Conoce el servicio
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
