import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { countries, slugify } from "@/lib/home-data"
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
      <div className="grid sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
        {Object.entries(countries).map(([country, modes], i) => (
          <Reveal key={country} delay={(i % 6) * 60}>
            <Link
              href={`/destinos/${slugify(country)}`}
              className="group relative block cursor-pointer border-b border-brand-line py-6 pr-8 transition-colors hover:bg-brand-pale"
            >
              <span className="flex items-center gap-2.5 text-[17px] text-brand-blue">
                <MapPin className="size-[18px] shrink-0 text-brand-blue" />
                {country}
              </span>
              <small className="ml-[26px] mt-2 block text-[11px] leading-[1.6] text-brand-blue/60">
                {modes.join(" · ")}
              </small>
              <ArrowRight className="absolute right-0 top-7 size-[18px] text-brand-blue transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
