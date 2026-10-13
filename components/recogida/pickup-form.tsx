"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { countries } from "@/lib/home-data"
import {
  PICKUP_FORM_ENDPOINT,
  PICKUP_WHATSAPP_URL,
} from "@/lib/pickup-data"

type Status = "idle" | "sending" | "sent" | "fallback"

const MAX = { name: 120, phone: 30, email: 120, place: 80, city: 80, text: 60 }

const inputClass =
  "mt-2 block w-full rounded-md border border-brand-line bg-white/80 px-3 py-3 text-[15px] text-brand-blue backdrop-blur placeholder:text-brand-blue/40 focus:border-brand-blue focus:outline-none"

/**
 * Pickup request form. Same destination and fields as the form published on
 * boxexpress.com (FormSubmit → recogidas@boxex.us), sent with fetch so the
 * visitor stays on the page. If the request fails, nothing is lost: the data
 * is handed off as a prepared WhatsApp message to the pickups line.
 */
export function PickupForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [whatsapp, setWhatsapp] = useState("")
  const [honeypot, setHoneypot] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === "sending") return
    // Bots fill hidden fields; humans never see this one.
    if (honeypot) return

    const f = new FormData(e.currentTarget)
    const get = (k: string) => String(f.get(k) ?? "").trim()
    const data = {
      "Nombre completo": get("nombre"),
      "Número celular": get("celular"),
      "Correo electrónico": get("correo"),
      "Ciudad o ZIP Code de recogida": get("recogida"),
      "País destino": get("pais"),
      "Ciudad destino": get("ciudad"),
      "Cantidad de cajas": get("cajas") || "No indicada",
      "Peso de la caja": get("peso") || "No indicado",
      "Medidas de la caja en pulgadas": get("medidas") || "No indicadas",
      "Valor declarado": get("valor"),
      "Acepta tratamiento de datos": "Sí",
    }

    setStatus("sending")
    try {
      const res = await fetch(PICKUP_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: "Nueva solicitud de recogida BOXEX",
          _template: "table",
          _captcha: "false",
        }),
      })
      const body = (await res.json().catch(() => null)) as { success?: unknown } | null
      if (res.ok && String(body?.success) === "true") {
        setStatus("sent")
        return
      }
      throw new Error("request failed")
    } catch {
      const message = `Hola, Boxex. Quiero solicitar una recogida.
${Object.entries(data)
  .map(([k, v]) => `${k}: ${v}`)
  .join("\n")}`
      setWhatsapp(message)
      setStatus("fallback")
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center sm:p-12"
      >
        <CheckCircle2 className="mx-auto mb-4 size-12 text-emerald-600" />
        <h3 className="mb-2 text-2xl font-bold text-brand-blue">¡Solicitud enviada!</h3>
        <p className="mx-auto max-w-md text-[15px] leading-[1.7] text-brand-blue/75">
          Nuestro equipo revisará tu información y se comunicará contigo para
          ayudarte a agendar la recogida.
        </p>
      </div>
    )
  }

  if (status === "fallback") {
    return (
      <div role="status" className="rounded-3xl border border-brand-line bg-white p-8 sm:p-10">
        <h3 className="mb-2 text-xl font-bold text-brand-blue">
          No pudimos enviar el formulario. Tu solicitud está lista.
        </h3>
        <p className="mb-4 text-sm text-brand-blue/70">
          Envíala por WhatsApp a nuestra línea de recogidas; no se envía nada
          hasta que tú lo decidas.
        </p>
        <pre className="mb-5 whitespace-pre-wrap rounded-xl bg-brand-pale p-4 font-sans text-[13px] leading-[1.6] text-brand-blue/85">
          {whatsapp}
        </pre>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="cursor-pointer bg-[#1fb45b] text-white hover:bg-[#1fb45b]/90">
            <a
              href={`${PICKUP_WHATSAPP_URL}?text=${encodeURIComponent(whatsapp)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Continuar por WhatsApp ↗
            </a>
          </Button>
          <Button variant="outline" className="cursor-pointer" onClick={() => setStatus("idle")}>
            Volver al formulario
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={status === "sending"}
      className="rounded-3xl border border-white bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-10"
    >
      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          No llenar este campo
          <input
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <fieldset className="mb-8">
        <legend className="mb-1 text-sm font-bold uppercase tracking-[0.14em] text-brand-gold">
          1 · Datos de contacto
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-brand-blue sm:col-span-2">
            Nombre completo <span className="text-brand-gold">*</span>
            <input name="nombre" required maxLength={MAX.name} autoComplete="name" placeholder="Nombre y apellido" className={inputClass} />
          </label>
          <label className="text-sm font-semibold text-brand-blue">
            Número celular <span className="text-brand-gold">*</span>
            <input name="celular" type="tel" required maxLength={MAX.phone} autoComplete="tel" inputMode="tel" placeholder="+1 305 555 0123" className={inputClass} />
          </label>
          <label className="text-sm font-semibold text-brand-blue">
            Correo electrónico <span className="text-brand-gold">*</span>
            <input name="correo" type="email" required maxLength={MAX.email} autoComplete="email" placeholder="correo@ejemplo.com" className={inputClass} />
          </label>
        </div>
      </fieldset>

      <fieldset className="mb-8">
        <legend className="mb-1 text-sm font-bold uppercase tracking-[0.14em] text-brand-gold">
          2 · Datos de la recogida
        </legend>
        <label className="block text-sm font-semibold text-brand-blue">
          Ciudad o ZIP Code de recogida <span className="text-brand-gold">*</span>
          <input name="recogida" required maxLength={MAX.place} placeholder="Ej: Miami, FL / 33172 / Queens, NY" className={inputClass} />
        </label>
      </fieldset>

      <fieldset className="mb-8">
        <legend className="mb-1 text-sm font-bold uppercase tracking-[0.14em] text-brand-gold">
          3 · Datos del envío
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-brand-blue">
            País de destino <span className="text-brand-gold">*</span>
            <select name="pais" required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Selecciona el país
              </option>
              {Object.keys(countries).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-semibold text-brand-blue">
            Ciudad de destino <span className="text-brand-gold">*</span>
            <input name="ciudad" required maxLength={MAX.city} placeholder="Ej: Cali, Medellín, Quito, Lima" className={inputClass} />
          </label>
          <label className="text-sm font-semibold text-brand-blue">
            Cantidad de cajas <span className="font-normal text-brand-blue/50">(opcional)</span>
            <input name="cajas" type="number" min={1} max={999} inputMode="numeric" placeholder="Ej: 2" className={inputClass} />
          </label>
          <label className="text-sm font-semibold text-brand-blue">
            Peso de la caja <span className="font-normal text-brand-blue/50">(opcional)</span>
            <input name="peso" maxLength={MAX.text} placeholder="Ej: 40 lb" className={inputClass} />
            <span className="mt-1.5 block text-xs font-normal text-brand-blue/55">
              Peso mínimo: 20 libras para servicio UPS y 30 libras para servicio con driver BOXEX.
            </span>
          </label>
          <label className="text-sm font-semibold text-brand-blue">
            Medidas en pulgadas <span className="font-normal text-brand-blue/50">(opcional)</span>
            <input name="medidas" maxLength={MAX.text} placeholder="Ej: 20 x 20 x 18" className={inputClass} />
          </label>
          <label className="text-sm font-semibold text-brand-blue">
            Valor declarado <span className="text-brand-gold">*</span>
            <input name="valor" required maxLength={MAX.text} placeholder="Ej: USD 150" className={inputClass} />
          </label>
        </div>
      </fieldset>

      <p className="mb-6 flex gap-3 rounded-xl border border-brand-gold/40 bg-brand-soft-gold p-4 text-[13px] leading-[1.6] text-brand-blue/80">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-gold" />
        <span>
          <strong className="text-brand-blue">Importante:</strong> si tu ubicación está
          fuera de nuestras zonas de recogida directa o por distancia no podemos
          realizar la ruta, revisaremos la opción de recogida por medio de UPS.
        </span>
      </p>

      <label className="mb-6 flex cursor-pointer items-start gap-3 text-[13px] leading-[1.6] text-brand-blue/75">
        <input type="checkbox" name="consentimiento" required className="mt-1 size-4 shrink-0 accent-[#011689]" />
        <span>
          Acepto el tratamiento de mis datos personales por parte de BOXEX para
          gestionar mi solicitud de recogida, confirmar cobertura, condiciones
          del servicio y continuar el proceso de envío.{" "}
          <Link
            href="/documents/legal/politica-tratamiento-datos-personales.pdf"
            target="_blank"
            className="font-semibold text-brand-blue underline"
          >
            Ver política de tratamiento de datos
          </Link>
          .
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          disabled={status === "sending"}
          className="cursor-pointer bg-brand-gold px-6 text-brand-blue hover:bg-brand-gold/90 disabled:opacity-70"
        >
          {status === "sending" ? "Enviando solicitud…" : "Enviar solicitud de recogida"}
          {status !== "sending" && <ArrowRight />}
        </Button>
        <span className="text-xs text-brand-blue/55">
          Un asesor revisará tu solicitud y se comunicará contigo.
        </span>
      </div>
    </form>
  )
}
