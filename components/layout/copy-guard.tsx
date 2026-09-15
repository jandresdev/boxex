"use client"

import { useEffect } from "react"

const BLOCKED_KEY_COMBOS = (e: KeyboardEvent) => {
  const key = e.key.toLowerCase()
  if (key === "f12") return true
  const withModifier = e.ctrlKey || e.metaKey
  if (!withModifier) return false
  if (e.shiftKey && ["i", "j", "c"].includes(key)) return true
  if (key === "u") return true
  return false
}

/**
 * Cosmetic deterrent only: disables right-click, text selection, and the
 * common DevTools/view-source shortcuts. None of this stops anyone who
 * opens DevTools another way, uses curl/view-source, or reads the network
 * tab — the page's HTML/CSS/JS is still sent to every visitor's browser,
 * which is unavoidable for a public site. It only adds friction for
 * casual users.
 */
export function CopyGuard() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => e.preventDefault()
    const onKeyDown = (e: KeyboardEvent) => {
      if (BLOCKED_KEY_COMBOS(e)) e.preventDefault()
    }

    document.addEventListener("contextmenu", onContextMenu)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("contextmenu", onContextMenu)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  return null
}
