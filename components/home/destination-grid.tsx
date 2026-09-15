import { countries, slugify } from "@/lib/home-data"
import { DestinationCard } from "@/components/destinos/destination-card"
import { Reveal } from "./reveal"

export function DestinationGridSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-[66px] sm:py-20 lg:py-[110px]">
      <Reveal className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="mb-5 block text-[13px] font-medium text-brand-blue">
            Nuestros destinos
          </span>
          <h2 className="text-[35px] font-bold tracking-[-0.048em] text-brand-blue lg:text-[49px]">
            La distancia cambia.
            <br />
            El vínculo se queda.
          </h2>
        </div>
        <p className="max-w-[390px] text-[15px] text-brand-blue/70 lg:text-base">
          11 destinos desde Estados Unidos.
          <br />
          Consulta las modalidades para cada país.
        </p>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(countries).map(([country, modes], i) => (
          <Reveal key={country} delay={(i % 6) * 60}>
            <DestinationCard
              country={country}
              modes={modes}
              href={`/destinos/${slugify(country)}`}
            />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
