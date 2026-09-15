"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

/**
 * Decorative 3D parcel scene for the hero. Faithful port of the original
 * vanilla Three.js scene (dist/assets/scene.js): a gold box with a blue
 * tape seal and the Boxex logo on the front face, gently rotating and
 * bobbing, reacting to pointer position. No tracking data is represented
 * by this scene — purely decorative.
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
    renderer.setClearColor(0xffffff, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    host.appendChild(renderer.domElement)
    renderer.domElement.setAttribute("aria-hidden", "true")

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(4.8, 3.3, 6.6)
    camera.lookAt(0, 0.1, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 2.1))
    const key = new THREE.DirectionalLight(0xffffff, 3.8)
    key.position.set(5, 7, 5)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0xffffff, 1)
    fill.position.set(-3, 2, -3)
    scene.add(fill)

    const group = new THREE.Group()
    scene.add(group)

    const gold = new THREE.MeshStandardMaterial({
      color: 0xd6b36a,
      roughness: 0.72,
      metalness: 0.04,
    })
    const blue = new THREE.MeshStandardMaterial({
      color: 0x011689,
      roughness: 0.52,
    })

    const box = new THREE.Mesh(new THREE.BoxGeometry(2.3, 2.25, 2.3), gold)
    group.add(box)

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(box.geometry),
      new THREE.LineBasicMaterial({ color: 0xcc9f52, transparent: true, opacity: 0.5 })
    )
    group.add(edges)

    const tape = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.014, 2.315), blue)
    tape.position.y = 1.135
    group.add(tape)

    const frontTape = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.45), blue)
    frontTape.position.set(0, 0.9, 1.156)
    group.add(frontTape)

    const backTape = frontTape.clone()
    backTape.position.z = -1.156
    backTape.rotation.y = Math.PI
    group.add(backTape)

    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(1.7, 0.67),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 })
    )
    label.position.set(0, -0.06, 1.158)
    group.add(label)

    const loader = new THREE.TextureLoader()
    loader.load("/logo.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace
      const logo = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, 0.298),
        new THREE.MeshBasicMaterial({ map: texture, transparent: true })
      )
      logo.position.set(0, -0.06, 1.163)
      group.add(logo)
      render()
    })

    const sideLabel = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 0.8),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 })
    )
    sideLabel.rotation.y = Math.PI / 2
    sideLabel.position.set(1.157, -0.15, 0)
    group.add(sideLabel)

    for (let i = 0; i < 23; i++) {
      const bar = new THREE.Mesh(
        new THREE.PlaneGeometry(i % 3 === 0 ? 0.024 : 0.01, 0.21),
        new THREE.MeshBasicMaterial({ color: 0x011689 })
      )
      bar.rotation.y = Math.PI / 2
      bar.position.set(1.162, -0.15, -0.52 + i * 0.045)
      group.add(bar)
    }

    const seam = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-1.15, 1.132, 0),
        new THREE.Vector3(1.15, 1.132, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0xcc9f52 })
    )
    group.add(seam)

    group.rotation.y = -0.12
    group.rotation.z = -0.09

    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(2, 80),
      new THREE.MeshBasicMaterial({
        color: 0x011689,
        transparent: true,
        opacity: 0.035,
        side: THREE.DoubleSide,
      })
    )
    disc.rotation.x = -Math.PI / 2
    disc.position.y = -1.7
    scene.add(disc)

    const pointer = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect()
      pointer.x = (e.clientX - r.left) / r.width - 0.5
      pointer.y = (e.clientY - r.top) / r.height - 0.5
    }
    const onPointerLeave = () => {
      pointer.x = 0
      pointer.y = 0
    }
    host.addEventListener("pointermove", onPointerMove)
    host.addEventListener("pointerleave", onPointerLeave)

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

    function loop(time: number) {
      frame = 0
      if (pausedRef.current || !visible || document.hidden) return
      group.position.y = Math.sin(time * 0.0008) * 0.105
      group.rotation.y = -0.12 + Math.sin(time * 0.0003) * 0.15 + pointer.x * 0.22
      group.rotation.x = pointer.y * 0.07
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

    const unwatchPaused = () => {
      if (pausedRef.current) stop()
      else start()
    }
    const interval = window.setInterval(unwatchPaused, 200)

    return () => {
      window.clearInterval(interval)
      stop()
      host.removeEventListener("pointermove", onPointerMove)
      host.removeEventListener("pointerleave", onPointerLeave)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh
        mesh.geometry?.dispose()
        if (mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
          mats.forEach((m) => {
            const mat = m as THREE.MeshBasicMaterial
            mat.map?.dispose()
            mat.dispose()
          })
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
