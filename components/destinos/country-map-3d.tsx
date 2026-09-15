"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { countryGeoData } from "@/lib/country-geo-data"

const PLATE_DEPTH = 0.11

function buildShape(polygon: number[][][]) {
  const [outer, ...holes] = polygon
  const shape = new THREE.Shape()
  outer.forEach(([x, y], i) => {
    // Flip the projection's Y (south-positive) so the shape reads
    // north-up, like a normal map, before any 3D tilt is applied.
    if (i === 0) shape.moveTo(x, -y)
    else shape.lineTo(x, -y)
  })
  for (const hole of holes) {
    const path = new THREE.Path()
    hole.forEach(([x, y], i) => {
      if (i === 0) path.moveTo(x, -y)
      else path.lineTo(x, -y)
    })
    shape.holes.push(path)
  }
  return shape
}

function CountryMapCanvas({ country }: { country: string }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const geo = countryGeoData[country]
    if (!host || !geo) return

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
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 20)
    camera.position.set(0, 1.55, 2.05)
    camera.lookAt(0, -0.05, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 1.9))
    const key = new THREE.DirectionalLight(0xffffff, 1.9)
    key.position.set(2.5, 4, 3)
    scene.add(key)
    const gold = new THREE.DirectionalLight(0xd6b36a, 1.1)
    gold.position.set(-2.5, 1.5, -1.5)
    scene.add(gold)

    const group = new THREE.Group()
    // Lay the plate down like a tabletop map, tilted toward the camera.
    group.rotation.x = -1.05
    scene.add(group)

    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0x011689,
      roughness: 0.55,
      metalness: 0.06,
      emissive: 0x011689,
      emissiveIntensity: 0.12,
    })
    const sideMaterial = new THREE.MeshStandardMaterial({
      color: 0x00104f,
      roughness: 0.7,
    })

    let maxSpan = 0.0001
    for (const polygon of geo.polygons) {
      const shape = buildShape(polygon)
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: PLATE_DEPTH,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.014,
        bevelSegments: 2,
        curveSegments: 6,
      })
      geometry.computeBoundingBox()
      const bb = geometry.boundingBox
      if (bb) {
        maxSpan = Math.max(
          maxSpan,
          bb.max.x - bb.min.x,
          bb.max.y - bb.min.y
        )
      }
      const mesh = new THREE.Mesh(geometry, [sideMaterial, capMaterial])
      group.add(mesh)

      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry, 25),
        new THREE.LineBasicMaterial({
          color: 0xd6b36a,
          transparent: true,
          opacity: 0.35,
        })
      )
      group.add(edges)
    }

    // Scale the whole plate to fill a consistent frame regardless of
    // each country's own aspect ratio (Chile-tall vs. Ecuador-round).
    const fitScale = 1.55 / maxSpan
    group.scale.setScalar(fitScale)

    const [pinX, pinYRaw] = geo.pin
    const pinX3 = pinX * fitScale
    const pinZ3 = -pinYRaw * fitScale
    const pinBaseY = PLATE_DEPTH * fitScale

    const pinGroup = new THREE.Group()
    pinGroup.position.set(pinX3, pinBaseY, pinZ3)
    group.add(pinGroup)

    const stick = new THREE.Mesh(
      new THREE.CylinderGeometry(0.008, 0.008, 0.16, 8),
      new THREE.MeshBasicMaterial({ color: 0xd6b36a })
    )
    stick.position.y = 0.08
    pinGroup.add(stick)

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0xd6b36a,
        emissive: 0xd6b36a,
        emissiveIntensity: 0.4,
        roughness: 0.35,
      })
    )
    head.position.y = 0.17
    pinGroup.add(head)

    const halo = new THREE.Mesh(
      new THREE.RingGeometry(0.06, 0.11, 28),
      new THREE.MeshBasicMaterial({
        color: 0xd6b36a,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
      })
    )
    halo.rotation.x = -Math.PI / 2
    halo.position.y = 0.002
    pinGroup.add(halo)

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
    const baseRotationY = group.rotation.y

    let frame = 0
    let visible = true

    function loop(time: number) {
      frame = 0
      if (!visible || document.hidden) return
      if (!reduced) {
        group.rotation.y = baseRotationY + Math.sin(time * 0.00055) * 0.16
        group.position.y = Math.sin(time * 0.0009) * 0.02
        const haloScale = 1 + Math.sin(time * 0.0035) * 0.2
        halo.scale.setScalar(haloScale)
        ;(halo.material as THREE.MeshBasicMaterial).opacity =
          0.4 + Math.sin(time * 0.0035) * 0.15
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
  }, [country])

  return <div ref={hostRef} className="size-full [&>canvas]:size-full" />
}

/**
 * A small 3D relief map of one country's real border, with a gold pin
 * marking its capital, shown on the right side of each destination
 * card. Lazily mounts its WebGL context only while on/near screen, so
 * a grid of 11 cards never holds more than a handful of live contexts
 * at once.
 */
export function CountryMap3D({
  country,
  className,
}: {
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

  if (!countryGeoData[country]) return null

  return (
    <div
      ref={wrapperRef}
      role="img"
      aria-label={`Mapa 3D de ${country}`}
      className={`overflow-hidden ${className ?? ""}`}
    >
      {active && <CountryMapCanvas country={country} />}
    </div>
  )
}
