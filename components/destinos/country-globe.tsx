"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180
  const theta = ((lng + 180) * Math.PI) / 180
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

function CountryGlobeCanvas({ lat, lng }: { lat: number; lng: number }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      })
    } catch {
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    host.appendChild(renderer.domElement)
    renderer.domElement.setAttribute("aria-hidden", "true")

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20)
    camera.position.set(0, 0, 3.35)
    camera.lookAt(0, 0, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 1.7))
    const key = new THREE.DirectionalLight(0xffffff, 1.6)
    key.position.set(3, 4, 5)
    scene.add(key)
    const gold = new THREE.DirectionalLight(0xd6b36a, 0.9)
    gold.position.set(-3, -1, 2)
    scene.add(gold)

    const group = new THREE.Group()
    scene.add(group)

    // Solid globe body.
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 24),
      new THREE.MeshStandardMaterial({
        color: 0x011689,
        roughness: 0.6,
        metalness: 0.08,
        emissive: 0x011689,
        emissiveIntensity: 0.15,
      })
    )
    group.add(globe)

    // Graticule overlay (lat/long grid), gold, faint.
    const grid = new THREE.Mesh(
      new THREE.SphereGeometry(1.003, 16, 12),
      new THREE.MeshBasicMaterial({
        color: 0xd6b36a,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      })
    )
    group.add(grid)

    // Pin marking the country's capital.
    const pinPos = latLngToVector3(lat, lng, 1.03)
    const pin = new THREE.Mesh(
      new THREE.SphereGeometry(0.052, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xd6b36a })
    )
    pin.position.copy(pinPos)
    group.add(pin)

    // Soft halo ring around the pin, facing outward from the globe center.
    const halo = new THREE.Mesh(
      new THREE.RingGeometry(0.075, 0.13, 24),
      new THREE.MeshBasicMaterial({
        color: 0xd6b36a,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
      })
    )
    halo.position.copy(latLngToVector3(lat, lng, 1.035))
    halo.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), pinPos.clone().normalize())
    group.add(halo)

    // Orient the globe so the pin faces the camera at rest.
    const restRotationY = Math.atan2(-pinPos.x, pinPos.z)
    group.rotation.y = restRotationY

    function render() {
      renderer.render(scene, camera)
    }

    function resize() {
      const r = host!.getBoundingClientRect()
      if (!r.width || !r.height) return
      renderer.setSize(r.width, r.height, false)
      camera.aspect = r.width / r.height
      camera.updateProjectionMatrix()
      render()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    resize()

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let frame = 0
    let visible = true

    function loop(time: number) {
      frame = 0
      if (!visible || document.hidden) return
      if (!reduced) {
        group.rotation.y = restRotationY + Math.sin(time * 0.0006) * 0.12
        const haloScale = 1 + Math.sin(time * 0.0035) * 0.18
        halo.scale.setScalar(haloScale)
        halo.material.opacity = 0.4 + Math.sin(time * 0.0035) * 0.15
      }
      render()
      frame = requestAnimationFrame(loop)
    }

    function start() {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(loop)
    }
    function stop() {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting
        if (visible) start()
        else stop()
      },
      { threshold: 0.05 }
    )
    intersectionObserver.observe(host)

    const onVisibilityChange = () => {
      if (document.hidden) stop()
      else start()
    }
    document.addEventListener("visibilitychange", onVisibilityChange)

    start()
    if (reduced) render()

    return () => {
      stop()
      document.removeEventListener("visibilitychange", onVisibilityChange)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh
        mesh.geometry?.dispose()
        if (mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
          mats.forEach((m) => m.dispose())
        }
      })
      renderer.dispose()
      host.removeChild(renderer.domElement)
    }
  }, [lat, lng])

  return <div ref={hostRef} className="size-full [&>canvas]:size-full" />
}

/**
 * Small interactive 3D globe pinpointing one country, used on the right
 * side of each destination card. The WebGL context is only created while
 * the card is on screen (or about to be), keeping a grid of 11 cards from
 * holding 11 live contexts at once.
 */
export function CountryGlobe({
  lat,
  lng,
  country,
  className,
}: {
  lat: number
  lng: number
  country: string
  className?: string
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => setActive(entries[0].isIntersecting),
      { rootMargin: "200px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={wrapperRef}
      role="img"
      aria-label={`Mapa 3D de ${country}`}
      className={`overflow-hidden ${className ?? ""}`}
    >
      {active && <CountryGlobeCanvas lat={lat} lng={lng} />}
    </div>
  )
}
