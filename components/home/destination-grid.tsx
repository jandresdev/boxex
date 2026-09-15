import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { countries, slugify } from "@/lib/home-data"
import { Reveal } from "./reveal"

export function DestinationGridSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal className="mb-10 flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-gold">
          Nuestros destinos
        </span>
        <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
          La distancia cambia.
          <br />
          El vínculo se queda.
        </h2>
        <p className="max-w-xl text-neutral-600">
          11 destinos desde Estados Unidos.
          <br />
          Consulta las modalidades para cada país.
        </p>
      </Reveal>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(countries).map(([country, modes], i) => (
          <Reveal key={country} delay={(i % 6) * 60}>
            <Link
              href={`/destinos/${slugify(country)}`}
              className="group flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-neutral-200 px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue hover:shadow-md"
            >
              <span className="flex items-center gap-3">
                <MapPin className="size-5 text-brand-blue" />
                <span>
                  <strong className="block text-brand-blue">{country}</strong>
                  <small className="text-neutral-500">{modes.join(" · ")}</small>
                </span>
              </span>
              <ArrowRight className="size-4 text-brand-blue transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
