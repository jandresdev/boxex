"use client"

import { useRef, type ReactNode } from "react"

/**
 * Wraps its children in a card that tilts in 3D toward the pointer
 * (perspective + rotateX/rotateY), resting at `restDeg` when idle.
 * Respects prefers-reduced-motion (stays static at the resting tilt).
 */
export function TiltCard({
  children,
  className,
  restDeg = -3,
}: {
  children: ReactNode
  className?: string
  restDeg?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(1000px) rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 14).toFixed(2)}deg) translateZ(10px)`
  }

  function handleLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(${restDeg}deg)`
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={className}
      style={{
        transform: `perspective(1000px) rotateX(0deg) rotateY(${restDeg}deg)`,
        transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  )
}
