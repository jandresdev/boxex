"use client"

import { useState } from "react"
import { useSearchParams, type ReadonlyURLSearchParams } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { countries } from "@/lib/home-data"
import { WHATSAPP_URL } from "@/lib/home-data"

const serviceOptions = [
  "Envío internacional",
  "Recogida en casa",
  "Casillero virtual",
  "Exportación desde Colombia",
]

const serviceSlugMap: Record<string, string> = {
  "envios-internacionales": "Envío internacional",
  "recogida-en-casa": "Recogida en casa",
  "casillero-virtual": "Casillero virtual",
  exportaciones: "Exportación desde Colombia",
}

function serviceFromParams(params: ReadonlyURLSearchParams) {
  const servicio = params.get("servicio")
  return servicio && serviceSlugMap[servicio]
    ? serviceSlugMap[servicio]
    : serviceOptions[0]
}

function destinationFromParams(params: ReadonlyURLSearchParams) {
  const destino = params.get("destino")
  const match = Object.keys(countries).find(
    (c) => c.toLowerCase().replace(/[^a-z]/g, "") === destino?.replace(/-/g, "")
  )
  return match ?? Object.keys(countries)[0]
}

export function QuoteForm() {
  const params = useSearchParams()
  const [service, setService] = useState(() => serviceFromParams(params))
  const [origin, setOrigin] = useState(() =>
    serviceFromParams(params) === "Exportación desde Colombia"
      ? "Colombia"
      : "Estados Unidos"
  )
  const [destination, setDestination] = useState(() =>
    destinationFromParams(params)
  )
  const [city, setCity] = useState("")
  const [toCity, setToCity] = useState("")
  const [content, setContent] = useState("")
  const [weight, setWeight] = useState("")
  const [dimensions, setDimensions] = useState("")
  const [result, setResult] = useState<string | null>(null)

  function handleServiceChange(value: string) {
    setService(value)
    setOrigin(value === "Exportación desde Colombia" ? "Colombia" : "Estados Unidos")
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const message = `Hola, Boxex. Quiero consultar una cotización.
Servicio: ${service}
Origen: ${city.trim()}, ${origin}
Destino: ${toCity.trim()}, ${destination}
Contenido: ${content.trim()}
Peso aproximado: ${weight ? weight + " lb" : "por confirmar"}
Medidas: ${dimensions || "por confirmar"}
Por favor, confirmen cobertura, costo completo, condiciones y tiempo estimado.`
    setResult(message)
  }

  const inputClass =
    "mt-2 block w-full rounded-md border border-brand-line bg-white/80 px-3 py-3 text-[15px] text-brand-blue placeholder:text-brand-blue/40 backdrop-blur focus:border-brand-blue focus:outline-none"

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-white/60 bg-white/60 p-7 shadow-[0_20px_60px_rgba(1,22,137,0.08)] backdrop-blur-xl sm:p-9">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-brand-blue">
            ¿Qué necesitas?
            <select
              className={inputClass}
              value={service}
              onChange={(e) => handleServiceChange(e.target.value)}
            >
              {serviceOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-semibold text-brand-blue">
            País de origen
            <select className={inputClass} value={origin} onChange={(e) => setOrigin(e.target.value)}>
              <option>Estados Unidos</option>
              <option>Colombia</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-brand-blue">
            Ciudad de origen
            <input
              className={inputClass}
              required
              maxLength={80}
              placeholder={origin === "Colombia" ? "Ej. Bogotá" : "Ej. Miami"}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-brand-blue">
            País de destino
            <select
              className={inputClass}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              {Object.keys(countries).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-semibold text-brand-blue">
            Ciudad de destino
            <input
              className={inputClass}
              required
              maxLength={80}
              placeholder="Ej. Cali"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-brand-blue">
            ¿Qué vas a enviar?
            <input
              className={inputClass}
              required
              maxLength={160}
              placeholder="Describe los artículos"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-brand-blue">
            Peso aproximado (lb)
            <input
              className={inputClass}
              type="number"
              min="0.1"
              step="0.1"
              placeholder="Opcional"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-brand-blue">
            Medidas en cm (largo × ancho × alto)
            <input
              className={inputClass}
              maxLength={80}
              placeholder="Opcional"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
            />
          </label>
        </div>
        <p className="mt-6 text-xs text-brand-blue/60">
          No se calcula un precio automático. El costo y las condiciones los
          confirma el equipo de Boxex.
        </p>
        <Button type="submit" className="mt-5 cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
          Preparar consulta
          <ArrowRight />
        </Button>

        {result && (
          <div className="mt-8 border-t border-brand-line pt-8" aria-live="polite">
            <h2 className="mb-2 text-lg font-semibold text-brand-blue">
              Tu consulta está lista
            </h2>
            <p className="mb-4 whitespace-pre-line text-sm text-brand-blue/80">{result}</p>
            <Button asChild className="cursor-pointer bg-brand-gold text-brand-blue hover:bg-brand-gold/90">
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(result)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Continuar por WhatsApp ↗
              </a>
            </Button>
            <p className="mt-3 text-xs text-brand-blue/50">
              Se abrirá un mensaje preparado. Tú decides cuándo enviarlo. Aún
              no se ha enviado una solicitud.
            </p>
          </div>
        )}
      </form>

      <aside className="rounded-2xl border border-brand-line p-7 sm:p-9">
        <h2 className="mb-4 text-xl font-semibold text-brand-blue">
          El precio completo importa.
        </h2>
        <p className="mb-3 text-sm text-brand-blue/70">
          Antes de confirmar, pide que la cotización detalle:
        </p>
        <ul className="mb-6 list-disc space-y-2 pl-5 text-sm text-brand-blue/70">
          <li>Flete y modalidad de transporte</li>
          <li>Cargos adicionales, si aplican</li>
          <li>Seguro y condiciones de cobertura</li>
          <li>Tratamiento de impuestos y aduanas</li>
          <li>Tiempo estimado y condiciones de entrega</li>
        </ul>
        <p className="mb-2 text-sm text-brand-blue/70">¿Prefieres hablar directamente?</p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-brand-blue underline"
        >
          WhatsApp de atención ↗
        </a>
      </aside>
    </div>
  )
}
