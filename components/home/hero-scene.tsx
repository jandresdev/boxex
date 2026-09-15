"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

/**
 * Full-bleed rotating globe for the Hero background: a dotted "digital
 * earth" sphere with glowing gold arcs representing shipping routes,
 * slowly rotating behind the character illustration. Decorative only —
 * no tracking data is represented by this scene.
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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    host.appendChild(renderer.domElement)
    renderer.domElement.setAttribute("aria-hidden", "true")

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0.3, 7.2)
    camera.lookAt(0, 0, 0)

    scene.add(new THREE.AmbientLight(0x2a3a7a, 1.4))
    const gold = new THREE.DirectionalLight(0xd6b36a, 2.2)
    gold.position.set(4, 3, 5)
    scene.add(gold)
    const rim = new THREE.DirectionalLight(0x3d5cff, 1.4)
    rim.position.set(-5, -2, -3)
    scene.add(rim)

    const globe = new THREE.Group()
    scene.add(globe)

    // Solid inner sphere: gives the dotted grid something to read against
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(2.15, 48, 48),
      new THREE.MeshStandardMaterial({
        color: 0x04102e,
        roughness: 0.85,
        metalness: 0.1,
        transparent: true,
        opacity: 0.92,
      })
    )
    globe.add(core)

    // Dotted "digital earth" surface via a Fibonacci sphere distribution
    const DOT_COUNT = 900
    const dotPositions = new Float32Array(DOT_COUNT * 3)
    const dotRadius = 2.18
    for (let i = 0; i < DOT_COUNT; i++) {
      const t = i / (DOT_COUNT - 1)
      const phi = Math.acos(1 - 2 * t)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      dotPositions[i * 3] = dotRadius * Math.sin(phi) * Math.cos(theta)
      dotPositions[i * 3 + 1] = dotRadius * Math.cos(phi)
      dotPositions[i * 3 + 2] = dotRadius * Math.sin(phi) * Math.sin(theta)
    }
    const dotGeometry = new THREE.BufferGeometry()
    dotGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dotPositions, 3)
    )
    const dots = new THREE.Points(
      dotGeometry,
      new THREE.PointsMaterial({
        color: 0x8fb4ff,
        size: 0.028,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
      })
    )
    globe.add(dots)

    // Latitude/longitude wire grid for the "globe" read
    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 20, 14),
      new THREE.MeshBasicMaterial({
        color: 0x3d5cff,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      })
    )
    globe.add(wire)

    // Outer atmosphere glow
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.42, 48, 48),
      new THREE.MeshBasicMaterial({
        color: 0xd6b36a,
        transparent: true,
        opacity: 0.06,
        side: THREE.BackSide,
      })
    )
    globe.add(atmosphere)

    // Gold shipping-route arcs between points on the sphere
    function arcBetween(a: THREE.Vector3, b: THREE.Vector3) {
      const mid = a.clone().add(b).multiplyScalar(0.5)
      mid.normalize().multiplyScalar(dotRadius + 1.1)
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
      const tube = new THREE.TubeGeometry(curve, 48, 0.012, 8, false)
      return new THREE.Mesh(
        tube,
        new THREE.MeshBasicMaterial({
          color: 0xd6b36a,
          transparent: true,
          opacity: 0.85,
        })
      )
    }

    function pointOnSphere(latDeg: number, lonDeg: number) {
      const lat = (latDeg * Math.PI) / 180
      const lon = (lonDeg * Math.PI) / 180
      return new THREE.Vector3(
        dotRadius * Math.cos(lat) * Math.cos(lon),
        dotRadius * Math.sin(lat),
        dotRadius * Math.cos(lat) * Math.sin(lon)
      )
    }

    // Miami (USA) as the hub, arcing out to Boxex's destination countries
    const hub = pointOnSphere(25.8, -80.2)
    const destinations: [number, number][] = [
      [4.6, -74.1], // Colombia
      [10.5, -66.9], // Venezuela
      [19.4, -99.1], // México
      [-0.2, -78.5], // Ecuador
      [18.5, -69.9], // República Dominicana
    ]
    const arcs = destinations.map((d) => arcBetween(hub, pointOnSphere(d[0], d[1])))
    arcs.forEach((arc) => globe.add(arc))

    globe.rotation.x = 0.25
    globe.rotation.y = -0.4

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
      globe.rotation.y += 0.0018
      globe.rotation.x = 0.25 + pointer.y * 0.08
      arcs.forEach((arc, i) => {
        const mat = arc.material as THREE.MeshBasicMaterial
        mat.opacity = 0.45 + 0.4 * Math.abs(Math.sin(Date.now() * 0.0006 + i))
      })
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
