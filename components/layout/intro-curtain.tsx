"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const SESSION_KEY = "boxex-intro-shown"

/**
 * One-time splash shown on the first page load of a browser session (not on
 * every internal navigation) — gated by sessionStorage so it survives a
 * reload but not a fresh tab. Skips entirely under prefers-reduced-motion.
 */
export function IntroCurtain() {
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        sessionStorage.setItem(SESSION_KEY, "1")
        return
      }
      sessionStorage.setItem(SESSION_KEY, "1")
    } catch {
      return
    }

    // Must start hidden to match the server-rendered (no sessionStorage)
    // output, then flip after mount — an eager lazy-init here would mismatch
    // hydration instead of just causing an extra render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true)
    const fadeTimer = setTimeout(() => setFading(true), 1100)
    const removeTimer = setTimeout(() => setVisible(false), 1500)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-brand-blue transition-opacity duration-400 ease-out ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <Image
          src="/characters/boxy.webp"
          alt=""
          width={1122}
          height={1402}
          priority
          className="h-36 w-auto animate-[intro-pop_0.6s_ease-out] sm:h-44"
        />
        <span className="text-xl font-bold tracking-tight text-white">
          Boxex
        </span>
      </div>
    </div>
  )
}
