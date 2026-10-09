"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client"
import { WHATSAPP_URL } from "@/lib/home-data"

const tipoOptions = ["Petición", "Queja", "Reclamo", "Sugerencia"]

export function PqrForm() {
  const [tipo, setTipo] = useState(tipoOptions[0])
  const [nombre, setNombre] = useState("")
  const [documento, setDocumento] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [guia, setGuia] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [autorizacion, setAutorizacion] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [whatsappMessage, setWhatsappMessage] = useState<string | null>(null)

  const inputClass =
    "mt-2 block w-full rounded-md border border-brand-line bg-white/80 px-3 py-3 text-[15px] text-brand-blue placeholder:text-brand-blue/40 backdrop-blur focus:border-brand-blue focus:outline-none"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    const record = {
      tipo,
      nombre: nombre.trim(),
      documento: documento.trim(),
      email: email.trim(),
      telefono: telefono.trim(),
      guia: guia.trim() || null,
      mensaje: mensaje.trim(),
    }

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("pqr_solicitudes").insert(record)
      if (!error) {
        setRegistered(true)
        setSubmitting(false)
        return
      }
    }

    // Supabase not configured yet or the insert failed — don't lose the
    // request, hand it off as a WhatsApp message the user sends themselves.
    const message = `Hola, Boxex. Quiero radicar una ${tipo.toLowerCase()}.
Nombre: ${record.nombre}
Documento: ${record.documento}
Email: ${record.email}
Teléfono: ${record.telefono}
${record.guia ? `Número de guía: ${record.guia}\n` : ""}Detalle: ${record.mensaje}`
    setWhatsappMessage(message)
    setSubmitting(false)
  }

  if (registered) {
    return (
      <div
        className="rounded-xl border border-white/60 bg-white/70 p-8 backdrop-blur-lg"
        aria-live="polite"
      >
        <h2 className="mb-2 text-lg font-semibold text-brand-blue">
          Tu solicitud fue registrada.
        </h2>
        <p className="text-sm text-brand-blue/70">
          El equipo de Boxex la revisará y te contactará por los datos que
          nos compartiste.
        </p>
      </div>
    )
  }

  if (whatsappMessage) {
    return (
      <div
        className="rounded-xl border border-white/60 bg-white/70 p-8 backdrop-blur-lg"
        aria-live="polite"
      >
        <h2 className="mb-2 text-lg font-semibold text-brand-blue">
          Tu solicitud está lista.
        </h2>
        <p className="mb-4 whitespace-pre-line text-sm text-brand-blue/80">
          {whatsappMessage}
        </p>
        <Button asChild className="cursor-pointer bg-brand-gold text-brand-blue hover:bg-brand-gold/90">
          <a
            href={`${WHATSAPP_URL}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Continuar por WhatsApp ↗
          </a>
        </Button>
        <p className="mt-3 text-xs text-brand-blue/50">
          Se abrirá un mensaje preparado. Tú decides cuándo enviarlo.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/60 bg-white/60 p-7 shadow-[0_20px_60px_rgba(1,22,137,0.08)] backdrop-blur-xl sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-brand-blue sm:col-span-2">
          Tipo de solicitud
          <select
            className={inputClass}
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            {tipoOptions.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-brand-blue">
          Nombre completo
          <input
            className={inputClass}
            required
            maxLength={120}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <label className="text-sm font-semibold text-brand-blue">
          Documento de identidad
          <input
            className={inputClass}
            required
            maxLength={30}
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
          />
        </label>
        <label className="text-sm font-semibold text-brand-blue">
          Correo electrónico
          <input
            type="email"
            className={inputClass}
            required
            maxLength={120}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="text-sm font-semibold text-brand-blue">
          Teléfono de contacto
          <input
            type="tel"
            className={inputClass}
            required
            maxLength={30}
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </label>
        <label className="text-sm font-semibold text-brand-blue sm:col-span-2">
          Número de guía (opcional)
          <input
            className={inputClass}
            maxLength={40}
            placeholder="Si tu caso está relacionado con un envío"
            value={guia}
            onChange={(e) => setGuia(e.target.value)}
          />
        </label>
        <label className="text-sm font-semibold text-brand-blue sm:col-span-2">
          Cuéntanos tu caso
          <textarea
            className={`${inputClass} min-h-32 resize-y`}
            required
            maxLength={2000}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
        </label>
      </div>

      <label className="mt-6 flex items-start gap-3 text-xs text-brand-blue/70">
        <input
          type="checkbox"
          required
          checked={autorizacion}
          onChange={(e) => setAutorizacion(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          Autorizo el tratamiento de mis datos personales conforme a la{" "}
          <Link href="/legal" className="underline">
            Política de Tratamiento de Datos Personales
          </Link>{" "}
          de Boxex.
        </span>
      </label>

      <Button
        type="submit"
        disabled={submitting}
        className="mt-6 cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90"
      >
        {submitting ? "Enviando..." : "Enviar solicitud"}
        <ArrowRight />
      </Button>
    </form>
  )
}
