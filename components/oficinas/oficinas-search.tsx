"use client"

import { useMemo, useState } from "react"
import { MapPin, Phone } from "lucide-react"
import { offices } from "@/lib/pages-data"

function normalize(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
}

export function OficinasSearch() {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = normalize(query)
    if (!q) return offices
    return offices.filter((o) =>
      normalize(`${o.country} ${o.city} ${o.address}`).includes(q)
    )
  }, [query])

  return (
    <div>
      <label className="mb-6 block max-w-md">
        <span className="mb-2 block text-sm font-semibold text-brand-blue">
          Busca por ciudad o dirección
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Miami, Cali, New York…"
          className="w-full rounded-md border border-brand-line bg-white/80 px-4 py-3 text-[15px] text-brand-blue placeholder:text-brand-blue/40 backdrop-blur focus:border-brand-blue focus:outline-none"
        />
      </label>
      <p className="mb-6 text-[13px] text-brand-blue/60" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "oficina" : "oficinas"}
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((office) => (
          <article
            key={office.city}
            className="rounded-xl border border-white/60 bg-white/70 p-6 backdrop-blur-lg transition-shadow hover:shadow-[0_15px_40px_rgba(1,22,137,0.08)]"
          >
            <span className="mb-1 block text-xs font-medium text-brand-gold">
              {office.country}
            </span>
            <h2 className="mb-2 text-lg font-semibold text-brand-blue">
              {office.city}
            </h2>
            <p className="mb-3 flex items-start gap-2 text-sm text-brand-blue/70">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              {office.address}
            </p>
            <a
              href={`tel:${office.tel}`}
              className="flex items-center gap-2 text-sm font-medium text-brand-blue hover:underline"
            >
              <Phone className="size-4" />
              {office.tel}
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                office.address + " " + office.country
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm text-brand-blue underline"
            >
              Ver dirección en mapa ↗
            </a>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-10 text-sm text-brand-blue/60">
          No encontramos esa ciudad.{" "}
          <a href="/contacto" className="underline">
            Consulta con el equipo
          </a>
          .
        </p>
      )}
      <p className="mt-8 text-xs text-brand-blue/50">
        Confirma el horario y la disponibilidad del servicio antes de visitar
        la oficina.
      </p>
    </div>
  )
}
