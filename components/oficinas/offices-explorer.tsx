"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import dynamic from "next/dynamic"
import {
  ArrowUpRight,
  BadgeCheck,
  Box,
  CircleAlert,
  Crosshair,
  LocateFixed,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  X,
} from "lucide-react"
import { offices, type Office, type OfficeCountry } from "@/lib/pages-data"

const OfficeMap = dynamic(() => import("./office-map"), {
  ssr: false,
  loading: () => <MapPlaceholder label="Cargando mapa…" />,
})

type CountryFilter = "all" | OfficeCountry

const COUNTRIES: OfficeCountry[] = ["Estados Unidos", "Colombia", "Guatemala"]

function normalize(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
}

function formatPhone(e164: string) {
  const d = e164.replace(/\D/g, "")
  if (d.startsWith("1") && d.length === 11) return `+1 (${d.slice(1, 4)}) ${d.slice(4, 7)} ${d.slice(7)}`
  if (d.startsWith("57") && d.length === 12) return `+57 (${d.slice(2, 5)}) ${d.slice(5, 8)} ${d.slice(8)}`
  if (d.startsWith("502") && d.length === 11) return `+502 ${d.slice(3, 7)} ${d.slice(7)}`
  return e164
}

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371
  const toRad = (x: number) => (x * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

function directionsUrl(o: Office) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${o.address}, ${o.country}`)}`
}

function osmUrl(o: Office) {
  return `https://www.openstreetmap.org/?mlat=${o.lat}&mlon=${o.lng}#map=17/${o.lat}/${o.lng}`
}

/** Where the coordinates of an office come from (shown for transparency). */
function precisionNote(o: Office) {
  if (o.precision === "aproximada") {
    return "Ubicación aproximada (calle o punto de referencia). Confirma la dirección con la oficina."
  }
  return o.country === "Estados Unidos"
    ? "Dirección verificada con el geocodificador oficial del Censo de EE. UU."
    : "Dirección verificada en OpenStreetMap."
}

function MapPlaceholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(1,22,137,0.12),transparent_60%),#eef1f8]">
      <span className="flex items-center gap-2 text-sm text-brand-blue/60">
        <MapPin className="size-4 animate-pulse" />
        {label}
      </span>
    </div>
  )
}

function PrecisionBadge({ office }: { office: Office }) {
  const exact = office.precision === "exacta"
  return (
    <span
      title={precisionNote(office)}
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
        exact ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      {exact ? <BadgeCheck className="size-3.5" /> : <CircleAlert className="size-3.5" />}
      {exact ? "Ubicación verificada" : "Ubicación aproximada"}
    </span>
  )
}

