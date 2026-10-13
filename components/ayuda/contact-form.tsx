"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  FileText,
  HandCoins,
  Home,
  MapPin,
  MessageCircle,
  PackageSearch,
  Scale,
  Send,
  ShoppingBag,
  Ship,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { allFaqs } from "@/lib/pages-data"
import {
  CONTACT_FORM_ENDPOINT,
  contactMethods,
  phoneChannels,
  topics,
  type Topic,
  type TopicField,
  type TopicId,
} from "@/lib/contact-data"

const TOPIC_ICONS: Record<TopicId, LucideIcon> = {
  cotizar: FileText,
  casillero: ShoppingBag,
  rastreo: PackageSearch,
  pagos: HandCoins,
  recogida: Home,
  comercio: Ship,
  oficinas: MapPin,
  reclamo: Scale,
  otro: CircleHelp,
}

type Status = "idle" | "sending" | "sent" | "fallback"

const MESSAGE_MAX = 1000
const inputClass =
  "mt-2 block w-full rounded-md border border-brand-line bg-white px-3 py-3 text-[15px] text-brand-blue placeholder:text-brand-blue/40 focus:border-brand-blue focus:outline-none"

function normalize(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
}

function relatedFaqs(topic: Topic | null) {
  if (!topic || topic.faqKeywords.length === 0) return []
  const keys = topic.faqKeywords.map(normalize)
  // A keyword in the question weighs more than one in the answer.
  return allFaqs
    .map((f) => {
      const q = normalize(f.q)
      const a = normalize(f.a)
      const score = keys.reduce((n, k) => n + (q.includes(k) ? 2 : 0) + (a.includes(k) ? 1 : 0), 0)
      return { f, score }
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, 2)
    .map((x) => x.f)
}

function Field({ field }: { field: TopicField }) {
  return (
    <label className="text-sm font-semibold text-brand-blue">
      {field.label}
      {field.required && <span className="text-brand-gold"> *</span>}
      {field.type === "select" ? (
        <select
          name={field.name}
          required={field.required}
          defaultValue={field.required ? "" : field.options?.[0]}
          className={inputClass}
        >
          {field.required && (
            <option value="" disabled>
              Selecciona una opción
            </option>
          )}
          {field.options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          name={field.name}
          required={field.required}
          maxLength={field.maxLength ?? 80}
          placeholder={field.placeholder}
          className={inputClass}
        />
      )}
    </label>
  )
}

/**
 * Dynamic contact form: the visitor picks a topic and the form reshapes
 * itself — extra fields for that topic, the right WhatsApp line, related
 * FAQs, or a hand-off to the dedicated form (pickups, PQRs). Sends to the
 * company mailbox with the same service used by the pickup form and, if the
 * request fails, hands the message off as a prepared WhatsApp text.
 */
export function ContactForm() {
  const params = useSearchParams()
  const [topicId, setTopicId] = useState<TopicId | null>(() => {
    const t = params.get("tema")
    return topics.some((x) => x.id === t) ? (t as TopicId) : null
  })
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [whatsappText, setWhatsappText] = useState("")
  const [honeypot, setHoneypot] = useState("")

  const topic = useMemo(() => topics.find((t) => t.id === topicId) ?? null, [topicId])
  const faqs = useMemo(() => relatedFaqs(topic), [topic])
  const channel = topic
    ? phoneChannels.find((c) => c.whatsapp === topic.whatsapp)
    : undefined
  const showForm = topic !== null && !topic.redirect

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!topic || status === "sending" || honeypot) return

    const f = new FormData(e.currentTarget)
    const data: Record<string, string> = { Tema: topic.label }
    for (const [k, v] of f.entries()) {
      if (k === "website" || k === "consentimiento") continue
      const value = String(v).trim()
      if (value) data[k] = value
    }
    data["Acepta tratamiento de datos"] = "Sí"

    setStatus("sending")
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: `Contacto web BOXEX: ${topic.label}`,
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
      setWhatsappText(
        `Hola, Boxex. Tengo una consulta sobre: ${topic.label}.\n${Object.entries(data)
          .filter(([k]) => k !== "Tema" && k !== "Acepta tratamiento de datos")
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n")}`
      )
      setStatus("fallback")
    }
  }

  function reset() {
    setStatus("idle")
    setMessage("")
    setTopicId(null)
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center sm:p-12">
        <CheckCircle2 className="mx-auto mb-4 size-12 text-emerald-600" />
        <h3 className="mb-2 text-2xl font-bold text-brand-blue">¡Mensaje enviado!</h3>
        <p className="mx-auto mb-6 max-w-md text-[15px] leading-[1.7] text-brand-blue/75">
          Nuestro equipo revisará tu consulta sobre <strong>{topic?.label.toLowerCase()}</strong> y se
          comunicará contigo por el medio que elegiste.
        </p>
        <Button variant="outline" className="cursor-pointer" onClick={reset}>
          Enviar otra consulta
        </Button>
      </div>
    )
  }

  if (status === "fallback") {
    return (
      <div role="status" className="rounded-3xl border border-brand-line bg-white p-8 sm:p-10">
        <h3 className="mb-2 text-xl font-bold text-brand-blue">
          No pudimos enviar el formulario. Tu mensaje está listo.
        </h3>
        <p className="mb-4 text-sm text-brand-blue/70">
          Envíalo por WhatsApp a la línea de este tema; no se envía nada hasta que tú lo decidas.
        </p>
        <pre className="mb-5 whitespace-pre-wrap rounded-xl bg-brand-pale p-4 font-sans text-[13px] leading-[1.6] text-brand-blue/85">
          {whatsappText}
        </pre>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="cursor-pointer bg-[#1fb45b] text-white hover:bg-[#1fb45b]/90">
            <a
              href={`https://wa.me/${topic?.whatsapp}?text=${encodeURIComponent(whatsappText)}`}
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
    <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
      {/* Context that reacts to the chosen topic */}
      <aside className="order-2 lg:order-1 lg:sticky lg:top-40 lg:self-start" aria-live="polite">
        <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-[0_15px_40px_rgba(1,22,137,0.06)]">
          <h3 className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
            {topic ? "Canal recomendado" : "¿Cómo funciona?"}
          </h3>
          {topic ? (
            <>
              <p className="mb-4 text-base font-semibold text-brand-blue">
                {channel?.title ?? "Atención general"}
              </p>
              <p className="mb-4 text-sm leading-[1.65] text-brand-blue/70">
                {channel?.detail ?? "Para consultas sobre este tema."} Si prefieres escribir ya, usa
                el WhatsApp directo.
              </p>
              <Button asChild className="w-full cursor-pointer bg-[#1fb45b] text-white hover:bg-[#1fb45b]/90">
                <a
                  href={`https://wa.me/${topic.whatsapp}?text=${encodeURIComponent(
                    `Hola, Boxex. Tengo una consulta sobre: ${topic.label}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle />
                  WhatsApp {channel?.telLabel ?? ""}
                </a>
              </Button>
            </>
          ) : (
            <ol className="mt-3 grid gap-3 text-sm leading-[1.6] text-brand-blue/75">
              <li className="flex gap-3"><span className="font-bold text-brand-gold">1</span>Elige el tema de tu consulta.</li>
              <li className="flex gap-3"><span className="font-bold text-brand-gold">2</span>El formulario te pide solo lo necesario.</li>
              <li className="flex gap-3"><span className="font-bold text-brand-gold">3</span>Un asesor te responde por el medio que prefieras.</li>
            </ol>
          )}
        </div>

        {faqs.length > 0 && (
          <div className="mt-4 rounded-3xl border border-brand-line bg-[#f2f4fa] p-6">
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
              Quizá esto te ayuda antes
            </h3>
            <ul className="grid gap-4">
              {faqs.map((f) => (
                <li key={f.q}>
                  <strong className="mb-1 block text-sm text-brand-blue">{f.q}</strong>
                  <p className="text-[13px] leading-[1.6] text-brand-blue/70">{f.a}</p>
                </li>
              ))}
            </ul>
            <a href="#preguntas" className="mt-4 inline-block text-[13px] font-semibold text-brand-blue underline">
              Ver todas las preguntas frecuentes
            </a>
          </div>
        )}
      </aside>

      <form
        onSubmit={handleSubmit}
        aria-busy={status === "sending"}
        className="order-1 rounded-3xl border border-white bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.3)] sm:p-9 lg:order-2"
      >
        {/* Honeypot */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            No llenar este campo
            <input name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </label>
        </div>

        <fieldset className="mb-2">
          <legend className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-brand-gold">
            1 · ¿Sobre qué es tu consulta?
          </legend>
          <div role="radiogroup" aria-label="Tema de la consulta" className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {topics.map((t) => {
              const Icon = TOPIC_ICONS[t.id]
              const active = t.id === topicId
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setTopicId(t.id)}
                  className={`group flex cursor-pointer flex-col items-start gap-1.5 rounded-2xl border p-3.5 text-left transition-all duration-300 ${
                    active
                      ? "border-brand-blue bg-brand-blue text-white shadow-[0_12px_30px_rgba(1,22,137,0.3)]"
                      : "border-brand-line bg-white text-brand-blue hover:-translate-y-0.5 hover:border-brand-blue/40"
                  }`}
                >
                  <Icon className={`size-5 ${active ? "text-brand-gold" : "text-brand-blue"}`} />
                  <span className="text-[13px] font-semibold leading-[1.25]">{t.label}</span>
                  <span className={`text-[11px] leading-[1.35] ${active ? "text-white/70" : "text-brand-blue/55"}`}>
                    {t.hint}
                  </span>
                </button>
              )
            })}
          </div>
        </fieldset>

        {/* Hand-off topics */}
        <Collapse open={topic?.redirect !== undefined && topic !== null}>
          {topic?.redirect && (
            <div className="mt-6 rounded-2xl border border-brand-gold/50 bg-brand-soft-gold p-6">
              <p className="mb-4 text-[15px] leading-[1.7] text-brand-blue/85">{topic.redirect.text}</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
                  <Link href={topic.redirect.href}>
                    {topic.redirect.label}
                    <ArrowRight />
                  </Link>
                </Button>
                <button
                  type="button"
                  onClick={() => setTopicId("otro")}
                  className="cursor-pointer text-[13px] font-semibold text-brand-blue underline"
                >
                  Prefiero escribir un mensaje general
                </button>
              </div>
            </div>
          )}
        </Collapse>

        {/* Dynamic form body */}
        <Collapse open={showForm}>
          {showForm && topic && (
            <div className="pt-6">
              {topic.fields.length > 0 && (
                <fieldset className="mb-8" key={topic.id}>
                  <legend className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-brand-gold">
                    2 · Detalles de {topic.label.toLowerCase()}
                  </legend>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {topic.fields.map((f) => (
                      <Field key={f.name} field={f} />
                    ))}
                  </div>
                </fieldset>
              )}

              <fieldset className="mb-8">
                <legend className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-brand-gold">
                  {topic.fields.length > 0 ? "3" : "2"} · Tus datos
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-brand-blue sm:col-span-2">
                    Nombre completo <span className="text-brand-gold">*</span>
                    <input name="Nombre completo" required maxLength={120} autoComplete="name" placeholder="Nombre y apellido" className={inputClass} />
                  </label>
                  <label className="text-sm font-semibold text-brand-blue">
                    Correo electrónico <span className="text-brand-gold">*</span>
                    <input name="email" type="email" required maxLength={120} autoComplete="email" placeholder="correo@ejemplo.com" className={inputClass} />
                  </label>
                  <label className="text-sm font-semibold text-brand-blue">
                    Celular o WhatsApp <span className="text-brand-gold">*</span>
                    <input name="Celular" type="tel" required maxLength={30} autoComplete="tel" inputMode="tel" placeholder="+57 300 000 0000" className={inputClass} />
                  </label>
                  <label className="text-sm font-semibold text-brand-blue sm:col-span-2">
                    ¿Desde qué ciudad o país nos escribes?
                    <input name="Ciudad o país" maxLength={80} placeholder="Ej: Bogotá, Colombia / Miami, EE. UU." className={inputClass} />
                  </label>
                </div>
              </fieldset>

              <fieldset className="mb-8">
                <legend className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-brand-gold">
                  {topic.fields.length > 0 ? "4" : "3"} · Tu mensaje
                </legend>
                <label className="block text-sm font-semibold text-brand-blue">
                  Cuéntanos qué necesitas <span className="text-brand-gold">*</span>
                  <textarea
                    name="Mensaje"
                    required
                    rows={5}
                    minLength={10}
                    maxLength={MESSAGE_MAX}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe aquí tu pregunta con el mayor detalle posible."
                    className={`${inputClass} resize-y`}
                  />
                  <span className="mt-1.5 block text-right text-xs font-normal text-brand-blue/50">
                    {message.length}/{MESSAGE_MAX}
                  </span>
                </label>

                <div role="radiogroup" aria-label="Medio de contacto preferido" className="mt-4">
                  <span className="mb-2 block text-sm font-semibold text-brand-blue">
                    ¿Cómo prefieres que te respondamos?
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {contactMethods.map((m, i) => (
                      <label key={m} className="cursor-pointer">
                        <input type="radio" name="Prefiere respuesta por" value={m} defaultChecked={i === 0} className="peer sr-only" />
                        <span className="inline-block rounded-full border border-brand-line px-4 py-2 text-[13px] font-medium text-brand-blue transition-colors peer-checked:border-brand-blue peer-checked:bg-brand-blue peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-blue">
                          {m}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </fieldset>

              <label className="mb-6 flex cursor-pointer items-start gap-3 text-[13px] leading-[1.6] text-brand-blue/75">
                <input type="checkbox" name="consentimiento" required className="mt-1 size-4 shrink-0 accent-[#011689]" />
                <span>
                  Acepto el tratamiento de mis datos personales por parte de BOXEX para atender esta
                  consulta.{" "}
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
                  {status === "sending" ? "Enviando…" : "Enviar mensaje"}
                  {status !== "sending" && <Send />}
                </Button>
                <span className="text-xs text-brand-blue/55">Un asesor de BOXEX te responderá.</span>
              </div>
            </div>
          )}
        </Collapse>

        {topic === null && (
          <p className="mt-6 rounded-xl border border-dashed border-brand-line p-4 text-center text-sm text-brand-blue/55">
            Elige un tema para empezar: el formulario se adapta a tu consulta.
          </p>
        )}
      </form>
    </div>
  )
}

/** Smooth height transition without measuring (grid-rows 0fr → 1fr). */
function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  )
}
