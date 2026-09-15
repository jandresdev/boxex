"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { countries, slugify } from "@/lib/home-data"

const modes = ["Aéreo", "Marítimo", "Marítimo express", "Terrestre"]

export function DestinosFilter() {
  const [active, setActive] = useState<string>("Todos")

  const entries = Object.entries(countries).filter(
    ([, m]) => active === "Todos" || m.includes(active)
  )

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3" role="group" aria-label="Filtrar por modalidad">
        {["Todos", ...modes].map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setActive(mode)}
            aria-pressed={active === mode}
            className={`min-h-[44px] cursor-pointer rounded-full border px-5 text-sm font-medium transition-colors ${
              active === mode
                ? "border-brand-blue bg-brand-blue text-white"
                : "border-brand-line bg-white/70 text-brand-blue backdrop-blur hover:bg-brand-pale"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
        {entries.map(([country, m]) => (
          <Link
            key={country}
            href={`/destinos/${slugify(country)}`}
            className="group relative block cursor-pointer border-b border-brand-line py-6 pr-8 transition-colors hover:bg-brand-pale"
          >
            <span className="flex items-center gap-2.5 text-[17px] text-brand-blue">
              <MapPin className="size-[18px] shrink-0 text-brand-blue" />
              {country}
            </span>
            <small className="ml-[26px] mt-2 block text-[11px] leading-[1.6] text-brand-blue/60">
              {m.join(" · ")}
            </small>
            <ArrowRight className="absolute right-0 top-7 size-[18px] text-brand-blue transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
      {entries.length === 0 && (
        <p className="py-10 text-sm text-brand-blue/60">
          No hay destinos con esa modalidad todavía.
        </p>
      )}
      <p className="mt-8 text-xs text-brand-blue/50">
        La modalidad disponible no implica un plazo ni una tarifa fija. Confirma las condiciones de tu envío antes de despacharlo.
      </p>
    </div>
  )
}
