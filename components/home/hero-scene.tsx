"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

/**
 * Rotating "digital earth" globe for the Hero — brand colors only
 * (blue #011689 / gold #d6b36a), on a transparent background so the
 * light hero section shows through. No route lines, no tracking data:
 * purely a slowly spinning globe silhouette built from a dotted grid.
 */
export function HeroScene({ paused }: { paused: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(paused)
  pausedRef.current = paused

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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    host.appendChild(renderer.domElement)
    renderer.domElement.setAttribute("aria-hidden", "true")

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
    camera.position.set(0, 0.2, 7)
    camera.lookAt(0, 0, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 1.6))
    const goldLight = new THREE.DirectionalLight(0xd6b36a, 1.6)
    goldLight.position.set(4, 4, 5)
    scene.add(goldLight)
    const blueLight = new THREE.DirectionalLight(0x011689, 1.1)
    blueLight.position.set(-4, -2, 3)
    scene.add(blueLight)

    const globe = new THREE.Group()
    scene.add(globe)

    const radius = 2.2

    // Soft, light core so the far side of the dot cloud doesn't show
    // through — keeps the globe reading as a solid sphere, not a
    // scattered dark blob.
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(radius - 0.02, 48, 48),
      new THREE.MeshStandardMaterial({
        color: 0xf4f6fc,
        roughness: 0.95,
        metalness: 0,
        transparent: true,
        opacity: 0.94,
      })
    )
    globe.add(core)

    // Dotted "continents" grid via a Fibonacci sphere distribution
    const DOT_COUNT = 1100
    const dotPositions = new Float32Array(DOT_COUNT * 3)
    for (let i = 0; i < DOT_COUNT; i++) {
      const t = i / (DOT_COUNT - 1)
      const phi = Math.acos(1 - 2 * t)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      dotPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      dotPositions[i * 3 + 1] = radius * Math.cos(phi)
      dotPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
    }
    const dotGeometry = new THREE.BufferGeometry()
    dotGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dotPositions, 3)
    )
    const dots = new THREE.Points(
      dotGeometry,
      new THREE.PointsMaterial({
        color: 0x011689,
        size: 0.032,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      })
    )
    globe.add(dots)

    // Faint latitude/longitude grid for the "globe" read
    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(radius + 0.01, 24, 16),
      new THREE.MeshBasicMaterial({
        color: 0x011689,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
      })
    )
    globe.add(wire)

    // Thin gold equator ring — the only accent line, brand gold
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius + 0.03, 0.012, 8, 96),
      new THREE.MeshBasicMaterial({ color: 0xd6b36a, transparent: true, opacity: 0.5 })
    )
    ring.rotation.x = Math.PI / 2 + 0.35
    globe.add(ring)

    globe.rotation.x = 0.15

    const pointer = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect()
      pointer.x = (e.clientX - r.left) / r.width - 0.5
      pointer.y = (e.clientY - r.top) / r.height - 0.5
    }
    host.addEventListener("pointermove", onPointerMove)

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

    let frame = 0
    let visible = true

    function loop() {
      frame = 0
      if (pausedRef.current || !visible || document.hidden) return
      globe.rotation.y += 0.0022
      globe.rotation.x = 0.15 + pointer.y * 0.05
      render()
      frame = requestAnimationFrame(loop)
    }

    function start() {
      if (!frame && !pausedRef.current && visible && !document.hidden) {
        frame = requestAnimationFrame(loop)
      }
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

    const interval = window.setInterval(() => {
      if (pausedRef.current) stop()
      else start()
    }, 200)

    return () => {
      window.clearInterval(interval)
      stop()
      host.removeEventListener("pointermove", onPointerMove)
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
  }, [])

  return (
    <div
      ref={hostRef}
      id="scene"
      className="absolute inset-0 [&>canvas]:size-full"
    />
  )
}
