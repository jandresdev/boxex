"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { navItems, quoteCta } from "./nav-items"

export function AppHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-10 z-40 border-b border-white/60 bg-white/55 shadow-[0_8px_30px_rgba(1,22,137,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-6">
        <Link
          href="/"
          aria-label="Boxex, inicio"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/logo.png"
            alt="Boxex"
            width={2048}
            height={407}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-pale text-brand-blue"
                    : "text-brand-blue/70 hover:bg-brand-pale hover:text-brand-blue"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Link
          href={quoteCta.href}
          className="ml-auto hidden shrink-0 items-center rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-blue shadow-[0_10px_25px_rgba(214,179,106,0.35)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-brand-gold/90 lg:inline-flex"
        >
          {quoteCta.label}
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="ml-auto flex size-10 items-center justify-center rounded-lg text-brand-blue hover:bg-brand-pale lg:hidden"
          aria-label="Abrir menú de navegación"
        >
          <Menu className="size-5" />
        </button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-4/5 border-l border-brand-line bg-white p-0 sm:max-w-xs"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Menú de navegación</SheetTitle>
            <SheetDescription>Navegación principal de Boxex</SheetDescription>
          </SheetHeader>
          <div className="flex h-full flex-col p-6">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              aria-label="Boxex, inicio"
              className="mb-8 flex items-center"
            >
              <Image
                src="/logo.png"
                alt="Boxex"
                width={2048}
                height={407}
                className="h-9 w-auto"
              />
            </Link>
            <nav
              aria-label="Navegación principal"
              className="flex flex-col gap-1"
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-lg px-4 py-3 text-[15px] font-medium ${
                      isActive
                        ? "bg-brand-pale text-brand-blue"
                        : "text-brand-blue/80 hover:bg-brand-pale"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <Link
              href={quoteCta.href}
              onClick={() => setOpen(false)}
              className="mt-auto flex items-center justify-center rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-blue shadow-[0_10px_25px_rgba(214,179,106,0.35)]"
            >
              {quoteCta.label}
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
