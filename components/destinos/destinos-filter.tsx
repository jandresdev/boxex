"use client"

import { useState } from "react"
import { countries, slugify } from "@/lib/home-data"
import { DestinationCard } from "./destination-card"

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
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map(([country, m]) => (
          <DestinationCard
            key={country}
            country={country}
            modes={m}
            href={`/destinos/${slugify(country)}`}
          />
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