export function OfficesExplorer() {
  const [query, setQuery] = useState("")
  const [country, setCountry] = useState<CountryFilter>("all")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [fitSignal, setFitSignal] = useState(0)
  const [tilt, setTilt] = useState(false)
  const [mapFailed, setMapFailed] = useState(false)
  const [armed, setArmed] = useState(false)
  const [geo, setGeo] = useState<{
    status: "idle" | "loading" | "error"
    message?: string
  }>({ status: "idle" })
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [nearest, setNearest] = useState<{ id: string; km: number } | null>(null)

  const mapBoxRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Load the map engine only when the map is about to be on screen.
  useEffect(() => {
    const el = mapBoxRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setArmed(true)
          io.disconnect()
        }
      },
      { rootMargin: "300px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const filtered = useMemo(() => {
    const q = normalize(query)
    return offices.filter(
      (o) =>
        (country === "all" || o.country === country) &&
        (!q || normalize(`${o.country} ${o.city} ${o.address}`).includes(q))
    )
  }, [query, country])

  const visibleIds = useMemo(() => new Set(filtered.map((o) => o.id)), [filtered])
  const selected = offices.find((o) => o.id === selectedId) ?? null

  // Keep the selected card in view in the list.
  useEffect(() => {
    if (!selectedId) return
    const el = listRef.current?.querySelector<HTMLElement>(`[data-office="${selectedId}"]`)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el?.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" })
  }, [selectedId])

  function select(id: string) {
    setSelectedId(id)
  }

  function resetView() {
    setSelectedId(null)
    setTilt(false)
    setFitSignal((n) => n + 1)
  }

  function changeFilters(next: { query?: string; country?: CountryFilter }) {
    if (next.query !== undefined) setQuery(next.query)
    if (next.country !== undefined) setCountry(next.country)
    setSelectedId(null)
    setFitSignal((n) => n + 1)
  }

  function locate() {
    if (!("geolocation" in navigator)) {
      setGeo({ status: "error", message: "Tu navegador no permite obtener la ubicación." })
      return
    }
    setGeo({ status: "loading" })
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const me = { lat: pos.coords.latitude, lng: pos.coords.longitude }
        let best = offices[0]
        let bestKm = Infinity
        for (const o of offices) {
          const km = distanceKm(me, o)
          if (km < bestKm) {
            best = o
            bestKm = km
          }
        }
        setUserLocation(me)
        setNearest({ id: best.id, km: bestKm })
        setQuery("")
        setCountry("all")
        setSelectedId(best.id)
        setGeo({ status: "idle" })
      },
      (err) => {
        setGeo({
          status: "error",
          message:
            err.code === err.PERMISSION_DENIED
              ? "No tenemos permiso para ver tu ubicación. Puedes buscar tu ciudad en la lista."
              : "No pudimos obtener tu ubicación. Intenta de nuevo o busca tu ciudad.",
        })
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    )
  }

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: offices.length }
    offices.forEach((o) => (c[o.country] = (c[o.country] ?? 0) + 1))
    return c
  }, [])

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <label className="block w-full max-w-md">
          <span className="mb-2 block text-sm font-semibold text-brand-blue">
            Busca por ciudad o dirección
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => changeFilters({ query: e.target.value })}
            placeholder="Miami, Cali, New York…"
            className="w-full rounded-md border border-brand-line bg-white/80 px-4 py-3 text-[15px] text-brand-blue backdrop-blur placeholder:text-brand-blue/40 focus:border-brand-blue focus:outline-none"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div role="group" aria-label="Filtrar por país" className="flex flex-wrap gap-2">
            {(["all", ...COUNTRIES] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={country === c}
                onClick={() => changeFilters({ country: c })}
                className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                  country === c
                    ? "border-brand-blue bg-brand-blue text-white"
                    : "border-brand-line bg-white text-brand-blue hover:border-brand-blue/50"
                }`}
              >
                {c === "all" ? "Todas" : c}{" "}
                <span className={country === c ? "text-white/70" : "text-brand-blue/50"}>
                  {counts[c]}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={locate}
            disabled={geo.status === "loading"}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-gold px-4 py-2 text-[13px] font-semibold text-brand-blue transition-colors hover:bg-brand-gold/90 disabled:opacity-60"
          >
            <LocateFixed className="size-4" />
            {geo.status === "loading" ? "Buscando…" : "Oficina más cercana"}
          </button>
        </div>
      </div>

      <p className="mb-4 text-[13px] text-brand-blue/60" aria-live="polite">
        {geo.status === "error" ? (
          <span className="text-amber-700">{geo.message}</span>
        ) : (
          <>
            {filtered.length} {filtered.length === 1 ? "oficina" : "oficinas"}
            {nearest && (
              <>
                {" "}
                · Tu oficina más cercana está a{" "}
                {nearest.km < 1 ? "menos de 1" : Math.round(nearest.km).toLocaleString("es-CO")} km
                (tu ubicación no se guarda ni se envía).
              </>
            )}
          </>
        )}
      </p>

      <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
        {/* List */}
        <ul
          ref={listRef}
          aria-label="Lista de oficinas"
          className="order-2 flex max-h-[640px] flex-col gap-3 overflow-y-auto pr-1 lg:order-1"
        >
          {filtered.map((office) => {
            const active = office.id === selectedId
            return (
              <li
                key={office.id}
                data-office={office.id}
                onMouseEnter={() => setHoveredId(office.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`rounded-xl border bg-white/70 p-4 backdrop-blur-lg transition-all ${
                  active
                    ? "border-brand-blue shadow-[0_15px_40px_rgba(1,22,137,0.12)]"
                    : "border-white/60 hover:shadow-[0_10px_30px_rgba(1,22,137,0.08)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => select(office.id)}
                  aria-pressed={active}
                  className="block w-full cursor-pointer text-left"
                >
                  <span className="mb-0.5 block text-xs font-medium text-brand-gold">
                    {office.country}
                  </span>
                  <h3 className="mb-1.5 text-base font-semibold text-brand-blue">{office.city}</h3>
                  <span className="flex items-start gap-2 text-sm text-brand-blue/70">
                    <MapPin className="mt-0.5 size-4 shrink-0" />
                    {office.address}
                  </span>
                </button>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
                  <a
                    href={`tel:${office.tel}`}
                    className="inline-flex items-center gap-1.5 font-medium text-brand-blue hover:underline"
                  >
                    <Phone className="size-3.5" />
                    {formatPhone(office.tel)}
                  </a>
                  <a
                    href={directionsUrl(office)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-brand-blue underline"
                  >
                    Cómo llegar <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </li>
            )
          })}
          {filtered.length === 0 && (
            <li className="py-8 text-sm text-brand-blue/60">
              No encontramos esa ciudad.{" "}
              <a href="/contacto" className="underline">
                Consulta con el equipo
              </a>
              .
            </li>
          )}
        </ul>

        {/* Map */}
        <div
          id="mapa"
          ref={mapBoxRef}
          className="relative order-1 h-[460px] scroll-mt-32 overflow-hidden rounded-3xl border border-brand-line bg-[#eef1f8] shadow-[0_25px_60px_rgba(1,22,137,0.12)] sm:h-[540px] lg:order-2 lg:h-[640px]"
        >
          {mapFailed ? (
            <MapPlaceholder label="No pudimos cargar el mapa. Usa la lista: cada oficina enlaza a Google Maps." />
          ) : armed ? (
            <OfficeMap
              offices={offices}
              visibleIds={visibleIds}
              selectedId={selectedId}
              hoveredId={hoveredId}
              onSelect={select}
              fitSignal={fitSignal}
              tilt={tilt}
              userLocation={userLocation}
              onError={() => setMapFailed(true)}
            />
          ) : (
            <MapPlaceholder label="Cargando mapa…" />
          )}

          {!mapFailed && (
            <div className="absolute left-3 top-3 z-10 flex gap-2">
              <button
                type="button"
                onClick={resetView}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-brand-blue shadow-[0_6px_20px_rgba(1,22,137,0.18)] transition-transform hover:-translate-y-0.5"
              >
                <Crosshair className="size-3.5" />
                Ver todas
              </button>
              <button
                type="button"
                aria-pressed={tilt}
                onClick={() => setTilt((t) => !t)}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold shadow-[0_6px_20px_rgba(1,22,137,0.18)] transition-transform hover:-translate-y-0.5 ${
                  tilt ? "bg-brand-blue text-white" : "bg-white text-brand-blue"
                }`}
              >
                <Box className="size-3.5" />
                Vista 3D
              </button>
            </div>
          )}

          {/* Selected office card */}
          {selected && !mapFailed && (
            <section
              aria-label={`Oficina seleccionada: ${selected.city}`}
              className="office-card absolute inset-x-3 bottom-3 z-10 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-[0_20px_50px_rgba(1,22,137,0.25)] backdrop-blur sm:right-auto sm:max-w-[380px] sm:p-5"
            >
              <button
                type="button"
                onClick={resetView}
                aria-label="Cerrar detalle de la oficina"
                className="absolute right-3 top-3 grid size-7 cursor-pointer place-items-center rounded-full text-brand-blue/60 hover:bg-brand-pale hover:text-brand-blue"
              >
                <X className="size-4" />
              </button>
              <span className="mb-0.5 block text-xs font-medium text-brand-gold">
                {selected.country}
              </span>
              <h3 className="mb-1 pr-8 text-lg font-semibold text-brand-blue">{selected.city}</h3>
              <p className="mb-2 text-sm text-brand-blue/75">{selected.address}</p>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <PrecisionBadge office={selected} />
                {nearest?.id === selected.id && (
                  <span className="rounded-full bg-brand-pale px-2 py-0.5 text-[11px] font-medium text-brand-blue">
                    A {nearest.km < 1 ? "menos de 1" : Math.round(nearest.km).toLocaleString("es-CO")} km de ti
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 text-[13px]">
                <a
                  href={`tel:${selected.tel}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue px-3.5 py-2 font-semibold text-white hover:bg-brand-blue/90"
                >
                  <Phone className="size-3.5" />
                  {formatPhone(selected.tel)}
                </a>
                {selected.whatsapp && (
                  <a
                    href={`https://wa.me/${selected.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1fb45b] px-3.5 py-2 font-semibold text-white hover:opacity-90"
                  >
                    <MessageCircle className="size-3.5" />
                    WhatsApp
                  </a>
                )}
                {selected.email && (
                  <a
                    href={`mailto:${selected.email}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand-line px-3.5 py-2 font-medium text-brand-blue hover:bg-brand-pale"
                  >
                    <Mail className="size-3.5" />
                    Correo
                  </a>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
                <a
                  href={directionsUrl(selected)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-brand-blue underline"
                >
                  Cómo llegar <ArrowUpRight className="size-3.5" />
                </a>
                <a
                  href={osmUrl(selected)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brand-blue/70 underline"
                >
                  Ver en OpenStreetMap <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </section>
          )}
        </div>
      </div>

      <p className="mt-8 max-w-3xl text-xs leading-[1.7] text-brand-blue/55">
        Direcciones, teléfonos, WhatsApp y correos según boxexpress.com
        (consultado el 13 de octubre de 2026). Coordenadas: geocodificador del
        Censo de EE. UU. (Estados Unidos) y OpenStreetMap (Colombia y
        Guatemala; algunas aproximadas). Mapa © OpenStreetMap contributors,
        OpenFreeMap. Confirma el horario y la disponibilidad del servicio antes
        de visitar la oficina.
      </p>
    </div>
  )
}
