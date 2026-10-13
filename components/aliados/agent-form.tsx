"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { agentSections, AGENT_FORM_ENDPOINT } from "@/lib/aliados-data"
import { phoneChannels } from "@/lib/contact-data"

type Status = "idle" | "sending" | "sent" | "fallback"

const WHATSAPP = phoneChannels.find((c) => c.id === "co-whatsapp")?.whatsapp ?? "573176410982"

const inputClass =
  "mt-2 block w-full rounded-md border border-brand-line bg-white/80 px-3 py-3 text-[15px] text-brand-blue backdrop-blur placeholder:text-brand-blue/40 focus:border-brand-blue focus:outline-none"

/**
 * Agent-network application. Same fields as the official "Hágase nuestro
 * agente" form; sent with fetch so the visitor stays on the page. If the
 * request fails, the data is handed off as a prepared WhatsApp message.
 */
export function AgentForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [whatsapp, setWhatsapp] = useState("")
  const [honeypot, setHoneypot] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === "sending") return
    // Bots fill hidden fields; humans never see this one.
    if (honeypot) return

    const f = new FormData(e.currentTarget)
    const data: Record<string, string> = {}
    for (const section of agentSections) {
      for (const field of section.fields) {
        const v = String(f.get(field.name) ?? "").trim()
        data[field.name] = v || "No indicado"
      }
    }
    data["Confirma que los datos son correctos"] = "Sí"

    setStatus("sending")
    try {
      const res = await fetch(AGENT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: "Nueva solicitud de agente autorizado BOXEX",
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
      setWhatsapp(
        `Hola, Boxex. Quiero ser agente autorizado.\n${Object.entries(data)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n")}`,
      )
      setStatus("fallback")
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center sm:p-12">
        <CheckCircle2 className="mx-auto mb-4 size-12 text-emerald-600" />
        <h3 className="mb-2 text-2xl font-bold text-brand-blue">¡Solicitud enviada!</h3>
        <p className="mx-auto max-w-md text-[15px] leading-[1.7] text-brand-blue/75">
          Recibimos tu solicitud. El equipo de Boxex revisará la información y
          se comunicará contigo para explicarte las condiciones de vinculación.
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
          Envíala por WhatsApp; no se envía nada hasta que tú lo decidas.
        </p>
        <pre className="mb-5 max-h-72 overflow-auto whitespace-pre-wrap rounded-xl bg-brand-pale p-4 font-sans text-[13px] leading-[1.6] text-brand-blue/85">
          {whatsapp}
        </pre>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="cursor-pointer bg-[#1fb45b] text-white hover:bg-[#1fb45b]/90">
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(whatsapp)}`}
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
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      {agentSections.map((section) => (
        <fieldset key={section.title} className="mb-8">
          <legend className="mb-1 text-sm font-bold uppercase tracking-[0.14em] text-brand-gold">
            {section.title}
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            {section.fields.map((field) => (
              <label key={field.name} className="text-sm font-semibold text-brand-blue">
                {field.label}{" "}
                {field.required ? (
                  <span className="text-brand-gold">*</span>
                ) : (
                  <span className="font-normal text-brand-blue/50">(opcional)</span>
                )}
                <input
                  name={field.name}
                  type={field.type ?? "text"}
                  required={field.required}
                  maxLength={field.maxLength}
                  autoComplete={field.autoComplete}
                  inputMode={field.type === "tel" ? "tel" : undefined}
                  placeholder={field.placeholder}
                  className={inputClass}
                />
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <label className="mb-6 flex cursor-pointer items-start gap-3 text-[13px] leading-[1.6] text-brand-blue/75">
        <input type="checkbox" name="confirmacion" required className="mt-1 size-4 shrink-0 accent-[#011689]" />
        <span>
          Acepto que los datos suministrados en este formulario son correctos y
          autorizo su tratamiento por parte de BOXEX para evaluar mi solicitud.{" "}
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
          {status === "sending" ? "Enviando solicitud…" : "Enviar solicitud"}
          {status !== "sending" && <ArrowRight />}
        </Button>
        <span className="text-xs text-brand-blue/55">Un asesor revisará tu solicitud y se comunicará contigo.</span>
      </div>
    </form>
  )
}
