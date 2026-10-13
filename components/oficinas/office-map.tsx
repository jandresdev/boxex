"use client"

import { useEffect, useRef } from "react"
import * as maplibregl from "maplibre-gl"
import type { Map as MlMap, Marker } from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import type { Office } from "@/lib/pages-data"

// MapLibre parses vector tiles in a module worker. The bundler can't infer it
// from inside the library, so we hand it the worker file as a static asset.
maplibregl.setWorkerUrl(
  new URL("../../node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs", import.meta.url).toString()
)

// OpenFreeMap: vector tiles from OpenStreetMap data, free for commercial use,
// no API key. Attribution is rendered by MapLibre's attribution control.
const STYLE_URL = "https://tiles.openfreemap.org/styles/liberty"

const PIN_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="m7.5 4.27 9 5.15"/></svg>`

type Props = {
  offices: Office[]
  visibleIds: ReadonlySet<string>
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  /** Increment to re-fit the map to the visible offices. */
  fitSignal: number
  tilt: boolean
  userLocation: { lat: number; lng: number } | null
  onError: () => void
}

function boundsOf(list: { lat: number; lng: number }[]) {
  const b = new maplibregl.LngLatBounds()
  list.forEach((o) => b.extend([o.lng, o.lat]))
  return b
}

/**
 * MapLibre map with one branded marker per office. The parent owns the state
 * (selection, filters, tilt); this component only mirrors it onto the map:
 * markers show/hide with the filters, the selected office gets a fly-to (with
 * 3D buildings when tilted) and the pin pulses.
 */
export default function OfficeMap({
  offices,
  visibleIds,
  selectedId,
  hoveredId,
  onSelect,
  fitSignal,
  tilt,
  userLocation,
  onError,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MlMap | null>(null)
  const markersRef = useRef<Map<string, { marker: Marker; root: HTMLElement; pin: HTMLElement }>>(new Map())
  const userMarkerRef = useRef<Marker | null>(null)

  // Latest props for event handlers created once.
  const onSelectRef = useRef(onSelect)
  const onErrorRef = useRef(onError)
  useEffect(() => {
    onSelectRef.current = onSelect
    onErrorRef.current = onError
  })

  // Create the map once.
  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let map: MlMap
    try {
      map = new maplibregl.Map({
        container: host,
        style: STYLE_URL,
        bounds: boundsOf(offices),
        fitBoundsOptions: { padding: 56 },
        attributionControl: { compact: true },
        cooperativeGestures: false,
        maxPitch: 70,
      })
    } catch {
      onErrorRef.current()
      return
    }
    mapRef.current = map
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right")
    map.on("error", (e) => {
      // Tile/style failures: surface only if the base style never loaded.
      if (!map.isStyleLoaded() && String(e?.error?.message ?? "").includes("style")) {
        onErrorRef.current()
      }
    })

    const markers = markersRef.current
    offices.forEach((o) => {
      const root = document.createElement("div")
      root.className = "office-marker"
      const pin = document.createElement("button")
      pin.type = "button"
      pin.className = "office-pin"
      pin.setAttribute("aria-label", `${o.city}: ${o.address}`)
      pin.innerHTML = PIN_SVG
      pin.addEventListener("click", (e) => {
        e.stopPropagation()
        onSelectRef.current(o.id)
      })
      const label = document.createElement("span")
      label.className = "office-pin-label"
      label.textContent = o.city
      root.append(pin, label)
      const marker = new maplibregl.Marker({ element: root, anchor: "center" })
        .setLngLat([o.lng, o.lat])
        .addTo(map)
      markers.set(o.id, { marker, root, pin })
    })

    const ro = new ResizeObserver(() => map.resize())
    ro.observe(host)

    return () => {
      ro.disconnect()
      markers.forEach(({ marker }) => marker.remove())
      markers.clear()
      userMarkerRef.current?.remove()
      userMarkerRef.current = null
      map.remove()
      mapRef.current = null
    }
    // offices is a static module-level list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Filters → marker visibility.
  useEffect(() => {
    markersRef.current.forEach(({ root }, id) => {
      root.style.display = visibleIds.has(id) ? "" : "none"
    })
  }, [visibleIds])

  // Selection / hover → pin state.
  useEffect(() => {
    markersRef.current.forEach(({ root, pin }, id) => {
      const active = id === selectedId
      pin.dataset.active = String(active)
      pin.dataset.hover = String(id === hoveredId && !active)
      root.style.zIndex = active ? "3" : id === hoveredId ? "2" : "1"
    })
  }, [selectedId, hoveredId])

  // Fly to the selection; fit the visible set when nothing is selected.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const selected = offices.find((o) => o.id === selectedId)
    if (selected) {
      // On phones the detail card covers the lower part of the map: keep the
      // pin above it.
      const compact = window.innerWidth < 640
      map.flyTo({
        center: [selected.lng, selected.lat],
        padding: compact ? { top: 20, bottom: 250, left: 0, right: 0 } : { top: 0, bottom: 0, left: 0, right: 0 },
        zoom: selected.precision === "exacta" ? 16.2 : 14.2,
        pitch: tilt ? 60 : 0,
        bearing: tilt ? -17 : 0,
        duration: 2200,
        curve: 1.5,
      })
      return
    }
    const visible = offices.filter((o) => visibleIds.has(o.id))
    if (visible.length === 0) return
    map.fitBounds(boundsOf(visible), {
      padding: 64,
      maxZoom: visible.length === 1 ? 13 : 9,
      pitch: 0,
      bearing: 0,
      duration: 1600,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, fitSignal, offices])

  // Tilt toggle (3D buildings show up at high zoom).
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    map.easeTo({ pitch: tilt ? 60 : 0, bearing: tilt ? -17 : 0, duration: 900 })
  }, [tilt])

  // "You are here" dot.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    userMarkerRef.current?.remove()
    userMarkerRef.current = null
    if (!userLocation) return
    const el = document.createElement("div")
    el.className = "user-dot"
    el.setAttribute("aria-label", "Tu ubicación")
    userMarkerRef.current = new maplibregl.Marker({ element: el })
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(map)
  }, [userLocation])

  return (
    // MapLibre's stylesheet sets `position: relative` on its container, which
    // would override an `absolute inset-0` class; so the map host fills a
    // positioned wrapper instead.
    <div className="absolute inset-0">
      <div
        ref={hostRef}
        role="region"
        aria-label="Mapa interactivo de oficinas de Boxex"
        className="size-full"
      />
    </div>
  )
}
