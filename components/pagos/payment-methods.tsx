"use client"

import { useId, useState } from "react"
import { CreditCard, ExternalLink, ShieldCheck, Wallet } from "lucide-react"
import { payMethods } from "@/lib/pagos-data"

const icons = { paypal: Wallet, tarjeta: CreditCard } as const

/**
 * Official payment forms of BOXEX. Same forms and steps as boxexpress.com/pagos:
 * the form of the selected method loads right away inside an iframe (centered,
 * with a spinner until it is ready), and every method also offers an "open in
 * a new tab" link in case the embed is blocked by the browser.
 */
export function PaymentMethods() {
  const [active, setActive] = useState<(typeof payMethods)[number]["id"]>("paypal")
  const [ready, setReady] = useState<Record<string, boolean>>({})
  const uid = useId()
  const method = payMethods.find((m) => m.id === active) ?? payMethods[0]

  function onKeyDown(e: React.KeyboardEvent) {
    const i = payMethods.findIndex((m) => m.id === active)
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault()
      const next = payMethods[(i + (e.key === "ArrowRight" ? 1 : payMethods.length - 1)) % payMethods.length]
      setActive(next.id)
      document.getElementById(`${uid}-tab-${next.id}`)?.focus()
    }
  }

  return (
    <div>
      <div role="tablist" aria-label="Medio de pago" onKeyDown={onKeyDown} className="mb-8 grid gap-3 sm:grid-cols-2">
        {payMethods.map((m) => {
          const Icon = icons[m.id]
          const selected = m.id === active
          return (
            <button
              key={m.id}
              id={`${uid}-tab-${m.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(m.id)}
              className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 text-left transition-all ${
                selected
                  ? "border-brand-gold bg-brand-gold text-brand-blue shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
                  : "border-white/20 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              <span className={`grid size-12 shrink-0 place-items-center rounded-xl ${selected ? "bg-white/60" : "bg-white/10 text-brand-gold"}`}>
                <Icon className="size-6" />
              </span>
              <span>
                <strong className="block text-lg">{m.label}</strong>
                <span className={`text-[13px] ${selected ? "text-brand-blue/75" : "text-white/65"}`}>{m.coverage}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${method.id}`}
        className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"
      >
        <div className="rounded-3xl border border-white/15 bg-white/5 p-6 text-white sm:p-8">
          <h3 className="mb-1 text-xl font-bold">¿Cómo funciona?</h3>
          <p className="mb-5 text-[13px] text-brand-gold">Pago con {method.label} · {method.coverage}</p>
          <ol className="grid gap-4">
            {method.steps.map((s, i) => (
              <li key={s} className="flex gap-3 text-[15px] leading-[1.6] text-white/85">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-gold text-[13px] font-bold text-brand-blue">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
          <p className="mt-6 flex gap-3 rounded-xl border border-brand-gold/40 bg-brand-gold/10 p-4 text-[13px] leading-[1.6] text-white/85">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-gold" />
            Al ser un servicio prepago, los despachos solo se harán efectivos una vez sea confirmada la transacción.
          </p>
        </div>

        <div className="rounded-3xl border border-white bg-white p-4 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-bold uppercase tracking-[0.14em] text-brand-gold">Formulario de pago oficial</span>
            <a
              href={method.src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-blue underline"
            >
              Abrir en una pestaña nueva <ExternalLink className="size-3.5" />
            </a>
          </div>
          <div className="relative mx-auto w-full max-w-[640px]" style={{ height: method.height }}>
            {!ready[method.id] && (
              <div aria-hidden="true" className="absolute inset-0 grid place-items-center rounded-xl bg-brand-pale/50">
                <span className="size-8 animate-spin rounded-full border-[3px] border-brand-blue/20 border-t-brand-blue motion-reduce:animate-none" />
              </div>
            )}
            <iframe
              key={method.id}
              src={method.src}
              title={`Formulario de pago con ${method.label}`}
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setReady((r) => ({ ...r, [method.id]: true }))}
              className={`absolute inset-0 size-full rounded-xl border-0 transition-opacity duration-300 ${ready[method.id] ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
