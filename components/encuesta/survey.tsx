"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Send, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { countryFlagUrl } from "@/lib/country-flags"
import {
  Answers,
  countryOptions,
  differenceOptions,
  emptyAnswers,
  isStepValid,
  officesByOrigin,
  originOptions,
  ratingLabels,
  serviceOptions,
  sourceOptions,
  steps,
  SURVEY_ENDPOINT,
  toPayload,
} from "@/lib/encuesta-data"

const inputClass =
  "mt-3 block w-full rounded-xl border border-brand-line bg-white px-4 py-3.5 text-[15px] text-brand-blue placeholder:text-brand-blue/40 focus:border-brand-blue focus:outline-none"

function Choice({ selected, onClick, children, multi = false }: { selected: boolean; onClick: () => void; children: React.ReactNode; multi?: boolean }) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-[15px] font-semibold transition-all duration-200 active:scale-[0.98] ${
        selected
          ? "border-brand-blue bg-brand-blue text-white shadow-[0_10px_25px_rgba(1,22,137,0.25)]"
          : "border-brand-line bg-white text-brand-blue hover:-translate-y-0.5 hover:border-brand-blue/40"
      }`}
    >
      <span className="flex items-center gap-3">{children}</span>
      <span className={`grid size-5 shrink-0 place-items-center rounded-full ${selected ? "bg-brand-gold text-brand-blue" : "border border-brand-line"} ${multi ? "rounded-md" : ""}`}>
        {selected && <Check className="size-3.5" strokeWidth={3} />}
      </span>
    </button>
  )
}

const CONFETTI = Array.from({ length: 28 }, (_, i) => ({
  x: Math.round(Math.cos(i * 2.4) * (90 + (i % 5) * 38)),
  y: Math.round(-80 - ((i * 37) % 190)),
  r: (i % 2 ? 1 : -1) * (120 + i * 17),
  d: (i % 7) * 0.06,
  c: ["#D4AF6A", "#011689", "#ffffff", "#f59e0b", "#8b5cf6"][i % 5],
  s: 6 + (i % 4) * 3,
}))

/**
 * One-question-at-a-time satisfaction survey. Same questions, options and
 * conditional rules as the official form (answers go to mercadeo@boxex.us
 * through FormSubmit). Single-choice answers advance on their own; progress
 * bar, a mascot that reacts to each step and a thank-you screen make it
 * pleasant. Motion is disabled under prefers-reduced-motion (see globals.css).
 */
export function Survey() {
  const [a, setA] = useState<Answers>(emptyAnswers)
  const [i, setI] = useState(0)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [honeypot, setHoneypot] = useState("")
  const cardRef = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const step = steps[i]
  const valid = isStepValid(step.id, a)
  const last = i === steps.length - 1
  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setA((p) => ({ ...p, [k]: v }))

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  function go(delta: number) {
    if (timer.current) clearTimeout(timer.current)
    setI((n) => Math.min(steps.length - 1, Math.max(0, n + delta)))
    cardRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" })
  }

  /** Avanza solo cuando la respuesta ya quedó completa (sin campos de texto pendientes). */
  function pickAndAdvance(patch: Partial<Answers>, completes: boolean) {
    const next = { ...a, ...patch }
    setA(next)
    if (completes && isStepValid(step.id, next)) {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => go(1), 380)
    }
  }

  async function submit() {
    if (status === "sending" || honeypot) return
    setStatus("sending")
    try {
      const res = await fetch(SURVEY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...toPayload(a), _subject: "Nueva respuesta encuesta Boxex", _template: "table", _captcha: "false" }),
      })
      const body = (await res.json().catch(() => null)) as { success?: unknown } | null
      if (res.ok && String(body?.success) === "true") setStatus("sent")
      else throw new Error("request failed")
    } catch {
      setStatus("error")
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) return
    if (last) void submit()
    else go(1)
  }

  if (status === "sent") {
    return (
      <div role="status" className="relative overflow-hidden rounded-3xl border border-white bg-white p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-14">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-24">
          {CONFETTI.map((c, n) => (
            <span
              key={n}
              className="survey-confetti absolute opacity-0"
              style={{ "--x": `${c.x}px`, "--y": `${c.y}px`, "--r": `${c.r}deg`, "--d": `${c.d}s`, background: c.c, width: c.s, height: c.s * 1.6, borderRadius: 2 } as React.CSSProperties}
            />
          ))}
        </div>
        <Image src="/characters/familia-halloween-cutout.webp" alt="" width={1457} height={640} className="survey-hop mx-auto mb-6 h-auto w-full max-w-[420px]" />
        <h2 className="mb-3 text-[30px] font-bold tracking-[-0.04em] text-brand-blue sm:text-[38px]">¡Gracias por tu opinión!</h2>
        <p className="mx-auto mb-2 max-w-md text-[15px] leading-[1.75] text-brand-blue/75">
          Gracias por confiar en Boxex. Tu opinión nos ayuda a seguir entregando cada envío con más calidad, seguridad y compromiso.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {Array.from({ length: a.rating }).map((_, n) => (
            <Star key={n} className="size-7 fill-brand-gold text-brand-gold" />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild className="cursor-pointer bg-brand-gold text-brand-blue hover:bg-brand-gold/90">
            <Link href="/">Volver al inicio</Link>
          </Button>
          <Button asChild variant="outline" className="cursor-pointer">
            <Link href="/cotizar">Cotizar un envío</Link>
          </Button>
        </div>
      </div>
    )
  }

  const offices = officesByOrigin[a.origin]

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-busy={status === "sending"}
      className="relative rounded-3xl border border-white bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-10"
    >
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          No llenar este campo
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      {/* Progreso + mascota */}
      <div className="mb-8 flex items-end gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between text-[12px] font-bold uppercase tracking-[0.14em] text-brand-gold">
            <span>
              Pregunta {i + 1} de {steps.length}
            </span>
            <span>{Math.round(((i + (valid ? 1 : 0)) / steps.length) * 100)}%</span>
          </div>
          <div
            role="progressbar"
            aria-label="Progreso de la encuesta"
            aria-valuemin={0}
            aria-valuemax={steps.length}
            aria-valuenow={i + 1}
            className="h-2.5 overflow-hidden rounded-full bg-brand-pale"
          >
            <div className="h-full rounded-full bg-gradient-to-r from-brand-gold to-[#f0cf8f] transition-[width] duration-500 ease-out motion-reduce:transition-none" style={{ width: `${((i + (valid ? 1 : 0)) / steps.length) * 100}%` }} />
          </div>
        </div>
        <div key={i} className="survey-hop relative shrink-0">
          <Image src="/characters/boxy-halloween-cutout.webp" alt="" width={410} height={365} className="h-16 w-auto sm:h-20" />
        </div>
      </div>
      <p className="mb-6 -mt-3 text-right text-[13px] font-medium italic text-brand-blue/55" aria-live="polite">
        {step.bubble}
      </p>

      <div ref={cardRef} key={step.id} className="survey-step-in min-h-[330px] scroll-mt-40">
        <h2 className="mb-6 text-[22px] font-bold leading-[1.25] tracking-[-0.03em] text-brand-blue sm:text-[28px]">
          {step.question} {step.id !== "contact" && <span className="text-brand-gold">*</span>}
          {step.id === "contact" && <span className="ml-2 align-middle text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue/45">Opcional</span>}
        </h2>

        {step.id === "service" && (
          <div role="radiogroup" aria-label={step.question} className="grid gap-3 sm:grid-cols-2">
            {serviceOptions.map((o) => (
              <Choice key={o} selected={a.service === o} onClick={() => pickAndAdvance({ service: o }, o !== "Otro")}>
                {o}
              </Choice>
            ))}
            {a.service === "Otro" && (
              <input autoFocus className={`${inputClass} sm:col-span-2`} maxLength={80} placeholder="Indícanos cuál" aria-label="Otro servicio" value={a.otherService} onChange={(e) => set("otherService", e.target.value)} />
            )}
          </div>
        )}

        {step.id === "origin" && (
          <div>
            <div role="radiogroup" aria-label={step.question} className="grid gap-3 sm:grid-cols-2">
              {originOptions.map((o) => (
                <Choice key={o} selected={a.origin === o} onClick={() => pickAndAdvance({ origin: o, office: "", otherCity: "" }, !officesByOrigin[o] && o !== "Otra ciudad")}>
                  {o}
                </Choice>
              ))}
            </div>
            {offices && (
              <div className="survey-step-in mt-5">
                <p className="mb-3 text-sm font-semibold text-brand-blue/70">¿En qué oficina?</p>
                <div role="radiogroup" aria-label="Oficina específica" className="grid gap-3 sm:grid-cols-2">
                  {offices.map((o) => (
                    <Choice key={o} selected={a.office === o} onClick={() => pickAndAdvance({ office: o }, true)}>
                      {o}
                    </Choice>
                  ))}
                </div>
              </div>
            )}
            {a.origin === "Otra ciudad" && (
              <input autoFocus className={inputClass} maxLength={80} placeholder="Indícanos cuál" aria-label="Otra ciudad" value={a.otherCity} onChange={(e) => set("otherCity", e.target.value)} />
            )}
          </div>
        )}

        {step.id === "country" && (
          <div role="radiogroup" aria-label={step.question} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {countryOptions.map((o) => {
              const flag = countryFlagUrl(o, 320)
              return (
                <Choice key={o} selected={a.country === o} onClick={() => pickAndAdvance({ country: o }, true)}>
                  {flag && <Image src={flag} alt="" width={30} height={20} className="h-5 w-[30px] rounded-[3px] object-cover shadow-sm" />}
                  <span className="leading-tight">{o}</span>
                </Choice>
              )
            })}
          </div>
        )}

        {step.id === "source" && (
          <div>
            <div role="radiogroup" aria-label={step.question} className="grid gap-3 sm:grid-cols-2">
              {sourceOptions.map((o) => (
                <Choice key={o} selected={a.source === o} onClick={() => pickAndAdvance({ source: o }, o !== "Otro")}>
                  {o}
                </Choice>
              ))}
            </div>
            {a.source === "Otro" && (
              <input autoFocus className={inputClass} maxLength={80} placeholder="Indícanos cuál" aria-label="Otro canal" value={a.otherSource} onChange={(e) => set("otherSource", e.target.value)} />
            )}
          </div>
        )}

        {step.id === "difference" && (
          <div>
            <div role="group" aria-label={step.question} className="grid gap-3 sm:grid-cols-2">
              {differenceOptions.map((o) => (
                <Choice
                  key={o}
                  multi
                  selected={a.difference.includes(o)}
                  onClick={() => set("difference", a.difference.includes(o) ? a.difference.filter((x) => x !== o) : [...a.difference, o])}
                >
                  {o}
                </Choice>
              ))}
            </div>
            {a.difference.includes("Otro") && (
              <input autoFocus className={inputClass} maxLength={120} placeholder="Indícanos cuál" aria-label="Otro diferencial" value={a.otherDifference} onChange={(e) => set("otherDifference", e.target.value)} />
            )}
          </div>
        )}

        {step.id === "recommend" && (
          <div>
            <div role="radiogroup" aria-label={step.question} className="grid gap-3 sm:grid-cols-2">
              <Choice selected={a.recommend === "Sí"} onClick={() => pickAndAdvance({ recommend: "Sí", recommendWhy: "" }, true)}>
                <span className="text-2xl" aria-hidden="true">👍</span> Sí, claro
              </Choice>
              <Choice selected={a.recommend === "No"} onClick={() => pickAndAdvance({ recommend: "No" }, false)}>
                <span className="text-2xl" aria-hidden="true">🤔</span> No
              </Choice>
            </div>
            {a.recommend === "No" && (
              <textarea autoFocus className={`${inputClass} min-h-28 resize-y`} maxLength={600} placeholder="Cuéntanos por qué no recomendarías Boxex" aria-label="Por qué no recomendaría" value={a.recommendWhy} onChange={(e) => set("recommendWhy", e.target.value)} />
            )}
          </div>
        )}

        {step.id === "rating" && (
          <div className="text-center">
            <div role="radiogroup" aria-label="Calificación de 1 a 5 estrellas" className="flex justify-center gap-1.5 sm:gap-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={a.rating === n}
                  aria-label={`${n} ${n === 1 ? "estrella" : "estrellas"}: ${ratingLabels[n]}`}
                  onClick={() => set("rating", n)}
                  className="group cursor-pointer rounded-full p-1.5 outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                >
                  <Star
                    key={`${n}-${a.rating >= n}`}
                    className={`size-11 transition-all duration-200 sm:size-14 ${
                      a.rating >= n ? "survey-pop fill-brand-gold text-brand-gold drop-shadow-[0_4px_10px_rgba(212,175,106,0.6)]" : "fill-transparent text-brand-blue/25 group-hover:scale-110 group-hover:text-brand-gold"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p aria-live="polite" className="mt-5 min-h-8 text-xl font-bold text-brand-blue">
              {a.rating ? ratingLabels[a.rating] : <span className="text-base font-medium text-brand-blue/50">1 = Muy mala · 5 = Excelente</span>}
            </p>
          </div>
        )}

        {step.id === "contact" && (
          <div>
            <div role="radiogroup" aria-label={step.question} className="grid gap-3 sm:grid-cols-2">
              <Choice selected={a.contact === "Sí"} onClick={() => set("contact", "Sí")}>
                <span className="text-2xl" aria-hidden="true">📞</span> Sí, contáctenme
              </Choice>
              <Choice selected={a.contact === "No"} onClick={() => set("contact", "No")}>
                <span className="text-2xl" aria-hidden="true">🙂</span> No, gracias
              </Choice>
            </div>
            {a.contact === "Sí" && (
              <div className="survey-step-in mt-5 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-brand-blue sm:col-span-2">
                  Nombre completo <span className="text-brand-gold">*</span>
                  <input className={inputClass} maxLength={120} autoComplete="name" value={a.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Nombre completo" />
                </label>
                <label className="text-sm font-semibold text-brand-blue">
                  Teléfono de contacto <span className="text-brand-gold">*</span>
                  <input className={inputClass} type="tel" inputMode="tel" maxLength={30} autoComplete="tel" value={a.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+57 300 000 0000" />
                </label>
                <label className="text-sm font-semibold text-brand-blue">
                  Correo electrónico <span className="text-brand-gold">*</span>
                  <input className={inputClass} type="email" maxLength={120} autoComplete="email" value={a.email} onChange={(e) => set("email", e.target.value)} placeholder="correo@ejemplo.com" />
                </label>
                <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-[1.6] text-brand-blue/75 sm:col-span-2">
                  <input type="checkbox" checked={a.privacy} onChange={(e) => set("privacy", e.target.checked)} className="mt-1 size-4 shrink-0 accent-[#011689]" />
                  <span>
                    Acepto la política de tratamiento de datos.{" "}
                    <Link href="/documents/legal/politica-tratamiento-datos-personales.pdf" target="_blank" className="font-semibold text-brand-blue underline">
                      Ver política de datos
                    </Link>
                    .
                  </span>
                </label>
              </div>
            )}
          </div>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          No pudimos enviar tu opinión. Revisa tu conexión e inténtalo de nuevo; tus respuestas siguen aquí.
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-4">
        <Button type="button" variant="outline" disabled={i === 0 || status === "sending"} onClick={() => go(-1)} className="cursor-pointer">
          <ArrowLeft />
          Atrás
        </Button>
        <Button type="submit" disabled={!valid || status === "sending"} className="cursor-pointer bg-brand-gold px-6 text-brand-blue hover:bg-brand-gold/90 disabled:opacity-50">
          {last ? (status === "sending" ? "Enviando…" : "Enviar mi calificación") : "Siguiente"}
          {last ? <Send /> : <ArrowRight />}
        </Button>
      </div>
    </form>
  )
}
