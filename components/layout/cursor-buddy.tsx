"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const INTERACTIVE = 'a, button, summary, select, [role="button"], label[for]'
const OFFSET_X = 18
const OFFSET_Y = 20
const EASE = 0.14

/**
 * Boxy follows the mouse with a soft lag, leans into the direction of travel
 * and hops while the pointer is over a link or button. Only active on devices
 * with a precise hovering pointer and no reduced-motion preference — the CSS
 * keeps it hidden everywhere else and the effect never attaches listeners.
 * Position is written straight to the DOM in a rAF loop (no React renders per
 * frame), and the loop sleeps once Boxy has caught up with the cursor.
 */
export function CursorBuddy() {
  const rootRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const tilt = tiltRef.current
    if (!root || !tilt) return

    const query = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    )
    if (!query.matches) return

    let x = -100
    let y = -100
    let targetX = -100
    let targetY = -100
    let facing = 1
    let frame = 0
    let started = false

    const tick = () => {
      const dx = targetX - x
      const dy = targetY - y
      x += dx * EASE
      y += dy * EASE

      if (Math.abs(dx) > 1.5) facing = dx > 0 ? 1 : -1
      const lean = Math.max(-16, Math.min(16, dx * 0.35))

      root.style.transform = `translate3d(${x}px, ${y}px, 0)`
      tilt.style.transform = `rotate(${lean}deg) scaleX(${facing})`

      if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) {
        frame = 0
        return
      }
      frame = requestAnimationFrame(tick)
    }

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      targetX = e.clientX + OFFSET_X
      targetY = e.clientY + OFFSET_Y
      if (!started) {
        // First sighting: appear at the cursor instead of flying in from 0,0.
        started = true
        x = targetX
        y = targetY
      }
      root.dataset.visible = "true"
      wake()
    }

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null
      root.dataset.state = target?.closest(INTERACTIVE) ? "hop" : "idle"
    }

    const onLeave = () => {
      root.dataset.visible = "false"
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerover", onOver, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerover", onOver)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-state="idle"
      data-visible="false"
      className="cursor-buddy pointer-events-none fixed left-0 top-0 z-[90]"
    >
      <div ref={tiltRef} className="origin-bottom">
        <Image
          src="/characters/boxy-cutout.webp"
          alt=""
          width={800}
          height={709}
          sizes="64px"
          className="cursor-buddy-sprite h-auto w-14 origin-bottom drop-shadow-[0_6px_10px_rgba(4,16,46,0.3)]"
        />
      </div>
    </div>
  )
}
